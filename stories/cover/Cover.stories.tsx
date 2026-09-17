import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Cover } from './Cover';

const meta: Meta<typeof Cover> = {
  title: 'Cover',
  component: Cover,
  // Neither parameters.viewport.disable nor a per-story globals override
  // actually resets the 390px canvas width in this Storybook version --
  // both are documented mechanisms that didn't work empirically here.
  // What does work (already proven by the Design System pages): the Docs
  // tab always renders at full browser width regardless of the viewport
  // global. tags: ['autodocs'] gives this page a Docs entry, which is
  // full width -- the Canvas "Page" story stays 390px, same as every
  // other component's Canvas view, which is consistent rather than a bug.
  tags: ['autodocs'],
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
