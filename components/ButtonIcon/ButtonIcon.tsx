import type { CSSProperties, ReactNode } from 'react';
import { LoadingSpinner } from '../Button/LoadingSpinner';

export type ButtonIconVariant = 'Primary' | 'Secondary' | 'Tertiary';
export type ButtonIconSize = 'S' | 'M' | 'L';
export type ButtonIconState = 'Default' | 'Pressed' | 'Disabled' | 'Loading';

export interface ButtonIconProps {
  variant?: ButtonIconVariant;
  size?: ButtonIconSize;
  /**
   * Matches the Figma variant, not a real :active/:hover pseudo-class --
   * same rule as Button (design-system.md rule 9).
   */
  state?: ButtonIconState;
  /** Content for the iconSlot -- swap the icon, the slot itself never changes. */
  icon: ReactNode;
  /**
   * Required, not optional: this button carries no visible label, so
   * without it the control has no accessible name at all. Per the Figma
   * description: "don't use it for an action whose meaning isn't obvious
   * without a label" -- if you find yourself reaching for a vague
   * aria-label, that's this component telling you to use Button instead.
   */
  'aria-label': string;
  onClick?: () => void;
  className?: string;
}

// Icon size per button size, from the icon.* token scale -- identical to Button.
const ICON_VAR: Record<ButtonIconSize, string> = {
  S: '--dimension-icon-200',
  M: '--dimension-icon-250',
  L: '--dimension-icon-300',
};

// Visible circle diameter for Primary/Secondary, and the Tertiary M/L
// tap-target box. Literal values baked into the Figma file's own
// auto-layout export (size-[56px] / size-[40px] / size-[32px]) with no
// backing space/radius token -- 32px happens to equal space-800, but 40
// and 56 don't resolve from any token combination. Same disclosed
// exception as Button's fixed heights, not invented by me.
const CIRCLE_PX: Record<ButtonIconSize, number> = { S: 32, M: 40, L: 56 };
const TERTIARY_TAP_TARGET_PX: Partial<Record<ButtonIconSize, number>> = { M: 48, L: 56 };

const PRESSED_OVERLAY: CSSProperties['backgroundImage'] =
  'linear-gradient(var(--color-interactive-pressed), var(--color-interactive-pressed))';

// design-system.md rule 11: shadows are effect styles, not tokens.
// buttonIcon uses a lighter shadow at S/M and Button's own -4px weight at
// L -- both literal from Figma, not a mistake carried over from Button.
const BOTTOM_INNER_SHADOW: Record<ButtonIconSize, string> = {
  S: 'inset 0px -2px 0px 0px rgba(0,0,0,0.15)',
  M: 'inset 0px -2px 0px 0px rgba(0,0,0,0.15)',
  L: 'inset 0px -4px 0px 0px rgba(0,0,0,0.15)',
};

export function ButtonIcon({
  variant = 'Primary',
  size = 'S',
  state = 'Default',
  icon,
  onClick,
  className,
  ...rest
}: ButtonIconProps) {
  const isDisabled = state === 'Disabled';
  const isLoading = state === 'Loading';
  const isPressed = state === 'Pressed';
  const iconVar = ICON_VAR[size];

  let background: CSSProperties['background'];
  let backgroundImage: CSSProperties['backgroundImage'];
  let iconColor: string;
  let border: string | undefined;
  let boxShadow: string | undefined;

  if (variant === 'Primary') {
    boxShadow = BOTTOM_INNER_SHADOW[size];
    if (isDisabled) {
      background = 'var(--color-background-surface)';
      iconColor = 'var(--color-text-disabled)';
      // Primary drops its border on Disabled -- real Figma data, not
      // symmetric with Button (whose disabled state also has no border,
      // consistent here too).
    } else {
      background = 'var(--color-interactive-primary)';
      iconColor = 'var(--color-interactive-on-primary)';
      border = '1px solid var(--color-border-default)';
      if (isPressed) backgroundImage = PRESSED_OVERLAY;
    }
  } else if (variant === 'Secondary') {
    boxShadow = BOTTOM_INNER_SHADOW[size];
    background = 'var(--color-background-surface)';
    iconColor = isDisabled ? 'var(--color-text-disabled)' : 'var(--color-text-primary)';
    if (isPressed) backgroundImage = PRESSED_OVERLAY;
    // Secondary never gets a border in buttonIcon, unlike Button's
    // Secondary (which always has one) -- real Figma data.
  } else {
    background = 'transparent';
    iconColor = isDisabled
      ? 'var(--color-text-disabled)'
      : isPressed
        ? 'var(--color-text-secondary)' // no token in Figma for this exact shade -- see ButtonIcon.stories.tsx docs, same gap as Button
        : 'var(--color-text-primary)';
  }

  const isPrimaryOrSecondary = variant === 'Primary' || variant === 'Secondary';
  const tertiaryTapTarget = variant === 'Tertiary' ? TERTIARY_TAP_TARGET_PX[size] : undefined;
  const circlePx = isPrimaryOrSecondary ? CIRCLE_PX[size] : undefined;

  const style: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: border ?? 'none',
    borderRadius: circlePx || tertiaryTapTarget ? 'var(--dimension-radius-full)' : undefined,
    background,
    backgroundImage,
    boxShadow,
    color: iconColor,
    width: circlePx ? `${circlePx}px` : tertiaryTapTarget ? `${tertiaryTapTarget}px` : undefined,
    height: circlePx ? `${circlePx}px` : tertiaryTapTarget ? `${tertiaryTapTarget}px` : undefined,
    boxSizing: 'border-box',
    cursor: isDisabled || isLoading ? 'not-allowed' : 'pointer',
    padding: 0,
    flexShrink: 0,
  };

  const iconBoxStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: `var(${iconVar})`,
    height: `var(${iconVar})`,
  };

  return (
    <button
      type="button"
      className={className}
      style={style}
      disabled={isDisabled || isLoading}
      aria-busy={isLoading || undefined}
      onClick={onClick}
      {...rest}
    >
      <span style={iconBoxStyle}>{isLoading ? <LoadingSpinner /> : icon}</span>
    </button>
  );
}
