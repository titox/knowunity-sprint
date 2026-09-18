'use client';

import { Suspense, type ReactNode } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MascotSlot } from '@/components/MascotSlot/MascotSlot';
import { Button } from '@/components/Button/Button';
import { ButtonGroup } from '@/components/ButtonGroup/ButtonGroup';
import { CheckIcon } from '@/components/ChoiceRow/CheckIcon';
import { ThumbsDownIcon, ThumbsUpIcon } from '@/components/Result/ThumbsIcons';
import { TopBar } from '@/components/TopBar/TopBar';
import { useSession } from '../session-context';
import { SCREEN_MAX_WIDTH } from '../layout-constants';

type ResultState = 'pass' | 'partial' | 'fail' | 'revealed' | 'skipped';

function parseState(raw: string | null): ResultState {
  // Processing currently sends no ?state= at all (no real judge or
  // per-term mock script exists yet -- SPEC.md verification step 6,
  // still open). Defaulting to 'pass' here is a placeholder, not a
  // real verdict.
  if (raw === 'partial' || raw === 'fail' || raw === 'revealed' || raw === 'skipped') return raw;
  // Say-it-back's own guessed contract (?state=upgraded|unchanged,
  // flagged there as a guess) maps onto the two states closest to what
  // it actually means: a clean repeat reads as a pass, a still-missed
  // repeat reads as revealed (say-it-back is only reachable from a
  // hinted-pass or a reveal to begin with).
  if (raw === 'upgraded') return 'pass';
  if (raw === 'unchanged') return 'revealed';
  return 'pass';
}

// Same term-result content used on Answer/Say-it-back's frames for
// this term -- real per-term mock scripts are still an open content
// decision (SPEC.md verification step 6).
const REVEAL_ANSWER = 'Both were sea campaigns that ended in new kingdoms, each organised under its own fueros.';
const HINT_TEXT = "You had the timeline. You didn't say why the two conquests were connected.";
const PASS_FEEDBACK = "That's the one. Both were staged conquests, each locked in with its own fueros.";

export default function ResultPage() {
  return (
    <Suspense fallback={null}>
      <ResultPageContent />
    </Suspense>
  );
}

function shellStyle(): React.CSSProperties {
  return {
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
  };
}

function bodyStyle(): React.CSSProperties {
  return {
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
  };
}

function cardStyle(): React.CSSProperties {
  return {
    width: '100%',
    background: 'var(--color-background-surface)',
    borderRadius: 'var(--dimension-radius-400)',
    padding: 'var(--dimension-space-400)',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--dimension-space-400)',
  };
}

function bodyTextStyle(): React.CSSProperties {
  return {
    margin: 0,
    fontFamily: 'var(--font-family-typography-body-m-regular-font-family)',
    fontWeight: 'var(--font-weight-typography-body-m-regular-font-weight)',
    fontSize: 'var(--dimension-typography-body-m-regular-font-size)',
    lineHeight: 'var(--dimension-typography-body-m-regular-line-height)',
    color: 'var(--color-text-primary)',
  };
}

// "✓ Correct" badge, bound directly to feedback.success.bold -- Chips'
// own Green/active color binds accent.green.bold instead (same hex,
// different semantic token; same distinction ResultRow already
// special-cased). Logged in component-gaps.md.
function PassBadge() {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--dimension-space-100)',
        alignSelf: 'flex-start',
        height: 32,
        paddingInline: 'var(--dimension-space-300)',
        borderRadius: 'var(--dimension-radius-full)',
        background: 'var(--color-feedback-success-bold)',
        boxSizing: 'border-box',
      }}
    >
      <span style={{ width: 'var(--dimension-icon-150)', height: 'var(--dimension-icon-150)', color: 'var(--color-feedback-success-on-bold)' }}>
        <CheckIcon />
      </span>
      <span
        style={{
          fontFamily: 'var(--font-family-typography-caption-m-bold-font-family)',
          fontWeight: 'var(--font-weight-typography-caption-m-bold-font-weight)',
          fontSize: 'var(--dimension-typography-caption-m-bold-font-size)',
          lineHeight: 'var(--dimension-typography-caption-m-bold-line-height)',
          color: 'var(--color-feedback-success-on-bold)',
        }}
      >
        Correct
      </span>
    </div>
  );
}

// Bottom sheet used by Partial and Fail -- no Storybook component
// existed for this (component-gaps.md). Figma's Partial frame used the
// gold pro.onBold/pro.accent card here, a rule-12 violation caught
// once already this session for the permission screens; not
// reproduced -- both tiers use plain background.surface/text.primary
// instead, with the heading color distinguishing them (feedback.partial
// for the first miss, feedback.error for the second, both real tokens
// already in this project).
function HintSheet({
  heading,
  headingColor,
  body,
  children,
}: {
  heading: string;
  headingColor: string;
  body: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        width: '100%',
        background: 'var(--color-background-surface)',
        borderTop: '1px solid var(--color-border-default)',
        borderTopLeftRadius: 'var(--dimension-radius-900)',
        borderTopRightRadius: 'var(--dimension-radius-900)',
        paddingInline: 'var(--dimension-space-700)',
        paddingTop: 'var(--dimension-space-300)',
        paddingBottom: 'var(--dimension-space-700)',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--dimension-space-400)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            fontFamily: 'var(--font-family-typography-headline-m-font-family)',
            fontWeight: 'var(--font-weight-typography-headline-m-font-weight)',
            fontSize: 'var(--dimension-typography-headline-m-font-size)',
            lineHeight: 'var(--dimension-typography-headline-m-line-height)',
            color: headingColor,
          }}
        >
          {heading}
        </span>
        {/* Decorative only -- SPEC.md doesn't give this screen a
            rate-this-hint action. */}
        <div style={{ display: 'flex', gap: 'var(--dimension-space-400)' }}>
          <span style={{ width: 'var(--dimension-icon-300)', height: 'var(--dimension-icon-300)' }}>
            <ThumbsDownIcon />
          </span>
          <span style={{ width: 'var(--dimension-icon-300)', height: 'var(--dimension-icon-300)' }}>
            <ThumbsUpIcon />
          </span>
        </div>
      </div>
      <p style={bodyTextStyle()}>{body}</p>
      {children}
    </div>
  );
}

function ResultPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const state = parseState(searchParams.get('state'));
  const transcript = searchParams.get('transcript');
  const { termIndex, totalTerms, streak, advanceTerm, addStreak } = useSession();

  const isLastTerm = termIndex >= totalTerms;

  const goToNextTermOrSummary = () => {
    // Flat XP per term attempted, per this project's decided XP model
    // -- unaided/hinted bonus tiers depend on per-term history tracking
    // that doesn't exist yet (SPEC.md verification step 4).
    addStreak(1);
    if (isLastTerm) {
      router.push('/recall/summary');
    } else {
      advanceTerm();
      router.push('/recall/answer');
    }
  };

  const handleSkip = () => {
    // Skip earns zero XP, per this project's decided XP model.
    if (isLastTerm) {
      router.push('/recall/summary');
    } else {
      advanceTerm();
      router.push('/recall/answer');
    }
  };

  const handleReRecord = () => {
    router.push('/recall/answer?mode=voice');
  };

  const handleReveal = () => {
    router.push('/recall/result?state=revealed');
  };

  const handleSayItBack = () => {
    router.push('/recall/say-it-back');
  };

  return (
    <div style={shellStyle()}>
      <TopBar termIndex={termIndex} totalTerms={totalTerms} streak={streak} />
      <div style={bodyStyle()}>
        {state === 'pass' && (
          <>
            <MascotSlot size="XL" expression="excited" />
            <div style={cardStyle()}>
              <PassBadge />
              <p style={bodyTextStyle()}>{PASS_FEEDBACK}</p>
            </div>
            <div style={{ flex: 1 }} />
            <Button variant="Tertiary" size="M" cta="Skip for now" onClick={handleSkip} />
            <Button variant="Primary" size="L" cta="Next" onClick={goToNextTermOrSummary} style={{ width: '100%' }} />
          </>
        )}

        {(state === 'partial' || state === 'fail') && (
          <>
            <div style={cardStyle()}>
              <p style={bodyTextStyle()}>{transcript ?? 'Mallorca and Valencia'}</p>
            </div>
            <div style={{ flex: 1 }} />
            {state === 'partial' ? (
              <HintSheet heading="Almost there" headingColor="var(--color-feedback-partial-bold)" body={HINT_TEXT}>
                <div style={{ display: 'flex', gap: 'var(--dimension-space-100)', width: '100%' }}>
                  <Button variant="Secondary" size="L" cta="Try again" onClick={handleReRecord} />
                  <Button variant="Primary" size="L" cta="Continue" onClick={goToNextTermOrSummary} style={{ flex: 1 }} />
                </div>
              </HintSheet>
            ) : (
              <HintSheet heading="Not quite" headingColor="var(--color-feedback-error-bold)" body={HINT_TEXT}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-space-400)', width: '100%' }}>
                  <div style={{ display: 'flex', gap: 'var(--dimension-space-100)', width: '100%' }}>
                    <Button variant="Secondary" size="L" cta="Hint" onClick={handleReRecord} />
                    <Button variant="Primary" size="L" cta="Got it" onClick={handleReRecord} style={{ flex: 1 }} />
                  </div>
                  <Button variant="Tertiary" size="M" cta="Reveal the answer" onClick={handleReveal} style={{ width: '100%' }} />
                </div>
              </HintSheet>
            )}
          </>
        )}

        {state === 'revealed' && (
          <>
            <MascotSlot size="XL" expression="standby" />
            <div style={cardStyle()}>
              <p
                style={{
                  ...bodyTextStyle(),
                  fontFamily: 'var(--font-family-typography-body-m-bold-font-family)',
                  fontWeight: 'var(--font-weight-typography-body-m-bold-font-weight)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                The answer
              </p>
              <p style={bodyTextStyle()}>{REVEAL_ANSWER}</p>
            </div>
            <div style={{ flex: 1 }} />
            <Button variant="Tertiary" size="M" cta="Skip for now" onClick={handleSkip} />
            <ButtonGroup
              variant="Vertical"
              size="L"
              primaryCta="Say it back"
              // Figma's second button here is Tertiary (no visible fill) --
              // same known ButtonGroup limitation (Vertical only supports
              // Primary+Secondary) applied everywhere else in this project.
              secondaryCta="Next"
              onPrimaryClick={handleSayItBack}
              onSecondaryClick={goToNextTermOrSummary}
            />
          </>
        )}

        {state === 'skipped' && (
          <>
            {/* No Figma frame covers Skip landing on Result at all --
                SPEC.md's "Leads to: ... Result (Skipped)" line requires
                it to exist, so this is built from that line and
                sprint-context.md's tone guidance, not a designed screen. */}
            <MascotSlot size="XL" expression="standby" />
            <p style={{ ...bodyTextStyle(), textAlign: 'center' }}>Skipped. Let&apos;s keep going.</p>
            <div style={{ flex: 1 }} />
            <Button variant="Primary" size="L" cta="Next" onClick={goToNextTermOrSummary} style={{ width: '100%' }} />
          </>
        )}
      </div>
    </div>
  );
}
