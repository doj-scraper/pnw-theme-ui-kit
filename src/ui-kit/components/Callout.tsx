import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface CalloutProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  title?: string;
  icon?: React.ReactNode;
}

export const Callout = forwardRef<HTMLDivElement, CalloutProps>(
  ({ className, variant = 'default', title, icon, children, ...props }, ref) => {
    const variants = {
      default: 'bg-surface border-muted/20',
      primary: 'bg-primary/10 border-primary/30 text-primary',
      success: 'bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-400',
      warning: 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400',
      danger: 'bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-400',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-md border-l-4 p-4',
          variants[variant],
          className
        )}
        {...props}
      >
        <div className="flex gap-3">
          {icon && <div className="flex-shrink-0">{icon}</div>}
          <div className="flex-1">
            {title && <h5 className="mb-1 font-medium leading-none tracking-tight">{title}</h5>}
            <div className="text-sm [&_p]:leading-relaxed">{children}</div>
          </div>
        </div>
      </div>
    );
  }
);

Callout.displayName = 'Callout';
