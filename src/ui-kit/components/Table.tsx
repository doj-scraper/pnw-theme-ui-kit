import { ReactNode } from 'react';
import { Table2 as BPTable, Column, Cell, Table2Props } from '@blueprintjs/table';

export interface TableProps extends Table2Props {
  children?: ReactNode;
}

export function Table(props: TableProps) {
  return (
    <div className="custom-table-wrapper">
      <style>{`
        .custom-table-wrapper .bp5-table-container { background-color: transparent; border-top: none; border-bottom: none; }
        .custom-table-wrapper .bp5-table-header { background-color: var(--color-surface); color: var(--color-text); font-family: var(--font-header); font-weight: 600; text-transform: uppercase; font-size: 0.75rem; border-color: color-mix(in srgb, var(--color-muted) 20%, transparent); box-shadow: none; }
        .custom-table-wrapper .bp5-table-cell { background-color: var(--color-bg); border-color: color-mix(in srgb, var(--color-muted) 10%, transparent); color: var(--color-text); transition: background-color 0.2s; box-shadow: none; }
        .custom-table-wrapper .bp5-table-cell:hover { background-color: color-mix(in srgb, var(--color-muted) 5%, transparent); }
        .custom-table-wrapper .bp5-table-row-name { background-color: var(--color-surface); border-color: color-mix(in srgb, var(--color-muted) 20%, transparent); color: var(--color-muted); }
      `}</style>
      <BPTable {...props} />
    </div>
  );
}

export { Column, Cell };
