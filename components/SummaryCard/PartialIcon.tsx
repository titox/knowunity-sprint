// No Figma source exists for a Partial result icon yet (Partial wasn't a
// designed state before this addition) -- this is a plain placeholder
// dash glyph, not an asset pulled from Figma. Swap it for the real icon
// once Partial is designed there.
export function PartialIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', width: '100%', height: '100%' }}
      aria-hidden="true"
    >
      <path
        d="M6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12Z"
        fill="currentColor"
      />
    </svg>
  );
}
