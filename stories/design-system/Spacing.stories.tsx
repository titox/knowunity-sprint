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
  },
};
export default meta;

type Story = StoryObj<typeof SpacingScale>;

export const AllSteps: Story = {
  render: () => <SpacingScale />,
};
