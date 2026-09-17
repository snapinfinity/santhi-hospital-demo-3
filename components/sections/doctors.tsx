"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { departments } from "@/data/departments";
import { doctors } from "@/data/doctors";
import { BookButton } from "@/components/appointment/book-button";
import { useAppointment } from "@/components/appointment/appointment-provider";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { motionTokens } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

/** Autoplay cadence — long enough to read a card, short enough to be noticed. */
const AUTOPLAY_MS = 3200;

/**
 * Card width at each breakpoint: one card and a peek of the next on a phone,
 * two on a small tablet, three on a laptop, four on a desktop. The gap is
 * subtracted so a full page of cards tiles the rail exactly.
 */
const slide =
  "snap-start shrink-0 grow-0 basis-[85%] sm:basis-[calc((100%_-_1.25rem)/2)] " +
  "lg:basis-[calc((100%_-_2.5rem)/3)] xl:basis-[calc((100%_-_3.75rem)/4)]";

/** The distance between snap points — one card plus the gap. */
function stepSize(rail: HTMLUListElement) {
  const first = rail.firstElementChild as HTMLElement | null;
  const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
  return { step: first ? first.offsetWidth + gap : rail.clientWidth, gap };
}

/**
 * The consultant roster as a single-row carousel.
 *
 * The rail is a native horizontal scroller with mandatory snap points, so
 * touch swiping, trackpad scrolling and keyboard focus all work without a
 * library; the arrow buttons scroll it one full page of cards at a time.
 * Changing the filter replaces the whole rail: the outgoing set steps away
 * and the new one walks in from the right.
 *
 * Left alone, the rail advances one card every few seconds and loops back to
 * the start. It holds still whenever it would be a nuisance: while the
 * pointer is over it, while anything inside it has focus, while the booking
 * dialog is open, while the tab is hidden or the section is off screen, and
 * always under reduced motion. Any manual move restarts the countdown, and a
 * pause button switches it off for the visit.
 */
