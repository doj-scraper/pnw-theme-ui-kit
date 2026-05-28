import { ReactNode } from 'react';
import { Callout as BPCallout, CalloutProps as BPCalloutProps } from '@blueprintjs/core';

export interface CalloutProps extends Omit<BPCalloutProps, 'className'> {
  children?: ReactNode;
  className?: string;
}

export function Callout({ className = '', ...props }: CalloutProps) {
  return (
    <BPCallout 
      className={`bg-surface text-text rounded-sm shadow-sm ring-1 ring-muted/10 ${className}`}
      {...props}
    />
  );
}
