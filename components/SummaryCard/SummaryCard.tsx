import { ResultRowGroup, type ResultRowGroupItem } from './ResultRowGroup';

export interface SummaryCardProps {
  title?: string;
  rows: ResultRowGroupItem[];
  className?: string;
}

// For the "Buenas explicaciones" success summary specifically -- per the
// Figma description, don't reuse this for "Worth another look" (that's a
// flat list of StatusRow instances, no card wrapper).
export function SummaryCard({ title = 'Card title', rows, className }: SummaryCardProps) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--dimension-space-300)',
        paddingInline: 'var(--dimension-space-400)',
        paddingBottom: 'var(--dimension-space-400)',
        paddingTop: 17, // literal Figma value, no backing token -- same disclosed-exception pattern as Button's fixed heights
        background: 'var(--color-accent-green-bold)',
        borderRadius: 30, // literal Figma value, no backing token
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <p
        style={{
          margin: 0,
          width: '100%',
          textAlign: 'center',
          fontFamily: 'var(--font-family-typography-headline-s-font-family)',
          fontWeight: 'var(--font-weight-typography-headline-s-font-weight)',
          fontSize: 'var(--dimension-typography-headline-s-font-size)',
          lineHeight: 'var(--dimension-typography-headline-s-line-height)',
          color: 'var(--color-accent-green-on-bold)',
        }}
      >
        {title}
      </p>
      <ResultRowGroup rows={rows} />
    </div>
  );
}
