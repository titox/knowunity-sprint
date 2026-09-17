// Regenerates ButtonIcon.stories.tsx. Run with:
// npm run generate:button-icon-stories
//
// Same constraint as Button's generator: Storybook's static indexer can't
// execute a factory function to learn a story's name, so each of the 36
// Figma variant combinations needs a literal export. Edit here, then
// regenerate -- don't hand-edit the generated file.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const VARIANTS = ['Primary', 'Secondary', 'Tertiary'];
const SIZES = ['S', 'M', 'L'];
const STATES = ['Default', 'Pressed', 'Disabled', 'Loading'];

const HEADER = `import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ButtonIcon } from './ButtonIcon';

// A generic demo icon for the story only -- ButtonIcon's iconSlot accepts
// any consumer-supplied icon (design-system.md: "swap the icon, leave the
// slot alone"), so there is no single real icon that belongs to
// ButtonIcon itself. This is not a reproduction of a specific
// Figma-designed icon.
function DemoIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" style={{ width: '100%', height: '100%', display: 'block' }}>
      <path d="M8 1L2 4.5V11.5L8 15L14 11.5V4.5L8 1Z" fill="currentColor" />
    </svg>
  );
}

const meta: Meta<typeof ButtonIcon> = {
  title: 'Components/ButtonIcon',
  component: ButtonIcon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'What it is: an icon-only button sharing button\\'s full matrix, three emphasis levels by three sizes by four states, with the icon carried in iconSlot. When to use: compact actions where the icon alone carries the meaning, such as a toolbar or app bar. Seen in the Dark and Entry points screens. Don\\'t: don\\'t use it for an action whose meaning isn\\'t obvious without a label. If it needs words to be understood, use button. (Inferred from the fact that it has no text layer.)\\n\\n(Source: Figma component "buttonIcon", node 9003:8235, Yummy__Knowie Design System.)',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ${JSON.stringify(VARIANTS)} },
    size: { control: 'select', options: ${JSON.stringify(SIZES)} },
    state: { control: 'select', options: ${JSON.stringify(STATES)} },
    icon: { table: { disable: true } },
    onClick: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: {
    icon: <DemoIcon />,
    'aria-label': 'Demo action',
  },
};
export default meta;

type Story = StoryObj<typeof ButtonIcon>;
`;

function storyBlock(variant, size, state) {
  const exportName = `${variant}${size}${state}`;
  // "/" has special sidebar-nesting meaning to Storybook and gets stripped
  // from a story name, so this uses "·" -- same as Button.
  const name = `${variant} · ${size} · ${state}`;
  return `export const ${exportName}: Story = {\n  name: '${name}',\n  args: { variant: '${variant}', size: '${size}', state: '${state}' },\n};`;
}

const sections = VARIANTS.map((variant) => {
  const blocks = SIZES.flatMap((size) => STATES.map((state) => storyBlock(variant, size, state)));
  return `\n// ${variant}\n${blocks.join('\n')}`;
});

const outPath = fileURLToPath(new URL('./ButtonIcon.stories.tsx', import.meta.url));
writeFileSync(outPath, HEADER + sections.join('\n') + '\n');
console.log(`Generated ${VARIANTS.length * SIZES.length * STATES.length} stories -> ${outPath}`);
