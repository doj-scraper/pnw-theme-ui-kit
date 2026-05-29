import * as RadixSwitch from '@radix-ui/react-switch';
import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof RadixSwitch.Root> {
  label?: string;
}

export const Switch = forwardRef<React.ElementRef<typeof RadixSwitch.Root>, SwitchProps>(
  ({ className, label, ...props }, ref) => (
    <div className="flex items-center gap-2">
      <RadixSwitch.Root
        ref={ref}
        className={cn(
          'w-11 h-6 rounded-full border-2 border-muted bg-surface',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          'data-[state=checked]:bg-primary data-[state=checked]:border-primary',
          'transition-colors',
          className
        )}
        {...props}
      >
        <RadixSwitch.Thumb className="w-5 h-5 rounded-full bg-white shadow-md translate-x-0.5 data-[state=checked]:translate-x-5 transition-transform" />
      </RadixSwitch.Root>
      {label && <label className="text-sm cursor-pointer">{label}</label>}
    </div>
  )
);

Switch.displayName = 'Switch';
