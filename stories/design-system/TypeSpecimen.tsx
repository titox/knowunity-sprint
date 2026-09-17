import { useEffect, useRef, useState } from 'react';

interface TypeSpecimenProps {
  name: string;
  vars: {
    fontFamily: string;
    fontWeight: string;
    fontSize: string;
    lineHeight: string;
  };
  description: string | null;
}

// Renders the sample text with the real CSS variables, then reads back the
// browser's own resolved font size / line height / weight -- again, the
// generated stylesheet is the source of truth, not a re-derived value.
export function TypeSpecimen({ name, vars, description }: TypeSpecimenProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [resolved, setResolved] = useState<{ fontSize: string; lineHeight: string; fontWeight: string } | null>(
    null,
  );

  useEffect(() => {
    if (ref.current) {
      const cs = getComputedStyle(ref.current);
      setResolved({ fontSize: cs.fontSize, lineHeight: cs.lineHeight, fontWeight: cs.fontWeight });
    }
  }, []);

  return (
    <div style={{ padding: '16px 4px', borderBottom: '1px solid var(--color-border-default)' }}>
      <div
        ref={ref}
        style={{
          fontFamily: `var(${vars.fontFamily})`,
          fontWeight: `var(${vars.fontWeight})`,
          fontSize: `var(${vars.fontSize})`,
          lineHeight: `var(${vars.lineHeight})`,
          color: 'var(--color-text-primary)',
        }}
      >
        {name} — Sample text
      </div>
      <div style={{ fontFamily: 'monospace', fontSize: 12, marginTop: 8, color: 'var(--color-text-secondary)' }}>
        {name} — {resolved ? `${resolved.fontSize} / ${resolved.lineHeight}, weight ${resolved.fontWeight}` : 'resolving…'}
      </div>
      <div
        style={{
          fontSize: 12,
          marginTop: 2,
          color: 'var(--color-text-tertiary)', // text.disabled failed color-contrast (3.77:1, needs 4.5:1) -- fixed by axe audit, not the right token for this caption anyway (it's a documentation note, not a disabled control)
          fontStyle: description ? 'normal' : 'italic',
        }}
      >
        {description ?? 'No description in tokens.json'}
      </div>
    </div>
  );
}
