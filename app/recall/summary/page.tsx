'use client';

import { useRouter } from 'next/navigation';
import { StatusRow } from '@/components/StatusRow/StatusRow';
import { ButtonGroup } from '@/components/ButtonGroup/ButtonGroup';
import { TopBar } from '@/components/TopBar/TopBar';
import { useSession } from '../session-context';
import { SCREEN_MAX_WIDTH } from '../layout-constants';

// Real per-term history doesn't exist yet -- no store tracks what
// actually happened on each of the 3 terms this session (SPEC.md
// verification step 4, still open). These 3 rows are placeholder
// content (matching real Figma term names/outcomes) standing in for
// that history, not live data. Figma's own frame shows 5 example rows;
// trimmed to 3 to match this project's locked session length (3 terms),
// not Figma's placeholder count.
const PLACEHOLDER_TERMS: { label: string; chipColor: 'Green' | 'Blue' | 'Coral' | 'Neutral'; chipText: string }[] = [
  { label: 'La figura de Jaime I', chipColor: 'Green', chipText: 'Unaided' },
  { label: 'The fueros and their legacy', chipColor: 'Blue', chipText: 'Hinted' },
  { label: 'Why the conquests connect', chipColor: 'Coral', chipText: 'Revealed' },
];

export default function SummaryPage() {
  const router = useRouter();
  const { termIndex, totalTerms, streak, resetSession } = useSession();

  const handleTryAgain = () => {
    resetSession();
    router.push('/recall/choice');
  };

  const handleContinue = () => {
    router.push('/recall/done');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        maxWidth: SCREEN_MAX_WIDTH,
        margin: '0 auto',
        background: 'var(--color-background-page)',
        colorScheme: 'dark',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box',
      }}
    >
      <TopBar termIndex={termIndex} totalTerms={totalTerms} streak={streak} />
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--dimension-space-300)',
          width: '100%',
          paddingInline: 'var(--dimension-space-400)',
          paddingTop: 'var(--dimension-space-600)',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--dimension-space-600)',
            width: '100%',
          }}
        >
          <p
            style={{
              margin: 0,
              width: '100%',
              textAlign: 'center',
              fontFamily: 'var(--font-family-typography-headline-m-font-family)',
              fontWeight: 'var(--font-weight-typography-headline-m-font-weight)',
              fontSize: 'var(--dimension-typography-headline-m-font-size)',
              lineHeight: 'var(--dimension-typography-headline-m-line-height)',
              color: 'var(--color-text-primary)',
            }}
          >
            Here&apos;s how it went
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-family-typography-body-m-regular-font-family)',
              fontWeight: 'var(--font-weight-typography-body-m-regular-font-weight)',
              fontSize: 'var(--dimension-typography-body-m-regular-font-size)',
              lineHeight: 'var(--dimension-typography-body-m-regular-line-height)',
              color: 'var(--color-text-secondary)',
            }}
          >
            Term by term
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-space-200)', width: '100%' }}>
            {PLACEHOLDER_TERMS.map((term) => (
              <StatusRow key={term.label} label={term.label} chipColor={term.chipColor} chipText={term.chipText} />
            ))}
          </div>
        </div>

        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            width: '100%',
            paddingTop: 'var(--dimension-space-400)',
            paddingBottom: 'var(--dimension-space-1200)',
          }}
        >
          {/*
            01_Design_Brief: "Continue as the primary action, Try again
            as secondary." Figma's own frame actually renders Try
            again's fill above Continue's -- the reverse of that
            hierarchy -- but ButtonGroup always renders Primary first
            (top), so matching the component's real contract here means
            Continue appears above Try again, favoring the documented
            semantic decision over this one frame's unusual ordering.
          */}
          <ButtonGroup
            variant="Vertical"
            size="L"
            primaryCta="Continue"
            secondaryCta="Try again"
            onPrimaryClick={handleContinue}
            onSecondaryClick={handleTryAgain}
          />
        </div>
      </div>
    </div>
  );
}
