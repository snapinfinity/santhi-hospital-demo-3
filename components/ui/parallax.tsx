"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { motionTokens, springs, STAGGER } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

/**
 * A photographic frame whose contents pan slowly against the scroll.
 *
 * The inner layer is oversized so the pan never exposes an edge, and the
 * scroll value is passed through a soft spring so the movement lags the scroll
 * by a fraction and arrives smoothly rather than tracking it frame for frame.
 * `amount` is a percentage of the frame height — single digits only.
 */
export function ParallaxFrame({
  children,
  className,
  amount = 7,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const range = useTransform(scrollYProgress, [0, 1], [`${-amount}%`, `${amount}%`]);
  const y = useSpring(range, springs.drift);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0"
        style={reduce ? { scale: 1 } : { y, scale: 1 + (amount * 2.6) / 100 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * A frame whose contents settle back from a slightly wider crop as the frame
 * enters the viewport — the image finding its place rather than fading in.
 */
export function ZoomFrame({
  children,
  className,
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: motionTokens.scale.zoom }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration: motionTokens.duration.crawl,
          ease: motionTokens.easing.glide,
          delay: index * STAGGER,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
