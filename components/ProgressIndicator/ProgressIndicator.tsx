import type { CSSProperties } from 'react';

export type ProgressIndicatorVariant = 'Primary' | 'Coral';
export type ProgressIndicatorThickness = '16' | '24';
export type ProgressIndicatorStep = '0' | '25' | '50' | '75' | '100';

export interface ProgressIndicatorProps {
  variant?: ProgressIndicatorVariant;
  thickness?: ProgressIndicatorThickness;
  /**
   * Snaps to 25% steps by design -- per the Figma description, this is
   * not for precise or continuously moving values (a real 63% would
   * misrepresent). Round to the nearest step before passing it in.
   */
  progress?: ProgressIndicatorStep;
  showText?: boolean;
  /** Count text such as "3/12". Only rendered when showText and thickness are both set. Figma's own values are a placeholder, not real data -- pass your own. */
  label?: string;
  className?: string;
}

const FILL_VAR: Record<ProgressIndicatorVariant, string> = {
  Primary: 'var(--color-accent-brand-bold)',
  Coral: 'var(--color-accent-coral-bold)',
};

export function ProgressIndicator({
  variant = 'Primary',
  thickness = '24',
  progress = '0',
  showText = false,
  label,
  className,
}: ProgressIndicatorProps) {
  const trackHeight = thickness === '16' ? 16 : 24; // literal Figma value, no backing token -- see Button's disclosed heights for the same pattern
  // At thickness 24 the fill sits inset by space-050 (2px) on every side;
  // at 16 it fills the track edge-to-edge.
  const inset = thickness === '24' ? 'var(--dimension-space-050)' : '0px';

  const trackStyle: CSSProperties = {
    position: 'relative',
    width: '100%', // Figma's own frame is a fixed 350px, but that's this demo instance's width, not a token -- a progress bar should fill its container
    height: trackHeight,
    background: 'var(--color-background-stacking)',
    // Figma binds this corner to the space-300 (12px) variable, not a
    // radius token -- reused across groups in the source file, not a
    // mistake on this end.
    borderRadius: 'var(--dimension-space-300)',
    boxSizing: 'border-box',
  };

  const fillStyle: CSSProperties = {
    position: 'absolute',
    top: inset,
    bottom: inset,
    left: inset,
    width: `calc(${Number(progress)}% - ${inset} * 2)`,
    minWidth: trackHeight - (thickness === '24' ? 4 : 0),
    background: FILL_VAR[variant],
    borderRadius: 'var(--dimension-radius-full)',
  };

  const showLabel = showText && thickness === '24' && label;

  return (
    <div className={className} style={trackStyle}>
      <div style={fillStyle} />
      {showLabel && (
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: 'var(--font-family-typography-caption-s-bold-font-family)',
            fontWeight: 'var(--font-weight-typography-caption-s-bold-font-weight)',
            fontSize: 'var(--dimension-typography-caption-s-bold-font-size)',
            lineHeight: 'var(--dimension-typography-caption-s-bold-line-height)',
            letterSpacing: '1%',
            color: 'var(--color-interactive-on-secondary)',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
