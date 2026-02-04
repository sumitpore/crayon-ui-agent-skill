# Crayon UI Brand Guidelines

## Overview

The Crayon UI Renderer uses a clean, minimal theme inspired by modern documentation and note-taking apps. The design emphasizes content-focus, readability, and subtle visual refinement.

## Design Philosophy

- **Content-first**: Minimal chrome, maximum focus on the actual content
- **Warm neutrals**: Subtle, comfortable tones that reduce eye strain
- **Subtle interactions**: Gentle hover states and transitions
- **Generous whitespace**: Breathing room that makes content approachable

## Colors

### Core Colors

| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--ui-bg` | `#FFFFFF` | `#191919` | Primary background |
| `--ui-bg-secondary` | `#F7F6F3` | `#202020` | Secondary surfaces, cards |
| `--ui-bg-hover` | `rgba(55,53,47,0.04)` | `rgba(255,255,255,0.04)` | Hover states |
| `--ui-bg-active` | `rgba(55,53,47,0.08)` | `rgba(255,255,255,0.08)` | Active states |

### Text Colors

| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--ui-text` | `#37352F` | `rgba(255,255,255,0.9)` | Primary text |
| `--ui-text-secondary` | `#787774` | `rgba(255,255,255,0.6)` | Secondary text |
| `--ui-text-tertiary` | `#9B9A97` | `rgba(255,255,255,0.4)` | Muted text |

### Border Colors

| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--ui-border` | `rgba(55,53,47,0.09)` | `rgba(255,255,255,0.09)` | Subtle borders |
| `--ui-border-strong` | `rgba(55,53,47,0.16)` | `rgba(255,255,255,0.16)` | Emphasized borders |

### Accent Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--accent-blue` | `#2383E2` | Primary accent, links, info |
| `--accent-green` | `#0F7B6C` | Success states |
| `--accent-red` | `#E03E3E` | Error states |
| `--accent-yellow` | `#DFAB01` | Warning states |
| `--accent-orange` | `#D9730D` | Highlights |
| `--accent-purple` | `#9065B0` | Special accents |
| `--accent-gray` | `#9B9A97` | Neutral callouts |

### Tinted Backgrounds

| Variable | Value | Usage |
|----------|-------|-------|
| `--tint-blue` | `rgba(35,131,226,0.1)` | Info backgrounds |
| `--tint-green` | `rgba(15,123,108,0.1)` | Success backgrounds |
| `--tint-red` | `rgba(224,62,62,0.1)` | Error backgrounds |
| `--tint-yellow` | `rgba(223,171,1,0.1)` | Warning backgrounds |

## Typography

### Font Stack

| Type | Font | Notes |
|------|------|-------|
| **Sans-serif** | `ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif` | System fonts for consistency with Crayon UI components |
| **Monospace** | `ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace` | Code blocks |

**Note:** We use system fonts to maintain consistency with Crayon UI's internal component styling.

### Font Weights

- **Regular (400)**: Body text
- **Medium (500)**: Labels, subtle emphasis
- **Semibold (600)**: Headings, strong emphasis
- **Bold (700)**: Primary headings

### Type Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 | 2.25rem | 700 | 1.2 |
| H2 | 1.5rem | 600 | 1.3 |
| H3 | 1.25rem | 600 | 1.3 |
| Body | 1rem (16px) | 400 | 1.6 |
| Small | 0.9rem | 400 | 1.5 |

## Spacing

### Spacing Scale

| Variable | Value | Usage |
|----------|-------|-------|
| `--space-xs` | 4px | Tight spacing |
| `--space-sm` | 8px | Small gaps |
| `--space-md` | 16px | Default spacing |
| `--space-lg` | 24px | Section spacing |
| `--space-xl` | 32px | Large spacing |
| `--space-2xl` | 48px | Page margins |

### Border Radius

| Variable | Value | Usage |
|----------|-------|-------|
| `--radius-sm` | 3px | Inputs, tags |
| `--radius-md` | 6px | Cards, buttons |
| `--radius-lg` | 8px | Modals, panels |

### Shadows

| Variable | Value | Usage |
|----------|-------|-------|
| `--shadow-sm` | `rgba(15,15,15,0.04) 0px 0px 0px 1px, rgba(15,15,15,0.03) 0px 3px 6px` | Subtle elevation |
| `--shadow-md` | `rgba(15,15,15,0.04) 0px 0px 0px 1px, rgba(15,15,15,0.03) 0px 3px 6px, rgba(15,15,15,0.06) 0px 9px 24px` | Cards on hover |

## Visual Elements

### Status Indicator

- Green pulsing dot (`--accent-green`) with "Live" label
- Tinted green background (`--tint-green`)
- Subtle pulse animation (2s infinite)

### Cards

- Clean white background
- 1px subtle border (`--ui-border`)
- Gentle shadow on hover
- `overflow: hidden` for content containment

### Callout Variants

| Variant | Border Color | Background |
|---------|--------------|------------|
| Neutral | `--accent-gray` | `--tint-gray` |
| Info | `--accent-blue` | `--tint-blue` |
| Warning | `--accent-yellow` | `--tint-yellow` |
| Success | `--accent-green` | `--tint-green` |
| Error | `--accent-red` | `--tint-red` |

## Animation

### Fade In

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

- Duration: 0.2s
- Easing: ease-out
- Applied to component renders

### Pulse (Status Indicator)

```css
@keyframes pulse-subtle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
```

- Duration: 2s infinite
- Applied to status dot

## Dark Mode

The theme supports automatic dark mode via `prefers-color-scheme: dark`. All CSS variables automatically switch to their dark mode values.

## CSS Variable Naming

- `--ui-*`: Core UI colors and values
- `--accent-*`: Accent/brand colors
- `--tint-*`: Semi-transparent tinted backgrounds
- `--space-*`: Spacing values
- `--radius-*`: Border radius values
- `--shadow-*`: Box shadow values

**Note:** We avoid using `--crayon-*` prefix for custom variables to prevent conflicts with Crayon UI's internal CSS variables.
