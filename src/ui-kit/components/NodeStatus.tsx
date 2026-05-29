import { Loader2, CheckCircle2, AlertCircle, Clock, CircleDot, Pause } from 'lucide-react';
import { cn } from '../../lib/utils';

export type NodeStatusValue = 'idle' | 'running' | 'success' | 'error' | 'waiting' | 'paused';

export interface NodeStatusProps {
  status?: NodeStatusValue;
  label?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

const config: Record<
  NodeStatusValue,
  { color: string; icon: typeof Clock; label: string }
> = {
  idle: { color: 'var(--muted)', icon: Clock, label: 'Ready' },
  running: { color: 'var(--color-primary)', icon: Loader2, label: 'Running' },
  success: { color: 'var(--signal-success)', icon: CheckCircle2, label: 'Done' },
  error: { color: 'var(--signal-danger)', icon: AlertCircle, label: 'Error' },
  waiting: { color: 'var(--signal-amber)', icon: CircleDot, label: 'Waiting' },
  paused: { color: 'var(--muted)', icon: Pause, label: 'Paused' },
};

/**
 * Compact status pill used to annotate nodes, agents and pipeline stages
 * across event-driven / agentic interfaces.
 */
export function NodeStatus({
  status = 'idle',
  label,
  showLabel = true,
  size = 'md',
  className,
}: NodeStatusProps) {
  const c = config[status];
  const Icon = c.icon;
  const iconSize = size === 'sm' ? 8 : 10;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-mono uppercase tracking-wider',
        size === 'sm' ? 'px-1.5 py-0.5 text-[9px]' : 'px-2 py-0.5 text-[10px]',
        className
      )}
      style={{ backgroundColor: `color-mix(in srgb, ${c.color} 16%, transparent)`, color: c.color }}
    >
      <Icon size={iconSize} className={status === 'running' ? 'animate-spin' : undefined} />
      {showLabel && <span>{label ?? c.label}</span>}
    </span>
  );
}

export const nodeStatusColor = (status: NodeStatusValue) => config[status].color;
