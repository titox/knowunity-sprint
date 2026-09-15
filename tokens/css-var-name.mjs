// The one place that decides how a token's $type and path turn into a CSS
// variable name. style-dictionary.config.mjs uses this to generate
// build/css/tokens.css, and the Storybook design-system stories use it to
// compute the same variable names when reading that file back — so the two
// can never drift apart.
export function cssVarName($type, path) {
  // Skip the type prefix when the path already starts with it
  // (e.g. color.navy.800), so we don't end up with "color-color-navy-800".
  const parts = path[0] === $type ? path : [$type, ...path];
  return parts
    .join(' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
