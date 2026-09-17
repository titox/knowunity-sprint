import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SkeletonLines, SkeletonLine } from './SkeletonLines';

const meta: Meta<typeof SkeletonLines> = {
  title: 'Components/SkeletonLines',
  component: SkeletonLines,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'What it is: three skeletonLine instances, 16px gap, 16px padding, last line at roughly half width, matching the real shipped loading state exactly. When to use: for a "working" or "checking your answer" state, wherever content is about to appear but isn\'t ready yet. Don\'t: don\'t present this as finished motion design, it\'s a static frame with no shimmer or pulse behind it.\n\nskeletonLine (the atom): background/floating at 60% opacity, radius 32, copied exactly from the real loading state already shipped on the "Working, never blank" screen. Only meant to be used inside skeletonLines -- don\'t use it standalone at a different size.\n\n(Source: Figma components "skeletonLines" (node 15681:2518) and "skeletonLine" (node 15681:2517), Yummy__Knowie Design System.)',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof SkeletonLines>;

export const Default: Story = {};

// SkeletonLine shown here only to document the atom -- per its own Figma
// description, it's not meant to be used standalone outside SkeletonLines.
export const SkeletonLineAtom: Story = {
  render: () => (
    <div style={{ padding: 16 }}>
      <SkeletonLine />
    </div>
  ),
};
