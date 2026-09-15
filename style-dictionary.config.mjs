import StyleDictionary from 'style-dictionary';
import { cssVarName } from './tokens/css-var-name.mjs';

// A "transform" tells Style Dictionary how to turn one token into one piece
// of output. This one builds the CSS variable's name: it takes the token's
// own type (color, dimension, fontFamily, fontWeight) and its full path
// (e.g. interactive -> primary) and joins them with dashes, so nothing is
// shortened or renamed along the way.
StyleDictionary.registerTransform({
  name: 'name/type-path-kebab',
  type: 'name',
  transform: (token) => cssVarName(token.$type, token.path),
});

export default {
  source: ['tokens/tokens.json'],
  // The tokens.json file uses the DTCG (Design Tokens Community Group)
  // format -- the standard shape for a tokens file, with keys like $type
  // and $value. This line tells Style Dictionary to read it that way.
  usesDtcg: true,
  platforms: {
    css: {
      transforms: ['name/type-path-kebab', 'color/css', 'size/px', 'fontFamily/css'],
      buildPath: 'build/css/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },
};
