import { ReactNode } from 'react';
import { FormGroup as BPFormGroup, FormGroupProps as BPFormGroupProps } from '@blueprintjs/core';

export interface FormGroupProps extends BPFormGroupProps {
  children?: ReactNode;
}

export function FormGroup(props: FormGroupProps) {
  return <BPFormGroup {...props} />;
}
