import type { ReactNode } from 'react';
import { Button } from '../../components/Button/Button';
import { ButtonGroup } from '../../components/ButtonGroup/ButtonGroup';
import { ButtonIcon } from '../../components/ButtonIcon/ButtonIcon';
import { Chips } from '../../components/Chips/Chips';
import { ChoiceRow } from '../../components/ChoiceRow/ChoiceRow';
import { IconSlot } from '../../components/IconSlot/IconSlot';
import { MascotSlot } from '../../components/MascotSlot/MascotSlot';
import { MicButton } from '../../components/MicButton/MicButton';
import { ProgressIndicator } from '../../components/ProgressIndicator/ProgressIndicator';
import { SkeletonLines } from '../../components/SkeletonLines/SkeletonLines';
import { StatusRow } from '../../components/StatusRow/StatusRow';
import { SummaryCard } from '../../components/SummaryCard/SummaryCard';
import { ResultRow } from '../../components/SummaryCard/ResultRow';
import { ResultRowGroup } from '../../components/SummaryCard/ResultRowGroup';
import { TextBlock } from '../../components/TextBlock/TextBlock';
import { TextField } from '../../components/TextField/TextField';
import { ColorSwatch } from '../design-system/ColorSwatch';
import { RadiusBox } from '../design-system/RadiusBox';
import { SpaceBar } from '../design-system/SpaceBar';
import { TypeSpecimen } from '../design-system/TypeSpecimen';

function DemoIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" style={{ width: '100%', height: '100%', display: 'block' }}>
      <circle cx="8" cy="8" r="6" fill="currentColor" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: '100%', height: '100%', display: 'block' }}>
      <rect x="9" y="2" width="6" height="12" rx="3" fill="currentColor" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  );
}

interface CardData {
  name: string;
  description: string;
  docsId: string;
  preview: ReactNode;
}

const CARDS: CardData[] = [
  {
    name: 'Colors',
    description: 'Semantic color tokens and the raw hue primitives they resolve to.',
    docsId: 'design-system-colors--docs',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <ColorSwatch name="interactive.primary" varName="--color-interactive-primary" description="Main call-to-action fill." />
        <ColorSwatch name="accent.coral.bold" varName="--color-accent-coral-bold" description="Solid coral accent fill." />
      </div>
    ),
  },
  {
    name: 'Type',
    description: 'The full type scale, every style rendered at its real size.',
    docsId: 'design-system-type--docs',
    preview: (
      <TypeSpecimen
        name="Headline S"
        vars={{
          fontFamily: '--font-family-typography-headline-s-font-family',
          fontWeight: '--font-weight-typography-headline-s-font-weight',
          fontSize: '--dimension-typography-headline-s-font-size',
          lineHeight: '--dimension-typography-headline-s-line-height',
        }}
        description="Screen and section titles."
      />
    ),
  },
  {
    name: 'Spacing',
    description: 'The space scale, from -24px overlap steps to 160px.',
    docsId: 'design-system-spacing--docs',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <SpaceBar name="space.300" varName="--dimension-space-300" description="12px" />
        <SpaceBar name="space.600" varName="--dimension-space-600" description="24px" />
      </div>
    ),
  },
  {
    name: 'Radius',
    description: 'Corner radii, from a 4px nick to fully rounded.',
    docsId: 'design-system-radius--docs',
    preview: (
      <div style={{ display: 'flex', gap: 12 }}>
        <RadiusBox name="radius.200" varName="--dimension-radius-200" description="8px" />
        <RadiusBox name="radius.full" varName="--dimension-radius-full" description="9999px" />
      </div>
    ),
  },
  {
    name: 'Button',
    description: 'Three emphasis levels, three sizes, four states.',
    docsId: 'components-button--docs',
    preview: <Button cta="1/2 words" variant="Primary" size="S" />,
  },
  {
    name: 'ButtonIcon',
    description: 'Icon-only button sharing button’s full matrix.',
    docsId: 'components-buttonicon--docs',
    preview: <ButtonIcon icon={<DemoIcon />} aria-label="Demo action" variant="Primary" size="S" />,
  },
  {
    name: 'ButtonGroup',
    description: 'Lays out a primary and secondary CTA together.',
    docsId: 'components-buttongroup--docs',
    preview: (
      <div style={{ width: 160 }}>
        <ButtonGroup variant="Vertical" size="M" primaryCta="1/2 words" secondaryCta="1/2 words" />
      </div>
    ),
  },
  {
    name: 'IconSlot',
    description: 'The sizing wrapper every icon in the system sits inside.',
    docsId: 'components-iconslot--docs',
    preview: (
      <div style={{ color: 'var(--color-text-primary)' }}>
        <IconSlot size="400">
          <DemoIcon />
        </IconSlot>
      </div>
    ),
  },
  {
    name: 'Chips',
    description: 'Compact tags for filters, badges and recall status.',
    docsId: 'components-chips--docs',
    preview: <Chips size="S" color="Green" active text="Unaided" showLeftIcon={false} showRightIcon={false} />,
  },
  {
    name: 'ChoiceRow',
    description: 'A selectable option row, like the Speak/Write choice.',
    docsId: 'components-choicerow--docs',
    preview: (
      <div style={{ width: 220 }}>
        <ChoiceRow icon={<MicIcon />} title="Speak" caption="Explain it loud" />
      </div>
    ),
  },
  {
    name: 'StatusRow',
    description: 'A label plus a trailing status chip, one per term.',
    docsId: 'components-statusrow--docs',
    preview: (
      <div style={{ width: 220 }}>
        <StatusRow label="La figura de Jaime I" chipColor="Green" chipText="Unaided" />
      </div>
    ),
  },
  {
    name: 'TextBlock',
    description: 'A title with an optional caption, four scale steps.',
    docsId: 'components-textblock--docs',
    preview: <TextBlock variant="S" title="Header" caption="Caption" />,
  },
  {
    name: 'TextField',
    description: 'A text input with five states and optional icons.',
    docsId: 'components-textfield--docs',
    preview: (
      <div style={{ width: 220 }}>
        <TextField variant="Default" showTitle={false} placeholder="Tell us more" />
      </div>
    ),
  },
  {
    name: 'ProgressIndicator',
    description: 'Five fixed progress levels, two thicknesses, two colours.',
    docsId: 'components-progressindicator--docs',
    preview: (
      <div style={{ width: 200 }}>
        <ProgressIndicator variant="Primary" thickness="16" progress="50" />
      </div>
    ),
  },
  {
    name: 'SkeletonLines',
    description: 'The loading placeholder for content that isn’t ready.',
    docsId: 'components-skeletonlines--docs',
    preview: (
      <div style={{ width: 200 }}>
        <SkeletonLines />
      </div>
    ),
  },
  {
    name: 'MicButton',
    description: 'The circular tap-to-speak control for the recall loop.',
    docsId: 'components-micbutton--docs',
    preview: <MicButton state="Default" aria-label="Speak" />,
  },
  {
    name: 'MascotSlot',
    description: 'Knowie the mascot, at four fixed sizes.',
    docsId: 'components-mascotslot--docs',
    preview: <MascotSlot size="XL" expression="excited" />,
  },
  {
    name: 'ResultRow',
    description: 'A single term result inside a summary card.',
    docsId: 'components-summarycard-resultrow--docs',
    preview: (
      <div style={{ width: 220 }}>
        <ResultRow label="Result row label" state="Success" position="Top" />
      </div>
    ),
  },
  {
    name: 'ResultRowGroup',
    description: 'The stack that owns spacing for a set of result rows.',
    docsId: 'components-summarycard-resultrowgroup--docs',
    preview: (
      <div style={{ width: 220 }}>
        <ResultRowGroup
          rows={[
            { label: 'La figura de Jaime I', state: 'Success' },
            { label: 'El Cantar de Mio Cid', state: 'Success' },
          ]}
        />
      </div>
    ),
  },
  {
    name: 'SummaryCard',
    description: 'The green results-card wrapper for a good session.',
    docsId: 'components-summarycard--docs',
    preview: (
      <div style={{ width: 220 }}>
        <SummaryCard
          title="Buenas explicaciones"
          rows={[
            { label: 'La figura de Jaime I', state: 'Success' },
            { label: 'El Cantar de Mio Cid', state: 'Success' },
          ]}
        />
      </div>
    ),
  },
];

