"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** A thin indigo-to-teal reading bar fixed under the top edge of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="ribbon-sweep fixed inset-x-0 top-0 z-50 h-[3px] origin-left"
    />
  );
}
