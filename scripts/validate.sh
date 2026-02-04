#!/bin/bash

# Crayon UI Schema Validator
# Validates ~/.crayon/response.json against the component schema

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILL_DIR="$(dirname "$SCRIPT_DIR")"

# Check if node_modules exists, if not install dependencies
if [ ! -d "$SKILL_DIR/node_modules" ]; then
    echo "Installing validation dependencies..."
    cd "$SKILL_DIR" && npm install --silent
fi

# Run the validator
node "$SCRIPT_DIR/validate.js"
