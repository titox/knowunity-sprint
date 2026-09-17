import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StatusRow } from './StatusRow';

const meta: Meta<typeof StatusRow> = {
  title: 'Components/StatusRow',
  component: StatusRow,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'What it is: a label plus a trailing chip, no leading icon. Background is interactive/secondary. Real properties: showOutline, a boolean wired to a dedicated overlay border in accent/coral/bold, not a raw stroke. The chip\'s own colour (Unaided/Hinted/Revealed/Skipped) is set by swapping or overriding the nested chip instance, statusRow has no colour property of its own. When to use: for the unified "term by term" recall-loop list, one row per term. Don\'t: don\'t set a stroke directly on the row instance, use showOutline. Don\'t assume the status colour is a variant of this component.\n\n(Source: Figma component "statusRow", node 15685:7405, Yummy__Knowie Design System. Nests this project\'s existing Chips component, size=S, matching what statusRow itself nests in Figma.)',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    chipColor: { control: 'select', options: ['Primary', 'pro', 'Blue', 'Coral', 'Green', 'Neutral'] },
    chipText: { control: 'text' },
    chipShowLeftIcon: { control: 'boolean' },
    chipShowRightIcon: { control: 'boolean' },
    showOutline: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof StatusRow>;

export const Default: Story = { args: { label: 'Row label', chipColor: 'Primary', chipText: '1/2 words' } };
export const OutlineTrue: Story = {
  name: 'showOutline=True',
  args: { label: 'La figura de Jaime I', chipColor: 'Coral', chipText: 'Revealed', showOutline: true },
};

// Practical reference for the documented status vocabulary, not
// individual Figma variants (statusRow itself has none for color).
export const Unaided: Story = { args: { label: 'La figura de Jaime I', chipColor: 'Green', chipText: 'Unaided' } };
export const Hinted: Story = { args: { label: 'El Cantar de Mio Cid', chipColor: 'Blue', chipText: 'Hinted' } };
export const Revealed: Story = { args: { label: 'La Reconquista', chipColor: 'Coral', chipText: 'Revealed' } };
export const Skipped: Story = { args: { label: 'El Siglo de Oro', chipColor: 'Neutral', chipText: 'Skipped' } };
