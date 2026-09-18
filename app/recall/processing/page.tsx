'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MascotSlot } from '@/components/MascotSlot/MascotSlot';
import { SkeletonLines } from '@/components/SkeletonLines/SkeletonLines';

// Fixed delay, not randomized or tied to input length -- per this
// prototype's mocked-recall decision (SPEC.md "How the mocked recall
// behaves"). Also matches sprint-context.md: the working state keeps
// full length and never reads as a spinner-fast fake.
const PROCESSING_DELAY_MS = 1750;

export default function ProcessingPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Result doesn't exist yet (not built in this batch) -- this route
      // 404s until it is, per SPEC.md's cheapest-first build order.
      router.push('/recall/result');
    }, PROCESSING_DELAY_MS);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        maxWidth: 390,
        margin: '0 auto',
        background: 'var(--color-background-page)',
        colorScheme: 'dark',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--dimension-space-300)',
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
          gap: 'var(--dimension-space-400)',
          width: '100%',
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
          paddingTop: 'var(--dimension-space-400)',
          paddingBottom: 'var(--dimension-space-1200)',
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
