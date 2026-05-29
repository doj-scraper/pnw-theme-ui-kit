import * as RadixAccordion from '@radix-ui/react-accordion';
import { forwardRef, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface AccordionItemProps {
  value: string;
  trigger: ReactNode;
  content: ReactNode;
}

export interface AccordionProps extends React.ComponentPropsWithoutRef<typeof RadixAccordion.Root> {
  items: AccordionItemProps[];
}

export const Accordion = forwardRef<React.ElementRef<typeof RadixAccordion.Root>, AccordionProps>(
  ({ items, className, ...props }, ref) => (
    <RadixAccordion.Root ref={ref} className={cn('space-y-2', className)} {...props}>
      {items.map((item) => (
        <RadixAccordion.Item key={item.value} value={item.value} className="border border-muted/30 rounded-lg overflow-hidden">
          <RadixAccordion.Trigger className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/5 transition-colors group">
            <span className="font-medium text-sm">{item.trigger}</span>
            <ChevronDown size={16} className="group-data-[state=open]:rotate-180 transition-transform" />
          </RadixAccordion.Trigger>
          <RadixAccordion.Content className="px-4 py-3 bg-surface/50 text-sm">
            {item.content}
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  )
);

Accordion.displayName = 'Accordion';
