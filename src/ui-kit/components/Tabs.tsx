import { ReactNode } from 'react';
import { Tabs as BPTabs, Tab as BPTab, TabsProps as BPTabsProps, TabProps as BPTabProps } from '@blueprintjs/core';

export interface TabsProps extends Omit<BPTabsProps, 'className'> {
  children?: ReactNode;
  className?: string;
}
export interface TabProps extends BPTabProps {}

export function Tabs({ className = '', ...props }: TabsProps) {
  return (
    <div className="bp5-tabs-custom">
      <style>{`
        .bp5-tabs-custom .bp5-tab-list { border-bottom: 1px solid color-mix(in srgb, var(--color-muted) 20%, transparent); margin-bottom: 16px; }
        .bp5-tabs-custom .bp5-tab { font-family: var(--font-header); font-weight: 500; font-size: 0.875rem; color: var(--color-muted); padding-bottom: 8px; margin-right: 24px; box-shadow: none !important; border: none; }
        .bp5-tabs-custom .bp5-tab[aria-selected="true"], .bp5-tabs-custom .bp5-tab:hover { color: var(--color-primary); }
        .bp5-tabs-custom .bp5-tab-indicator { background-color: var(--color-primary); height: 2px; }
      `}</style>
      <BPTabs className={className} {...props} />
    </div>
  );
}

export const Tab = BPTab;
