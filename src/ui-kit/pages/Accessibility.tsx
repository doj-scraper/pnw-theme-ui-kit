import { ThemeProvider, useTheme } from '../../theme/ThemeProvider';

function AccessibilityContent() {
  const { mode, toggleMode } = useTheme();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <header className="border-b border-[var(--surface)] sticky top-0 z-40 bg-[var(--bg)]/95 backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Accessibility</h1>
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
          <h2 className="text-3xl font-bold mb-4">Accessibility Guidelines</h2>
          <p className="text-[var(--muted)] mb-6">
            AICG UI Kit is built with accessibility in mind. All components follow WCAG 2.1 AA standards.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold">Keyboard Navigation</h3>
          <ul className="space-y-2 text-[var(--muted)]">
            <li>• <strong>Tab:</strong> Navigate between interactive elements</li>
            <li>• <strong>Shift+Tab:</strong> Navigate backwards</li>
            <li>• <strong>Enter/Space:</strong> Activate buttons and toggles</li>
            <li>• <strong>Arrow Keys:</strong> Navigate within menus and lists</li>
            <li>• <strong>Escape:</strong> Close dialogs and popovers</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold">ARIA Labels</h3>
          <p className="text-[var(--muted)] mb-4">Always provide meaningful labels:</p>
          <div className="bg-[var(--surface)] border border-[var(--muted)]/30 rounded-lg p-4">
            <pre className="text-sm overflow-x-auto">
              <code>{`// Good: Descriptive label
<Checkbox label="I agree to the terms" />

// Good: aria-label for icon buttons
<button aria-label="Close dialog">
  <X size={16} />
</button>

// Good: FormGroup with label
<FormGroup label="Email" helperText="Required">
  <Input type="email" />
</FormGroup>`}</code>
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold">Color Contrast</h3>
          <p className="text-[var(--muted)] mb-4">
            All themes meet WCAG AA contrast requirements (4.5:1 for text, 3:1 for UI components).
          </p>
          <ul className="space-y-2 text-[var(--muted)]">
            <li>• Text on background: 7:1+ contrast ratio</li>
            <li>• Interactive elements: 3:1+ contrast ratio</li>
            <li>• Don't rely on color alone to convey information</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold">Focus Management</h3>
          <p className="text-[var(--muted)] mb-4">
            All interactive components have visible focus indicators:
          </p>
          <div className="bg-[var(--surface)] border border-[var(--muted)]/30 rounded-lg p-4">
            <pre className="text-sm overflow-x-auto">
              <code>{`/* Focus styles are built-in */
<Button /> /* Has focus:ring-2 focus:ring-primary */
<Input /> /* Has focus:outline-none focus:ring-2 */
<Checkbox /> /* Has focus:ring-2 focus:ring-offset-2 */`}</code>
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold">Semantic HTML</h3>
          <p className="text-[var(--muted)] mb-4">
            Components use semantic HTML elements for better screen reader support:
          </p>
          <ul className="space-y-2 text-[var(--muted)]">
            <li>• Buttons use <code>&lt;button&gt;</code> elements</li>
            <li>• Forms use <code>&lt;label&gt;</code> and <code>&lt;input&gt;</code></li>
            <li>• Navigation uses <code>&lt;nav&gt;</code> and <code>&lt;a&gt;</code></li>
            <li>• Lists use <code>&lt;ul&gt;</code>, <code>&lt;ol&gt;</code>, <code>&lt;li&gt;</code></li>
          </ul>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold">Dark Mode</h3>
          <p className="text-[var(--muted)]">
            All components support dark mode with proper contrast ratios. Users can toggle dark mode using the theme switcher.
          </p>
        </section>
      </main>
    </div>
  );
}

export default function Accessibility() {
  return (
    <ThemeProvider>
      <AccessibilityContent />
    </ThemeProvider>
  );
}
