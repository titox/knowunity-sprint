import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { getColorGroups, getColorPrimitives, type ColorGroup } from './read-tokens';
import { ColorSwatch } from './ColorSwatch';

function ColorPalette({ groups }: { groups: ColorGroup[] }) {
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
  },
};
export default meta;

type Story = StoryObj<typeof ColorPalette>;

export const Semantic: Story = {
  args: { groups: getColorGroups() },
  render: (args) => <ColorPalette {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "The semantic colour layer. Every swatch is one token, its fill bound to the live variable rather than a pasted hex, so the sheet tracks the system.\n\nGroups, as documented on the source page: background — page, surface and overlay fills. text — foreground colours for copy, links and their states. interactive — control fills across rest, hover, active, disabled and their on-colours. border — strokes for dividers, focus, selection and status. accent — decorative hue families: bold and subtle, each with its on-colour. pro — the gold Pro upsell family. feedback — success and error pairs for status messaging. highlight — selected surfaces and their hover. mascot — Knowie's fixed brand colours.\n\n(Source: Figma page \"Semantic Colour Tokens\", node 15592:1137, Yummy__Knowie Design System.)\n\ndesign-system.md rule 5: components must consume this layer, never the primitives below it directly.",
      },
    },
  },
};

export const Primitives: Story = {
  args: { groups: getColorPrimitives() },
  render: (args) => <ColorPalette {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'The primitive colour layer -- raw hue/step values (navy, neutral, violet, green, red, coral, blue, magenta, gold, and the alpha ramp) with no meaning attached. This is the ramp every Semantic token above resolves to.\n\nThere is no dedicated Figma page for this layer -- it comes straight from the `color` group in tokens.json, same convention as the Space/Radius scales (no per-token description, since these are raw numbers/hex with no semantic layer above them).\n\ndesign-system.md rule 5: reference only. Never bind a component straight to one of these -- go through the matching Semantic token instead.',
      },
    },
  },
};
