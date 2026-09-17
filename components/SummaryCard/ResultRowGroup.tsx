import { ResultRow, type ResultRowState } from './ResultRow';

export interface ResultRowGroupItem {
  label: string;
  state: ResultRowState;
}

export interface ResultRowGroupProps {
  rows: ResultRowGroupItem[];
  className?: string;
}

// Owns the 4px gap between rows and computes each row's position
// (Top/Middle/Bottom) from its index, so instances read as one
// continuous shape -- per the Figma description, don't set this spacing
// by hand on loose ResultRow instances.
export function ResultRowGroup({ rows, className }: ResultRowGroupProps) {
  return (
    <div
      className={className}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-space-100)', width: '100%' }}
    >
      {rows.map((row, i) => (
        <ResultRow
          key={i}
          label={row.label}
          state={row.state}
          position={i === 0 ? 'Top' : i === rows.length - 1 ? 'Bottom' : 'Middle'}
        />
      ))}
    </div>
  );
}
