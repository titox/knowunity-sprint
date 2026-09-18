'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

// 3 terms per session -- locked in this project's own interview
// ("session length... 3 terms (Recommended)... matches the screenshots
// you already have").
const TOTAL_TERMS = 3;

interface SessionState {
  /** 1-based index of the current term. */
  termIndex: number;
  totalTerms: number;
  /** Genuinely starts at 0 -- nothing has been earned yet. Only
   * Result/Summary (not built yet) will ever increment this for real;
   * no screen before them fakes a number. */
  streak: number;
  advanceTerm: () => void;
  addStreak: (amount: number) => void;
  /** Used by Summary's "Try again" -- starts a fresh session. */
  resetSession: () => void;
}

const SessionContext = createContext<SessionState | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [termIndex, setTermIndex] = useState(1);
  const [streak, setStreak] = useState(0);

  const value: SessionState = {
    termIndex,
    totalTerms: TOTAL_TERMS,
    streak,
    advanceTerm: () => setTermIndex((t) => Math.min(t + 1, TOTAL_TERMS)),
    addStreak: (amount) => setStreak((s) => s + amount),
    resetSession: () => {
      setTermIndex(1);
      setStreak(0);
    },
  };

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionState {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used within SessionProvider (app/recall/layout.tsx)');
  return ctx;
}
