import { ProgressIndicator } from '../ProgressIndicator/ProgressIndicator';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { IconSlot } from '../IconSlot/IconSlot';
import { XCloseIcon } from '../SummaryCard/XCloseIcon';
import { BoltIcon } from './BoltIcon';

export interface TopBarProps {
  /** 1-based index of the current term. */
  termIndex: number;
  totalTerms: number;
  streak: number;
  /** Overrides the term-based calculation -- Summary passes "100" since
   * termIndex caps at totalTerms and reading a finished session through
   * the same formula as an in-progress one always landed on 75%, never
   * 100%, even once every term was done (scorecard-3.md #6). */
  progress?: '0' | '25' | '50' | '75' | '100';
  onClose?: () => void;
  className?: string;
}

// ProgressIndicator only has 5 discrete steps (0/25/50/75/100) -- per
// its own Figma description, "don't use it for precise or continuously
// moving values." SPEC.md's Open section already decided to snap
// term-level progress to the nearest step rather than build a new
// component for finer granularity.
type ProgressStep = '0' | '25' | '50' | '75' | '100';

function snapProgress(termIndex: number, totalTerms: number): ProgressStep {
  const percent = ((termIndex - 1) / totalTerms) * 100;
  const nearest = Math.round(percent / 25) * 25;
  const clamped = Math.min(100, Math.max(0, nearest));
  return String(clamped) as ProgressStep;
}

// No Storybook component existed for this -- appBar/streakCounter were
// never built in code, only in Figma (component-gaps.md). Composed
// from real, already-built pieces: ProgressIndicator (Storybook),
// ButtonIcon (Storybook) for the close control, and a disclosed bolt
// icon asset for the streak count, since no equivalent exists in this
// project's icon set either (same as Figma's own streakCounter note:
// "hand-drawn artwork, not a library icon").
export function TopBar({ termIndex, totalTerms, streak, progress, onClose, className }: TopBarProps) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--dimension-space-100)',
        width: '100%',
        paddingBlock: 'var(--dimension-space-200)',
        paddingLeft: 'var(--dimension-space-100)',
        paddingRight: 'var(--dimension-space-400)',
        boxSizing: 'border-box',
      }}
    >
      <ButtonIcon variant="Tertiary" size="M" icon={<XCloseIcon />} aria-label="Close" onClick={onClose} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <ProgressIndicator variant="Primary" thickness="16" progress={progress ?? snapProgress(termIndex, totalTerms)} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--dimension-space-100)' }}>
        <IconSlot size="250">
          <BoltIcon />
        </IconSlot>
        <span
          style={{
            fontFamily: 'var(--font-family-typography-body-m-bold-font-family)',
            fontWeight: 'var(--font-weight-typography-body-m-bold-font-weight)',
            fontSize: 'var(--dimension-typography-body-m-bold-font-size)',
            lineHeight: 'var(--dimension-typography-body-m-bold-line-height)',
            color: 'var(--color-accent-blue-on-subtle)',
          }}
        >
          {streak}
        </span>
      </div>
    </div>
  );
}
