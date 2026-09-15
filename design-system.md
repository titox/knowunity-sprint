# Knowunity design system: rules

This file holds rules, not values. Every value lives in `tokens/tokens.json`. If you need a colour, a size, a font step or a line height, read it there. Nothing in this document repeats a value, and neither should anything you build.

Three sources of truth, and only three:

- `tokens/tokens.json` for every value.
- This file for every rule.
- The Figma components for structure.

If the three ever disagree, that is a bug to raise, not a gap to paper over.

## The layer model

The system has three layers and they only ever flow one way.

Primitives hold raw values. The semantic layer references primitives and gives them meaning. Components consume the semantic layer. A component never reaches past the semantic layer to a primitive, and the semantic layer never holds a raw value of its own. This is not a style preference. It is what makes a future change, a retune, or a light mode, land in one place instead of a hundred. The whole "never do this" list below is really this one rule, spelled out.

## Which component to reach for

Pick by the job, not by how it looks.

A single action carried by a word or two is a **button**. Choose the emphasis by importance: primary for the one action you want taken, secondary for the supporting one, tertiary for the quiet one. Do not signal importance by recolouring; the emphasis levels already do it.

An action that an icon explains on its own is a **buttonIcon**. If it needs a word to be understood, it is not a buttonIcon, it is a button.

Two or more actions that sit together are a **buttonGroup**. The group owns the spacing and the size, so let it set them.

A tag, a filter, or a small selectable option is a **chips**. When a chip belongs to a Pro feature, that is what the pro colour is for. Anything Pro pulls from the `pro` group in `tokens/tokens.json`. Never reuse `pro` for anything that isn't the actual Pro subscription feature, see the entry below for why that's a real, already-made mistake.

Progress through a task, a quiz or a plan is a **progressIndicator**. It moves in fixed steps, so use it to show roughly how far along someone is, never to report a precise or continuously changing number.

A brief message straight after an action is a **snackbar**. Keep it to a line or two and let it pass. It is not for anything that must persist.

A section or screen heading with a supporting line is a **textBlock**. It is a header pairing, not a paragraph component, and not running text.

The Knowie mascot is a **mascotSlot**, placed at one of its fixed sizes. Pick a size variant rather than scaling between them.

An icon that sits inside any of the above is an **iconSlot**. Swap the icon, leave the slot alone.

A top bar with a title and navigation actions is an **appBar**, and it lives in the scaffold, not floating on its own. See below, this one is now confirmed in real use across every recall-loop screen.

A whole screen is a **scaffold**. Everything above hangs off it.

When nothing here fits, that is a finding. Say so and raise it, rather than bending a component into a job it was not built for.

## The scaffold

The scaffold is the screen shell every layout starts from. It is responsive: the `size` variant is the device frame, so choose the one that matches your target (the phones, the iPads in both orientations, the MacBook) instead of resizing a frame by hand.

It exposes four slots and a few visibility toggles. What belongs in each:

- **topNavigation** holds the appBar, and nothing else. Turn it on with `showTopNavSlot`. If a screen has no top bar, switch the slot off rather than leaving an empty appBar in place.
- **middleContent** is the body of the screen. This is where the page's own content goes, and where scrolling happens. Actions that belong at the bottom do not belong here.
- **bottomContent** holds the bottom actions or bottom navigation, usually a buttonGroup. Turn it on with `showBottomNavSlot`. Primary and secondary CTAs for the screen live here, not mid-content.
- **bottomSheetOnly** holds a bottom sheet when the screen needs one. `showBottomSheetBackground` toggles the dimming behind it; use the toggle rather than dropping in your own scrim.

The status bar and panel header are fixed chrome the scaffold provides. Do not rebuild them inside a slot.

The rule of thumb: content in the middle, navigation top and bottom, sheets in the sheet slot. If something you are placing does not obviously belong to one of those, that is a sign it needs rethinking, not a fifth slot improvised on the spot.

## Recall-loop components

These were added or substantially reworked in one working session. Every description below is copied from the component's own Figma description field, not paraphrased. States, properties, and axes are listed separately since Figma descriptions don't always spell those out mechanically.

**appBar**

