'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MascotSlot } from '@/components/MascotSlot/MascotSlot';
import { TextField } from '@/components/TextField/TextField';
import { ButtonGroup } from '@/components/ButtonGroup/ButtonGroup';
import { Button } from '@/components/Button/Button';
import { RecordingControls } from '@/components/MicButton/RecordingControls';
import { TopBar } from '@/components/TopBar/TopBar';
import { useSession } from '../session-context';
import { TERMS } from '../terms';
import { RecallScreenShell, RecallBottomActions } from '../RecallScreenShell';

// Prompt now comes from the current term (app/recall/terms.ts) instead
// of a fixed string -- closes the gap the spec-reviewer found: this
// used to show the same 2 hardcoded prompts regardless of which of
// the 3 terms was actually active. Voice mode's own Figma source ("2
// Answers by voice or text") shows a later-term moment with a
// "Correct" acknowledgment chip for the PREVIOUS term glued onto the
// NEXT term's prompt -- that chip is Result's job, not Answer's
// (Answer can't know the previous verdict in isolation), so it's
// dropped here regardless of which term is showing.

// Fallback used when the Web Speech API is unavailable or errors --
// per this project's own decision ("test it first... if it's broken/
// absent, fall back to a per-term placeholder transcript"). Real
// content, not finalized (same open item as the prompts above).
const PLACEHOLDER_TRANSCRIPT = 'They were both campaigns that ended in new territory for the crown.';

export default function AnswerPage() {
  return (
    <Suspense fallback={null}>
      <AnswerPageContent />
    </Suspense>
  );
}

function AnswerPageContent() {
  const searchParams = useSearchParams();
  const { mode: sessionMode, setMode } = useSession();
  const paramMode = searchParams.get('mode');
  // Explicit ?mode= wins (Choice's own Speak/Write pick, or an in-page
  // switch); otherwise fall back to the last mode the student chose, so
  // navigating here with no param (Result's "Next", retry) doesn't
  // silently reset a voice session back to text.
  const mode = paramMode === 'voice' ? 'voice' : paramMode === 'text' ? 'text' : sessionMode;

  useEffect(() => {
    if (paramMode === 'voice' || paramMode === 'text') {
      setMode(paramMode);
    }
  }, [paramMode, setMode]);

  if (mode === 'voice') return <VoiceAnswer />;
  return <TextAnswer />;
}

function contentTopStyle(): React.CSSProperties {
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--dimension-space-400)',
    width: '100%',
    paddingInline: 'var(--dimension-space-400)',
    paddingTop: 'var(--dimension-space-600)',
    boxSizing: 'border-box',
  };
}

function promptCardStyle(): React.CSSProperties {
  return {
    width: '100%',
    background: 'var(--color-background-surface)',
    borderRadius: 'var(--dimension-radius-400)',
    padding: 'var(--dimension-space-400)',
    boxSizing: 'border-box',
  };
}

function promptTextStyle(): React.CSSProperties {
  return {
    margin: 0,
    fontFamily: 'var(--font-family-typography-body-m-regular-font-family)',
    fontWeight: 'var(--font-weight-typography-body-m-regular-font-weight)',
    fontSize: 'var(--dimension-typography-body-m-regular-font-size)',
    lineHeight: 'var(--dimension-typography-body-m-regular-line-height)',
    color: 'var(--color-text-primary)',
  };
}

