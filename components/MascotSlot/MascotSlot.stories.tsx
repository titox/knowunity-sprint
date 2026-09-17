import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MascotSlot, type MascotExpression } from './MascotSlot';

const EXPRESSIONS: MascotExpression[] = [
  'amazed',
  'angry',
  'approving',
  'confused',
  'determined',
  'excited',
  'giggling',
  'laughing',
  'overIt',
  'sad',
  'standby',
  'thinking',
];

const meta: Meta<typeof MascotSlot> = {
  title: 'Components/MascotSlot',
  component: MascotSlot,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          "What it is: the Knowie mascot at one of four fixed sizes (XL 64, 2XL 120, 3XL 200, 4XL 320), which map to the Illustration steps in the Size collection. When to use: empty states, celebrations, onboarding, anywhere the mascot adds warmth. Seen in the Dark screens (13 instances). Don't: don't free-scale it to an in-between size. Pick a size variant, so it stays on the Illustration ramp.\n\n(Source: Figma component \"mascotSlot\", node 9003:8873, Yummy__Knowie Design System. Expression images come from /public, not Figma -- Figma's own instance only shows \"standby\".)",
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['XL', '2XL', '3XL', '4XL'] },
    expression: { control: 'select', options: EXPRESSIONS },
  },
};
export default meta;

type Story = StoryObj<typeof MascotSlot>;

export const SizeXL: Story = { name: 'size=XL', args: { size: 'XL' } };
export const Size2XL: Story = { name: 'size=2XL', args: { size: '2XL' } };
export const Size3XL: Story = { name: 'size=3XL', args: { size: '3XL' } };
export const Size4XL: Story = { name: 'size=4XL', args: { size: '4XL' } };

// Not a Figma variant -- a practical reference for the /public expression
// set this component can display at any of the sizes above.
export const AllExpressions: Story = {
  args: { size: '2XL' },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {EXPRESSIONS.map((expression) => (
        <MascotSlot key={expression} {...args} expression={expression} />
      ))}
    </div>
  ),
};