> What it is: a top navigation bar built around a slot, with six preset arrangements of left and right icon buttons or buttons (default through leftAnd2RightButtons).
> When to use: at the top of a screen to hold a title area plus navigation and actions. Now confirmed in real use: every screen in the recall loop uses variant=leftIconButtonOnly, with a real x-close icon on the left, a progressIndicator dropped into the Slot, and a streakCounter instance on the right.
> Don't: don't add actions beyond the arrangement you pick. The variants exist so the left and right slots stay balanced; hand-adding buttons defeats that. Don't rebuild this by hand per screen either, every recall-loop screen used to do exactly that before being swapped to real instances.

Variant axis: `variant` (default, leftIconButtonOnly, leftAndRightIconButton, leftAndRightButton, leftAndTwoRightIconButtons, leftAnd2RightButtons). No boolean properties; the arrangement is the variant.

**streakCounter**

> What it is: a lightning-bolt icon paired with a count, accent/blue tokens throughout. The bolt is hand-drawn artwork, not a library icon, there's no equivalent in this file's icon set.
> When to use: for the streak or XP counter in the app bar's right slot.
> Don't: don't try to swap the bolt via iconSlot, it isn't one, it's fixed custom artwork copied into this component directly. If a real icon for this concept gets added to the library later, that's worth revisiting.

No variants. A single component with an editable count text layer.

**textField**

> What it is: a text input with five states (Default, Focused, Filled, Error, Disabled), an optional leading icon via iconSlot, and a trailing action bound to a real buttonIcon instance, never a slot, since it's always a clear or mic-toggle control, plus optional helper/error text.
> When to use: for a single line of typed input, such as the free-text answer on the "switch to typing" screen.
> Don't: don't treat the trailing action as a place for arbitrary content, it's a fixed control, not a slot. Also don't trust the component's own default variant, it's currently set to Error in this file, a known bug, so always set state=Default explicitly when placing a new instance.

Variant axis: `state` (Default, Focused, Filled, Error, Disabled). Boolean properties: `showLeadingIcon`, `showTrailingAction`, `showHelperText`.

**micButton**

> What it is: the circular voice-capture control. Five states, Default, Pressed, Disabled, Loading, Listening, reusing buttonIcon's own state vocabulary rather than inventing new names. Listening adds a translucent pulse ring in accent/brand/bold that extends past the button's own edge.
> When to use: for the primary tap-to-speak action on recall-loop screens.
> Don't: don't treat Listening as finished motion. It's one static frame of what should be an animated, repeating pulse; there's no real timing or animation spec behind it yet.

Variant axis: `state` (Default, Pressed, Disabled, Loading, Listening). No boolean properties.

**resultRow**

> What it is: a single term result inside a summary card. Two variant axes, state (Success, Error) and position (Top, Middle, Bottom). Position only changes corner radius, an outer corner on the edge of a stack, an inner corner everywhere else, so three or more instances read as one continuous shape when placed in a resultRowGroup.
> When to use: only inside a resultRowGroup, itself only inside a summaryCard. Built specifically for the "Buenas explicaciones" pattern.
> Don't: don't add a trailing chip, it had one during development and was removed, this is icon and label only. Don't reach for this for the "Worth another look" row style either, that's statusRow's job.

Variant axes: `state` (Success, Error), `position` (Top, Middle, Bottom). Boolean property: `showIcon`.

**resultRowGroup**

> What it is: the vertical stack that owns spacing for a set of resultRow instances. 4px gap, copied from the real shipped card this was reverse-engineered from.
> When to use: whenever more than one resultRow needs to sit together.
> Don't: don't set spacing by hand on loose resultRow instances placed side by side, that's this component's job.

No variants, no boolean properties. A single fixed-layout wrapper.

**summaryCard**

> What it is: the green results-card wrapper. A title and a resultRowGroup instance, radius 30, copied from the one real shipped card this was based on.
> When to use: for the "Buenas explicaciones" success summary specifically.
> Don't: don't reuse this for "Worth another look", that section is now a flat unified list of statusRow instances, no card wrapper.

No variants, no boolean properties.

**skeletonLine**

> What it is: a single placeholder bar. background/floating at 60% opacity, radius 32, copied exactly from the real loading state already shipped on the "Working, never blank" screen.
> When to use: only inside skeletonLines.
> Don't: don't use this standalone at a different size, it exists as an atom for the group, not a general-purpose placeholder shape.

