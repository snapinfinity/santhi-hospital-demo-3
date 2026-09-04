"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { motionTokens } from "@/lib/motion-tokens";

/** useLayoutEffect warns during SSR; fall back to useEffect on the server. */
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Counts a statistic up when it scrolls into view.
 *
 * Handles values like "34", "120+", "2,40,000+" and "98%" — the numeric part is
 * parsed from any digit/comma run and rendered with Indian digit grouping.
 * Values that are not a single number ("24/7") are printed as-is. The rendered
 * value starts at its final state so the server output — and any visitor
 * without JavaScript — shows the real number; the reset to zero happens before
 * paint, so no flash is visible. Reduced-motion visitors never see it count.
 */
export function StatFigure({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  const match = /^([\d,]+)(.*)$/.exec(value);
  const target = match ? Number(match[1].replace(/,/g, "")) : null;
  const suffix = match ? match[2] : "";
  // "24/7" is a phrase, not a quantity — values with a "/" render statically.
  const shouldCount = target !== null && !reduce && !suffix.includes("/");

  const [display, setDisplay] = useState(value);

  useIsomorphicLayoutEffect(() => {
    if (shouldCount) setDisplay(`0${suffix}`);
  }, [shouldCount, suffix]);

  useEffect(() => {
    if (!shouldCount || !inView || target === null) return;

    const controls = animate(0, target, {
      duration: motionTokens.duration.crawl,
      ease: motionTokens.easing.smooth,
      onUpdate: (latest) =>
        setDisplay(`${Math.round(latest).toLocaleString("en-IN")}${suffix}`),
    });

    return () => controls.stop();
  }, [inView, shouldCount, target, suffix]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ minWidth: `${value.length}ch`, display: "inline-block" }}
    >
      {display}
    </span>
  );
}
