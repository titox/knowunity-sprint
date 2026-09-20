# Scorecard 01 — recall-loop prototype (round 4)

Graded against `eval/rubric.md`. Four critics ran blind, in separate contexts, each seeing only
the screen list and its own rubric dimensions — no critic saw another critic's output, and none
were shown any prior scorecard. A separate render/diff pass (mine, not a rubric critic) rendered
every reachable state of all 9 screens at 390×844/dark mode first and diffed screenshots within
each screen, before any critic ran.

This is round 4, after three rounds of fixes. Round 3's own hard gate (declining Say-it-back after
an already-earned pass silently erased it) is now confirmed fixed by live interaction, not just
re-asserted — see below. But **two different hard gates fail this round**, both newly surfaced by
measurement no prior round performed: raw hex shipping as `document.body`'s real computed
background/text color (never caught before because `check:tokens` only scans `.ts`/`.tsx`, never
`.css`), and a measured sub-4.5:1 contrast failure on the Neutral/Skipped status chip, confirmed
independently by two critics.

## Render/diff pass — no identical-render pairs found

13 must-differ pairs were rendered and pixel-diffed across all 9 screens (fail1 vs fail2, clean vs
hinted vs earned pass, Default vs Filled vs Error, mic Default vs Listening, Choice's three
selection states, permission-denied's help toggle, and Processing at two time offsets 600ms apart
to confirm the skeleton actually animates). All 13 pairs differed — this round's identical-render
hard gate holds, and the skeleton-animation fix from the last round of code changes is confirmed
live (bbox diff of 17,714px between the two Processing frames).

One structural finding from this same pass, independently confirmed by two critics below:
**Summary's "all clean passes" `SummaryCard` hero branch (`app/recall/summary/page.tsx:69-80`) is
mathematically unreachable through any real playthrough.** `app/recall/terms.ts`'s fixed mock
scripts force term 2 through `partial → fail1 → fail2` (always ends `revealed`) and term 3 through
`fail1 → pass` (always ends `hinted`) — no sequence of real clicks can ever produce three `unaided`
outcomes in the same session. The branch only renders if session state is hand-edited. This
upgrades last round's "unverified, ran out of budget" note to a confirmed dead code path.

## What's confirmed still fixed (verified independently, live, not just re-asserted)

- **The round-3 hard gate holds.** critic-ux live-tested Say-it-back's "Not now" from a hinted
  pass and confirmed it restores `state=pass&attemptIndex=1`, not a hardcoded fallback — the
  earned/hinted pass is no longer silently erased.
- **Both round-2 touch-target fixes hold**, plus the round-3 caption-size and bottom-padding
  fixes — critic-ux and critic-craft independently measured every interactive element across all
  9 screens at ≥44pt (mic 124×124, buttons 48–56px tall, TopBar close 48×48).
- **Processing's skeleton now genuinely animates** (critic-craft: 5 distinct screenshot hashes
  over a 1.75s wait) **and correctly stops under `prefers-reduced-motion: reduce`** (critic-ux:
  `animationName: none` confirmed under that media query).
- **Clean/hinted/earned pass are visually distinct**, not just differently labeled — critic-craft
  MD5-hashed the mascot crop on all three and confirmed `excited` (pass0/pass1) vs `approving`
  (upgraded) are genuinely different assets, plus the "You got there." copy only on the earned
  case.
- **Bottom-pinned action rhythm is consistent**: critic-craft measured the last-button-to-edge gap
  at exactly 64.0px on 11 of 12 screens checked; the 92.0px on the three hint-sheet states is a
  deliberate, architecturally distinct pattern (`space-700` vs `space-1600`), not drift.

## Hard gate: FAILS — raw hex ships as the real page background/text color

> "No raw hex value appears in rendered component output."

critic-system measured `getComputedStyle(document.body)` live and got `background-color:
rgb(10, 10, 10)` / `color: rgb(237, 237, 237)` — exact matches for the stock create-next-app
`#0a0a0a`/`#ededed` values still sitting in `app/globals.css:5-12`'s `:root` and
`@media (prefers-color-scheme: dark)` blocks. Neither value matches this project's real tokens
(`background.page` = `#090c18`, `text.primary` = `#f4f2ff`) — they're leftover starter values, not
even a coincidental match. `RecallScreenShell` paints its own `var(--color-background-page)` div
on top on every screen, which is why this doesn't show in a static screenshot — but it's still the
real, live background/text color of `<body>`, and would show on iOS elastic overscroll or any gap
the shell doesn't cover.

**Why `npm run check:tokens` missed this across every round**: its grep only targets
`--include="*.ts" --include="*.tsx"` (`package.json:17`) — it has never scanned `.css` files, so
this exact violation was invisible to the project's own automated gate from round 1 onward.

**Fix:** delete the stock `:root`/dark-media-query block in `globals.css`; set
`body { background: var(--color-background-page); color: var(--color-text-primary); }` directly.
Widen `check:tokens`'s grep to `--include="*.css"` so this class of regression can't recur
silently.

