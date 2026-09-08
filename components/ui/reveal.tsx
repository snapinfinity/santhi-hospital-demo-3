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
  span: motion.span,
} as const;

/** The direction the element travels as it arrives. */
export type RevealDirection = "up" | "down" | "left" | "right" | "none";

const OFFSETS: Record<RevealDirection, { x: number; y: number }> = {
  up: { x: 0, y: motionTokens.distance.lg },
  down: { x: 0, y: -motionTokens.distance.lg },
  /** Travels leftward, so it starts to the right of its resting place. */
  left: { x: motionTokens.distance.lg, y: 0 },
  right: { x: -motionTokens.distance.lg, y: 0 },
  none: { x: 0, y: 0 },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Ordinal within a group — turns a set of siblings into a stagger. */
  index?: number;
  as?: keyof typeof ELEMENTS;
  direction?: RevealDirection;
  /** Multiplies the travel distance for larger, slower-moving blocks. */
  travel?: number;
  /** Adds a small settle from a slightly wider scale — for images and panels. */
  zoom?: boolean;
};

/**
 * Scroll-triggered entrance. This is movement first: the element travels a
 * short distance into its resting place rather than simply appearing. Reveals
 * fire once, never on scroll-out, and collapse to a plain fade when reduced
 * motion is requested.
 *
 * The `data-reveal` attribute lets the no-script stylesheet in the root layout
 * force these visible when JavaScript never arrives.
 */
export function Reveal({
  children,
  className,
  index = 0,
  as = "div",
  direction = "up",
  travel = 1,
  zoom = false,
}: RevealProps) {
  const reduce = useReducedMotion();
  const Component = ELEMENTS[as];
  const offset = OFFSETS[direction];

  return (
    <Component
      data-reveal=""
      className={className}
      initial={
        reduce
          ? { opacity: 0 }
          : {
              opacity: 0,
              x: offset.x * travel,
              y: offset.y * travel,
              scale: zoom ? motionTokens.scale.subtle : 1,
            }
      }
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: reduce ? motionTokens.duration.fast : motionTokens.duration.glide,
        ease: motionTokens.easing.smooth,
        delay: reduce ? 0 : index * STAGGER,
      }}
    >
      {children}
    </Component>
  );
}
