import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';

// A generic demo icon for the story only -- Button's iconSlots accept any
// consumer-supplied icon (design-system.md: "swap the icon, leave the slot
// alone"), so there is no single real icon that belongs to Button itself.
// This is not a reproduction of a specific Figma-designed icon.
function DemoIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" style={{ width: '100%', height: '100%', display: 'block' }}>
      <circle cx="8" cy="8" r="6" fill="currentColor" />
    </svg>
  );
}

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          'What it is: the standard text button. Three emphasis levels (Primary, Secondary, Tertiary), three sizes (S, M, L), four states (Default, Pressed, Disabled, Loading), an editable CTA, and optional left or right icons via iconSlot. When to use: for any action carried by a word or two. The CTA placeholder literally reads "1/2 words". Seen in the Dark screens. Don\'t: don\'t build a disabled or loading look by hand. Those are states on the component, so switch the state rather than dimming or overlaying a spinner yourself.\n\n(Source: Figma component "button", node 9003:6667, Yummy__Knowie Design System.)',
      },
    },
  },
  args: {
    cta: '1/2 words',
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

// Primary
export const PrimarySDefault: Story = {
  name: 'Primary \u00b7 S \u00b7 Default',
  args: { variant: 'Primary', size: 'S', state: 'Default', showLeftIcon: true, showRightIcon: true, leftIcon: <DemoIcon />, rightIcon: <DemoIcon /> },
};
export const PrimarySPressed: Story = {
  name: 'Primary \u00b7 S \u00b7 Pressed',
  args: { variant: 'Primary', size: 'S', state: 'Pressed' },
};
export const PrimarySDisabled: Story = {
  name: 'Primary \u00b7 S \u00b7 Disabled',
  args: { variant: 'Primary', size: 'S', state: 'Disabled' },
};
export const PrimarySLoading: Story = {
  name: 'Primary \u00b7 S \u00b7 Loading',
  args: { variant: 'Primary', size: 'S', state: 'Loading' },
};
export const PrimaryMDefault: Story = {
  name: 'Primary \u00b7 M \u00b7 Default',
  args: { variant: 'Primary', size: 'M', state: 'Default', showLeftIcon: true, showRightIcon: true, leftIcon: <DemoIcon />, rightIcon: <DemoIcon /> },
};
export const PrimaryMPressed: Story = {
  name: 'Primary \u00b7 M \u00b7 Pressed',
  args: { variant: 'Primary', size: 'M', state: 'Pressed' },
};
export const PrimaryMDisabled: Story = {
  name: 'Primary \u00b7 M \u00b7 Disabled',
  args: { variant: 'Primary', size: 'M', state: 'Disabled' },
};
export const PrimaryMLoading: Story = {
  name: 'Primary \u00b7 M \u00b7 Loading',
  args: { variant: 'Primary', size: 'M', state: 'Loading' },
};
export const PrimaryLDefault: Story = {
  name: 'Primary \u00b7 L \u00b7 Default',
  args: { variant: 'Primary', size: 'L', state: 'Default', showLeftIcon: true, showRightIcon: true, leftIcon: <DemoIcon />, rightIcon: <DemoIcon /> },
};
export const PrimaryLPressed: Story = {
  name: 'Primary \u00b7 L \u00b7 Pressed',
  args: { variant: 'Primary', size: 'L', state: 'Pressed' },
};
export const PrimaryLDisabled: Story = {
  name: 'Primary \u00b7 L \u00b7 Disabled',
  args: { variant: 'Primary', size: 'L', state: 'Disabled' },
};
export const PrimaryLLoading: Story = {
  name: 'Primary \u00b7 L \u00b7 Loading',
  args: { variant: 'Primary', size: 'L', state: 'Loading' },
};

// Secondary
export const SecondarySDefault: Story = {
  name: 'Secondary \u00b7 S \u00b7 Default',
  args: { variant: 'Secondary', size: 'S', state: 'Default', showLeftIcon: true, showRightIcon: true, leftIcon: <DemoIcon />, rightIcon: <DemoIcon /> },
};
export const SecondarySPressed: Story = {
  name: 'Secondary \u00b7 S \u00b7 Pressed',
  args: { variant: 'Secondary', size: 'S', state: 'Pressed' },
};
export const SecondarySDisabled: Story = {
  name: 'Secondary \u00b7 S \u00b7 Disabled',
  args: { variant: 'Secondary', size: 'S', state: 'Disabled' },
};
export const SecondarySLoading: Story = {
  name: 'Secondary \u00b7 S \u00b7 Loading',
  args: { variant: 'Secondary', size: 'S', state: 'Loading' },
};
export const SecondaryMDefault: Story = {
  name: 'Secondary \u00b7 M \u00b7 Default',
  args: { variant: 'Secondary', size: 'M', state: 'Default', showLeftIcon: true, showRightIcon: true, leftIcon: <DemoIcon />, rightIcon: <DemoIcon /> },
};
export const SecondaryMPressed: Story = {
  name: 'Secondary \u00b7 M \u00b7 Pressed',
  args: { variant: 'Secondary', size: 'M', state: 'Pressed' },
};
export const SecondaryMDisabled: Story = {
  name: 'Secondary \u00b7 M \u00b7 Disabled',
  args: { variant: 'Secondary', size: 'M', state: 'Disabled' },
};
export const SecondaryMLoading: Story = {
  name: 'Secondary \u00b7 M \u00b7 Loading',
  args: { variant: 'Secondary', size: 'M', state: 'Loading' },
};
export const SecondaryLDefault: Story = {
  name: 'Secondary \u00b7 L \u00b7 Default',
  args: { variant: 'Secondary', size: 'L', state: 'Default', showLeftIcon: true, showRightIcon: true, leftIcon: <DemoIcon />, rightIcon: <DemoIcon /> },
};
export const SecondaryLPressed: Story = {
  name: 'Secondary \u00b7 L \u00b7 Pressed',
  args: { variant: 'Secondary', size: 'L', state: 'Pressed' },
};
export const SecondaryLDisabled: Story = {
  name: 'Secondary \u00b7 L \u00b7 Disabled',
  args: { variant: 'Secondary', size: 'L', state: 'Disabled' },
};
export const SecondaryLLoading: Story = {
  name: 'Secondary \u00b7 L \u00b7 Loading',
  args: { variant: 'Secondary', size: 'L', state: 'Loading' },
};

// Tertiary
export const TertiarySDefault: Story = {
  name: 'Tertiary \u00b7 S \u00b7 Default',
  args: { variant: 'Tertiary', size: 'S', state: 'Default', showLeftIcon: true, showRightIcon: true, leftIcon: <DemoIcon />, rightIcon: <DemoIcon /> },
};
export const TertiarySPressed: Story = {
  name: 'Tertiary \u00b7 S \u00b7 Pressed',
  args: { variant: 'Tertiary', size: 'S', state: 'Pressed' },
};
export const TertiarySDisabled: Story = {
  name: 'Tertiary \u00b7 S \u00b7 Disabled',
  args: { variant: 'Tertiary', size: 'S', state: 'Disabled' },
};
export const TertiarySLoading: Story = {
  name: 'Tertiary \u00b7 S \u00b7 Loading',
  args: { variant: 'Tertiary', size: 'S', state: 'Loading' },
};
export const TertiaryMDefault: Story = {
  name: 'Tertiary \u00b7 M \u00b7 Default',
  args: { variant: 'Tertiary', size: 'M', state: 'Default', showLeftIcon: true, showRightIcon: true, leftIcon: <DemoIcon />, rightIcon: <DemoIcon /> },
};
export const TertiaryMPressed: Story = {
  name: 'Tertiary \u00b7 M \u00b7 Pressed',
  args: { variant: 'Tertiary', size: 'M', state: 'Pressed' },
};
export const TertiaryMDisabled: Story = {
  name: 'Tertiary \u00b7 M \u00b7 Disabled',
  args: { variant: 'Tertiary', size: 'M', state: 'Disabled' },
};
export const TertiaryMLoading: Story = {
  name: 'Tertiary \u00b7 M \u00b7 Loading',
  args: { variant: 'Tertiary', size: 'M', state: 'Loading' },
};
export const TertiaryLDefault: Story = {
  name: 'Tertiary \u00b7 L \u00b7 Default',
  args: { variant: 'Tertiary', size: 'L', state: 'Default', showLeftIcon: true, showRightIcon: true, leftIcon: <DemoIcon />, rightIcon: <DemoIcon /> },
};
export const TertiaryLPressed: Story = {
  name: 'Tertiary \u00b7 L \u00b7 Pressed',
  args: { variant: 'Tertiary', size: 'L', state: 'Pressed' },
};
export const TertiaryLDisabled: Story = {
  name: 'Tertiary \u00b7 L \u00b7 Disabled',
  args: { variant: 'Tertiary', size: 'L', state: 'Disabled' },
};
export const TertiaryLLoading: Story = {
  name: 'Tertiary \u00b7 L \u00b7 Loading',
  args: { variant: 'Tertiary', size: 'L', state: 'Loading' },
};
