# Crayon UI Components Reference

Complete reference for all available Crayon UI components and their props.

## Layout Components

### Card

Container for grouped content.

```json
{
  "component": "Card",
  "props": {
    "children": [ /* nested components */ ]
  }
}
```

### CardHeader

Header for cards with title and optional subtitle.

```json
{
  "component": "CardHeader",
  "props": {
    "title": "Card Title",
    "subtitle": "Optional subtitle"
  }
}
```

### Accordion

Collapsible content sections using composition.

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
            { "component": "AccordionTrigger", "props": { "text": "Section 1" } },
            { "component": "AccordionContent", "props": { "children": "Content for section 1" } }
          ]
        }
      },
      {
        "component": "AccordionItem",
        "props": {
          "value": "item-2",
          "children": [
            { "component": "AccordionTrigger", "props": { "text": "Section 2" } },
            { "component": "AccordionContent", "props": { "children": "Content for section 2" } }
          ]
        }
      }
    ]
  }
}
```

**Props:**
- `type`: `"single"` (one item open) or `"multiple"` (multiple items open)
- `collapsible`: `true` to allow collapsing all items

### Tabs

Tabbed content navigation using composition.

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
      { "component": "TabsContent", "props": { "value": "tab1", "children": "Content for Tab 1" } },
      { "component": "TabsContent", "props": { "value": "tab2", "children": "Content for Tab 2" } }
    ]
  }
}
```

### Carousel

