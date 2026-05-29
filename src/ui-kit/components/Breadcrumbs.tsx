import { forwardRef, ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs = forwardRef<HTMLNavElement, BreadcrumbsProps>(
  ({ items, className }, ref) => (
    <nav ref={ref} className={cn('flex items-center gap-1', className)} aria-label="Breadcrumb">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          {item.href ? (
            <a href={item.href} className="text-primary hover:underline text-sm">
              {item.label}
            </a>
          ) : (
            <button
              onClick={item.onClick}
              className={cn(
                'text-sm',
                item.onClick ? 'text-primary hover:underline cursor-pointer' : 'text-muted'
              )}
            >
              {item.label}
            </button>
          )}
          {index < items.length - 1 && <ChevronRight size={16} className="text-muted" />}
        </div>
      ))}
    </nav>
  )
);

Breadcrumbs.displayName = 'Breadcrumbs';
