import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ButtonIcon } from './ButtonIcon';

// A generic demo icon for the story only -- ButtonIcon's iconSlot accepts
// any consumer-supplied icon (design-system.md: "swap the icon, leave the
// slot alone"), so there is no single real icon that belongs to
// ButtonIcon itself. This is not a reproduction of a specific
// Figma-designed icon.
function DemoIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" style={{ width: '100%', height: '100%', display: 'block' }}>
      <path d="M8 1L2 4.5V11.5L8 15L14 11.5V4.5L8 1Z" fill="currentColor" />
    </svg>
  );
}

const meta: Meta<typeof ButtonIcon> = {
  title: 'Components/ButtonIcon',
  component: ButtonIcon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'What it is: an icon-only button sharing button\'s full matrix, three emphasis levels by three sizes by four states, with the icon carried in iconSlot. When to use: compact actions where the icon alone carries the meaning, such as a toolbar or app bar. Seen in the Dark and Entry points screens. Don\'t: don\'t use it for an action whose meaning isn\'t obvious without a label. If it needs words to be understood, use button. (Inferred from the fact that it has no text layer.)\n\n(Source: Figma component "buttonIcon", node 9003:8235, Yummy__Knowie Design System.)',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ["Primary","Secondary","Tertiary"] },
    size: { control: 'select', options: ["S","M","L"] },
    state: { control: 'select', options: ["Default","Pressed","Disabled","Loading"] },
    icon: { table: { disable: true } },
    onClick: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: {
    icon: <DemoIcon />,
    'aria-label': 'Demo action',
  },
};
export default meta;

type Story = StoryObj<typeof ButtonIcon>;

// Primary
export const PrimarySDefault: Story = {
  name: 'Primary · S · Default',
  args: { variant: 'Primary', size: 'S', state: 'Default' },
};
export const PrimarySPressed: Story = {
  name: 'Primary · S · Pressed',
  args: { variant: 'Primary', size: 'S', state: 'Pressed' },
};
export const PrimarySDisabled: Story = {
  name: 'Primary · S · Disabled',
  args: { variant: 'Primary', size: 'S', state: 'Disabled' },
};
export const PrimarySLoading: Story = {
  name: 'Primary · S · Loading',
  args: { variant: 'Primary', size: 'S', state: 'Loading' },
};
export const PrimaryMDefault: Story = {
  name: 'Primary · M · Default',
  args: { variant: 'Primary', size: 'M', state: 'Default' },
};
export const PrimaryMPressed: Story = {
  name: 'Primary · M · Pressed',
  args: { variant: 'Primary', size: 'M', state: 'Pressed' },
};
export const PrimaryMDisabled: Story = {
  name: 'Primary · M · Disabled',
  args: { variant: 'Primary', size: 'M', state: 'Disabled' },
};
export const PrimaryMLoading: Story = {
  name: 'Primary · M · Loading',
  args: { variant: 'Primary', size: 'M', state: 'Loading' },
};
export const PrimaryLDefault: Story = {
  name: 'Primary · L · Default',
  args: { variant: 'Primary', size: 'L', state: 'Default' },
};
export const PrimaryLPressed: Story = {
  name: 'Primary · L · Pressed',
  args: { variant: 'Primary', size: 'L', state: 'Pressed' },
};
export const PrimaryLDisabled: Story = {
  name: 'Primary · L · Disabled',
  args: { variant: 'Primary', size: 'L', state: 'Disabled' },
};
export const PrimaryLLoading: Story = {
  name: 'Primary · L · Loading',
  args: { variant: 'Primary', size: 'L', state: 'Loading' },
};

// Secondary
export const SecondarySDefault: Story = {
  name: 'Secondary · S · Default',
  args: { variant: 'Secondary', size: 'S', state: 'Default' },
};
export const SecondarySPressed: Story = {
  name: 'Secondary · S · Pressed',
  args: { variant: 'Secondary', size: 'S', state: 'Pressed' },
};
export const SecondarySDisabled: Story = {
  name: 'Secondary · S · Disabled',
  args: { variant: 'Secondary', size: 'S', state: 'Disabled' },
};
export const SecondarySLoading: Story = {
  name: 'Secondary · S · Loading',
  args: { variant: 'Secondary', size: 'S', state: 'Loading' },
};
export const SecondaryMDefault: Story = {
  name: 'Secondary · M · Default',
  args: { variant: 'Secondary', size: 'M', state: 'Default' },
};
export const SecondaryMPressed: Story = {
  name: 'Secondary · M · Pressed',
  args: { variant: 'Secondary', size: 'M', state: 'Pressed' },
};
export const SecondaryMDisabled: Story = {
  name: 'Secondary · M · Disabled',
  args: { variant: 'Secondary', size: 'M', state: 'Disabled' },
};
export const SecondaryMLoading: Story = {
  name: 'Secondary · M · Loading',
  args: { variant: 'Secondary', size: 'M', state: 'Loading' },
};
export const SecondaryLDefault: Story = {
  name: 'Secondary · L · Default',
  args: { variant: 'Secondary', size: 'L', state: 'Default' },
};
export const SecondaryLPressed: Story = {
  name: 'Secondary · L · Pressed',
  args: { variant: 'Secondary', size: 'L', state: 'Pressed' },
};
export const SecondaryLDisabled: Story = {
  name: 'Secondary · L · Disabled',
  args: { variant: 'Secondary', size: 'L', state: 'Disabled' },
};
export const SecondaryLLoading: Story = {
  name: 'Secondary · L · Loading',
  args: { variant: 'Secondary', size: 'L', state: 'Loading' },
};

// Tertiary
export const TertiarySDefault: Story = {
  name: 'Tertiary · S · Default',
  args: { variant: 'Tertiary', size: 'S', state: 'Default' },
};
export const TertiarySPressed: Story = {
  name: 'Tertiary · S · Pressed',
  args: { variant: 'Tertiary', size: 'S', state: 'Pressed' },
};
export const TertiarySDisabled: Story = {
  name: 'Tertiary · S · Disabled',
  args: { variant: 'Tertiary', size: 'S', state: 'Disabled' },
};
export const TertiarySLoading: Story = {
  name: 'Tertiary · S · Loading',
  args: { variant: 'Tertiary', size: 'S', state: 'Loading' },
};
export const TertiaryMDefault: Story = {
  name: 'Tertiary · M · Default',
  args: { variant: 'Tertiary', size: 'M', state: 'Default' },
};
export const TertiaryMPressed: Story = {
  name: 'Tertiary · M · Pressed',
  args: { variant: 'Tertiary', size: 'M', state: 'Pressed' },
};
export const TertiaryMDisabled: Story = {
  name: 'Tertiary · M · Disabled',
  args: { variant: 'Tertiary', size: 'M', state: 'Disabled' },
};
export const TertiaryMLoading: Story = {
  name: 'Tertiary · M · Loading',
  args: { variant: 'Tertiary', size: 'M', state: 'Loading' },
};
export const TertiaryLDefault: Story = {
  name: 'Tertiary · L · Default',
  args: { variant: 'Tertiary', size: 'L', state: 'Default' },
};
export const TertiaryLPressed: Story = {
  name: 'Tertiary · L · Pressed',
  args: { variant: 'Tertiary', size: 'L', state: 'Pressed' },
};
export const TertiaryLDisabled: Story = {
  name: 'Tertiary · L · Disabled',
  args: { variant: 'Tertiary', size: 'L', state: 'Disabled' },
};
export const TertiaryLLoading: Story = {
  name: 'Tertiary · L · Loading',
  args: { variant: 'Tertiary', size: 'L', state: 'Loading' },
};
