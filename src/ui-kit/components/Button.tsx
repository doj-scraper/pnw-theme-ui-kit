import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Button as BPButton, ButtonProps as BPButtonProps } from '@blueprintjs/core';

export interface ButtonProps extends BPButtonProps {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return <BPButton {...props} elementRef={ref} />;
});

Button.displayName = 'Button';
