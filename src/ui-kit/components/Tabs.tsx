import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '../../lib/utils';
import { forwardRef } from 'react';

export const Tabs = TabsPrimitive.Root;

export const TabsList = forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex h-10 items-center justify-center rounded-md bg-surface p-1 text-muted',
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

export const TabsTrigger = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5',
      'text-sm font-medium ring-offset-bg transition-all',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
      'disabled:pointer-events-none disabled:opacity-50',
      'data-[state=active]:bg-bg data-[state=active]:text-text data-[state=active]:shadow-sm',
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export const TabsContent = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

// Legacy aliases for compatibility
export const Tab = TabsTrigger;
export type TabsProps = React.ComponentPropsWithoutRef<typeof Tabs>;
export type TabProps = React.ComponentPropsWithoutRef<typeof TabsTrigger>;
