import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  text?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', icon, text, children, disabled, ...props }, ref) => {
    const variants = {
      default: 'bg-surface border border-muted/30 text-text hover:bg-bg',
      primary: 'bg-primary text-white hover:opacity-90',
      success: 'bg-green-600 text-white hover:bg-green-700',
      warning: 'bg-amber-500 text-white hover:bg-amber-600',
      danger: 'bg-red-600 text-white hover:bg-red-700',
      outline: 'border border-primary text-primary hover:bg-primary/10',
      ghost: 'text-text hover:bg-muted/10',
    };

    const sizes = {
      sm: 'h-7 px-2.5 text-xs',
      md: 'h-9 px-4 text-sm',
      lg: 'h-11 px-6 text-base',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          'disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled}
        {...props}
      >
        {icon}
        {text || children}
      </button>
    );
  }
);

Button.displayName = 'Button';
