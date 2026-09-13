/**
 * The Pify mark: a P on a 4x4 pixel grid with one detached accent cell.
 * Geometry is taken from app/icon.svg. The P uses currentColor so it flips
 * with the theme; the cell uses the accent token. `snap` runs the single
 * load animation on the accent cell.
 */
export function Mark({
  size = 24,
  snap = false,
  className = "",
  title,
}: {
  size?: number;
  snap?: boolean;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="165.29 165.29 469.43 469.43"
      width={size}
      height={size}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M165.29 165.29 H517.36 V400 H400 V517.36 H282.65 V634.72 H165.29 Z M282.65 282.65 V400 H400 V282.65 Z"
      />
      <rect
        className={`mark-accent ${snap ? "snap" : ""}`}
        fill="var(--accent)"
        x="517.36"
        y="400"
        width="117.36"
        height="117.36"
      />
    </svg>
  );
}
