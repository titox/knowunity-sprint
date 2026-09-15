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
  },
};
export default meta;

type Story = StoryObj<typeof RadiusScale>;

export const AllSteps: Story = {
  render: () => <RadiusScale />,
};
