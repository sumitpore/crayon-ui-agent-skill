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
4. **Validate the JSON** by running: `<skill-directory>/scripts/validate.sh`
5. If validation fails, fix the errors and repeat from step 3
6. Only consider complete when validation passes
7. The Crayon app auto-updates to display the UI

### Validation Step (MANDATORY)

After writing to `response.json`, always validate your output:

```bash
<skill-directory>/scripts/validate.sh
```

If validation fails, you will see specific errors like:

```
VALIDATION FAILED

ERROR at components.0.props (MarkDownRenderer): must NOT have additional properties
  FIX: Use "textMarkdown" instead of "markdownString"

ERROR at components.2.props.children.0.props (ListItem): must have required property 'title'
  FIX: Add required prop "title"
```

Fix each error and re-validate until you see:

```
VALIDATION PASSED
Validated X components successfully.
```

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

The complete JSON Schema for validation is at [references/schema.json](references/schema.json).

### All Components by Category

| Category | Components |
|----------|------------|
| **Layout** | Card, CardHeader, Accordion, AccordionItem, AccordionTrigger, AccordionContent, Tabs, TabsList, TabsTrigger, TabsContent, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext |
| **Content** | TextContent, MarkDownRenderer, CodeBlock, Image |
| **Data Display** | Table, ListBlock, ListItem, Steps |
| **Charts** | BarChart, LineChart, AreaChart, PieChart |
| **Feedback** | Callout, TextCallout, Tag, TagBlock, FollowUpBlock, FollowUpItem, MessageLoading |
| **Forms** | Button, Buttons, Input, TextArea, Select, CheckBoxGroup, CheckBoxItem, RadioGroup, RadioItem, SwitchGroup, SwitchItem, Slider, DatePicker, Label |
| **Utility** | Separator |

### Component Props Reference

#### Layout Components

**Card** - Container for grouped content
```json
{ "component": "Card", "props": { "children": [ /* nested components */ ] } }
```

**CardHeader** - Header with title and optional subtitle
```json
{ "component": "CardHeader", "props": { "title": "Title", "subtitle": "Optional subtitle" } }
```

**Accordion** - Collapsible sections
```json
{
  "component": "Accordion",
  "props": {
    "type": "single",
    "collapsible": true,
    "children": [
      {
        "component": "AccordionItem",
        "props": {
          "value": "item-1",
          "children": [
            { "component": "AccordionTrigger", "props": { "text": "Section Title" } },
            { "component": "AccordionContent", "props": { "children": "Content here" } }
          ]
        }
      }
    ]
  }
}
```

**Tabs** - Tabbed navigation
```json
{
  "component": "Tabs",
  "props": {
    "defaultValue": "tab1",
    "children": [
      {
        "component": "TabsList",
        "props": {
          "children": [
            { "component": "TabsTrigger", "props": { "value": "tab1", "text": "Tab 1" } },
            { "component": "TabsTrigger", "props": { "value": "tab2", "text": "Tab 2" } }
          ]
        }
      },
      { "component": "TabsContent", "props": { "value": "tab1", "children": "Content 1" } },
      { "component": "TabsContent", "props": { "value": "tab2", "children": "Content 2" } }
    ]
  }
}
```

**Carousel** - Scrollable slides
```json
{
  "component": "Carousel",
  "props": {
    "showButtons": true,
    "children": [
      {
        "component": "CarouselContent",
        "props": {
          "children": [
            { "component": "CarouselItem", "props": { "children": "Slide 1" } },
            { "component": "CarouselItem", "props": { "children": "Slide 2" } }
          ]
        }
      },
      { "component": "CarouselPrevious", "props": {} },
      { "component": "CarouselNext", "props": {} }
    ]
  }
}
```

#### Content Components

**TextContent** - Plain text
```json
{ "component": "TextContent", "props": { "children": "Plain text here" } }
```

**MarkDownRenderer** - Markdown text (NOTE: use `textMarkdown`, NOT `markdownString`)
```json
{ "component": "MarkDownRenderer", "props": { "textMarkdown": "# Heading\n\n**Bold** and *italic*" } }
```

**CodeBlock** - Syntax-highlighted code
```json
{ "component": "CodeBlock", "props": { "codeString": "const x = 1;", "language": "javascript", "showLineNumbers": true } }
```

**Image** - Display image
```json
{ "component": "Image", "props": { "src": "https://example.com/img.png", "alt": "Description" } }
```

#### Data Display Components

**Table** - Tabular data (NOTE: use `accessorKey`, NOT `key`)
```json
{
  "component": "Table",
  "props": {
    "columns": [
      { "header": "Name", "accessorKey": "name" },
      { "header": "Value", "accessorKey": "value" }
    ],
    "data": [
      { "name": "Item 1", "value": 100 },
      { "name": "Item 2", "value": 200 }
    ]
  }
}
```

**ListBlock / ListItem** - Lists (NOTE: ListItem uses `title`, NOT `children`)
```json
{
  "component": "ListBlock",
  "props": {
    "children": [
      { "component": "ListItem", "props": { "title": "First item", "description": "Optional description" } },
      { "component": "ListItem", "props": { "title": "Second item" } }
    ]
  }
}
```

