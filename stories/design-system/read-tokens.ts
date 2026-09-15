import tokens from '../../tokens/tokens.json';
import { cssVarName } from '../../tokens/css-var-name.mjs';

type TokenNode = Record<string, unknown>;

interface LeafToken {
  path: string[];
  $type: string;
  $value: unknown;
  $description?: string;
}

function isLeaf(node: unknown): node is LeafToken {
  return (
    typeof node === 'object' &&
    node !== null &&
    '$type' in node &&
    '$value' in node
  );
}

// Walks the DTCG tree and returns every leaf token (one with its own $type
// and $value), each carrying the full path of keys used to reach it.
function walk(node: unknown, path: string[] = []): LeafToken[] {
  if (isLeaf(node)) {
    return [{ ...node, path } as LeafToken];
  }
  if (typeof node === 'object' && node !== null) {
    return Object.entries(node as TokenNode).flatMap(([key, value]) =>
      key.startsWith('$') ? [] : walk(value, [...path, key]),
    );
  }
  return [];
}

const varOf = (t: LeafToken) => `--${cssVarName(t.$type, t.path)}`;

// The semantic color groups, in the order design-system.md lists them.
// "color" itself is excluded -- that's the primitive layer, and per
// design-system.md rule 5 a story should never bind to it directly. "Homie"
// is excluded too: it's a leftover raw-value duplicate, not part of the
// semantic system described in design-system.md.
const SEMANTIC_COLOR_GROUPS = [
  'background',
  'interactive',
  'text',
  'mascot',
  'border',
  'accent',
  'pro',
  'feedback',
  'highlight',
];

export interface ColorToken {
  name: string;
  varName: string;
  description: string | null;
}

export interface ColorGroup {
  name: string;
  tokens: ColorToken[];
}

export function getColorGroups(): ColorGroup[] {
  return SEMANTIC_COLOR_GROUPS.map((groupName) => {
    const leaves = walk(
      (tokens as unknown as TokenNode)[groupName],
      [groupName],
    ).filter((t) => t.$type === 'color');
    return {
      name: groupName,
      tokens: leaves.map((t) => ({
        name: t.path.join('.'),
        varName: varOf(t),
        description: t.$description ?? null,
      })),
    };
  });
}

export interface TypeStyle {
  name: string;
  vars: {
    fontFamily: string;
    fontWeight: string;
    fontSize: string;
    lineHeight: string;
  };
  description: string | null;
  fontSizePx: number;
}

export function getTypeScale(): TypeStyle[] {
  const leaves = walk((tokens as unknown as TokenNode).typography, [
    'typography',
  ]);

  const byStyle = new Map<string, LeafToken[]>();
  for (const leaf of leaves) {
    // path is ["typography", category, size, property], e.g.
    // ["typography", "Display", "L", "fontSize"]
    const styleKey = leaf.path.slice(1, 3).join(' / ');
    if (!byStyle.has(styleKey)) byStyle.set(styleKey, []);
    byStyle.get(styleKey)!.push(leaf);
  }

  const entries: TypeStyle[] = Array.from(byStyle.entries()).map(
    ([styleKey, props]) => {
      const byProp = Object.fromEntries(
        props.map((p) => [p.path[3], p]),
      ) as Record<'fontFamily' | 'fontWeight' | 'fontSize' | 'lineHeight', LeafToken>;

      return {
        name: styleKey,
        vars: {
          fontFamily: varOf(byProp.fontFamily),
          fontWeight: varOf(byProp.fontWeight),
          fontSize: varOf(byProp.fontSize),
          lineHeight: varOf(byProp.lineHeight),
        },
        description: byProp.fontSize.$description ?? null,
        fontSizePx: (byProp.fontSize.$value as { value: number }).value,
      };
    },
  );

  return entries.sort((a, b) => b.fontSizePx - a.fontSizePx);
}
