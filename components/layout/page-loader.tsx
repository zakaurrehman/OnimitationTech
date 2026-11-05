/**
 * Brief brand reveal on first paint. Pure CSS — it draws the mark, then fades
 * itself out and becomes non-interactive, so it never blocks the page even if
 * JavaScript fails. It lives in the root layout, so client-side navigation
 * never shows it again.
 */
export function PageLoader() {
  return (
    <div className="page-loader" aria-hidden>
      <div className="flex flex-col items-center gap-6">
        <svg viewBox="0 0 40 40" fill="none" className="h-14 w-14">
          <defs>
            <linearGradient id="loader-grad" x1="4" y1="36" x2="36" y2="4" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3478F6" />
              <stop offset="0.55" stopColor="#19D4E5" />
              <stop offset="1" stopColor="#9275FF" />
            </linearGradient>
          </defs>
          <circle
            className="loader-ring"
            cx="20"
            cy="20"
            r="15"
            stroke="url(#loader-grad)"
            strokeWidth="3"
            strokeLinecap="round"
            transform="rotate(-18 20 20)"
          />
          <circle cx="20" cy="20" r="4.6" fill="url(#loader-grad)" />
        </svg>
        <div className="h-px w-28 overflow-hidden bg-white/10">
          <div className="loader-bar h-full w-full bg-gradient-to-r from-electric via-aqua to-iris" />
        </div>
      </div>
    </div>
  );
}
