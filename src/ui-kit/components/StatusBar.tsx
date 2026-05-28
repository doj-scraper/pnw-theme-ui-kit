import { ReactNode } from 'react';

export interface StatusBarProps {
  children?: ReactNode;
  className?: string;
}

export function StatusBar({ children, className = '' }: StatusBarProps) {
  return (
    <footer className={`bg-surface border-t border-muted/20 px-4 py-1.5 flex items-center gap-5 text-xs font-mono text-muted ${className}`}>
      {children}
    </footer>
  );
}

export interface StatusIndicatorProps {
  status?: 'active' | 'warning' | 'error' | 'idle';
  children?: ReactNode;
}

export function StatusIndicator({ status = 'active', children }: StatusIndicatorProps) {
  const colors = {
    active: 'bg-primary',
    warning: 'bg-amber-500',
    error: 'bg-red-500',
    idle: 'bg-muted',
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`w-1.5 h-1.5 rounded-full ${colors[status]}`} />
      {children}
    </div>
  );
}
