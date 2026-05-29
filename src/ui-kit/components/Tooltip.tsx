import * as RadixTooltip from '@radix-ui/react-tooltip';
import { forwardRef, ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  delayDuration?: number;
}

export const Tooltip = forwardRef<HTMLButtonElement, TooltipProps>(
  ({ content, children, side = 'top', delayDuration = 200 }, ref) => (
    <RadixTooltip.Provider>
      <RadixTooltip.Root delayDuration={delayDuration}>
        <RadixTooltip.Trigger ref={ref} asChild>
          {typeof children === 'string' ? <button>{children}</button> : children}
        </RadixTooltip.Trigger>
        <RadixTooltip.Content
          side={side}
          className={cn(
            'px-3 py-2 rounded-lg bg-primary text-white text-sm shadow-lg',
            'data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95'
          )}
        >
          {content}
          <RadixTooltip.Arrow className="fill-primary" />
        </RadixTooltip.Content>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
);

Tooltip.displayName = 'Tooltip';
