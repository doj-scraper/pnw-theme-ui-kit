/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Button, Card, InputGroup, FormGroup, HTMLSelect, Tree, ITreeNode, Classes, Callout, Tag, Tabs, Tab, Intent, Dialog, DialogBody, DialogFooter } from '@blueprintjs/core';
import { Table2, Column, Cell } from '@blueprintjs/table';
import { DateRangeInput } from '@blueprintjs/datetime';
import { enUS } from 'date-fns/locale';
import { Moon, Sun } from 'lucide-react';

const INITIAL_TREE: ITreeNode[] = [
  {
    id: 0,
    hasCaret: true,
    icon: 'folder-close',
    label: 'Datasets',
    isExpanded: true,
    childNodes: [
      { id: 1, icon: 'database', label: 'Global Logistics 2024', isSelected: true },
      { id: 2, icon: 'database', label: 'Regional Demographics' },
      { id: 3, icon: 'database', label: 'Historical Trade Routes' },
    ],
  },
  {
    id: 4,
    hasCaret: true,
    icon: 'folder-close',
    label: 'Analyses',
    childNodes: [
      { id: 5, icon: 'chart', label: 'Predictive Supply Chain' },
      { id: 6, icon: 'heat-grid', label: 'Resource Allocation' },
    ],
  },
  {
    id: 7,
    icon: 'cog',
    label: 'Settings',
  },
];

