import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { forwardRef } from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root> {
  label?: string;
}

export const Checkbox = forwardRef<React.ElementRef<typeof RadixCheckbox.Root>, CheckboxProps>(
  ({ className, label, ...props }, ref) => (
    <div className="flex items-center gap-2">
      <RadixCheckbox.Root
        ref={ref}
        className={cn(
          'w-5 h-5 rounded border-2 border-muted bg-surface flex items-center justify-center',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          'data-[state=checked]:bg-primary data-[state=checked]:border-primary',
          'transition-colors',
          className
        )}
        {...props}
      >
        <RadixCheckbox.Indicator className="text-white">
          <Check size={16} />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      {label && <label className="text-sm cursor-pointer">{label}</label>}
    </div>
  )
);

Checkbox.displayName = 'Checkbox';
