"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { CalendarClock, ChevronDown, Languages } from "lucide-react";
import { doctors } from "@/data/doctors";
import { departments, getDepartment } from "@/data/departments";
import { BookButton } from "@/components/appointment/book-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { motionTokens, STAGGER } from "@/lib/motion-tokens";
import { ICON_STROKE } from "@/lib/icons";
import { cn } from "@/lib/utils";

const ALL = "all";
const INITIAL_COUNT = 8;

/**
 * The roster is the page's most important job — someone arrives wanting a named
 * consultant and a time. It is a filterable grid rather than a carousel: a grid
 * cannot scroll sideways out of its container, every card stays whole at every
 * width, and the whole list is reachable without dragging.
 */
export function Doctors() {
  const [filter, setFilter] = useState(ALL);
  const [expanded, setExpanded] = useState(false);
  const reduce = useReducedMotion();

  /** Only departments that actually have a consultant listed. */
  const filters = useMemo(() => {
    const staffed = new Set(doctors.map((d) => d.departmentId));
    return departments.filter((d) => staffed.has(d.id));
  }, []);

  const matching = useMemo(
    () => (filter === ALL ? doctors : doctors.filter((d) => d.departmentId === filter)),
    [filter],
  );

  /** Two full rows to begin with, so the section does not dominate the page. */
  const visible = expanded ? matching : matching.slice(0, INITIAL_COUNT);
  const hidden = matching.length - visible.length;

  return (
    <section id="doctors" aria-labelledby="doctors-heading" className="section-y bg-ground">
      <div className="mx-auto max-w-[88rem] px-5 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="doctors-heading"
            title="The consultant who admits you is the one who reviews you."
            lede="Continuity is written into our rosters. Book by name, or filter by department and take the first available appointment."
            className="max-w-2xl"
          />
          <p className="tabular shrink-0 text-sm text-muted lg:text-right">
            Showing {visible.length} of {matching.length}
            {filter === ALL ? " consultants" : " in this department"}
          </p>
        </div>

        {/* Filter. Wraps rather than scrolls, so nothing can overflow. */}
        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter consultants by department">
          <FilterChip
            active={filter === ALL}
            onClick={() => {
              setFilter(ALL);
              setExpanded(false);
            }}
          >
            All departments
          </FilterChip>
          {filters.map((department) => (
            <FilterChip
              key={department.id}
              active={filter === department.id}
              onClick={() => {
                setFilter(department.id);
                setExpanded(false);
              }}
            >
              {department.name}
            </FilterChip>
          ))}
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((doctor, index) => {
            const department = getDepartment(doctor.departmentId);
            return (
              <motion.li
                key={doctor.id}
                layout={!reduce}
                initial={{ opacity: 0, y: reduce ? 0 : motionTokens.distance.md }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: motionTokens.duration.normal,
                  ease: motionTokens.easing.smooth,
                  delay: reduce ? 0 : Math.min(index, 7) * (STAGGER / 2),
                }}
                className="group flex min-w-0 flex-col overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-ground-deep">
                  <Image
                    src={doctor.portrait}
                    alt={`Portrait used to represent ${doctor.name}, ${department?.name} consultant. Demonstration image.`}
                    fill
                    sizes="(min-width: 1280px) 21vw, (min-width: 1024px) 29vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-white/92 px-2.5 py-1 text-xs font-medium text-brand backdrop-blur-sm">
                    {department?.name}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="min-w-0">
                    <h3 className="font-display text-xl leading-tight text-ink">{doctor.name}</h3>
                    <p className="mt-1 text-sm text-muted">{doctor.qualifications}</p>
                  </div>

                  <dl className="flex flex-col gap-1.5 text-sm">
                    <div className="flex items-center gap-2 text-muted">
                      <CalendarClock className="size-4 shrink-0 text-teal-ink" strokeWidth={ICON_STROKE} aria-hidden="true" />
                      <dt className="sr-only">Next available</dt>
                      <dd className="truncate text-ink">{doctor.nextAvailable}</dd>
                    </div>
                    <div className="flex items-center gap-2 text-muted">
                      <Languages className="size-4 shrink-0 text-teal-ink" strokeWidth={ICON_STROKE} aria-hidden="true" />
                      <dt className="sr-only">Languages</dt>
                      <dd className="truncate">{doctor.languages.join(", ")}</dd>
                    </div>
                  </dl>

                  <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                    <p className="tabular text-sm text-muted">
                      <span className="font-medium text-ink">{doctor.experienceYears}</span> yrs
                    </p>
                    <BookButton
                      doctorId={doctor.id}
                      variant="secondary"
                      ariaLabel={`Book an appointment with ${doctor.name}`}
                      className="group-hover:border-brand group-hover:bg-brand group-hover:text-white"
                    >
                      Book
                    </BookButton>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>

        <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          {hidden > 0 ? (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-brand-line bg-white px-5 text-[0.9375rem] font-medium text-brand transition-colors duration-150 hover:border-brand hover:bg-brand-tint"
            >
              Show {hidden} more {hidden === 1 ? "consultant" : "consultants"}
              <ChevronDown
                className="size-4 transition-transform duration-200 group-hover:translate-y-0.5 motion-reduce:transition-none"
                strokeWidth={ICON_STROKE}
                aria-hidden="true"
              />
            </button>
          ) : (
            <span />
          )}
          <p className="text-sm text-muted">
            Consultants, availability and portraits are demonstration content.
          </p>
        </div>
      </div>
    </section>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors duration-150",
        active
          ? "border-brand bg-brand text-white"
          : "border-brand-line bg-white text-ink hover:border-brand hover:text-brand",
      )}
    >
      {children}
    </button>
  );
}
