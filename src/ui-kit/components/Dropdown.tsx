import { ReactNode, useState } from 'react';

export interface DropdownItem {
  label: string;
  value: string;
  active?: boolean;
}

export interface DropdownProps {
  label?: string;
  value: string;
  items: DropdownItem[];
  onChange: (value: string) => void;
  className?: string;
}

export function Dropdown({ label, value, items, onChange, className = '' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-bg border border-muted/30 hover:border-primary transition-colors"
      >
        {label && <span className="text-xs text-muted uppercase tracking-wider font-mono">{label} //</span>}
        <span className="text-xs text-primary font-mono">{value}</span>
        <span className="text-xs text-muted">▼</span>
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-1 w-56 bg-surface border border-muted/20 shadow-xl z-20">
            {items.map((item) => (
              <div
                key={item.value}
                onClick={() => {
                  onChange(item.value);
                  setIsOpen(false);
                }}
                className={`px-3 py-2.5 text-xs font-mono cursor-pointer border-b border-muted/10 transition-all hover:bg-bg hover:border-l-2 hover:border-l-primary ${
                  item.active ? 'bg-primary/10 text-primary border-l-2 border-l-primary' : 'text-muted'
                }`}
              >
                {item.label}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
