import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TextField } from './TextField';

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: '100%', height: '100%', display: 'block' }}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M20 20L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" style={{ width: '100%', height: '100%', display: 'block' }}>
      <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          "What it is: a text input with five states (Default, Focused, Filled, Error, Disabled), an optional leading icon via iconSlot, and a trailing action bound to a real buttonIcon instance, never a slot, since it's always a clear or mic-toggle control, plus optional helper/error text. When to use: for a single line of typed input, such as the free-text answer on the \"switch to typing\" screen. Don't: don't treat the trailing action as a place for arbitrary content, it's a fixed control, not a slot. Also don't trust the component's own default variant, it's currently set to Error in this file, a known bug, so always set state=Default explicitly when placing a new instance.\n\n(Source: Figma component \"textField\", node 4517:2132, Yummy__Knowie Design System. Figma binds this component's own text to Inter Variable at raw 14px/11px, not any Greed typography token -- a real inconsistency in the source file. Built instead with the nearest Greed tokens (Body S Regular / Caption S Regular) per direction, so it stays visually consistent with the rest of this system. Reuses this project's existing IconSlot and ButtonIcon components, matching what textField itself nests in Figma.)",
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['Default', 'Focused', 'Filled', 'Error', 'Disabled'] },
    titleText: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    showTitle: { control: 'boolean' },
    showLeadingIcon: { control: 'boolean' },
    showTrailingAction: { control: 'boolean' },
    showHelperText: { control: 'boolean' },
    helperText: { control: 'text' },
    errorCaption: { control: 'text' },
    leadingIcon: { table: { disable: true } },
    trailingIcon: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onTrailingActionClick: { table: { disable: true } },
  },
  args: {
    leadingIcon: <SearchIcon />,
    trailingIcon: <ClearIcon />,
  },
};
export default meta;

type Story = StoryObj<typeof TextField>;

export const Default: Story = { args: { variant: 'Default' } };
export const Focused: Story = { args: { variant: 'Focused', value: 'User input...' } };
export const Filled: Story = { args: { variant: 'Filled', value: 'User input...' } };
export const Error: Story = {
  args: { variant: 'Error', value: 'User input...', showHelperText: true },
};
export const Disabled: Story = { args: { variant: 'Disabled', value: 'User input...' } };
export const WithTrailingAction: Story = {
  args: { variant: 'Focused', value: 'User input...', showTrailingAction: true },
};
