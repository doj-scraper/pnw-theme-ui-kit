import * as RadixRadio from '@radix-ui/react-radio-group';
import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface RadioProps extends React.ComponentPropsWithoutRef<typeof RadixRadio.Item> {
  label?: string;
}

export const Radio = forwardRef<React.ElementRef<typeof RadixRadio.Item>, RadioProps>(
  ({ className, label, ...props }, ref) => (
    <div className="flex items-center gap-2">
      <RadixRadio.Item
        ref={ref}
        className={cn(
          'w-5 h-5 rounded-full border-2 border-muted bg-surface flex items-center justify-center',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          'data-[state=checked]:border-primary',
          'transition-colors',
          className
        )}
        {...props}
      >
        <RadixRadio.Indicator className="w-2 h-2 rounded-full bg-primary" />
      </RadixRadio.Item>
      {label && <label className="text-sm cursor-pointer">{label}</label>}
    </div>
  )
);

Radio.displayName = 'Radio';

export interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof RadixRadio.Root> {}

export const RadioGroup = forwardRef<React.ElementRef<typeof RadixRadio.Root>, RadioGroupProps>(
  ({ className, ...props }, ref) => (
    <RadixRadio.Root ref={ref} className={cn('flex flex-col gap-3', className)} {...props} />
  )
);

RadioGroup.displayName = 'RadioGroup';
