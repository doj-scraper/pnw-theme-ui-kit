import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';
import { cn } from '../../lib/utils';

export type CircuitState = 'closed' | 'open' | 'half-open';

export interface CircuitBreakerProps {
  /** closed = healthy, open = tripped, half-open = probing recovery. */
  state: CircuitState;
  label?: string;
  /** Rolling failure ratio 0–1, drives the gauge. */
  failureRate?: number;
  threshold?: number;
  className?: string;
}

const meta: Record<CircuitState, { color: string; icon: typeof Shield; text: string }> = {
  closed: { color: 'var(--signal-success)', icon: ShieldCheck, text: 'Closed' },
  'half-open': { color: 'var(--signal-amber)', icon: Shield, text: 'Half-Open' },
  open: { color: 'var(--signal-danger)', icon: ShieldAlert, text: 'Open' },
};

/**
 * CircuitBreaker — visualizes the health of a protected dependency in an
 * event-driven system, showing breaker state and the rolling failure rate
 * against its trip threshold.
 */
export function CircuitBreaker({
  state,
  label = 'Circuit Breaker',
  failureRate = 0,
  threshold = 0.5,
  className,
}: CircuitBreakerProps) {
  const m = meta[state];
  const Icon = m.icon;
  const pct = Math.round(Math.min(Math.max(failureRate, 0), 1) * 100);
  const thresholdPct = Math.round(Math.min(Math.max(threshold, 0), 1) * 100);

  return (
    <div className={cn('rounded-md border border-line bg-surface p-4', className)} style={{ borderColor: state === 'open' ? m.color : undefined }}>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon size={16} style={{ color: m.color }} className={state === 'half-open' ? 'animate-pulse' : undefined} />
          <span className="font-header text-sm font-semibold uppercase tracking-wide text-text">{label}</span>
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
        <div
          className="absolute top-0 h-full w-px bg-text/70"
          style={{ left: `${thresholdPct}%` }}
          title={`Trip threshold ${thresholdPct}%`}
        />
      </div>

      <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-muted">
        <span>Failure rate</span>
        <span style={{ color: m.color }}>
          {pct}% / {thresholdPct}%
        </span>
      </div>
    </div>
  );
}
