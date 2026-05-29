import { cn } from '../../lib/utils';

export type DeliverableStatus = 'queued' | 'running' | 'ready' | 'blocked';

export interface DeliverableCardProps {
  /** Artifact title. */
  title: string;
  /** Artifact kind, e.g. "Document", "Dataset", "Stream". */
  kind?: string;
  status?: DeliverableStatus;
  /** Completion 0–100; renders a progress bar when provided. */
  progress?: number;
  /** Producing node / agent. */
  owner?: string;
  className?: string;
}

const statusMeta: Record<DeliverableStatus, { color: string; label: string }> = {
  queued: { color: 'var(--muted)', label: 'Queued' },
  running: { color: 'var(--signal-cobalt)', label: 'Running' },
  ready: { color: 'var(--signal-success)', label: 'Ready' },
  blocked: { color: 'var(--signal-danger)', label: 'Blocked' },
};

/**
 * DeliverableCard — an output artifact produced by a workflow / agent, with
 * its production status, owning node, and completion progress.
 */
export function DeliverableCard({
  title,
  kind,
  status = 'queued',
  progress,
  owner,
  className,
}: DeliverableCardProps) {
  const m = statusMeta[status];
  return (
    <div
      className={cn(
        'flex flex-col bg-surface border border-line p-3 transition-colors hover:border-primary/60',
        className
      )}
    >
      <div className="mb-1 flex items-center justify-between gap-2">
        {kind && (
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted">{kind}</span>
        )}
        <span
          className="rounded-full px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider"
          style={{ background: `color-mix(in srgb, ${m.color} 16%, transparent)`, color: m.color }}
        >
          {m.label}
        </span>
      </div>

      <h3 className="font-header text-sm font-semibold uppercase tracking-wide text-text">
        {title}
      </h3>

      {typeof progress === 'number' && (
        <div className="mt-2 h-0.5 overflow-hidden bg-muted/20">
          <div
            className="h-full transition-all duration-700"
            style={{ width: `${Math.min(Math.max(progress, 0), 100)}%`, backgroundColor: m.color }}
          />
        </div>
      )}

      {owner && (
        <div className="mt-2 font-mono text-[9px] uppercase tracking-wider text-muted">
          via {owner}
        </div>
      )}
    </div>
  );
}
