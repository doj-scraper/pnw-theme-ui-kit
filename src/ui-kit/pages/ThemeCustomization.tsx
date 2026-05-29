import { ThemeProvider, useTheme, themes } from '../../theme/ThemeProvider';

function ThemeCustomizationContent() {
  const { theme, setTheme, mode, toggleMode } = useTheme();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <header className="border-b border-[var(--surface)] sticky top-0 z-40 bg-[var(--bg)]/95 backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Theme Customization</h1>
          <button
            onClick={toggleMode}
            className="px-3 py-2 rounded-lg bg-[var(--surface)] hover:bg-[var(--muted)]/10 transition-colors"
          >
            {mode === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        <section>
          <h2 className="text-3xl font-bold mb-4">Customize Your Theme</h2>
          <p className="text-[var(--muted)] mb-6">
            AICG UI Kit comes with 4 professional palettes. Switch between them or create your own.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold">Available Themes</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.values(themes).map((t) => (
              <button
                key={t.name}
                onClick={() => setTheme(t.name as any)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  theme === t.name
                    ? 'border-[var(--primary)] bg-[var(--surface)]'
                    : 'border-[var(--surface)] hover:border-[var(--primary)]'
                }`}
              >
                <h4 className="font-semibold text-sm mb-2">{t.label}</h4>
                <div className="flex gap-2">
                  <div
                    className="w-6 h-6 rounded"
                    style={{ backgroundColor: t.light.primary }}
                  />
                  <div
                    className="w-6 h-6 rounded"
                    style={{ backgroundColor: t.light.muted }}
                  />
                  <div
                    className="w-6 h-6 rounded"
                    style={{ backgroundColor: t.light.bg }}
                  />
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold">Using useTheme Hook</h3>
          <div className="bg-[var(--surface)] border border-[var(--muted)]/30 rounded-lg p-4">
            <pre className="text-sm overflow-x-auto">
              <code>{`import { useTheme } from '@aicg/ui-kit';

export function ThemeSwitcher() {
  const { theme, setTheme, mode, toggleMode } = useTheme();

  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="canopy">Canopy</option>
        <option value="monolith">Monolith</option>
        <option value="basalt">Basalt</option>
        <option value="blueprint">Blueprint</option>
      </select>
      <button onClick={toggleMode}>
        {mode === 'light' ? 'Dark' : 'Light'}
      </button>
    </div>
  );
}`}</code>
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold">CSS Variables</h3>
          <p className="text-[var(--muted)] mb-4">
            Themes use CSS custom properties for dynamic styling:
          </p>
          <div className="bg-[var(--surface)] border border-[var(--muted)]/30 rounded-lg p-4">
            <pre className="text-sm overflow-x-auto">
              <code>{`/* Available CSS variables */
--bg: Background color
--surface: Surface/card color
--text: Text color
--primary: Primary brand color
--muted: Muted/secondary color

/* Usage in CSS */
.my-component {
  background-color: var(--bg);
  color: var(--text);
  border-color: var(--muted);
}`}</code>
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold">Creating Custom Themes</h3>
          <p className="text-[var(--muted)] mb-4">
            Add custom themes by extending the theme system:
          </p>
          <div className="bg-[var(--surface)] border border-[var(--muted)]/30 rounded-lg p-4">
            <pre className="text-sm overflow-x-auto">
              <code>{`// src/theme/custom.ts
export const customTheme = {
  name: 'custom',
  label: 'My Custom Theme',
  light: {
    bg: '#ffffff',
    surface: '#f5f5f5',
    text: '#000000',
    primary: '#0066cc',
    muted: '#666666',
  },
  dark: {
    bg: '#1a1a1a',
    surface: '#2d2d2d',
    text: '#ffffff',
    primary: '#3399ff',
    muted: '#999999',
  },
};`}</code>
            </pre>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function ThemeCustomization() {
  return (
    <ThemeProvider>
      <ThemeCustomizationContent />
    </ThemeProvider>
  );
}
