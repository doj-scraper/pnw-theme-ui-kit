import * as RadixPopover from '@radix-ui/react-popover';
import { forwardRef, ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface PopoverProps {
  trigger: ReactNode;
  content: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export const Popover = forwardRef<HTMLButtonElement, PopoverProps>(
  ({ trigger, content, side = 'bottom' }, ref) => (
    <RadixPopover.Root>
      <RadixPopover.Trigger ref={ref} asChild>
        {typeof trigger === 'string' ? <button>{trigger}</button> : trigger}
      </RadixPopover.Trigger>
      <RadixPopover.Content
        side={side}
        className={cn(
          'p-4 rounded-lg bg-surface border border-muted/30 shadow-lg',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95'
        )}
      >
        {content}
        <RadixPopover.Close className="absolute top-2 right-2 p-1 hover:bg-muted/10 rounded transition-colors">
          <X size={16} />
        </RadixPopover.Close>
      </RadixPopover.Content>
    </RadixPopover.Root>
  )
);

Popover.displayName = 'Popover';
