import { forwardRef } from 'react';
import { HTMLSelect as BPHTMLSelect, HTMLSelectProps as BPHTMLSelectProps } from '@blueprintjs/core';

export interface SelectProps extends BPHTMLSelectProps {}

export const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  return <BPHTMLSelect {...props} elementRef={ref} />;
});

Select.displayName = 'Select';
