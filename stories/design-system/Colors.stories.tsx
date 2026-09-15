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
  },
};
export default meta;

type Story = StoryObj<typeof ColorPalette>;

export const AllColors: Story = {
  render: () => <ColorPalette />,
};
