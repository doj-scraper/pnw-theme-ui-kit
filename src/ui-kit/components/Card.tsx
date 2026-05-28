import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-md border border-muted/20 bg-surface p-6 shadow-sm',
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';
