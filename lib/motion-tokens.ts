/**
 * Shared motion tokens. Every duration, easing, distance and spring used in the
 * app is defined here — component files must never inline raw values.
 */
export const motionTokens = {
  duration: {
    instant: 0.08,
    fast: 0.18,
    normal: 0.35,
    slow: 0.6,
    glide: 0.8,
    crawl: 1.2,
  },
  easing: {
    /** The site's default curve — a long, decelerating settle. */
    smooth: [0.22, 1, 0.36, 1],
    /** Slightly longer tail, for image and parallax movement. */
    glide: [0.33, 0.9, 0.28, 1],
    sharp: [0.4, 0, 0.2, 1],
    linear: [0, 0, 1, 1],
  },
  distance: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 48,
  },
  scale: {
    subtle: 0.98,
    press: 0.95,
    pop: 1.04,
    /** Starting crop for an image that settles back to its frame. */
    zoom: 1.06,
  },
} as const;

export const springs = {
  snappy: { type: "spring", stiffness: 300, damping: 30 },
  gentle: { type: "spring", stiffness: 120, damping: 14 },
  instant: { type: "spring", stiffness: 600, damping: 35 },
  release: { type: "spring", stiffness: 200, damping: 20, restDelta: 0.001 },
  /** Smoothing for scroll-linked movement — soft enough to never feel jittery. */
  drift: { stiffness: 70, damping: 24, mass: 0.4, restDelta: 0.001 },
} as const;

/** Stagger interval, kept inside the 0.05–0.10s band the motion system allows. */
export const STAGGER = 0.07;
