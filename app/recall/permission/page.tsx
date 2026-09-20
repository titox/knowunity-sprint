'use client';

import { useRouter } from 'next/navigation';
import { MascotSlot } from '@/components/MascotSlot/MascotSlot';
import { ButtonGroup } from '@/components/ButtonGroup/ButtonGroup';
import { TopBar } from '@/components/TopBar/TopBar';
import { useSession } from '../session-context';
import { RecallScreenShell, RecallBottomActions } from '../RecallScreenShell';

// This screen also serves as the brief's F5 "first-encounter intro" --
// voice-ux.md says so explicitly ("that screen IS your primer"), so
// there's no separate Intro route. The copy below covers both the why
// (retrieval practice) and the what (the mic ask) in one screen.
export default function MicPermissionPrimerPage() {
  const router = useRouter();
  const { termIndex, totalTerms, streak } = useSession();

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
    <RecallScreenShell gap="var(--dimension-space-300)">
      <TopBar termIndex={termIndex} totalTerms={totalTerms} streak={streak} onClose={() => router.push('/recall/done')} />
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
            Say what you know
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
            Saying an answer out loud helps it stick better than just reading it back. Say your answer and
            we&apos;ll listen. You can switch to typing any time.
          </p>
        </div>
      </div>

      <RecallBottomActions>
        <ButtonGroup
          variant="Vertical"
          size="L"
          primaryCta="Allow microphone"
          secondaryCta="Not now"
          onPrimaryClick={handleAllow}
          onSecondaryClick={handleNotNow}
        />
      </RecallBottomActions>
    </RecallScreenShell>
  );
}