function TextAnswer() {
  const router = useRouter();
  const { termIndex, totalTerms, streak } = useSession();
  const term = TERMS[termIndex - 1];
  const [value, setValue] = useState('');
  const [showEmptyError, setShowEmptyError] = useState(false);

  // Focus is now handled inside TextField itself via a native
  // onFocus/onBlur listener -- this only needs to pick between the
  // states that depend on this screen's own data (whether there's an
  // error, whether there's text).
  const variant = showEmptyError ? 'Error' : value ? 'Filled' : 'Default';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (showEmptyError) setShowEmptyError(false);
  };

  const handleSend = () => {
    if (!value.trim()) {
      // ButtonGroup exposes no per-button Disabled state (logged in
      // component-gaps.md) -- a real TextField Error state (verified via
      // Storybook docs: variant="Error" + showHelperText + errorCaption)
      // instead of the previous silent no-op.
      setShowEmptyError(true);
      return;
    }
    router.push(`/recall/processing?transcript=${encodeURIComponent(value)}`);
  };

  const handleSwitchToSpeaking = () => {
    router.push('/recall/answer?mode=voice');
  };

  const handleSkip = () => {
    router.push('/recall/result?state=skipped');
  };

  return (
    <RecallScreenShell gap="var(--dimension-space-300)">
      <TopBar termIndex={termIndex} totalTerms={totalTerms} streak={streak} onClose={() => router.push('/recall/done')} />
      <div style={contentTopStyle()}>
        <MascotSlot size="XL" expression="standby" />
        <div style={promptCardStyle()}>
          <p style={promptTextStyle()}>{term.prompt}</p>
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
          onChange={handleChange}
          showHelperText={showEmptyError}
          errorCaption="Say what you know before you send it"
        />
      </div>

      <RecallBottomActions gap="var(--dimension-space-300)">
        {/*
          sprint-context.md: "Skip available at every term, because no
          required action may trap the student" -- a locked, must-have
          rule. This specific Figma frame omits Skip entirely (only
          shows Send + the voice-switch button); added anyway since the
          rule isn't conditional on one frame's export.
        */}
        {/* Was size="M" here, size="L" on voice mode and on Choice --
            same action, same screen family, rendering at two different
            sizes/weights depending on which mode you're in
            (scorecard-3.md #5, flagged three rounds running). */}
        <Button variant="Tertiary" size="L" cta="Skip for now" onClick={handleSkip} />
        <ButtonGroup
          variant="Vertical"
          size="L"
          primaryCta="Send"
          // sprint-context.md locks the mid-loop label as "switch to
          // typing" -- the reverse direction (voice) has no matching
          // locked phrase, so "Back to voice" (correcting Figma's own
          // "Back to Vocie" typo) is a reasonable, non-contradicting choice.
          secondaryCta="Back to voice"
          onPrimaryClick={handleSend}
          onSecondaryClick={handleSwitchToSpeaking}
        />
      </RecallBottomActions>
    </RecallScreenShell>
  );
}

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

function VoiceAnswer() {
  const router = useRouter();
  const { termIndex, totalTerms, streak } = useSession();
  const term = TERMS[termIndex - 1];
  const [micState, setMicState] = useState<'Default' | 'Listening'>('Default');
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const startListening = () => {
    setMicState('Listening');
    setTranscript('');
    const Ctor = getSpeechRecognitionCtor();
    // Real transcript when the browser actually supports it; the
    // per-term placeholder otherwise -- per this project's own decision
    // (SPEC.md Open: "spike it first... if it doesn't work, transcript
    // falls back to a placeholder-per-term"). Checked against Playwright's
    // WebKit build with an iOS Safari UA (no real device/simulator here):
    // webkitSpeechRecognition genuinely exists and .start() doesn't
    // throw, but produced zero events in that headless, mic-less
    // sandbox -- inconclusive, not a confirmed pass or fail on a real
    // device. Doesn't matter functionally either way: this only ever
    // reads whatever transcript exists when the student taps to stop,
    // so silence from the API already falls through to the placeholder.
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
    router.push(`/recall/processing?transcript=${encodeURIComponent(finalTranscript)}`);
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

  const handleSwitchToTyping = () => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    router.push('/recall/answer?mode=text');
  };

  const handleSkip = () => {
    recognitionRef.current?.stop();
    router.push('/recall/result?state=skipped');
  };

  return (
    <RecallScreenShell gap="var(--dimension-space-300)">
      <TopBar termIndex={termIndex} totalTerms={totalTerms} streak={streak} onClose={() => router.push('/recall/done')} />
      <div style={contentTopStyle()}>
        <MascotSlot size="XL" expression="standby" />
        <div style={promptCardStyle()}>
          <p style={promptTextStyle()}>{term.prompt}</p>
        </div>
      </div>

      <RecallBottomActions gap="var(--dimension-space-300)">
        <RecordingControls
          state={micState}
          aria-label={micState === 'Listening' ? 'Stop speaking' : 'Speak'}
          cancelAriaLabel="Cancel and re-record"
          onClick={handleMicClick}
          onCancel={handleCancel}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-space-400)', alignItems: 'center' }}>
          {/*
            Figma's literal label here is "Type instead" -- overridden
            by sprint-context.md's locked mid-loop copy, "switch to
            typing", which takes precedence over one frame's wording.
            Was a hand-rolled <button> with no height floor (measured
            126x24px, well under the 44pt hard gate, next to a correctly
            sized Button one line below on the same screen -- critic-ux
            + critic-craft). A real Tertiary Button gives it the same
            48px tap target for free.
          */}
          <Button variant="Tertiary" size="M" cta="Switch to typing" onClick={handleSwitchToTyping} />
          <Button variant="Tertiary" size="L" cta="Skip for now" onClick={handleSkip} />
        </div>
      </RecallBottomActions>
    </RecallScreenShell>
  );
}
