import { cn } from '../../lib/utils';

export type EventLevel = 'info' | 'success' | 'warning' | 'error' | 'debug';

export interface StreamEvent {
  id: string;
  /** Timestamp string, already formatted (e.g. "12:04:51.220"). */
  ts: string;
  level?: EventLevel;
  /** Emitting source / topic / actor. */
  source?: string;
  message: string;
}

export interface EventStreamProps {
  events: StreamEvent[];
  /** Empty-state hint. */
  emptyLabel?: string;
  /** Max height before the log scrolls. */
  maxHeight?: number | string;
  className?: string;
}

const levelColor: Record<EventLevel, string> = {
  info: 'var(--signal-cobalt)',
  success: 'var(--signal-success)',
  warning: 'var(--signal-amber)',
  error: 'var(--signal-danger)',
  debug: 'var(--muted)',
};

/**
 * EventStream — an append-only, monospaced log of emitted events for
 * event-driven and observability surfaces. Newest events render at the top.
 */
export function EventStream({
  events,
  emptyLabel = 'AWAITING EVENTS…',
  maxHeight = 320,
  className,
}: EventStreamProps) {
  return (
    <div
      className={cn('overflow-y-auto rounded-md border border-line bg-surface font-mono text-[11px]', className)}
      style={{ maxHeight }}
      role="log"
      aria-live="polite"
    >
      {events.length === 0 ? (
        <div className="px-3 py-6 text-center text-[10px] uppercase tracking-widest text-muted">
          {emptyLabel}
        </div>
      ) : (
        <ul>
          {events.map((e) => {
            const color = levelColor[e.level ?? 'info'];
            return (
              <li
                key={e.id}
                className="flex items-start gap-2 border-b border-line/60 px-3 py-1.5 last:border-b-0"
              >
                <span className="shrink-0 text-muted">{e.ts}</span>
                <span
                  className="mt-0.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: color }}
                  aria-hidden
                />
                {e.source && (
                  <span className="shrink-0 uppercase" style={{ color }}>
                    {e.source}
                  </span>
                )}
                <span className="text-text">{e.message}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
