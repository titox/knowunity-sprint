---
name: build-screen
description: "Use when building or editing any screen in this voice-recall-loop prototype -- triggers on 'build [screen name]', 'build the X screen', or any request to implement, wire up, or fix a page under app/recall/**. Applies to new screens and to changes on an already-built screen. Does NOT apply to Storybook component work with no screen attached -- that's the component library, not a screen."
---

# Build a screen for the recall-loop prototype

A screen in this project is a page in `app/`, at its own route, reached by
clicking from the screen before it. Storybook is the component catalog,
not the product -- a screen that only exists as a Storybook story is not
built. If you're tempted to call something "done" because it has a story,
it isn't; it needs a route under `app/recall/**` that a click can land on.

## Method

### 1. Read SPEC.md for this screen

Find this screen's entry in SPEC.md. Pull its states, its components, what
the student can do, and where each action leads. SPEC.md is the plan; this
skill is how you execute one entry from it. If the screen isn't in
SPEC.md at all, stop and say so -- don't invent a screen that was never
planned.

### 2. Check whether this screen has a Figma frame

Some screens in this flow have a real Figma frame; some don't (SPEC.md
says which, and flags the undesigned ones under "Open"). This changes
what "done" means for this screen -- see the two closing branches below.
Don't assume either way; check.

### 3. Query the Storybook MCP for every component you'll use

Never assume a prop exists. For each component named in SPEC.md's entry
for this screen, call `docs-list` / `docs-show` and confirm the exact
prop names, types, and valid values before writing the page. If a prop
SPEC.md implies isn't actually there -- this has already happened once in
this project (`ButtonGroup`'s Vertical variant has no Tertiary slot,
despite Figma and an earlier SPEC.md draft assuming one) -- don't silently
paper over it. Use what the component actually supports, and note the
mismatch in your final report for this screen.

### 4. Compose only from what's in Storybook

Storybook is the only place to look for something to reuse. Most of the
Figma component library was never built in code, so "it's in Figma" is
not a reason to assume it exists here -- check Storybook, not Figma, for
what you can reuse.

### 5. When something you need isn't in Storybook

Build it inline inside the screen, from tokens only, and add one line to
`component-gaps.md` (repo root; create it if it doesn't exist) naming what
it was and which screen needed it. Don't stop and ask about it.

**Exception:** if that same gap is already on the list from a different
screen, this is now a repeated need -- build it properly this time, as a
real component under `components/` with its own story, the same way every
other component in this library was built (tokens only, every state, a
story per state). Then use that component here instead of another inline
copy.

### 6. Every value comes from the generated tokens

No raw hex, no raw pixel number, anywhere in the screen. If a value the
screen needs isn't in `tokens/tokens.json`, that's a stop-and-ask case
(per CLAUDE.md's hard rule), not a build-around -- this is the one place
in this method where you don't proceed without checking with the user
first, because inventing a token value is explicitly forbidden project-wide.

### 7. Mobile only, 390px, dark mode

No breakpoints, no light mode. If the root layout doesn't yet enforce
this (check `app/layout.tsx`/`app/globals.css` before assuming it does),
the screen itself still has to render correctly at 390px in dark mode --
force it locally on the page if the root doesn't guarantee it yet.

### 8. Build every state listed for the screen, including the failure ones

If SPEC.md lists five states for this screen, build five, not the happy
path plus a promise. A miss, a denial, a skip, a cancel -- these are not
optional polish, they're listed states.

### 9. Every action goes where SPEC.md says it goes

Wire every button/action to its real destination per SPEC.md's "leads to"
line for this screen. Where that destination is a screen that hasn't been
built yet, still route to its real path (it'll 404 until that screen
exists -- that's expected, not a bug, given the build order in SPEC.md).
A button that does nothing means the screen isn't finished, even if
everything else about it looks right.

---

## Closing the loop

**If the screen has a Figma frame:** match it. When you're done, list
every difference between what you built and the frame -- including small
ones. Silence on a difference reads as "there were none," so don't leave
one out because it seemed minor.

**If the screen has no Figma frame:** read the design brief and the
voice-UX reference (listed in CLAUDE.md's file map -- `01_Design_Brief_*.md`
and `03_Voice_UX_Reference_*.md`) for how this state should behave, and
build from those.
When you're done, tell the user what you had to decide that wasn't
written down anywhere -- copy, layout, an interaction detail, a mascot
expression, whichever judgment calls you made. Don't bury them in the
diff; name them plainly.
