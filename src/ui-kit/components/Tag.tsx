import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  minimal?: boolean;
  round?: boolean;
  icon?: ReactNode;
  onRemove?: () => void;
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant = 'default', minimal, round, icon, onRemove, children, ...props }, ref) => {
    const variants = {
      default: minimal ? 'bg-muted/10 text-muted' : 'bg-muted text-white',
      primary: minimal ? 'bg-primary/10 text-primary' : 'bg-primary text-white',
      success: minimal ? 'bg-green-500/10 text-green-600' : 'bg-green-600 text-white',
      warning: minimal ? 'bg-amber-500/10 text-amber-600' : 'bg-amber-500 text-white',
      danger: minimal ? 'bg-red-500/10 text-red-600' : 'bg-red-600 text-white',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium',
          round ? 'rounded-full' : 'rounded',
          variants[variant],
          className
        )}
        {...props}
      >
        {icon}
        {children}
        {onRemove && (
          <button
            onClick={onRemove}
            className="ml-1 hover:opacity-70 transition-opacity"
          >
            ×
          </button>
        )}
      </span>
    );
  }
);

Tag.displayName = 'Tag';
