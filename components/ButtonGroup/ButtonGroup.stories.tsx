import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ButtonGroup } from './ButtonGroup';

function DemoIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" style={{ width: '100%', height: '100%', display: 'block' }}>
      <path d="M8 1L2 4.5V11.5L8 15L14 11.5V4.5L8 1Z" fill="currentColor" />
    </svg>
  );
}

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          "What it is: a container that lays out buttons together with consistent spacing and sizing, either Horizontal or Vertical, at size M or L. It nests button. When to use: when two or more actions sit together, such as a primary and secondary CTA at the foot of a sheet. Seen in the Dark screens. Don't: don't mix button sizes inside one group. The group owns the size, so let it set them rather than resizing the children.\n\n(Source: Figma component \"buttonGroup\", node 9003:8455, Yummy__Knowie Design System. Built from this project's existing Button and ButtonIcon components, matching what buttonGroup itself nests in Figma -- Vertical is a fixed Primary-over-Secondary pair, Horizontal is a fixed ButtonIcon-plus-Primary pair, not a free-form list.)",
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['Horizontal', 'Vertical'] },
    size: { control: 'select', options: ['M', 'L'] },
    icon: { table: { disable: true } },
    onPrimaryClick: { table: { disable: true } },
    onSecondaryClick: { table: { disable: true } },
    onIconClick: { table: { disable: true } },
    onClick: { table: { disable: true } },
  },
  args: {
    icon: <DemoIcon />,
    iconAriaLabel: 'Demo action',
  },
};
export default meta;

type Story = StoryObj<typeof ButtonGroup>;

export const VerticalM: Story = { name: 'variant=Vertical, size=M', args: { variant: 'Vertical', size: 'M' } };
export const VerticalL: Story = { name: 'variant=Vertical, size=L', args: { variant: 'Vertical', size: 'L' } };
export const HorizontalM: Story = { name: 'variant=Horizontal, size=M', args: { variant: 'Horizontal', size: 'M' } };
export const HorizontalL: Story = { name: 'variant=Horizontal, size=L', args: { variant: 'Horizontal', size: 'L' } };
