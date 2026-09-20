# Scorecard 3 — recall-loop prototype (round 6, post-fix)

Graded against `eval/rubric.md`. Four critics ran blind, in separate contexts, each seeing only
the screen list and its own rubric dimensions — no critic saw another critic's output, and none
were shown any prior scorecard. A separate render/diff pass (mine, not a rubric critic) rendered
every reachable state of all 9 screens at 390×844/dark mode first and diffed screenshots within
each screen, before any critic ran.

This round follows 4 targeted fixes made directly in response to the two hard gates that failed
every prior round: `app/globals.css`'s raw hex body color, TextField's unstyled placeholder,
`Chips`' Neutral/Skipped text contrast, and `ChoiceRow`'s keyboard trap.

## Both real hard gates PASS for the first time — the weighted score is no longer overridden

- **Raw hex in rendered output: PASSES.** critic-system measured `document.body`'s real computed
  style — `background-color: rgb(9, 12, 24)`, `color: rgb(244, 242, 255)` — and confirmed both
  trace correctly to `--color-background-page`/`--color-text-primary`. `check:tokens` passes
  clean, and no raw hex was found across all 24 rendered states' DOM.
- **Contrast ≥4.5:1: PASSES.** critic-ux pixel-sampled the two specific instances that failed
  every prior round: TextField placeholder now measures **7.72:1** (was 3.68:1), the Neutral/
  Skipped status chip now measures **6.21:1** (was ~3.89:1). Every other sampled text/background
  pair across both critics cleared 4.5:1, several with wide margins (13.95:1, 17.6:1, 19.2:1).
- **Touch targets ≥44pt: PASSES**, as every prior round. One new soft warning: TextField's input
  measures exactly 44px tall live — at the floor, no margin — everything else measured is ≥48px.
- **Identical-render: PASSES, but with a serious near-miss** — see finding 1 below. This is the
  first round this hasn't been the literal hard-gate failure; it's now the closest thing to one.

**Because of this, for the first time, the weighted total below is the actual grade, not a number
overridden to 0.**

## What's confirmed fixed, live, independent of the fix session's own verification

- `ChoiceRow` is now a real `<button>` — critic-ux Tab-reached and Enter-activated Speak/Write
  live; critic-system independently confirmed the same via its own DOM scan.
- Reduced motion: critic-ux confirmed the Processing skeleton stays fully legible and static under
  `reducedMotion: 'reduce'` — correctly gated, not just present.
- Say-it-back's decline, the round-4 hard gate: critic-ux re-confirmed live it restores the actual
  prior verdict, not a hardcoded fallback.

## Weighted total: 6.4 / 10 — stands as the real grade

| Dimension | Priority | Weight | Score /10 | Weighted | Critic |
|---|---|---|---|---|---|
| System fidelity | High | 3 | 5 | 15 | critic-system |
| Coherence | High | 3 | 6 | 18 | critic-craft |
| Craft | High | 3 | 6 | 18 | critic-craft |
| UX judgment | High | 3 | 7 | 21 | critic-ux |
| Accessibility | Medium | 2 | 8 | 16 | critic-ux |
| Structure | Low | 1 | 8 | 8 | critic-system |
| **Total** | | **15** | | **96 → 6.4** | |

System fidelity actually **dropped** 6→5 this round — not from a regression, but because
critic-system found a more severe, previously-uncaught gap (finding 2) than anything that drove
the 6 in prior rounds.

---

## Findings, most severe first

### 1. Hinted-pass and clean-pass are content-identical — a near-miss on the identical-render hard gate, and the rubric's own named craft-9 example, failing
critic-craft rendered `?state=pass&attemptIndex=0` (clean) and `?state=pass&attemptIndex=1`
(hinted) and pixel-diffed the top 400px (mascot, badge, answer card): **byte-identical**. The only
difference anywhere on screen is an extra "Say it back" button appended below. `isHintedPass`
(`app/recall/result/page.tsx:216`) only gates which `ButtonGroup` renders — it never touches
mascot, badge, or copy. This is the exact pair the rubric names by name under its craft-9 anchor
("Pass, hinted-pass, and revealed each get their own copy and visual treatment") and it fails for
that pair specifically. It survives the literal hard gate only because the states aren't 100%
pixel-identical overall (the button differs) — treat this as the real severity of a hard-gate
failure even though it's not counted as one.
**Fix:** give `isHintedPass` its own line in the card, mirroring the pattern already built for
`isEarnedPass`'s "You got there." (lines 299-310) — e.g. "Needed a hint."

### 2. No real `Scaffold` component exists anywhere — the largest System fidelity gap, previously uncaught
`design-system.md` catalogs `Scaffold` as the mandatory screen shell (`topNavigation`/
`middleContent`/`bottomContent`/`bottomSheetOnly` slots). Every one of the 9 recall screens is
instead built on a hand-rolled `RecallScreenShell`/`RecallBottomActions` pair
(`app/recall/RecallScreenShell.tsx:10-79`) — a plain flex `div`, not a cataloged component
instance. Unlike the project's other gaps, this is **not disclosed** in `component-gaps.md` (which
lists only 3 much smaller items). This is the rubric's own 4-anchor pattern ("a screen hand-rolls…
a cataloged component already covers") applied to literally every screen, not one row — the
largest single instance of it in the project, and no prior round's critic caught it.
**Fix:** either build a real `Scaffold` Storybook component and swap it in everywhere, or add an
honest `component-gaps.md` entry disclosing the gap, matching how every other gap in this project
is handled.

