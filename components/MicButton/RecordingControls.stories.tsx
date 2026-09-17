import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn, expect } from 'storybook/test';
import { RecordingControls } from './RecordingControls';

const meta: Meta<typeof RecordingControls> = {
  title: 'Components/MicButton/RecordingControls',
  component: RecordingControls,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'What it is: pairs micButton with a cancel action, closing the "cancel & re-record before send" gap from voice-ux.md\'s states-to-design checklist (a Must-have -- the student must always be able to discard a take before it sends). No Figma design exists for this yet: checked both Listening screens in the flow, neither has a cancel affordance, only "Skip for now" (a different action -- skip abandons the term, cancel discards this take and re-records the same term). Composed entirely from existing, already-tokenized components: micButton unchanged, plus a Tertiary buttonIcon reusing the x-close asset already in the library (from resultRow\'s Error state). When to use: anywhere micButton appears in a live recording flow. The cancel button only renders while state="Listening" -- once state="Loading", the take has already been sent to STT/judge and canceling no longer applies. Don\'t: don\'t show this during Default/Pressed/Disabled, there is nothing to cancel yet. Don\'t treat this as final visual design -- the layout (mic + icon side by side) is a placeholder pending a real Figma pass.',
      },
    },
  },
  args: {
    'aria-label': 'Stop speaking',
    cancelAriaLabel: 'Cancel and re-record',
    onClick: fn(),
    onCancel: fn(),
  },
};
export default meta;

type Story = StoryObj<typeof RecordingControls>;

export const Listening: Story = {
  args: { state: 'Listening' },
  play: async ({ canvas, args }) => {
    const cancelButton = canvas.getByRole('button', { name: 'Cancel and re-record' });
    await cancelButton.click();
    await expect(args.onCancel).toHaveBeenCalledTimes(1);

    const micButton = canvas.getByRole('button', { name: 'Stop speaking' });
    await micButton.click();
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const DefaultNoCancelYet: Story = {
  name: 'state=Default (no cancel to offer)',
  args: { state: 'Default', 'aria-label': 'Speak' },
};
