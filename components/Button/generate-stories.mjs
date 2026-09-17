// Regenerates Button.stories.tsx. Run with: npm run generate:button-stories
//
// Storybook's static story indexer parses this file's source with an AST
// parser -- it cannot execute a factory function to learn a story's name,
// so each of the 36 Figma variant combinations (3 variants x 3 sizes x 4
// states) needs its own literal `export const Foo: Story = {...}` block.
// Hand-maintaining that is error-prone, so this script is the source of
// truth: edit here, then regenerate, rather than editing the generated
// file directly.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const VARIANTS = ['Primary', 'Secondary', 'Tertiary'];
const SIZES = ['S', 'M', 'L'];
const STATES = ['Default', 'Pressed', 'Disabled', 'Loading'];

const HEADER = `import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';

// A generic demo icon for the story only -- Button's iconSlots accept any
// consumer-supplied icon (design-system.md: "swap the icon, leave the slot
// alone"), so there is no single real icon that belongs to Button itself.
// This is not a reproduction of a specific Figma-designed icon.
function DemoIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" style={{ width: '100%', height: '100%', display: 'block' }}>
      <circle cx="8" cy="8" r="6" fill="currentColor" />
    </svg>
  );
}

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  // Without this, Storybook never builds a Docs page for Button at all --
  // the component description below would exist in source but be
  // unreachable from the UI. Colors/Type/Spacing/Radius already have this.
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'What it is: the standard text button. Three emphasis levels (Primary, Secondary, Tertiary), three sizes (S, M, L), four states (Default, Pressed, Disabled, Loading), an editable CTA, and optional left or right icons via iconSlot. When to use: for any action carried by a word or two. The CTA placeholder literally reads "1/2 words". Seen in the Dark screens. Don\\'t: don\\'t build a disabled or loading look by hand. Those are states on the component, so switch the state rather than dimming or overlaying a spinner yourself.\\n\\n(Source: Figma component "button", node 9003:6667, Yummy__Knowie Design System.)',
      },
    },
  },
  // Explicit control types so the Controls panel gives real knobs --
  // dropdowns for the Figma variant axes, toggles for the icon slots --
  // instead of react-docgen's default guesses (which render leftIcon /
  // rightIcon as raw object editors, not useful for a ReactNode).
  argTypes: {
    variant: { control: 'select', options: ${JSON.stringify(VARIANTS)} },
    size: { control: 'select', options: ${JSON.stringify(SIZES)} },
    state: { control: 'select', options: ${JSON.stringify(STATES)} },
    cta: { control: 'text' },
    showLeftIcon: { control: 'boolean' },
    showRightIcon: { control: 'boolean' },
    leftIcon: { table: { disable: true } },
    rightIcon: { table: { disable: true } },
    onClick: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: {
    cta: '1/2 words',
  },
};
export default meta;

type Story = StoryObj<typeof Button>;
`;

function storyBlock(variant, size, state) {
  const exportName = `${variant}${size}${state}`;
  const withIcons = state === 'Default';
  const args = [`variant: '${variant}'`, `size: '${size}'`, `state: '${state}'`];
  if (withIcons) {
    args.push('showLeftIcon: true', 'showRightIcon: true', 'leftIcon: <DemoIcon />', 'rightIcon: <DemoIcon />');
  }
  // "/" has special sidebar-nesting meaning to Storybook and gets stripped
  // from a story name, so this uses "·" to keep the Figma variant order
  // (Variant · Size · State) visible as written.
  return `export const ${exportName}: Story = {\n  name: '${variant} · ${size} · ${state}',\n  args: { ${args.join(', ')} },\n};`;
}

const sections = VARIANTS.map((variant) => {
  const blocks = SIZES.flatMap((size) => STATES.map((state) => storyBlock(variant, size, state)));
  return `\n// ${variant}\n${blocks.join('\n')}`;
});

const outPath = fileURLToPath(new URL('./Button.stories.tsx', import.meta.url));
writeFileSync(outPath, HEADER + sections.join('\n') + '\n');
console.log(`Generated ${VARIANTS.length * SIZES.length * STATES.length} stories -> ${outPath}`);
