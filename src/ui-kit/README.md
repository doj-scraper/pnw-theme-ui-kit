# PNW Theme UI Kit

A comprehensive, production-ready UI component library built on Blueprint.js with custom Pacific Northwest-inspired themes.

## Features

- **3 Custom PNW Themes** + Blueprint Core (12 total variants with dark/light modes)
  - 🌲 **Timberline Canopy** - Forest greens with natural warmth
  - 🏔️ **Haystack Monolith** - Stone grays with architectural precision
  - 🌋 **Alvord Basalt** - Volcanic blacks with amber accents
  - 🔷 **Blueprint Core** - Classic Blueprint design system

- **Complete Component Library**
  - Button, Input, Card, Select
  - Dialog, Table, Tree, Tabs
  - Tag, Callout, FormGroup
  - DateRangeInput

- **Theme System**
  - React Context-based theme provider
  - CSS custom properties for runtime theming
  - TypeScript types for full type safety
  - Dark/light mode support

## Installation

The UI kit is already included in this project. All dependencies are installed.

## Usage

### Basic Setup

Wrap your app with the `ThemeProvider`:

\`\`\`tsx
import { ThemeProvider } from './ui-kit';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
\`\`\`

### Using Components

\`\`\`tsx
import { Button, Card, Input, useTheme } from './ui-kit';

function MyComponent() {
  const { theme, mode, setTheme, toggleMode } = useTheme();

  return (
    <Card className="p-6">
      <Input placeholder="Enter text..." />
      <Button text="Submit" intent="primary" />
    </Card>
  );
}
\`\`\`

### Switching Themes

\`\`\`tsx
import { useTheme, themes } from './ui-kit';

function ThemeSwitcher() {
  const { theme, setTheme, mode, toggleMode } = useTheme();

  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        {Object.values(themes).map(t => (
          <option key={t.name} value={t.name}>{t.label}</option>
        ))}
      </select>
      <button onClick={toggleMode}>
        {mode === 'dark' ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
}
\`\`\`

## Available Components

### Layout
- `Card` - Container with themed background and borders

### Forms
- `Button` - Buttons with intents (primary, success, warning, danger)
- `Input` - Text inputs with icons and validation states
- `Select` - Dropdown selects
- `FormGroup` - Form field wrapper with labels and helper text
- `DateRangeInput` - Date range picker

### Data Display
- `Table` - Data tables with sorting and selection
- `Tree` - Hierarchical tree view
- `Tabs` - Tabbed navigation
- `Tag` - Labels and badges
- `Callout` - Alert boxes and notifications

### Overlays
- `Dialog` - Modal dialogs
- `DialogBody` - Dialog content wrapper
- `DialogFooter` - Dialog action buttons

## Theme Tokens

Each theme provides these CSS custom properties:

\`\`\`css
--color-bg          /* Background color */
--color-surface     /* Surface/card color */
--color-text        /* Text color */
--color-primary     /* Primary/brand color */
--color-muted       /* Muted/secondary text */
--font-header       /* Header font stack */
--font-body         /* Body font stack */
\`\`\`

## TypeScript Support

Full TypeScript support with exported types:

\`\`\`tsx
import type { 
  ButtonProps, 
  InputProps, 
  CardProps,
  ThemeName,
  ThemeMode,
  ThemeConfig 
} from './ui-kit';
\`\`\`

## Showcase

View all components in action:

\`\`\`bash
npm run dev
\`\`\`

Then navigate to the showcase page to see all components with live theme switching.

## Customization

### Adding a New Theme

1. Add theme tokens to `src/ui-kit/theme/tokens.ts`:

\`\`\`tsx
export const themes = {
  // ... existing themes
  myTheme: {
    name: 'myTheme',
    label: 'My Custom Theme',
    light: {
      bg: '#FFFFFF',
      surface: '#F5F5F5',
      text: '#000000',
      primary: '#0066CC',
      muted: '#666666',
      fontHeader: 'sans-serif',
      fontBody: 'sans-serif',
    },
    dark: { /* ... */ },
  },
};
\`\`\`

2. Update the `ThemeName` type in `src/ui-kit/theme/types.ts`:

\`\`\`tsx
export type ThemeName = 'canopy' | 'monolith' | 'basalt' | 'blueprint' | 'myTheme';
\`\`\`

3. Add CSS variables to `src/index.css`:

\`\`\`css
[data-theme="myTheme"] {
  --theme-bg: #FFFFFF;
  --theme-surface: #F5F5F5;
  /* ... */
}
\`\`\`

## Architecture

\`\`\`
src/ui-kit/
├── components/          # Component wrappers
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   └── ...
├── theme/              # Theme system
│   ├── ThemeProvider.tsx
│   ├── tokens.ts
│   └── types.ts
└── index.ts            # Barrel exports
\`\`\`

## License

Apache-2.0
