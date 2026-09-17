import type { CSSProperties, ReactNode } from 'react';

export type IconSlotSize = '100' | '150' | '200' | '250' | '300' | '400';

export interface IconSlotProps {
  /**
   * The icon to render. iconSlot is a sizing wrapper only -- swap the
   * icon, keep the slot (design-system.md rule 7 / the Figma description).
   * When omitted, nothing renders (no placeholder icon is faked in).
   */
  children?: ReactNode;
  size?: IconSlotSize;
  className?: string;
}

const ICON_VAR: Record<IconSlotSize, string> = {
  '100': '--dimension-icon-100',
  '150': '--dimension-icon-150',
  '200': '--dimension-icon-200',
  '250': '--dimension-icon-250',
  '300': '--dimension-icon-300',
  '400': '--dimension-icon-400',
};

export function IconSlot({ children, size = '400', className }: IconSlotProps) {
  const v = ICON_VAR[size];
  const style: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: `var(${v})`,
    height: `var(${v})`,
    flexShrink: 0,
  };
  return (
    <span className={className} style={style}>
      {children}
    </span>
  );
}
