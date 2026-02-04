# Crayon UI Agent Skill

An Agent Skill that enables AI assistants to render responses as interactive UI components instead of plain text. Built on [Crayon UI](https://crayonai.org/ui/), this skill transforms structured JSON into beautiful, interactive interfaces.

## Demo

<video src="URL" controls width="100%"></video>

## What It Does

Instead of outputting plain text responses, AI agents using this skill can render:
- **Cards & Layouts** - Structured content containers
- **Tables** - Tabular data with headers
- **Charts** - Bar, Line, Area, and Pie charts
- **Forms** - Inputs, selects, checkboxes, radio buttons
- **Markdown** - Rich formatted text
- **Code Blocks** - Syntax-highlighted code
- **And more...** - Accordions, tabs, carousels, callouts, etc.

## Prerequisites

- **Node.js** v18 or higher
- **npm** (comes with Node.js)
- A modern web browser

## Installation

### For Cursor

1. **Copy the skill folder** to your Cursor skills directory:

   ```bash
   # Copy to global Cursor skills (available in all projects)
   cp -r crayon-ui-agent-skill ~/.cursor/skills/

   # OR copy to project-specific skills
   cp -r crayon-ui-agent-skill /path/to/your/project/.cursor/skills/
   ```

2. **Install dependencies**:

   ```bash
   cd ~/.cursor/skills/crayon-ui-agent-skill
   
   # Install validator dependencies (ajv for JSON schema validation)
   npm install
   
   # Install app dependencies (React UI renderer)
   cd app && npm install
   ```

3. **Restart Cursor** to load the new skill.

### For Claude Code / Codex CLI

1. **Copy the skill folder** to the Codex skills directory:

   ```bash
   cp -r crayon-ui-agent-skill ~/.codex/skills/
   ```

2. **Install dependencies**:

   ```bash
   cd ~/.codex/skills/crayon-ui-agent-skill
   
   # Install validator dependencies
   npm install
   
   # Install app dependencies
   cd app && npm install
   ```

### For Other AI Tools

The skill follows the [Agent Skills](https://agentskills.io/) open format. Copy
the skill folder to your tool's skills directory and run `npm install` in both the skill root (for LLM response validation) and the `app/` folder (for the UI renderer).

## Usage

### Starting the Crayon Server

> **Note:** The `SKILL.md` already instructs the AI agent to automatically check if the server is running and start it if needed. You can skip this step if you're letting the AI handle everything.

If you prefer to start the server manually:

```bash
# Navigate to the skill directory and run the start script
cd /path/to/crayon-ui-agent-skill
./scripts/start.sh
```

Or:

```bash
cd /path/to/crayon-ui-agent-skill/app
npm run dev
```

The server will start on **http://localhost:5500**. Open this URL in your browser to see the rendered UI.

### Using the Skill

Once installed, the AI agent will automatically use this skill when appropriate. You can trigger it by asking for:

- "Show me this data in a table using crayon-ui"
- "Create a chart of these values using crayon-ui"
- "Display this information in a nice card layout using crayon-ui"
- "Render this as an interactive UI using crayon-ui"
- "Explain how Internet works using crayon-ui"

### How It Works

1. The AI generates structured JSON describing UI components
2. The JSON is written to `~/.crayon/response.json`
3. The AI validates the JSON using `./scripts/validate.sh`
4. If validation fails, the AI fixes errors and re-validates
5. The Crayon app (running in your browser) auto-detects changes and renders the UI

## File Structure

```
crayon-ui-agent-skill/
├── SKILL.md              # Main skill instructions for AI agents
├── README.md             # This file
├── package.json          # Validator dependencies (ajv)
├── app/                  # React app that renders the UI
│   ├── src/
│   │   ├── App.tsx
│   │   ├── componentRegistry.tsx
│   │   └── ...
│   ├── package.json
│   └── vite.config.ts
├── references/
│   ├── schema.json       # JSON Schema for component validation
│   └── BRAND.md          # Styling/theming guide
└── scripts/
    ├── start.sh          # Server startup script
    ├── validate.sh       # Schema validation wrapper
    └── validate.js       # Validation logic (uses ajv)
```

## Available Components

| Category | Components |
|----------|------------|
| **Layout** | Card, CardHeader, Accordion, Tabs, Carousel |
| **Content** | TextContent, MarkDownRenderer, CodeBlock, Image |
| **Data Display** | Table, ListBlock, Steps |
| **Charts** | BarChart, LineChart, AreaChart, PieChart |
| **Feedback** | Callout, TextCallout, Tag, MessageLoading |
| **Forms** | Button, Input, TextArea, Select, CheckBoxGroup, RadioGroup, Slider, DatePicker |

See [SKILL.md](SKILL.md) for complete component documentation with examples.

## Troubleshooting

### Server Not Starting

1. Ensure Node.js v18+ is installed: `node --version`
2. Ensure dependencies are installed: `cd app && npm install`
3. Check if port 5500 is available: `lsof -i :5500`

### UI Not Updating

1. Ensure the browser is open to http://localhost:5500
2. Check that `~/.crayon/response.json` exists and contains valid JSON
3. Check browser console for errors

### Components Not Rendering

1. Verify the component name matches exactly (case-sensitive)
2. Check that required props are provided
3. Run `./scripts/validate.sh` to check for schema errors
4. Refer to [SKILL.md](SKILL.md) for correct prop names and examples

## Development

To modify the skill:

1. Edit components in `app/src/componentRegistry.tsx`
2. Update styling in `app/src/styles/brand.css`
3. Update schema in `references/schema.json` (for validation)
4. Update examples in `SKILL.md` (for AI agent reference)

The app uses hot-reload, so changes appear immediately.

## License

MIT

## Links

- [Crayon UI Documentation](https://crayonai.org/docs/)
- [Agent Skills Format](https://agentskills.io/)
