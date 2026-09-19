'use client';

import { useRouter } from 'next/navigation';
import { StatusRow } from '@/components/StatusRow/StatusRow';
import { SummaryCard } from '@/components/SummaryCard/SummaryCard';
import { ButtonGroup } from '@/components/ButtonGroup/ButtonGroup';
import { TopBar } from '@/components/TopBar/TopBar';
import { useSession } from '../session-context';
import { TERMS, type TermOutcome } from '../terms';
import { SCREEN_MAX_WIDTH } from '../layout-constants';

// StatusRow's documented vocabulary (its own Storybook docs):
// Green=Unaided, Blue=Hinted, Coral=Revealed, Neutral=Skipped.
const CHIP_FOR_OUTCOME: Record<TermOutcome, { color: 'Green' | 'Blue' | 'Coral' | 'Neutral'; text: string }> = {
  unaided: { color: 'Green', text: 'Unaided' },
  hinted: { color: 'Blue', text: 'Hinted' },
  revealed: { color: 'Coral', text: 'Revealed' },
  skipped: { color: 'Neutral', text: 'Skipped' },
};

export default function SummaryPage() {
  const router = useRouter();
  const { termIndex, totalTerms, streak, history, resetSession } = useSession();

  const handleTryAgain = () => {
    resetSession();
    router.push('/recall/choice');
  };

  const handleContinue = () => {
    router.push('/recall/done');
  };

  // Real per-term history, read from the session store -- closes the
  // gap the spec-reviewer found: this screen used to render 3
  // hardcoded placeholder rows regardless of what actually happened.
  // Any term the student never finished (shouldn't happen by the time
  // Summary is reached, but not guaranteed) falls back to 'skipped'
  // rather than crashing on a null.
  const outcomes: TermOutcome[] = history.map((o) => o ?? 'skipped');
  const allUnaided = outcomes.every((o) => o === 'unaided');

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
          {allUnaided ? (
            // sprint-context.md: "Earned pass and clean pass get
            // different copy and visuals, because the earned moment is
            // the point of the feature." SummaryCard's own doc comment
            // says explicitly not to use it for "Worth another look" --
            // this celebratory card, with its own internal title, is
            // the earned-moment case; the locked "worth another look"
            // heading below is for everything else.
            <SummaryCard
              title="Explained unaided"
              rows={TERMS.map((term) => ({ label: term.label, state: 'Success' as const }))}
            />
          ) : (
            <>
              {/* sprint-context.md locks this exact heading: "Summary
                  heading is 'worth another look', because it names an
                  action, not a verdict." Figma's own frame instead says
                  "Here's how it went" -- the locked decision takes
                  precedence, same as "switch to typing" overriding
                  "Type instead" on Answer's voice mode. */}
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
                Worth another look
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
                {TERMS.map((term, i) => {
                  const chip = CHIP_FOR_OUTCOME[outcomes[i]];
                  return <StatusRow key={term.label} label={term.label} chipColor={chip.color} chipText={chip.text} />;
                })}
              </div>
            </>
          )}
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
