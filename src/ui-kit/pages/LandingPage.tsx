import React, { useState } from 'react';
import { ThemeProvider, useTheme } from '../theme/ThemeProvider';
import { themes } from '../theme/tokens';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

function LandingPageContent() {
  const { theme, setTheme, mode, toggleMode } = useTheme();
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);

  const themeList = Object.values(themes);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors">
      {/* Header */}
      <header className="border-b border-[var(--surface)] sticky top-0 z-50 bg-[var(--bg)]/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[var(--primary)] to-[var(--muted)] rounded-lg" />
            <h1 className="text-xl font-bold">AICG</h1>
          </div>
          <nav className="flex items-center gap-6">
            <a href="/docs" className="hover:text-[var(--primary)] transition-colors">
              Components
            </a>
            <button
              onClick={toggleMode}
              className="px-3 py-1 rounded-lg bg-[var(--surface)] hover:bg-[var(--muted)] transition-colors"
            >
              {mode === 'light' ? '🌙' : '☀️'}
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">Professional Design System</h2>
          <p className="text-xl text-[var(--muted)] mb-8 max-w-2xl mx-auto">
            AICG UI Kit: Unified design system for orchestrated workflows, intelligent infrastructure, and forward-deployed agentic systems.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="primary" size="lg" onClick={() => window.location.href = '/docs'}>
              Explore Components
            </Button>
            <Button variant="outline" size="lg">
              Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* Theme Showcase */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold mb-8 text-center">4 Professional Palettes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {themeList.map((t) => (
            <button
              key={t.name}
              onClick={() => setTheme(t.name as any)}
              onMouseEnter={() => setHoveredTheme(t.name)}
              onMouseLeave={() => setHoveredTheme(null)}
              className={`p-6 rounded-lg border-2 transition-all ${
                theme === t.name
                  ? 'border-[var(--primary)] bg-[var(--surface)]'
                  : 'border-[var(--surface)] hover:border-[var(--primary)]'
              }`}
            >
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">{t.label}</h4>
                <div className="flex gap-2">
                  <div
                    className="w-8 h-8 rounded"
                    style={{ backgroundColor: t.light.primary }}
                  />
                  <div
                    className="w-8 h-8 rounded"
                    style={{ backgroundColor: t.light.muted }}
                  />
                  <div
                    className="w-8 h-8 rounded"
                    style={{ backgroundColor: t.light.bg }}
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold mb-8 text-center">Why AICG UI Kit?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Unified Design',
              description: 'Consistent visual language across all your applications and documents.',
            },
            {
              title: 'Accessibility First',
              description: 'Built with WCAG compliance and inclusive design principles.',
            },
            {
              title: 'Developer Friendly',
              description: 'TypeScript, React, and Tailwind CSS for rapid development.',
            },
            {
              title: 'Dark Mode',
              description: 'Full dark mode support across all themes and components.',
            },
            {
              title: 'Customizable',
              description: 'Easy theme switching and CSS variable customization.',
            },
            {
              title: 'Production Ready',
              description: 'Battle-tested components for enterprise applications.',
            },
          ].map((feature, i) => (
            <Card key={i} className="p-6">
              <h4 className="font-semibold mb-2">{feature.title}</h4>
              <p className="text-sm text-[var(--muted)]">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h3 className="text-3xl font-bold mb-4">Ready to build?</h3>
        <p className="text-[var(--muted)] mb-8">
          Start using AICG UI Kit in your next project.
        </p>
        <Button variant="primary" size="lg" onClick={() => window.location.href = '/docs'}>
          View All Components
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--surface)] mt-16 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-[var(--muted)]">
          <p>© 2026 AICG. Professional design system for orchestrated workflows.</p>
        </div>
      </footer>
    </div>
  );
}

export default function LandingPage() {
  return (
    <ThemeProvider>
      <LandingPageContent />
    </ThemeProvider>
  );
}
