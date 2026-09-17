import type { CSSProperties, ReactNode } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export type ButtonVariant = 'Primary' | 'Secondary' | 'Tertiary';
export type ButtonSize = 'S' | 'M' | 'L';
export type ButtonState = 'Default' | 'Pressed' | 'Disabled' | 'Loading';

export interface ButtonProps {
  /** The button's label. Figma's placeholder default is literally "1/2 words" -- keep labels to a word or two. */
  cta: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /**
   * Matches the Figma variant, not a real :active/:hover pseudo-class.
   * design-system.md rule 9: don't fake a state by dimming or overlaying a
   * spinner by hand -- switch this prop instead.
   */
  state?: ButtonState;
  /** Shows the left iconSlot. Renders nothing inside it unless leftIcon is also passed. */
  showLeftIcon?: boolean;
  /** Shows the right iconSlot. Renders nothing inside it unless rightIcon is also passed. */
  showRightIcon?: boolean;
  /** Content for the left iconSlot -- swap the icon, the slot itself never changes (design-system.md, "Naming conventions"). */
  leftIcon?: ReactNode;
  /** Content for the right iconSlot. */
  rightIcon?: ReactNode;
  onClick?: () => void;
  className?: string;
  /** Layout-only escape hatch for a composing parent (e.g. ButtonGroup stretching this to full width or flex:1). Never used to override a token-driven visual value. */
  style?: CSSProperties;
}

// Icon container size per button size, from the icon.* token scale.
const ICON_VAR: Record<ButtonSize, string> = {
  S: '--dimension-icon-200',
  M: '--dimension-icon-250',
  L: '--dimension-icon-300',
};

// Text style per button size (from typography.*): S and M both use Body S
// Bold, L uses Headline S -- exactly what the Figma file binds to.
const TYPE_VARS: Record<ButtonSize, { family: string; weight: string; size: string; lineHeight: string }> = {
  S: {
    family: 'var(--font-family-typography-body-s-bold-font-family)',
    weight: 'var(--font-weight-typography-body-s-bold-font-weight)',
    size: 'var(--dimension-typography-body-s-bold-font-size)',
    lineHeight: 'var(--dimension-typography-body-s-bold-line-height)',
  },
  M: {
    family: 'var(--font-family-typography-body-s-bold-font-family)',
    weight: 'var(--font-weight-typography-body-s-bold-font-weight)',
    size: 'var(--dimension-typography-body-s-bold-font-size)',
    lineHeight: 'var(--dimension-typography-body-s-bold-line-height)',
  },
  L: {
    family: 'var(--font-family-typography-headline-s-font-family)',
    weight: 'var(--font-weight-typography-headline-s-font-weight)',
    size: 'var(--dimension-typography-headline-s-font-size)',
    lineHeight: 'var(--dimension-typography-headline-s-line-height)',
  },
};

// Horizontal padding for Primary/Secondary (Tertiary has none -- it's a text button).
const PADDING_INLINE_VAR: Record<ButtonSize, string> = {
  S: 'var(--dimension-space-300)',
  M: 'var(--dimension-space-400)',
  L: 'var(--dimension-space-600)',
};

// Gap between icon and label.
const GAP_VAR: Record<ButtonSize, string> = {
  S: 'var(--dimension-space-150)',
  M: 'var(--dimension-space-150)',
  L: 'var(--dimension-space-200)',
};

// Fixed pixel heights for Primary/Secondary, and the Tertiary M/L tap-target
// box. These are literal values baked into the Figma file's own auto-layout
// export (h-[56px] / h-[40px] / h-[32px]) with no backing space/radius
// token -- 56px happens to equal Headline S line-height (24) + 2x
// space-400 (16), but 40px and 32px don't resolve from any token
// combination. Not invented by me; disclosed rather than silently
// approximated.
const HEIGHT_PX: Record<ButtonSize, number> = { S: 32, M: 40, L: 56 };
const TERTIARY_TAP_TARGET_PX: Partial<Record<ButtonSize, number>> = { M: 48, L: 56 };

const PRESSED_OVERLAY: CSSProperties['backgroundImage'] =
  'linear-gradient(var(--color-interactive-pressed), var(--color-interactive-pressed))';

