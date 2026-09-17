import type { ChangeEvent, ReactNode } from 'react';
import { IconSlot } from '../IconSlot/IconSlot';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';

export type TextFieldVariant = 'Default' | 'Focused' | 'Filled' | 'Error' | 'Disabled';

export interface TextFieldProps {
  variant?: TextFieldVariant;
  showTitle?: boolean;
  titleText?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  showLeadingIcon?: boolean;
  leadingIcon?: ReactNode;
  /**
   * Per the Figma description: this is a real buttonIcon instance, never
   * a slot for arbitrary content -- always a clear or mic-toggle control.
   * Not exposed as freely swappable beyond its icon content.
   */
  showTrailingAction?: boolean;
  trailingIcon?: ReactNode;
  trailingActionAriaLabel?: string;
  onTrailingActionClick?: () => void;
  showHelperText?: boolean;
  helperText?: string;
  errorCaption?: string;
  className?: string;
}

// Figma binds this component's text to Inter Variable at raw 14px/11px,
// not any Greed typography token -- a real inconsistency in the source
// file (everything else in the system is Greed). Per direction, bound to
// the nearest Greed tokens instead: Body S Regular for input text/title,
// Caption S Regular for helper/error text.
const FIELD_TEXT = {
  fontFamily: 'var(--font-family-typography-body-s-regular-font-family)',
  fontWeight: 'var(--font-weight-typography-body-s-regular-font-weight)',
  fontSize: 'var(--dimension-typography-body-s-regular-font-size)',
  lineHeight: 'var(--dimension-typography-body-s-regular-line-height)',
};
const HELPER_TEXT = {
  fontFamily: 'var(--font-family-typography-caption-s-regular-font-family)',
  fontWeight: 'var(--font-weight-typography-caption-s-regular-font-weight)',
  fontSize: 'var(--dimension-typography-caption-s-regular-font-size)',
  lineHeight: 'var(--dimension-typography-caption-s-regular-line-height)',
};

export function TextField({
  variant = 'Default',
  showTitle = true,
  titleText = 'E.g., Name',
  placeholder = 'Tell us more about yourself',
  value,
  onChange,
  showLeadingIcon = true,
  leadingIcon,
  showTrailingAction = false,
  trailingIcon,
  trailingActionAriaLabel = 'Clear',
  onTrailingActionClick,
  showHelperText = false,
  helperText = 'Explanation text',
  errorCaption = 'Explanation message',
  className,
}: TextFieldProps) {
  const isDisabled = variant === 'Disabled';
  const isError = variant === 'Error';
  const isFocused = variant === 'Focused';

  const borderColor = isError
    ? 'var(--color-border-error)'
    : isFocused
      ? 'var(--color-border-focus)'
      : 'var(--color-border-default)';

  const inputTextColor = isDisabled ? 'var(--color-text-disabled)' : 'var(--color-text-primary)';

  return (
    <div
      className={className}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-space-150)', width: '100%' }}
    >
      {showTitle && (
        <p style={{ ...FIELD_TEXT, color: 'var(--color-text-primary)', margin: 0, width: '100%' }}>{titleText}</p>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-space-050)', width: '100%' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--dimension-space-150)',
            paddingInline: 'var(--dimension-space-300)',
            background: 'var(--color-background-input)',
            border: `1px solid ${borderColor}`,
            borderRadius: 'var(--dimension-radius-400)',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {showLeadingIcon && <IconSlot size="300">{leadingIcon}</IconSlot>}
          <div style={{ flex: 1, minWidth: 0, paddingBlock: 'var(--dimension-space-300)' }}>
            <input
              type="text"
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              disabled={isDisabled}
              style={{
                ...FIELD_TEXT,
                color: inputTextColor,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                width: '100%',
              }}
            />
          </div>
          {showTrailingAction && (
            <ButtonIcon
              variant="Tertiary"
              size="S"
              state={isDisabled ? 'Disabled' : 'Default'}
              icon={trailingIcon}
              aria-label={trailingActionAriaLabel}
              onClick={onTrailingActionClick}
            />
          )}
        </div>
        {!isError && showHelperText && (
          <p style={{ ...HELPER_TEXT, color: 'var(--color-text-tertiary)', margin: 0, width: '100%' }}>{helperText}</p>
        )}
        {isError && (
          <p style={{ ...HELPER_TEXT, color: 'var(--color-text-error)', margin: 0, width: '100%' }}>{errorCaption}</p>
        )}
      </div>
    </div>
  );
}
