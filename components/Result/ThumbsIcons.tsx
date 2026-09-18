// Path data copied verbatim from the downloaded "thumbs-down"/"thumbs-up"
// assets (via get_design_context on Result's Partial/Fail frames).
// Decorative only in this build -- SPEC.md's action list for this
// screen doesn't mention a rate-this-hint feature, so these render but
// aren't wired to any handler.
export function ThumbsDownIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', width: '100%', height: '100%' }}
      aria-hidden="true"
    >
      <path
        d="M17 2V13M22 9.8V5.2C22 4.07989 22 3.51984 21.782 3.09202C21.5903 2.71569 21.2843 2.40973 20.908 2.21799C20.4802 2 19.9201 2 18.8 2H8.11801C6.65653 2 5.92579 2 5.33558 2.26743C4.8154 2.50314 4.3733 2.88242 4.06124 3.36072C3.70717 3.90339 3.59606 4.62564 3.37383 6.07012L2.85075 9.47012C2.55764 11.3753 2.41109 12.3279 2.6938 13.0691C2.94194 13.7197 3.40865 14.2637 4.01392 14.6079C4.70353 15 5.66733 15 7.59493 15H8.4C8.96005 15 9.24008 15 9.45399 15.109C9.64215 15.2049 9.79513 15.3578 9.89101 15.546C10 15.7599 10 16.0399 10 16.6V19.5342C10 20.896 11.104 22 12.4658 22C12.7907 22 13.085 21.8087 13.2169 21.5119L16.5777 13.9502C16.7306 13.6062 16.807 13.4343 16.9278 13.3082C17.0346 13.1967 17.1657 13.1115 17.3109 13.0592C17.4752 13 17.6634 13 18.0398 13H18.8C19.9201 13 20.4802 13 20.908 12.782C21.2843 12.5903 21.5903 12.2843 21.782 11.908C22 11.4802 22 10.9201 22 9.8Z"
        stroke="var(--color-text-secondary)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ThumbsUpIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', width: '100%', height: '100%' }}
      aria-hidden="true"
    >
      <path
        d="M7 22V11M2 13V20C2 21.1046 2.89543 22 4 22H17.4262C18.907 22 20.1662 20.9197 20.3914 19.4562L21.4683 12.4562C21.7479 10.6389 20.3418 9 18.5032 9H15C14.4477 9 14 8.55228 14 8V4.46584C14 3.10399 12.896 2 11.5342 2C11.2093 2 10.915 2.1913 10.7831 2.48812L7.26394 10.4061C7.10344 10.7673 6.74532 11 6.35013 11H4C2.89543 11 2 11.8954 2 13Z"
        stroke="var(--color-text-secondary)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
