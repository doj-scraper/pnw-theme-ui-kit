import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';
import { cn } from '../../lib/utils';

export type CircuitState = 'closed' | 'open' | 'half-open';

export interface CircuitBreakerProps {
  /** closed = healthy, open = tripped, half-open = probing recovery. */
  state: CircuitState;
  label?: string;
  /** Observed failures in the rolling window. */
  failures?: number;
  /** Failure count at which the breaker trips. */
  threshold?: number;
  /** Time remaining before a half-open probe (e.g. "12s"). */
  cooldown?: string;
  className?: string;
}

const meta: Record<CircuitState, { color: string; icon: typeof Shield; text: string }> = {
  closed: { color: 'var(--signal-success)', icon: ShieldCheck, text: 'Closed' },
  'half-open': { color: 'var(--signal-amber)', icon: Shield, text: 'Half-Open' },
  open: { color: 'var(--signal-danger)', icon: ShieldAlert, text: 'Open' },
};

/**
 * CircuitBreaker — visualizes the health of a protected dependency in an
 * event-driven system: the breaker state, failures against the trip
 * threshold, and any recovery cooldown.
 */
export function CircuitBreaker({
  state,
  label = 'Circuit Breaker',
  failures = 0,
  threshold = 5,
  cooldown,
  className,
}: CircuitBreakerProps) {
  const m = meta[state];
  const Icon = m.icon;
  const pct = Math.round(Math.min(failures / Math.max(threshold, 1), 1) * 100);

  return (
    <div
      className={cn('rounded-md border border-line bg-surface p-4', className)}
      style={{ borderColor: state === 'open' ? m.color : undefined }}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon
            size={16}
            style={{ color: m.color }}
            className={state === 'half-open' ? 'animate-pulse' : undefined}
          />
          <span className="font-header text-sm font-semibold uppercase tracking-wide text-text">
            {label}
          </span>
        </div>
        <span
          className="rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider"
          style={{ background: `color-mix(in srgb, ${m.color} 16%, transparent)`, color: m.color }}
        >
          {m.text}
        </span>
      </div>

      <div className="relative h-1.5 overflow-hidden rounded-full bg-muted/20">
        <div
          className="h-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: m.color }}
        />
      </div>

      <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-muted">
        <span>
          Failures{' '}
          <span style={{ color: m.color }}>
            {failures}/{threshold}
          </span>
        </span>
        {cooldown && <span>retry in {cooldown}</span>}
      </div>
    </div>
  );
}
