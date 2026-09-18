import type { ReactNode } from 'react';
import { SessionProvider } from './session-context';

// The session-level store SPEC.md calls for ("state shared across all
// of these lives in one session-level store"), scoped to every screen
// under app/recall/** via this layout. Deferred until now because
// nothing needed cross-screen state until the top bar's progress/streak
// display did (Choice's own mode handoff used a simpler query param
// instead, since Answer was its only consumer).
export default function RecallLayout({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
