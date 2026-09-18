# SPEC.md

## What we're building

A mocked voice recall loop for Knowunity: a student explains 3 revision terms back in their own words, by voice or text, and Knowie replies with pass, partial, or fail. This prototype **is the Next.js app in this repo** (`app/`) — every screen below is a real page with its own route, reached by clicking through the app like a real product, not a Storybook composition. Storybook (`components/`) stays the component catalog; nothing in `app/` invents a new visual pattern that isn't already a Storybook component.

Every component named below was checked against the live library via the `storybook` MCP's `docs-list` tool on 2026-09-17 — each one listed here has a real, existing entry (component name in backticks matches a `docs-list` heading exactly). None are invented or assumed.

---

## Screen list, build order (cheapest/most-certain first)

Build order here is deliberately **not** the same as the student's flow order (that's in each screen's "Leads to"). It's ordered so the first screen you build is the one with the fewest components, the least undecided content, and a real Figma source — so if something doesn't fit together, you find out on the cheapest possible screen, not on the most load-bearing one.

State shared across all of these lives in one session-level store (a reducer/context, per the "one explicit state machine" decision) — each page reads from it and dispatches to it rather than holding its own parallel copy of loop state.

### 1. Processing — `app/recall/processing/page.tsx`
*Built first: only 2 components, zero interaction, zero copy to write, real Figma source. The cheapest possible test that `MascotSlot` and `SkeletonLines` actually sit together the way the design shows.*
- **States:** single state, fixed ~1.5–2s timer (per this session's decision) before auto-advancing.
- **Components:** `SkeletonLines`, `MascotSlot`.
- **What the student can do:** nothing — no controls, matches `sprint-context.md`'s "working state keeps full length... not a spinner" decision.
- **Leads to:** Result, automatically, once the mock verdict for this attempt resolves.
- **Figma:** node `15686:7712`, "3 Working, never blank."

### 2. Mic permission primer (also this loop's first-run intro) — `app/recall/permission/page.tsx`
*Built second: same low component count as Processing, but adds the first real branching (two buttons, two destinations) and a real Figma source, so it's the cheapest place to test routing between two pages.*

**This screen does double duty as the brief's F5 "first encounter" intro.** `voice-ux.md` says so explicitly, twice: "that screen *is* your primer" (Principle 3) and again in "How this connects back to the brief" ("F5 (first-encounter intro): that screen *is* your permission primer"). An earlier draft of this file listed Intro as its own separate screen before Choice — that was wrong per voice-ux.md's own wording and has been merged in here instead. The screen's copy now explains *why* speaking out loud helps ("Saying an answer out loud helps it stick better than just reading it back") alongside the mic ask itself, not just the mechanic.
- **States:** single static state.
- **Components:** `MascotSlot`, plain title/caption text, `ButtonGroup` (variant=Vertical, size=L) with a Primary "Allow microphone" and Tertiary "Not now".
- **What the student can do:** tap Allow (triggers the real browser permission prompt) or Not now.
- **Leads to:**
  - Allow + granted → Choice (speak or write), pre-selected toward voice.
  - Allow + denied, or Not now → Permission denied.
- **Figma:** node `15740:10202`, "12 Mic permission primer" (drafted this session, plain-text version after the Pro-card fix — see Out of scope note on the `pro` card below; copy updated again to fold in the intro/why-it-works content).

### 3. Permission denied → text — `app/recall/permission/denied/page.tsx`
*Same shape and component set as screen 2 — building it right after means you're reusing a pattern you just proved works, not inventing a new one.*
- **States:** single static state.
- **Components:** `MascotSlot`, plain title/caption text, `ButtonGroup` (Vertical, L) with Primary "Continue by typing" and Tertiary "Open Settings".
- **What the student can do:** continue into the text path, or attempt to open OS settings.
- **Leads to:** Choice (speak or write), pre-selected toward text — since denied routes into typing per `sprint-context.md`, the choice step still runs so the student sees committed state, not silently skipped.
- **Figma:** node `15740:10221`, "13 Permission denied to text."

### 4. Choice: speak or write — `app/recall/choice/page.tsx`
*First screen with real selection state (`ChoiceRow`'s Default/Selected), still small and fully Figma-backed.*
- **States:** single static state (Default / Selected per `ChoiceRow`'s own two states).
- **Components:** `MascotSlot`, `TextBlock` (title + caption for the term-1 prompt), `ChoiceRow` ×2 (Speak / Write), `Button` (Tertiary, "Skip for now").
- **What the student can do:** pick Speak or Write (sets the session's input mode, chosen once at the boundary per `sprint-context.md` — not re-asked per term), or skip term 1 outright.
- **Leads to:** Answer (in the chosen mode) for term 1, or Result (Skipped) if skipped.
- **Figma:** node `15686:7611`, "1 Two equal ways: speak or type."

### 5. Answer — text mode — `app/recall/answer/page.tsx`
*Built before voice mode on purpose: `TextField` has no external dependency, unlike voice's Web Speech API question (see Open). Get the screen's shell, skip logic, and submit-to-Processing flow working on the simpler mode first.*
- **States:** `Default` → focused/typing (`TextField`'s own Focused/Filled) → submit.
- **Components:** `TextField` (Default/Focused/Filled), `Chips` (term counter), `MascotSlot`, `Button` (Tertiary, "Skip for now"), a "switch to speaking" text link (per `sprint-context.md`'s locked mid-loop label).
- **What the student can do:** type and send; switch to voice mode mid-term; skip the term.
- **Leads to:** Processing (on send), Answer — voice mode (on switch), Result (Skipped) (on skip).
- **Figma:** node `15686:7972`, "10 Switch to typing any time."

### 6. Answer — voice mode — same route, `Listening` state
*Same route as screen 5, added once the shell is proven. This is where the Web Speech API spike result (Open) actually gets consumed — build this after the spike, not before.*
- **States:** `Default` (idle, mic ready) → `Listening` → submit.
- **Components:** `RecordingControls` (components/MicButton/RecordingControls.tsx — pairs `MicButton` with a Tertiary `ButtonIcon` cancel action), `Chips`, `MascotSlot`, `Button` (Tertiary, "Skip for now"), "switch to typing" link.
- **What the student can do:** record and send; cancel and re-record (free — doesn't consume a hint-ladder attempt, per this session's decision); switch to text mode; skip the term.
- **Leads to:** Processing (on send), Answer — text mode (on switch), Result (Skipped) (on skip).
- **Figma:** nodes `15686:7676` ("2 Answers by voice or text") and `15686:7936` ("9 Say it back..." reuses the same pattern).

### 7. Say it back — `app/recall/say-it-back/page.tsx`
*Same components as screen 6 (it's the same recording pattern with a different exit condition), so it's cheap once 6 exists — but it depends on Result existing to be reachable, hence built after.*
- **States:** same shape as Answer's voice mode (`Default` → `Listening` → submit), offered only after a hinted pass or a Revealed result.
- **Components:** `RecordingControls`, `MascotSlot`, plain title/caption text for the "repeat it and it becomes a pass" locked copy.
- **What the student can do:** record an unaided repeat, or decline and move on.
- **Leads to:** Result, either upgraded to unaided (on a clean repeat) or unchanged (on a miss — per this session's decision, a miss here doesn't re-loop, the prior result just stands).
- **Figma:** node `15686:7936`, "9 Say it back to upgrade a miss."

### 8. Result & recovery — `app/recall/result/page.tsx`
*Built second-to-last: the most states (5) and the most branching of any screen, so it's cheapest to build once every screen it can lead to or receive from (Answer, Say it back, Processing) already exists and works.*
- **States:** `Pass`, `Partial`, `Fail` (first miss → hint 1), `Fail` (second miss → hint 2), `Revealed`. One route, state driven by the term's position in the session store — same pattern as any Storybook component with multiple states (e.g. `MicButton`).
- **Components:** `ResultRow` (components/SummaryCard/ResultRow.tsx, including the `Partial` state added this session), `Chips`, `Button` (Primary "Continue"/"Next", Secondary "Say it back" where offered, Tertiary "Skip"), transcript display (real text for both voice and text input, per this session's decision — voice transcript depends on the Web Speech API spike, see Open).
- **What the student can do:**
  - Pass → continue to the next term (or Summary if this was the last term).
  - Partial/first Fail → see the pre-written hint, re-attempt.
  - Second Fail → see the second hint, re-attempt.
  - Still missed after both attempts → Revealed, with the answer shown and an optional "say it back" offer.
  - Skip is available from any of these states.
- **Leads to:** Answer (same term, re-attempt), Say it back, Answer for the next term, or Summary.
- **Figma:** nodes `15686:7740` (4 pass), `15686:7769` (5 pass 2nd round), `15686:7800` (6 partial), `15686:7842` (7 Fail), `15686:7906` (8 reveal).

### 9. Session summary — `app/recall/summary/page.tsx`
*Built last: it needs the full 3-term history to have anything real to show, so there's nothing to build against until every other screen produces that history correctly.*
- **States:** single state, content driven by the full 3-term result history.
- **Components:** `SummaryCard` (components/SummaryCard/SummaryCard.tsx), `ResultRowGroup`, `StatusRow` (per-term chips: Green Unaided / Blue Hinted / Coral Revealed / Neutral Skipped), `ButtonGroup` (Vertical, L: Primary "Continue", Secondary "Try again").
- **What the student can do:** read the per-term breakdown and the honesty-scaled summary copy (tone matches the real unaided/hinted/revealed mix, per this session's decision), tap Continue or Try again.
- **Leads to:** a placeholder "exam plan" screen (Continue, dead-end per this session's decision) or a fresh session at Choice (Try again).
- **Figma:** node `15686:8004`, "11 Session summary."

---

## Explicitly out of scope

- Real speech-to-text or a real judge — every verdict, hint, and (pending the Open item below) possibly the transcript itself is mocked/pre-scripted.
- Knowie speaking (voice in, text out only); tutoring or follow-up conversation; auto-detection of when the student stops talking; pause/resume inside one take.
- Light mode, tablet, desktop, Android, any width but 390px.
- Native haptics, permission sheets, navigation transitions.
- Mic busy on a call, language switch mid-answer — known gaps, not designed (per `voice-ux.md`/`sprint-context.md`).
- Noisy/garbled transcript, judge timeout, dropped network — cut this session: there's no real network round-trip in a mocked prototype for any of these to simulate.
- Real progress persistence (save/resume) — a closed tab loses all session state; noted as a known gap, not built.
- Real routing/scope beyond the recall loop itself — "Continue" from Summary dead-ends to a placeholder screen, not a real exam-plan app.
- The gold `pro.onBold`/`pro.accent` bordered card seen on Figma's "8 reveal" screen (node `15686:7927`, "Definition") — that's Pro-subscription-only styling per `design-system.md` rule 12, and must never be reused for Result, the permission screens, or anywhere else in this loop.

## How the mocked recall behaves

- **Verdicts are pre-scripted per term**, not random and not keyword-matched — each of the 3 terms has an authored sequence (e.g. term 2 = miss → hint → partial → reveal) baked into its mock data, so every path (including the full hint ladder) is reliably demoable.
- **Transcript**: intended to be the student's real speech/typed text, verbatim — for typing this is free (it's just the input value); for voice this depends on real browser speech-to-text (Web Speech API), which is **not yet confirmed to work on iOS Safari** (see Open).
- **Processing delay**: fixed at roughly 1.5–2 seconds, not randomized or tied to input length.
- **Text and voice use an identical mock judging path** — no separate, easier logic for typed answers, per the "voice and text are peers" decision in `sprint-context.md`.
- **Hint ladder**: the full kickoff-spec depth — hint → re-attempt → second hint → re-attempt → reveal. Each hint is a pre-written, term-specific partial-credit nudge, not generic or generated.
- **Cancel & re-record** (via `RecordingControls`) is free — it does not consume a hint-ladder attempt.
- **Say it back**: offered only after a hinted pass or a reveal; a miss on it does not upgrade the result and does not re-loop.
- **XP**: flat per term attempted, plus a bonus for unaided passes; skipping a term earns zero XP.
- **Scoring parity**: a term answered by text after a permission denial scores identically to voice — no penalty for the forced switch.

## Open (undecided — not picked here)

- **Web Speech API on iOS Safari**: unverified. The plan is to spike it before building screen 6 (Answer — voice mode); if it doesn't work, transcript falls back to a placeholder-per-term instead of the student's real words. Blocks finalizing screens 6, 7, and the transcript display in screen 8.
- **Permission model**: whether microphone access (`getUserMedia`) and speech-recognition access are actually gated by the same browser permission prompt, or two separate ones, is unconfirmed on the target platform. This could change screens 2–3's logic (single gate vs. two).
- ~~**Intro screen design**: no Figma source exists for it yet~~ — resolved: Intro was never its own screen per `voice-ux.md` (see screen 2's note). Closed, not open.
- **Progress indicator mapping**: decided to track term-level progress only (0/33/66/100 via the existing 5-step `ProgressIndicator`), but this means the bar won't move during a term's hint/retry cycle — not revisited since first raised.

## Verification: how to check this is done and correct, end to end

Every step below is a command to run or a script to execute — not a claim to take on faith.

1. **Types and build compile clean:**
   ```
   npm run lint
   npm run build
   ```
   A missing/misspelled component import, a prop that doesn't exist, or a broken route fails one of these two commands. Both must exit 0.

2. **Every component named in this file actually exists in the library:**
   ```
   npm run storybook
   ```
   then, with Storybook running, call the `storybook` MCP's `docs-list` tool and diff its output against every backticked component name in this file's screen list. Any name in this file not present in that output is a bug in this spec, not the code.

3. **Component-level tests and accessibility, machine-run:**
   ```
   npx vitest run
   ```
   This runs every Storybook story's test + a11y checks (via `@storybook/addon-vitest`) headlessly, including `RecordingControls` and `ResultRow`'s `Partial` state added this session. Must exit 0 with zero failing stories.

4. **Screen-by-screen walkthrough, scripted, not narrated.** Write this as a Playwright script (`playwright` is already a devDependency) hitting the running `npm run dev` server, asserting on real DOM content at each step — not a manual click-through described in prose. At minimum, assert:
   - `/recall/permission` → click "Allow microphone" → URL becomes `/recall/choice`.
   - `/recall/permission` → click "Not now" → URL becomes `/recall/permission/denied`.
   - `/recall/permission/denied` → click "Continue by typing" → URL becomes `/recall/choice`, and the page's chosen-mode state is `text` (assert whichever DOM signal reflects that, e.g. `ChoiceRow`'s Write instance has `showSelected=True`).
   - `/recall/answer` (voice mode, term 1) → click cancel on `RecordingControls` while Listening → assert the mic resets to `Default` and the session store's attempt-count for term 1 is unchanged (0).
   - Complete term 1 through a full pre-scripted miss → hint → retry → second hint → retry → reveal path → assert the Result screen reaches its `Revealed` state and a "Say it back" control is present.
   - Skip from `/recall/choice`, from `/recall/answer`, and from a hinted Result → assert each lands on the next term's `/recall/answer` (or `/recall/summary` if it was term 3), and assert that term's XP contribution is 0.
   - After all 3 terms: assert `/recall/summary` renders exactly 3 `StatusRow`/`ResultRowGroup` entries, and each entry's status (Unaided/Hinted/Revealed/Skipped) matches what the script above actually drove that term through — including a term where Say it back was used and should show Unaided, not Hinted.
   This script is the actual deliverable for this step — running it and getting a green result is the check, not reading this list.

5. **Static audit for token/rule violations, grep-able:**
   ```
   grep -rn "pro-accent\|pro-on-bold\|pro-bold\|pro-subtle" app/recall/
   grep -rnE "#[0-9a-fA-F]{3,8}\b" app/recall/
   grep -rnE "[0-9]+px" app/recall/ | grep -v "var(--"
   ```
   All three must return no matches. The first catches a `pro` token leaking into the recall loop; the second and third catch a raw hex or raw pixel value that should have been a token instead.

6. **Content sign-off, not automatable:** the 3 terms' mock scripts (prompts, hints, transcripts, verdict sequences) get reviewed and approved by you before they're treated as final — this one step in this list is deliberately a human checkpoint, not a script, because it's a content decision, not a correctness check.
