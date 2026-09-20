'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { TOTAL_TERMS, type TermOutcome } from './terms';

interface SessionState {
  /** 1-based index of the current term. */
  termIndex: number;
  totalTerms: number;
  /** Genuinely starts at 0 -- nothing has been earned yet. */
  streak: number;
  advanceTerm: () => void;
  addStreak: (amount: number) => void;
  /** Used by Summary's "Try again" -- starts a fresh session. */
  resetSession: () => void;

  /** How many attempts have been made on the CURRENT term (0-based --
   * 0 is the first attempt). Drives which script entry Processing reads
   * from terms.ts, and which hint tier Result shows. Resets on advanceTerm. */
  attemptIndex: number;
  recordAttempt: () => void;

  /** Last mode the student explicitly chose (Speak/Write on Choice, or a
   * mid-flow switch). Defaults to 'text'. Screens that navigate to Answer
   * without an explicit ?mode= param (Result's "Next", retry) carry this
   * forward instead of silently resetting to text. */
  mode: 'voice' | 'text';
  setMode: (mode: 'voice' | 'text') => void;

  /** Real per-term outcome history -- closes the gap the spec-reviewer
   * found: Summary was reading 100% hardcoded placeholder rows instead
   * of anything the student actually did. Index 0 = term 1. null until
   * that term is finished. */
  history: (TermOutcome | null)[];
  recordOutcome: (termIndex: number, outcome: TermOutcome) => void;
}

const SessionContext = createContext<SessionState | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [termIndex, setTermIndex] = useState(1);
  const [streak, setStreak] = useState(0);
  const [attemptIndex, setAttemptIndex] = useState(0);
  const [mode, setMode] = useState<'voice' | 'text'>('text');
  const [history, setHistory] = useState<(TermOutcome | null)[]>(Array(TOTAL_TERMS).fill(null));

  const value: SessionState = {
    termIndex,
    totalTerms: TOTAL_TERMS,
    streak,
    advanceTerm: () => {
      setTermIndex((t) => Math.min(t + 1, TOTAL_TERMS));
      setAttemptIndex(0);
    },
    addStreak: (amount) => setStreak((s) => s + amount),
    resetSession: () => {
      setTermIndex(1);
      setStreak(0);
      setAttemptIndex(0);
      setHistory(Array(TOTAL_TERMS).fill(null));
    },
    attemptIndex,
    recordAttempt: () => setAttemptIndex((a) => a + 1),
    mode,
    setMode,
    history,
    recordOutcome: (i, outcome) =>
      setHistory((h) => {
        const next = [...h];
        next[i - 1] = outcome;
        return next;
      }),
  };

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionState {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used within SessionProvider (app/recall/layout.tsx)');
  return ctx;
}
