import { forwardRef, TextareaHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'px-3 py-2 rounded-lg border border-muted/30 bg-surface text-text placeholder-muted/50',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
        'resize-vertical min-h-24 font-body',
        'transition-colors',
        className
      )}
      {...props}
    />
  )
);

Textarea.displayName = 'Textarea';
