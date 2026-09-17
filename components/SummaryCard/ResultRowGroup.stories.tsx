import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ResultRowGroup } from './ResultRowGroup';

const meta: Meta<typeof ResultRowGroup> = {
  title: 'Components/SummaryCard/ResultRowGroup',
  component: ResultRowGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          "What it is: the vertical stack that owns spacing for a set of resultRow instances. 4px gap, copied from the real shipped card this was reverse-engineered from. When to use: whenever more than one resultRow needs to sit together. Don't: don't set spacing by hand on loose resultRow instances placed side by side, that's this component's job.\n\n(Source: Figma component \"resultRowGroup\", node 15676:10564, Yummy__Knowie Design System.)",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof ResultRowGroup>;

export const ThreeRows: Story = {
  args: {
    rows: [
      { label: 'La figura de Jaime I', state: 'Success' },
      { label: 'El Cantar de Mio Cid', state: 'Success' },
      { label: 'La Reconquista', state: 'Success' },
    ],
  },
};

export const MixedStates: Story = {
  args: {
    rows: [
      { label: 'La figura de Jaime I', state: 'Success' },
      { label: 'El Cantar de Mio Cid', state: 'Error' },
      { label: 'La Reconquista', state: 'Success' },
    ],
  },
};

export const WithPartial: Story = {
  args: {
    rows: [
      { label: 'La figura de Jaime I', state: 'Success' },
      { label: 'El Cantar de Mio Cid', state: 'Partial' },
      { label: 'La Reconquista', state: 'Error' },
    ],
  },
};
