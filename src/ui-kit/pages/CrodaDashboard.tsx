import { useState, useEffect } from 'react';
import {
  ThemeProvider,
  useTheme,
  Dropdown,
  StatusBar,
  StatusIndicator,
  NavTabs,
  NavTab,
  MetricCard,
  CardGrid,
  EntityList,
  EntitySection,
  EntityItem,
  ProgressBar,
  themesWithCroda,
} from '../index';

// Data types
interface Entity {
  id: string;
  name: string;
  type: string;
  cat: 'Process Actors' | 'Data Stores' | 'Artifacts';
}

interface MatrixItem {
  name: string;
  desc: string;
  val: number;
  color?: string;
}

interface Deliverable {
  num: string;
  name: string;
  desc: string;
  status: 'Draft' | 'Pending' | 'Review' | 'Final';
}

interface ProfileData {
  label: string;
  title: string;
  sub: string;
  entities: Entity[];
  matrix: MatrixItem[];
  deliverables: Deliverable[];
}

const DATA_PROFILES: Record<'premium' | 'foundational', ProfileData> = {
  premium: {
    label: "PREMIUM_ASSESSMENT.JSON",
    title: "10-Day Operational Leverage Assessment",
    sub: "RESOLVING THE INTAKE → VERIFICATION → ROUTING BOTTLENECK",
    entities: [
      { id: "client", name: "Client Ops Data", type: "Input", cat: "Artifacts" },
      { id: "assessor", name: "Assessment Core", type: "Orch.", cat: "Artifacts" },
      { id: "phase1", name: "Process Mapping", type: "Phase 1", cat: "Process Actors" },
      { id: "phase2", name: "Rule Extraction", type: "Phase 2", cat: "Process Actors" },
      { id: "phase3", name: "Architecture Design", type: "Phase 3", cat: "Process Actors" },
      { id: "phase4", name: "ROI Calculation", type: "Phase 4", cat: "Process Actors" },
      { id: "phase5", name: "Exec Briefout", type: "Phase 5", cat: "Process Actors" },
      { id: "wf_store", name: "Workflow DB", type: "Store", cat: "Data Stores" },
      { id: "rules_store", name: "Rules Engine", type: "Store", cat: "Data Stores" },
      { id: "arch_store", name: "Sys Graph", type: "Store", cat: "Data Stores" },
      { id: "roi_store", name: "ROI Model", type: "Store", cat: "Data Stores" },
      { id: "report", name: "Value-at-Stake Report", type: "Output", cat: "Artifacts" }
    ],
    matrix: [
      { name: "Rule Clarity", desc: "Policy-constrained and deterministic. Logic trees verified with no subjective judgment.", val: 88 },
      { name: "Economic Value", desc: "Quantifiable cycle time reduction. Direct margin impact identified across intake loops.", val: 80, color: "#f59e0b" },
      { name: "Volume & Frequency", desc: "High-frequency loop justifies automation infrastructure investment.", val: 75 },
      { name: "System Access", desc: "CRM API confirmed. EHR connector mapped. Data cleanliness rated 7/10.", val: 80, color: "#60a5fa" },
      { name: "Exception Simplicity", desc: "Exception classes mapped. Escalation path defined for human-in-the-loop handoff.", val: 60, color: "#f59e0b" }
    ],
    deliverables: [
      { num: "01", name: "Automation Blueprint", desc: "Deterministic software-agent infrastructure mapping intake forms to enterprise CRM.", status: "Draft" },
      { num: "02", name: "ROI Labor Calculation", desc: "Exact calculation of FTE labor hours returned to the business via automation.", status: "Pending" },
      { num: "03", name: "Threat Map", desc: "Compliance and security architecture. Data residency and access control layers.", status: "Review" }
    ]
  },
  foundational: {
    label: "FOUNDATIONAL_AUDIT.JSON",
    title: "5-Step Foundational Agentic Audit",
    sub: "SYSTEMATICALLY DIAGNOSING OPERATIONAL BOTTLENECKS",
    entities: [
      { id: "org_data", name: "Organization Data", type: "Input", cat: "Artifacts" },
      { id: "audit_engine", name: "Audit Engine", type: "Orch.", cat: "Artifacts" },
      { id: "f1", name: "Map All Tools", type: "Step 1", cat: "Process Actors" },
      { id: "f2", name: "Find Knowledge", type: "Step 2", cat: "Process Actors" },
      { id: "f3", name: "Document Processes", type: "Step 3", cat: "Process Actors" },
      { id: "f4", name: "Identify Owners", type: "Step 4", cat: "Process Actors" },
      { id: "f5", name: "Measure Results", type: "Step 5", cat: "Process Actors" },
      { id: "stack_db", name: "Tech Stack DB", type: "Store", cat: "Data Stores" },
      { id: "know_idx", name: "Knowledge Index", type: "Store", cat: "Data Stores" },
      { id: "proc_map", name: "Process Maps", type: "Store", cat: "Data Stores" },
      { id: "own_mat", name: "Stakeholder Matrix", type: "Store", cat: "Data Stores" },
      { id: "res_dash", name: "Metrics Dash", type: "Store", cat: "Data Stores" },
      { id: "f_report", name: "AI Audit Report", type: "Output", cat: "Artifacts" }
    ],
    matrix: [
      { name: "Tech Stack Mapped", desc: "Complete inventory of CRMs, email providers, Google Sheets, and ancillary tools.", val: 100 },
      { name: "Knowledge Sourced", desc: "Data silos identified. Explicit understanding of where LLMs must connect.", val: 85, color: "#60a5fa" },
      { name: "Process Documented", desc: "Raw inputs, desired outputs, and tool requirements formally codified.", val: 65, color: "#f59e0b" },
      { name: "Owners Identified", desc: "Stakeholders and budget owners mapped to specific operational workflows.", val: 90 },
      { name: "Success Metrics", desc: "Baseline error rates, cost per transaction, and expected accuracy improvements set.", val: 70 }
    ],
    deliverables: [
      { num: "01", name: "Tech Stack Topology", desc: "Visual map of the entire software ecosystem and data transit paths.", status: "Final" },
      { num: "02", name: "Knowledge Source Index", desc: "Directory of vectorizable data stores for RAG implementation.", status: "Final" },
      { num: "03", name: "Stakeholder Blueprint", desc: "Departmental breakdown of workflow owners and associated budgets.", status: "Draft" }
    ]
  }
};

