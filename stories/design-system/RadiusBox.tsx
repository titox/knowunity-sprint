import { useEffect, useRef, useState } from 'react';

interface RadiusBoxProps {
  name: string;
  varName: string;
  description: string | null;
}

// A fixed-size box with the token's radius applied. "Full" resolves to
// 9999px, which browsers (like Figma) clamp to a pill or circle at any
// box size -- that's real behavior, not something faked for the story.
export function RadiusBox({ name, varName, description }: RadiusBoxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [resolved, setResolved] = useState('');

  useEffect(() => {
    if (ref.current) {
      setResolved(getComputedStyle(ref.current).borderRadius);
    }
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '8px 4px' }}>
      <div
        ref={ref}
        style={{
          width: 44,
          height: 44,
          flexShrink: 0,
          background: 'var(--color-accent-brand-bold)',
          borderRadius: `var(${varName})`,
        }}
      />
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
