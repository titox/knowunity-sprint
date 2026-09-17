import type { CSSProperties, ReactNode } from 'react';
import { Button } from '../Button/Button';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';

export type ButtonGroupVariant = 'Horizontal' | 'Vertical';
export type ButtonGroupSize = 'M' | 'L';

export interface ButtonGroupProps {
  variant?: ButtonGroupVariant;
  size?: ButtonGroupSize;
  /** Vertical only: the top, full-width Primary button's label. */
  primaryCta?: string;
  /** Vertical only: the bottom, full-width Secondary button's label. */
  secondaryCta?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  /** Horizontal only: the leading ButtonIcon's label and its required accessible name. */
  icon?: ReactNode;
  iconAriaLabel?: string;
  onIconClick?: () => void;
  /** Horizontal only: the trailing Primary button's label. */
  cta?: string;
  onClick?: () => void;
  className?: string;
}

// Horizontal+L and Vertical+L both use space-200; Horizontal+M uses
// space-100; Vertical+M uses space-0 (the two buttons touch) -- not a
// symmetric M/L split, real Figma data.
function gapVar(variant: ButtonGroupVariant, size: ButtonGroupSize): string {
  if (size === 'L') return 'var(--dimension-space-200)';
  return variant === 'Horizontal' ? 'var(--dimension-space-100)' : 'var(--dimension-space-0)';
}

export function ButtonGroup({
  variant = 'Vertical',
  size = 'M',
  primaryCta = '1/2 words',
  secondaryCta = '1/2 words',
  onPrimaryClick,
  onSecondaryClick,
  icon,
  iconAriaLabel = 'Action',
  onIconClick,
  cta = '1/2 words',
  onClick,
  className,
}: ButtonGroupProps) {
  const style: CSSProperties = {
    display: 'flex',
    flexDirection: variant === 'Vertical' ? 'column' : 'row',
    alignItems: 'flex-start',
    gap: gapVar(variant, size),
    width: '100%',
  };

  if (variant === 'Vertical') {
    return (
      <div className={className} style={style}>
        <Button
          variant="Primary"
          size={size}
          cta={primaryCta}
          onClick={onPrimaryClick}
          style={{ width: '100%' }}
        />
        <Button
          variant="Secondary"
          size={size}
          cta={secondaryCta}
          onClick={onSecondaryClick}
          style={{ width: '100%' }}
        />
      </div>
    );
  }

  return (
    <div className={className} style={style}>
      <ButtonIcon variant="Secondary" size={size} icon={icon} aria-label={iconAriaLabel} onClick={onIconClick} />
      <Button variant="Primary" size={size} cta={cta} onClick={onClick} style={{ flex: 1 }} />
    </div>
  );
}
