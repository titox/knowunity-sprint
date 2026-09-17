import { IconSlot } from '../IconSlot/IconSlot';
import { CheckIcon } from '../ChoiceRow/CheckIcon';
import { XCloseIcon } from './XCloseIcon';
import { PartialIcon } from './PartialIcon';

export type ResultRowState = 'Success' | 'Error' | 'Partial';
export type ResultRowPosition = 'Top' | 'Middle' | 'Bottom';

export interface ResultRowProps {
  label?: string;
  state?: ResultRowState;
  /**
   * Only changes corner radius -- an outer corner on the edge of the
   * stack, inner everywhere else -- so instances read as one continuous
   * shape inside a ResultRowGroup. Only meant to be used there.
   */
  position?: ResultRowPosition;
  className?: string;
}

// Position controls which corners get the "outer" radius (800, 32px) vs
// the "inner" one (400, 16px) -- always all four corners, just which
// pair is which.
const RADIUS: Record<ResultRowPosition, string> = {
  Top: 'var(--dimension-radius-800) var(--dimension-radius-800) var(--dimension-radius-400) var(--dimension-radius-400)',
  Middle: 'var(--dimension-radius-400)',
  Bottom: 'var(--dimension-radius-400) var(--dimension-radius-400) var(--dimension-radius-800) var(--dimension-radius-800)',
};

export function ResultRow({ label = 'Result row label', state = 'Success', position = 'Top', className }: ResultRowProps) {
  // feedback.success.bold, not accent.green.bold -- same hex (#00c386),
  // but that's the token Figma actually binds here. Caught on audit.
  const iconColor =
    state === 'Success'
      ? 'var(--color-feedback-success-bold)'
      : state === 'Error'
        ? 'var(--color-feedback-error-bold)'
        : 'var(--color-feedback-partial-bold)';
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--dimension-space-300)',
        paddingInline: 'var(--dimension-space-400)',
        paddingBlock: 'var(--dimension-space-300)',
        // Background is always accent/green/subtle regardless of state --
        // per Figma, not conditioned on Success/Error. This row lives
        // inside a green summary card; Error rows still sit on that same
        // green card background.
        background: 'var(--color-accent-green-subtle)',
        borderRadius: RADIUS[position],
        color: iconColor,
      }}
    >
      <IconSlot size="300">
        {state === 'Success' ? <CheckIcon /> : state === 'Error' ? <XCloseIcon /> : <PartialIcon />}
      </IconSlot>
      <span
        style={{
          fontFamily: 'var(--font-family-typography-body-s-regular-font-family)',
          fontWeight: 'var(--font-weight-typography-body-s-regular-font-weight)',
          fontSize: 'var(--dimension-typography-body-s-regular-font-size)',
          lineHeight: 'var(--dimension-typography-body-s-regular-line-height)',
          letterSpacing: '1%',
          color: 'var(--color-text-primary)',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </div>
  );
}
