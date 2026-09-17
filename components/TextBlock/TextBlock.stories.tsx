import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TextBlock } from './TextBlock';

const meta: Meta<typeof TextBlock> = {
  title: 'Components/TextBlock',
  component: TextBlock,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          "What it is: a title with an optional caption, at four scale steps (XL, L, M, S). Caption is toggled by a boolean. When to use: section and screen headings with a line of supporting text. Unverified: not present in the example screens, so this is inferred from structure. Don't: don't use it for body or running text. It's a header pairing, not a paragraph component.\n\n(Source: Figma component \"textBlock\", node 9003:9039, Yummy__Knowie Design System.)",
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['XL', 'L', 'M', 'S'] },
    title: { control: 'text' },
    caption: { control: 'text' },
    showCaption: { control: 'boolean' },
  },
  args: {
    title: 'Header',
    caption: 'Caption',
    showCaption: true,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 16 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof TextBlock>;

export const XL: Story = { args: { variant: 'XL' } };
export const L: Story = { args: { variant: 'L' } };
export const M: Story = { args: { variant: 'M' } };
export const S: Story = { args: { variant: 'S' } };
export const NoCaption: Story = { args: { variant: 'XL', showCaption: false } };
