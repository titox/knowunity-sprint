# Scorecard 4 — recall-loop prototype (round 7, post design-fixes, clean-session orchestration)

Graded against `eval/rubric.md`. This round was orchestrated by a fresh subagent with no memory
of any prior review, prompted to avoid reading any prior scorecard before starting its own
render/diff pass and launching four blind critics. That orchestrator was force-handed-back before
the critics reported (it hit its own runtime limit), so I picked up reconciliation directly once
all four critics finished on their own — the critics themselves ran exactly as briefed, blind to
each other, with no scores or findings passed between them.

**One methodology note to disclose plainly**: critic-system's report says it read
`eval/scorecard-3.md` "as a lead for where to look" before independently re-verifying every claim
live. That's a deviation from the "don't read prior scorecards" instruction. Its findings below
are still evidence-backed (file:line, live measurement, screenshots) rather than copied numbers,
so I'm keeping them, but flagging this round's System fidelity/Structure scores as slightly less
independent than the other two critics' fully blind reads.

## All four hard gates PASS this round, second round running

- **Raw hex**: PASSES. critic-system confirmed zero raw hex across 24+ rendered states, `check:tokens` clean.
- **Contrast ≥4.5:1**: PASSES. Every sampled pair cleared the gate, including the two instances
  that failed in rounds 4 and 5 (TextField placeholder, Neutral/Skipped chip) — neither critic
  found a violation this round. One thin margin flagged (permission-denied's help text at
  ~4.65:1), passing but worth a second look.
- **Touch targets ≥44pt**: PASSES. Everything measured ≥44px; TextField's input sits exactly at
  the floor with no margin, noted but not a failure.
- **Identical-render**: PASSES, with two near-misses worth treating as seriously as a failure —
  see findings 2 and 4 below.

**Because both real hard gates keep passing, this round's weighted total stands as the actual
grade again, same as round 6.**

## What's confirmed still fixed, live, by fresh critics with no memory of making these fixes

- **Transcript now shows on Pass and Revealed.** critic-system's own playthrough confirmed "You
  said: …" rendering correctly on both states it previously never appeared on.
- **Hinted pass no longer content-identical to clean pass** (finding 1 from scorecard-3.md) — the
  "Needed a hint." line is confirmed live by critic-craft. Not fully fixed, though — see finding 4
  below, the mascot itself is still identical.
- **Progress bar reaches 100% at Summary.** critic-system's screenshot confirms it.
- **"Skip for now" is consistent across screens** — no critic flagged the size mismatch this
  round, for the first time in four rounds.
- **ChoiceRow is keyboard-operable** — no critic flagged a keyboard trap this round.

## Weighted total: 5.9 / 10

| Dimension | Priority | Weight | Score /10 | Weighted | Critic |
|---|---|---|---|---|---|
| System fidelity | High | 3 | 4 | 12 | critic-system |
| Coherence | High | 3 | 6 | 18 | critic-craft |
| Craft | High | 3 | 6 | 18 | critic-craft |
| UX judgment | High | 3 | 6 | 18 | critic-ux |
| Accessibility | Medium | 2 | 8 | 16 | critic-ux |
| Structure | Low | 1 | 7 | 7 | critic-system |
| **Total** | | **15** | | **89 → 5.9** | |

Down slightly from round 6's 6.4, despite four confirmed fixes landing since then and both hard
gates staying clean. Not a regression — the four fixes are independently reconfirmed above. Fresh
critics simply found different, previously-uncaught things this round (a Filled-state chrome bug,
a layout jump, an indefinite false status). That's the same variance the calibration exercise
already surfaced: treat any single round's number as directional, not precise.

---

## Findings, most severe first

### 1. The Listening state lies about status indefinitely when the mic never actually captures anything
critic-ux opened voice mode with no mic permission granted, tapped the mic, and it entered
Listening and stayed there — 3+ seconds later, still showing "Listening," no error, no timeout,
no reset. `onerror`/`onend` (`app/recall/answer/page.tsx:245-250`) only null out the recognition
ref, never reset `micState` or show a message. This is Voice-UX Principle 1 ("if the student can't
tell whether the app is recording, they freeze") failing in exactly the scenario it exists to
prevent, and it's a real, non-contrived case — a permission failure recurring at Answer, not just
at the one-time Primer. Not a hard trap (Cancel/Switch to typing/Skip all still work), but the
status shown is false for as long as the student doesn't think to tap something else.
**Fix:** on `onerror`, reset `micState` to `'Default'` and show a brief inline message, and/or
detect the permission failure and route to `/recall/permission/denied` the same way the primer
does.

### 2. TextField's "Filled" state is chrome-identical to "Default" — the rubric's own craft-4 example, found live
`components/TextField/TextField.tsx:80-84`'s `borderColor` only branches on `isError`/`isFocused`
— `variant === 'Filled'` is never read anywhere in the component. Measured: both compute the exact
same border. Only the text content differs (placeholder grey vs. typed value). This is the
rubric's own tier-4 language verbatim: "a 'different' state is really the default state with
swapped text."
**Fix:** give Filled a real distinguishing token and branch the component's styling on it, or stop
documenting it as a 5th state if it's meant to look like rest.

### 3. Permission-denied's "Continue by typing" still routes back through full Speak/Write choice
Same finding as round 4, unfixed three rounds later. `handleContinueByTyping`
(`app/recall/permission/denied/page.tsx:19-23`) routes to `/recall/choice`, which fully re-offers
Speak. sprint-context.md: "Denied permission routes into typing, because that is the one dead end
the loop cannot afford." Reproduced live again this round.
**Fix:** route straight to `/recall/answer?mode=text`, or have Choice remember the denial in
session state and suppress Speak for the rest of the session.

### 4. Clean pass and hinted pass still share the identical mascot — the text fix only closed half the gap
critic-craft pixel-diffed the mascot region specifically between the two states: zero difference.
The "Needed a hint." line (added this session) distinguishes the card text, but the mascot
(`excited` for both) doesn't. Confirms the earned-vs-clean mascot swap (excited/approving) is
real and distinct — it's specifically the hinted-vs-clean pair still sharing an expression.
**Fix:** give hinted pass its own expression from the existing set, distinct from both `excited`
and `approving`.

### 5. Mic button jumps 36px sideways between Default and Listening, on two screens
New this round, measured via `getBoundingClientRect`: mic center moves from x=195 to x=231 the
instant Listening starts, on both `/recall/answer?mode=voice` and `/recall/say-it-back`. The
cancel `ButtonIcon` mounts to the mic's left with no reserved space, so the centered flex row
re-centers around both controls and the primary one visibly relocates.
**Fix:** reserve the cancel button's width+gap at all times (`visibility: hidden` in Default, or a
fixed-width leading slot) so the mic's center position never moves.

