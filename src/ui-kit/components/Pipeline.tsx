import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { NodeStatus, nodeStatusColor, type NodeStatusValue } from './NodeStatus';

export interface PipelineStage {
  id: string;
  label: string;
  status?: NodeStatusValue;
  /** Optional throughput / metric annotation. */
  meta?: string;
}

export interface PipelineProps {
  stages: PipelineStage[];
  orientation?: 'horizontal' | 'vertical';
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  className?: string;
}

/**
 * Pipeline — a staged flow of processing steps for data-driven / ETL /
 * agentic pipelines. Each stage carries a live status and optional metric.
 */
export function Pipeline({
  stages,
  orientation = 'horizontal',
  selectedId,
  onSelect,
  className,
}: PipelineProps) {
  const horizontal = orientation === 'horizontal';

  return (
    <div
      className={cn(
        'flex',
        horizontal ? 'flex-row items-stretch overflow-x-auto' : 'flex-col',
        className
      )}
    >
      {stages.map((stage, i) => {
        const accent = nodeStatusColor(stage.status ?? 'idle');
        const isSel = selectedId === stage.id;
        return (
          <div key={stage.id} className={cn('flex', horizontal ? 'items-center' : 'flex-col')}>
            <button
              type="button"
              onClick={() => onSelect?.(stage.id)}
              className={cn(
                'min-w-[150px] flex-1 rounded-md border bg-surface p-3 text-left transition-colors',
                isSel ? 'border-primary' : 'border-line hover:border-primary/60'
              )}
              style={(stage.status ?? 'idle') !== 'idle' ? { borderLeft: `3px solid ${accent}` } : undefined}
            >
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <span className="font-header text-[13px] font-semibold uppercase tracking-wide text-text">
                  {stage.label}
                </span>
                <NodeStatus status={stage.status ?? 'idle'} size="sm" showLabel={false} />
              </div>
              <div className="flex items-center justify-between font-mono text-[10px] text-muted">
                <span>STAGE {String(i + 1).padStart(2, '0')}</span>
                {stage.meta && <span style={{ color: accent }}>{stage.meta}</span>}
              </div>
            </button>
            {i < stages.length - 1 && (
              <div
                className={cn(
                  'flex items-center justify-center text-muted',
                  horizontal ? 'px-1' : 'py-1 rotate-90'
                )}
              >
                <ArrowRight size={16} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
