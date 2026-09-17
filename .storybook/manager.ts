import { addons } from 'storybook/manager-api';

// Cover isn't a design-system component -- it's this Storybook's own
// landing page -- so it doesn't belong in the sidebar tree next to
// Button, Chips, etc. Filtering it out of the sidebar still leaves the
// page itself reachable directly (e.g. the Storybook's root URL).
addons.setConfig({
  sidebar: {
    filters: {
      patterns: (item) => item.title !== 'Cover',
    },
  },
});