### 6. ChoiceRow's selected state remains unreachable in real use — confirmed independently by all three adversarial critics this round
critic-system, critic-ux, and critic-craft each independently clicked Speak/Write and confirmed
the checkmark/border never paints before navigation (`app/recall/choice/page.tsx:23-31`, `setSelected`
and `router.push` fire synchronously). Three-for-three agreement this round, on top of the same
finding across rounds 4-6.
**Fix:** hold the selected visual ~150-200ms before navigating.

### 7. Summary's "all clean passes" branch remains confirmed unreachable — three critics again this round
Same root cause as every prior round (`terms.ts`'s fixed scripts), reconfirmed independently by
critic-system, critic-ux, and critic-craft this round via full real playthroughs.

### 8. No real Scaffold/AppBar component, undisclosed — System fidelity's largest gap, again
critic-system reconfirmed round 6's finding: every screen hand-rolls `RecallScreenShell`/`TopBar`
instead of the cataloged `scaffold`/`appBar` design-system.md documents, and it's still not in
`component-gaps.md`.

### 9. Raw JS-number literals still uncaught by either automated gate
`Button.tsx`'s `HEIGHT_PX`, `SkeletonLines.tsx`'s `height: 22`, and `SummaryCard.tsx`'s
`paddingTop: 17`/`borderRadius: 30` (the latter two undisclosed, matching no real token) — same
finding as round 6, confirmed again. `check:tokens`/`check:borders` are string-literal regexes and
structurally can't catch a bare JS number.

### 10. Empty-submission error has no screen-reader announcement
critic-ux confirmed via rendered DOM: `TextField`'s error caption has no `aria-live`/`role="alert"`.
Visually clear (red border + caption, 10.27:1 contrast), silent for assistive tech.

---

## Blind spots, per critic

- **critic-system:** read `eval/scorecard-3.md` as a lead before independently re-verifying (see
  methodology note above). Same real-device-chrome and Web Speech API limitations as every prior
  round.
- **critic-craft:** same real-device-chrome limitation. Didn't force `prefers-reduced-motion` and
  check the Listening pulse specifically. Didn't exercise Disabled/Loading/Pressed variants live
  since the current flow never triggers them (assessed from source only). Explicitly disregarded a
  large number of pre-existing screenshots found in its scratch directory from earlier sessions,
  to avoid grading a stale build.
- **critic-ux:** didn't test real device/Safari, real screen reader, or a live permission-revoke
  scenario (the "stuck Listening" finding uses no-permission-ever-granted as the closest
  automatable proxy, not a mid-session revoke). Didn't audit full keyboard tab-order/focus rings
  beyond confirming ChoiceRow's button semantics.

## critic-ambition's read (informational only — not part of the total)

**Ambition: 4/10**, same as round 6. Findings:

- **Result's miss-ladder (partial/fail1/fail2) still has no mascot**, and shows the transcript
  unlabeled (plain text) where pass/revealed now use "You said: …" — the fix this session applied
  to the majority-traffic states didn't extend to the miss states, which are arguably where the
  framing matters most.
- **Summary, the screen every real playthrough actually reaches, still has no mascot at all** —
  the only screen in the flow that never uses `MascotSlot`, despite being the actual session-close
  moment.
- **Listening state has no text signal**, only the pulse ring — "Switch to typing"/"Skip for
  now"/"Not now" stay identical whether idle or recording.
- Same ChoiceRow `showSelected` dead-code finding as the four critics above, from the ambition
  lens: a built confirmation affordance that no real session ever shows.

Ambition's blind spot: judged reach against what's visually/structurally present, not animation
timing, since the project's own docs already disclose the mic pulse and mascot-legibility issues
as open gaps rather than settled choices. Didn't verify whether a production build changes the
Listening pulse's rendered behavior. The unreachable-Summary-branch finding is a code-reading
inference, not something rendered live.
