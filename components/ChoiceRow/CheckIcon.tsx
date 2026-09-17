// Path data copied verbatim from the downloaded "check" asset (via
// get_design_context on choiceRow). trailingCheck is a fixed built-in
// element, not a swappable iconSlot, so this is inlined the same way as
// Button's LoadingSpinner and MicButton's MicrophoneIcon.
export function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', width: '100%', height: '100%' }}
      aria-hidden="true"
    >
      <path
        d="M19.293 5.29297C19.6835 4.90244 20.3165 4.90244 20.707 5.29297C21.0976 5.68349 21.0976 6.31651 20.707 6.70703L9.70703 17.707C9.31651 18.0976 8.68349 18.0976 8.29297 17.707L3.29297 12.707C2.90244 12.3165 2.90244 11.6835 3.29297 11.293C3.68349 10.9024 4.31651 10.9024 4.70703 11.293L9 15.5859L19.293 5.29297Z"
        fill="currentColor"
      />
    </svg>
  );
}
