import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ResultRow } from './ResultRow';

const meta: Meta<typeof ResultRow> = {
  title: 'Components/SummaryCard/ResultRow',
  component: ResultRow,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'What it is: a single term result inside a summary card. Two variant axes, state (Success, Error, Partial) and position (Top, Middle, Bottom). Position only changes corner radius, an outer corner on the edge of a stack, an inner corner everywhere else, so three or more instances read as one continuous shape when placed in a resultRowGroup. When to use: only inside a resultRowGroup, itself only inside a summaryCard. Built specifically for the "Buenas explicaciones" pattern. Don\'t: don\'t add a trailing chip, it had one during development and was removed, this is icon and label only. Don\'t reach for this for the "Worth another look" row style either, that\'s statusRow\'s job.\n\n(Source: Figma component "resultRow", node 15677:10626, Yummy__Knowie Design System. Background is always accent/green/subtle regardless of state -- confirmed from the Figma code, not conditioned on Success/Error.)\n\nPartial is not yet designed in Figma (added to close a gap against voice-ux.md\'s "Result: pass/partial/fail" requirement). It uses a new feedback.partial.* token group (magenta, chosen to avoid colliding with existing green=success/red=error/coral=revealed/blue=hinted meanings) and a placeholder dash icon, not a Figma-sourced asset. Replace both once Partial has a real design.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    state: { control: 'select', options: ['Success', 'Error', 'Partial'] },
    position: { control: 'select', options: ['Top', 'Middle', 'Bottom'] },
  },
};
export default meta;

type Story = StoryObj<typeof ResultRow>;

export const SuccessTop: Story = { name: 'state=Success, position=Top', args: { state: 'Success', position: 'Top' } };
export const SuccessMiddle: Story = { name: 'state=Success, position=Middle', args: { state: 'Success', position: 'Middle' } };
export const SuccessBottom: Story = { name: 'state=Success, position=Bottom', args: { state: 'Success', position: 'Bottom' } };
export const ErrorTop: Story = { name: 'state=Error, position=Top', args: { state: 'Error', position: 'Top' } };
export const ErrorMiddle: Story = { name: 'state=Error, position=Middle', args: { state: 'Error', position: 'Middle' } };
export const ErrorBottom: Story = { name: 'state=Error, position=Bottom', args: { state: 'Error', position: 'Bottom' } };
export const PartialTop: Story = { name: 'state=Partial, position=Top', args: { state: 'Partial', position: 'Top' } };
export const PartialMiddle: Story = { name: 'state=Partial, position=Middle', args: { state: 'Partial', position: 'Middle' } };
export const PartialBottom: Story = { name: 'state=Partial, position=Bottom', args: { state: 'Partial', position: 'Bottom' } };
