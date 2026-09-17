import Image from 'next/image';

export type MascotSlotSize = 'XL' | '2XL' | '3XL' | '4XL';

// Knowie's expression set, as shipped in /public -- not downloaded from
// Figma, per instruction. Filenames are the expression names themselves.
export type MascotExpression =
  | 'amazed'
  | 'angry'
  | 'approving'
  | 'confused'
  | 'determined'
  | 'excited'
  | 'giggling'
  | 'laughing'
  | 'overIt'
  | 'sad'
  | 'standby'
  | 'thinking';

const EXPRESSION_SRC: Record<MascotExpression, string> = {
  amazed: '/amazed.svg',
  angry: '/angry.svg',
  approving: '/approving.svg',
  confused: '/confused.svg',
  determined: '/determined.png',
  excited: '/excited.svg',
  giggling: '/giggling.svg',
  laughing: '/laughing.svg',
  overIt: '/overIt.svg',
  sad: '/sad.png',
  standby: '/standby.svg',
  thinking: '/thinking.png',
};

// Maps to the Illustration token steps (illustration.800/1500/2500/4000),
// per the Figma description. Figma also has an Illustration/500 (40px)
// step not used by any mascotSlot variant -- included in tokens.json for
// completeness, not exposed as a mascotSlot size since Figma doesn't offer it.
const SIZE_VAR: Record<MascotSlotSize, string> = {
  XL: '--dimension-illustration-800',
  '2XL': '--dimension-illustration-1500',
  '3XL': '--dimension-illustration-2500',
  '4XL': '--dimension-illustration-4000',
};

// Numeric px per size, matching the tokens above -- next/image requires
// literal width/height numbers for a /public asset (it can't read the
// token at build time), so this exists only to satisfy that API. The
// visual box size is still driven by the CSS variable via the wrapper.
const SIZE_PX: Record<MascotSlotSize, number> = { XL: 64, '2XL': 120, '3XL': 200, '4XL': 320 };

export interface MascotSlotProps {
  size?: MascotSlotSize;
  expression?: MascotExpression;
  className?: string;
}

export function MascotSlot({ size = 'XL', expression = 'standby', className }: MascotSlotProps) {
  const v = SIZE_VAR[size];
  const px = SIZE_PX[size];
  return (
    <div
      className={className}
      style={{
        width: `var(${v})`,
        height: `var(${v})`,
        position: 'relative',
        flexShrink: 0,
      }}
    >
      <Image
        src={EXPRESSION_SRC[expression]}
        alt={`Knowie, ${expression}`}
        width={px}
        height={px}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>
  );
}
