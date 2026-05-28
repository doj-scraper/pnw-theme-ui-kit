<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# PNW Theme Showroom & UI Kit

This project contains a complete UI component library with Pacific Northwest-inspired themes built on Blueprint.js.

View your app in AI Studio: https://ai.studio/apps/0bb79d4b-bf13-473a-8ed0-6fbd29e86a88

## 🎨 Features

### 3 Custom PNW Themes + Blueprint Core
- 🌲 **Timberline Canopy** - Forest greens with natural warmth
- 🏔️ **Haystack Monolith** - Stone grays with architectural precision  
- 🌋 **Alvord Basalt** - Volcanic blacks with amber accents
- 🔷 **Blueprint Core** - Classic Blueprint design system

Each theme includes dark and light mode variants (6 total theme variants).

### Complete Component Library
All components are pre-styled and theme-aware:
- **Forms**: Button, Input, Select, FormGroup, DateRangeInput
- **Layout**: Card
- **Data**: Table, Tree, Tabs, Tag
- **Feedback**: Callout, Dialog
- **Theme**: ThemeProvider, useTheme hook

## 🚀 Quick Start

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

2. Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key

3. Run the app:
   ```bash
   npm run dev
   ```

## 📚 UI Kit Documentation

The complete UI kit is located in `src/ui-kit/`:

```
src/ui-kit/
├── components/          # All UI components
├── theme/              # Theme system & tokens
├── index.ts            # Main exports
├── README.md           # Full documentation
└── EXAMPLES.md         # Usage examples
```

### View the Showcase

To see all components with live theme switching, edit `src/main.tsx`:

```tsx
// Uncomment these lines:
import UIKitShowcase from './UIKitShowcase.tsx';

// And replace <App /> with:
<UIKitShowcase />
```

Then run `npm run dev` and open http://localhost:3000

## 💻 Using the UI Kit

### Basic Setup

```tsx
import { ThemeProvider, Button, Card, Input } from './ui-kit';

function App() {
  return (
    <ThemeProvider>
      <Card className="p-6">
        <Input placeholder="Enter text..." />
        <Button text="Submit" intent="primary" />
      </Card>
    </ThemeProvider>
  );
}
```

### Theme Switching

```tsx
import { useTheme, themes } from './ui-kit';

function MyComponent() {
  const { theme, mode, setTheme, toggleMode } = useTheme();

  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        {Object.values(themes).map(t => (
          <option key={t.name} value={t.name}>{t.label}</option>
        ))}
      </select>
      <button onClick={toggleMode}>
        Toggle {mode === 'dark' ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
}
```

## 📖 Documentation

- **[UI Kit README](src/ui-kit/README.md)** - Complete component documentation
- **[Usage Examples](src/ui-kit/EXAMPLES.md)** - Code examples for all components
- **[Theme Tokens](src/ui-kit/theme/tokens.ts)** - Theme configuration

## 🎯 Use Cases

This UI kit is perfect for:
- Building consistent multi-theme applications
- Creating dashboards and admin panels
- Rapid prototyping with pre-styled components
- Projects requiring dark/light mode support
- Applications needing a professional, cohesive design system

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Type check with TypeScript

## 📦 Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Blueprint.js** - Base component library
- **Tailwind CSS v4** - Utility-first styling
- **Vite** - Build tool

## 🎨 Theme Customization

Add your own theme by editing `src/ui-kit/theme/tokens.ts` and `src/index.css`. See the [UI Kit README](src/ui-kit/README.md) for details.

## 📄 License

Apache-2.0
