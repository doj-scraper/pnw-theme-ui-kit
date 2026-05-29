import { forwardRef, ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
  className?: string;
}

const variantClasses = {
  default: 'bg-muted/20 text-text',
  primary: 'bg-primary/20 text-primary',
  success: 'bg-green-500/20 text-green-700 dark:text-green-400',
  warning: 'bg-amber-500/20 text-amber-700 dark:text-amber-400',
  danger: 'bg-red-500/20 text-red-700 dark:text-red-400',
};

const sizeClasses = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = 'default', size = 'md', className }, ref) => (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  )
);

Badge.displayName = 'Badge';
