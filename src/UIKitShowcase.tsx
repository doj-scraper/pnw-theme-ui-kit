import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import {
  Button,
  Input,
  Card,
  Select,
  Dialog,
  DialogBody,
  DialogFooter,
  Table,
  Column,
  Cell,
  Tree,
  Tabs,
  Tab,
  Tag,
  Callout,
  FormGroup,
  DateRangeInput,
  ThemeProvider,
  useTheme,
  themes,
  Intent,
  ITreeNode,
} from './ui-kit';
import { enUS } from 'date-fns/locale';

const TREE_DATA: ITreeNode[] = [
  {
    id: 0,
    hasCaret: true,
    icon: 'folder-close',
    label: 'Components',
    isExpanded: true,
    childNodes: [
      { id: 1, icon: 'document', label: 'Button.tsx', isSelected: true },
      { id: 2, icon: 'document', label: 'Input.tsx' },
      { id: 3, icon: 'document', label: 'Card.tsx' },
    ],
  },
  {
    id: 4,
    hasCaret: true,
    icon: 'folder-close',
    label: 'Theme',
    childNodes: [
      { id: 5, icon: 'style', label: 'tokens.ts' },
      { id: 6, icon: 'style', label: 'types.ts' },
    ],
  },
];

const TABLE_DATA = [
  { name: 'Alice Johnson', role: 'Engineer', status: 'Active', count: 42 },
  { name: 'Bob Smith', role: 'Designer', status: 'Away', count: 18 },
  { name: 'Carol White', role: 'Manager', status: 'Active', count: 67 },
];

