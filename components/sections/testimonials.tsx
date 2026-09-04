"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { motionTokens } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

const INTERVAL = 7000;

/**
 * A single large quote at a time — testimonials read better as one voice than
 * as a grid of whispering cards. Auto-advances, pauses on hover/focus, and the
 * timer resets on any manual navigation.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((next: number) => {
    setIndex((next + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused || reduce) return;
    timer.current = setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, INTERVAL);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, reduce]);

  const active = testimonials[index];

  return (
    <section className="on-dark section-y bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            tone="dark"
            kicker="In their words"
            title={
              <>
                The part we are most <em className="text-teal italic">proud</em> of.
              </>
            }
            lede="Unedited sentences from discharge surveys. Nothing here promises an outcome — only how it felt to be looked after."
          />
        </Reveal>

        <div
          className="mt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="min-h-[16rem] sm:min-h-[13rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.blockquote
                key={active.id}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
                transition={{ duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth }}
              >
                <Quote aria-hidden="true" className="size-9 fill-teal/30 text-teal" />
                <p className="mt-5 max-w-[34ch] font-display text-[1.7rem] leading-snug text-white sm:max-w-[46ch] sm:text-[2.1rem]">
                  {active.quote}
                </p>
                <footer className="mt-6 flex items-center gap-3">
                  <span aria-hidden="true" className="h-px w-10 bg-teal" />
                  <cite className="text-[0.95rem] font-semibold text-white not-italic">
                    {active.name}
                    <span className="ml-2 font-normal text-ink-muted">{active.context}</span>
                  </cite>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-between gap-6">
            <div className="flex gap-2" role="tablist" aria-label="Choose testimonial">
              {testimonials.map((testimonial, dot) => (
                <button
                  key={testimonial.id}
                  type="button"
                  onClick={() => go(dot)}
                  aria-label={`Testimonial ${dot + 1} of ${testimonials.length}`}
                  aria-current={dot === index}
                  className={cn(
                    "h-2.5 rounded-full transition-all duration-300",
                    dot === index ? "w-7 bg-teal" : "w-2.5 bg-white/25 hover:bg-white/50",
                  )}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(index - 1)}
                className="grid size-11 place-items-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
              >
                <ChevronLeft aria-hidden="true" className="size-5" />
                <span className="sr-only">Previous testimonial</span>
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                className="grid size-11 place-items-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
              >
                <ChevronRight aria-hidden="true" className="size-5" />
                <span className="sr-only">Next testimonial</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