### 3. Pass and Revealed result states never show the student's actual transcript — a Voice-UX Principle 4 violation
critic-ux played a real term, typed a specific answer, and confirmed the rendered Pass screen
shows only `term.correctAnswer` — the pre-written script — with zero trace of what was actually
typed (`app/recall/result/page.tsx` lines 296-312, 385-400). Partial/fail1/fail2 already show the
transcript; Pass and Revealed — the majority-traffic states of the whole feature — don't. Directly
contradicts sprint-context.md's locked reason for showing it at all ("a mishearing must read as
the app's error, not the student's"). Not touched by this session's fixes; pre-existing.
**Fix:** render `{transcript}` next to the badge/answer copy in both blocks, same as the other
three states already do; label it ("You said") so it doesn't read as another copy of the prompt
card, per critic-ux's secondary finding.

### 4. Two token-check scripts structurally can't catch a whole class of literal — raw JS numbers
critic-system confirmed both `check:tokens` and `check:borders` only regex string literals
(`#hex`, `NNpx solid`) and can never catch a bare JS number assigned to a style property —
`Button.tsx:84`'s `HEIGHT_PX: {S:32, M:40, L:56}`, `ButtonIcon.tsx`'s `CIRCLE_PX`,
`SkeletonLines.tsx:17`'s `height: 22`, `SummaryCard.tsx:23,25`'s `paddingTop: 17`/
`borderRadius: 30` (the latter two **undisclosed**, unlike the others, and matching no real
token — nearest radius tokens are 24/32, not 30). Most of these are honestly disclosed in code
comments (the project's established exception pattern) and render correctly per Figma — but
they're invisible to both automated gates either way, and `SummaryCard`'s two aren't disclosed at
all.
**Fix:** either add real size tokens for the disclosed Figma values, or accept the disclosure
pattern but stop treating a clean `check:tokens`/`check:borders` run as proof of anything beyond
its narrow, string-literal scope.

### 5. "Skip for now" still renders at two different sizes for the identical action — reconfirmed, unfixed
Same finding as rounds 4 and 5, reconfirmed again by critic-craft with fresh measurements: Choice
and voice-mode Answer render it at 358×56/115×56px (21px/700); text-mode Answer renders it at
81×48px (15px/600, `size="M"` vs `size="L"` at `app/recall/answer/page.tsx:168`). Three rounds
running now.

### 6. Progress bar never reaches 100%, even on Summary
critic-craft played the full loop for real and measured the rendered fill at each step: term1≈0%,
term2=25%, term3=75%, **Summary=75%** — the formula (`snapProgress`,
`components/TopBar/TopBar.tsx:23-28`) uses `(termIndex-1)/totalTerms`, and `termIndex` caps at
`totalTerms`, so a student who finishes the entire session never sees the bar full. Refines round
4/5's "0% for all of term 1" finding — this round found the ceiling has the same gap.

### 7. Summary's "all clean passes" branch remains confirmed unreachable, now tied to undisclosed raw literals
critic-system reconfirmed the same dead branch found in every prior round, and additionally traced
that `SummaryCard`'s two undisclosed raw literals (finding 4) only ever render on this unreachable
branch — meaning they're also unverifiable by rendering, compounding the two issues.

---

## Blind spots, per critic

- **critic-system:** same real-device-chrome and Web Speech API limitations as every prior round.
  Spot-checked rather than exhaustively diffed the ~250 CSS custom properties against every
  rendered element — flagged that more un-tokened literals may exist beyond the ones self-disclosed
  in comments. Reviewed a working tree with several files mid-edit; a later commit could differ.
- **critic-craft:** same real-device-chrome limitation. Did not independently verify the
  `allUnaided` Summary branch through real play (would require three genuinely clean passes in one
  session, not offered by the current mock scripts). Noted the Next.js dev-mode indicator appears
  in every screenshot and did not penalize Craft for it, since it won't exist in a production
  build — but couldn't confirm that against dev-server-only renders.
- **critic-ux:** no real screen reader test — DOM-level `aria-live`/role/focus checks only. No
  physical device/microphone. Didn't isolate a clean background sample to compute a definitive
  non-text (3:1) contrast ratio for focus-visible outlines — flagged as a minor gap, not a
  confirmed failure. Didn't combinatorially test every Result query-param permutation.

## critic-ambition's read (informational only — not part of the total)

**Ambition: 4/10**, down from 5. Findings:

- **Mascot still goes flat or absent exactly where stakes are highest** — no `MascotSlot` at all on
  partial/fail1/fail2, generic `standby` on revealed/skipped, same as every prior round's ambition
  read. `confused`/`sad`/`determined`/`overIt` remain real, unused assets.
- **The earned-pass moment ("the point of the feature") caps at the same size as an ordinary
  pass** — `size="3XL"`/`"4XL"` exist, wired, unused; the project already escalated XL→2XL once for
  legibility, the same logic would justify one more step specifically for the earned case.
- **`ProgressIndicator`'s `Coral` variant is defined and unused** — `TopBar` hardcodes
  `variant="Primary"` always. Flagged as a weaker, riskier proposal (could read as a regression
  mid-session) rather than an endorsed fix.

Ambition's blind spot: proposals weren't rendered — flagged specifically that a mascot added to
fail1/fail2's already-tight `HintSheet` layout (no space currently reserved for one) needs a
skeptical second look before treating it as safe, not just as an unused prop.
