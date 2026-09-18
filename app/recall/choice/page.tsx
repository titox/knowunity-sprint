'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MascotSlot } from '@/components/MascotSlot/MascotSlot';
import { ChoiceRow } from '@/components/ChoiceRow/ChoiceRow';
import { Button } from '@/components/Button/Button';
import { SpeakIcon } from '@/components/ChoiceRow/SpeakIcon';
import { WriteIcon } from '@/components/ChoiceRow/WriteIcon';
import { TopBar } from '@/components/TopBar/TopBar';
import { useSession } from '../session-context';
import { SCREEN_MAX_WIDTH } from '../layout-constants';

type Mode = 'voice' | 'text';

// Real prompt data doesn't exist yet -- the 3 terms' mock scripts are
// still an open content decision (SPEC.md's verification step 6, "you
// review the terms' scripts before they're final"). This is term 1's
// placeholder prompt, matching Figma's own copy verbatim so the shape
// is real even though the underlying term-data source isn't wired yet.
const TERM_PROMPT = 'You just revised the Crown of Aragon. Explain it back in your own words?';

export default function ChoicePage() {
  const router = useRouter();
  const { termIndex, totalTerms, streak } = useSession();
  const [selected, setSelected] = useState<Mode | null>(null);

  const handleChoose = (mode: Mode) => {
    setSelected(mode);
    // Answer doesn't exist yet (not built in this batch) -- 404s until
    // it is, per SPEC.md's cheapest-first build order. Mode carried via
    // a query param rather than a session store, since Choice is the
    // first screen with state to hand off and there's no consumer built
    // yet to design a store's shape against.
    router.push(`/recall/answer?mode=${mode}`);
  };

  const handleSkip = () => {
    // Result doesn't exist yet -- the exact query-param contract isn't
    // finalized (there's nothing built yet to consume it), so this is a
    // reasonable guess at the shape, not a settled interface.
    router.push('/recall/result?state=skipped');
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
          gap: 'var(--dimension-space-400)',
          width: '100%',
        }}
      >
        <MascotSlot size="XL" expression="standby" />
        <div
          style={{
            width: '100%',
            background: 'var(--color-background-surface)',
            borderRadius: 'var(--dimension-radius-400)',
            padding: 'var(--dimension-space-400)',
            boxSizing: 'border-box',
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-family-typography-body-m-regular-font-family)',
              fontWeight: 'var(--font-weight-typography-body-m-regular-font-weight)',
              fontSize: 'var(--dimension-typography-body-m-regular-font-size)',
              lineHeight: 'var(--dimension-typography-body-m-regular-line-height)',
              color: 'var(--color-text-primary)',
            }}
          >
            {TERM_PROMPT}
          </p>
        </div>
      </div>

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
        From memory. No notes, no peeking
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-space-300)', width: '100%' }}>
        <ChoiceRow
          title="Speak"
          caption="Explain it loud"
          icon={<SpeakIcon />}
          showSelected={selected === 'voice'}
          onClick={() => handleChoose('voice')}
        />
        <ChoiceRow
          title="Write"
          caption="Type your answer"
          icon={<WriteIcon />}
          showSelected={selected === 'text'}
          onClick={() => handleChoose('text')}
        />
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
        <Button variant="Tertiary" size="L" cta="Skip for now" onClick={handleSkip} style={{ width: '100%' }} />
      </div>
      </div>
    </div>
  );
}
