'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MascotSlot } from '@/components/MascotSlot/MascotSlot';
import { SkeletonLines } from '@/components/SkeletonLines/SkeletonLines';
import { TopBar } from '@/components/TopBar/TopBar';
import { useSession } from '../session-context';
import { verdictForAttempt } from '../terms';
import { SCREEN_MAX_WIDTH } from '../layout-constants';

// Fixed delay, not randomized or tied to input length -- per this
// prototype's mocked-recall decision (SPEC.md "How the mocked recall
// behaves"). Also matches sprint-context.md: the working state keeps
// full length and never reads as a spinner-fast fake.
const PROCESSING_DELAY_MS = 1750;

export default function ProcessingPage() {
  return (
    <Suspense fallback={null}>
      <ProcessingPageContent />
    </Suspense>
  );
}

function ProcessingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const transcript = searchParams.get('transcript');
  const { termIndex, totalTerms, streak, attemptIndex, recordAttempt } = useSession();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Real verdict, read from this term's pre-scripted sequence
      // (app/recall/terms.ts) -- closes the gap the spec-reviewer found:
      // this route used to send nothing, so Partial/Fail/Revealed were
      // only reachable by hand-editing the URL, never through real play.
      const verdict = verdictForAttempt(termIndex, attemptIndex);
      recordAttempt();
      const transcriptParam = transcript ? `&transcript=${encodeURIComponent(transcript)}` : '';
      router.push(`/recall/result?state=${verdict}${transcriptParam}`);
    }, PROCESSING_DELAY_MS);
    return () => clearTimeout(timer);
    // Intentionally mount-once: snapshots termIndex/attemptIndex/transcript
    // at load time and navigates away, so re-running on their (stable,
    // one-time) values isn't needed and including the whole session
    // object would risk re-arming the timer on unrelated re-renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        gap: 'var(--dimension-space-300)',
        boxSizing: 'border-box',
      }}
    >
      <TopBar termIndex={termIndex} totalTerms={totalTerms} streak={streak} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--dimension-space-400)',
          width: '100%',
          paddingInline: 'var(--dimension-space-400)',
          paddingTop: 'var(--dimension-space-600)',
          boxSizing: 'border-box',
        }}
      >
        <MascotSlot size="XL" expression="thinking" />
        <SkeletonLines />
        <p
          style={{
            margin: 0,
            width: '100%',
            textAlign: 'center',
            fontFamily: 'var(--font-family-typography-body-m-regular-font-family)',
            fontWeight: 'var(--font-weight-typography-body-m-regular-font-weight)',
            fontSize: 'var(--dimension-typography-body-m-regular-font-size)',
            lineHeight: 'var(--dimension-typography-body-m-regular-line-height)',
            color: 'var(--color-text-primary)',
          }}
        >
          Knowie is checking your answer
        </p>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingInline: 'var(--dimension-space-400)',
          paddingTop: 'var(--dimension-space-400)',
          paddingBottom: 'var(--dimension-space-1200)',
          boxSizing: 'border-box',
          width: '100%',
        }}
      >
        <p
          style={{
            margin: 0,
            width: '100%',
            textAlign: 'center',
            fontFamily: 'var(--font-family-typography-body-m-regular-font-family)',
            fontWeight: 'var(--font-weight-typography-body-m-regular-font-weight)',
            fontSize: 'var(--dimension-typography-body-m-regular-font-size)',
            lineHeight: 'var(--dimension-typography-body-m-regular-line-height)',
            color: 'var(--color-text-primary)',
          }}
        >
          This only takes a second
        </p>
      </div>
    </div>
  );
}
