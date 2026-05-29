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
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  Textarea,
  Slider,
  Tooltip,
  Popover,
  Accordion,
  Breadcrumbs,
  Pagination,
  Avatar,
  Badge,
  Skeleton,
  ToastProvider,
  useToast,
  ContextMenu,
  CommandPalette,
  cn,
} from '../index';
import { Moon, Sun, Copy, Check } from 'lucide-react';

const componentsList = [
  // Forms
  { id: 'button', name: 'Button', category: 'Forms' },
  { id: 'input', name: 'Input', category: 'Forms' },
  { id: 'textarea', name: 'Textarea', category: 'Forms' },
  { id: 'select', name: 'Select', category: 'Forms' },
  { id: 'checkbox', name: 'Checkbox', category: 'Forms' },
  { id: 'radio', name: 'Radio', category: 'Forms' },
  { id: 'switch', name: 'Switch', category: 'Forms' },
  { id: 'slider', name: 'Slider', category: 'Forms' },
  { id: 'formgroup', name: 'FormGroup', category: 'Forms' },
  // Layout
  { id: 'card', name: 'Card', category: 'Layout' },
  { id: 'breadcrumbs', name: 'Breadcrumbs', category: 'Layout' },
  { id: 'statusbar', name: 'StatusBar', category: 'Layout' },
  // Navigation
  { id: 'tabs', name: 'Tabs', category: 'Navigation' },
  { id: 'pagination', name: 'Pagination', category: 'Navigation' },
  // Overlay
  { id: 'dialog', name: 'Dialog', category: 'Overlay' },
  { id: 'tooltip', name: 'Tooltip', category: 'Overlay' },
  { id: 'popover', name: 'Popover', category: 'Overlay' },
  { id: 'accordion', name: 'Accordion', category: 'Overlay' },
  // Data Display
  { id: 'tag', name: 'Tag', category: 'Data Display' },
  { id: 'badge', name: 'Badge', category: 'Data Display' },
  { id: 'avatar', name: 'Avatar', category: 'Data Display' },
  { id: 'metriccard', name: 'MetricCard', category: 'Data Display' },
  // Feedback
  { id: 'callout', name: 'Callout', category: 'Feedback' },
  { id: 'progressbar', name: 'ProgressBar', category: 'Feedback' },
  { id: 'skeleton', name: 'Skeleton', category: 'Feedback' },
  // Interactions
  { id: 'contextmenu', name: 'Context Menu', category: 'Interactions' },
  { id: 'commandpalette', name: 'Command Palette', category: 'Interactions' },
];

const categories = ['Forms', 'Layout', 'Navigation', 'Overlay', 'Data Display', 'Feedback', 'Interactions'];

function CodeBlock({ code }: { code: string }) {
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
        <code className="text-text font-mono text-xs">{code}</code>
      </pre>
    </div>
  );
}