**Steps** - Step-by-step progress
```json
{
  "component": "Steps",
  "props": {
    "steps": [
      { "title": "Step 1", "description": "Do this first" },
      { "title": "Step 2", "description": "Then this" }
    ]
  }
}
```

#### Charts

**BarChart / LineChart / AreaChart**
```json
{
  "component": "BarChart",
  "props": {
    "data": [
      { "name": "A", "value": 10 },
      { "name": "B", "value": 20 }
    ],
    "xKey": "name",
    "yKeys": ["value"]
  }
}
```

**PieChart**
```json
{
  "component": "PieChart",
  "props": {
    "data": [
      { "category": "A", "value": 40 },
      { "category": "B", "value": 60 }
    ],
    "categoryKey": "category",
    "dataKey": "value"
  }
}
```

#### Feedback Components

**Callout** - Important notices (variants: neutral, info, warning, error, success)
```json
{ "component": "Callout", "props": { "variant": "info", "title": "Note", "description": "Important info" } }
```

**TextCallout** - Highlighted text block
```json
{ "component": "TextCallout", "props": { "title": "Note", "description": "Highlighted info" } }
```

**Tag / TagBlock** - Labels
```json
{
  "component": "TagBlock",
  "props": {
    "children": [
      { "component": "Tag", "props": { "text": "Tag 1" } },
      { "component": "Tag", "props": { "text": "Tag 2" } }
    ]
  }
}
```

**FollowUpBlock / FollowUpItem** - Suggestions
```json
{
  "component": "FollowUpBlock",
  "props": {
    "children": [
      { "component": "FollowUpItem", "props": { "text": "Tell me more" } },
      { "component": "FollowUpItem", "props": { "text": "Show examples" } }
    ]
  }
}
```

**MessageLoading** - Loading indicator
```json
{ "component": "MessageLoading", "props": {} }
```

#### Form Components

**Button** - Clickable button (variants: primary, secondary, outline, ghost)
```json
{ "component": "Button", "props": { "children": "Click Me", "variant": "primary" } }
```

**Buttons** - Button group
```json
{
  "component": "Buttons",
  "props": {
    "children": [
      { "component": "Button", "props": { "children": "Save" } },
      { "component": "Button", "props": { "children": "Cancel", "variant": "secondary" } }
    ]
  }
}
```

**Input** - Text input
```json
{ "component": "Input", "props": { "placeholder": "Enter text...", "label": "Name" } }
```

**TextArea** - Multi-line input
```json
{ "component": "TextArea", "props": { "placeholder": "Enter description...", "rows": 4 } }
```

**Select** - Dropdown
```json
{
  "component": "Select",
  "props": {
    "placeholder": "Choose...",
    "options": [
      { "label": "Option 1", "value": "opt1" },
      { "label": "Option 2", "value": "opt2" }
    ]
  }
}
```

**CheckBoxGroup / CheckBoxItem**
```json
{
  "component": "CheckBoxGroup",
  "props": {
    "children": [
      { "component": "CheckBoxItem", "props": { "label": "Option A", "value": "a", "description": "Description" } },
      { "component": "CheckBoxItem", "props": { "label": "Option B", "value": "b" } }
    ]
  }
}
```

**RadioGroup / RadioItem**
```json
{
  "component": "RadioGroup",
  "props": {
    "children": [
      { "component": "RadioItem", "props": { "label": "Choice 1", "value": "1" } },
      { "component": "RadioItem", "props": { "label": "Choice 2", "value": "2" } }
    ]
  }
}
```

**SwitchGroup / SwitchItem**
```json
{
  "component": "SwitchGroup",
  "props": {
    "children": [
      { "component": "SwitchItem", "props": { "label": "Enable feature", "value": "feature" } }
    ]
  }
}
```

**Slider** - Range slider
```json
{ "component": "Slider", "props": { "min": 0, "max": 100, "defaultValue": [50] } }
```

**DatePicker** - Date selection
```json
{ "component": "DatePicker", "props": { "placeholder": "Select date" } }
```

**Label** - Form label
```json
{ "component": "Label", "props": { "children": "Field Label" } }
```

#### Utility Components

**Separator** - Visual divider
```json
{ "component": "Separator", "props": {} }
```

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
3. **Always validate after writing** - Run `<skill-directory>/scripts/validate.sh` to catch schema errors before considering the task complete
4. **Use appropriate components** for the data type (Table for tabular, Charts for trends, Cards for entities)
5. **Compose with children** to build complex layouts
6. **Refer to the props reference above** for exact prop names - the validator will catch mistakes

## Common Schema Mistakes to Avoid

| Component | Wrong | Correct |
|-----------|-------|---------|
| MarkDownRenderer | `markdownString`, `markdown`, `content` | `textMarkdown` |
| ListItem | `children: "text"` | `title: "text"` (+ optional `description`) |
| ListBlock | `ordered: true` | Remove `ordered` (not supported) |
| CodeBlock | `code`, `lang` | `codeString`, `language` |
| Table columns | `key` | `accessorKey` |
| Callout | `message`, `type` | `description`, `variant` |
