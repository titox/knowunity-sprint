import type { ReactNode } from 'react';
import { IconSlot } from '../IconSlot/IconSlot';
import { TextBlock } from '../TextBlock/TextBlock';
import { CheckIcon } from './CheckIcon';

export interface ChoiceRowProps {
  title?: string;
  caption?: string;
  /** The leading icon. Per the Figma description: don't force a placeholder icon into this slot when no real one exists for the concept -- flag the gap instead. */
  icon?: ReactNode;
  showSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function ChoiceRow({ title = 'Speak', caption = 'Explain it loud', icon, showSelected = false, onClick, className }: ChoiceRowProps) {
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--dimension-space-300)',
        padding: 'var(--dimension-space-400)',
        borderRadius: 'var(--dimension-radius-600)',
        background: 'var(--color-background-stacking)',
        width: '100%',
        boxSizing: 'border-box',
        cursor: onClick ? 'pointer' : undefined,
      }}
    >
      {showSelected && (
        // Optional overlay border, not a raw stroke on the root -- matches
        // design-system.md's documented pattern ("Optional border, not a
        // raw stroke"), same technique the Figma component itself uses.
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            border: '1px solid var(--color-accent-brand-bold)',
            pointerEvents: 'none',
          }}
        />
      )}
      <IconSlot size="400">{icon}</IconSlot>
      <div style={{ flex: 1, minWidth: 0 }}>
        <TextBlock variant="M" title={title} caption={caption} showCaption />
      </div>
      {showSelected && (
        <span style={{ width: 'var(--dimension-icon-300)', height: 'var(--dimension-icon-300)', flexShrink: 0, color: 'var(--color-text-primary)' }}>
          <CheckIcon />
        </span>
      )}
    </div>
  );
}
