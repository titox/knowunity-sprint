import type { CSSProperties, ReactNode } from 'react';
import { SCREEN_MAX_WIDTH } from './layout-constants';

// Shared outer container for every recall-loop screen. Uses 100dvh, not
// 100vh -- iOS Safari's 100vh is measured against the largest viewport
// (toolbars collapsed), so it overflows past the bottom toolbar
// whenever the toolbar is actually showing, clipping bottom-pinned
// buttons underneath it (confirmed on a real iPhone). 100dvh tracks the
// toolbar's real, current height instead.
export function RecallScreenShell({
  children,
  gap,
  justifyContent,
  style,
}: {
  children: ReactNode;
  gap?: string;
  justifyContent?: CSSProperties['justifyContent'];
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        minHeight: '100dvh',
        width: '100%',
        maxWidth: SCREEN_MAX_WIDTH,
        margin: '0 auto',
        background: 'var(--color-background-page)',
        colorScheme: 'dark',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent,
        gap,
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Bottom-pinned action area shared by screens whose primary buttons sit
// against the screen's bottom edge. Adds env(safe-area-inset-bottom) on
// top of the token so buttons clear Safari's bottom toolbar instead of
// rendering underneath it -- only non-zero once app/layout.tsx declares
// viewport: { viewportFit: 'cover' }, otherwise env() always reads 0.
export function RecallBottomActions({
  children,
  gap,
  style,
}: {
  children: ReactNode;
  gap?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap,
        paddingInline: 'var(--dimension-space-400)',
        paddingTop: 'var(--dimension-space-400)',
        paddingBottom: 'calc(var(--dimension-space-1600) + env(safe-area-inset-bottom))',
        boxSizing: 'border-box',
        width: '100%',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
