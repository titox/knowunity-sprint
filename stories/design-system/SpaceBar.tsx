import { useEffect, useRef, useState } from 'react';

interface SpaceBarProps {
  name: string;
  varName: string;
  description: string | null;
}

// Draws a bar at the token's real width -- a negative step renders as a
// coral bar pointing the other way, since it's for pulling elements
// together (overlap), not padding. The resolved width is read back from
// the browser via getComputedStyle, same as the color and type stories.
export function SpaceBar({ name, varName, description }: SpaceBarProps) {
  // CSS width can't go negative, so the bar's width uses the variable's
  // absolute magnitude (flipped with calc() for negative steps -- still
  // driven by the real token, just kept paintable). A separate, invisible
  // element applies the variable to a signed property (margin-left) so the
  // resolved text can show the true signed value, negative steps included.
  const signRef = useRef<HTMLDivElement>(null);
  const [resolved, setResolved] = useState('');
  const isNegative = name.includes('negative');

  useEffect(() => {
    if (signRef.current) {
      setResolved(getComputedStyle(signRef.current).marginLeft);
    }
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '8px 4px' }}>
      <div style={{ width: 180, height: 24, flexShrink: 0, display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            height: 24,
            width: isNegative ? `calc(var(${varName}) * -1)` : `var(${varName})`,
            minWidth: 1,
            background: isNegative ? 'var(--color-accent-coral-bold)' : 'var(--color-accent-brand-bold)',
            borderRadius: 2,
          }}
        />
        <div ref={signRef} style={{ marginLeft: `var(${varName})`, width: 0, height: 0, overflow: 'hidden' }} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: 'monospace', fontSize: 13, color: 'var(--color-text-primary)' }}>{name}</div>
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
