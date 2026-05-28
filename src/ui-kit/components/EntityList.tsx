import { ReactNode } from 'react';

export interface EntityListProps {
  children?: ReactNode;
  className?: string;
}

export function EntityList({ children, className = '' }: EntityListProps) {
  return <div className={`space-y-4 ${className}`}>{children}</div>;
}

export interface EntitySectionProps {
  title: string;
  children?: ReactNode;
}

export function EntitySection({ title, children }: EntitySectionProps) {
  return (
    <div className="mb-4">
      <div className="text-xs font-mono text-muted uppercase tracking-widest py-1 mb-1 border-b border-muted/10">
        {title}
      </div>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

export interface EntityItemProps {
  name: string;
  type?: string;
  variant?: 'actor' | 'store' | 'input' | 'output' | 'core';
  active?: boolean;
  onClick?: () => void;
}

export function EntityItem({ name, type, variant = 'actor', active, onClick }: EntityItemProps) {
  const colors = {
    actor: 'border-primary text-primary',
    store: 'border-amber-500 text-amber-500',
    input: 'border-muted text-muted',
    output: 'border-blue-400 text-blue-400',
    core: 'border-primary text-primary bg-primary/10',
  };

  const icons = {
    actor: 'P',
    store: 'S',
    input: 'I',
    output: 'O',
    core: 'C',
  };

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2.5 px-1.5 py-1.5 cursor-pointer border-l-2 transition-all ${
        active ? 'bg-bg border-l-primary' : 'border-l-transparent hover:bg-bg hover:border-l-primary'
      }`}
    >
      <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center text-[7px] font-mono flex-shrink-0 ${colors[variant]}`}>
        {icons[variant]}
      </div>
      <span className="text-xs text-text flex-1">{name}</span>
      {type && <span className="text-[10px] font-mono text-muted">{type}</span>}
    </div>
  );
}