No variants, no boolean properties.

**skeletonLines**

> What it is: three skeletonLine instances, 16px gap, 16px padding, last line at roughly half width, matching the real shipped loading state exactly.
> When to use: for a "working" or "checking your answer" state, wherever content is about to appear but isn't ready yet.
> Don't: don't present this as finished motion design, it's a static frame with no shimmer or pulse behind it.

No variants, no boolean properties.

**statusRow**

> What it is: a label plus a trailing chip, no leading icon. Background is interactive/secondary. Real properties: showOutline, a boolean wired to a dedicated overlay border in accent/coral/bold, not a raw stroke. The chip's own colour (Unaided/Hinted/Revealed/Skipped) is set by swapping or overriding the nested chip instance, statusRow has no colour property of its own.
> When to use: for the unified "term by term" recall-loop list, one row per term.
> Don't: don't set a stroke directly on the row instance, use showOutline. Don't assume the status colour is a variant of this component.

No variant axis. Boolean property: `showOutline`.

**choiceRow**

> What it is: a selectable option row. An iconSlot, a textBlock (title and caption), and a hidden-by-default trailingCheck. showSelected is a real boolean that reveals both the checkmark and a dedicated accent/brand/bold overlay border.
> When to use: for the Speak/Write choice at the top of the recall loop, or anywhere presenting mutually exclusive options as rows.
> Don't: don't force an icon into the slot when no real one exists for the concept. At the time this was built, no "write" icon existed in this file's library; a placeholder was used and flagged rather than faked.

No variant axis. Boolean property: `showSelected`.

**chips**, extended

> What it is: a small tag, filter, or status indicator. Three variant axes, size (XXS, XS, S, M), color (Primary, pro, Blue, Coral, Green, Neutral), active (False, True). Optional showLeftIcon, showRightIcon, and an editable Text property.
> When to use: for a compact label that needs a colour signal, a filter chip, a Pro badge, or a term's recall status in the unified session-summary list (Blue for Hinted, Coral for Revealed, Green for Unaided, Neutral for Skipped).
> Don't: don't reuse pro for anything that isn't the actual Pro subscription feature, that mistake is why Blue/Coral/Green/Neutral exist now. Don't assume this set's boolean and text properties survive a recombine untouched, they've been lost and had to be rebuilt more than once; verify after any structural edit to this set rather than trusting it held.

Variant axes: `size`, `color`, `active`. Boolean properties: `showLeftIcon`, `showRightIcon`. Text property: `Text`.

## Naming conventions

**Tokens.** Names read as an ordered axis, from general to specific: category, then concept, then role, then state. So a semantic name looks like `interactive/primaryHover` or `accent/brand/bold`, never `color/blue/500`. The hue-and-number names belong to the primitive layer only, under `color`, as `color/<hue>/<step>` with the alpha ramp under `color/alpha`. You do not need to memorise any of this; the shape is visible in `tokens/tokens.json`. What matters is that a name tells you the job, not the appearance.

**Components.** Component sets are camelCase: `button`, `buttonIcon`, `buttonGroup`, `appBar`, `chips`, `progressIndicator`, `snackbar`, `textBlock`, `mascotSlot`, `iconSlot`, `scaffold`, and now `micButton`, `resultRow`, `resultRowGroup`, `summaryCard`, `skeletonLine`, `skeletonLines`, `statusRow`, `choiceRow`, `streakCounter`. Variant axes that describe the thing are variant properties (`size`, `color`, `state`, `position`); optional parts are boolean properties, named as `show…`; and anything meant to receive other content is a slot. A component named `…Slot` exists to be filled, not styled.

**Structure.** A few patterns came up repeatedly enough this session to write down rather than reinvent each time:

- **Bound instance, not a slot.** If a nested instance only ever holds one specific thing (a clear button in a text field, a status chip in a row), name it for what it is (`trailingAction`, `trailingChip`) and treat it as a bound part of the component, not a `…Slot`. A slot name promises arbitrary content; don't make that promise for something that only ever holds one kind of thing.
- **Optional border, not a raw stroke.** Where a component needs a border that only shows sometimes (a selected state, a flagged row), add a dedicated overlay frame, fill none, stroke only, absolutely positioned to match the parent's bounds, bound to a boolean property's `visible` reference. Don't set `.strokes` directly on the component root and toggle it by hand; that isn't inspectable or reusable the way a real property is. `statusRow`'s `showOutline` and `choiceRow`'s `showSelected` both work this way.
- **Atom and group, split.** When a component is really "one repeated thing plus the spacing between them" (`resultRow`/`resultRowGroup`, `skeletonLine`/`skeletonLines`), build the single unit and the group that owns spacing as two separate components. Don't bake a fixed gap into the atom itself.
- **Layer names inside a component** follow the job, not the geometry: `label`, `inputContainer`, `leadingIconSlot`, `inputText`, `trailingAction`, `helperText` is the shape used across `textField`, `resultRow`, and `statusRow`. A generic name like `Frame 2147207xxx` left over from Figma's own auto-naming should always get renamed before a component is considered finished.
- **Verify a component set after any structural edit**, especially after pulling its variants apart and recombining them. Figma has, more than once in this file's history, silently renamed variants to generic `Property 1=…` placeholders and dropped boolean or text properties entirely when a set gets rebuilt. Read the property definitions and a sample of variant names back after the edit; don't assume a successful `combineAsVariants` call means nothing was lost.
- **Every new component gets a real Figma description**, in the `What it is / When to use / Don't` shape used throughout this file. Write it in Figma itself, on the component or component set, not only in chat or in this document.

**Interface copy.** Sentence case everywhere. See the never list.

## Never do this

The first five are non-negotiable. The rest are the same principle applied to traps this system has already shown.

1. **Never invent a value that is not in `tokens/tokens.json`.** If something you need is missing, say so and stop. Do not reach for a nearby value, eyeball one, or hardcode a number. A missing token is information; filling the gap hides it.

2. **Never use a CSS fallback value, such as `var(--token, #333)`.** The fallback is a lie that makes a broken token look fine. If a token resolves to nothing, that is a bug to fix at the source, not to mask at the call site.

3. **Sentence case on every label, button and heading.** Capitals only for proper nouns (Knowunity, Knowie, names of real things). "Explain it out loud", not "Explain It Out Loud". This is a rule about the product's voice, and it does not bend for emphasis.

4. **Never put an appearance word in a semantic name.** A word that describes how a colour looks, green, coral, dark, light, a number on a ramp, belongs in the primitive layer only. The semantic layer names the job. The day the brand hue changes, a semantic name that says what it looks like becomes a lie.

5. **Never read a primitive directly.** Components consume the semantic layer; the semantic layer references the primitives. Binding a component straight to `color/violet/500` breaks the one seam that lets the system change safely. If no semantic token exists for what you are doing, that is a gap to name, per rule 1, not a reason to drop a layer.

Also never:

6. **Never bind letter spacing to a unitless variable.** It silently converts percent tracking to pixel tracking, so the type stops scaling with size. Tracking stays as a raw percent on the style. This is why there is no tracking token to reach for.

7. **Never set an iconSlot's size directly.** Its size variant is named "Size (IGNORE)" on purpose; the parent component drives it. Detaching it to resize is off-system.

8. **Never free-scale the mascot.** Pick a mascotSlot size variant. The sizes map to the Illustration steps, and an in-between size leaves that ramp.

9. **Never fake a component state.** Disabled, pressed and loading are variants. Do not dim a button by hand or lay a spinner over it; switch the state.

10. **Never assume a light value exists.** The semantic layer is dark only today. There is no light mode. If a task needs one, that is a missing thing to flag, per rule 1, not a value to guess.

11. **Never treat elevation as a token.** Shadows and blur live as effect styles, not variables, so apply them with the style picker. And do not assume the low shadow steps read on a dark surface; several barely register, which is a known limitation to raise, not to compensate for with an invented value.

12. **Never reuse a semantic token for a meaning it wasn't built for**, even when the colour happens to fit. `pro` is for the Pro subscription feature only; the Hinted/Revealed/Unaided/Skipped term statuses needed their own colours precisely because nothing else already meant what they needed to mean.

## When something is missing

Rules 1, 5, 10 and 11 all resolve to the same move: when the system does not have what you need, name the gap and stop. Known gaps today are the light mode, a semantic tracking token, and a variable-backed elevation scale. Building past any of them means inventing values, which rule 1 forbids. Raising them is the job; covering for them is the failure.