function CardLink({ docsId, children }: { docsId: string; children: ReactNode }) {
  return (
    <a
      href={`/?path=/docs/${docsId}`}
      target="_top"
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      {children}
    </a>
  );
}

export function Cover() {
  return (
    <div
      style={{
        minHeight: '100%',
        background: 'var(--color-background-page)',
        padding: 'var(--dimension-space-800)',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 'var(--dimension-space-1200)' }}>
        <h1
          style={{
            margin: 0,
            fontFamily: 'var(--font-family-typography-display-s-font-family)',
            fontWeight: 'var(--font-weight-typography-display-s-font-weight)',
            fontSize: 'var(--dimension-typography-display-s-font-size)',
            lineHeight: 'var(--dimension-typography-display-s-line-height)',
            color: 'var(--color-text-primary)',
          }}
        >
          Knowunity Design System
        </h1>
        <p
          style={{
            margin: 'var(--dimension-space-200) 0 0',
            fontFamily: 'var(--font-family-typography-headline-xs-regular-font-family)',
            fontWeight: 'var(--font-weight-typography-headline-xs-regular-font-weight)',
            fontSize: 'var(--dimension-typography-headline-xs-regular-font-size)',
            lineHeight: 'var(--dimension-typography-headline-xs-regular-line-height)',
            color: 'var(--color-text-secondary)',
          }}
        >
          Yummy Design Sprint &ndash; September 2027
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 'var(--dimension-space-400)',
        }}
      >
        {CARDS.map((card) => (
          <CardLink key={card.name} docsId={card.docsId}>
            <div
              style={{
                border: '1px solid var(--color-border-default)',
                borderRadius: 'var(--dimension-radius-400)',
                background: 'var(--color-background-surface)',
                padding: 'var(--dimension-space-400)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--dimension-space-300)',
                height: '100%',
                boxSizing: 'border-box',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 122,
                  padding: 'var(--dimension-space-200)',
                  background: 'var(--color-background-page)',
                  borderRadius: 'var(--dimension-radius-200)',
                  overflow: 'hidden',
                }}
              >
                {card.preview}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-family-typography-body-m-bold-font-family)',
                    fontWeight: 'var(--font-weight-typography-body-m-bold-font-weight)',
                    fontSize: 'var(--dimension-typography-body-m-bold-font-size)',
                    lineHeight: 'var(--dimension-typography-body-m-bold-line-height)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {card.name}
                </div>
                <div
                  style={{
                    marginTop: 'var(--dimension-space-050)',
                    fontFamily: 'var(--font-family-typography-caption-m-regular-font-family)',
                    fontWeight: 'var(--font-weight-typography-caption-m-regular-font-weight)',
                    fontSize: 'var(--dimension-typography-caption-m-regular-font-size)',
                    lineHeight: 'var(--dimension-typography-caption-m-regular-line-height)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {card.description}
                </div>
              </div>
            </div>
          </CardLink>
        ))}
      </div>
    </div>
  );
}
