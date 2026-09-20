# Scorecard 2 — recall-loop prototype (round 5)

Graded against `eval/rubric.md`. Four critics ran blind, in separate contexts, each seeing only
the screen list and its own rubric dimensions — no critic saw another critic's output, and none
were shown any prior scorecard. A separate render/diff pass (mine, not a rubric critic) rendered
every reachable state of all 9 screens at 390×844/dark mode first and diffed screenshots within
each screen, before any critic ran.

**No code changed between round 4 (`eval/scorecard-01.md`) and this round.** This scorecard was
run again at your request, on the identical codebase, purely to see how much the review itself
varies run to run. It varies more than you'd want a QA gate to vary — see "Run-to-run variance"
below before reading the scores as if they measured a code change.

## Render/diff pass — identical to round 4, as expected

Same 13 must-differ pairs, same script, same code. All 13 pairs still differ; no identical-render
hard-gate violation. Pixel-diff counts are byte-for-byte identical to round 4's run (e.g.
`processing-t0` vs `processing-t600`: 17,714px, same bbox) — confirms the two runs really are
against unchanged code, not a false-positive re-run.

## Run-to-run variance — read this before the score table

Same code, same rubric, blind fresh critics both times. What changed between round 4 and round 5:

| Dimension | Round 4 | Round 5 | Delta |
|---|---|---|---|
| System fidelity | 6 | 6 | 0 |
| Coherence | 7 | 5 | **-2** |
| Craft | 7 | 6 | -1 |
| UX judgment | 7 | 5 | **-2** |
| Accessibility | 5 | 6 | +1 |
| Structure | 8 | 8 | 0 |

Weighted total: 6.6 → 5.7. Two dimensions moved two full points on identical code. This isn't the
product getting worse — it's the ceiling on how much precision to read into any single round's
number. The two hard-gate failures (raw hex, contrast) reproduced identically both rounds, so
those are solid; the point-level dimension scores are noisier than the table format implies. Take
the numbers as "roughly here, ±1-2," not as precise measurement.

One concrete example of the noise: **critic-craft and critic-system disagreed with each other,
in this same round**, on whether Choice's `showSelected` checkmark state is ever visible to a real
user before navigation — critic-system said no (confirmed via screenshots after the click),
critic-craft said yes (confirmed via an immediate-click screenshot). Both claim to have measured
it, live, in the same codebase, in the same round. See finding 7.

## What's confirmed still fixed (verified independently, live, not just re-asserted)

- **Round-3's hard gate still holds** — no critic this round found an identical-render pair;
  Say-it-back was not specifically re-tested by name this round, but nothing contradicts round 4's
  live confirmation.
- **Touch targets remain clean** — both critic-ux and critic-craft independently measured every
  interactive element at ≥44pt again this round.
- **The component layer's token traceability is genuinely clean** — critic-system again confirmed
  every sampled component (buttons, chips, radii, font-family) resolves to a real token; the
  System fidelity score is capped by the same root-level `globals.css` issue both rounds, not by
  anything new in the component layer.
- **Fail1/fail2/partial remain genuinely distinct**, pixel-diffed by critic-craft again this round
  — different heading, copy, and button set, not a shared bucket.

## Hard gate: FAILS — raw hex ships as the real page background/text color (reconfirmed)

Identical finding to round 4, reconfirmed independently by a fresh, blind critic-system pass:
`app/globals.css:5-12`'s stock `:root`/dark-media-query block is `document.body`'s real computed
`background-color`/`color` (`rgb(10,10,10)`/`rgb(237,237,237)` — exact stock create-next-app
values, matching no real token) on every one of 24 rendered states. `npm run check:tokens` still
can't catch it — its grep still only covers `--include="*.ts" --include="*.tsx"`, never `.css`.
Same fix as round 4: point `body`'s color/background at `var(--color-background-page)`/
`var(--color-text-primary)` directly, and widen the grep to include `*.css`.

## Hard gate: FAILS — TextField placeholder contrast (reconfirmed)

critic-ux independently re-measured the same failure: `input::placeholder` has no styled rule
anywhere in the codebase, so it renders in Chromium's UA-default grey. Measured live:
`getComputedStyle(input, '::placeholder').color` = `rgb(117,117,117)` against the input's real
background `rgb(26,28,38)` → **3.68:1**, below the 4.5:1 gate. Same fix as round 4: add an
explicit `input::placeholder { color: var(--color-text-tertiary); }` rule.

