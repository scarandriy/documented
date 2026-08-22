/**
 * Горизонтальная стрелка в том же начертании, что и ArrowUpRight в hero:
 * тот же штрих currentColor, та же сетка 16×16.
 */
export function ArrowSide({
  className,
  direction = "right",
}: {
  className?: string;
  direction?: "left" | "right";
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={className}
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={direction === "left" ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M3 8h10" />
      <path d="M9 4 13 8l-4 4" />
    </svg>
  );
}