Scrollable content carousel using composition. Requires `CarouselContent` wrapper.

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
            { "component": "CarouselItem", "props": { "children": "Slide 1 content" } },
            { "component": "CarouselItem", "props": { "children": "Slide 2 content" } },
            { "component": "CarouselItem", "props": { "children": "Slide 3 content" } }
          ]
        }
      },
      { "component": "CarouselPrevious", "props": {} },
      { "component": "CarouselNext", "props": {} }
    ]
  }
}
```

**Props:**
- `showButtons`: Show navigation arrows (default: true)
- `itemsToScroll`: Number of items to scroll at once (default: 1)

---

## Content Components

### TextContent

Plain text display.

```json
{
  "component": "TextContent",
  "props": {
    "children": "Your text content here"
  }
}
```

### MarkDownRenderer

Renders markdown-formatted text.

```json
{
  "component": "MarkDownRenderer",
  "props": {
    "textMarkdown": "# Heading\n\nParagraph with **bold** and *italic*."
  }
}
```

**Props:**
- `textMarkdown`: The markdown string to render (required)
- `variant`: `"clear"`, `"card"`, or `"sunk"` (optional)

### CodeBlock

Syntax-highlighted code display.

```json
{
  "component": "CodeBlock",
  "props": {
    "codeString": "const x = 42;",
    "language": "javascript",
    "showLineNumbers": true
  }
}
```

**Supported languages:** javascript, typescript, python, java, go, rust, bash, json, html, css, sql, and more.

### Image

Single image display.

```json
{
  "component": "Image",
  "props": {
    "src": "https://example.com/image.png",
    "alt": "Description"
  }
}
```

---

## Data Display Components

### Table

Tabular data display.

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

### Charts

Data visualization charts. Use specific chart components:

**BarChart:**

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

**LineChart:**

```json
{
  "component": "LineChart",
  "props": {
    "data": [
      { "name": "Jan", "value": 100 },
      { "name": "Feb", "value": 150 }
    ],
    "xKey": "name",
    "yKeys": ["value"]
  }
}
```

**AreaChart:**

```json
{
  "component": "AreaChart",
  "props": {
    "data": [
      { "name": "Jan", "value": 10 },
      { "name": "Feb", "value": 25 },
      { "name": "Mar", "value": 15 }
    ],
    "xKey": "name",
    "yKeys": ["value"]
  }
}
```

**PieChart:**

```json
{
  "component": "PieChart",
  "props": {
    "data": [
      { "category": "Category A", "value": 40 },
      { "category": "Category B", "value": 60 }
    ],
    "categoryKey": "category",
    "dataKey": "value"
  }
}
```

**Available chart types:** `BarChart`, `LineChart`, `AreaChart`, `PieChart`

### ListBlock / ListItem

List display with clickable items.

```json
{
  "component": "ListBlock",
  "props": {
    "children": [
      { "component": "ListItem", "props": { "title": "First Item", "description": "Description for first item" } },
      { "component": "ListItem", "props": { "title": "Second Item", "description": "Description for second item" } }
    ]
  }
}
```

**ListItem Props:**
- `title`: The main title text (required)
- `description`: Optional description text

### Steps

Step-by-step progress indicator.

```json
{
  "component": "Steps",
  "props": {
    "steps": [
      { "title": "Step 1: Install", "description": "Run npm install" },
      { "title": "Step 2: Configure", "description": "Set up your config" },
      { "title": "Step 3: Build", "description": "Start building" }
    ]
  }
}
```

**Props:**
- `steps`: Array of step objects with `title` and `description`

---

## Feedback Components

### Callout

Important notice or alert.

```json
{
  "component": "Callout",
  "props": {
    "variant": "neutral",
    "title": "Note",
    "description": "This is important information."
  }
}
```

**Variants:** `neutral`, `info`, `warning`, `error`, `success`

### TextCallout

Highlighted text block with optional title.

```json
{
  "component": "TextCallout",
  "props": {
    "title": "Note",
    "description": "This is important information to highlight."
  }
}
```

**Props:**
- `title`: Title text (optional)
- `description`: Description/body text (optional)
- `variant`: `"neutral"`, `"info"`, `"warning"`, `"success"`, or `"danger"` (optional)

### Tag

Small label/badge.

```json
{
  "component": "Tag",
  "props": {
    "text": "Label"
  }
}
```

### TagBlock

Container for multiple tags.

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

### FollowUpBlock / FollowUpItem

Follow-up suggestions.

```json
{
  "component": "FollowUpBlock",
  "props": {
    "children": [
      { "component": "FollowUpItem", "props": { "text": "Follow-up suggestion 1" } },
      { "component": "FollowUpItem", "props": { "text": "Follow-up suggestion 2" } }
    ]
  }
}
```

### MessageLoading

Loading indicator for messages.

```json
{
  "component": "MessageLoading",
  "props": {}
}
```

---

## Form Components

### Input

Text input field.

```json
{
  "component": "Input",
  "props": {
    "placeholder": "Enter text...",
    "label": "Name"
  }
}
```

### TextArea

Multi-line text input.

```json
{
  "component": "TextArea",
  "props": {
    "placeholder": "Enter description...",
    "rows": 4
  }
}
```

### Select

Dropdown selection.

```json
{
  "component": "Select",
  "props": {
    "placeholder": "Choose an option",
    "options": [
      { "label": "Option 1", "value": "opt1" },
      { "label": "Option 2", "value": "opt2" }
    ]
  }
}
```

### Button

Clickable button.

```json
{
  "component": "Button",
  "props": {
    "children": "Click Me",
    "variant": "primary"
  }
}
```

**Variants:** `primary`, `secondary`, `outline`, `ghost`

### Buttons

Button group container.

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

### CheckBoxGroup / CheckBoxItem

Checkbox selection.

```json
{
  "component": "CheckBoxGroup",
  "props": {
    "children": [
      { "component": "CheckBoxItem", "props": { "label": "Option A", "description": "Description for option A", "value": "a" } },
      { "component": "CheckBoxItem", "props": { "label": "Option B", "description": "Description for option B", "value": "b" } }
    ]
  }
}
```

### RadioGroup / RadioItem

Radio button selection.

```json
{
  "component": "RadioGroup",
  "props": {
    "children": [
      { "component": "RadioItem", "props": { "label": "Choice 1", "description": "Description for choice 1", "value": "1" } },
      { "component": "RadioItem", "props": { "label": "Choice 2", "description": "Description for choice 2", "value": "2" } }
    ]
  }
}
```

### SwitchGroup / SwitchItem

Toggle switch selection.

```json
{
  "component": "SwitchGroup",
  "props": {
    "children": [
      { "component": "SwitchItem", "props": { "label": "Option A", "value": "a" } },
      { "component": "SwitchItem", "props": { "label": "Option B", "value": "b" } }
    ]
  }
}
```

### Slider

Range slider.

```json
{
  "component": "Slider",
  "props": {
    "min": 0,
    "max": 100,
    "defaultValue": [50]
  }
}
```

### DatePicker

Date selection.

```json
{
  "component": "DatePicker",
  "props": {
    "placeholder": "Select a date"
  }
}
```

---

## Utility Components

### Separator

Visual divider.

```json
{
  "component": "Separator",
  "props": {}
}
```

### Label

Form field label.

```json
{
  "component": "Label",
  "props": {
    "children": "Field Label"
  }
}
```

---

## Complete Component List

| Category | Components |
|----------|------------|
| **Layout** | Card, CardHeader, Accordion, AccordionItem, AccordionTrigger, AccordionContent, Tabs, TabsList, TabsTrigger, TabsContent, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext |
| **Content** | TextContent, MarkDownRenderer, CodeBlock, Image |
| **Data Display** | Table, ListBlock, ListItem, Steps, StepsItem |
| **Charts** | BarChart, LineChart, AreaChart, PieChart |
| **Feedback** | Callout, TextCallout, Tag, TagBlock, FollowUpBlock, FollowUpItem, MessageLoading |
| **Forms** | Button, Buttons, Input, TextArea, Select, CheckBoxGroup, CheckBoxItem, RadioGroup, RadioItem, SwitchGroup, SwitchItem, Slider, DatePicker, Label |
| **Utility** | Separator |

---

## Complete Component Test Suite

This comprehensive example demonstrates all available Crayon UI components.

```json
{
  "components": [
    {
      "component": "Card",
      "props": {
        "children": [
          { "component": "CardHeader", "props": { "title": "Component Test Suite", "description": "Testing all Crayon UI components" } },
          { "component": "TextContent", "props": { "children": "This page tests all available Crayon UI components to verify they render correctly." } }
        ]
      }
    },
    {
      "component": "Callout",
      "props": { "variant": "neutral", "title": "Neutral Callout", "description": "This is a neutral callout for general information." }
    },
    {
      "component": "Callout",
      "props": { "variant": "info", "title": "Info Callout", "description": "This is an info callout for helpful tips." }
    },
    {
      "component": "Callout",
      "props": { "variant": "warning", "title": "Warning Callout", "description": "This is a warning callout for important notices." }
    },
    {
      "component": "Callout",
      "props": { "variant": "success", "title": "Success Callout", "description": "This is a success callout for positive feedback." }
    },
    {
      "component": "Callout",
      "props": { "variant": "error", "title": "Error Callout", "description": "This is an error callout for critical issues." }
    },
    {
      "component": "TextCallout",
      "props": { "title": "Note", "description": "TextCallout is a simpler callout variant for inline messages." }
    },
    {
      "component": "MarkDownRenderer",
      "props": { "textMarkdown": "## Markdown Renderer\n\nThis component renders **markdown** content with:\n- Bold text\n- *Italic text*\n- `inline code`\n\n```javascript\nconst hello = 'world';\n```" }
    },
    {
      "component": "Card",
      "props": {
        "children": [
          { "component": "CardHeader", "props": { "title": "Code Block Example" } },
          { "component": "CodeBlock", "props": { "codeString": "// Crayon UI Example\nimport { Card, Button } from '@crayonai/react-ui';\n\nfunction App() {\n  return <Card><Button>Click me</Button></Card>;\n}\n\nexport default App;", "language": "javascript" } }
        ]
      }
    },
    {
      "component": "Table",
      "props": {
        "columns": [
          { "key": "name", "header": "Component" },
          { "key": "category", "header": "Category" },
          { "key": "status", "header": "Status" }
        ],
        "data": [
          { "name": "Card", "category": "Layout", "status": "Working" },
          { "name": "Table", "category": "Data", "status": "Working" },
          { "name": "Charts", "category": "Visualization", "status": "Working" }
        ]
      }
    },
    {
      "component": "ListBlock",
      "props": {
        "children": [
          { "component": "ListItem", "props": { "title": "First List Item", "description": "Description for the first item" } },
          { "component": "ListItem", "props": { "title": "Second List Item", "description": "Description for the second item" } },
          { "component": "ListItem", "props": { "title": "Third List Item", "description": "Description for the third item" } }
        ]
      }
    },
    {
      "component": "Steps",
      "props": {
        "steps": [
          { "title": "Step 1: Install", "description": "Run npm install @crayonai/react-ui" },
          { "title": "Step 2: Configure", "description": "Set up your theme and providers" },
          { "title": "Step 3: Build", "description": "Start creating beautiful UIs" }
        ]
      }
    },
    {
      "component": "BarChart",
      "props": {
        "title": "Bar Chart - Monthly Sales",
        "data": [
          { "name": "Jan", "sales": 45, "revenue": 32 },
          { "name": "Feb", "sales": 52, "revenue": 41 },
          { "name": "Mar", "sales": 38, "revenue": 29 }
        ],
        "categories": ["sales", "revenue"]
      }
    },
    {
      "component": "LineChart",
      "props": {
        "title": "Line Chart - Weekly Activity",
        "data": [
          { "name": "Week 1", "users": 100, "sessions": 150 },
          { "name": "Week 2", "users": 120, "sessions": 180 },
          { "name": "Week 3", "users": 115, "sessions": 170 }
        ],
        "categories": ["users", "sessions"]
      }
    },
    {
      "component": "AreaChart",
      "props": {
        "title": "Area Chart - Quarterly Revenue",
        "data": [
          { "name": "Q1", "value": 400 },
          { "name": "Q2", "value": 300 },
          { "name": "Q3", "value": 500 }
        ],
        "categories": ["value"]
      }
    },
    {
      "component": "PieChart",
      "props": {
        "data": [
          { "category": "Desktop", "value": 45 },
          { "category": "Mobile", "value": 35 },
          { "category": "Tablet", "value": 20 }
        ],
        "categoryKey": "category",
        "dataKey": "value"
      }
    },
    {
      "component": "Card",
      "props": {
        "children": [
          { "component": "CardHeader", "props": { "title": "Tags & Labels" } },
          {
            "component": "TagBlock",
            "props": {
              "children": [
                { "component": "Tag", "props": { "text": "React" } },
                { "component": "Tag", "props": { "text": "TypeScript" } },
                { "component": "Tag", "props": { "text": "Crayon UI" } },
                { "component": "Tag", "props": { "text": "Vite" } }
              ]
            }
          }
        ]
      }
    },
    {
      "component": "Card",
      "props": {
        "children": [
          { "component": "CardHeader", "props": { "title": "Accordion Component" } },
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
                      { "component": "AccordionTrigger", "props": { "text": "What is Crayon UI?" } },
                      { "component": "AccordionContent", "props": { "children": "Crayon UI is a React component library for building AI-powered interfaces." } }
                    ]
                  }
                },
                {
                  "component": "AccordionItem",
                  "props": {
                    "value": "item-2",
                    "children": [
                      { "component": "AccordionTrigger", "props": { "text": "How do I install it?" } },
                      { "component": "AccordionContent", "props": { "children": "Run: npm install @crayonai/react-ui" } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      "component": "Card",
      "props": {
        "children": [
          { "component": "CardHeader", "props": { "title": "Tabs Component" } },
          {
            "component": "Tabs",
            "props": {
              "defaultValue": "overview",
              "children": [
                {
                  "component": "TabsList",
                  "props": {
                    "children": [
                      { "component": "TabsTrigger", "props": { "value": "overview", "text": "Overview" } },
                      { "component": "TabsTrigger", "props": { "value": "features", "text": "Features" } },
                      { "component": "TabsTrigger", "props": { "value": "usage", "text": "Usage" } }
                    ]
                  }
                },
                { "component": "TabsContent", "props": { "value": "overview", "children": "Crayon UI is a modern React component library." } },
                { "component": "TabsContent", "props": { "value": "features", "children": "Features include: Charts, Tables, Forms, and more." } },
                { "component": "TabsContent", "props": { "value": "usage", "children": "Import components and use them in your React app." } }
              ]
            }
          }
        ]
      }
    },
    {
      "component": "Card",
      "props": {
        "children": [
          { "component": "CardHeader", "props": { "title": "Carousel - Text Only" } },
          {
            "component": "Carousel",
            "props": {
              "showButtons": true,
              "children": [
                {
                  "component": "CarouselContent",
                  "props": {
                    "children": [
                      { "component": "CarouselItem", "props": { "children": "Slide 1: Welcome to Crayon UI" } },
                      { "component": "CarouselItem", "props": { "children": "Slide 2: Beautiful Components" } },
                      { "component": "CarouselItem", "props": { "children": "Slide 3: Easy Integration" } }
                    ]
                  }
                },
                { "component": "CarouselPrevious", "props": {} },
                { "component": "CarouselNext", "props": {} }
              ]
            }
          }
        ]
      }
    },
    {
      "component": "Card",
      "props": {
        "children": [
          { "component": "CardHeader", "props": { "title": "Carousel - With Images" } },
          {
            "component": "Carousel",
            "props": {
              "showButtons": true,
              "children": [
                {
                  "component": "CarouselContent",
                  "props": {
                    "children": [
                      {
                        "component": "CarouselItem",
                        "props": {
                          "children": [
                            { "component": "CardHeader", "props": { "title": "Mountain View", "subtitle": "Nature Photography" } },
                            { "component": "Image", "props": { "src": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop", "alt": "Mountain landscape" } }
                          ]
                        }
                      },
                      {
                        "component": "CarouselItem",
                        "props": {
                          "children": [
                            { "component": "CardHeader", "props": { "title": "Ocean Waves", "subtitle": "Seascape Photography" } },
                            { "component": "Image", "props": { "src": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=250&fit=crop", "alt": "Ocean beach" } }
                          ]
                        }
                      }
                    ]
                  }
                },
                { "component": "CarouselPrevious", "props": {} },
                { "component": "CarouselNext", "props": {} }
              ]
            }
          }
        ]
      }
    },
    {
      "component": "Separator",
      "props": {}
    },
    {
      "component": "Card",
      "props": {
        "children": [
          { "component": "CardHeader", "props": { "title": "Form Components" } },
          { "component": "Label", "props": { "children": "Name" } },
          { "component": "Input", "props": { "placeholder": "Enter your name..." } },
          { "component": "Label", "props": { "children": "Message" } },
          { "component": "TextArea", "props": { "placeholder": "Enter a longer message..." } },
          { "component": "Label", "props": { "children": "Options" } },
          { "component": "Select", "props": { "placeholder": "Select an option", "options": [{ "value": "a", "label": "Option A" }, { "value": "b", "label": "Option B" }, { "value": "c", "label": "Option C" }] } },
          { "component": "Separator", "props": {} },
          {
            "component": "Buttons",
            "props": {
              "children": [
                { "component": "Button", "props": { "children": "Submit" } },
                { "component": "Button", "props": { "children": "Cancel", "variant": "secondary" } }
              ]
            }
          }
        ]
      }
    },
    {
      "component": "Card",
      "props": {
        "children": [
          { "component": "CardHeader", "props": { "title": "Checkbox Group" } },
          {
            "component": "CheckBoxGroup",
            "props": {
              "children": [
                { "component": "CheckBoxItem", "props": { "label": "Enable notifications", "description": "Receive updates via email", "value": "notifications" } },
                { "component": "CheckBoxItem", "props": { "label": "Dark mode", "description": "Use dark theme by default", "value": "darkmode" } },
                { "component": "CheckBoxItem", "props": { "label": "Auto-save", "description": "Automatically save changes", "value": "autosave" } }
              ]
            }
          }
        ]
      }
    },
    {
      "component": "Card",
      "props": {
        "children": [
          { "component": "CardHeader", "props": { "title": "Radio Group" } },
          {
            "component": "RadioGroup",
            "props": {
              "children": [
                { "component": "RadioItem", "props": { "label": "Free Plan", "description": "Basic features, limited usage", "value": "free" } },
                { "component": "RadioItem", "props": { "label": "Pro Plan", "description": "All features, unlimited usage", "value": "pro" } },
                { "component": "RadioItem", "props": { "label": "Enterprise", "description": "Custom solutions, dedicated support", "value": "enterprise" } }
              ]
            }
          }
        ]
      }
    },
    {
      "component": "Card",
      "props": {
        "children": [
          { "component": "CardHeader", "props": { "title": "Switch Group" } },
          {
            "component": "SwitchGroup",
            "props": {
              "children": [
                { "component": "SwitchItem", "props": { "label": "Email notifications", "description": "Receive email updates", "value": "email" } },
                { "component": "SwitchItem", "props": { "label": "Push notifications", "description": "Receive push alerts", "value": "push" } }
              ]
            }
          }
        ]
      }
    },
    {
      "component": "Card",
      "props": {
        "children": [
          { "component": "CardHeader", "props": { "title": "Slider" } },
          { "component": "Slider", "props": { "defaultValue": [50], "max": 100, "step": 1 } }
        ]
      }
    },
    {
      "component": "Card",
      "props": {
        "children": [
          { "component": "CardHeader", "props": { "title": "Date Picker" } },
          { "component": "DatePicker", "props": { "placeholder": "Select a date" } }
        ]
      }
    },
    {
      "component": "Card",
      "props": {
        "children": [
          { "component": "CardHeader", "props": { "title": "Follow-up Suggestions" } },
          {
            "component": "FollowUpBlock",
            "props": {
              "children": [
                { "component": "FollowUpItem", "props": { "text": "Tell me more about this" } },
                { "component": "FollowUpItem", "props": { "text": "Show me examples" } },
                { "component": "FollowUpItem", "props": { "text": "How do I get started?" } }
              ]
            }
          }
        ]
      }
    },
    {
      "component": "Card",
      "props": {
        "children": [
          { "component": "CardHeader", "props": { "title": "Loading State" } },
          { "component": "MessageLoading", "props": {} }
        ]
      }
    },
    {
      "component": "Card",
      "props": {
        "children": [
          { "component": "CardHeader", "props": { "title": "All Components Tested!", "description": "Test suite complete" } },
          { "component": "Callout", "props": { "variant": "success", "title": "Success", "description": "All Crayon UI components have been rendered successfully." } }
        ]
      }
    }
  ]
}
```

### Components Covered

| Category | Components Included |
|----------|---------------------|
| **Layout** | Card, CardHeader, Accordion, AccordionItem, AccordionTrigger, AccordionContent, Tabs, TabsList, TabsTrigger, TabsContent, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext |
| **Content** | TextContent, MarkDownRenderer, CodeBlock, Image |
| **Data Display** | Table, ListBlock, ListItem, Steps |
| **Charts** | BarChart, LineChart, AreaChart, PieChart |
| **Feedback** | Callout (all variants), TextCallout, Tag, TagBlock, FollowUpBlock, FollowUpItem, MessageLoading |
| **Forms** | Button, Buttons, Input, TextArea, Select, CheckBoxGroup, CheckBoxItem, RadioGroup, RadioItem, SwitchGroup, SwitchItem, Slider, DatePicker, Label |
| **Utility** | Separator |

All components listed above are tested and working.