**Not reconfirmed this round, but not fixed either:** round 4's other contrast finding (the
Neutral/Skipped status chip at ~3.89:1) wasn't independently re-measured by any critic this round
— none of them happened to navigate to that specific chip. Since the code is unchanged, there's no
reason to believe it's resolved; it just wasn't re-tested. Don't read its absence here as "fixed."

## Touch-target hard gate: PASSES (reconfirmed)

Both critic-ux and critic-craft measured every interactive element again this round; nothing below
44pt.

## Weighted total: 5.7 / 10 — overridden by the two hard gates above (see variance note)

| Dimension | Priority | Weight | Score /10 | Weighted | Critic |
|---|---|---|---|---|---|
| System fidelity | High | 3 | 6 | 18 | critic-system |
| Coherence | High | 3 | 5 | 15 | critic-craft |
| Craft | High | 3 | 6 | 18 | critic-craft |
| UX judgment | High | 3 | 5 | 15 | critic-ux |
| Accessibility | Medium | 2 | 6 | 12 | critic-ux |
| Structure | Low | 1 | 8 | 8 | critic-system |
| **Total** | | **15** | | **86 → 5.7** | |

---

## Findings, most severe first

### 1. Keyboard/switch-control students can never select Speak or Write (reconfirmed)
Same finding as round 4, independently re-verified: `ChoiceRow.tsx` is a plain `<div onClick>` —
no `role`, `tabIndex`, or `onKeyDown`. critic-ux pressed Tab live again this round: focus goes
Close → Skip for now → out, never landing on Speak/Write. A keyboard-only student's only reachable
action on this screen, every term, is Skip. Same fix as round 4: real `<button>`, or
`role="button" tabIndex={0}` + Enter/Space handling.

### 2. Raw hex as `document.body`'s real bg/text color — hard gate (reconfirmed)
See "Hard gate: FAILS — raw hex" above.

### 3. TextField placeholder contrast 3.68:1 — hard gate (reconfirmed)
See "Hard gate: FAILS — contrast" above.

