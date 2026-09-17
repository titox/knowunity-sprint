import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProgressIndicator } from './ProgressIndicator';

const meta: Meta<typeof ProgressIndicator> = {
  title: 'Components/ProgressIndicator',
  component: ProgressIndicator,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'What it is: a progress element in five fixed levels (0, 25, 50, 75, 100), two thicknesses (24, 16), two colours (Primary, Coral), with optional count text such as "0/12". When to use: showing how far through a task, quiz or plan someone is. The "0/12" placeholder points at quiz or step counts. Seen in the Dark screens. Don\'t: don\'t use it for precise or continuously moving values. It snaps to 25% steps, so a real 63% will misrepresent.\n\n(Source: Figma component "progressIndicator", node 9003:8923, Yummy__Knowie Design System.)',
      },
    },
    layout: 'padded',
  },
  argTypes: {
    variant: { control: 'select', options: ['Primary', 'Coral'] },
    thickness: { control: 'select', options: ['16', '24'] },
    progress: { control: 'select', options: ['0', '25', '50', '75', '100'] },
    showText: { control: 'boolean' },
    label: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof ProgressIndicator>;

// variant=Primary, thickness=24
export const PrimaryT24P0: Story = {
  name: 'variant=Primary, thickness=24, progress=0',
  args: { variant: 'Primary', thickness: '24', progress: '0', showText: true, label: '0/12' },
};
export const PrimaryT24P25: Story = {
  name: 'variant=Primary, thickness=24, progress=25',
  args: { variant: 'Primary', thickness: '24', progress: '25', showText: true, label: '3/12' },
};
export const PrimaryT24P50: Story = {
  name: 'variant=Primary, thickness=24, progress=50',
  args: { variant: 'Primary', thickness: '24', progress: '50', showText: true, label: '6/12' },
};
export const PrimaryT24P75: Story = {
  name: 'variant=Primary, thickness=24, progress=75',
  args: { variant: 'Primary', thickness: '24', progress: '75', showText: true, label: '9/12' },
};
export const PrimaryT24P100: Story = {
  name: 'variant=Primary, thickness=24, progress=100',
  args: { variant: 'Primary', thickness: '24', progress: '100', showText: true, label: '12/12' },
};

// variant=Primary, thickness=16
export const PrimaryT16P0: Story = {
  name: 'variant=Primary, thickness=16, progress=0',
  args: { variant: 'Primary', thickness: '16', progress: '0' },
};
export const PrimaryT16P25: Story = {
  name: 'variant=Primary, thickness=16, progress=25',
  args: { variant: 'Primary', thickness: '16', progress: '25' },
};
export const PrimaryT16P50: Story = {
  name: 'variant=Primary, thickness=16, progress=50',
  args: { variant: 'Primary', thickness: '16', progress: '50' },
};
export const PrimaryT16P75: Story = {
  name: 'variant=Primary, thickness=16, progress=75',
  args: { variant: 'Primary', thickness: '16', progress: '75' },
};
export const PrimaryT16P100: Story = {
  name: 'variant=Primary, thickness=16, progress=100',
  args: { variant: 'Primary', thickness: '16', progress: '100' },
};

// variant=Coral, thickness=24
export const CoralT24P0: Story = {
  name: 'variant=Coral, thickness=24, progress=0',
  args: { variant: 'Coral', thickness: '24', progress: '0', showText: true, label: '0/12' },
};
export const CoralT24P25: Story = {
  name: 'variant=Coral, thickness=24, progress=25',
  args: { variant: 'Coral', thickness: '24', progress: '25', showText: true, label: '3/12' },
};
export const CoralT24P50: Story = {
  name: 'variant=Coral, thickness=24, progress=50',
  args: { variant: 'Coral', thickness: '24', progress: '50', showText: true, label: '6/12' },
};
export const CoralT24P75: Story = {
  name: 'variant=Coral, thickness=24, progress=75',
  args: { variant: 'Coral', thickness: '24', progress: '75', showText: true, label: '9/12' },
};
export const CoralT24P100: Story = {
  name: 'variant=Coral, thickness=24, progress=100',
  args: { variant: 'Coral', thickness: '24', progress: '100', showText: true, label: '12/12' },
};

// variant=Coral, thickness=16
export const CoralT16P0: Story = {
  name: 'variant=Coral, thickness=16, progress=0',
  args: { variant: 'Coral', thickness: '16', progress: '0' },
};
export const CoralT16P25: Story = {
  name: 'variant=Coral, thickness=16, progress=25',
  args: { variant: 'Coral', thickness: '16', progress: '25' },
};
export const CoralT16P50: Story = {
  name: 'variant=Coral, thickness=16, progress=50',
  args: { variant: 'Coral', thickness: '16', progress: '50' },
};
export const CoralT16P75: Story = {
  name: 'variant=Coral, thickness=16, progress=75',
  args: { variant: 'Coral', thickness: '16', progress: '75' },
};
export const CoralT16P100: Story = {
  name: 'variant=Coral, thickness=16, progress=100',
  args: { variant: 'Coral', thickness: '16', progress: '100' },
};
