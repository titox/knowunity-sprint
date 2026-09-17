import { Chips, type ChipsColor } from '../Chips/Chips';

export interface StatusRowProps {
  label?: string;
  /**
   * statusRow has no colour property of its own -- per the Figma
   * description, the status colour is set by overriding the nested chip
   * instance directly. Documented vocabulary: Blue=Hinted, Coral=Revealed,
   * Green=Unaided, Neutral=Skipped.
   */
  chipColor?: ChipsColor;
  chipText?: string;
  /**
   * The component's own base definition defaults these to true (visible
   * in Figma's placeholder demo), but the one real instance of this row
   * seen in the file ("Unaided" status, real term content) has no icons
   * at all -- so this wrapper defaults to false to match observed real
   * usage rather than the placeholder default. Override per call.
   */
  chipShowLeftIcon?: boolean;
  chipShowRightIcon?: boolean;
  showOutline?: boolean;
  className?: string;
}

export function StatusRow({
  label = 'Row label',
  chipColor = 'Primary',
  chipText = '1/2 words',
  chipShowLeftIcon = false,
  chipShowRightIcon = false,
  showOutline = false,
  className,
}: StatusRowProps) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--dimension-space-400)',
        borderRadius: 'var(--dimension-radius-600)',
        background: 'var(--color-interactive-secondary)',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {showOutline && (
        // Overlay border, not a raw stroke on the root -- per the Figma
        // description ("don't set a stroke directly on the row instance,
        // use showOutline"), same pattern as ChoiceRow's showSelected.
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            border: '1px solid var(--color-accent-coral-bold)',
            pointerEvents: 'none',
          }}
        />
      )}
      <span
        style={{
          flex: 1,
          minWidth: 0,
          fontFamily: 'var(--font-family-typography-body-s-regular-font-family)',
          fontWeight: 'var(--font-weight-typography-body-s-regular-font-weight)',
          fontSize: 'var(--dimension-typography-body-s-regular-font-size)',
          lineHeight: 'var(--dimension-typography-body-s-regular-line-height)',
          letterSpacing: '1%',
          color: 'var(--color-text-secondary)',
        }}
      >
        {label}
      </span>
      <Chips size="S" color={chipColor} active={false} showLeftIcon={chipShowLeftIcon} showRightIcon={chipShowRightIcon} text={chipText} />
    </div>
  );
}
