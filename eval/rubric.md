# Rubric: grading this prototype

Six dimensions, each scored 0–10. Anchors below describe this project specifically — the
recall-loop prototype, its component library, `design-system.md`'s rules, and
`03_Voice_UX_Reference_...md`'s six principles — not generic UI-review language.

## Scoring rules

- **"Looks good" is a 6, not a 9.** A 9 survives a senior critique untouched: someone who knows
  this system picks at it and finds nothing to fix.
- **A dimension scores 8 or above only if it was verified by rendering, measuring, or testing.**
  Reading the source and confirming it *should* work is not verification. If it wasn't opened in
  a browser, measured with a ruler/contrast tool, or exercised through real interaction, it caps
  at 7.

## Dimensions

### 1. System fidelity — High

**Scores:** does every value in the rendered output trace back to a token in
`tokens/tokens.json`, and every screen trace back to a component in the library, rather than a
one-off recreation of one.

- **4** — Raw hex or px literals show up in rendered component output (not just this project's
  own disclosure comments). A screen hand-rolls a row or button that a cataloged component
  (`choiceRow`, `statusRow`, `button`) already covers.
- **6** — `npm run check:tokens` passes and components map onto the library, but a semantic rule
  is quietly broken somewhere: the `pro` token shows up outside the actual Pro feature (rule 12),
  or a component reads a primitive directly instead of the semantic layer (rule 5).
- **9** — Every colour, space, radius, and type value in the rendered DOM resolves to a real
  token; every screen is built from cataloged components with no hand-rolled substitute where one
  exists; zero `pro`-token misuse; zero CSS fallback values (`var(--x, #333)`, rule 2). Verified
  by inspecting rendered output, not by reading the component source and assuming it holds.

### 2. Coherence — High

**Scores:** does the flow read as one authored product end to end, or as nine screens that each
got built in isolation and stitched together by URL.

- **4** — Screens visibly disagree with each other: one bottom action area sits flush to the
  edge while another has margin, the hint sheet's tone or layout changes term to term for no
  reason, "switch to typing" drifts to "type instead" on one screen but not another.
- **6** — The shell is consistent (390px, dark, same TopBar/progress pattern everywhere), but at
  least one locked decision from `sprint-context.md` leaks through unenforced — e.g. Figma's own
  "Here's how it went" heading survives on Summary instead of the locked "worth another look."
- **9** — Every locked decision in `sprint-context.md`'s "Decisions" list holds everywhere it
  applies: mid-loop copy, the summary heading, the colour-to-status mapping (Green/Blue/
  Coral/Neutral), earned-pass vs. clean-pass getting different treatment. The flow feels
  authored once, not assembled from nine independent builds.

### 3. Craft — High

**Scores:** spacing, rhythm, state differentiation, the small decisions that either got made on
purpose or didn't.

- **4** — Spacing is visibly uneven. A "different" state is really the default state with
  swapped text. Button emphasis (primary/secondary/tertiary) is picked by how it looks rather
  than by the actual importance of the action (design-system.md, "which component to reach
  for").
- **6** — Spacing and rhythm read clean in a screenshot; states are visually distinguishable.
  This is the "looks good" tier — plausible at a glance, not yet interrogated.
- **9** — The hint ladder's two fail tiers are genuinely distinct in heading, copy, and button
  behaviour, not a shared bucket with two buttons calling the same handler. Pass, hinted-pass,
  and revealed each get their own copy and visual treatment per `sprint-context.md`'s "earned
  pass and clean pass get different copy and visuals." Bottom-pinned actions clear real device
  chrome on an actual phone, not just in a desktop browser at 390px width. A senior reviewer
  finds nothing to nitpick.

### 4. UX judgment — High

**Scores:** are the states from `03_Voice_UX_Reference`'s checklist handled, is the hierarchy of
actions clear, are failure paths designed rather than left to dead-end.

- **4** — A "Must"-priority state from the voice-UX checklist is missing entirely: no permission-
  denied screen, or Skip isn't offered on every term.
- **6** — Every "Must" state exists (Idle, Recording, Processing, Result pass/partial/fail,
  Cancel & re-record, Text fallback, Permission primer, Permission denied, Skip), but at least
  one failure path still dead-ends — e.g. an empty submission does nothing with no feedback, or
  permission-denied has no forward path.
- **9** — Every "Must" state is not just present but reachable through real interaction, not
  URL-editing. No required action can trap the student (`sprint-context.md`'s core rule, and
  Voice UX Principle 5). Processing is a genuine skeleton/working state, never a dead spinner
  (Principle 6). The transcript is shown next to the result without requiring correction
  (Principle 4). System status is unambiguous at every moment — idle, listening, processing, and
  result are each visually distinct, and never rely on colour alone to tell them apart
  (Principle 1, and `sprint-context.md`: "colour always paired with icon, label or shape").

### 5. Accessibility — Medium

**Scores:** contrast, touch target size, whether any state's meaning rests on colour alone.

- **4** — A status or result relies on colour as its only signal — e.g. a chip's colour is the
  sole way to tell pass from fail, violating `sprint-context.md`'s "colour always paired with
  icon, label or shape, because colour alone fails AA in dark mode."
- **6** — Colour is paired with an icon or label everywhere it carries meaning, but contrast and
  touch-target size haven't actually been measured — they look fine.
- **9** — Every colour-coded state (term status chips, pass/fail feedback, focus/error borders)
  pairs colour with icon, label, or shape. Contrast was measured against the real rendered
  background, not eyeballed. Touch targets were measured, not estimated. Status that carries
  system state (the mic's listening pulse) stays legible with reduced motion on, per
  `sprint-context.md`.

### 6. Structure — Low

**Scores:** does the layout hold together, does the thing actually render, at the one
supported width.

- **4** — Something doesn't render, or the layout visibly breaks at 390px. A crash or a 404
  somewhere on the golden path.
- **6** — Everything renders at 390px in dark mode without visible breakage, checked in a
  browser.
- **9** — The whole flow renders cleanly end to end, including edge states (skipped, revealed,
  the empty-answer error), with no clipping or layout shift under real device chrome — the exact
  class of bug already found and fixed once this session (buttons clipped under Safari's
  toolbar) does not recur anywhere else in the flow.

## Hard gates

These are pass/fail, independent of the weighted score above. Failing any one caps the overall
grade regardless of how the six dimensions scored.

- **Body text contrast is at least 4.5:1** against its real rendered background.
- **Touch targets are at least 44pt.**
- **No raw hex value appears in rendered component output.** (`npm run check:tokens` is the
  automated proxy for this; a pass there is necessary but not sufficient — it only scans this
  project's own source files, not the full rendered DOM.)
- **No two states that should differ render identically.** If Result's fail-1 and fail-2, or
  Default and Filled, or any other pair of documented states, produce the same pixels, that's an
  automatic fail on this gate — regardless of how good either one looks in isolation.
