import type { CSSProperties, ReactNode } from 'react';

export type ChipsSize = 'XXS' | 'XS' | 'S' | 'M';
export type ChipsColor = 'Primary' | 'pro' | 'Blue' | 'Coral' | 'Green' | 'Neutral';

export interface ChipsProps {
  size?: ChipsSize;
  color?: ChipsColor;
  active?: boolean;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  /** Editable Text property in Figma. */
  text?: string;
  className?: string;
}

interface SizeSpec {
  heightPx: number;
  paddingInline: string;
  gap: string;
  iconVar: string; // the outer iconSlot box
  fontFamily: string;
  fontWeight: string;
  fontSize: string;
  lineHeight: string;
}

// XXS and XS share the same icon size and text style in Figma -- only
// height/padding/gap differ. Not a mistake carried over from one to the
// other; that's the real variant data.
const SIZE: Record<ChipsSize, SizeSpec> = {
  XXS: {
    heightPx: 20,
    paddingInline: 'var(--dimension-space-150)',
    gap: 'var(--dimension-space-050)',
    iconVar: '--dimension-icon-150',
    fontFamily: 'var(--font-family-typography-caption-s-bold-font-family)',
    fontWeight: 'var(--font-weight-typography-caption-s-bold-font-weight)',
    fontSize: 'var(--dimension-typography-caption-s-bold-font-size)',
    lineHeight: 'var(--dimension-typography-caption-s-bold-line-height)',
  },
  XS: {
    heightPx: 24,
    paddingInline: 'var(--dimension-space-200)',
    gap: 'var(--dimension-space-100)',
    iconVar: '--dimension-icon-150',
    fontFamily: 'var(--font-family-typography-caption-s-bold-font-family)',
    fontWeight: 'var(--font-weight-typography-caption-s-bold-font-weight)',
    fontSize: 'var(--dimension-typography-caption-s-bold-font-size)',
    lineHeight: 'var(--dimension-typography-caption-s-bold-line-height)',
  },
  S: {
    heightPx: 32,
    paddingInline: 'var(--dimension-space-300)',
    gap: 'var(--dimension-space-100)',
    iconVar: '--dimension-icon-200',
    fontFamily: 'var(--font-family-typography-caption-m-bold-font-family)',
    fontWeight: 'var(--font-weight-typography-caption-m-bold-font-weight)',
    fontSize: 'var(--dimension-typography-caption-m-bold-font-size)',
    lineHeight: 'var(--dimension-typography-caption-m-bold-line-height)',
  },
  M: {
    heightPx: 40,
    paddingInline: 'var(--dimension-space-400)',
    gap: 'var(--dimension-space-150)',
    iconVar: '--dimension-icon-250',
    fontFamily: 'var(--font-family-typography-body-s-bold-font-family)',
    fontWeight: 'var(--font-weight-typography-body-s-bold-font-weight)',
    fontSize: 'var(--dimension-typography-body-s-bold-font-size)',
    lineHeight: 'var(--dimension-typography-body-s-bold-line-height)',
  },
};

interface ColorSpec {
  bg: string;
  text: string;
}

// Neutral has no dedicated accent group in tokens.json, so unlike the
// other colors its background doesn't change on active -- only the text
// color signals the state (text.tertiary -> text.primary). That's real
// Figma data, not an oversight: Neutral's whole point is "no color signal".
const COLOR: Record<ChipsColor, { inactive: ColorSpec; active: ColorSpec }> = {
  Primary: {
    inactive: { bg: 'var(--color-background-surface)', text: 'var(--color-text-primary)' },
    active: { bg: 'var(--color-interactive-primary)', text: 'var(--color-interactive-on-primary)' },
  },
  pro: {
    inactive: { bg: 'var(--color-pro-subtle)', text: 'var(--color-pro-on-subtle)' },
    active: { bg: 'var(--color-pro-bold)', text: 'var(--color-pro-on-bold)' },
  },
  Blue: {
    inactive: { bg: 'var(--color-accent-blue-subtle)', text: 'var(--color-accent-blue-on-subtle)' },
    active: { bg: 'var(--color-accent-blue-bold)', text: 'var(--color-accent-blue-on-bold)' },
  },
  Coral: {
    inactive: { bg: 'var(--color-accent-coral-subtle)', text: 'var(--color-accent-coral-on-subtle)' },
    active: { bg: 'var(--color-accent-coral-bold)', text: 'var(--color-accent-coral-on-bold)' },
  },
  Green: {
    inactive: { bg: 'var(--color-accent-green-subtle)', text: 'var(--color-accent-green-on-subtle)' },
    active: { bg: 'var(--color-accent-green-bold)', text: 'var(--color-accent-green-on-bold)' },
  },
  Neutral: {
    inactive: { bg: 'var(--color-background-floating)', text: 'var(--color-text-tertiary)' },
    active: { bg: 'var(--color-background-floating)', text: 'var(--color-text-primary)' },
  },
};

export function Chips({
  size = 'XXS',
  color = 'Blue',
  active = false,
  showLeftIcon = true,
  showRightIcon = true,
  leftIcon,
  rightIcon,
  text = '1/2 words',
  className,
}: ChipsProps) {
  const s = SIZE[size];
  const c = active ? COLOR[color].active : COLOR[color].inactive;

  const style: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    height: s.heightPx,
    minWidth: s.heightPx,
    paddingInline: s.paddingInline,
    borderRadius: 'var(--dimension-radius-full)',
    background: c.bg,
    boxSizing: 'border-box',
    overflow: 'hidden',
  };

  const iconStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: `var(${s.iconVar})`,
    height: `var(${s.iconVar})`,
    flexShrink: 0,
  };

  const textStyle: CSSProperties = {
    fontFamily: s.fontFamily,
    fontWeight: s.fontWeight,
    fontSize: s.fontSize,
    lineHeight: s.lineHeight,
    letterSpacing: '1%',
    color: c.text,
    whiteSpace: 'nowrap',
    flex: 1,
    textAlign: 'center',
  };

  return (
    <span className={className} style={style}>
      {showLeftIcon && <span style={iconStyle}>{leftIcon}</span>}
      <span style={textStyle}>{text}</span>
      {showRightIcon && <span style={iconStyle}>{rightIcon}</span>}
    </span>
  );
}
