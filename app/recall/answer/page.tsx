'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MascotSlot } from '@/components/MascotSlot/MascotSlot';
import { TextField } from '@/components/TextField/TextField';
import { ButtonGroup } from '@/components/ButtonGroup/ButtonGroup';
import { Button } from '@/components/Button/Button';

// Same content shown on this state in Figma ("10 Switch to typing any
// time") -- a different moment in the loop than Choice's term-1
// prompt, not an inconsistency. Real per-term mock scripts are still
// an open content decision (SPEC.md verification step 6).
const PROMPT = 'Both ended in new kingdoms, each under its own fueros.';

// Voice mode (SPEC.md screen 6) gets added to this same route later,
// keyed off ?mode=voice -- per SPEC.md's own plan for this screen
// ("Same route as screen 5, added once the shell is proven"). Only
// text mode exists so far, so mode isn't branched on yet.
export default function AnswerPage() {
  return (
    <Suspense fallback={null}>
      <AnswerPageContent />
    </Suspense>
  );
}

function AnswerPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  void searchParams; // read once voice mode exists on this route

  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);

  const variant = value ? 'Filled' : focused ? 'Focused' : 'Default';

  const handleSend = () => {
    if (!value.trim()) return; // ButtonGroup exposes no per-button
    // Disabled state (see closing report) -- guard in the handler
    // instead of faking a disabled look by hand (design-system.md rule 9).
    router.push('/recall/processing');
  };

  const handleBackToVoice = () => {
    // Answer's voice mode (screen 6) isn't built yet -- 404s until it
    // is, per SPEC.md's cheapest-first build order.
    router.push('/recall/answer?mode=voice');
  };

  const handleSkip = () => {
    router.push('/recall/result?state=skipped');
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
            {PROMPT}
          </p>
        </div>

        {/*
          Figma's own instance here still has its unfilled generic
          placeholder content ("E.g., Name" title, "Tell us more about
          yourself" placeholder, a search icon) -- clearly never
          customized for this screen, same class of mistake as the
          earlier Pro-card issue. showTitle/showLeadingIcon off and a
          real placeholder substituted instead of copied verbatim.
        */}
        <TextField
          variant={variant}
          showTitle={false}
          showLeadingIcon={false}
          placeholder="Type your answer"
          value={value}
          onChange={(e) => setValue(e.target.value)}
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
          gap: 'var(--dimension-space-300)',
          paddingTop: 'var(--dimension-space-400)',
          paddingBottom: 'var(--dimension-space-1200)',
          width: '100%',
        }}
      >
        {/*
          sprint-context.md: "Skip available at every term, because no
          required action may trap the student" -- a locked, must-have
          rule. This specific Figma frame omits Skip entirely (only
          shows Send + the voice-switch button); added anyway since the
          rule isn't conditional on one frame's export.
        */}
        <Button variant="Tertiary" size="M" cta="Skip for now" onClick={handleSkip} />
        <ButtonGroup
          variant="Vertical"
          size="L"
          primaryCta="Send"
          // Figma's literal label is "Back to Vocie" (a typo) -- corrected
          // to sentence case per design-system.md rule 3, not copied verbatim.
          secondaryCta="Back to voice"
          onPrimaryClick={handleSend}
          onSecondaryClick={handleBackToVoice}
        />
      </div>
    </div>
  );
}
