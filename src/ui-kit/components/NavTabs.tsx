import { ReactNode } from 'react';

export interface NavTabsProps {
  children?: ReactNode;
  className?: string;
}

export function NavTabs({ children, className = '' }: NavTabsProps) {
  return (
    <div className={`flex h-full ${className}`}>
      {children}
    </div>
  );
}

export interface NavTabProps {
  active?: boolean;
  onClick?: () => void;
  children?: ReactNode;
  icon?: ReactNode;
}

export function NavTab({ active, onClick, children, icon }: NavTabProps) {
  return (
    <button
      onClick={onClick}
      className={`h-full px-5 flex items-center gap-2 text-xs font-mono uppercase tracking-wider border-l border-muted/10 transition-all ${
        active
          ? 'text-primary border-b-2 border-b-primary bg-gradient-to-b from-transparent to-primary/5'
          : 'text-muted hover:text-text hover:bg-primary/5'
      }`}
    >
      {icon && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {children}
    </button>
  );
}
