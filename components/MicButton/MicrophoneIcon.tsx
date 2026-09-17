// Path data copied verbatim from the downloaded microphone-01 asset
// (node 3248:77733, via get_design_context on micButton). Inlined as JSX
// rather than <img>, same reasoning as Button's LoadingSpinner: needs
// currentColor since Default/Disabled render it in different colors.
export function MicrophoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', width: '100%', height: '100%' }}
      aria-hidden="true"
    >
      <path
        d="M5.33333 16V13.3333C5.33333 12.597 5.93029 12 6.66667 12C7.40305 12 8 12.597 8 13.3333V16C8 20.4183 11.5817 24 16 24C20.4183 24 24 20.4183 24 16V13.3333C24 12.597 24.597 12 25.3333 12C26.0697 12 26.6667 12.597 26.6667 13.3333V16C26.6667 21.4393 22.5949 25.9244 17.3333 26.5807V28H21.3333C22.0697 28 22.6667 28.597 22.6667 29.3333C22.6667 30.0697 22.0697 30.6667 21.3333 30.6667H10.6667C9.93029 30.6667 9.33333 30.0697 9.33333 29.3333C9.33333 28.597 9.93029 28 10.6667 28H14.6667V26.5807C9.40512 25.9244 5.33333 21.4393 5.33333 16ZM18.6667 6.66667C18.6667 5.19391 17.4728 4 16 4C14.5272 4 13.3333 5.19391 13.3333 6.66667V16C13.3333 17.4728 14.5272 18.6667 16 18.6667C17.4728 18.6667 18.6667 17.4728 18.6667 16V6.66667ZM21.3333 16C21.3333 18.9455 18.9455 21.3333 16 21.3333C13.0545 21.3333 10.6667 18.9455 10.6667 16V6.66667C10.6667 3.72115 13.0545 1.33333 16 1.33333C18.9455 1.33333 21.3333 3.72115 21.3333 6.66667V16Z"
        fill="currentColor"
      />
    </svg>
  );
}
