import { Tree as BPTree, TreeProps as BPTreeProps } from '@blueprintjs/core';

export interface TreeProps extends Omit<BPTreeProps, 'className'> {
  className?: string;
}

export function Tree({ className = '', ...props }: TreeProps) {
  return (
    <div className="bp5-tree-custom">
      <style>{`
        .bp5-tree-custom .bp5-tree-node-content:hover { background-color: var(--color-bg); opacity: 0.8; }
        .bp5-tree-custom .bp5-tree-node-content.bp5-tree-node-selected { background-color: var(--color-primary); }
        .bp5-tree-custom .bp5-tree-node-selected .bp5-tree-node-label,
        .bp5-tree-custom .bp5-tree-node-selected .bp5-icon { color: var(--color-bg); }
        .bp5-tree-custom .bp5-tree-node-content { border-radius: 4px; padding: 2px 4px; font-family: var(--font-body); color: var(--color-text); }
        .bp5-tree-custom .bp5-icon { color: var(--color-muted); }
      `}</style>
      <BPTree className={`text-sm ${className}`} {...props} />
    </div>
  );
}
