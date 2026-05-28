import { ReactNode } from 'react';
import { Dialog as BPDialog, DialogProps as BPDialogProps, DialogBody, DialogFooter } from '@blueprintjs/core';

export interface DialogProps extends Omit<BPDialogProps, 'className'> {
  children?: ReactNode;
  className?: string;
}

export function Dialog({ className = '', ...props }: DialogProps) {
  return (
    <BPDialog 
      className={`bg-surface text-text shadow-xl border border-muted/20 rounded-lg ${className}`}
      {...props}
    />
  );
}

export { DialogBody, DialogFooter };
