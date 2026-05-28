import { useState, HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface TreeNode {
  id: string | number;
  label: string;
  icon?: string;
  isExpanded?: boolean;
  isSelected?: boolean;
  hasCaret?: boolean;
  childNodes?: TreeNode[];
}

export interface TreeProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  contents: TreeNode[];
  onNodeClick?: (node: TreeNode, path: number[]) => void;
  onNodeCollapse?: (node: TreeNode, path: number[]) => void;
  onNodeExpand?: (node: TreeNode, path: number[]) => void;
}

export function Tree({ 
  contents, 
  onNodeClick, 
  onNodeCollapse, 
  onNodeExpand,
  className,
  ...props 
}: TreeProps) {
  const renderNode = (node: TreeNode, path: number[]) => {
    const hasChildren = node.childNodes && node.childNodes.length > 0;
    const showCaret = node.hasCaret !== false && hasChildren;

    return (
      <div key={node.id} className="select-none">
        <div
          className={cn(
            'flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-colors',
            'hover:bg-muted/10',
            node.isSelected && 'bg-primary text-white hover:bg-primary/90',
            !node.isSelected && 'text-text'
          )}
          onClick={() => {
            if (showCaret && node.isExpanded) {
              onNodeCollapse?.(node, path);
            } else if (showCaret && !node.isExpanded) {
              onNodeExpand?.(node, path);
            }
            onNodeClick?.(node, path);
          }}
        >
          {showCaret && (
            <span className="text-xs">
              {node.isExpanded ? '▼' : '▶'}
            </span>
          )}
          {!showCaret && <span className="w-3" />}
          {node.icon && <span className="text-sm">{node.icon}</span>}
          <span className="text-sm">{node.label}</span>
        </div>
        {node.isExpanded && hasChildren && (
          <div className="ml-4 mt-1">
            {node.childNodes!.map((child, idx) => 
              renderNode(child, [...path, idx])
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn('text-sm', className)} {...props}>
      {contents.map((node, idx) => renderNode(node, [idx]))}
    </div>
  );
}
