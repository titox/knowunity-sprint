import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { TopBar } from './TopBar';

const meta: Meta<typeof TopBar> = {
  title: 'Components/TopBar',
  component: TopBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          "What it is: the close button, progress bar, and streak counter shown at the top of every recall-loop screen. Not a Figma component with its own name -- Figma calls the equivalent arrangement appBar, built from a slot plus separate progressIndicator and streakCounter instances, none of which (besides progressIndicator) were ever built as real Storybook components. This composes real pieces only: ButtonIcon (close), progressIndicator (unchanged), and a disclosed bolt icon asset for the streak count -- same as Figma's own streakCounter note, 'hand-drawn artwork, not a library icon.'\n\nWhen to use: at the top of every app/recall/** screen, driven by the real session context (app/recall/session-context.tsx), never a hardcoded value.\n\nDon't: don't pass a progress percentage that isn't snapped to progressIndicator's own 5 discrete steps -- termIndex/totalTerms get rounded internally, so pass real term counts, not a pre-rounded percent.",
      },
    },
  },
  args: {
    onClose: fn(),
  },
};
export default meta;

type Story = StoryObj<typeof TopBar>;

export const Term1of3NoStreak: Story = {
  name: 'term 1 of 3, streak 0',
  args: { termIndex: 1, totalTerms: 3, streak: 0 },
};

export const Term2of3: Story = {
  name: 'term 2 of 3, streak 1',
  args: { termIndex: 2, totalTerms: 3, streak: 1 },
};

export const Term3of3: Story = {
  name: 'term 3 of 3, streak 2',
  args: { termIndex: 3, totalTerms: 3, streak: 2 },
};