// design-system.md rule 11: shadows are effect styles, not tokens -- so
// this is applied directly, the way the style picker would, not sourced
// from a CSS variable.
const BOTTOM_INNER_SHADOW = 'inset 0px -4px 0px 0px rgba(0,0,0,0.15)';

function IconSlot({ size, children }: { size: ButtonSize; children: ReactNode }) {
  const v = ICON_VAR[size];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `var(${v})`,
        height: `var(${v})`,
        flexShrink: 0,
      }}
    >
      {children}
    </span>
  );
}

export function Button({
  cta,
  variant = 'Primary',
  size = 'S',
  state = 'Default',
  showLeftIcon = false,
  showRightIcon = false,
  leftIcon,
  rightIcon,
  onClick,
  className,
  style: styleOverride,
}: ButtonProps) {
  const isDisabled = state === 'Disabled';
  const isLoading = state === 'Loading';
  const isPressed = state === 'Pressed';
  const type = TYPE_VARS[size];

  let background: CSSProperties['background'];
  let backgroundImage: CSSProperties['backgroundImage'];
  let textColor: string;
  let border: string | undefined;
  let boxShadow: string | undefined;

  if (variant === 'Primary') {
    boxShadow = BOTTOM_INNER_SHADOW;
    if (isDisabled) {
      background = 'var(--color-background-surface)';
      textColor = 'var(--color-text-disabled)';
    } else {
      background = 'var(--color-interactive-primary)';
      textColor = 'var(--color-interactive-on-primary)';
      if (isPressed) backgroundImage = PRESSED_OVERLAY;
    }
  } else if (variant === 'Secondary') {
    boxShadow = BOTTOM_INNER_SHADOW;
    border = '1px solid var(--color-border-default)';
    background = 'var(--color-background-surface)';
    textColor = isDisabled ? 'var(--color-text-disabled)' : 'var(--color-text-primary)';
    if (isPressed) backgroundImage = PRESSED_OVERLAY;
  } else {
    background = 'transparent';
    textColor = isDisabled
      ? 'var(--color-text-disabled)'
      : isPressed
        ? 'var(--color-text-secondary)' // no token in Figma for this exact shade -- see Button.stories.tsx docs
        : 'var(--color-text-primary)';
  }

  const isPrimaryOrSecondary = variant === 'Primary' || variant === 'Secondary';
  const tertiaryTapTarget = variant === 'Tertiary' ? TERTIARY_TAP_TARGET_PX[size] : undefined;

  const style: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: GAP_VAR[size],
    border: border ?? 'none',
    borderRadius: isPrimaryOrSecondary || tertiaryTapTarget ? 'var(--dimension-radius-full)' : undefined,
    background,
    backgroundImage,
    boxShadow,
    color: textColor,
    fontFamily: type.family,
    fontWeight: type.weight,
    fontSize: type.size,
    lineHeight: type.lineHeight,
    paddingInline: isPrimaryOrSecondary ? PADDING_INLINE_VAR[size] : undefined,
    height: isPrimaryOrSecondary ? `${HEIGHT_PX[size]}px` : tertiaryTapTarget ? `${tertiaryTapTarget}px` : undefined,
    minWidth: tertiaryTapTarget ? `${tertiaryTapTarget}px` : undefined,
    boxSizing: 'border-box',
    cursor: isDisabled || isLoading ? 'not-allowed' : 'pointer',
    whiteSpace: 'nowrap',
  };

  return (
    <button
      type="button"
      className={className}
      style={styleOverride ? { ...style, ...styleOverride } : style}
      disabled={isDisabled || isLoading}
      aria-busy={isLoading || undefined}
      // Loading replaces the visible label with a spinner, which left the
      // button with no accessible name at all (axe: button-name, critical).
      // The label is still the right name for what the button does, so it
      // stays as the accessible name even while its text is hidden.
      aria-label={isLoading ? cta : undefined}
      onClick={onClick}
    >
      {isLoading ? (
        <IconSlot size={size}>
          <LoadingSpinner />
        </IconSlot>
      ) : (
        <>
          {showLeftIcon && <IconSlot size={size}>{leftIcon}</IconSlot>}
          <span>{cta}</span>
          {showRightIcon && <IconSlot size={size}>{rightIcon}</IconSlot>}
        </>
      )}
    </button>
  );
}
