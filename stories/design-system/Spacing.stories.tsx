import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { getSpaceScale } from './read-tokens';
import { SpaceBar } from './SpaceBar';

function SpacingScale() {
  const tokens = getSpaceScale();
  return (
    <div
      style={{
        background: 'var(--color-background-page)',
        padding: 24,
        minHeight: '100%',
      }}
    >
      {tokens.map((t) => (
        <SpaceBar key={t.name} name={t.name} varName={t.varName} description={t.description} />
      ))}
    </div>
  );
}

const meta: Meta<typeof SpacingScale> = {
  title: 'Design System/Spacing',
  component: SpacingScale,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          "Gaps and padding in auto layout. The ramp is 4px-based with a 2px half-step, plus negative steps for deliberate overlap.\n\nNegative steps are for pulling elements together, such as overlapping avatars. They are not padding.\n\n(Source: Figma page \"Spacing & Sizing\", section \"Space\", node 15596:2192, Yummy__Knowie Design System.)",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof SpacingScale>;

export const AllSteps: Story = {
  render: () => <SpacingScale />,
};
