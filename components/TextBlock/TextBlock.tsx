import type { CSSProperties } from 'react';

export type TextBlockVariant = 'XL' | 'L' | 'M' | 'S';

export interface TextBlockProps {
  title?: string;
  caption?: string;
  showCaption?: boolean;
  variant?: TextBlockVariant;
  className?: string;
}

interface TypeStyle {
  fontFamily: string;
  fontWeight: string;
  fontSize: string;
  lineHeight: string;
  /** A raw percent, per design-system.md rule 6 -- tracking is never bound to a token. */
  letterSpacingPercent: number;
}

// title style per variant, from typography.*
const TITLE_STYLE: Record<TextBlockVariant, TypeStyle> = {
  XL: {
    fontFamily: 'var(--font-family-typography-display-m-font-family)',
    fontWeight: 'var(--font-weight-typography-display-m-font-weight)',
    fontSize: 'var(--dimension-typography-display-m-font-size)',
    lineHeight: 'var(--dimension-typography-display-m-line-height)',
    letterSpacingPercent: -1,
  },
  L: {
    fontFamily: 'var(--font-family-typography-headline-xl-font-family)',
    fontWeight: 'var(--font-weight-typography-headline-xl-font-weight)',
    fontSize: 'var(--dimension-typography-headline-xl-font-size)',
    lineHeight: 'var(--dimension-typography-headline-xl-line-height)',
    letterSpacingPercent: -1,
  },
  M: {
    fontFamily: 'var(--font-family-typography-body-m-bold-font-family)',
    fontWeight: 'var(--font-weight-typography-body-m-bold-font-weight)',
    fontSize: 'var(--dimension-typography-body-m-bold-font-size)',
    lineHeight: 'var(--dimension-typography-body-m-bold-line-height)',
    letterSpacingPercent: 1,
  },
  S: {
    fontFamily: 'var(--font-family-typography-body-s-bold-font-family)',
    fontWeight: 'var(--font-weight-typography-body-s-bold-font-weight)',
    fontSize: 'var(--dimension-typography-body-s-bold-font-size)',
    lineHeight: 'var(--dimension-typography-body-s-bold-line-height)',
    letterSpacingPercent: 1,
  },
};

// caption style per variant. XL and L both use Headline XS Regular.
const CAPTION_STYLE: Record<TextBlockVariant, TypeStyle> = {
  XL: {
    fontFamily: 'var(--font-family-typography-headline-xs-regular-font-family)',
    fontWeight: 'var(--font-weight-typography-headline-xs-regular-font-weight)',
    fontSize: 'var(--dimension-typography-headline-xs-regular-font-size)',
    lineHeight: 'var(--dimension-typography-headline-xs-regular-line-height)',
    letterSpacingPercent: 1,
  },
  L: {
    fontFamily: 'var(--font-family-typography-headline-xs-regular-font-family)',
    fontWeight: 'var(--font-weight-typography-headline-xs-regular-font-weight)',
    fontSize: 'var(--dimension-typography-headline-xs-regular-font-size)',
    lineHeight: 'var(--dimension-typography-headline-xs-regular-line-height)',
    letterSpacingPercent: 1,
  },
  M: {
    fontFamily: 'var(--font-family-typography-caption-m-regular-font-family)',
    fontWeight: 'var(--font-weight-typography-caption-m-regular-font-weight)',
    fontSize: 'var(--dimension-typography-caption-m-regular-font-size)',
    lineHeight: 'var(--dimension-typography-caption-m-regular-line-height)',
    letterSpacingPercent: 1,
  },
  S: {
    fontFamily: 'var(--font-family-typography-caption-s-regular-font-family)',
    fontWeight: 'var(--font-weight-typography-caption-s-regular-font-weight)',
    fontSize: 'var(--dimension-typography-caption-s-regular-font-size)',
    lineHeight: 'var(--dimension-typography-caption-s-regular-line-height)',
    letterSpacingPercent: 1,
  },
};

// XL/L center their text and use a slightly larger gap; M/S are
// left-aligned with a tighter gap -- matches the Figma auto-layout.
const GAP_VAR: Record<TextBlockVariant, string> = {
  XL: 'var(--dimension-space-100)',
  L: 'var(--dimension-space-100)',
  M: 'var(--dimension-space-050)',
  S: 'var(--dimension-space-050)',
};

function styleOf(t: TypeStyle, color: string): CSSProperties {
  return {
    fontFamily: t.fontFamily,
    fontWeight: t.fontWeight,
    fontSize: t.fontSize,
    lineHeight: t.lineHeight,
    letterSpacing: `${t.letterSpacingPercent}%`,
    color,
    margin: 0,
  };
}

export function TextBlock({
  title = 'Header',
  caption = 'Caption',
  showCaption = true,
  variant = 'XL',
  className,
}: TextBlockProps) {
  const isCentered = variant === 'XL' || variant === 'L';
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: GAP_VAR[variant],
        textAlign: isCentered ? 'center' : undefined,
      }}
    >
      <p style={styleOf(TITLE_STYLE[variant], 'var(--color-text-primary)')}>{title}</p>
      {showCaption && <p style={styleOf(CAPTION_STYLE[variant], 'var(--color-text-secondary)')}>{caption}</p>}
    </div>
  );
}
