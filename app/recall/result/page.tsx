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
        paddingBottom: 'calc(var(--dimension-space-700) + env(safe-area-inset-bottom))',
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
  const { termIndex, totalTerms, streak, mode, advanceTerm, addStreak, recordOutcome } = useSession();
  // Read from the URL, not session -- Processing's recordAttempt() has
  // already incremented session's attemptIndex by the time this screen
  // mounts, so reading it from session here always saw a stale,
  // post-increment value (every real first-try pass misclassified as
  // hinted). Processing passes the pre-increment value it actually used
  // to compute the verdict; missing means a direct/manual load, which
  // should read as a clean, unhinted pass.
  const attemptIndexParam = searchParams.get('attemptIndex');
  const attemptIndex = attemptIndexParam !== null ? Number(attemptIndexParam) : 0;

  const term = TERMS[termIndex - 1];
  const isLastTerm = termIndex >= totalTerms;
  // A pass reached after at least one real attempt was hinted, not
  // unaided -- unless it got here via Say-it-back's own upgrade
  // (rawState === 'upgraded'), which offers its own distinct treatment
  // below (isEarnedPass) rather than folding into either bucket.
  const isHintedPass = state === 'pass' && attemptIndex > 0 && rawState !== 'upgraded';
  // Reached only via Say-it-back's repeat-it-back flow, which itself is
  // only reachable after a hinted-pass offer or a full reveal -- the
  // actual "earned moment" sprint-context.md calls "the point of the
  // feature." Was previously indistinguishable from a genuine clean
  // pass (same mascot/badge/copy/button, and recorded as 'unaided') --
  // a hard-gate violation the render/diff pass and critic-craft both
  // caught independently. Gets its own copy/mascot below and records
  // as 'hinted', since it required help to get there either way.
  const isEarnedPass = rawState === 'upgraded';

  const finishTerm = (outcome: TermOutcome, xp: number) => {
    recordOutcome(termIndex, outcome);
    addStreak(xp);
    if (isLastTerm) {
      router.push('/recall/summary');
    } else {
      advanceTerm();
      router.push(`/recall/answer?mode=${mode}`);
    }
  };

  const goToNextTermOrSummary = () => {
    // Flat XP per term attempted, plus a bonus for a clean unaided
    // pass, per this project's decided XP model. An earned (upgraded)
    // pass required a reveal to get there, so it records as 'hinted'
    // like any other assisted pass, not 'unaided'.
    if (state === 'pass') finishTerm(isHintedPass || isEarnedPass ? 'hinted' : 'unaided', isHintedPass || isEarnedPass ? 1 : 2);
    else if (state === 'partial') finishTerm('hinted', 1);
    else finishTerm('revealed', 1); // reached from 'revealed'
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
      router.push(`/recall/answer?mode=${mode}`);
    }
  };

  const handleReRecord = () => {
    router.push(`/recall/answer?mode=${mode}`);
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
    // Carries the state say-it-back needs to return to if the student
    // declines the repeat, so a decline restores the actual prior
    // verdict (pass or revealed) instead of always landing on
    // 'revealed' -- the hard-gate bug where declining after an already
    // -earned hinted pass silently erased it (scorecard-01.md #1).
    const transcriptParam = transcript ? `&transcript=${encodeURIComponent(transcript)}` : '';
    router.push(`/recall/say-it-back?from=${state}&attemptIndex=${attemptIndex}${transcriptParam}`);
  };

  return (
    <RecallScreenShell>
      <TopBar termIndex={termIndex} totalTerms={totalTerms} streak={streak} onClose={() => router.push('/recall/done')} />
      <div style={bodyStyle()}>
        {state === 'pass' && (
          <>
            {/* 2XL, not XL -- at XL (40px on-screen) excited.svg and
                approving.svg were visually indistinguishable, so the
                clean/earned distinction the copy makes wasn't legible in
                the mascot at all (scorecard-01.md #7). */}
            <MascotSlot size="2XL" expression={isEarnedPass ? 'approving' : 'excited'} />
            <div style={cardStyle()}>
              <PassBadge />
              {isEarnedPass && (
                <p
                  style={{
                    ...bodyTextStyle(),
                    fontFamily: 'var(--font-family-typography-body-m-bold-font-family)',
                    fontWeight: 'var(--font-weight-typography-body-m-bold-font-weight)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  You got there.
                </p>
              )}
              <p style={bodyTextStyle()}>{term.correctAnswer}</p>
            </div>
            <div style={{ flex: 1 }} />
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
