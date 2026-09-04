"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { motionTokens, STAGGER } from "@/lib/motion-tokens";

/** Resolved once at module scope — creating motion components during render remounts the subtree. */
const ELEMENTS = {
  div: motion.div,
  li: motion.li,
  article: motion.article,
  figure: motion.figure,
  p: motion.p,
} as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Ordinal within a group — turns a set of siblings into a stagger. */
  index?: number;
  as?: keyof typeof ELEMENTS;
};

/**
 * Scroll-triggered entrance. Reveals fire once, never on scroll-out, and
 * collapse to a plain fade when reduced motion is requested.
 *
 * The `data-reveal` attribute lets the no-script stylesheet in the root layout
 * force these visible when JavaScript never arrives.
 */
export function Reveal({ children, className, index = 0, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const Component = ELEMENTS[as];

  return (
    <Component
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : motionTokens.distance.lg }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: reduce ? motionTokens.duration.fast : motionTokens.duration.slow,
        ease: motionTokens.easing.smooth,
        delay: reduce ? 0 : index * STAGGER,
      }}
    >
      {children}
    </Component>
  );
}
