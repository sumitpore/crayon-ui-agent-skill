---
name: crayon-ui
description: Render LLM responses as interactive UI using Crayon components. Use when the user wants rich visual output like cards, charts, tables, forms, or any interactive interface instead of plain text.
---

# Crayon UI

This skill enables you to render responses as interactive UI components using the Crayon UI library. Instead of outputting plain text, you generate structured JSON that gets rendered in a live Crayon app.

## Before Using This Skill

**IMPORTANT:** Before writing to the response file, ensure the Crayon server is running.

### Step 1: Check if Server is Running

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:5500 2>/dev/null || echo "000"
```

If this returns `200`, the server is running. If it returns `000` or any other code, start the server.

### Step 2: Start Server if Not Running

Run the start script (this will run in the background):

```bash
<skill-directory>/scripts/start.sh
```

Wait a few seconds for the server to initialize, then verify it's running with the curl check above.

### Step 3: Remind User to Open Browser

Tell the user to open http://localhost:5500 in their browser if they haven't already.

## How It Works

1. Ensure the Crayon server is running (see above)
2. Generate a JSON structure describing the UI components
3. Write the JSON to `~/.crayon/response.json`
4. The Crayon app auto-updates to display the UI

## Quick Start

To render UI, write JSON to the response file:

```bash
cat > ~/.crayon/response.json << 'EOF'
{
  "components": [
    {
      "component": "Card",
      "props": {
        "children": [
          {
            "component": "CardHeader",
            "props": { "title": "Hello World" }
          },
          {
            "component": "TextContent",
            "props": { "children": "This is rendered in Crayon!" }
          }
        ]
      }
    }
  ]
}
EOF
```

## JSON Structure

```json
{
  "components": [
    {
      "component": "ComponentName",
      "props": { ... }
    }
  ]
}
```

- `components`: Array of component definitions to render
- `component`: Name of the Crayon component (e.g., "Card", "Table", "Charts")
- `props`: Props to pass to the component (matches Crayon's API)

### Nested Components

Use `children` prop for composition:

```json
{
  "component": "Card",
  "props": {
    "children": [
      { "component": "CardHeader", "props": { "title": "Title" } },
      { "component": "TextContent", "props": { "children": "Body text" } }
    ]
  }
}
```

## Available Components

See [references/components.md](references/components.md) for the complete component reference.

### Common Components

| Component | Use Case |
|-----------|----------|
| Card, CardHeader | Structured content containers |
| TextContent | Plain text display |
| MarkDownRenderer | Markdown formatted text |
| CodeBlock | Syntax-highlighted code |
| Table | Tabular data |
| BarChart, LineChart, PieChart | Data visualization charts |
| ListBlock, ListItem | Lists |
| Callout | Important notices |
| Button | Actions |

## Examples

### Display a Card with Info

```bash
cat > ~/.crayon/response.json << 'EOF'
{
  "components": [
    {
      "component": "Card",
      "props": {
        "children": [
          {
            "component": "CardHeader",
            "props": { 
              "title": "Weather Report",
              "subtitle": "San Francisco, CA"
            }
          },
          {
            "component": "TextContent",
            "props": { "children": "Sunny, 72°F with light winds." }
          },
          {
            "component": "TagBlock",
            "props": {
              "children": [
                { "component": "Tag", "props": { "text": "sunny" } },
                { "component": "Tag", "props": { "text": "72°F" } }
              ]
            }
          }
        ]
      }
    }
  ]
}
EOF
```

### Display a Data Table

```bash
cat > ~/.crayon/response.json << 'EOF'
{
  "components": [
    {
      "component": "Table",
      "props": {
        "columns": [
          { "header": "Name", "accessorKey": "name" },
          { "header": "Role", "accessorKey": "role" },
          { "header": "Status", "accessorKey": "status" }
        ],
        "data": [
          { "name": "Alice", "role": "Engineer", "status": "Active" },
          { "name": "Bob", "role": "Designer", "status": "Away" }
        ]
      }
    }
  ]
}
EOF
```

### Display a Chart

```bash
cat > ~/.crayon/response.json << 'EOF'
{
  "components": [
    {
      "component": "BarChart",
      "props": {
        "data": [
          { "name": "Mon", "value": 12 },
          { "name": "Tue", "value": 19 },
          { "name": "Wed", "value": 8 },
          { "name": "Thu", "value": 15 },
          { "name": "Fri", "value": 22 }
        ],
        "xKey": "name",
        "yKeys": ["value"]
      }
    }
  ]
}
EOF
```

**Available chart types:** `BarChart`, `LineChart`, `AreaChart`, `PieChart`

### Display Code

```bash
cat > ~/.crayon/response.json << 'EOF'
{
  "components": [
    {
      "component": "CodeBlock",
      "props": {
        "codeString": "function hello() {\n  console.log('Hello, World!');\n}",
        "language": "javascript"
      }
    }
  ]
}
EOF
```

### Multiple Components

```bash
cat > ~/.crayon/response.json << 'EOF'
{
  "components": [
    {
      "component": "Callout",
      "props": {
        "variant": "info",
        "title": "Analysis Complete",
        "description": "Found 3 issues in your code."
      }
    },
    {
      "component": "Table",
      "props": {
        "columns": [
          { "header": "File", "accessorKey": "file" },
          { "header": "Issue", "accessorKey": "issue" },
          { "header": "Line", "accessorKey": "line" }
        ],
        "data": [
          { "file": "app.js", "issue": "Unused variable", "line": 42 },
          { "file": "utils.js", "issue": "Missing semicolon", "line": 15 },
          { "file": "index.js", "issue": "Deprecated API", "line": 8 }
        ]
      }
    }
  ]
}
EOF
```

## Best Practices

1. **Always check if the server is running first** - Use `curl -s -o /dev/null -w "%{http_code}" http://localhost:5500` to check. If not running, execute `<skill-directory>/scripts/start.sh`
2. **Wait for server to be ready** - After starting, wait a few seconds and verify with curl before writing to response.json
3. **Use appropriate components** for the data type (Table for tabular, Charts for trends, Cards for entities)
4. **Compose with children** to build complex layouts
5. **Check component reference** for available props
