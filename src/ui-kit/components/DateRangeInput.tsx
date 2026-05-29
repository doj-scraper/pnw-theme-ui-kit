import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface DateRangeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  startDate?: string;
  endDate?: string;
  onStartDateChange?: (date: string) => void;
  onEndDateChange?: (date: string) => void;
}

export const DateRangeInput = forwardRef<HTMLDivElement, DateRangeInputProps>(
  ({ startDate, endDate, onStartDateChange, onEndDateChange, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex gap-2', className)}>
        <input
          type="date"
          value={startDate || ''}
          onChange={(e) => onStartDateChange?.(e.target.value)}
          className="px-3 py-2 rounded-lg border border-muted/30 bg-surface text-text placeholder-muted/50 focus:outline-none focus:ring-2 focus:ring-primary"
          {...props}
        />
        <input
          type="date"
          value={endDate || ''}
          onChange={(e) => onEndDateChange?.(e.target.value)}
          className="px-3 py-2 rounded-lg border border-muted/30 bg-surface text-text placeholder-muted/50 focus:outline-none focus:ring-2 focus:ring-primary"
          {...props}
        />
      </div>
    );
  }
);

DateRangeInput.displayName = 'DateRangeInput';
