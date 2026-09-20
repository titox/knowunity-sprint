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
    // A real <button>, not a <div onClick> -- the div had no role/tabIndex/
    // keydown handler, so it was never reachable by keyboard or a switch
    // control (a student on this screen could only ever hit Skip). Matches
    // the pattern already used correctly by Button/ButtonIcon/MicButton.
    <button
      type="button"
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
        border: 'none',
        width: '100%',
        boxSizing: 'border-box',
        cursor: onClick ? 'pointer' : undefined,
        font: 'inherit',
        textAlign: 'left',
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
      {/*
        Not from Figma -- neither choiceRow nor textField has an icon
        background chip there, just a bare icon on the row's own
        background. Added per direction: since the product is dark mode
        only, the leading icon sits on a white circle for contrast.
        background.inverse/text.inverse are the existing semantic pairing
        for "dark content on a light surface" (design-system.md), so no
        new token was needed.
      */}
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--dimension-space-200)',
          borderRadius: 'var(--dimension-radius-full)',
          background: 'var(--color-background-inverse)',
          color: 'var(--color-text-inverse)',
          flexShrink: 0,
        }}
      >
        <IconSlot size="400">{icon}</IconSlot>
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <TextBlock variant="M" title={title} caption={caption} showCaption />
      </div>
      {showSelected && (
        <span style={{ width: 'var(--dimension-icon-300)', height: 'var(--dimension-icon-300)', flexShrink: 0, color: 'var(--color-text-primary)' }}>
          <CheckIcon />
        </span>
      )}
    </button>
  );
}
