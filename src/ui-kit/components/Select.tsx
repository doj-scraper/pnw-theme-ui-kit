import { forwardRef, SelectHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options?: Array<{ label: string; value: string }>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          'flex h-9 w-full rounded border border-muted/30 bg-bg px-3 py-2 text-sm text-text',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      >
        {options ? options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        )) : children}
      </select>
    );
  }
);

Select.displayName = 'Select';
