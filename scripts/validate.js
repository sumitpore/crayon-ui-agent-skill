#!/usr/bin/env node

/**
 * Crayon UI Schema Validator
 * 
 * Validates ~/.crayon/response.json against the component schema.
 * Returns human-readable error messages with specific fix instructions.
 */

import Ajv from 'ajv';
import { readFileSync, existsSync } from 'fs';
import { homedir } from 'os';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Paths
const RESPONSE_FILE = join(homedir(), '.crayon', 'response.json');
const SCHEMA_FILE = join(__dirname, '..', 'references', 'schema.json');

// Common mistakes and their fixes
const PROP_FIXES = {
  'MarkDownRenderer': {
    'markdownString': 'Use "textMarkdown" instead of "markdownString"',
    'markdown': 'Use "textMarkdown" instead of "markdown"',
    'content': 'Use "textMarkdown" instead of "content"',
    'text': 'Use "textMarkdown" instead of "text"'
  },
  'ListItem': {
    'children': 'ListItem requires "title" (required) and "description" (optional). Do not use "children"',
    'text': 'Use "title" instead of "text"',
    'label': 'Use "title" instead of "label"'
  },
  'ListBlock': {
    'ordered': 'ListBlock does not support "ordered" prop. Remove it.',
    'items': 'Use "children" with ListItem components instead of "items"'
  },
  'CodeBlock': {
    'code': 'Use "codeString" instead of "code"',
    'content': 'Use "codeString" instead of "content"',
    'lang': 'Use "language" instead of "lang"'
  },
  'Table': {
    'key': 'Use "accessorKey" instead of "key" in column definitions',
    'rows': 'Use "data" instead of "rows"'
  },
  'Callout': {
    'message': 'Use "description" instead of "message"',
    'type': 'Use "variant" instead of "type"'
  },
  'CardHeader': {
    'header': 'Use "title" instead of "header"',
    'subheader': 'Use "subtitle" instead of "subheader"'
  }
};

/**
 * Format a JSON path for human readability
 */
function formatPath(instancePath) {
  if (!instancePath) return 'root';
  return instancePath.replace(/\//g, '.').replace(/^\./, '');
}

/**
 * Get component name from error path
 */
function getComponentFromPath(data, instancePath) {
  if (!instancePath) return null;
  
  const parts = instancePath.split('/').filter(Boolean);
  let current = data;
  
  for (const part of parts) {
    if (current === undefined || current === null) return null;
    if (Array.isArray(current)) {
      current = current[parseInt(part, 10)];
    } else if (typeof current === 'object') {
      current = current[part];
    }
  }
  
  // Walk up to find component name
  let componentPath = parts.slice();
  while (componentPath.length > 0) {
    let obj = data;
    for (const p of componentPath) {
      if (obj === undefined || obj === null) break;
      if (Array.isArray(obj)) {
        obj = obj[parseInt(p, 10)];
      } else if (typeof obj === 'object') {
        obj = obj[p];
      }
    }
    if (obj && obj.component) {
      return obj.component;
    }
    componentPath.pop();
  }
  
  return null;
}

/**
 * Generate a helpful fix suggestion
 */
function getSuggestion(error, data) {
  const componentName = getComponentFromPath(data, error.instancePath);
  
  // Check for additional properties (unknown props)
  if (error.keyword === 'additionalProperties') {
    const unknownProp = error.params.additionalProperty;
    
    if (componentName && PROP_FIXES[componentName] && PROP_FIXES[componentName][unknownProp]) {
      return PROP_FIXES[componentName][unknownProp];
    }
    
    return `Remove unknown prop "${unknownProp}"`;
  }
  
  // Check for missing required props
  if (error.keyword === 'required') {
    const missingProp = error.params.missingProperty;
    return `Add required prop "${missingProp}"`;
  }
  
  // Check for enum violations
  if (error.keyword === 'enum') {
    const allowed = error.params.allowedValues.join(', ');
    return `Value must be one of: ${allowed}`;
  }
  
  // Check for type violations
  if (error.keyword === 'type') {
    return `Expected ${error.params.type}, got ${typeof error.data}`;
  }
  
  // Invalid component name
  if (error.keyword === 'enum' && error.instancePath.endsWith('/component')) {
    return `"${error.data}" is not a valid component name. Check spelling.`;
  }
  
  return null;
}

/**
 * Format errors for LLM consumption
 */
function formatErrors(errors, data) {
  const formattedErrors = [];
  const seenErrors = new Set();
  const actionableErrors = [];
  
  // First pass: collect actionable errors (additionalProperties, required)
  for (const error of errors) {
    // Skip internal schema errors and cascade errors
    if (error.keyword === 'if' || error.keyword === 'then' || error.keyword === 'allOf' || error.keyword === 'oneOf') {
      continue;
    }
    
    // Skip type errors that are just cascades from real errors
    if (error.keyword === 'type') {
      continue;
    }
    
    // Skip duplicate errors
    const errorKey = `${error.instancePath}:${error.keyword}:${JSON.stringify(error.params)}`;
    if (seenErrors.has(errorKey)) continue;
    seenErrors.add(errorKey);
    
    actionableErrors.push(error);
  }
  
  // Second pass: format the actionable errors
  for (const error of actionableErrors) {
    const path = formatPath(error.instancePath);
    const component = getComponentFromPath(data, error.instancePath);
    const suggestion = getSuggestion(error, data);
    
    let errorMsg = `ERROR at ${path}`;
    if (component) {
      errorMsg += ` (${component})`;
    }
    errorMsg += `: ${error.message}`;
    
    formattedErrors.push(errorMsg);
    
    if (suggestion) {
      formattedErrors.push(`  FIX: ${suggestion}`);
    }
    
    formattedErrors.push('');
  }
  
  return formattedErrors.join('\n');
}

/**
 * Main validation function
 */
function validate() {
  // Check if response file exists
  if (!existsSync(RESPONSE_FILE)) {
    console.error(`ERROR: Response file not found at ${RESPONSE_FILE}`);
    console.error('FIX: Write your JSON to ~/.crayon/response.json first');
    process.exit(1);
  }
  
  // Check if schema file exists
  if (!existsSync(SCHEMA_FILE)) {
    console.error(`ERROR: Schema file not found at ${SCHEMA_FILE}`);
    process.exit(1);
  }
  
  // Read files
  let responseData;
  let schema;
  
  try {
    responseData = JSON.parse(readFileSync(RESPONSE_FILE, 'utf8'));
  } catch (e) {
    console.error('ERROR: Invalid JSON in response.json');
    console.error(`FIX: ${e.message}`);
    process.exit(1);
  }
  
  try {
    schema = JSON.parse(readFileSync(SCHEMA_FILE, 'utf8'));
  } catch (e) {
    console.error('ERROR: Invalid schema file');
    console.error(`Details: ${e.message}`);
    process.exit(1);
  }
  
  // Create validator
  const ajv = new Ajv({ 
    allErrors: true,
    verbose: true,
    strict: false
  });
  
  const validateFn = ajv.compile(schema);
  const valid = validateFn(responseData);
  
  if (valid) {
    console.log('VALIDATION PASSED');
    console.log(`Validated ${responseData.components?.length || 0} components successfully.`);
    process.exit(0);
  } else {
    console.error('VALIDATION FAILED\n');
    console.error(formatErrors(validateFn.errors, responseData));
    process.exit(1);
  }
}

// Run validation
validate();
