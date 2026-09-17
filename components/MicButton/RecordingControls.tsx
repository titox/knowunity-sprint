import { MicButton, type MicButtonProps } from './MicButton';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { XCloseIcon } from '../SummaryCard/XCloseIcon';

export interface RecordingControlsProps extends MicButtonProps {
  /**
   * Fires on the cancel tap: discard the take and reset to idle, ready to
   * re-record. Only reachable while state="Listening" -- per voice-ux.md,
   * cancel is a before-send guarantee, not available once processing
   * (state="Loading") has already started.
   */
  onCancel: () => void;
  /** Required for the same reason MicButton's own aria-label is required. */
  cancelAriaLabel: string;
}

// No Figma design exists for this yet (voice-ux.md's "cancel & re-record
// before send" was undesigned -- confirmed by checking both Listening
// screens in Figma, neither has a cancel affordance, only "Skip for
// now"). Composed from two already-built, already-tokenized components
// instead of inventing new visuals: MicButton unchanged, plus a
// Tertiary ButtonIcon reusing the existing x-close asset. Tapping the
// mic while Listening still means stop & send (unchanged push-to-talk
// gesture from the brief); this button is the only new affordance.
export function RecordingControls({ onCancel, cancelAriaLabel, ...micProps }: RecordingControlsProps) {
  const showCancel = micProps.state === 'Listening';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--dimension-space-600)' }}>
      {showCancel && (
        <ButtonIcon
          variant="Tertiary"
          size="M"
          icon={<XCloseIcon />}
          aria-label={cancelAriaLabel}
          onClick={onCancel}
        />
      )}
      <MicButton {...micProps} />
    </div>
  );
}
