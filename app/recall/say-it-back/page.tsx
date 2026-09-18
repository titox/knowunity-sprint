'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MascotSlot } from '@/components/MascotSlot/MascotSlot';
import { Button } from '@/components/Button/Button';
import { RecordingControls } from '@/components/MicButton/RecordingControls';
import { SCREEN_MAX_WIDTH } from '../layout-constants';

// Same term-result content as Answer's frames -- real per-term mock
// scripts are still an open content decision (SPEC.md verification
// step 6).
const PROMPT = 'Both ended in new kingdoms, each under its own fueros.';

// sprint-context.md locks this exact phrase: "'Repeat it and it
// becomes a pass' is locked copy, because without it say-it-back reads
// as pointless." Figma's own frame paraphrases it as "Say it back in
// your own words to turn this into a pass." -- the locked wording
// takes precedence, same as "switch to typing" overriding "Type
// instead" on Answer's voice mode.
const INSTRUCTION = 'Repeat it and it becomes a pass.';

const PLACEHOLDER_TRANSCRIPT = 'They were both campaigns that ended in new territory for the crown.';

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

function getSpeechRecognitionCtor(): (new () => SpeechRecognitionLike) | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export default function SayItBackPage() {
  const router = useRouter();
  const [micState, setMicState] = useState<'Default' | 'Listening'>('Default');
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const startListening = () => {
    setMicState('Listening');
    setTranscript('');
    const Ctor = getSpeechRecognitionCtor();
    // Same defensive real/placeholder split as Answer's voice mode --
    // not verified against real iOS Safari (no device/simulator
    // available here); SPEC.md's spike is still outstanding.
    if (!Ctor) return;
    const recognition = new Ctor();
    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (event) => {
      let finalText = '';
      for (let i = 0; i < event.results.length; i++) {
        finalText += event.results[i][0].transcript;
      }
      setTranscript(finalText);
    };
    recognition.onerror = () => {
      recognitionRef.current = null;
    };
    recognition.onend = () => {
      recognitionRef.current = null;
    };
    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopAndSend = () => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    const finalTranscript = transcript.trim() || PLACEHOLDER_TRANSCRIPT;
    // No real judge exists yet -- whether a repeat is "clean" (upgrades
    // to unaided) or still misses can't be determined without the
    // per-term mock scripts (still an open content decision, SPEC.md
    // verification step 6). Routes with a guessed contract, same as
    // every other not-yet-built destination in this loop.
    router.push(`/recall/result?state=upgraded&transcript=${encodeURIComponent(finalTranscript)}`);
  };

  const handleMicClick = () => {
    if (micState === 'Default') startListening();
    else stopAndSend();
  };

  const handleCancel = () => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setTranscript('');
    setMicState('Default');
  };

  const handleDecline = () => {
    // "decline and move on" (SPEC.md) -- the prior result stands
    // unchanged, no upgrade attempt made.
    recognitionRef.current?.stop();
    router.push('/recall/result?state=unchanged');
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
        paddingInline: 'var(--dimension-space-400)',
        paddingTop: 'var(--dimension-space-600)',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--dimension-space-400)', width: '100%' }}
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
        {INSTRUCTION}
      </p>

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
        <RecordingControls
          state={micState}
          aria-label={micState === 'Listening' ? 'Stop speaking' : 'Speak'}
          cancelAriaLabel="Cancel and re-record"
          onClick={handleMicClick}
          onCancel={handleCancel}
        />
        <Button variant="Tertiary" size="L" cta="Skip for now" onClick={handleDecline} />
      </div>
    </div>
  );
}
