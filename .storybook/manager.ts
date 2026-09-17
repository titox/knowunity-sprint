import { addons } from 'storybook/manager-api';

// Cover is the landing page for this Storybook, but it's hidden from
// the sidebar below (it isn't a design-system component). Without an
// explicit redirect, opening the root URL lands on whatever story is
// first in the visible sidebar instead -- so send a bare root visit
// (no ?path= yet) straight to Cover's Docs page.
if (!new URLSearchParams(window.location.search).get('path')) {
  const url = new URL(window.location.href);
  url.searchParams.set('path', '/docs/cover--docs');
  window.location.replace(url.toString());
}

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
