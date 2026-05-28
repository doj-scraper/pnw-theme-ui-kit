import { forwardRef } from 'react';
import { InputGroup as BPInputGroup, InputGroupProps as BPInputGroupProps } from '@blueprintjs/core';

export interface InputProps extends BPInputGroupProps {}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <BPInputGroup {...props} inputRef={ref} />;
});

Input.displayName = 'Input';
