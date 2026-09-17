import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ChoiceRow } from './ChoiceRow';

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: '100%', height: '100%', display: 'block' }}>
      <rect x="9" y="2" width="6" height="12" rx="3" fill="currentColor" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  );
}

const meta: Meta<typeof ChoiceRow> = {
  title: 'Components/ChoiceRow',
  component: ChoiceRow,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'What it is: a selectable option row. An iconSlot, a textBlock (title and caption), and a hidden-by-default trailingCheck. showSelected is a real boolean that reveals both the checkmark and a dedicated accent/brand/bold overlay border. When to use: for the Speak/Write choice at the top of the recall loop, or anywhere presenting mutually exclusive options as rows. Don\'t: don\'t force an icon into the slot when no real one exists for the concept. At the time this was built, no "write" icon existed in this file\'s library; a placeholder was used and flagged rather than faked.\n\n(Source: Figma component "choiceRow", node 15685:7435, Yummy__Knowie Design System. Built from this project\'s existing IconSlot and TextBlock components.)',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    caption: { control: 'text' },
    showSelected: { control: 'boolean' },
    icon: { table: { disable: true } },
  },
  args: {
    title: 'Speak',
    caption: 'Explain it loud',
    icon: <MicIcon />,
  },
};
export default meta;

type Story = StoryObj<typeof ChoiceRow>;

export const Default: Story = { args: { showSelected: false } };
export const Selected: Story = { name: 'showSelected=True', args: { showSelected: true } };
