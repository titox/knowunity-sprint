import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Chips } from './Chips';

// A generic demo icon for the story only -- chips' iconSlots accept any
// consumer-supplied icon, so there is no single real icon that belongs
// to Chips itself.
function DemoIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" style={{ width: '100%', height: '100%', display: 'block' }}>
      <circle cx="8" cy="8" r="6" fill="currentColor" />
    </svg>
  );
}

const meta: Meta<typeof Chips> = {
  title: 'Components/Chips',
  component: Chips,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'What it is: a small tag, filter, or status indicator. Three variant axes, size (XXS, XS, S, M), color (Primary, pro, Blue, Coral, Green, Neutral), active (False, True). Optional showLeftIcon, showRightIcon, and an editable Text property. When to use: for a compact label that needs a colour signal, a filter chip, a Pro badge, or a term\'s recall status in the unified session-summary list (Blue for Hinted, Coral for Revealed, Green for Unaided, Neutral for Skipped). Don\'t: don\'t reuse pro for anything that isn\'t the actual Pro subscription feature, that mistake is why Blue/Coral/Green/Neutral exist now. Don\'t assume this set\'s boolean and text properties survive a recombine untouched, they\'ve been lost and had to be rebuilt more than once; verify after any structural edit to this set rather than trusting it held.\n\n(Source: Figma component "chips", node 15690:9427, Yummy__Knowie Design System.)',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ["XXS","XS","S","M"] },
    color: { control: 'select', options: ["Primary","pro","Blue","Coral","Green","Neutral"] },
    active: { control: 'boolean' },
    showLeftIcon: { control: 'boolean' },
    showRightIcon: { control: 'boolean' },
    text: { control: 'text' },
    leftIcon: { table: { disable: true } },
    rightIcon: { table: { disable: true } },
  },
  args: {
    text: '1/2 words',
    leftIcon: <DemoIcon />,
    rightIcon: <DemoIcon />,
  },
};
export default meta;

type Story = StoryObj<typeof Chips>;

// color=Primary
export const PrimaryXXSFalse: Story = {
  name: 'size=XXS, color=Primary, active=False',
  args: { size: 'XXS', color: 'Primary', active: false },
};
export const PrimaryXXSTrue: Story = {
  name: 'size=XXS, color=Primary, active=True',
  args: { size: 'XXS', color: 'Primary', active: true },
};
export const PrimaryXSFalse: Story = {
  name: 'size=XS, color=Primary, active=False',
  args: { size: 'XS', color: 'Primary', active: false },
};
export const PrimaryXSTrue: Story = {
  name: 'size=XS, color=Primary, active=True',
  args: { size: 'XS', color: 'Primary', active: true },
};
export const PrimarySFalse: Story = {
  name: 'size=S, color=Primary, active=False',
  args: { size: 'S', color: 'Primary', active: false },
};
export const PrimarySTrue: Story = {
  name: 'size=S, color=Primary, active=True',
  args: { size: 'S', color: 'Primary', active: true },
};
export const PrimaryMFalse: Story = {
  name: 'size=M, color=Primary, active=False',
  args: { size: 'M', color: 'Primary', active: false },
};
export const PrimaryMTrue: Story = {
  name: 'size=M, color=Primary, active=True',
  args: { size: 'M', color: 'Primary', active: true },
};

// color=pro
export const proXXSFalse: Story = {
  name: 'size=XXS, color=pro, active=False',
  args: { size: 'XXS', color: 'pro', active: false },
};
export const proXXSTrue: Story = {
  name: 'size=XXS, color=pro, active=True',
  args: { size: 'XXS', color: 'pro', active: true },
};
export const proXSFalse: Story = {
  name: 'size=XS, color=pro, active=False',
  args: { size: 'XS', color: 'pro', active: false },
};
export const proXSTrue: Story = {
  name: 'size=XS, color=pro, active=True',
  args: { size: 'XS', color: 'pro', active: true },
};
export const proSFalse: Story = {
  name: 'size=S, color=pro, active=False',
  args: { size: 'S', color: 'pro', active: false },
};
export const proSTrue: Story = {
  name: 'size=S, color=pro, active=True',
  args: { size: 'S', color: 'pro', active: true },
};
export const proMFalse: Story = {
  name: 'size=M, color=pro, active=False',
  args: { size: 'M', color: 'pro', active: false },
};
export const proMTrue: Story = {
  name: 'size=M, color=pro, active=True',
  args: { size: 'M', color: 'pro', active: true },
};

