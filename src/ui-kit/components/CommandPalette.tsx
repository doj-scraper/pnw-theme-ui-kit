import { useState, useEffect, ReactNode } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface CommandItem {
  id: string;
  label: ReactNode;
  category?: string;
  onSelect?: () => void;
  shortcut?: string;
}

export interface CommandPaletteProps {
  items: CommandItem[];
  onOpen?: () => void;
  onClose?: () => void;
}

export function CommandPalette({ items, onOpen, onClose }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(!open);
        if (!open) onOpen?.();
        else onClose?.();
      }
      if (e.key === 'Escape') {
        setOpen(false);
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpen, onClose]);

  const filtered = items.filter((item) =>
    item.label?.toString().toLowerCase().includes(search.toLowerCase())
  );

  const grouped = filtered.reduce(
    (acc, item) => {
      const cat = item.category || 'General';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    },
    {} as Record<string, CommandItem[]>
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/50">
      <div className="w-full max-w-2xl bg-surface border border-muted/30 rounded-lg shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-muted/20">
          <Search size={18} className="text-muted" />
          <input
            autoFocus
            type="text"
            placeholder="Search commands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
          />
          <button onClick={() => setOpen(false)} className="p-1 hover:bg-muted/10 rounded">
            <X size={16} />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {Object.entries(grouped).map(([category, categoryItems]) => (
            <div key={category}>
              <div className="px-4 py-2 text-xs font-semibold text-muted uppercase">
                {category}
              </div>
              {categoryItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    item.onSelect?.();
                    setOpen(false);
                    onClose?.();
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-muted/10 transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  {item.shortcut && <span className="text-xs text-muted">{item.shortcut}</span>}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

CommandPalette.displayName = 'CommandPalette';
