import { ThemeProvider, useTheme } from '../../theme/ThemeProvider';

function TypeScriptContent() {
  const { mode, toggleMode } = useTheme();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <header className="border-b border-[var(--surface)] sticky top-0 z-40 bg-[var(--bg)]/95 backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">TypeScript Guide</h1>
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
          <h2 className="text-3xl font-bold mb-4">TypeScript Support</h2>
          <p className="text-[var(--muted)] mb-6">
            AICG UI Kit is built with TypeScript and provides full type safety for all components.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold">Component Props</h3>
          <p className="text-[var(--muted)] mb-4">All components export TypeScript interfaces:</p>
          <div className="bg-[var(--surface)] border border-[var(--muted)]/30 rounded-lg p-4">
            <pre className="text-sm overflow-x-auto">
              <code>{`import { Button, type ButtonProps } from '@aicg/ui-kit';

// Type-safe props
const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};

// Or use inline
<Button
  text="Click me"
  variant="primary"
  size="lg"
  onClick={() => console.log('clicked')}
/>`}</code>
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold">useTheme Hook</h3>
          <div className="bg-[var(--surface)] border border-[var(--muted)]/30 rounded-lg p-4">
            <pre className="text-sm overflow-x-auto">
              <code>{`import { useTheme, type ThemeName } from '@aicg/ui-kit';

export function ThemeSwitcher() {
  const { theme, setTheme, mode, toggleMode } = useTheme();
  
  // theme is typed as ThemeName
  const handleThemeChange = (newTheme: ThemeName) => {
    setTheme(newTheme);
  };

  return (
    <select value={theme} onChange={(e) => handleThemeChange(e.target.value as ThemeName)}>
      <option value="canopy">Canopy</option>
      <option value="monolith">Monolith</option>
      <option value="basalt">Basalt</option>
      <option value="blueprint">Blueprint</option>
    </select>
  );
}`}</code>
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold">Form Handling</h3>
          <div className="bg-[var(--surface)] border border-[var(--muted)]/30 rounded-lg p-4">
            <pre className="text-sm overflow-x-auto">
              <code>{`import { FormEvent, useState } from 'react';
import { Input, Button, FormGroup } from '@aicg/ui-kit';

interface FormData {
  email: string;
  password: string;
}

export function LoginForm() {
  const [data, setData] = useState<FormData>({
    email: '',
    password: '',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup label="Email">
        <Input
          type="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
      </FormGroup>
      <FormGroup label="Password">
        <Input
          type="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
      </FormGroup>
      <Button text="Login" variant="primary" type="submit" />
    </form>
  );
}`}</code>
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold">Strict Mode</h3>
          <p className="text-[var(--muted)] mb-4">
            AICG UI Kit is built with TypeScript strict mode enabled. Your tsconfig.json should include:
          </p>
          <div className="bg-[var(--surface)] border border-[var(--muted)]/30 rounded-lg p-4">
            <pre className="text-sm overflow-x-auto">
              <code>{`{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}`}</code>
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold">Common Patterns</h3>
          <div className="bg-[var(--surface)] border border-[var(--muted)]/30 rounded-lg p-4">
            <pre className="text-sm overflow-x-auto">
              <code>{`// Typing component children
interface MyComponentProps {
  children: React.ReactNode;
}

// Typing event handlers
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {};

// Typing refs
const inputRef = useRef<HTMLInputElement>(null);

// Typing state
const [count, setCount] = useState<number>(0);

// Typing context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);`}</code>
            </pre>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function TypeScript() {
  return (
    <ThemeProvider>
      <TypeScriptContent />
    </ThemeProvider>
  );
}
