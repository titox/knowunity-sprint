import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { getColorGroups } from './read-tokens';
import { ColorSwatch } from './ColorSwatch';

function ColorPalette() {
  const groups = getColorGroups();
  return (
    <div
      style={{
        background: 'var(--color-background-page)',
        padding: 24,
        minHeight: '100%',
      }}
    >
      {groups.map((group) => (
        <section key={group.name} style={{ marginBottom: 32 }}>
          <h2
            style={{
              textTransform: 'capitalize',
              fontSize: 16,
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              marginBottom: 8,
            }}
          >
            {group.name}
          </h2>
          <div>
            {group.tokens.map((t) => (
              <ColorSwatch key={t.name} name={t.name} varName={t.varName} description={t.description} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

const meta: Meta<typeof ColorPalette> = {
  title: 'Design System/Colors',
  component: ColorPalette,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          "The semantic colour layer. Every swatch is one token, its fill bound to the live variable rather than a pasted hex, so the sheet tracks the system.\n\nGroups, as documented on the source page: background — page, surface and overlay fills. text — foreground colours for copy, links and their states. interactive — control fills across rest, hover, active, disabled and their on-colours. border — strokes for dividers, focus, selection and status. accent — decorative hue families: bold and subtle, each with its on-colour. pro — the gold Pro upsell family. feedback — success and error pairs for status messaging. highlight — selected surfaces and their hover. mascot — Knowie's fixed brand colours.\n\n(Source: Figma page \"Semantic Colour Tokens\", node 15592:1137, Yummy__Knowie Design System.)",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof ColorPalette>;

export const AllColors: Story = {
  render: () => <ColorPalette />,
};
