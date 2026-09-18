'use client';

import { useRouter } from 'next/navigation';
import { MascotSlot } from '@/components/MascotSlot/MascotSlot';
import { ButtonGroup } from '@/components/ButtonGroup/ButtonGroup';

export default function MicPermissionPrimerPage() {
  const router = useRouter();

  const handleAllow = async () => {
    // getUserMedia only, not SpeechRecognition's own permission path --
    // per this project's plan, the two-permission question stays open
    // until Answer (voice mode) is built and actually needs it.
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      // Choice doesn't exist yet (not built in this batch) -- 404s until
      // it is, per SPEC.md's cheapest-first build order.
      router.push('/recall/choice');
    } catch {
      router.push('/recall/permission/denied');
    }
  };

  const handleNotNow = () => {
    router.push('/recall/permission/denied');
  };

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
        <MascotSlot size="XL" expression="excited" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-space-100)', width: '100%' }}>
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-family-typography-body-m-bold-font-family)',
              fontWeight: 'var(--font-weight-typography-body-m-bold-font-weight)',
              fontSize: 'var(--dimension-typography-body-m-bold-font-size)',
              lineHeight: 'var(--dimension-typography-body-m-bold-line-height)',
              color: 'var(--color-text-primary)',
            }}
          >
            Practice speaking?
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-family-typography-body-s-regular-font-family)',
              fontWeight: 'var(--font-weight-typography-body-s-regular-font-weight)',
              fontSize: 'var(--dimension-typography-body-s-regular-font-size)',
              lineHeight: 'var(--dimension-typography-body-s-regular-line-height)',
              color: 'var(--color-text-primary)',
            }}
          >
            Say your answer out loud and we&apos;ll listen. You can switch to typing any time.
          </p>
        </div>
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
        <ButtonGroup
          variant="Vertical"
          size="L"
          primaryCta="Allow microphone"
          secondaryCta="Not now"
          onPrimaryClick={handleAllow}
          onSecondaryClick={handleNotNow}
        />
      </div>
    </div>
  );
}
