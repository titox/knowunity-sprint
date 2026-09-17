import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SummaryCard } from './SummaryCard';

const meta: Meta<typeof SummaryCard> = {
  title: 'Components/SummaryCard',
  component: SummaryCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'What it is: the green results-card wrapper. A title and a resultRowGroup instance, radius 30, copied from the one real shipped card this was based on. When to use: for the "Buenas explicaciones" success summary specifically. Don\'t: don\'t reuse this for "Worth another look", that section is now a flat unified list of statusRow instances, no card wrapper.\n\n(Source: Figma component "summaryCard", node 15674:10546, Yummy__Knowie Design System. Built from this project\'s existing ResultRowGroup, which in turn nests ResultRow -- matching what summaryCard itself nests.)',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof SummaryCard>;

export const Default: Story = {
  args: {
    title: 'Buenas explicaciones',
    rows: [
      { label: 'La figura de Jaime I', state: 'Success' },
      { label: 'El Cantar de Mio Cid', state: 'Success' },
      { label: 'La Reconquista', state: 'Success' },
    ],
  },
};