export default function App() {
  const [theme, setTheme] = useState('canopy');
  const [isDark, setIsDark] = useState(false);
  const [nodes, setNodes] = useState<ITreeNode[]>(INITIAL_TREE);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>('data');

  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute('data-theme', theme);
    if (isDark) {
      root.classList.add('dark', 'bp5-dark');
    } else {
      root.classList.remove('dark', 'bp5-dark');
    }
  }, [theme, isDark]);

  const cloneNodes = (nodesToClone: ITreeNode[]): ITreeNode[] => {
    return nodesToClone.map(node => ({
      ...node,
      childNodes: node.childNodes ? cloneNodes(node.childNodes) : undefined
    }));
  };

  const getNodeByPath = (clonedNodes: ITreeNode[], path: number[]) => {
    let targetNode = clonedNodes[path[0]];
    for (let i = 1; i < path.length; i++) {
      targetNode = targetNode.childNodes![path[i]];
    }
    return targetNode;
  };

  const handleNodeClick = (nodeData: ITreeNode, nodePath: number[], e: React.MouseEvent<HTMLElement>) => {
    const nextNodes = cloneNodes(nodes);
    const targetNode = getNodeByPath(nextNodes, nodePath);
    const originallySelected = targetNode.isSelected;
    if (!e.shiftKey) {
      forEachNode(nextNodes, n => (n.isSelected = false));
    }
    targetNode.isSelected = originallySelected == null ? true : !originallySelected;
    setNodes(nextNodes);
  };

  const handleNodeCollapse = (nodeData: ITreeNode, nodePath: number[]) => {
    const nextNodes = cloneNodes(nodes);
    const targetNode = getNodeByPath(nextNodes, nodePath);
    targetNode.isExpanded = false;
    setNodes(nextNodes);
  };

  const handleNodeExpand = (nodeData: ITreeNode, nodePath: number[]) => {
    const nextNodes = cloneNodes(nodes);
    const targetNode = getNodeByPath(nextNodes, nodePath);
    targetNode.isExpanded = true;
    setNodes(nextNodes);
  };

  const forEachNode = (nodesList: ITreeNode[] | undefined, callback: (node: ITreeNode) => void) => {
    if (nodesList == null) return;
    for (const node of nodesList) {
      callback(node);
      forEachNode(node.childNodes, callback);
    }
  };

  const dummyData = [
    { source: 'Northwest Hub', status: 'Active', latency: '12ms', packets: 45000 },
    { source: 'Cascadia Node', status: 'Warning', latency: '84ms', packets: 12050 },
    { source: 'Portland Relay', status: 'Active', latency: '18ms', packets: 29000 },
    { source: 'Seattle Core', status: 'Error', latency: '400ms', packets: 450 },
    { source: 'Spokane Edge', status: 'Active', latency: '40ms', packets: 8000 },
    { source: 'Boise Sync', status: 'Active', latency: '22ms', packets: 11000 },
  ];

  const renderCell = (rowIndex: number, colIndex: number) => {
    const row = dummyData[rowIndex];
    const styles = "font-body text-sm py-1 bg-transparent text-text border-muted/20";
    if (colIndex === 0) return <Cell className={styles}>{row.source}</Cell>;
    if (colIndex === 1) return (
      <Cell className={styles}>
        <Tag intent={row.status === 'Active' ? Intent.SUCCESS : row.status === 'Warning' ? Intent.WARNING : Intent.DANGER} minimal className="font-sans">
          {row.status}
        </Tag>
      </Cell>
    );
    if (colIndex === 2) return <Cell className={styles}>{row.latency}</Cell>;
    if (colIndex === 3) return <Cell className={styles}>{row.packets.toLocaleString()}</Cell>;
    return <Cell className={styles}>-</Cell>;
  };

  return (
    <div className="h-screen flex flex-col bg-bg text-text transition-colors duration-300 overflow-hidden font-body relative">
      {/* Top Navbar */}
      <header className="flex-none flex items-center justify-between px-4 py-3 bg-surface border-b border-muted/20 z-10 transition-colors duration-300 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-8 h-8 rounded bg-primary/10 text-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
          </div>
          <h1 className="text-xl font-header font-bold text-text">Nexus Ops</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <HTMLSelect
            value={theme}
            onChange={(e) => setTheme(e.currentTarget.value)}
            minimal
            className="font-header font-medium text-text bg-bg border border-muted/30 hover:bg-bg/80 focus:ring-1 focus:ring-primary shadow-none h-8 rounded"
            options={[
              { label: 'Timberline Canopy (PNW)', value: 'canopy' },
              { label: 'Haystack Monolith (PNW)', value: 'monolith' },
              { label: 'Alvord Basalt (PNW)', value: 'basalt' },
              { label: 'Blueprint Core', value: 'blueprint' },
            ]}
          />
          <Button
            onClick={() => setIsDark(!isDark)}
            minimal
            icon={isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            title="Toggle dark mode"
            className="text-text hover:bg-muted/10 h-8 w-8 !p-0 rounded"
          />
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 flex-none bg-surface border-r border-muted/20 flex flex-col transition-colors duration-300">
          <div className="p-4 border-b border-muted/20">
            <InputGroup 
              leftIcon="search" 
              placeholder="Search assets..." 
              className="font-body"
              inputClassName="bg-bg text-text border-muted/30 h-8 placeholder:text-muted/70 focus:ring-1 focus:ring-primary !shadow-none rounded"
            />
          </div>
          <div className="flex-1 overflow-auto p-2 pb-4 bp5-tree-custom">
            <style>{`
              .bp5-tree-custom .bp5-tree-node-content:hover { background-color: var(--color-bg); opacity: 0.8; }
              .bp5-tree-custom .bp5-tree-node-content.bp5-tree-node-selected { background-color: var(--color-primary); }
              .bp5-tree-custom .bp5-tree-node-selected .bp5-tree-node-label,
              .bp5-tree-custom .bp5-tree-node-selected .bp5-icon { color: var(--color-bg); }
              .bp5-tree-custom .bp5-tree-node-content { border-radius: 4px; padding: 2px 4px; font-family: var(--font-body); color: var(--color-text); }
              .bp5-tree-custom .bp5-icon { color: var(--color-muted); }
            `}</style>
            <Tree
              contents={nodes}
              onNodeClick={handleNodeClick}
              onNodeCollapse={handleNodeCollapse}
              onNodeExpand={handleNodeExpand}
              className="text-sm font-sans"
            />
          </div>
        </aside>

        {/* Workspace */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-bg">
          {/* Breadcrumbs / Header */}
          <div className="flex-none px-6 py-4 border-b border-muted/20 flex justify-between items-end">
            <div>
              <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1 font-header">Datasets • Analytics Node</div>
              <h2 className="text-2xl font-header font-semibold text-text">Global Logistics 2024</h2>
            </div>
            <div className="flex gap-2">
              <Button icon="export" minimal className="text-text font-body border border-muted/20 hover:bg-surface h-8 rounded text-sm px-3 shadow-none">Export</Button>
              <Button intent="primary" icon="refresh" className="bg-primary text-bg font-body hover:opacity-90 shadow-none h-8 rounded text-sm px-3" onClick={() => setDialogOpen(true)}>Sync Data</Button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-auto p-6 flex flex-col gap-6">
            
            <Callout intent={Intent.WARNING} icon="warning-sign" title="Sync Warning" className="bg-surface border-l-4 border-l-orange-500 text-text font-body rounded-sm shadow-sm p-4 ring-1 ring-muted/10">
              The 'Seattle Core' node is currently experiencing 400ms+ latency. Some historical data may be delayed.
            </Callout>

            {/* Dashboard grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Data Table Panel */}
              <Card className="lg:col-span-2 flex flex-col gap-4 bg-surface border border-muted/20 shadow-sm p-0 rounded-md overflow-hidden min-h-[400px]">
                <div className="px-4 py-3 border-b border-muted/20 flex gap-4 items-center justify-between">
                  <h3 className="font-header font-semibold text-text text-lg">Node Status Overview</h3>
                  <div className="flex items-center gap-2">
                     <DateRangeInput
                        formatDate={date => date.toLocaleDateString()}
                        parseDate={str => new Date(str)}
                        placeholder="Filter by date..."
                        shortcuts={true}
                        allowSingleDayRange={true}
                        popoverProps={{ minimal: true }}
                        className="bp5-custom-date"
                        locale={enUS}
                      />
                      <style>{`
                        .bp5-custom-date .bp5-input { font-family: var(--font-body); background-color: var(--color-bg); border-color: color-mix(in srgb, var(--color-muted) 30%, transparent); color: var(--color-text); box-shadow: none; border-radius: 4px; height: 32px; }
                        .bp5-custom-date .bp5-input:focus { border-color: var(--color-primary); box-shadow: 0 0 0 1px var(--color-primary); }
                      `}</style>
                  </div>
                </div>
                
                <div className="flex-1 p-0 m-0 custom-table-wrapper">
                  <style>{`
                    .custom-table-wrapper .bp5-table-container { background-color: transparent; border-top: none; border-bottom: none; }
                    .custom-table-wrapper .bp5-table-header { background-color: var(--color-surface); color: var(--color-text); font-family: var(--font-header); font-weight: 600; text-transform: uppercase; font-size: 0.75rem; border-color: color-mix(in srgb, var(--color-muted) 20%, transparent); box-shadow: none; }
                    .custom-table-wrapper .bp5-table-cell { background-color: var(--color-bg); border-color: color-mix(in srgb, var(--color-muted) 10%, transparent); color: var(--color-text); transition: background-color 0.2s; box-shadow: none; }
                    .custom-table-wrapper .bp5-table-cell:hover { background-color: color-mix(in srgb, var(--color-muted) 5%, transparent); }
                    .custom-table-wrapper .bp5-table-row-name { background-color: var(--color-surface); border-color: color-mix(in srgb, var(--color-muted) 20%, transparent); color: var(--color-muted); }
                  `}</style>
                  <Table2 numRows={dummyData.length} enableRowHeader={false} className="w-full h-full">
                    <Column name="Source Node" cellRenderer={renderCell} />
                    <Column name="Status" cellRenderer={renderCell} />
                    <Column name="Latency" cellRenderer={renderCell} />
                    <Column name="Packets/sec" cellRenderer={renderCell} />
                  </Table2>
                </div>
              </Card>

              {/* Inspector Panel */}
              <Card className="flex flex-col gap-4 bg-surface border border-muted/20 shadow-sm p-4 rounded-md">
                <h3 className="font-header font-semibold text-text text-lg border-b border-muted/20 pb-2">Properties</h3>
                
                <Tabs id="Properties" selectedTabId={selectedTab} onChange={(newTabId) => setSelectedTab(newTabId as string)} className="bp5-tabs-custom">
                  <style>{`
                    .bp5-tabs-custom .bp5-tab-list { border-bottom: 1px solid color-mix(in srgb, var(--color-muted) 20%, transparent); margin-bottom: 16px; }
                    .bp5-tabs-custom .bp5-tab { font-family: var(--font-header); font-weight: 500; font-size: 0.875rem; color: var(--color-muted); padding-bottom: 8px; margin-right: 24px; box-shadow: none !important; border: none; }
                    .bp5-tabs-custom .bp5-tab[aria-selected="true"], .bp5-tabs-custom .bp5-tab:hover { color: var(--color-primary); }
                    .bp5-tabs-custom .bp5-tab-indicator { background-color: var(--color-primary); height: 2px; }
                  `}</style>
                  <Tab id="data" title="Data Info" panel={
                    <div className="space-y-4 font-body text-sm">
                      <div className="grid grid-cols-2 gap-2 pb-2 border-b border-muted/10">
                        <span className="text-muted">Dataset ID</span>
                        <span className="text-text font-mono">GL-2024-X49</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pb-2 border-b border-muted/10">
                        <span className="text-muted">Created By</span>
                        <span className="text-text flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary">OP</div> Operations Team</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pb-2 border-b border-muted/10">
                        <span className="text-muted">Last Updated</span>
                        <span className="text-text">Just now</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pb-2">
                        <span className="text-muted">Access Level</span>
                        <span className="text-text"><Tag intent={Intent.PRIMARY} minimal className="font-header shadow-none">Classified</Tag></span>
                      </div>
                      
                      <div className="pt-4">
                        <FormGroup label="Description" className="text-muted font-bold font-header mb-1">
                          <textarea className="w-full bg-bg border border-muted/30 text-text font-body p-2 text-sm rounded shadow-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none h-24" defaultValue="Aggregate telemetry details collected from all regional nodes. Includes packet drop rates, total throughput, and localized latency spikes."></textarea>
                        </FormGroup>
                      </div>
                    </div>
                  } />
                  <Tab id="permissions" title="Permissions" panel={
                     <div className="font-body text-sm text-muted">You do not have administrative rights to modify permissions on this dataset.</div>
                  } />
                </Tabs>
              </Card>
              
            </div>
          </div>
        </main>
      </div>

      <Dialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="Sync Dataset"
        icon="refresh"
        className="bg-surface text-text shadow-xl border border-muted/20 font-body rounded-lg pb-0"
      >
        <div className="bp5-dialog-header bg-bg border-b border-muted/20">
          <h4 className="bp5-heading text-text font-header font-bold py-1">Sync Dataset</h4>
        </div>
        <DialogBody className="text-text space-y-4 py-6">
          <p>
            You are about to trigger a forced re-sync for <strong>Global Logistics 2024</strong>. 
            This process pulls real-time telemetry from all active nodes and may take several minutes to complete.
          </p>
          <FormGroup label="Sync Priority" className="text-muted font-bold font-header">
            <HTMLSelect options={[
              { label: 'Standard (Background)', value: 'standard' },
              { label: 'High (Immediate compute allocation)', value: 'high' }
            ]} className="w-full text-text font-body bg-bg border border-muted/30 h-8 rounded" fill minimal />
          </FormGroup>
        </DialogBody>
        <DialogFooter 
          actions={
            <>
              <Button minimal onClick={() => setDialogOpen(false)} className="text-muted hover:bg-muted/10 font-body">Cancel</Button>
              <Button intent="primary" onClick={() => setDialogOpen(false)} className="bg-primary text-bg font-header font-medium px-4 shadow-none hover:opacity-90 hover:bg-primary">Initiate Sync</Button>
            </>
          }
          className="border-t border-muted/20 pt-4 m-0 bg-surface rounded-b-lg p-4"
        />
      </Dialog>
    </div>
  );
}
