import * as LabelPrimitive from '@radix-ui/react-label';
import { cn } from '../../lib/utils';
import { forwardRef, HTMLAttributes, ComponentPropsWithoutRef, ElementRef } from 'react';

export const Label = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className
    )}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export interface FormGroupProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const FormGroup = forwardRef<HTMLDivElement, FormGroupProps>(
  ({ className, label, helperText, error, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {label && <Label>{label}</Label>}
        {children}
        {helperText && !error && (
          <p className="text-xs text-muted">{helperText}</p>
        )}
        {error && (
          <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

FormGroup.displayName = 'FormGroup';
