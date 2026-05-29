import { useMemo, useState } from 'react';
import { Plus, Minus, Maximize, Play, Pause } from 'lucide-react';

export type GraphNodeVariant = 'actor' | 'store' | 'input' | 'output' | 'core';

export interface GraphNodeInput {
  id: string;
  label: string;
  variant?: GraphNodeVariant;
}

export interface GraphCanvasProps {
  nodes: GraphNodeInput[];
  edges: [string, string][];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  /** Animate particles travelling along the edges. */
  animate?: boolean;
  /** Layout direction. */
  direction?: 'RIGHT' | 'DOWN';
  className?: string;
}

interface Placed extends GraphNodeInput {
  x: number;
  y: number;
}

const NODE = 52;
const GAP_LAYER = 120;
const GAP_NODE = 40;
const PAD = 56;

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

/** Longest-path layered assignment — a dependency-free DAG layout. */
function layout(nodes: GraphNodeInput[], edges: [string, string][], direction: 'RIGHT' | 'DOWN') {
  const ids = nodes.map((n) => n.id);
  const adj = new Map<string, string[]>();
  const indeg = new Map<string, number>();
  ids.forEach((id) => {
    adj.set(id, []);
    indeg.set(id, 0);
  });
  edges.forEach(([s, t]) => {
    if (adj.has(s) && indeg.has(t)) {
      adj.get(s)!.push(t);
      indeg.set(t, (indeg.get(t) ?? 0) + 1);
    }
  });

  // Layer assignment via Kahn-style longest path (cycles tolerated via visited cap).
  const layer = new Map<string, number>();
  ids.forEach((id) => layer.set(id, 0));
  const queue = ids.filter((id) => (indeg.get(id) ?? 0) === 0);
  const seen = new Map<string, number>();
  while (queue.length) {
    const id = queue.shift()!;
    seen.set(id, (seen.get(id) ?? 0) + 1);
    if ((seen.get(id) ?? 0) > ids.length) continue;
    for (const next of adj.get(id) ?? []) {
      if ((layer.get(next) ?? 0) < (layer.get(id) ?? 0) + 1) {
        layer.set(next, (layer.get(id) ?? 0) + 1);
        queue.push(next);
      }
    }
  }

  const byLayer = new Map<number, string[]>();
  ids.forEach((id) => {
    const l = layer.get(id) ?? 0;
    if (!byLayer.has(l)) byLayer.set(l, []);
    byLayer.get(l)!.push(id);
  });

  const placed = new Map<string, Placed>();
  const sortedLayers = [...byLayer.keys()].sort((a, b) => a - b);
  let maxCross = 0;
  byLayer.forEach((arr) => (maxCross = Math.max(maxCross, arr.length)));

  sortedLayers.forEach((l) => {
    const arr = byLayer.get(l)!;
    arr.forEach((id, i) => {
      const node = nodes.find((n) => n.id === id)!;
      const crossSpan = (maxCross - 1) * (NODE + GAP_NODE);
      const myStart = ((maxCross - arr.length) / 2) * (NODE + GAP_NODE);
      const along = l * (NODE + GAP_LAYER);
      const cross = myStart + i * (NODE + GAP_NODE);
      void crossSpan;
      placed.set(id, {
        ...node,
        x: PAD + (direction === 'RIGHT' ? along : cross),
        y: PAD + (direction === 'RIGHT' ? cross : along),
      });
    });
  });

  let w = 0;
  let h = 0;
  placed.forEach((p) => {
    w = Math.max(w, p.x + NODE);
    h = Math.max(h, p.y + NODE);
  });

  return { placed, width: w + PAD, height: h + PAD };
}

/**
 * GraphCanvas — renders a directed dependency graph (ontology / pipeline /
 * agent topology). Self-contained layered layout, animated data-flow
 * particles, node selection and zoom controls.
 */
