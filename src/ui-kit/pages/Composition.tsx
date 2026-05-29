import { ThemeProvider, useTheme, Button, Input, Card, FormGroup, Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../theme/ThemeProvider';

function CompositionContent() {
  const { mode, toggleMode } = useTheme();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <header className="border-b border-[var(--surface)] sticky top-0 z-40 bg-[var(--bg)]/95 backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Composition</h1>
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
          <h2 className="text-3xl font-bold mb-4">Building Complex UIs</h2>
          <p className="text-[var(--muted)] mb-6">
            Learn how to compose AICG UI Kit components to build professional interfaces.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold">Login Form</h3>
          <p className="text-[var(--muted)] mb-4">A complete login form using FormGroup and Input:</p>
          <div className="bg-[var(--surface)] border border-[var(--muted)]/30 rounded-lg p-4">
            <pre className="text-sm overflow-x-auto">
              <code>{`import { FormGroup, Input, Button, Card } from '@aicg/ui-kit';

export function LoginForm() {
  return (
    <Card className="w-96 p-6">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form className="space-y-4">
        <FormGroup label="Email" helperText="Enter your email">
          <Input type="email" placeholder="you@example.com" />
        </FormGroup>
        <FormGroup label="Password">
          <Input type="password" placeholder="••••••••" />
        </FormGroup>
        <div className="flex gap-2">
          <Button text="Login" variant="primary" className="flex-1" />
          <Button text="Cancel" variant="outline" className="flex-1" />
        </div>
      </form>
    </Card>
  );
}`}</code>
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold">Modal Dialog</h3>
          <p className="text-[var(--muted)] mb-4">Create a reusable modal component:</p>
          <div className="bg-[var(--surface)] border border-[var(--muted)]/30 rounded-lg p-4">
            <pre className="text-sm overflow-x-auto">
              <code>{`import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, Button } from '@aicg/ui-kit';

export function ConfirmDialog({ onConfirm, onCancel }) {
  return (
    <Dialog>
      <Button text="Delete" variant="danger" />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete this item?</p>
        <DialogFooter>
          <Button text="Cancel" variant="outline" onClick={onCancel} />
          <Button text="Delete" variant="danger" onClick={onConfirm} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}`}</code>
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold">Card Grid</h3>
          <p className="text-[var(--muted)] mb-4">Display multiple cards in a responsive grid:</p>
          <div className="bg-[var(--surface)] border border-[var(--muted)]/30 rounded-lg p-4">
            <pre className="text-sm overflow-x-auto">
              <code>{`import { Card, Badge } from '@aicg/ui-kit';

export function ProductGrid() {
  const products = [
    { id: 1, name: 'Product 1', price: '$99', status: 'In Stock' },
    { id: 2, name: 'Product 2', price: '$149', status: 'Low Stock' },
    { id: 3, name: 'Product 3', price: '$199', status: 'Out of Stock' },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <Card key={product.id} className="p-4">
          <h3 className="font-bold mb-2">{product.name}</h3>
          <p className="text-lg font-semibold mb-3">{product.price}</p>
          <Badge variant={
            product.status === 'In Stock' ? 'success' :
            product.status === 'Low Stock' ? 'warning' :
            'danger'
          }>
            {product.status}
          </Badge>
        </Card>
      ))}
    </div>
  );
}`}</code>
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold">Search with Filters</h3>
          <p className="text-[var(--muted)] mb-4">Combine Input, Select, and Button for search:</p>
          <div className="bg-[var(--surface)] border border-[var(--muted)]/30 rounded-lg p-4">
            <pre className="text-sm overflow-x-auto">
              <code>{`import { Input, Select, Button } from '@aicg/ui-kit';

export function SearchBar() {
  return (
    <div className="flex gap-2">
      <Input
        placeholder="Search..."
        className="flex-1"
      />
      <Select
        options={[
          { label: 'All', value: 'all' },
          { label: 'Users', value: 'users' },
          { label: 'Posts', value: 'posts' },
        ]}
        className="w-32"
      />
      <Button text="Search" variant="primary" />
    </div>
  );
}`}</code>
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold">Best Practices</h3>
          <ul className="space-y-2 text-[var(--muted)]">
            <li>• Use <code>FormGroup</code> to wrap form inputs with labels</li>
            <li>• Combine <code>Card</code> with other components for visual hierarchy</li>
            <li>• Use <code>Button</code> variants for different actions (primary, danger, outline)</li>
            <li>• Leverage Tailwind classes for spacing and layout</li>
            <li>• Keep components focused and reusable</li>
            <li>• Use TypeScript for type safety</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default function Composition() {
  return (
    <ThemeProvider>
      <CompositionContent />
    </ThemeProvider>
  );
}
