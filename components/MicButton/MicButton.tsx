import type { CSSProperties } from 'react';
import { LoadingSpinner } from '../Button/LoadingSpinner';
import { MicrophoneIcon } from './MicrophoneIcon';

export type MicButtonState = 'Default' | 'Pressed' | 'Disabled' | 'Loading' | 'Listening';

export interface MicButtonProps {
  /**
   * Reuses buttonIcon's own state vocabulary, per the Figma description --
   * not a real :active/:hover pseudo-class (design-system.md rule 9).
   */
  state?: MicButtonState;
  onClick?: () => void;
  className?: string;
}

// Literal Figma values, no backing token -- same disclosed-exception
// pattern as Button's fixed heights. 124 is the button's own diameter;
// the pulse ring is a separate 150px circle offset -14px on each side
// (Figma's own numbers don't perfectly reconcile -- 124 + 2x14 = 152, not
// 150 -- a ~2px rounding slip in the source file, not something to "fix"
// by inventing a cleaner number).
const BUTTON_PX = 124;
const RING_PX = 150;
const RING_OFFSET_PX = -14;
// The pulse ring's translucency (0.25) is baked into the downloaded
// asset's own opacity attribute, not a bound token -- read from the
// asset, not guessed.
const RING_OPACITY = 0.25;

const PRESSED_OVERLAY: CSSProperties['backgroundImage'] =
  'linear-gradient(var(--color-interactive-pressed), var(--color-interactive-pressed))';

export function MicButton({ state = 'Default', onClick, className }: MicButtonProps) {
  const isDisabled = state === 'Disabled';
  const isLoading = state === 'Loading';
  const isPressed = state === 'Pressed';
  const isListening = state === 'Listening';

  let background: CSSProperties['background'];
  let backgroundImage: CSSProperties['backgroundImage'];
  let iconColor: string;

  if (isDisabled) {
    background = 'var(--color-background-surface)';
    iconColor = 'var(--color-text-disabled)';
  } else {
    background = 'var(--color-interactive-primary)';
    iconColor = 'var(--color-interactive-on-primary)';
    if (isPressed) backgroundImage = PRESSED_OVERLAY;
  }

  const style: CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: BUTTON_PX,
    height: BUTTON_PX,
    borderRadius: 'var(--dimension-radius-full)',
    border: '1px solid var(--color-border-default)', // always present, even when Disabled -- unlike Button/ButtonIcon
    background,
    backgroundImage,
    color: iconColor,
    boxSizing: 'border-box',
    cursor: isDisabled || isLoading ? 'not-allowed' : 'pointer',
    padding: 0,
  };

  return (
    <button type="button" className={className} style={style} disabled={isDisabled} aria-busy={isLoading || undefined} onClick={onClick}>
      {isListening && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: RING_OFFSET_PX,
            left: RING_OFFSET_PX,
            width: RING_PX,
            height: RING_PX,
            borderRadius: '50%',
            background: 'var(--color-accent-brand-bold)',
            opacity: RING_OPACITY,
            pointerEvents: 'none',
          }}
        />
      )}
      <span style={{ position: 'relative', width: 'var(--dimension-icon-400)', height: 'var(--dimension-icon-400)' }}>
        {isLoading ? <LoadingSpinner /> : <MicrophoneIcon />}
      </span>
    </button>
  );
}
