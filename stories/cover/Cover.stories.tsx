import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Cover } from './Cover';

const meta: Meta<typeof Cover> = {
  title: 'Cover',
  component: Cover,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The landing page for this Storybook. One card per component (not per story/variant) -- each card is a live, real rendering of that component, not a static screenshot, so it can never drift out of sync. Click a card to open that component\'s Docs page.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Cover>;

export const Page: Story = {};
