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
    docs: {
      description: {
        component:
          "The type scale. Every specimen is one of the file's text styles, shown at its real size in the production typeface.\n\nGroups, as documented on the source page: Display — oversized moments, hero numbers and splash screens, not running text. Headline — screen and section titles, bold throughout with regular cuts where a lighter title is needed. Body — reading text for questions, answers and explanations, in regular and bold. Caption — small print: labels, metadata, counts and limits.\n\n(Source: Figma page \"Type Scale\", node 15594:1577, Yummy__Knowie Design System.)",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof TypeScale>;

export const AllStyles: Story = {
  render: () => <TypeScale />,
};