export function GraphCanvas({
  nodes,
  edges,
  selectedId,
  onSelect,
  animate = true,
  direction = 'RIGHT',
  className = '',
}: GraphCanvasProps) {
  const [scale, setScale] = useState(1);
  const [playing, setPlaying] = useState(animate);

  const { placed, width, height } = useMemo(
    () => layout(nodes, edges, direction),
    [nodes, edges, direction]
  );

  const paths = useMemo(
    () =>
      edges
        .map(([s, t], i) => {
          const a = placed.get(s);
          const b = placed.get(t);
          if (!a || !b) return null;
          const sx = a.x + NODE / 2;
          const sy = a.y + NODE / 2;
          const ex = b.x + NODE / 2;
          const ey = b.y + NODE / 2;
          const mx = (sx + ex) / 2;
          const d =
            direction === 'RIGHT'
              ? `M ${sx} ${sy} C ${mx} ${sy}, ${mx} ${ey}, ${ex} ${ey}`
              : `M ${sx} ${sy} C ${sx} ${(sy + ey) / 2}, ${ex} ${(sy + ey) / 2}, ${ex} ${ey}`;
          return { id: `e${i}`, d };
        })
        .filter((p): p is { id: string; d: string } => p !== null),
    [edges, placed, direction]
  );

  return (
    <div
      className={`relative flex flex-1 items-center justify-center overflow-hidden ${className}`}
      style={{
        backgroundImage: 'radial-gradient(color-mix(in srgb, var(--muted) 28%, transparent) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block"
        style={{
          width: '90%',
          height: '86%',
          maxWidth: 1100,
          transform: `scale(${scale})`,
          transition: 'transform 0.2s',
        }}
      >
        <g>
          {paths.map((p) => (
            <g key={p.id}>
              <path
                id={p.id}
                d={p.d}
                fill="none"
                stroke="color-mix(in srgb, var(--muted) 45%, transparent)"
                strokeWidth={1.5}
              />
              {playing && (
                <circle r={2.5} fill="var(--color-primary)">
                  <animateMotion dur={`${1.8 + Math.random() * 1.4}s`} repeatCount="indefinite">
                    <mpath href={`#${p.id}`} />
                  </animateMotion>
                </circle>
              )}
            </g>
          ))}
        </g>
        <g>
          {[...placed.values()].map((n) => {
            const color = variantColor(n.variant);
            const cx = n.x + NODE / 2;
            const cy = n.y + NODE / 2;
            const r = NODE / 2;
            const isSel = selectedId === n.id;
            const lines = n.label.split(' ');
            return (
              <g
                key={n.id}
                style={{ cursor: 'pointer' }}
                onClick={() => onSelect?.(n.id)}
              >
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill={`color-mix(in srgb, ${color} ${n.variant === 'core' ? 14 : 7}%, transparent)`}
                  stroke={isSel ? 'var(--text)' : color}
                  strokeWidth={isSel ? 3 : 2}
                  style={{ transition: 'stroke 0.15s, stroke-width 0.15s' }}
                />
                <text
                  x={cx}
                  y={cy + r + 13}
                  fill={isSel ? 'var(--text)' : 'var(--muted)'}
                  fontFamily="var(--font-body-stack)"
                  fontSize={10}
                  textAnchor="middle"
                >
                  {lines.map((line, idx) => (
                    <tspan key={idx} x={cx} dy={idx === 0 ? 0 : 12}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Zoom / playback toolbar */}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-1 border border-line bg-surface/90 p-1.5 backdrop-blur">
        <ToolBtn label="Zoom in" onClick={() => setScale((s) => Math.min(s + 0.15, 2.5))}>
          <Plus size={14} />
        </ToolBtn>
        <ToolBtn label="Zoom out" onClick={() => setScale((s) => Math.max(s - 0.15, 0.4))}>
          <Minus size={14} />
        </ToolBtn>
        <span className="mx-0.5 my-1 w-px bg-line" />
        <ToolBtn label="Reset view" onClick={() => setScale(1)}>
          <Maximize size={14} />
        </ToolBtn>
        <span className="mx-0.5 my-1 w-px bg-line" />
        <ToolBtn label="Toggle flow" onClick={() => setPlaying((p) => !p)}>
          {playing ? <Pause size={14} /> : <Play size={14} />}
        </ToolBtn>
      </div>
    </div>
  );
}

function ToolBtn({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex h-7 w-7 items-center justify-center border border-transparent text-muted transition-colors hover:border-primary hover:text-primary"
    >
      {children}
    </button>
  );
}
