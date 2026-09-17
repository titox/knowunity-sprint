import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Unstyled } from '@storybook/addon-docs/blocks';
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
      // The default autodocs page renders a Title/Subtitle/Description
      // header, then the story wrapped in a padded, bordered Canvas frame
      // (built for inspecting a component in isolation). Cover already has
      // its own H1 and is meant to fill the screen, so both are redundant
      // here -- this override replaces the whole page with just the
      // component itself, no header, no frame, no padding.
      //
      // Storybook's own docs chrome wraps everything in two more
      // containers that survive the Unstyled block: .sbdocs-wrapper
      // (white background, 64px/40px padding) and .sbdocs-content
      // (centered, 1000px max-width) inside it. A negative margin can't
      // reach the wrapper's white background -- only `position: fixed`
      // pulls this out of that flow entirely and paints over it with the
      // real page background, filling the iframe edge-to-edge.
      page: () => (
        <Unstyled>
          <div
            style={{
              position: 'fixed',
              inset: 0,
              overflow: 'auto',
              background: 'var(--color-background-page)',
            }}
          >
            <div style={{ paddingTop: 150 }}>
              <Cover />
            </div>
          </div>
        </Unstyled>
      ),
    },
  },
};
export default meta;

type Story = StoryObj<typeof Cover>;

export const Page: Story = {};