function DashboardContent() {
  const { theme, setTheme } = useTheme();
  const [currentProfile, setCurrentProfile] = useState<'premium' | 'foundational'>('premium');
  const [activeTab, setActiveTab] = useState<'matrix' | 'deliverables'>('matrix');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);

  const activeData = DATA_PROFILES[currentProfile];
  const categories: Array<'Process Actors' | 'Data Stores' | 'Artifacts'> = ['Process Actors', 'Data Stores', 'Artifacts'];
  const selectedEntity = activeData.entities.find(e => e.id === selectedEntityId);

  return (
    <div className="h-screen flex flex-col bg-bg text-text overflow-hidden">
      {/* Header */}
      <nav className="bg-surface/95 border-b border-muted/20 px-4 py-2.5 flex items-center justify-between backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 border-2 border-primary flex items-center justify-center">
              <div className="w-2 h-2 bg-primary animate-pulse" />
            </div>
            <div className="font-header text-lg font-bold tracking-widest">
              CRODA <span className="text-primary mx-1">//</span> <span className="text-muted">FOUNDRY</span>
            </div>
          </div>
          <div className="w-px h-6 bg-muted/20" />
          <Dropdown
            label="PROFILE"
            value={activeData.label}
            items={[
              { label: 'PREMIUM_ASSESSMENT.JSON', value: 'premium', active: currentProfile === 'premium' },
              { label: 'FOUNDATIONAL_AUDIT.JSON', value: 'foundational', active: currentProfile === 'foundational' }
            ]}
            onChange={(val) => setCurrentProfile(val as 'premium' | 'foundational')}
          />
        </div>

        <NavTabs>
          <NavTab active={activeTab === 'matrix'} onClick={() => setActiveTab('matrix')} icon>
            Diagnostic Matrix
          </NavTab>
          <NavTab active={activeTab === 'deliverables'} onClick={() => setActiveTab('deliverables')} icon>
            Deliverables
          </NavTab>
        </NavTabs>
      </nav>

      {/* Main */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 bg-surface/95 border-r border-muted/20 flex flex-col backdrop-blur-sm">
          <div className="p-3 border-b border-muted/20 bg-black/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-muted uppercase tracking-widest">Entity Explorer</span>
              <span className="text-xs font-mono px-2 py-0.5 border border-primary text-primary">LIVE</span>
            </div>
            <div className="flex items-center border border-muted/20 bg-bg">
              <div className="px-2.5 py-1.5 text-xs font-mono text-muted border-r border-muted/20 bg-bg">SRC</div>
              <input
                type="text"
                className="flex-1 bg-transparent border-none px-2.5 py-1.5 text-xs font-mono text-text outline-none"
                placeholder="Filter entities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            <EntityList>
              {categories.map(cat => {
                const entities = activeData.entities.filter(
                  e => e.cat === cat && e.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
                if (entities.length === 0) return null;
                return (
                  <EntitySection key={cat} title={cat}>
                    {entities.map(e => {
                      let variant: 'actor' | 'store' | 'input' | 'output' | 'core' = 'actor';
                      if (e.type === 'Store') variant = 'store';
                      if (e.type === 'Input') variant = 'input';
                      if (e.type === 'Output') variant = 'output';
                      if (e.type === 'Orch.') variant = 'core';
                      return (
                        <EntityItem
                          key={e.id}
                          name={e.name}
                          type={e.type}
                          variant={variant}
                          active={selectedEntityId === e.id}
                          onClick={() => setSelectedEntityId(e.id)}
                        />
                      );
                    })}
                  </EntitySection>
                );
              })}
            </EntityList>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {activeTab === 'matrix' && (
            <div className="flex flex-col items-center p-10 gap-6">
              <div className="text-center">
                <h1 className="text-3xl font-header font-bold tracking-widest uppercase mb-2">{activeData.title}</h1>
                <p className="text-xs font-mono text-muted tracking-wider">{activeData.sub}</p>
              </div>
              <CardGrid columns={3}>
                {activeData.matrix.map((m, idx) => (
                  <MetricCard
                    key={idx}
                    title={m.name}
                    value={m.val}
                    description={m.desc}
                    color={m.color}
                  />
                ))}
              </CardGrid>
            </div>
          )}

          {activeTab === 'deliverables' && (
            <div className="flex flex-col items-center p-10 gap-6">
              <div className="text-center">
                <h1 className="text-3xl font-header font-bold tracking-widest uppercase mb-2">Deliverables Output</h1>
                <p className="text-xs font-mono text-muted tracking-wider">{activeData.title.toUpperCase()} // ARTIFACTS</p>
              </div>
              <CardGrid columns={3}>
                {activeData.deliverables.map((d, idx) => (
                  <MetricCard key={idx} title={d.name} showProgress={false}>
                    <div className="text-xs font-mono text-muted mb-2">DELIVERABLE {d.num}</div>
                    <p className="text-xs text-muted mb-3">{d.desc}</p>
                    <div className="pt-2 border-t border-muted/10 text-xs font-mono text-muted">
                      STATUS: {d.status.toUpperCase()}
                    </div>
                  </MetricCard>
                ))}
              </CardGrid>
            </div>
          )}
        </main>

        {/* Right Panel */}
        <aside className="w-72 bg-surface/95 border-l border-muted/20 flex flex-col backdrop-blur-sm">
          <div className="p-3 border-b border-muted/20 bg-black/10">
            <span className="text-xs font-mono text-muted uppercase tracking-widest">System Metrics</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            <div>
              <h3 className="text-sm font-header font-semibold uppercase tracking-wide mb-3 pb-2 border-b border-muted/20">Orchestrator</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-muted">Architecture</span><span className="font-mono text-primary">Deterministic</span></div>
                <div className="flex justify-between"><span className="text-muted">Methodology</span><span className="font-mono text-primary">{activeData.label.replace('.JSON', '')}</span></div>
                <div className="flex justify-between"><span className="text-muted">Nodes Mapped</span><span className="font-mono text-primary">{activeData.entities.length}</span></div>
              </div>
            </div>

            {selectedEntity && (
              <div className="pt-4 border-t border-muted/20">
                <h3 className="text-sm font-header font-semibold uppercase tracking-wide mb-3 pb-2 border-b border-muted/20">Selected Node</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-muted">Node ID</span><span className="font-mono text-blue-400">{selectedEntity.id}</span></div>
                  <div className="flex justify-between"><span className="text-muted">Label</span><span className="font-mono text-text">{selectedEntity.name}</span></div>
                  <div className="flex justify-between"><span className="text-muted">Type</span><span className="font-mono text-amber-500">{selectedEntity.type}</span></div>
                  <div className="flex justify-between"><span className="text-muted">Class</span><span className="font-mono text-primary">{selectedEntity.cat}</span></div>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Footer */}
      <StatusBar>
        <StatusIndicator status="active">SYSTEM NOMINAL</StatusIndicator>
        <div className="ml-auto flex items-center gap-4">
          <span>CRODA CONSULTING // <span className="text-primary">{activeData.label}</span></span>
        </div>
      </StatusBar>
    </div>
  );
}

export default function CrodaDashboard() {
  return (
    <ThemeProvider>
      <DashboardContent />
    </ThemeProvider>
  );
}
