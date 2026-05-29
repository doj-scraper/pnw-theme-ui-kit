import { ThemeProvider, useTheme } from '../../theme/ThemeProvider';
import { Button } from '../../components/Button';

function InstallationContent() {
  const { mode, toggleMode } = useTheme();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <header className="border-b border-[var(--surface)] sticky top-0 z-40 bg-[var(--bg)]/95 backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Installation</h1>
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
          <h2 className="text-3xl font-bold mb-4">Getting Started with AICG UI Kit</h2>
          <p className="text-[var(--muted)] mb-6">
            AICG UI Kit is a professional design system built with React, TypeScript, and Tailwind CSS. Follow these steps to get started.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold">Installation</h3>
          <div className="bg-[var(--surface)] border border-[var(--muted)]/30 rounded-lg p-4">
            <pre className="text-sm overflow-x-auto">
              <code>{`npm install @aicg/ui-kit`}</code>
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold">Setup</h3>
          <p className="text-[var(--muted)]">Wrap your app with ThemeProvider:</p>
          <div className="bg-[var(--surface)] border border-[var(--muted)]/30 rounded-lg p-4">
            <pre className="text-sm overflow-x-auto">
              <code>{`import { ThemeProvider } from '@aicg/ui-kit';

export default function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}`}</code>
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold">Import Components</h3>
          <div className="bg-[var(--surface)] border border-[var(--muted)]/30 rounded-lg p-4">
            <pre className="text-sm overflow-x-auto">
              <code>{`import { Button, Input, Card } from '@aicg/ui-kit';

export function MyComponent() {
  return (
    <Card>
      <Input placeholder="Enter text..." />
      <Button text="Submit" variant="primary" />
    </Card>
  );
}`}</code>
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold">Tailwind CSS</h3>
          <p className="text-[var(--muted)]">
            AICG UI Kit requires Tailwind CSS v4. Add to your tailwind.config.js:
          </p>
          <div className="bg-[var(--surface)] border border-[var(--muted)]/30 rounded-lg p-4">
            <pre className="text-sm overflow-x-auto">
              <code>{`module.exports = {
  content: [
    './node_modules/@aicg/ui-kit/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
};`}</code>
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold">Next Steps</h3>
          <ul className="space-y-2 text-[var(--muted)]">
            <li>• Explore components in the <a href="/docs" className="text-[var(--primary)] hover:underline">Component Library</a></li>
            <li>• Read the <a href="/docs/theme-customization" className="text-[var(--primary)] hover:underline">Theme Customization</a> guide</li>
            <li>• Check out <a href="/docs/accessibility" className="text-[var(--primary)] hover:underline">Accessibility</a> best practices</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default function Installation() {
  return (
    <ThemeProvider>
      <InstallationContent />
    </ThemeProvider>
  );
}
