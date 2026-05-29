import { useEffect, useMemo, useState } from 'react';
import {
  Network,
  Boxes,
  Workflow,
  Gauge,
  Bell,
  Search,
  Share2,
  GitBranch,
} from 'lucide-react';
import { ThemeProvider, useTheme } from '../theme/ThemeProvider';
import { NavTabs, NavTab } from '../components/NavTabs';
import { Dropdown } from '../components/Dropdown';
import { EntityList, EntitySection, EntityItem } from '../components/EntityList';
import { GraphCanvas, type GraphNodeInput } from '../components/GraphCanvas';
import { EventStream, type StreamEvent } from '../components/EventStream';
import { CircuitBreaker } from '../components/CircuitBreaker';
import { MetricCard } from '../components/MetricCard';
import { DeliverableCard } from '../components/DeliverableCard';
import { StatusBar, StatusIndicator } from '../components/StatusBar';

/* ── Demo dataset (ontology / agent topology) ─────────────────────────────── */

const NODES: GraphNodeInput[] = [
  { id: 'ingest', label: 'Signal Ingest', variant: 'input' },
  { id: 'normalize', label: 'Normalizer', variant: 'actor' },
  { id: 'store', label: 'Entity Store', variant: 'store' },
  { id: 'planner', label: 'Planner Agent', variant: 'core' },
  { id: 'retriever', label: 'Retriever', variant: 'actor' },
  { id: 'executor', label: 'Executor', variant: 'actor' },
  { id: 'guard', label: 'Policy Guard', variant: 'actor' },
  { id: 'sink', label: 'Decision Sink', variant: 'output' },
];

const EDGES: [string, string][] = [
  ['ingest', 'normalize'],
  ['normalize', 'store'],
  ['store', 'planner'],
  ['planner', 'retriever'],
  ['planner', 'executor'],
  ['retriever', 'executor'],
  ['executor', 'guard'],
  ['guard', 'sink'],
];

const ENTITY_META: Record<string, { type: string; variant: GraphNodeInput['variant'] }> = {
  ingest: { type: 'SOURCE', variant: 'input' },
  normalize: { type: 'TRANSFORM', variant: 'actor' },
  store: { type: 'DATASET', variant: 'store' },
  planner: { type: 'AGENT', variant: 'core' },
  retriever: { type: 'AGENT', variant: 'actor' },
  executor: { type: 'AGENT', variant: 'actor' },
  guard: { type: 'POLICY', variant: 'actor' },
  sink: { type: 'OUTPUT', variant: 'output' },
};

const SEED_EVENTS: StreamEvent[] = [
  { id: 'e1', ts: '14:02:11', source: 'planner', level: 'info', message: 'Decomposed objective into 4 sub-tasks' },
  { id: 'e2', ts: '14:02:12', source: 'retriever', level: 'info', message: 'Resolved 18 entities from store' },
  { id: 'e3', ts: '14:02:13', source: 'guard', level: 'warning', message: 'Rate ceiling approaching on tool: web.fetch' },
  { id: 'e4', ts: '14:02:14', source: 'executor', level: 'success', message: 'Tool call ledger.write committed' },
  { id: 'e5', ts: '14:02:15', source: 'ingest', level: 'info', message: 'Buffered 2,401 new signals' },
];

const DELIVERABLES = [
  { title: 'Risk Posture Brief', kind: 'Document', status: 'ready' as const, owner: 'planner', progress: 100 },
  { title: 'Entity Resolution Set', kind: 'Dataset', status: 'running' as const, owner: 'retriever', progress: 64 },
  { title: 'Action Ledger', kind: 'Stream', status: 'running' as const, owner: 'executor', progress: 38 },
  { title: 'Policy Audit', kind: 'Report', status: 'queued' as const, owner: 'guard', progress: 0 },
];

const TABS = ['Topology', 'Pipelines', 'Agents', 'Telemetry'];

const PROFILES = [
  { label: 'Operator // a.reyes', value: 'a.reyes', active: true },
  { label: 'Analyst // k.tan', value: 'k.tan' },
  { label: 'Supervisor // m.okafor', value: 'm.okafor' },
];

