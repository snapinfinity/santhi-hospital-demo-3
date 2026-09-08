"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { RibbonArc } from "@/components/ui/ribbon";
import { motionTokens } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

const INTERVAL = 7000;

/**
 * A single large quote at a time — testimonials read better as one voice than
 * as a grid of whispering cards. Quotes travel in the direction of travel: the
 * next one enters from the right, the previous one from the left. Auto-advances,
 * pauses on hover/focus, and the timer resets on any manual navigation.
 */
export function Testimonials() {
  const [[index, direction], setSlide] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((next: number) => {
    setSlide(([current]) => [
      (next + testimonials.length) % testimonials.length,
      next > current ? 1 : -1,
    ]);
  }, []);

  useEffect(() => {
    if (paused || reduce) return;
    timer.current = setInterval(() => {
      setSlide(([current]) => [(current + 1) % testimonials.length, 1]);
    }, INTERVAL);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, reduce]);

  const active = testimonials[index];
  const travel = motionTokens.distance.xl;

  return (
    <section className="relative overflow-hidden bg-brand-wash section-y">
      <RibbonArc className="drift-a absolute -right-20 -bottom-10 h-[24rem] w-[40rem] opacity-[0.08]" strokeWidth={40} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            kicker="In their words"
            title={
              <>
                The part we are most{" "}
                <em className="font-semibold text-teal-ink not-italic">proud</em> of.
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
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.blockquote
                key={active.id}
                custom={direction}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: direction * travel }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: direction * -travel }}
                transition={{
                  duration: motionTokens.duration.slow,
                  ease: motionTokens.easing.smooth,
                }}
              >
                <Quote aria-hidden="true" className="size-9 fill-teal/25 text-teal" />
                <p className="mt-5 max-w-[34ch] font-display text-[1.7rem] leading-snug font-light text-ink sm:max-w-[46ch] sm:text-[2.1rem]">
                  {active.quote}
                </p>
                <footer className="mt-6 flex items-center gap-3">
                  <span aria-hidden="true" className="h-px w-10 bg-teal" />
                  <cite className="text-[0.95rem] font-semibold text-ink not-italic">
                    {active.name}
                    <span className="ml-2 font-normal text-muted">{active.context}</span>
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
                    "h-2.5 rounded-full transition-all duration-500 ease-out",
                    dot === index ? "w-7 bg-brand" : "w-2.5 bg-brand-line hover:bg-brand-soft",
                  )}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(index - 1)}
                className="btn-motion grid size-11 place-items-center rounded-full border border-brand-line bg-white text-brand hover:border-brand hover:bg-brand-tint"
              >
                <ChevronLeft aria-hidden="true" className="size-5" />
                <span className="sr-only">Previous testimonial</span>
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                className="btn-motion grid size-11 place-items-center rounded-full border border-brand-line bg-white text-brand hover:border-brand hover:bg-brand-tint"
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
