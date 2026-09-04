import { cn } from "@/lib/utils";

/**
 * The campaign's indigo-to-teal sweep, rebuilt as CSS and SVG so it costs one
 * gradient rather than an image. The gradient is declared once per document and
 * referenced by id, which keeps repeated arcs free of duplicated <defs>.
 */
export function RibbonDefs() {
  return (
    <svg aria-hidden="true" focusable="false" className="pointer-events-none absolute h-0 w-0">
      <defs>
        <linearGradient id="santhi-ribbon" x1="0" y1="0" x2="1" y2="0.35">
          <stop offset="0%" stopColor="var(--color-ribbon-1)" />
          <stop offset="32%" stopColor="var(--color-ribbon-2)" />
          <stop offset="58%" stopColor="var(--color-ribbon-3)" />
          <stop offset="100%" stopColor="var(--color-ribbon-4)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** A thin ribbon rule — the section divider used in place of a plain hairline. */
export function RibbonRule({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("ribbon-sweep h-px w-full", className)} />;
}

/**
 * A large decorative arc echoing the sweep behind the campaign portraits.
 * Purely ornamental, so it is hidden from assistive technology.
 */
export function RibbonArc({ className, strokeWidth = 26 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 600 400"
      preserveAspectRatio="none"
      className={cn("pointer-events-none", className)}
    >
      <path
        d="M-20 300 C 130 320, 190 150, 320 120 C 430 95, 500 150, 620 60"
        fill="none"
        stroke="url(#santhi-ribbon)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