## Hard gate: FAILS — Neutral/Skipped chip measures below 4.5:1

> "Body text contrast is at least 4.5:1 against its real rendered background."

Two critics independently measured the same failure by different methods and converged on the
same number:

- critic-ux pixel-sampled the rendered "Skipped" chip on `/recall/summary` (reached via real
  Choice → Skip, not URL-editing): darkest sampled pixel `rgb(50,51,55)`, lightest
  `rgb(143,142,150)` → **3.89:1**.
- critic-craft independently sampled the same chip and got **3.89:1** from pixels, cross-checked
  against token math (**3.92:1**) — `--color-text-tertiary` over the nested
  `background-floating`/`interactive-secondary`/`background-page` stack.

Root cause: `components/StatusRow/StatusRow.tsx:79` always renders `<Chips ... active={false} />`
for the Neutral case, and `components/Chips/Chips.tsx:106-109` defines `Neutral.inactive` as
`{ bg: background-floating, text: text-tertiary }` — the one status color (of the locked
Green/Blue/Coral/Neutral vocabulary) with no higher-contrast tier available to it. The other three
chip colors all measured comfortably above gate (6.9–9.2:1 per critic-craft's Coherence sampling).

A second, narrower contrast finding from critic-craft: the **TextField placeholder** ("Type your
answer") has no styled `::placeholder` rule anywhere in the codebase (grep confirmed), so it
renders in Chrome's unstyled UA default gray — measured **3.68:1** against the input's real
background, on the Default state of every text-mode Answer screen.
A third, passing-but-fragile case: critic-ux measured permission/denied's "Settings → Safari →
Microphone" helper line at **4.59:1** — clears the gate by 0.09, worth tightening rather than
trusting.

**Fix:** raise `Neutral.inactive.text` to `text-secondary` (computes ~7.2:1) in `Chips.tsx`; add an
explicit `color: var(--color-text-tertiary)` (or whichever token Figma specifies)
`::placeholder` rule to `TextField.tsx`.

## Touch-target hard gate: PASSES

Confirmed by both critic-ux and critic-craft, independently, via `getBoundingClientRect()` on
every interactive element across all 9 screens and every documented sub-state — nothing measured
below 44pt.

## Weighted total: 6.6 / 10 — overridden by the two hard gates above

| Dimension | Priority | Weight | Score /10 | Weighted | Critic |
|---|---|---|---|---|---|
| System fidelity | High | 3 | 6 | 18 | critic-system |
| Coherence | High | 3 | 7 | 21 | critic-craft |
| Craft | High | 3 | 7 | 21 | critic-craft |
| UX judgment | High | 3 | 7 | 21 | critic-ux |
| Accessibility | Medium | 2 | 5 | 10 | critic-ux |
| Structure | Low | 1 | 8 | 8 | critic-system |
| **Total** | | **15** | | **99 → 6.6** | |

Up from 5.8/10 last round on the raw weighted math, but per the rubric's own rule the two failed
hard gates above override this regardless of how the six dimensions scored.

---

## Findings, most severe first

### 1. Keyboard/switch-control students can never select Speak or Write — a real trap, found through interaction
`components/ChoiceRow/ChoiceRow.tsx:18-33` is a plain `<div onClick={onClick}>` with no
`role="button"`, `tabIndex`, or `onKeyDown`. critic-ux confirmed live via real Tab-order testing:
from page load, Tab goes Close → "Skip for now" → out of the app — the Speak and Write rows are
never focused and have no accessible name or role. Choice is the mode-selection gate for the
entire feature; a keyboard-only or switch-control student can never reach it and can only ever hit
Skip, every term, forever. This directly contradicts `sprint-context.md`'s "no required action may
trap the student" and Voice UX Principle 5.
**Fix:** render a real `<button>` (the exact pattern already used correctly in `Button`/
`ButtonIcon`/`MicButton`), or add `role="button" tabIndex={0}` plus an `onKeyDown` handler for
Enter/Space.

### 2. Raw hex ships as `document.body`'s real background/text color — hard gate
See "Hard gate: FAILS — raw hex" above. `app/globals.css`'s stock `:root` block, invisible to
`check:tokens` because it never scans `.css`.

### 3. Neutral/Skipped status chip fails contrast — hard gate
See "Hard gate: FAILS — contrast" above. Confirmed independently by two critics at the same
~3.89:1 reading; TextField's unstyled placeholder is a second, separate sub-4.5:1 instance.

### 4. Permission-denied's "continue by typing" doesn't actually stick — a locked decision leaks through, reproduced live
critic-craft reproduced this by real interaction: `/recall/permission/denied` → "Continue by
typing" → lands on `/recall/choice`, which still renders "Speak" as a fully live option — tapping
it goes straight into a working, fully-animated Listening state with no gate at all.
`session-context.tsx` has no field recording that mic access was denied, so nothing downstream can
suppress or route around the Speak option. This is the rubric's own Coherence-6 example ("a locked
decision leaks through unenforced") reproduced through real play, not inferred from source.
**Fix:** add a `micDenied` flag to `SessionState`, set it in `permission/page.tsx`'s `handleAllow`
catch and `handleNotNow`, and have Choice hide/disable Speak (or force `mode=text`) when it's set.

### 5. Choice's `showSelected` confirmation state is real in code but never observed in practice — found by two critics independently
`app/recall/choice/page.tsx:23-31` calls `setSelected(mode)` and `router.push(...)` in the same
synchronous handler. Both critic-craft (screenshot pairs pixel-identical to pre-click under normal
speed; only captured via 6× CPU throttling) and critic-ux (timed the navigation at ~50ms)
confirmed the checkmark+border selected state never gets a perceivable frame on screen before the
route changes — `ChoiceRow`'s one documented boolean prop effectively goes unused in the real
product.
**Fix:** hold the `showSelected` paint for one tick (`requestAnimationFrame` or a short delay)
before navigating.

### 6. Result's partial/fail1/fail2 states drop the mascot entirely (critic-ambition, informational)
Pass, revealed, and skipped all render a `MascotSlot`; the three struggle states render only the
prompt card and `HintSheet`. `MascotExpression` already lists `confused`/`sad`/`overIt` with
matching assets shipped in `public/`, unused anywhere in `app/`. The mascot disappearing exactly
when a student is struggling runs against the "generous judging" voice-UX principle. Zero new
tokens or components required to fix.

### 7. `border-width: 1px` remains a raw, uncatalogued literal — same class flagged before, still open
`tokens/tokens.json`'s `border` group only defines colors, never a stroke-width token
(`Button.tsx:149`, `ButtonIcon.tsx:89`, `MicButton.tsx:68`, `TextField.tsx:104`,
`ChoiceRow.tsx:44`, `StatusRow.tsx:60`). Per CLAUDE.md's hard rule ("never invent a value not in
`tokens/tokens.json`... stop and ask"), this needs your decision on the value before anyone
touches it — not a silent fix.

### 8. Summary's "all clean passes" branch is confirmed unreachable through real play
See "Render/diff pass" above — independently confirmed by critic-system and critic-craft as well.
Not a rendering bug (nothing crashes if reached artificially) but a confirmed dead branch given
the current mock scripts in `terms.ts`.

### 9. Uniform empty-space layout pattern across every screen (critic-ambition, informational)
Every screen shares one shape — content top, a `flex:1` spacer eating roughly half the 844px
viewport, bottom actions — which is coherent (a real strength) but also the same safe default
under the "point of the feature" earned-pass moment as under a neutral permission screen. Paired
with finding #6, a larger mascot on the struggle states (2XL, already proven safe on the pass
state) would use that space rather than leave it inert everywhere.

---

## Blind spots, per critic

- **critic-system:** cannot certify "no clipping under real device chrome" (Safari's collapsing
  bottom toolbar) from headless Chromium, where `env(safe-area-inset-bottom)` always resolves to
  0 — Structure capped at 8, not 9, specifically for this reason. Did not exercise real Web Speech
  API behavior. Did not judge whether individual token *choices* (e.g. partial vs error feedback
  color) are the right semantic fit — only that they trace to a real token.
- **critic-craft:** same `env()`-always-0 limitation for the safe-area fix. Did not test with
  `prefers-reduced-motion: reduce` enabled (only confirmed the animation exists under default
  motion). Real `webkitSpeechRecognition` behavior on an actual iPhone unconfirmed. Did not
  enumerate the full combinatorial space of Summary outcomes (covered clean/forced-reveal/hinted,
  all-skipped, and one mixed path; not every permutation).
- **critic-ux:** no real VoiceOver/TalkBack pass (the ChoiceRow finding rests on computed
  `role`/`tabIndex`/keyboard-Tab order, a strong signal but not a live screen-reader test). No
  physical device/microphone test — permission-grant path used Playwright's fake-media-device
  flags. No color-vision-deficiency simulation on the Green/Blue/Coral trio. Sampled contrast at
  targeted coordinates rather than exhaustively scanning every pixel of every screen; did not
  drive into any Disabled state (none is reachable through this flow's own interactions).

## critic-ambition's read (informational only — not part of the total)

**Ambition: 5/10.** Findings folded into #6 and #9 above. Positive counter-evidence worth naming:
`addStreak(xp)` is genuinely wired end-to-end into the streak counter (confirmed via grep after
initially mis-flagging it from URL-only screenshots showing streak=0), and the pass/earned-pass
mascot split is a real, deliberate reach — not decoration, and specifically sized 2XL because XL
made the two expressions indistinguishable, per an inline comment in the code.

Ambition's blind spot: did not click through a full real play-through (URL-driven states + grep
only), so didn't visually verify the streak-increment moment itself, and didn't render its own
larger-mascot proposal against the fail1/fail2 layout to check it doesn't collide with
`HintSheet`, which already claims real bottom-anchored space on those same screens.