### 4. "Continue by typing" after permission denial routes back through Choice, not into typing directly
critic-craft quotes `sprint-context.md:28` ("Denied permission routes into typing, because that is
the one dead end the loop cannot afford") and reproduced live: `/recall/permission/denied` →
"Continue by typing" → lands on `/recall/choice` — a screen that still fully offers "Speak," mic
icon and all, right after the student was just told mic access is off. Same underlying leak as
round 4's finding 4, described this round as a more direct violation of a specific locked line
rather than a missing-flag gap.
**Fix (as stated this round):** `handleContinueByTyping` should route straight to
`/recall/answer?mode=text`, not back through Choice.

### 5. Summary's "all clean passes" hero-card branch remains confirmed unreachable
Independently reconfirmed by critic-system and critic-craft this round (both traced `terms.ts`'s
fixed scripts and both completed real playthroughs landing only on the `StatusRow` branch). Same
finding as round 4's finding 8 — now confirmed across two independent rounds by three total
critics.

### 6. "Skip for now" renders at two different sizes/weights depending on which of 3 screens it's on — new this round
critic-craft measured live: text-mode Answer's "Skip for now" is 15px/weight 600/48px tall
(`app/recall/answer/page.tsx:168`, `size="M"`); voice-mode Answer's and Choice's are
21px/weight 700/56px tall (`app/recall/answer/page.tsx:311`, `app/recall/choice/page.tsx:141`,
both `size="L"`). Same label, same job, two different visual weights depending on which screen/mode
you're standing on — the rubric's own "button emphasis picked by how it looks, not by actual
importance" failure mode, localized to one control. Not flagged in round 4.
**Fix:** pick one size (`M` matches Tertiary's quiet role) and use it in all three places.

### 7. Choice's `showSelected` observability — critics disagree with each other this round
critic-system: clicking Speak/Write navigates to Answer before any paint of the selected state is
visible — confirmed unobservable via post-click screenshots. critic-craft: confirmed the checkmark
*does* paint, via an immediate-click screenshot. Both critics claim live measurement, in the same
round, on the same code. This is either a genuine race condition whose outcome depends on exact
timing/frame scheduling (plausible, given `setSelected` and `router.push` fire in the same
synchronous handler — `app/recall/choice/page.tsx:23-31`), or a methodology difference between the
two critics' screenshot timing. Worth an actual human check on a real device before trusting
either verdict alone.

### 8. Result's struggle states (partial/fail1/fail2/revealed) leave 370-440px of dead vertical space
critic-craft measured live: 372px gap between the prompt card and the hint sheet on fail1, 368px
on revealed — 44%+ of the 844px viewport. Consistent across all four sub-states (not a coherence
problem), but an unresolved rhythm decision — content orphaned at the top, actions parked at the
bottom, nothing bridging them. Echoes critic-ambition's round-4 observation about the uniform
`flex:1` spacer pattern, now with real pixel measurements.

### 9. Processing's skeleton pulse is real but easy to miss
critic-craft confirmed the animation exists (t0 vs t800 screenshots differ, consistent with round
4's finding) but describes the visual delta as small enough that "at a glance the screen reads as
frozen" — no shimmer sweep, nothing else moving. Functionally fixed, still under-delivers as a
"this is working" signal.

### 10. Clean-pass vs. earned-pass mascot difference is real but subtle
critic-craft pixel-cropped and diffed `excited.svg` vs `approving.svg`: genuinely different assets
(different eye/pupil rendering) but only ~0.98% mean image difference, concentrated in a
~45×27px region. The copy ("You got there.") carries the locked "different visuals" decision much
harder than the art does.

### 11. `border-width: 1px` remains a raw, uncatalogued literal
Same finding as round 4's finding 7, reconfirmed by critic-system again this round across the same
6 files. Still a stop-and-ask case per CLAUDE.md's hard rule — needs your decision on the value,
not a silent fix.

---

## Blind spots, per critic

- **critic-system:** cannot certify real device chrome/safe-area clearance from headless Chromium
  (`env()` always resolves to 0). Did not exercise real Web Speech API. Did not launch Storybook
  itself to cross-check every documented prop against every usage site — relied on source reads
  plus live `getComputedStyle` sampling.
- **critic-craft:** same `env()`-always-0 limitation. Did not test with `prefers-reduced-motion:
  reduce` enabled. Did not walk every possible playthrough path (e.g. alternate button choices
  mid-loop) — verified the branches the task named plus the highest-value dead-code check. Noted
  the mic's Listening pulse is a disclosed, undesigned gap (no real animation) and didn't penalize
  it for that reason.
- **critic-ux:** no real screen reader test (ChoiceRow finding rests on Tab-order/computed
  role/tabindex, a strong but not identical signal to actual AT behavior — flagged that touch-based
  screen readers might expose it differently than desktop Tab order, though activation semantics
  would still likely fail). No physical device/microphone test. Did not exhaustively screenshot-diff
  every state pair — spot-checked the states most load-bearing to UX/Accessibility.

## critic-ambition's read (informational only — not part of the total)

**Ambition: 5/10**, same as round 4. Findings this round:

- **`MascotSlot`'s wider expression range remains almost entirely unused** — `amazed`, `angry`,
  `confused`, `determined`, `giggling`, `laughing`, `overIt`, `sad` are shipped assets, never called
  anywhere in `app/recall/**`. Result's `partial`/`fail1`/`fail2` render no mascot at all (only
  `pass`, `revealed`, `skipped` do) — the hint-ladder's emotional arc is carried by heading copy and
  color alone, the rubric's own craft-4 "swapped text" pattern. Same theme as round 4's finding,
  now more specific about which states are missing it entirely.
- **New this round:** `StatusRow`'s `chipShowLeftIcon`/`chipShowRightIcon` props exist and are
  wired through, but `summary/page.tsx` never passes them — every term row on the one screen where
  four status meanings compete is color+label only, never using the icon slot the system already
  built for exactly this redundancy.
- **New this round:** `ProgressIndicator`'s `showText`/`label` props are never turned on in
  `TopBar` — the persistent chrome never states "term 2 of 3" in text anywhere, only a stepped bar.

Ambition's blind spot: read-source-only this round for its proposals (didn't render them), and
flagged that `HintSheet`'s already-tight layout on fail1/fail2 (heading + thumbs row + body +
button stack) might not have room for a larger mascot without further layout work — an `XL` size
or no mascot at all might be the only version that fits without verification.
