import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { getRadiusScale } from './read-tokens';
import { RadiusBox } from './RadiusBox';

function RadiusScale() {
  const tokens = getRadiusScale();
  return (
    <div
      style={{
        background: 'var(--color-background-page)',
        padding: 24,
        minHeight: '100%',
      }}
    >
      {tokens.map((t) => (
        <RadiusBox key={t.name} name={t.name} varName={t.varName} description={t.description} />
      ))}
    </div>
  );
}

const meta: Meta<typeof RadiusScale> = {
  title: 'Design System/Radius',
  component: RadiusScale,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Corner radii, from a 4px nick to fully rounded.\n\nFull resolves to 9999px, which Figma clamps to a pill or circle at any size.\n\n(Source: Figma page "Spacing & Sizing", section "Radius", node 15596:2192, Yummy__Knowie Design System.)',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof RadiusScale>;

export const AllSteps: Story = {
  render: () => <RadiusScale />,
};
