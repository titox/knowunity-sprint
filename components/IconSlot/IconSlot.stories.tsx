import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { IconSlot } from './IconSlot';

// A generic demo icon for the story only -- iconSlot's job is to size
// whatever icon is swapped in, so there is no single real icon that
// belongs to iconSlot itself.
function DemoIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" style={{ width: '100%', height: '100%', display: 'block' }}>
      <rect x="2" y="2" width="12" height="12" rx="3" fill="currentColor" />
    </svg>
  );
}

const meta: Meta<typeof IconSlot> = {
  title: 'Components/IconSlot',
  component: IconSlot,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'What it is: a sizing wrapper that holds a swappable icon at a fixed box (100 to 400, meaning 8 to 32px). It\'s the icon carrier inside button, buttonIcon, chips and snackbar, and it\'s the most-used component on the page by far (134 instances). When to use: any time an icon sits inside another component. Swap the icon, keep the slot. Don\'t: don\'t set its size directly. The size variant is named "Size (IGNORE)", which is the system telling you the parent drives it. Detaching it to resize is the thing to avoid.\n\n(Source: Figma component "iconSlot", node 9003:8809, Yummy__Knowie Design System.)',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['100', '150', '200', '250', '300', '400'] },
    children: { table: { disable: true } },
  },
  args: {
    children: <DemoIcon />,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 16, color: 'var(--color-text-primary)' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof IconSlot>;

export const Size100: Story = { name: 'Size (IGNORE) · 100', args: { size: '100' } };
export const Size150: Story = { name: 'Size (IGNORE) · 150', args: { size: '150' } };
export const Size200: Story = { name: 'Size (IGNORE) · 200', args: { size: '200' } };
export const Size250: Story = { name: 'Size (IGNORE) · 250', args: { size: '250' } };
export const Size300: Story = { name: 'Size (IGNORE) · 300', args: { size: '300' } };
export const Size400: Story = { name: 'Size (IGNORE) · 400', args: { size: '400' } };
