import { ReactNode } from 'react';
import { Card as BPCard, CardProps as BPCardProps } from '@blueprintjs/core';

export interface CardProps extends Omit<BPCardProps, 'className'> {
  children?: ReactNode;
  className?: string;
}

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <BPCard 
      className={`bg-surface border border-muted/20 shadow-sm rounded-md ${className}`}
      {...props}
    >
      {children}
    </BPCard>
  );
}
