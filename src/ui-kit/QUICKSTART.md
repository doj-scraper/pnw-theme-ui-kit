# Quick Start Guide

## Installation

```bash
npm install --legacy-peer-deps
```

## View the UI Kit Showcase

1. Open `src/main.tsx`
2. Uncomment the import and component:

```tsx
import UIKitShowcase from './UIKitShowcase.tsx';

// In the render:
<UIKitShowcase />
```

3. Run the dev server:

```bash
npm run dev
```

4. Open http://localhost:3000

## Use the UI Kit in Your Project

### 1. Wrap your app with ThemeProvider

```tsx
import { ThemeProvider } from './ui-kit';
import MyApp from './MyApp';

function Root() {
  return (
    <ThemeProvider>
      <MyApp />
    </ThemeProvider>
  );
}
```

### 2. Import and use components

```tsx
import { Button, Card, Input, useTheme } from './ui-kit';

function MyApp() {
  const { theme, mode, setTheme, toggleMode } = useTheme();

  return (
    <div className="min-h-screen bg-bg text-text p-6">
      <Card className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-header mb-4">My App</h1>
        <Input placeholder="Enter something..." className="mb-4" />
        <Button text="Submit" intent="primary" />
      </Card>
    </div>
  );
}
```

### 3. Add theme switcher

```tsx
import { useTheme, themes } from './ui-kit';
import { Moon, Sun } from 'lucide-react';

function ThemeSwitcher() {
  const { theme, mode, setTheme, toggleMode } = useTheme();

  return (
    <div className="flex gap-2">
      <select 
        value={theme} 
        onChange={(e) => setTheme(e.target.value as any)}
        className="bg-surface text-text border border-muted/20 rounded px-2 py-1"
      >
        {Object.values(themes).map(t => (
          <option key={t.name} value={t.name}>{t.label}</option>
        ))}
      </select>
      
      <button 
        onClick={toggleMode}
        className="bg-surface text-text border border-muted/20 rounded px-2 py-1"
      >
        {mode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>
    </div>
  );
}
```

## Available Themes

- **canopy** - Timberline Canopy (Forest greens)
- **monolith** - Haystack Monolith (Stone grays)
- **basalt** - Alvord Basalt (Volcanic blacks with amber)
- **blueprint** - Blueprint Core (Classic Blueprint)

Each theme has light and dark mode variants.

## Available Components

### Forms
- `Button` - Buttons with various intents
- `Input` - Text inputs with icons
- `Select` - Dropdown selects
- `FormGroup` - Form field wrapper
- `DateRangeInput` - Date range picker

### Layout
- `Card` - Container component

### Data Display
- `Table` - Data tables
- `Tree` - Hierarchical tree view
- `Tabs` - Tabbed navigation
- `Tag` - Labels and badges

### Feedback
- `Callout` - Alert boxes
- `Dialog` - Modal dialogs

### Theme
- `ThemeProvider` - Context provider
- `useTheme()` - Hook for theme control

## CSS Variables

All theme colors are available as CSS custom properties:

- `--color-bg` - Background color
- `--color-surface` - Surface/card color
- `--color-text` - Text color
- `--color-primary` - Primary/brand color
- `--color-muted` - Muted/secondary text
- `--font-header` - Header font stack
- `--font-body` - Body font stack

Use them in your custom styles:

```css
.my-component {
  background-color: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-muted);
}
```

Or with Tailwind:

```tsx
<div className="bg-surface text-text border border-muted/20">
  Content
</div>
```

## More Examples

See [EXAMPLES.md](./EXAMPLES.md) for comprehensive usage examples.

## Documentation

- [UI Kit README](./README.md) - Full component documentation
- [Theme Tokens](./theme/tokens.ts) - Theme configuration
- [Examples](./EXAMPLES.md) - Code examples
