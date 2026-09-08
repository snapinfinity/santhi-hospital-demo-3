"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { departments } from "@/data/departments";
import { doctors } from "@/data/doctors";
import { BookButton } from "@/components/appointment/book-button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonStyles } from "@/components/ui/button";
import { motionTokens } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

const INITIAL_COUNT = 8;

/**
 * The consultant roster as a filterable grid — a grid cannot scroll sideways out
 * of its container, so every card stays whole at every width.
 *
 * Changing the filter replaces the whole grid: the outgoing set steps away and
 * the new one walks back in, four cards to a row, rather than individual cards
 * popping. Cards below the fold hold their position until they are scrolled to.
 */
export function Doctors() {
  const [filter, setFilter] = useState<string>("all");
  const [expanded, setExpanded] = useState(false);
  const reduce = useReducedMotion();

  const filtered = useMemo(
    () => (filter === "all" ? doctors : doctors.filter((d) => d.departmentId === filter)),
    [filter],
  );
  const visible = expanded ? filtered : filtered.slice(0, INITIAL_COUNT);
  const hiddenCount = filtered.length - visible.length;

  function changeFilter(next: string) {
    setFilter(next);
    setExpanded(false);
  }

  const chip = (isActive: boolean) =>
    cn(
      "btn-motion min-h-11 shrink-0 rounded-full border px-4 text-sm font-medium",
      isActive
        ? "border-brand bg-brand text-white shadow-card"
        : "border-brand-line bg-white text-ink-soft hover:border-brand hover:text-brand",
    );

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

        {/* Filters */}
        <Reveal className="mt-8" direction="right">
          <div
            className="rail -mx-1 flex gap-2 overflow-x-auto px-1 pb-2"
            role="group"
            aria-label="Filter consultants by department"
          >
            <button
              type="button"
              onClick={() => changeFilter("all")}
              aria-pressed={filter === "all"}
              className={chip(filter === "all")}
            >
              All ({doctors.length})
            </button>
            {departments.map((department) => (
              <button
                key={department.id}
                type="button"
                onClick={() => changeFilter(department.id)}
                aria-pressed={filter === department.id}
                className={chip(filter === department.id)}
              >
                {department.name}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Roster */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={filter}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -motionTokens.distance.sm }}
            transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.sharp }}
            className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {visible.map((doctor, index) => (
              <Reveal key={doctor.id} as="li" direction="up" index={index % 4} zoom>
                <article className="lift-card group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-line bg-white shadow-card hover:shadow-lift">
                  <div className="relative aspect-[4/3] overflow-hidden bg-brand-tint">
                    <Image
                      src={doctor.portrait}
                      alt={`Portrait used to represent ${doctor.name}. The person pictured is not the fictional consultant; demonstration image.`}
                      fill
                      sizes="(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 92vw"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                    <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-teal-ink backdrop-blur transition-transform duration-500 ease-out group-hover:-translate-y-0.5">
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
              </Reveal>
            ))}
          </motion.ul>
        </AnimatePresence>

        {/* Progressive reveal */}
        <div className="mt-10 flex justify-center">
          {hiddenCount > 0 ? (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className={buttonStyles("secondary", "lg", "group")}
            >
              Show {hiddenCount} more consultant{hiddenCount === 1 ? "" : "s"}
              <ChevronDown
                aria-hidden="true"
                className="size-4 transition-transform duration-300 ease-out group-hover:translate-y-0.5"
              />
            </button>
          ) : filtered.length > INITIAL_COUNT ? (
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className={buttonStyles("ghost", "lg", "group")}
            >
              Show fewer
              <ChevronDown
                aria-hidden="true"
                className="size-4 rotate-180 transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
              />
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