function ComponentPreview({ id }: { id: string }) {
  const { addToast } = useToast();
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [radioValue, setRadioValue] = useState('1');
  const [switchValue, setSwitchValue] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);

  const previews: Record<string, { preview: React.ReactNode; code: string }> = {
    button: {
      preview: (
        <div className="flex flex-wrap gap-3">
          <Button text="Default" />
          <Button text="Primary" variant="primary" />
          <Button text="Success" variant="success" />
          <Button text="Danger" variant="danger" />
        </div>
      ),
      code: `<Button text="Default" />
<Button text="Primary" variant="primary" />
<Button text="Success" variant="success" />
<Button text="Danger" variant="danger" />`,
    },
    input: {
      preview: <Input placeholder="Enter text..." className="w-64" />,
      code: `<Input placeholder="Enter text..." />`,
    },
    textarea: {
      preview: <Textarea placeholder="Enter multiple lines..." className="w-64" />,
      code: `<Textarea placeholder="Enter multiple lines..." />`,
    },
    select: {
      preview: (
        <Select
          className="w-64"
          options={[
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
            { label: 'Option 3', value: '3' },
          ]}
        />
      ),
      code: `<Select options={[
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
]} />`,
    },
    checkbox: {
      preview: (
        <div className="space-y-2">
          <Checkbox label="Accept terms" checked={checkboxValue} onCheckedChange={setCheckboxValue} />
          <Checkbox label="Subscribe to updates" />
        </div>
      ),
      code: `<Checkbox label="Accept terms" />
<Checkbox label="Subscribe to updates" />`,
    },
    radio: {
      preview: (
        <RadioGroup value={radioValue} onValueChange={setRadioValue}>
          <Radio value="1" label="Option 1" />
          <Radio value="2" label="Option 2" />
          <Radio value="3" label="Option 3" />
        </RadioGroup>
      ),
      code: `<RadioGroup value={value} onValueChange={setValue}>
  <Radio value="1" label="Option 1" />
  <Radio value="2" label="Option 2" />
</RadioGroup>`,
    },
    switch: {
      preview: <Switch label="Enable notifications" checked={switchValue} onCheckedChange={setSwitchValue} />,
      code: `<Switch label="Enable notifications" />`,
    },
    slider: {
      preview: <Slider min={0} max={100} value={sliderValue} onChange={(e) => setSliderValue(Number(e.target.value))} className="w-64" />,
      code: `<Slider min={0} max={100} />`,
    },
    formgroup: {
      preview: (
        <div className="w-64">
          <FormGroup label="Email" helperText="We'll never share your email.">
            <Input type="email" placeholder="you@example.com" />
          </FormGroup>
        </div>
      ),
      code: `<FormGroup label="Email" helperText="We'll never share your email.">
  <Input type="email" placeholder="you@example.com" />
</FormGroup>`,
    },
    card: {
      preview: (
        <Card className="w-64 p-6">
          <h3 className="font-bold mb-2">Card Title</h3>
          <p className="text-sm text-muted">This is a card component with content.</p>
        </Card>
      ),
      code: `<Card className="p-6">
  <h3 className="font-bold mb-2">Card Title</h3>
  <p className="text-sm text-muted">Content here</p>
</Card>`,
    },
    breadcrumbs: {
      preview: (
        <Breadcrumbs
          items={[
            { label: 'Home', href: '#' },
            { label: 'Components', href: '#' },
            { label: 'Breadcrumbs' },
          ]}
        />
      ),
      code: `<Breadcrumbs items={[
  { label: 'Home', href: '#' },
  { label: 'Components', href: '#' },
  { label: 'Breadcrumbs' },
]} />`,
    },
    statusbar: {
      preview: (
        <StatusBar>
          <StatusIndicator status="success" label="Connected" />
          <StatusIndicator status="warning" label="Pending" />
          <StatusIndicator status="error" label="Error" />
        </StatusBar>
      ),
      code: `<StatusBar>
  <StatusIndicator status="success" label="Connected" />
  <StatusIndicator status="warning" label="Pending" />
</StatusBar>`,
    },
    tabs: {
      preview: (
        <Tabs defaultValue="tab1" className="w-64">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      ),
      code: `<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
</Tabs>`,
    },
    pagination: {
      preview: <Pagination currentPage={currentPage} totalPages={5} onPageChange={setCurrentPage} />,
      code: `<Pagination currentPage={page} totalPages={5} onPageChange={setPage} />`,
    },
    dialog: {
      preview: (
        <Dialog>
          <Button text="Open Dialog" />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>This is a dialog component.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button text="Close" variant="outline" />
              <Button text="Confirm" variant="primary" />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ),
      code: `<Dialog>
  <Button text="Open Dialog" />
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
  </DialogContent>
</Dialog>`,
    },
    tooltip: {
      preview: <Tooltip content="This is a tooltip">Hover me</Tooltip>,
      code: `<Tooltip content="This is a tooltip">
  Hover me
</Tooltip>`,
    },
    popover: {
      preview: <Popover trigger="Click me" content={<div className="text-sm">Popover content here</div>} />,
      code: `<Popover trigger="Click me" content={<div>Content</div>} />`,
    },
    accordion: {
      preview: (
        <Accordion
          items={[
            { value: '1', trigger: 'Section 1', content: 'Content 1' },
            { value: '2', trigger: 'Section 2', content: 'Content 2' },
          ]}
          className="w-64"
        />
      ),
      code: `<Accordion items={[
  { value: '1', trigger: 'Section 1', content: 'Content 1' },
  { value: '2', trigger: 'Section 2', content: 'Content 2' },
]} />`,
    },
    tag: {
      preview: (
        <div className="flex gap-2">
          <Tag>Default</Tag>
          <Tag variant="primary">Primary</Tag>
          <Tag variant="success">Success</Tag>
        </div>
      ),
      code: `<Tag>Default</Tag>
<Tag variant="primary">Primary</Tag>
<Tag variant="success">Success</Tag>`,
    },
    badge: {
      preview: (
        <div className="flex gap-2">
          <Badge>Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
        </div>
      ),
      code: `<Badge>Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>`,
    },
    avatar: {
      preview: (
        <div className="flex gap-4">
          <Avatar alt="User" fallback="JD" size="sm" />
          <Avatar alt="User" fallback="JD" size="md" />
          <Avatar alt="User" fallback="JD" size="lg" />
        </div>
      ),
      code: `<Avatar alt="User" fallback="JD" size="sm" />
<Avatar alt="User" fallback="JD" size="md" />
<Avatar alt="User" fallback="JD" size="lg" />`,
    },
    metriccard: {
      preview: (
        <CardGrid>
          <MetricCard label="Users" value="1,234" change="+12%" />
          <MetricCard label="Revenue" value="$45.2K" change="+8%" />
        </CardGrid>
      ),
      code: `<CardGrid>
  <MetricCard label="Users" value="1,234" change="+12%" />
  <MetricCard label="Revenue" value="$45.2K" change="+8%" />
</CardGrid>`,
    },
    callout: {
      preview: <Callout type="info" title="Info" message="This is an informational callout." />,
      code: `<Callout type="info" title="Info" message="This is an informational callout." />`,
    },
    progressbar: {
      preview: <ProgressBar value={65} className="w-64" />,
      code: `<ProgressBar value={65} />`,
    },
    skeleton: {
      preview: (
        <div className="space-y-2 w-64">
          <Skeleton variant="text" className="h-4" />
          <Skeleton variant="text" className="h-4 w-5/6" />
          <Skeleton variant="rect" className="h-32" />
        </div>
      ),
      code: `<Skeleton variant="text" className="h-4" />
<Skeleton variant="text" className="h-4 w-5/6" />
<Skeleton variant="rect" className="h-32" />`,
    },
    contextmenu: {
      preview: (
        <ContextMenu
          items={[
            { label: 'Edit', onClick: () => alert('Edit') },
            { label: 'Delete', onClick: () => alert('Delete') },
            { divider: true },
            { label: 'Copy', onClick: () => alert('Copy') },
          ]}
        >
          <div className="p-4 border border-muted/30 rounded cursor-context-menu">Right-click me</div>
        </ContextMenu>
      ),
      code: `<ContextMenu items={[
  { label: 'Edit', onClick: () => {} },
  { label: 'Delete', onClick: () => {} },
]}>
  <div>Right-click me</div>
</ContextMenu>`,
    },
    commandpalette: {
      preview: (
        <div className="text-sm text-muted">
          Press <kbd className="px-2 py-1 bg-surface rounded border border-muted/30">Cmd+K</kbd> to open
        </div>
      ),
      code: `<CommandPalette items={[
  { id: '1', label: 'Search', category: 'General' },
  { id: '2', label: 'Settings', category: 'General' },
]} />`,
    },
  };

  const data = previews[id] || { preview: null, code: '' };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">Preview</h3>
        <Card className="p-8 flex items-center justify-center min-h-48">{data.preview}</Card>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">Code</h3>
        <CodeBlock code={data.code} />
      </div>
    </div>
  );
}

