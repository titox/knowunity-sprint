import { RecallScreenShell } from '../RecallScreenShell';

// Per SPEC.md's decision: "Continue routes to a placeholder 'exam
// plan' screen (Continue, dead-end per this session's decision) --
// since app/page.tsx is still the stock starter and this prototype
// only covers the recall loop itself, Continue routes to a simple
// placeholder representing 'back to the exam plan' -- honest about
// what's out of scope rather than building a fake destination."
export default function DonePage() {
  return (
    <RecallScreenShell
      gap="var(--dimension-space-200)"
      justifyContent="center"
      style={{ paddingInline: 'var(--dimension-space-400)', textAlign: 'center' }}
    >
      <p
        style={{
          margin: 0,
          fontFamily: 'var(--font-family-typography-body-m-bold-font-family)',
          fontWeight: 'var(--font-weight-typography-body-m-bold-font-weight)',
          fontSize: 'var(--dimension-typography-body-m-bold-font-size)',
          lineHeight: 'var(--dimension-typography-body-m-bold-line-height)',
          color: 'var(--color-text-primary)',
        }}
      >
        Prototype ends here
      </p>
      <p
        style={{
          margin: 0,
          fontFamily: 'var(--font-family-typography-body-s-regular-font-family)',
          fontWeight: 'var(--font-weight-typography-body-s-regular-font-weight)',
          fontSize: 'var(--dimension-typography-body-s-regular-font-size)',
          lineHeight: 'var(--dimension-typography-body-s-regular-line-height)',
          color: 'var(--color-text-secondary)',
        }}
      >
        In the real app, this would return to the exam plan.
      </p>
    </RecallScreenShell>
  );
}
