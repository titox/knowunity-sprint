@AGENTS.md

## What this is

See `sprint-context.md` "What this is".

## Hard rules, always true

- Before writing UI code: read `design-system.md` (rules) and `tokens/tokens.json` (values) in full. Never invent a value not in `tokens/tokens.json`.
- Before writing any Next.js code: follow `AGENTS.md` (read `node_modules/next/dist/docs/`).
- 390px width, dark mode only. No light mode, no other breakpoints — see `design-system.md` rule 10 and `sprint-context.md` "Not building".
- Sentence case on every label, button, heading — see `design-system.md` rule 3.
- Component choice, naming, and structure conventions: `design-system.md`.
- Product decisions already made (loop behavior, copy, states): `sprint-context.md` "Decisions".
- Product constraints from Knowunity: `01_Design_Brief_5946279147098382bcf481e214d50609.md` "Hard constraints".
- Voice-UX principles (system status, push-to-talk, permissions, generous judging, non-voice fallback, latency): `03_Voice_UX_Reference_4fe62791470982779c32813df9bbf0c5.md`.
- Existing Knowunity app screens (for context on where this feature sits): `app-inventory.md`, screenshots in `reference/`.

## Never

- Never use a CSS fallback value (`var(--token, #333)`) — see `design-system.md` rule 2.
- Never put an appearance word (green, coral, dark) in a semantic token name — rule 4.
- Never bind a component straight to a primitive (`color/violet/500`) — rule 5.
- Never reuse the `pro` token for anything but the Pro subscription feature — rule 12.
- Never free-scale the mascot or resize an `iconSlot` directly — rules 7–8.
- Never fake a component state (dim a button by hand, overlay a spinner) — rule 9.
- Never build anything on the `sprint-context.md` "Not building" list.

## Storybook

When working on UI, use the storybook tools to read the component library before answering or writing anything. Never assume a component prop exists. Query the documentation, and use only props that are documented or shown in a story. If a prop isn't there, stop and ask me.

## File map

- `AGENTS.md` — Next.js version/agent rules for this repo. Read before any Next.js code.
- `01_Design_Brief_5946279147098382bcf481e214d50609.md` — the product brief, hard constraints, success metrics. Read before making a scope or flow decision.
- `03_Voice_UX_Reference_4fe62791470982779c32813df9bbf0c5.md` — voice-UX principles and the states-to-design checklist. Read before building any voice/mic interaction.
- `sprint-context.md` — locked decisions and non-goals for this sprint. Read first, every session.
- `design-system.md` — component and token rules. Read before writing any UI code.
- `tokens/tokens.json` — every design token value. Read when you need a color, size, font step, or line height.
- `app-inventory.md` — inventory of the 44 reference screenshots and inferred flows. Read to understand how this feature fits the existing app.
- `reference/` — the 44 source screenshots `app-inventory.md` describes. Read individual files when a specific screen's visuals matter.
- `README.md` — stock create-next-app instructions (dev server, deploy). Read only for basic run commands.
- `package.json` — dependencies and npm scripts (`dev`, `build`, `start`, `lint`).
- `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `next-env.d.ts` — Next/TS/lint config. Read only when changing build/lint behavior.
- `app/layout.tsx` — root layout, fonts, HTML shell. Read before changing global page structure.
- `app/page.tsx`, `app/page.module.css` — current home page (still the create-next-app starter). Read before editing the entry screen.
- `app/globals.css` — global CSS resets and light/dark variables (stock, not yet aligned to `tokens/tokens.json`). Read before touching global styles.
- `build/css/tokens.css` — generated, never edit it directly. Edit `tokens/tokens.json` and run `npm run tokens` instead.
- `app/favicon.ico` — site icon.
- `public/*.svg`, `public/*.png` — mascot (Knowie) expression assets and stock Next.js starter icons. Read/check before adding a new mascot state.
- `public/images/` — empty, unused.
- `.claude/skills/` — ui-designer, ux-designer, ux-motion, Prototyping v5 skills. Invoke via the Skill tool for design/motion work, don't read directly.
- `hello.html` — scratch test file, unrelated to the app.