// color=Blue
export const BlueXXSFalse: Story = {
  name: 'size=XXS, color=Blue, active=False',
  args: { size: 'XXS', color: 'Blue', active: false },
};
export const BlueXXSTrue: Story = {
  name: 'size=XXS, color=Blue, active=True',
  args: { size: 'XXS', color: 'Blue', active: true },
};
export const BlueXSFalse: Story = {
  name: 'size=XS, color=Blue, active=False',
  args: { size: 'XS', color: 'Blue', active: false },
};
export const BlueXSTrue: Story = {
  name: 'size=XS, color=Blue, active=True',
  args: { size: 'XS', color: 'Blue', active: true },
};
export const BlueSFalse: Story = {
  name: 'size=S, color=Blue, active=False',
  args: { size: 'S', color: 'Blue', active: false },
};
export const BlueSTrue: Story = {
  name: 'size=S, color=Blue, active=True',
  args: { size: 'S', color: 'Blue', active: true },
};
export const BlueMFalse: Story = {
  name: 'size=M, color=Blue, active=False',
  args: { size: 'M', color: 'Blue', active: false },
};
export const BlueMTrue: Story = {
  name: 'size=M, color=Blue, active=True',
  args: { size: 'M', color: 'Blue', active: true },
};

// color=Coral
export const CoralXXSFalse: Story = {
  name: 'size=XXS, color=Coral, active=False',
  args: { size: 'XXS', color: 'Coral', active: false },
};
export const CoralXXSTrue: Story = {
  name: 'size=XXS, color=Coral, active=True',
  args: { size: 'XXS', color: 'Coral', active: true },
};
export const CoralXSFalse: Story = {
  name: 'size=XS, color=Coral, active=False',
  args: { size: 'XS', color: 'Coral', active: false },
};
export const CoralXSTrue: Story = {
  name: 'size=XS, color=Coral, active=True',
  args: { size: 'XS', color: 'Coral', active: true },
};
export const CoralSFalse: Story = {
  name: 'size=S, color=Coral, active=False',
  args: { size: 'S', color: 'Coral', active: false },
};
export const CoralSTrue: Story = {
  name: 'size=S, color=Coral, active=True',
  args: { size: 'S', color: 'Coral', active: true },
};
export const CoralMFalse: Story = {
  name: 'size=M, color=Coral, active=False',
  args: { size: 'M', color: 'Coral', active: false },
};
export const CoralMTrue: Story = {
  name: 'size=M, color=Coral, active=True',
  args: { size: 'M', color: 'Coral', active: true },
};

// color=Green
export const GreenXXSFalse: Story = {
  name: 'size=XXS, color=Green, active=False',
  args: { size: 'XXS', color: 'Green', active: false },
};
export const GreenXXSTrue: Story = {
  name: 'size=XXS, color=Green, active=True',
  args: { size: 'XXS', color: 'Green', active: true },
};
export const GreenXSFalse: Story = {
  name: 'size=XS, color=Green, active=False',
  args: { size: 'XS', color: 'Green', active: false },
};
export const GreenXSTrue: Story = {
  name: 'size=XS, color=Green, active=True',
  args: { size: 'XS', color: 'Green', active: true },
};
export const GreenSFalse: Story = {
  name: 'size=S, color=Green, active=False',
  args: { size: 'S', color: 'Green', active: false },
};
export const GreenSTrue: Story = {
  name: 'size=S, color=Green, active=True',
  args: { size: 'S', color: 'Green', active: true },
};
export const GreenMFalse: Story = {
  name: 'size=M, color=Green, active=False',
  args: { size: 'M', color: 'Green', active: false },
};
export const GreenMTrue: Story = {
  name: 'size=M, color=Green, active=True',
  args: { size: 'M', color: 'Green', active: true },
};

// color=Neutral
export const NeutralXXSFalse: Story = {
  name: 'size=XXS, color=Neutral, active=False',
  args: { size: 'XXS', color: 'Neutral', active: false },
};
export const NeutralXXSTrue: Story = {
  name: 'size=XXS, color=Neutral, active=True',
  args: { size: 'XXS', color: 'Neutral', active: true },
};
export const NeutralXSFalse: Story = {
  name: 'size=XS, color=Neutral, active=False',
  args: { size: 'XS', color: 'Neutral', active: false },
};
export const NeutralXSTrue: Story = {
  name: 'size=XS, color=Neutral, active=True',
  args: { size: 'XS', color: 'Neutral', active: true },
};
export const NeutralSFalse: Story = {
  name: 'size=S, color=Neutral, active=False',
  args: { size: 'S', color: 'Neutral', active: false },
};
export const NeutralSTrue: Story = {
  name: 'size=S, color=Neutral, active=True',
  args: { size: 'S', color: 'Neutral', active: true },
};
export const NeutralMFalse: Story = {
  name: 'size=M, color=Neutral, active=False',
  args: { size: 'M', color: 'Neutral', active: false },
};
export const NeutralMTrue: Story = {
  name: 'size=M, color=Neutral, active=True',
  args: { size: 'M', color: 'Neutral', active: true },
};
