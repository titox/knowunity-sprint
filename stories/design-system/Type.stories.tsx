import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { getTypeScale } from './read-tokens';
import { TypeSpecimen } from './TypeSpecimen';

function TypeScale() {
  const styles = getTypeScale();
  return (
    <div
      style={{
        background: 'var(--color-background-page)',
        padding: 24,
        minHeight: '100%',
      }}
    >
      {styles.map((style) => (
        <TypeSpecimen
          key={style.name}
          name={style.name}
          vars={style.vars}
          description={style.description}
        />
      ))}
    </div>
  );
}

const meta: Meta<typeof TypeScale> = {
  title: 'Design System/Type',
  component: TypeScale,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

type Story = StoryObj<typeof TypeScale>;

export const AllStyles: Story = {
  render: () => <TypeScale />,
};
