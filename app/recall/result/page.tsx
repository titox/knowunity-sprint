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
import { TERMS, type TermOutcome } from '../terms';
import { RecallScreenShell } from '../RecallScreenShell';

// SPEC.md names 5 states: Pass, Partial, Fail (1st miss -> hint 1),
// Fail (2nd miss -> hint 2), Revealed -- fail1/fail2 were previously
// collapsed into one 'fail' bucket with identical content and two
// buttons that called the same handler (a real gap the spec-reviewer
// found). Now genuinely distinct.
type ResultState = 'pass' | 'partial' | 'fail1' | 'fail2' | 'revealed' | 'skipped';

function parseState(raw: string | null): ResultState {
  if (raw === 'partial' || raw === 'fail1' || raw === 'fail2' || raw === 'revealed' || raw === 'skipped') return raw;
  // Say-it-back's own guessed contract (?state=upgraded|unchanged,
  // flagged there as a guess) maps onto the two states closest to what
  // it actually means: a clean repeat reads as a pass, a still-missed
  // repeat reads as revealed (say-it-back is only reachable from a
  // hinted-pass or a reveal to begin with).
  if (raw === 'upgraded') return 'pass';
  if (raw === 'unchanged') return 'revealed';
  return 'pass';
}

// No separate bottom-actions wrapper on this screen (a spacer div pushes
// the buttons down within this one flex column instead), so this can't
// reuse RecallBottomActions directly -- but it needs the same
// safe-area-aware bottom padding, since its buttons sit flush against
// the container's bottom edge with no other padding protecting them.
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
    paddingBottom: 'calc(var(--dimension-space-1600) + env(safe-area-inset-bottom))',
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
// special-cased). Logged in component-gaps.md. Height uses
// dimension-space-800 (32px) -- a real token, not the bare `32`
// literal this had before (caught by spec-reviewer: SPEC.md's own
// grep check for raw px only matches string literals, not JS numbers).
function PassBadge() {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--dimension-space-100)',
        alignSelf: 'flex-start',
        height: 'var(--dimension-space-800)',
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

// Bottom sheet used by Partial, Fail (hint 1), and Fail (hint 2) -- no
// Storybook component existed for this (component-gaps.md). Figma's
// Partial frame used the gold pro.onBold/pro.accent card here, a
// rule-12 violation caught once already this session for the
// permission screens; not reproduced -- all three tiers use plain
// background.surface/text.primary instead, with the heading color
// distinguishing them (feedback.partial for the softer tier,
// feedback.error for both fail tiers, both real tokens already in
// this project).
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

export default function ResultPage() {
  return (
    <Suspense fallback={null}>
      <ResultPageContent />
    </Suspense>
  );
}

function ResultPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawState = searchParams.get('state');
  const state = parseState(rawState);
  const transcript = searchParams.get('transcript');
  const { termIndex, totalTerms, streak, attemptIndex, advanceTerm, addStreak, recordOutcome } = useSession();

  const term = TERMS[termIndex - 1];
  const isLastTerm = termIndex >= totalTerms;
  // A pass reached after at least one real attempt was hinted, not
  // unaided -- unless it got here via Say-it-back's own upgrade
  // (rawState === 'upgraded'), which SPEC.md says should count as
  // unaided ("repeat it and it becomes a pass"). Closes the "missing
  // hinted-pass -> offer Say it back" gap the spec-reviewer found.
  const isHintedPass = state === 'pass' && attemptIndex > 0 && rawState !== 'upgraded';

  const finishTerm = (outcome: TermOutcome, xp: number) => {
    recordOutcome(termIndex, outcome);
    addStreak(xp);
    if (isLastTerm) {
      router.push('/recall/summary');
    } else {
      advanceTerm();
      router.push('/recall/answer');
    }
  };

  const goToNextTermOrSummary = () => {
    // Flat XP per term attempted, plus a bonus for a clean unaided
    // pass, per this project's decided XP model.
    if (state === 'pass') finishTerm(isHintedPass ? 'hinted' : 'unaided', isHintedPass ? 1 : 2);
    else if (state === 'partial') finishTerm('hinted', 1);
    else finishTerm('revealed', 1); // reached from 'revealed'
  };

  const handleSkip = () => {
    // Skip earns zero XP, per this project's decided XP model.
    recordOutcome(termIndex, 'skipped');
    if (isLastTerm) {
      router.push('/recall/summary');
    } else {
      advanceTerm();
      router.push('/recall/answer');
    }
  };

  // Choice/Answer's own Skip action routes straight here with
  // ?state=skipped (bypassing Processing entirely), so this state's
  // own "Next" has to record the outcome itself -- same 0-XP handling
  // as handleSkip above, just reached a different way.
  const handleContinueFromSkipped = () => {
    recordOutcome(termIndex, 'skipped');
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

  const handleShowSecondHint = () => {
    const transcriptParam = transcript ? `&transcript=${encodeURIComponent(transcript)}` : '';
    router.push(`/recall/result?state=fail2${transcriptParam}`);
  };

  const handleReveal = () => {
    const transcriptParam = transcript ? `&transcript=${encodeURIComponent(transcript)}` : '';
    router.push(`/recall/result?state=revealed${transcriptParam}`);
  };

  const handleSayItBack = () => {
    router.push('/recall/say-it-back');
  };

  return (
    <RecallScreenShell>
      <TopBar termIndex={termIndex} totalTerms={totalTerms} streak={streak} />
      <div style={bodyStyle()}>
        {state === 'pass' && (
          <>
            <MascotSlot size="XL" expression="excited" />
            <div style={cardStyle()}>
              <PassBadge />
              <p style={bodyTextStyle()}>{term.correctAnswer}</p>
            </div>
            <div style={{ flex: 1 }} />
            <Button variant="Tertiary" size="M" cta="Skip for now" onClick={handleSkip} />
            {isHintedPass ? (
              <ButtonGroup
                variant="Vertical"
                size="L"
                primaryCta="Next"
                secondaryCta="Say it back"
                onPrimaryClick={goToNextTermOrSummary}
                onSecondaryClick={handleSayItBack}
              />
            ) : (
              <Button variant="Primary" size="L" cta="Next" onClick={goToNextTermOrSummary} style={{ width: '100%' }} />
            )}
          </>
        )}

        {state === 'partial' && (
          <>
            <div style={cardStyle()}>
              <p style={bodyTextStyle()}>{transcript ?? term.prompt}</p>
            </div>
            <div style={{ flex: 1 }} />
            <HintSheet heading="Almost there" headingColor="var(--color-feedback-partial-bold)" body={term.hint1}>
              <div style={{ display: 'flex', gap: 'var(--dimension-space-100)', width: '100%' }}>
                <Button variant="Secondary" size="L" cta="Try again" onClick={handleReRecord} />
                <Button variant="Primary" size="L" cta="Continue" onClick={goToNextTermOrSummary} style={{ flex: 1 }} />
              </div>
            </HintSheet>
          </>
        )}

        {state === 'fail1' && (
          <>
            <div style={cardStyle()}>
              <p style={bodyTextStyle()}>{transcript ?? term.prompt}</p>
            </div>
            <div style={{ flex: 1 }} />
            <HintSheet heading="Not quite" headingColor="var(--color-feedback-error-bold)" body={term.hint1}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-space-400)', width: '100%' }}>
                <div style={{ display: 'flex', gap: 'var(--dimension-space-100)', width: '100%' }}>
                  {/* "Hint" reveals the second, stronger hint tier;
                      "Got it" means the student is ready to retry --
                      these were previously the same handler, a real
                      bug the spec-reviewer found. */}
                  <Button variant="Secondary" size="L" cta="Hint" onClick={handleShowSecondHint} />
                  <Button variant="Primary" size="L" cta="Got it" onClick={handleReRecord} style={{ flex: 1 }} />
                </div>
                <Button variant="Tertiary" size="M" cta="Reveal the answer" onClick={handleReveal} style={{ width: '100%' }} />
              </div>
            </HintSheet>
          </>
        )}

        {state === 'fail2' && (
          <>
            {/* No Figma frame covers a second hint tier -- Figma only
                gave us one "Fail" frame. Built from the same pattern as
                fail1, one tier harder: no more "Hint" button (already
                at max hint depth), just retry or reveal. */}
            <div style={cardStyle()}>
              <p style={bodyTextStyle()}>{transcript ?? term.prompt}</p>
            </div>
            <div style={{ flex: 1 }} />
            <HintSheet heading="Still not quite" headingColor="var(--color-feedback-error-bold)" body={term.hint2}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-space-400)', width: '100%' }}>
                <Button variant="Primary" size="L" cta="Got it" onClick={handleReRecord} style={{ width: '100%' }} />
                <Button variant="Tertiary" size="M" cta="Reveal the answer" onClick={handleReveal} style={{ width: '100%' }} />
              </div>
            </HintSheet>
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
              <p style={bodyTextStyle()}>{term.correctAnswer}</p>
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
            <Button variant="Primary" size="L" cta="Next" onClick={handleContinueFromSkipped} style={{ width: '100%' }} />
          </>
        )}
      </div>
    </RecallScreenShell>
  );
}
