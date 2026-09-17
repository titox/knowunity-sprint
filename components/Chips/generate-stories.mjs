// Regenerates Chips.stories.tsx. Run with: npm run generate:chips-stories
// Same reasoning as Button's generator: Storybook's static indexer needs
// literal exports to read a custom story name.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const SIZES = ['XXS', 'XS', 'S', 'M'];
const COLORS = ['Primary', 'pro', 'Blue', 'Coral', 'Green', 'Neutral'];
const ACTIVE = [false, true];

const HEADER = `import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Chips } from './Chips';

// A generic demo icon for the story only -- chips' iconSlots accept any
// consumer-supplied icon, so there is no single real icon that belongs
// to Chips itself.
function DemoIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" style={{ width: '100%', height: '100%', display: 'block' }}>
      <circle cx="8" cy="8" r="6" fill="currentColor" />
    </svg>
  );
}

const meta: Meta<typeof Chips> = {
  title: 'Components/Chips',
  component: Chips,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'What it is: a small tag, filter, or status indicator. Three variant axes, size (XXS, XS, S, M), color (Primary, pro, Blue, Coral, Green, Neutral), active (False, True). Optional showLeftIcon, showRightIcon, and an editable Text property. When to use: for a compact label that needs a colour signal, a filter chip, a Pro badge, or a term\\'s recall status in the unified session-summary list (Blue for Hinted, Coral for Revealed, Green for Unaided, Neutral for Skipped). Don\\'t: don\\'t reuse pro for anything that isn\\'t the actual Pro subscription feature, that mistake is why Blue/Coral/Green/Neutral exist now. Don\\'t assume this set\\'s boolean and text properties survive a recombine untouched, they\\'ve been lost and had to be rebuilt more than once; verify after any structural edit to this set rather than trusting it held.\\n\\n(Source: Figma component "chips", node 15690:9427, Yummy__Knowie Design System.)',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ${JSON.stringify(SIZES)} },
    color: { control: 'select', options: ${JSON.stringify(COLORS)} },
    active: { control: 'boolean' },
    showLeftIcon: { control: 'boolean' },
    showRightIcon: { control: 'boolean' },
    text: { control: 'text' },
    leftIcon: { table: { disable: true } },
    rightIcon: { table: { disable: true } },
  },
  args: {
    text: '1/2 words',
    leftIcon: <DemoIcon />,
    rightIcon: <DemoIcon />,
  },
};
export default meta;

type Story = StoryObj<typeof Chips>;
`;

function storyBlock(size, color, active) {
  const exportName = `${color.replace(/[^a-zA-Z0-9]/g, '')}${size}${active ? 'True' : 'False'}`;
  const name = `size=${size}, color=${color}, active=${active ? 'True' : 'False'}`;
  return `export const ${exportName}: Story = {\n  name: '${name}',\n  args: { size: '${size}', color: '${color}', active: ${active} },\n};`;
}

const sections = COLORS.map((color) => {
  const blocks = SIZES.flatMap((size) => ACTIVE.map((active) => storyBlock(size, color, active)));
  return `\n// color=${color}\n${blocks.join('\n')}`;
});

const outPath = fileURLToPath(new URL('./Chips.stories.tsx', import.meta.url));
writeFileSync(outPath, HEADER + sections.join('\n') + '\n');
console.log(`Generated ${SIZES.length * COLORS.length * ACTIVE.length} stories -> ${outPath}`);
