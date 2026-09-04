"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { motionTokens } from "@/lib/motion-tokens";

/**
 * Entrance/exit states that collapse to an opacity-only fade when the visitor
 * has asked for reduced motion.
 */
export function useSafeMotion(fullY: number = motionTokens.distance.md) {
  const reduce = useReducedMotion();
  return {
    initial: { opacity: 0, y: reduce ? 0 : fullY },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: reduce ? 0 : -fullY },
  };
}

/**
 * True only after hydration. Used to keep `initial` matching server output so
 * entrance animations never cause a hydration mismatch.
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
