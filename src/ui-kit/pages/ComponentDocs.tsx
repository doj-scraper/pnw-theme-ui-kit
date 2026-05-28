import { useState } from 'react';
import { 
  ThemeProvider, 
  useTheme, 
  Button, 
  Input, 
  Card, 
  Select,
  Tag,
  Callout,
  FormGroup,
  ProgressBar,
  MetricCard,
  CardGrid,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  StatusBar,
  StatusIndicator,
  CrodaDashboard,
  themesWithCroda,
  cn
} from '../index';
import { Moon, Sun, Copy, Check } from 'lucide-react';

const components = [
  { id: 'button', name: 'Button', category: 'Forms' },
  { id: 'input', name: 'Input', category: 'Forms' },
  { id: 'select', name: 'Select', category: 'Forms' },
  { id: 'formgroup', name: 'FormGroup', category: 'Forms' },
  { id: 'card', name: 'Card', category: 'Layout' },
  { id: 'tabs', name: 'Tabs', category: 'Navigation' },
  { id: 'dialog', name: 'Dialog', category: 'Overlay' },
  { id: 'tag', name: 'Tag', category: 'Data Display' },
  { id: 'callout', name: 'Callout', category: 'Feedback' },
  { id: 'progressbar', name: 'ProgressBar', category: 'Feedback' },
  { id: 'metriccard', name: 'MetricCard', category: 'Data Display' },
  { id: 'statusbar', name: 'StatusBar', category: 'Layout' },
  { id: 'dashboard', name: 'CRODA Dashboard', category: 'Examples' },
];

const categories = ['Forms', 'Layout', 'Navigation', 'Overlay', 'Data Display', 'Feedback', 'Examples'];

