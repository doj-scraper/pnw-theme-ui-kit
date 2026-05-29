import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circle' | 'rect';
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = 'rect', className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'bg-muted/20 animate-pulse',
        variant === 'circle' && 'rounded-full',
        variant === 'rect' && 'rounded-lg',
        variant === 'text' && 'rounded h-4',
        className
      )}
      {...props}
    />
  )
);

Skeleton.displayName = 'Skeleton';
