"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { motionTokens } from "@/lib/motion-tokens";

/** useLayoutEffect warns during SSR; fall back to useEffect on the server. */
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Counts a statistic up when it scrolls into view.
 *
 * Non-numeric values ("24/7", "Level III") are printed as-is. The rendered
 * value starts at its final state so the server output — and any visitor
 * without JavaScript — shows the real number; the reset to zero happens before
 * paint, so no flash is visible. Reduced-motion visitors never see it count.
 */
export function StatFigure({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  const match = /^(\d+)(.*)$/.exec(value);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";
  const shouldCount = target !== null && !reduce;

  const [display, setDisplay] = useState(value);

  useIsomorphicLayoutEffect(() => {
    if (shouldCount) setDisplay(`0${suffix}`);
  }, [shouldCount, suffix]);

  useEffect(() => {
    if (!shouldCount || !inView || target === null) return;

    const controls = animate(0, target, {
      duration: motionTokens.duration.crawl,
      ease: motionTokens.easing.smooth,
      onUpdate: (latest) => setDisplay(`${Math.round(latest)}${suffix}`),
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
