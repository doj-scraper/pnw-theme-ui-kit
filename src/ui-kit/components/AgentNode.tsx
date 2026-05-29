import type { ReactNode } from 'react';
import { Search, PenLine, Code, Globe, CheckCircle2, Wrench } from 'lucide-react';
import { cn } from '../../lib/utils';
import { NodeStatus, nodeStatusColor, type NodeStatusValue } from './NodeStatus';

export interface AgentTool {
  id: string;
  label?: string;
  icon?: ReactNode;
  color?: string;
}

export interface AgentNodeProps {
  label: string;
  role?: string;
  status?: NodeStatusValue;
  tools?: (string | AgentTool)[];
  selected?: boolean;
  /** Render input/output connection ports on the node edges. */
  handles?: boolean;
  onClick?: () => void;
  className?: string;
}

const builtinTools: Record<string, { icon: ReactNode; color: string }> = {
  search: { icon: <Search size={10} />, color: 'var(--signal-cobalt)' },
  write: { icon: <PenLine size={10} />, color: 'var(--signal-success)' },
  code: { icon: <Code size={10} />, color: 'var(--signal-amber)' },
  browser: { icon: <Globe size={10} />, color: 'var(--color-primary)' },
  finish: { icon: <CheckCircle2 size={10} />, color: 'var(--muted)' },
};

function resolveTool(tool: string | AgentTool): AgentTool {
  if (typeof tool === 'string') {
    const b = builtinTools[tool];
    return { id: tool, label: tool, icon: b?.icon ?? <Wrench size={10} />, color: b?.color ?? 'var(--muted)' };
  }
  const b = tool.icon ? undefined : builtinTools[tool.id];
  return {
    ...tool,
    label: tool.label ?? tool.id,
    icon: tool.icon ?? b?.icon ?? <Wrench size={10} />,
    color: tool.color ?? b?.color ?? 'var(--muted)',
  };
}

/**
 * AgentNode — a workflow card representing an autonomous agent or task in a
 * graph. Shows the agent label, role, live status and the tools it can call.
 * Pair with `handles` when placing inside a graph canvas.
 */
export function AgentNode({
  label,
  role,
  status = 'idle',
  tools = [],
  selected,
  handles,
  onClick,
  className,
}: AgentNodeProps) {
  const accent = nodeStatusColor(status);
  const resolved = tools.map(resolveTool);

  return (
    <div className={cn('relative', className)}>
      {handles && (
        <span
          className="absolute -left-1.5 top-1/2 z-10 h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2"
          style={{ background: 'var(--surface-2)', borderColor: 'var(--line)' }}
          aria-hidden
        />
      )}
      <button
        type="button"
        onClick={onClick}
        className={cn(
          'w-full min-w-[200px] max-w-[260px] rounded-xl border bg-surface p-3.5 text-left transition-all',
          'hover:border-primary/60',
          selected ? 'border-primary shadow-[0_0_0_2px_color-mix(in_srgb,var(--color-primary)_45%,transparent)]' : 'border-line',
          status === 'running' && 'animate-[pulse_1.6s_ease-in-out_infinite]'
        )}
        style={status !== 'idle' ? { borderColor: accent } : undefined}
      >
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="truncate font-header text-[13px] font-semibold text-text">{label}</span>
          <NodeStatus status={status} size="sm" />
        </div>
        {role && <div className="mb-3 truncate text-[11px] text-muted">{role}</div>}
        {resolved.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {resolved.map((t) => (
              <span
                key={t.id}
                className="inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[9px] capitalize"
                style={{ background: `color-mix(in srgb, ${t.color} 15%, transparent)`, color: t.color }}
              >
                {t.icon}
                <span className="ml-0.5">{t.label}</span>
              </span>
            ))}
          </div>
        )}
      </button>
      {handles && (
        <span
          className="absolute -right-1.5 top-1/2 z-10 h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2"
          style={{ background: 'var(--surface-2)', borderColor: 'var(--line)' }}
          aria-hidden
        />
      )}
    </div>
  );
}