export function Doctors() {
  const [filter, setFilter] = useState<string>("all");
  const reduce = useReducedMotion();
  const { bookingOpen } = useAppointment();

  // The rail remounts on every filter change (it is keyed), so it is tracked
  // through a callback ref rather than a ref object — the effect below has to
  // re-run for the new element, not the one that is animating out.
  const [rail, setRail] = useState<HTMLUListElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [track, setTrack] = useState({ thumb: 1, offset: 0 });

  // Autoplay gates.
  const regionRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(false);
  /** Bumped on every manual move so the countdown starts over. */
  const [epoch, setEpoch] = useState(0);
  const restart = useCallback(() => setEpoch((n) => n + 1), []);

  const filtered = useMemo(
    () => (filter === "all" ? doctors : doctors.filter((d) => d.departmentId === filter)),
    [filter],
  );

  const measure = useCallback(() => {
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth;
    const left = rail.scrollLeft;
    setAtStart(left <= 1);
    setAtEnd(max <= 1 || left >= max - 1);
    setTrack({
      thumb: max > 0 ? rail.clientWidth / rail.scrollWidth : 1,
      offset: max > 0 ? left / rail.scrollWidth : 0,
    });
  }, [rail]);

  useEffect(() => {
    if (!rail) return;
    measure();
    rail.addEventListener("scroll", measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    return () => {
      rail.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  }, [rail, measure]);

  // Only move while a good part of the section is actually on screen.
  useEffect(() => {
    const region = regionRef.current;
    if (!region) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.4,
    });
    observer.observe(region);
    return () => observer.disconnect();
  }, []);

  // …and never in a background tab, where the scroll would pile up unseen.
  useEffect(() => {
    const onChange = () => setHidden(document.hidden);
    onChange();
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

  const canAutoplay = !reduce && filtered.length > 1;
  const autoplay =
    canAutoplay && playing && inView && !hovered && !focused && !hidden && !bookingOpen;

  useEffect(() => {
    if (!autoplay || !rail) return;
    const id = window.setInterval(() => {
      const max = rail.scrollWidth - rail.clientWidth;
      if (rail.scrollLeft >= max - 1) {
        rail.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        rail.scrollBy({ left: stepSize(rail).step, behavior: "smooth" });
      }
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
    // `epoch` is here on purpose: bumping it tears the interval down and starts it again.
  }, [autoplay, rail, epoch]);

  /** Scroll by one page — as many whole cards as are currently visible. */
  function page(direction: -1 | 1) {
    if (!rail) return;
    const { step, gap } = stepSize(rail);
    const perPage = Math.max(1, Math.round((rail.clientWidth + gap) / step));
    rail.scrollBy({ left: direction * step * perPage, behavior: reduce ? "auto" : "smooth" });
    restart();
  }

  const chip = (isActive: boolean) =>
    cn(
      "btn-motion min-h-11 shrink-0 rounded-full border px-4 text-sm font-medium",
      isActive
        ? "border-brand bg-brand text-white shadow-card"
        : "border-brand-line bg-white text-ink-soft hover:border-brand hover:text-brand",
    );

  const control =
    "btn-motion grid place-items-center rounded-full border border-brand-line bg-white text-brand " +
    "disabled:pointer-events-none disabled:border-paper-line disabled:text-muted/40 disabled:shadow-none";
  /* The arrows fill solid on hover; the pause toggle only tints, so it reads as secondary. */
  const arrow = cn(control, "size-12 hover:border-brand hover:bg-brand hover:text-white hover:shadow-lift");
  const toggle = cn(control, "mr-2 size-10 hover:border-brand hover:bg-brand-tint hover:text-brand-ink");

  return (
    <section id="doctors" className="section-y bg-ground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            kicker="Consultants"
            title={
              <>
                Specialists who <em className="font-semibold text-brand not-italic">stay</em> with
                your case.
              </>
            }
            lede="The consultant who admits you is the consultant who reviews you. Filter by department, or book straight into the first free slot."
          />
        </Reveal>

        {/*
          Filters. The row scrolls sideways, which also clips vertically — so it
          carries a little top padding, pulled back with a matching margin, to
          leave room for a chip's hover lift.
        */}
        <Reveal className="mt-8" direction="right">
          <div
            className="rail -mx-1 -mt-1 flex gap-2 overflow-x-auto px-1 pt-1 pb-2"
            role="group"
            aria-label="Filter consultants by department"
          >
            <button
              type="button"
              onClick={() => setFilter("all")}
              aria-pressed={filter === "all"}
              className={chip(filter === "all")}
            >
              All ({doctors.length})
            </button>
            {departments.map((department) => (
              <button
                key={department.id}
                type="button"
                onClick={() => setFilter(department.id)}
                aria-pressed={filter === department.id}
                className={chip(filter === department.id)}
              >
                {department.name}
              </button>
            ))}
          </div>
        </Reveal>

        {/*
          Rail. The negative margins let the cards run to the viewport edge on
          a phone and give the end cards room for their hover lift and shadow
          on desktop; the matching padding keeps the cards themselves aligned
          with the rest of the section. From `sm` the bleed equals the gap, so
          the first card of the next page sits exactly at the rail's edge
          rather than showing a sliver.
        */}
        <Reveal className="mt-8" direction="up">
          <div
            ref={regionRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Consultants"
            onPointerEnter={(event) => event.pointerType !== "touch" && setHovered(true)}
            onPointerLeave={(event) => event.pointerType !== "touch" && setHovered(false)}
            onPointerDown={restart}
            onTouchEnd={restart}
            onWheel={restart}
            onFocus={() => setFocused(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setFocused(false);
              }
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.ul
                key={filter}
                ref={setRail}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: motionTokens.distance.lg }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: -motionTokens.distance.sm }}
                transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}
                className="rail -mx-4 -my-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 py-6 sm:-mx-5 sm:scroll-px-5 sm:px-5"
              >
                {filtered.map((doctor) => (
                  <li key={doctor.id} className={slide}>
                    <article className="lift-card group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-line bg-white shadow-card hover:border-brand-soft hover:shadow-lift">
                      <div className="relative aspect-[4/3] overflow-hidden bg-brand-tint">
                        <Image
                          src={doctor.portrait}
                          alt={`Portrait used to represent ${doctor.name}. The person pictured is not the fictional consultant; demonstration image.`}
                          fill
                          sizes="(min-width: 1280px) 24vw, (min-width: 1024px) 32vw, (min-width: 640px) 48vw, 85vw"
                          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-navy-deep/55 to-transparent"
                        />
                        <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-teal-ink transition-transform duration-500 ease-out group-hover:-translate-y-0.5">
                          <span aria-hidden="true" className="size-1.5 rounded-full bg-teal" />
                          {doctor.nextAvailable}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <p className="label-sm text-teal-ink">{doctor.role.split("—")[1]?.trim()}</p>
                        <h3 className="mt-1 font-display text-lg font-medium text-ink">{doctor.name}</h3>
                        <p className="mt-0.5 text-[0.8rem] text-muted">
                          {doctor.qualifications} · {doctor.experienceYears} yrs
                        </p>
                        <p className="mt-3 line-clamp-2 text-[0.85rem] leading-relaxed text-muted">
                          {doctor.bio}
                        </p>
                        <div className="mt-4 flex flex-1 items-end justify-between gap-3 border-t border-paper-line pt-4">
                          <p className="text-[0.8rem] text-muted">{doctor.languages.join(" · ")}</p>
                          <BookButton
                            doctorId={doctor.id}
                            variant="secondary"
                            className="group/book min-h-9 shrink-0 px-4 text-sm"
                            ariaLabel={`Book with ${doctor.name}`}
                          >
                            Book
                            <ArrowRight
                              aria-hidden="true"
                              className="size-3.5 transition-transform duration-300 ease-out group-hover/book:translate-x-1"
                            />
                          </BookButton>
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>

            {/* Controls — a progress track that mirrors the rail, pause, and the two arrows. */}
            <div className="mt-8 flex items-center gap-6">
              <div
                aria-hidden="true"
                className="relative h-1 flex-1 overflow-hidden rounded-full bg-brand-line"
              >
                <div
                  className="ribbon-sweep absolute inset-y-0 left-0 rounded-full"
                  style={{
                    width: `${track.thumb * 100}%`,
                    transform: `translate3d(${(track.offset / track.thumb) * 100}%, 0, 0)`,
                  }}
                />
              </div>
              <p className="sr-only" aria-live="polite">
                Showing {filtered.length} consultant{filtered.length === 1 ? "" : "s"}
              </p>
              <div className="flex items-center gap-2">
                {canAutoplay ? (
                  <button
                    type="button"
                    onClick={() => setPlaying((value) => !value)}
                    aria-label={playing ? "Pause automatic scrolling" : "Resume automatic scrolling"}
                    title={playing ? "Pause" : "Play"}
                    className={toggle}
                  >
                    {playing ? (
                      <Pause aria-hidden="true" className="size-4" />
                    ) : (
                      <Play aria-hidden="true" className="size-4 translate-x-px" />
                    )}
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => page(-1)}
                  disabled={atStart}
                  aria-label="Previous consultants"
                  className={arrow}
                >
                  <ArrowLeft aria-hidden="true" className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => page(1)}
                  disabled={atEnd}
                  aria-label="Next consultants"
                  className={arrow}
                >
                  <ArrowRight aria-hidden="true" className="size-5" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
