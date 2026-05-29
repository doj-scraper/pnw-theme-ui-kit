import * as RadixContextMenu from '@radix-ui/react-context-menu';
import { forwardRef, ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface ContextMenuItem {
  label: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  divider?: boolean;
}

export interface ContextMenuProps {
  items: ContextMenuItem[];
  children: ReactNode;
}

export const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ items, children }, ref) => (
    <RadixContextMenu.Root>
      <RadixContextMenu.Trigger ref={ref} asChild>
        {typeof children === 'string' ? <div>{children}</div> : children}
      </RadixContextMenu.Trigger>
      <RadixContextMenu.Content className="min-w-48 bg-surface border border-muted/30 rounded-lg shadow-lg p-1 z-50">
        {items.map((item, index) => (
          <div key={index}>
            {item.divider ? (
              <div className="h-px bg-muted/20 my-1" />
            ) : (
              <RadixContextMenu.Item
                onClick={item.onClick}
                disabled={item.disabled}
                className={cn(
                  'px-3 py-2 rounded text-sm cursor-pointer transition-colors',
                  item.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted/10'
                )}
              >
                {item.label}
              </RadixContextMenu.Item>
            )}
          </div>
        ))}
      </RadixContextMenu.Content>
    </RadixContextMenu.Root>
  )
);

ContextMenu.displayName = 'ContextMenu';
