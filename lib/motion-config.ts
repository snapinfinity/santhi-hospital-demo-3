import { motionTokens } from "./motion-tokens";

/**
 * Runtime gates for motion. Every browser API read is guarded so these are safe
 * to import from modules that also run on the server.
 */
export const motionConfig = {
  isLowEnd() {
    return (
      typeof navigator !== "undefined" &&
      typeof navigator.hardwareConcurrency === "number" &&
      navigator.hardwareConcurrency <= 4
    );
  },

  prefersReduced() {
    return (
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  },

  shouldAnimate({ essential = false }: { essential?: boolean } = {}) {
    if (this.prefersReduced()) return false;
    if (!essential && this.isLowEnd()) return false;
    return true;
  },

  duration() {
    return this.isLowEnd() || this.prefersReduced()
      ? motionTokens.duration.instant
      : motionTokens.duration.normal;
  },
};
