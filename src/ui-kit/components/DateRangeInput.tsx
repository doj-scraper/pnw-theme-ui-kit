import { DateRangeInput as BPDateRangeInput, DateRangeInputProps as BPDateRangeInputProps } from '@blueprintjs/datetime';

export interface DateRangeInputProps extends Omit<BPDateRangeInputProps, 'className'> {
  className?: string;
}

export function DateRangeInput({ className = '', ...props }: DateRangeInputProps) {
  return (
    <div className="bp5-custom-date">
      <style>{`
        .bp5-custom-date .bp5-input { font-family: var(--font-body); background-color: var(--color-bg); border-color: color-mix(in srgb, var(--color-muted) 30%, transparent); color: var(--color-text); box-shadow: none; border-radius: 4px; height: 32px; }
        .bp5-custom-date .bp5-input:focus { border-color: var(--color-primary); box-shadow: 0 0 0 1px var(--color-primary); }
      `}</style>
      <BPDateRangeInput className={className} {...props} />
    </div>
  );
}
