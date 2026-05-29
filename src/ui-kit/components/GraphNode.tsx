import { cn } from '../../lib/utils';
import type { GraphNodeVariant } from './GraphCanvas';

export interface GraphNodeProps {
  label: string;
  variant?: GraphNodeVariant;
  /** Short glyph rendered inside the node (e.g. "S", "I", "O"). */
  glyph?: string;
  size?: number;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

const variantColor = (v: GraphNodeVariant = 'actor') => {
  switch (v) {
    case 'store':
      return 'var(--signal-amber)';
    case 'output':
      return 'var(--signal-cobalt)';
    case 'input':
      return 'var(--muted)';
    case 'core':
    case 'actor':
    default:
      return 'var(--color-primary)';
  }
};

const defaultGlyph: Record<GraphNodeVariant, string> = {
  actor: 'P',
  store: 'S',
  input: 'I',
  output: 'O',
  core: 'C',
};

/**
 * GraphNode — a single circular ontology node primitive for legends, palettes
 * or hand-placed diagrams. For laid-out graphs use `GraphCanvas`.
 */
export function GraphNode({
  label,
  variant = 'actor',
  glyph,
  size = 48,
  selected,
  onClick,
  className,
}: GraphNodeProps) {
  const color = variantColor(variant);
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn('inline-flex flex-col items-center gap-1.5 outline-none', className)}
    >
      <span
        className="flex items-center justify-center rounded-full border-2 font-mono transition-all"
        style={{
          width: size,
          height: size,
          borderColor: selected ? 'var(--text)' : color,
          borderWidth: selected ? 3 : 2,
          color,
          background: `color-mix(in srgb, ${color} ${variant === 'core' ? 14 : 7}%, transparent)`,
          fontSize: size * 0.28,
        }}
      >
        {glyph ?? defaultGlyph[variant]}
      </span>
      <span className="max-w-[88px] text-center text-[10px] leading-tight text-muted">{label}</span>
    </button>
  );
}
