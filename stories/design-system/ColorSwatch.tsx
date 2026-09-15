import { useEffect, useRef, useState } from 'react';

interface ColorSwatchProps {
  name: string;
  varName: string;
  description: string | null;
}

// Paints the swatch with the CSS variable, then reads back the browser's
// own resolved color for it -- so the value shown is exactly what the
// generated stylesheet produces, not a value re-derived by hand.
export function ColorSwatch({ name, varName, description }: ColorSwatchProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [resolved, setResolved] = useState('');

  useEffect(() => {
    if (ref.current) {
      setResolved(getComputedStyle(ref.current).backgroundColor);
    }
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '8px 4px',
      }}
    >
      <div
        ref={ref}
        style={{
          width: 48,
          height: 48,
          flexShrink: 0,
          borderRadius: 8,
          background: `var(${varName})`,
          border: '1px solid var(--color-border-default)',
        }}
      />
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: 'monospace', fontSize: 13, color: 'var(--color-text-primary)' }}>
          {name}
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--color-text-secondary)' }}>
          {varName} — {resolved || 'resolving…'}
        </div>
        <div
          style={{
            fontSize: 12,
            marginTop: 2,
            color: description ? 'var(--color-text-tertiary)' : 'var(--color-text-disabled)',
            fontStyle: description ? 'normal' : 'italic',
          }}
        >
          {description ?? 'No description in tokens.json'}
        </div>
      </div>
    </div>
  );
}