function DocsContent() {
  const { theme, setTheme, mode, toggleMode } = useTheme();
  const [activeComponent, setActiveComponent] = useState('button');

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Header */}
      <header className="border-b border-[var(--surface)] sticky top-0 z-40 bg-[var(--bg)]/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Component Library</h1>
          <div className="flex items-center gap-4">
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as any)}
              className="px-3 py-2 rounded-lg bg-[var(--surface)] border border-[var(--muted)]/30 text-sm"
            >
              <option value="canopy">Canopy</option>
              <option value="monolith">Monolith</option>
              <option value="basalt">Basalt</option>
              <option value="blueprint">Blueprint</option>
            </select>
            <button
              onClick={toggleMode}
              className="px-3 py-2 rounded-lg bg-[var(--surface)] hover:bg-[var(--muted)]/10 transition-colors"
            >
              {mode === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            {categories.map((cat) => (
              <div key={cat}>
                <h3 className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider mb-2">{cat}</h3>
                <div className="space-y-1">
                  {componentsList
                    .filter((c) => c.category === cat)
                    .map((comp) => (
                      <button
                        key={comp.id}
                        onClick={() => setActiveComponent(comp.id)}
                        className={cn(
                          'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                          activeComponent === comp.id
                            ? 'bg-[var(--primary)] text-white'
                            : 'hover:bg-[var(--surface)] text-[var(--text)]'
                        )}
                      >
                        {comp.name}
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-4xl space-y-8">
          {componentsList.find((c) => c.id === activeComponent) && (
            <>
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  {componentsList.find((c) => c.id === activeComponent)?.name}
                </h2>
                <p className="text-[var(--muted)]">
                  {activeComponent === 'button' && 'Buttons trigger actions and events.'}
                  {activeComponent === 'input' && 'Text input fields for user data entry.'}
                  {activeComponent === 'textarea' && 'Multi-line text input for longer content.'}
                  {activeComponent === 'select' && 'Dropdown selection component.'}
                  {activeComponent === 'checkbox' && 'Checkbox for boolean selections.'}
                  {activeComponent === 'radio' && 'Radio buttons for single selection.'}
                  {activeComponent === 'switch' && 'Toggle switch for on/off states.'}
                  {activeComponent === 'slider' && 'Range slider for numeric input.'}
                  {activeComponent === 'formgroup' && 'Wrapper for form fields with labels.'}
                  {activeComponent === 'card' && 'Container component for content.'}
                  {activeComponent === 'breadcrumbs' && 'Navigation trail showing hierarchy.'}
                  {activeComponent === 'statusbar' && 'Status indicators for system state.'}
                  {activeComponent === 'tabs' && 'Tabbed interface for content organization.'}
                  {activeComponent === 'pagination' && 'Page navigation component.'}
                  {activeComponent === 'dialog' && 'Modal dialog for user interaction.'}
                  {activeComponent === 'tooltip' && 'Hover information display.'}
                  {activeComponent === 'popover' && 'Click-triggered overlay content.'}
                  {activeComponent === 'accordion' && 'Collapsible content sections.'}
                  {activeComponent === 'tag' && 'Labels and categorization.'}
                  {activeComponent === 'badge' && 'Notification indicators.'}
                  {activeComponent === 'avatar' && 'User profile images.'}
                  {activeComponent === 'metriccard' && 'Data display cards.'}
                  {activeComponent === 'callout' && 'Alert and information boxes.'}
                  {activeComponent === 'progressbar' && 'Progress indication.'}
                  {activeComponent === 'skeleton' && 'Loading placeholders.'}
                  {activeComponent === 'contextmenu' && 'Right-click context menu.'}
                  {activeComponent === 'commandpalette' && 'Keyboard command palette (Cmd+K).'}
                </p>
              </div>
              <ComponentPreview id={activeComponent} />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default function ComponentDocs() {
  return (
    <ToastProvider>
      <ThemeProvider>
        <DocsContent />
      </ThemeProvider>
    </ToastProvider>
  );
}
