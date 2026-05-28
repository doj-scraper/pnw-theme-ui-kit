# Usage Examples

## Basic Component Usage

```tsx
import { 
  Button, 
  Input, 
  Card, 
  ThemeProvider, 
  useTheme 
} from './ui-kit';

function MyApp() {
  return (
    <ThemeProvider>
      <MyComponent />
    </ThemeProvider>
  );
}

function MyComponent() {
  const { theme, mode, setTheme, toggleMode } = useTheme();

  return (
    <Card className="p-6">
      <h2>Hello World</h2>
      <Input placeholder="Enter your name..." />
      <Button text="Submit" intent="primary" />
    </Card>
  );
}
```

## Theme Switcher

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
      >
        {Object.values(themes).map(t => (
          <option key={t.name} value={t.name}>
            {t.label}
          </option>
        ))}
      </select>
      
      <button onClick={toggleMode}>
        {mode === 'dark' ? <Sun /> : <Moon />}
      </button>
    </div>
  );
}
```

## Form Example

```tsx
import { Input, FormGroup, Button, Card } from './ui-kit';
import { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Card className="p-6 max-w-md">
      <h2 className="text-2xl font-header mb-4">Login</h2>
      
      <FormGroup label="Email" helperText="Enter your email address">
        <Input 
          leftIcon="envelope"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormGroup>

      <FormGroup label="Password">
        <Input 
          leftIcon="lock"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormGroup>

      <Button 
        text="Sign In" 
        intent="primary" 
        large 
        fill
      />
    </Card>
  );
}
```

## Dialog Example

```tsx
import { Button, Dialog, DialogBody, DialogFooter, Input } from './ui-kit';
import { useState } from 'react';

function DialogExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button text="Open Dialog" onClick={() => setIsOpen(true)} />
      
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create New Project"
        icon="folder-new"
      >
        <DialogBody>
          <p className="mb-4">Enter a name for your new project.</p>
          <Input placeholder="Project name..." />
        </DialogBody>
        
        <DialogFooter
          actions={
            <>
              <Button text="Cancel" onClick={() => setIsOpen(false)} />
              <Button 
                text="Create" 
                intent="primary" 
                onClick={() => setIsOpen(false)} 
              />
            </>
          }
        />
      </Dialog>
    </>
  );
}
```

## Table Example

```tsx
import { Table, Column, Cell, Card } from './ui-kit';

const data = [
  { name: 'Alice', role: 'Engineer', status: 'Active' },
  { name: 'Bob', role: 'Designer', status: 'Away' },
  { name: 'Carol', role: 'Manager', status: 'Active' },
];

function DataTable() {
  const renderCell = (rowIndex: number, colIndex: number) => {
    const row = data[rowIndex];
    if (colIndex === 0) return <Cell>{row.name}</Cell>;
    if (colIndex === 1) return <Cell>{row.role}</Cell>;
    if (colIndex === 2) return <Cell>{row.status}</Cell>;
    return <Cell>-</Cell>;
  };

  return (
    <Card className="p-0 overflow-hidden">
      <Table numRows={data.length} enableRowHeader={false}>
        <Column name="Name" cellRenderer={renderCell} />
        <Column name="Role" cellRenderer={renderCell} />
        <Column name="Status" cellRenderer={renderCell} />
      </Table>
    </Card>
  );
}
```

## Tabs Example

```tsx
import { Tabs, Tab, Card } from './ui-kit';
import { useState } from 'react';

function TabsExample() {
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <Card className="p-6">
      <Tabs
        id="example-tabs"
        selectedTabId={selectedTab}
        onChange={(id) => setSelectedTab(id as string)}
      >
        <Tab 
          id="overview" 
          title="Overview" 
          panel={<div>Overview content</div>} 
        />
        <Tab 
          id="details" 
          title="Details" 
          panel={<div>Details content</div>} 
        />
        <Tab 
          id="settings" 
          title="Settings" 
          panel={<div>Settings content</div>} 
        />
      </Tabs>
    </Card>
  );
}
```

## Callout Example

```tsx
import { Callout, Intent } from './ui-kit';

function Notifications() {
  return (
    <div className="space-y-3">
      <Callout title="Info" intent={Intent.PRIMARY} icon="info-sign">
        This is an informational message.
      </Callout>
      
      <Callout title="Success" intent={Intent.SUCCESS} icon="tick-circle">
        Operation completed successfully!
      </Callout>
      
      <Callout title="Warning" intent={Intent.WARNING} icon="warning-sign">
        Please review before proceeding.
      </Callout>
      
      <Callout title="Error" intent={Intent.DANGER} icon="error">
        An error occurred.
      </Callout>
    </div>
  );
}
```

## Tags Example

```tsx
import { Tag, Intent } from './ui-kit';

function TagsExample() {
  return (
    <div className="flex gap-2">
      <Tag>Default</Tag>
      <Tag intent={Intent.PRIMARY}>Primary</Tag>
      <Tag intent={Intent.SUCCESS}>Success</Tag>
      <Tag intent={Intent.WARNING}>Warning</Tag>
      <Tag intent={Intent.DANGER}>Danger</Tag>
      <Tag minimal>Minimal</Tag>
      <Tag round>Round</Tag>
      <Tag icon="user">With Icon</Tag>
      <Tag onRemove={() => console.log('removed')}>Removable</Tag>
    </div>
  );
}
```

## Using Custom CSS Variables

All theme colors are available as CSS custom properties:

```tsx
function CustomComponent() {
  return (
    <div 
      style={{
        backgroundColor: 'var(--color-surface)',
        color: 'var(--color-text)',
        border: '1px solid var(--color-muted)',
        padding: '1rem',
        borderRadius: '0.5rem',
      }}
    >
      <h3 style={{ fontFamily: 'var(--font-header)' }}>
        Custom Styled Component
      </h3>
      <p style={{ fontFamily: 'var(--font-body)' }}>
        This uses theme variables directly.
      </p>
    </div>
  );
}
```

## Tailwind Classes

Use Tailwind with theme colors:

```tsx
function TailwindExample() {
  return (
    <div className="bg-surface text-text border border-muted/20 p-4 rounded-md">
      <h3 className="font-header text-primary">Tailwind + Theme</h3>
      <p className="font-body text-muted">Using Tailwind with theme colors</p>
    </div>
  );
}
```
