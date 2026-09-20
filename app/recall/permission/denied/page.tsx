'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MascotSlot } from '@/components/MascotSlot/MascotSlot';
import { ButtonGroup } from '@/components/ButtonGroup/ButtonGroup';
import { TopBar } from '@/components/TopBar/TopBar';
import { useSession } from '../../session-context';
import { RecallScreenShell, RecallBottomActions } from '../../RecallScreenShell';

export default function PermissionDeniedPage() {
  const router = useRouter();
  const { termIndex, totalTerms, streak } = useSession();
  // No standard web API opens iOS Settings from Safari -- per the
  // approved plan, this is a no-op that reveals inline instructions
  // instead of faking a working deep link.
  const [showSettingsHelp, setShowSettingsHelp] = useState(false);

  const handleContinueByTyping = () => {
    // Choice doesn't exist yet (not built in this batch) -- 404s until
    // it is, per SPEC.md's cheapest-first build order.
    router.push('/recall/choice');
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
        <MascotSlot size="XL" expression="determined" />
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
            Mic access is off
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
            No problem, you can still answer by typing. Turn mic access back on any time in your phone&apos;s
            Settings.
          </p>
        </div>
      </div>

      <RecallBottomActions gap="var(--dimension-space-300)">
        {showSettingsHelp && (
          <p
            style={{
              margin: 0,
              width: '100%',
              textAlign: 'center',
              fontFamily: 'var(--font-family-typography-body-s-regular-font-family)',
              fontWeight: 'var(--font-weight-typography-body-s-regular-font-weight)',
              fontSize: 'var(--dimension-typography-body-s-regular-font-size)',
              lineHeight: 'var(--dimension-typography-body-s-regular-line-height)',
              color: 'var(--color-text-tertiary)',
            }}
          >
            Settings → Safari → Microphone
          </p>
        )}
        <ButtonGroup
          variant="Vertical"
          size="L"
          primaryCta="Continue by typing"
          secondaryCta="How to turn it back on"
          onPrimaryClick={handleContinueByTyping}
          onSecondaryClick={() => setShowSettingsHelp((v) => !v)}
        />
      </RecallBottomActions>
    </RecallScreenShell>
  );
}
