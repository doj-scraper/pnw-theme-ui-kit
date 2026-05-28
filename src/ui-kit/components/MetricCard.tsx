import { ReactNode } from 'react';

export interface MetricCardProps {
  title: string;
  value?: number;
  description?: string;
  color?: string;
  showProgress?: boolean;
  children?: ReactNode;
  className?: string;
}

export function MetricCard({ 
  title, 
  value, 
  description, 
  color = 'var(--color-primary)',
  showProgress = true,
  children,
  className = '' 
}: MetricCardProps) {
  return (
    <div className={`bg-surface border border-muted/20 p-5 hover:border-primary/50 transition-colors ${className}`}>
      <div className="flex justify-between items-center mb-2.5">
        <h3 className="text-sm font-semibold uppercase tracking-wide font-header text-text">{title}</h3>
        {value !== undefined && (
          <span className="text-xs font-mono" style={{ color }}>{value}%</span>
        )}
      </div>
      
      {showProgress && value !== undefined && (
        <div className="h-0.5 bg-muted/20 mb-2.5 overflow-hidden">
          <div 
            className="h-full transition-all duration-1000"
            style={{ width: `${value}%`, backgroundColor: color }}
          />
        </div>
      )}
      
      {description && (
        <p className="text-xs text-muted leading-relaxed">{description}</p>
      )}
      
      {children}
    </div>
  );
}

export interface CardGridProps {
  columns?: 2 | 3 | 4;
  children?: ReactNode;
  className?: string;
}

export function CardGrid({ columns = 3, children, className = '' }: CardGridProps) {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-3 w-full max-w-5xl ${className}`}>
      {children}
    </div>
  );
}