function CodeBlock({ code, language = 'tsx' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={copy}
        className="absolute top-3 right-3 p-2 rounded bg-surface/50 hover:bg-surface transition-colors"
      >
        {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4 text-muted" />}
      </button>
      <pre className="bg-surface border border-muted/20 rounded-lg p-4 overflow-x-auto text-sm">
        <code className="text-text font-mono">{code}</code>
      </pre>
    </div>
  );
}

function ComponentSection({ id, title, description, preview, code }: any) {
  return (
    <div id={id} className="scroll-mt-20">
      <h2 className="text-2xl font-header font-bold mb-2">{title}</h2>
      <p className="text-muted mb-6">{description}</p>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">Preview</h3>
          <Card className="p-8 flex items-center justify-center">
            {preview}
          </Card>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">Code</h3>
          <CodeBlock code={code} />
        </div>
      </div>
    </div>
  );
}

function DocsContent() {
  const { theme, mode, setTheme, toggleMode } = useTheme();
  const [activeComponent, setActiveComponent] = useState('button');
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-muted/20 bg-surface/95 backdrop-blur">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border-2 border-primary flex items-center justify-center">
              <div className="w-2 h-2 bg-primary" />
            </div>
            <h1 className="text-xl font-header font-bold">PNW UI Kit</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Select
              value={theme}
              onChange={(e) => setTheme(e.target.value as any)}
              className="w-48"
            >
              {Object.values(themesWithCroda).map(t => (
                <option key={t.name} value={t.name}>{t.label}</option>
              ))}
            </Select>
            
            <Button
              variant="ghost"
              size="sm"
              icon={mode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              onClick={toggleMode}
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 flex gap-8">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 sticky top-24 h-fit">
          <nav className="space-y-6">
            {categories.map(category => {
              const items = components.filter(c => c.category === category);
              if (items.length === 0) return null;
              
              return (
                <div key={category}>
                  <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                    {category}
                  </h3>
                  <ul className="space-y-1">
                    {items.map(comp => (
                      <li key={comp.id}>
                        <button
                          onClick={() => setActiveComponent(comp.id)}
                          className={cn(
                            'w-full text-left px-3 py-1.5 rounded text-sm transition-colors',
                            activeComponent === comp.id
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'text-text hover:bg-muted/10'
                          )}
                        >
                          {comp.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-4xl space-y-16">
          {activeComponent === 'button' && (
            <ComponentSection
              id="button"
              title="Button"
              description="Buttons trigger actions and events."
              preview={
                <div className="flex flex-wrap gap-3">
                  <Button text="Default" />
                  <Button text="Primary" variant="primary" />
                  <Button text="Success" variant="success" />
                  <Button text="Warning" variant="warning" />
                  <Button text="Danger" variant="danger" />
                  <Button text="Outline" variant="outline" />
                  <Button text="Ghost" variant="ghost" />
                </div>
              }
              code={`import { Button } from './ui-kit';

<Button text="Default" />
<Button text="Primary" variant="primary" />
<Button text="Success" variant="success" />
<Button text="Warning" variant="warning" />
<Button text="Danger" variant="danger" />`}
            />
          )}

          {activeComponent === 'input' && (
            <ComponentSection
              id="input"
              title="Input"
              description="Text input fields for user data entry."
              preview={
                <div className="w-full max-w-md space-y-4">
                  <Input placeholder="Basic input..." />
                  <Input leftIcon={<span>🔍</span>} placeholder="With left icon..." />
                  <Input rightElement={<Button size="sm" text="Go" />} placeholder="With right element..." />
                </div>
              }
              code={`import { Input, Button } from './ui-kit';

<Input placeholder="Basic input..." />
<Input leftIcon={<SearchIcon />} placeholder="With left icon..." />
<Input rightElement={<Button size="sm" text="Go" />} placeholder="With right element..." />`}
            />
          )}

          {activeComponent === 'select' && (
            <ComponentSection
              id="select"
              title="Select"
              description="Dropdown selection component."
              preview={
                <Select className="w-64" options={[
                  { label: 'Option 1', value: '1' },
                  { label: 'Option 2', value: '2' },
                  { label: 'Option 3', value: '3' },
                ]} />
              }
              code={`import { Select } from './ui-kit';

<Select options={[
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
]} />`}
            />
          )}

          {activeComponent === 'formgroup' && (
            <ComponentSection
              id="formgroup"
              title="FormGroup"
              description="Wrapper for form fields with labels and helper text."
              preview={
                <div className="w-full max-w-md space-y-4">
                  <FormGroup label="Email" helperText="We'll never share your email.">
                    <Input type="email" placeholder="you@example.com" />
                  </FormGroup>
                  <FormGroup label="Password" error="Password is required">
                    <Input type="password" placeholder="••••••••" />
                  </FormGroup>
                </div>
              }
              code={`import { FormGroup, Input } from './ui-kit';

<FormGroup label="Email" helperText="We'll never share your email.">
  <Input type="email" placeholder="you@example.com" />
</FormGroup>

<FormGroup label="Password" error="Password is required">
  <Input type="password" placeholder="••••••••" />
</FormGroup>`}
            />
          )}

          {activeComponent === 'card' && (
            <ComponentSection
              id="card"
              title="Card"
              description="Container component for grouping content."
              preview={
                <Card className="w-full max-w-md p-6">
                  <h3 className="text-lg font-semibold mb-2">Card Title</h3>
                  <p className="text-muted">This is a card component with some content inside.</p>
                </Card>
              }
              code={`import { Card } from './ui-kit';

<Card className="p-6">
  <h3 className="text-lg font-semibold mb-2">Card Title</h3>
  <p className="text-muted">Card content goes here.</p>
</Card>`}
            />
          )}

          {activeComponent === 'tabs' && (
            <ComponentSection
              id="tabs"
              title="Tabs"
              description="Organize content into tabbed sections."
              preview={
                <Tabs defaultValue="tab1" className="w-full max-w-md">
                  <TabsList>
                    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab1">Content for tab 1</TabsContent>
                  <TabsContent value="tab2">Content for tab 2</TabsContent>
                  <TabsContent value="tab3">Content for tab 3</TabsContent>
                </Tabs>
              }
              code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui-kit';

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>`}
            />
          )}

          {activeComponent === 'dialog' && (
            <ComponentSection
              id="dialog"
              title="Dialog"
              description="Modal dialog for important interactions."
              preview={
                <>
                  <Button text="Open Dialog" onClick={() => setDialogOpen(true)} />
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Dialog Title</DialogTitle>
                        <DialogDescription>
                          This is a dialog description explaining what this dialog is for.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <Input placeholder="Enter something..." />
                      </div>
                      <DialogFooter>
                        <Button text="Cancel" variant="ghost" onClick={() => setDialogOpen(false)} />
                        <Button text="Confirm" variant="primary" onClick={() => setDialogOpen(false)} />
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </>
              }
              code={`import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Button } from './ui-kit';

const [open, setOpen] = useState(false);

<Button text="Open Dialog" onClick={() => setOpen(true)} />

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button text="Cancel" onClick={() => setOpen(false)} />
      <Button text="Confirm" variant="primary" />
    </DialogFooter>
  </DialogContent>
</Dialog>`}
            />
          )}

          {activeComponent === 'tag' && (
            <ComponentSection
              id="tag"
              title="Tag"
              description="Labels and badges for categorization."
              preview={
                <div className="flex flex-wrap gap-2">
                  <Tag>Default</Tag>
                  <Tag variant="primary">Primary</Tag>
                  <Tag variant="success">Success</Tag>
                  <Tag variant="warning">Warning</Tag>
                  <Tag variant="danger">Danger</Tag>
                  <Tag minimal>Minimal</Tag>
                  <Tag round>Round</Tag>
                  <Tag onRemove={() => {}}>Removable</Tag>
                </div>
              }
              code={`import { Tag } from './ui-kit';

<Tag>Default</Tag>
<Tag variant="primary">Primary</Tag>
<Tag variant="success">Success</Tag>
<Tag minimal>Minimal</Tag>
<Tag round>Round</Tag>
<Tag onRemove={() => {}}>Removable</Tag>`}
            />
          )}

          {activeComponent === 'callout' && (
            <ComponentSection
              id="callout"
              title="Callout"
              description="Alert boxes for important messages."
              preview={
                <div className="w-full space-y-3">
                  <Callout title="Default" variant="default">This is a default callout.</Callout>
                  <Callout title="Primary" variant="primary">This is a primary callout.</Callout>
                  <Callout title="Success" variant="success">Operation completed successfully!</Callout>
                  <Callout title="Warning" variant="warning">Please review before proceeding.</Callout>
                  <Callout title="Danger" variant="danger">An error occurred.</Callout>
                </div>
              }
              code={`import { Callout } from './ui-kit';

<Callout title="Success" variant="success">
  Operation completed successfully!
</Callout>

<Callout title="Warning" variant="warning">
  Please review before proceeding.
</Callout>`}
            />
          )}

          {activeComponent === 'progressbar' && (
            <ComponentSection
              id="progressbar"
              title="ProgressBar"
              description="Visual progress indicator."
              preview={
                <div className="w-full space-y-4">
                  <ProgressBar value={25} label="25% Complete" />
                  <ProgressBar value={50} label="50% Complete" color="#f59e0b" />
                  <ProgressBar value={75} label="75% Complete" color="#10b981" />
                  <ProgressBar value={100} label="Complete" />
                </div>
              }
              code={`import { ProgressBar } from './ui-kit';

<ProgressBar value={25} label="25% Complete" />
<ProgressBar value={50} color="#f59e0b" />
<ProgressBar value={75} color="#10b981" />
<ProgressBar value={100} label="Complete" />`}
            />
          )}

          {activeComponent === 'metriccard' && (
            <ComponentSection
              id="metriccard"
              title="MetricCard"
              description="Display metrics and statistics."
              preview={
                <CardGrid columns={2}>
                  <MetricCard title="Revenue" value={85} description="Total revenue this month" />
                  <MetricCard title="Users" value={92} description="Active users" color="#10b981" />
                </CardGrid>
              }
              code={`import { MetricCard, CardGrid } from './ui-kit';

<CardGrid columns={2}>
  <MetricCard 
    title="Revenue" 
    value={85} 
    description="Total revenue this month" 
  />
  <MetricCard 
    title="Users" 
    value={92} 
    description="Active users" 
    color="#10b981" 
  />
</CardGrid>`}
            />
          )}

          {activeComponent === 'statusbar' && (
            <ComponentSection
              id="statusbar"
              title="StatusBar"
              description="Footer status bar with indicators."
              preview={
                <StatusBar className="w-full">
                  <StatusIndicator status="active">System Online</StatusIndicator>
                  <StatusIndicator status="warning">2 Warnings</StatusIndicator>
                  <div className="ml-auto text-xs">v1.0.0</div>
                </StatusBar>
              }
              code={`import { StatusBar, StatusIndicator } from './ui-kit';

<StatusBar>
  <StatusIndicator status="active">System Online</StatusIndicator>
  <StatusIndicator status="warning">2 Warnings</StatusIndicator>
  <div className="ml-auto">v1.0.0</div>
</StatusBar>`}
            />
          )}

          {activeComponent === 'dashboard' && (
            <div id="dashboard" className="scroll-mt-20">
              <h2 className="text-2xl font-header font-bold mb-2">CRODA Dashboard</h2>
              <p className="text-muted mb-6">Full-featured dashboard example using all UI kit components.</p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">Live Demo</h3>
                  <div className="border border-muted/20 rounded-lg overflow-hidden">
                    <div className="h-[600px]">
                      <CrodaDashboard />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">Usage</h3>
                  <CodeBlock code={`import { CrodaDashboard } from './ui-kit';

// Use as a standalone page
<CrodaDashboard />

// Or import individual components:
import { 
  Dropdown, 
  NavTabs, 
  EntityList, 
  MetricCard,
  StatusBar 
} from './ui-kit';`} />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function ComponentDocs() {
  return (
    <ThemeProvider>
      <DocsContent />
    </ThemeProvider>
  );
}
