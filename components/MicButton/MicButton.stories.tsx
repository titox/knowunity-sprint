import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MicButton } from './MicButton';

const meta: Meta<typeof MicButton> = {
  title: 'Components/MicButton',
  component: MicButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          "What it is: the circular voice-capture control. Five states, Default, Pressed, Disabled, Loading, Listening, reusing buttonIcon's own state vocabulary rather than inventing new names. Listening adds a translucent pulse ring in accent/brand/bold that extends past the button's own edge. When to use: for the primary tap-to-speak action on recall-loop screens. Don't: don't treat Listening as finished motion. It's one static frame of what should be an animated, repeating pulse; there's no real timing or animation spec behind it yet.\n\n(Source: Figma component \"micButton\", node 15681:2467, Yummy__Knowie Design System. Microphone icon and loading spinner are downloaded Figma assets, inlined as JSX for currentColor support -- the loading spinner is reused directly from Button's LoadingSpinner, same underlying asset.)",
      },
    },
  },
  argTypes: {
    state: { control: 'select', options: ['Default', 'Pressed', 'Disabled', 'Loading', 'Listening'] },
  },
  args: {
    'aria-label': 'Speak',
  },
};
export default meta;

type Story = StoryObj<typeof MicButton>;

export const Default: Story = { args: { state: 'Default' } };
export const Pressed: Story = { args: { state: 'Pressed' } };
export const Disabled: Story = { args: { state: 'Disabled' } };
export const Loading: Story = { args: { state: 'Loading', 'aria-label': 'Listening to your answer' } };
export const Listening: Story = { args: { state: 'Listening', 'aria-label': 'Stop speaking' } };