/* ── Workspace shell ──────────────────────────────────────────────────────── */

function Workspace() {
  const { setTheme, setMode } = useTheme();
  const [tab, setTab] = useState('Topology');
  const [selected, setSelected] = useState<string | null>('planner');
  const [profile, setProfile] = useState('a.reyes');
  const [events, setEvents] = useState<StreamEvent[]>(SEED_EVENTS);

  // This page showcases the Foundry (agentic) palette.
  useEffect(() => {
    setTheme('foundry');
    setMode('dark');
  }, [setTheme, setMode]);

  // Simulate a live event feed.
  useEffect(() => {
    const sources = NODES.map((n) => n.id);
    const levels: StreamEvent['level'][] = ['info', 'info', 'success', 'warning'];
    const msgs = [
      'Heartbeat acknowledged',
      'Sub-task dispatched',
      'Tool call committed',
      'Backpressure detected on queue',
      'Checkpoint persisted',
      'Entity batch resolved',
    ];
    const t = setInterval(() => {
      const now = new Date();
      setEvents((prev) =>
        [
          {
            id: `${now.getTime()}`,
            ts: now.toLocaleTimeString('en-GB', { hour12: false }),
            source: sources[Math.floor(Math.random() * sources.length)],
            level: levels[Math.floor(Math.random() * levels.length)],
            message: msgs[Math.floor(Math.random() * msgs.length)],
          },
          ...prev,
        ].slice(0, 40)
      );
    }, 2600);
    return () => clearInterval(t);
  }, []);

  const selectedNode = useMemo(() => NODES.find((n) => n.id === selected), [selected]);

  return (
    <div className="flex h-screen flex-col bg-bg text-text font-body">
      {/* ── Top navigation ─────────────────────────────────────────────── */}
      <header className="flex h-12 flex-shrink-0 items-center justify-between border-b border-line bg-surface">
        <div className="flex h-full items-center">
          <div className="flex items-center gap-2.5 px-4">
            <div className="flex h-6 w-6 items-center justify-center bg-primary text-bg">
              <Network size={14} />
            </div>
            <span className="font-header text-base font-semibold uppercase tracking-[0.18em] text-text">
              Foundry
            </span>
            <span className="font-mono text-[10px] text-muted">/ ontology</span>
          </div>
          <NavTabs>
            {TABS.map((t) => (
              <NavTab key={t} active={tab === t} onClick={() => setTab(t)} icon>
                {t}
              </NavTab>
            ))}
          </NavTabs>
        </div>
        <div className="flex items-center gap-3 px-4">
          <button
            aria-label="Search"
            className="flex h-7 w-7 items-center justify-center border border-line text-muted transition-colors hover:border-primary hover:text-primary"
          >
            <Search size={14} />
          </button>
          <button
            aria-label="Notifications"
            className="relative flex h-7 w-7 items-center justify-center border border-line text-muted transition-colors hover:border-primary hover:text-primary"
          >
            <Bell size={14} />
            <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-signal-amber" />
          </button>
          <Dropdown label="session" value={profile} items={PROFILES} onChange={setProfile} />
        </div>
      </header>

      {/* ── Main 3-column body ─────────────────────────────────────────── */}
      <div className="flex min-h-0 flex-1">
        {/* Left: entity explorer */}
        <aside className="flex w-64 flex-shrink-0 flex-col border-r border-line bg-surface">
          <div className="flex items-center justify-between border-b border-line px-3 py-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
              Entity Explorer
            </span>
            <Boxes size={13} className="text-muted" />
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            <EntityList>
              <EntitySection title="Graph Objects">
                {NODES.map((n) => (
                  <EntityItem
                    key={n.id}
                    name={n.label}
                    type={ENTITY_META[n.id].type}
                    variant={ENTITY_META[n.id].variant}
                    active={selected === n.id}
                    onClick={() => setSelected(n.id)}
                  />
                ))}
              </EntitySection>
              <EntitySection title="Saved Views">
                <EntityItem name="Critical Path" type="VIEW" variant="output" />
                <EntityItem name="Agent Mesh" type="VIEW" variant="core" />
              </EntitySection>
            </EntityList>
          </div>
        </aside>

        {/* Center: graph canvas + inspector */}
        <main className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center justify-between border-b border-line bg-surface/40 px-4 py-2">
            <div className="flex items-center gap-2">
              <Workflow size={14} className="text-primary" />
              <span className="font-header text-sm font-semibold uppercase tracking-wider text-text">
                Topology Graph
              </span>
              <span className="font-mono text-[10px] text-muted">
                {NODES.length} nodes / {EDGES.length} edges
              </span>
            </div>
            <button className="flex items-center gap-1.5 border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted transition-colors hover:border-primary hover:text-primary">
              <Share2 size={12} /> Export
            </button>
          </div>

          <GraphCanvas
            nodes={NODES}
            edges={EDGES}
            selectedId={selected}
            onSelect={setSelected}
            className="bg-bg"
          />

          {/* Inspector strip */}
          <div className="flex h-16 flex-shrink-0 items-center gap-6 border-t border-line bg-surface px-4">
            {selectedNode ? (
              <>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    Selected
                  </div>
                  <div className="font-header text-sm font-semibold text-text">
                    {selectedNode.label}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    Class
                  </div>
                  <div className="font-mono text-xs text-primary">
                    {ENTITY_META[selectedNode.id].type}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    Degree
                  </div>
                  <div className="font-mono text-xs text-text">
                    {EDGES.filter((e) => e.includes(selectedNode.id)).length}
                  </div>
                </div>
              </>
            ) : (
              <span className="font-mono text-xs text-muted">No selection</span>
            )}
          </div>
        </main>

        {/* Right: telemetry */}
        <aside className="flex w-80 flex-shrink-0 flex-col border-l border-line bg-surface">
          <div className="border-b border-line p-3">
            <CircuitBreaker
              label="Tool Gateway"
              state="half-open"
              failures={3}
              threshold={5}
              cooldown="12s"
            />
          </div>
          <div className="flex items-center gap-2 border-b border-line px-3 py-2">
            <GitBranch size={13} className="text-muted" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
              Event Stream
            </span>
          </div>
          <EventStream events={events} className="min-h-0 flex-1" />
        </aside>
      </div>

      {/* ── Diagnostics + deliverables drawer ──────────────────────────── */}
      <section className="flex-shrink-0 border-t border-line bg-bg px-4 py-3">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-7">
            <div className="mb-2 flex items-center gap-2">
              <Gauge size={13} className="text-primary" />
              <span className="font-header text-xs font-semibold uppercase tracking-wider text-text">
                Diagnostic Matrix
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <MetricCard title="Throughput" value={86} description="events / sec sustained" />
              <MetricCard title="Agent Util" value={62} description="planner + workers" color="var(--signal-cobalt)" />
              <MetricCard title="Queue Depth" value={28} description="pending dispatch" color="var(--signal-amber)" />
              <MetricCard title="Error Rate" value={4} description="rolling 5-min" color="var(--signal-danger)" />
            </div>
          </div>
          <div className="col-span-5">
            <div className="mb-2 flex items-center gap-2">
              <Boxes size={13} className="text-primary" />
              <span className="font-header text-xs font-semibold uppercase tracking-wider text-text">
                Deliverables
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {DELIVERABLES.map((d) => (
                <DeliverableCard key={d.title} {...d} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Status bar ─────────────────────────────────────────────────── */}
      <StatusBar>
        <StatusIndicator status="active">RUNTIME ONLINE</StatusIndicator>
        <StatusIndicator status="warning">GATEWAY HALF-OPEN</StatusIndicator>
        <span>NODES {NODES.length}</span>
        <span>EDGES {EDGES.length}</span>
        <span className="ml-auto">FOUNDRY // AGENTIC PALETTE</span>
        <span>v0.2.0</span>
      </StatusBar>
    </div>
  );
}

export default function FoundryWorkspace() {
  return (
    <ThemeProvider>
      <Workspace />
    </ThemeProvider>
  );
}
