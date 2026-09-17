// SkeletonLine's own Figma description: "don't use this standalone at a
// different size, it exists as an atom for the group" -- so this is
// exported for the group to use, not as a general-purpose placeholder
// shape. If you need a placeholder bar somewhere else, that's a gap to
// raise, not a reason to reach for this at a different width.
export function SkeletonLine({ width = '100%' }: { width?: string }) {
  return (
    <div
      style={{
        width,
        height: 22, // literal Figma value, no backing token -- same disclosed-exception pattern as Button's fixed heights
        background: 'var(--color-background-floating)',
        borderRadius: 'var(--dimension-radius-800)',
        flexShrink: 0,
      }}
    />
  );
}

export function SkeletonLines({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--dimension-space-400)',
        alignItems: 'flex-start',
        padding: 'var(--dimension-space-400)',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <SkeletonLine />
      <SkeletonLine />
      {/* "roughly half width" per the Figma description -- not a literal px value */}
      <SkeletonLine width="50%" />
    </div>
  );
}
