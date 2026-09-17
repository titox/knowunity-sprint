import type { Preview } from '@storybook/nextjs-vite'

// The generated design-token stylesheet. It defines every --color-*,
// --dimension-*, --font-* custom property the app uses, so importing it
// here makes those variables available inside every story, the same way
// app/globals.css makes them available inside the real app.
import '../build/css/tokens.css'

// The tokens above reference the font by name ('Greed Standard-TRIAL'),
// but that name only resolves to the real font file if an @font-face
// declares it. app/globals.css does that for the real app, but Storybook
// never loads globals.css, so this needs its own import here -- without
// it every story's text silently falls back to the browser default.
import '../styles/fonts.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },

    // "Backgrounds" is the addon that paints the canvas behind a story.
    // The product itself is dark mode only (see design-system.md rule
    // 10) -- "white" here is not a light-mode product token, it's a
    // plain inspection aid so a component (e.g. an icon-only button)
    // can be eyeballed against a white canvas. Default stays dark.
    backgrounds: {
      default: 'dark',
      options: {
        dark: { name: 'dark', value: 'var(--color-background-page)' },
        white: { name: 'white', value: '#ffffff' },
      },
    },

    // "Viewport" is the addon that constrains the story's iframe to a
    // fixed screen size so it previews like it would on a real phone.
    // 390px is this product's only supported width (design-system.md
    // rule 10). This only affects the Canvas tab; the Docs tab (where a
    // whole page of token swatches needs room) always renders at full
    // browser width regardless of this setting.
    viewport: {
      options: {
        mobile390: {
          name: 'Mobile (390px)',
          styles: { width: '390px', height: '844px' },
        },
      },
    },
  },

  initialGlobals: {
    viewport: { value: 'mobile390', isRotated: false },
    // `parameters.backgrounds.default` alone doesn't apply a background in
    // this Storybook version -- like viewport, it needs an explicit
    // initial global value.
    backgrounds: { value: 'dark' },
  },
};

export default preview;