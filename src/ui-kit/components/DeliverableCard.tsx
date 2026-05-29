import { cn } from '../../lib/utils';

export type DeliverableStatus = 'Draft' | 'Pending' | 'Review' | 'Final';

export interface DeliverableCardProps {
  /** Index / id label, e.g. "01". */
  num?: string;
  name: string;
  description?: string;
  status?: DeliverableStatus;
  className?: string;
}

const statusColor: Record<DeliverableStatus, string> = {
  Draft: 'var(--muted)',
  Pending: 'var(--signal-amber)',
  Review: 'var(--signal-cobalt)',
  Final: 'var(--signal-success)',
};

/**
 * DeliverableCard — a labelled artifact / output card with a workflow status,
 * extracted from the Foundry assessment surface.
 */
export function DeliverableCard({
  num,
  name,
  description,
  status = 'Draft',
  className,
}: DeliverableCardProps) {
  const color = statusColor[status];
  return (
    <div
      className={cn(
        'bg-surface border border-line p-4 transition-colors hover:border-primary/60',
        className
      )}
    >
      {num && (
        <div className="mb-1.5 font-mono text-[9px] uppercase tracking-widest text-muted">
          Deliverable {num}
        </div>
      )}
      <h3 className="mb-2 font-header text-sm font-semibold uppercase tracking-wide text-text">
        {name}
      </h3>
      {description && <p className="text-xs leading-relaxed text-muted">{description}</p>}
      <div className="mt-3 flex items-center justify-between border-t border-line pt-2 font-mono text-[9px] uppercase tracking-wider text-muted">
        <span>Status</span>
        <span style={{ color }}>{status}</span>
      </div>
    </div>
  );
}