function ShowcaseContent() {
  const { theme, mode, setTheme, toggleMode } = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [nodes, setNodes] = useState<ITreeNode[]>(TREE_DATA);

  const handleNodeClick = (nodeData: ITreeNode, nodePath: number[]) => {
    const cloneNodes = (n: ITreeNode[]): ITreeNode[] =>
      n.map(node => ({ ...node, childNodes: node.childNodes ? cloneNodes(node.childNodes) : undefined }));
    
    const getNode = (n: ITreeNode[], path: number[]) => {
      let target = n[path[0]];
      for (let i = 1; i < path.length; i++) target = target.childNodes![path[i]];
      return target;
    };

    const nextNodes = cloneNodes(nodes);
    const targetNode = getNode(nextNodes, nodePath);
    const forEachNode = (list: ITreeNode[] | undefined, cb: (n: ITreeNode) => void) => {
      if (!list) return;
      list.forEach(n => { cb(n); forEachNode(n.childNodes, cb); });
    };
    forEachNode(nextNodes, n => (n.isSelected = false));
    targetNode.isSelected = true;
    setNodes(nextNodes);
  };

  const handleNodeCollapse = (nodeData: ITreeNode, nodePath: number[]) => {
    const cloneNodes = (n: ITreeNode[]): ITreeNode[] =>
      n.map(node => ({ ...node, childNodes: node.childNodes ? cloneNodes(node.childNodes) : undefined }));
    const getNode = (n: ITreeNode[], path: number[]) => {
      let target = n[path[0]];
      for (let i = 1; i < path.length; i++) target = target.childNodes![path[i]];
      return target;
    };
    const nextNodes = cloneNodes(nodes);
    getNode(nextNodes, nodePath).isExpanded = false;
    setNodes(nextNodes);
  };

  const handleNodeExpand = (nodeData: ITreeNode, nodePath: number[]) => {
    const cloneNodes = (n: ITreeNode[]): ITreeNode[] =>
      n.map(node => ({ ...node, childNodes: node.childNodes ? cloneNodes(node.childNodes) : undefined }));
    const getNode = (n: ITreeNode[], path: number[]) => {
      let target = n[path[0]];
      for (let i = 1; i < path.length; i++) target = target.childNodes![path[i]];
      return target;
    };
    const nextNodes = cloneNodes(nodes);
    getNode(nextNodes, nodePath).isExpanded = true;
    setNodes(nextNodes);
  };

  const renderCell = (rowIndex: number, colIndex: number) => {
    const row = TABLE_DATA[rowIndex];
    if (colIndex === 0) return <Cell>{row.name}</Cell>;
    if (colIndex === 1) return <Cell>{row.role}</Cell>;
    if (colIndex === 2) return (
      <Cell>
        <Tag intent={row.status === 'Active' ? Intent.SUCCESS : Intent.WARNING} minimal>
          {row.status}
        </Tag>
      </Cell>
    );
    if (colIndex === 3) return <Cell>{row.count}</Cell>;
    return <Cell>-</Cell>;
  };

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Header */}
      <header className="bg-surface border-b border-muted/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-header font-bold">UI Kit Showcase</h1>
            <p className="text-sm text-muted mt-1">Complete component library with PNW themes</p>
          </div>
          <div className="flex items-center gap-3">
            <Select
              value={theme}
              onChange={(e) => setTheme(e.currentTarget.value as any)}
              minimal
              options={Object.values(themes).map(t => ({ label: t.label, value: t.name }))}
            />
            <Button
              onClick={toggleMode}
              minimal
              icon={mode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* Buttons Section */}
        <section>
          <h2 className="text-xl font-header font-semibold mb-4">Buttons</h2>
          <Card className="p-6">
            <div className="flex flex-wrap gap-3">
              <Button text="Default" />
              <Button text="Primary" intent="primary" />
              <Button text="Success" intent="success" />
              <Button text="Warning" intent="warning" />
              <Button text="Danger" intent="danger" />
              <Button text="Minimal" minimal />
              <Button text="Outlined" outlined />
              <Button icon="refresh" text="With Icon" />
              <Button icon="download" />
              <Button text="Large" large />
              <Button text="Small" small />
              <Button text="Disabled" disabled />
            </div>
          </Card>
        </section>

        {/* Inputs Section */}
        <section>
          <h2 className="text-xl font-header font-semibold mb-4">Inputs</h2>
          <Card className="p-6 space-y-4">
            <Input placeholder="Basic input..." />
            <Input leftIcon="search" placeholder="With left icon..." />
            <Input rightElement={<Button icon="cross" minimal small />} placeholder="With right element..." />
            <Input placeholder="Disabled input..." disabled />
            <FormGroup label="Form Group" helperText="Helper text goes here">
              <Input placeholder="Input with label..." />
            </FormGroup>
          </Card>
        </section>

        {/* Select & Date Section */}
        <section>
          <h2 className="text-xl font-header font-semibold mb-4">Select & Date Inputs</h2>
          <Card className="p-6 space-y-4">
            <Select
              options={[
                { label: 'Option 1', value: '1' },
                { label: 'Option 2', value: '2' },
                { label: 'Option 3', value: '3' },
              ]}
            />
            <DateRangeInput
              formatDate={date => date.toLocaleDateString()}
              parseDate={str => new Date(str)}
              placeholder="Select date range..."
              shortcuts={true}
              allowSingleDayRange={true}
              locale={enUS}
            />
          </Card>
        </section>

        {/* Tags Section */}
        <section>
          <h2 className="text-xl font-header font-semibold mb-4">Tags</h2>
          <Card className="p-6">
            <div className="flex flex-wrap gap-2">
              <Tag>Default</Tag>
              <Tag intent="primary">Primary</Tag>
              <Tag intent="success">Success</Tag>
              <Tag intent="warning">Warning</Tag>
              <Tag intent="danger">Danger</Tag>
              <Tag minimal>Minimal</Tag>
              <Tag round>Round</Tag>
              <Tag icon="user">With Icon</Tag>
              <Tag onRemove={() => {}}>Removable</Tag>
            </div>
          </Card>
        </section>

        {/* Callouts Section */}
        <section>
          <h2 className="text-xl font-header font-semibold mb-4">Callouts</h2>
          <div className="space-y-3">
            <Callout title="Default Callout" icon="info-sign">
              This is a default callout with some informational content.
            </Callout>
            <Callout title="Primary" intent="primary" icon="endorsed">
              This is a primary callout highlighting important information.
            </Callout>
            <Callout title="Success" intent="success" icon="tick-circle">
              Operation completed successfully!
            </Callout>
            <Callout title="Warning" intent="warning" icon="warning-sign">
              Please review this warning before proceeding.
            </Callout>
            <Callout title="Danger" intent="danger" icon="error">
              Critical error detected. Immediate action required.
            </Callout>
          </div>
        </section>

        {/* Tabs Section */}
        <section>
          <h2 className="text-xl font-header font-semibold mb-4">Tabs</h2>
          <Card className="p-6">
            <Tabs
              id="showcase-tabs"
              selectedTabId={selectedTab}
              onChange={(id) => setSelectedTab(id as string)}
            >
              <Tab id="overview" title="Overview" panel={
                <div className="py-4">
                  <p className="text-text">This is the overview tab content.</p>
                </div>
              } />
              <Tab id="details" title="Details" panel={
                <div className="py-4">
                  <p className="text-text">This is the details tab content.</p>
                </div>
              } />
              <Tab id="settings" title="Settings" panel={
                <div className="py-4">
                  <p className="text-text">This is the settings tab content.</p>
                </div>
              } />
            </Tabs>
          </Card>
        </section>

        {/* Table Section */}
        <section>
          <h2 className="text-xl font-header font-semibold mb-4">Table</h2>
          <Card className="p-0 overflow-hidden">
            <Table numRows={TABLE_DATA.length} enableRowHeader={false}>
              <Column name="Name" cellRenderer={renderCell} />
              <Column name="Role" cellRenderer={renderCell} />
              <Column name="Status" cellRenderer={renderCell} />
              <Column name="Count" cellRenderer={renderCell} />
            </Table>
          </Card>
        </section>

        {/* Tree Section */}
        <section>
          <h2 className="text-xl font-header font-semibold mb-4">Tree</h2>
          <Card className="p-6">
            <Tree
              contents={nodes}
              onNodeClick={handleNodeClick}
              onNodeCollapse={handleNodeCollapse}
              onNodeExpand={handleNodeExpand}
            />
          </Card>
        </section>

        {/* Dialog Section */}
        <section>
          <h2 className="text-xl font-header font-semibold mb-4">Dialog</h2>
          <Card className="p-6">
            <Button text="Open Dialog" onClick={() => setDialogOpen(true)} />
            <Dialog
              isOpen={dialogOpen}
              onClose={() => setDialogOpen(false)}
              title="Example Dialog"
              icon="info-sign"
            >
              <DialogBody>
                <p>This is an example dialog with themed styling.</p>
                <FormGroup label="Input Field" className="mt-4">
                  <Input placeholder="Enter something..." />
                </FormGroup>
              </DialogBody>
              <DialogFooter
                actions={
                  <>
                    <Button text="Cancel" onClick={() => setDialogOpen(false)} />
                    <Button text="Confirm" intent="primary" onClick={() => setDialogOpen(false)} />
                  </>
                }
              />
            </Dialog>
          </Card>
        </section>

      </main>
    </div>
  );
}

export default function UIKitShowcase() {
  return (
    <ThemeProvider>
      <ShowcaseContent />
    </ThemeProvider>
  );
}
