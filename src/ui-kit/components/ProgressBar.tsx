import { ReactNode } from 'react';

export interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  label?: string;
  showValue?: boolean;
  className?: string;
}

export function ProgressBar({ 
  value, 
  max = 100, 
  color = 'var(--color-primary)', 
  label,
  showValue = true,
  className = '' 
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-medium text-text">{label}</span>}
          {showValue && <span className="text-xs font-mono" style={{ color }}>{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className="h-1 bg-muted/20 overflow-hidden">
        <div 
          className="h-full transition-all duration-1000 ease-out"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: color 
          }}
        />
      </div>
    </div>
  );
}
