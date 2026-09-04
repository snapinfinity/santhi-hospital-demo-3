"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check, Users } from "lucide-react";
import { departments } from "@/data/departments";
import { doctorsForDepartment } from "@/data/doctors";
import { BookButton } from "@/components/appointment/book-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { motionTokens } from "@/lib/motion-tokens";
import { departmentIcons, ICON_STROKE } from "@/lib/icons";
import { cn } from "@/lib/utils";

/**
 * A browsable index rather than twelve identical cards: the list stays on screen
 * while the detail panel swaps, so specialties can be compared without losing
 * your place.
 */
export function Departments() {
  const [activeId, setActiveId] = useState(departments[0].id);
  const reduce = useReducedMotion();

  const active = departments.find((d) => d.id === activeId) ?? departments[0];
  const consultants = doctorsForDepartment(active.id);
  const ActiveIcon = departmentIcons[active.id];

  return (
    <section id="departments" aria-labelledby="departments-heading" className="section-y bg-white">
      <div className="mx-auto max-w-[88rem] px-5 lg:px-10">
        <SectionHeading
          id="departments-heading"
          title="Thirty-two specialties, one shared record."
          lede="Choose a department to see what it treats, who practises there and how soon you can be seen."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:gap-10">
          {/* Index — a wrapping chip set on small screens, a column on large. */}
          <div className="min-w-0 lg:col-span-4">
            <h3 className="sr-only">Choose a department</h3>
            <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-0">
              {departments.map((department) => {
                const isActive = department.id === active.id;
                const Icon = departmentIcons[department.id];
                return (
                  <li key={department.id} className="lg:border-b lg:border-ground-deep">
                    <button
                      type="button"
                      onClick={() => setActiveId(department.id)}
                      aria-pressed={isActive}
                      className={cn(
                        "flex min-h-11 w-full items-center gap-2.5 rounded-full border px-4 text-sm transition-colors duration-150 lg:min-h-0 lg:gap-3 lg:rounded-none lg:border-0 lg:px-0 lg:py-3 lg:text-base",
                        isActive
                          ? "border-brand bg-brand text-white lg:bg-transparent lg:text-brand"
                          : "border-brand-line bg-white text-ink hover:border-brand hover:text-brand lg:bg-transparent",
                      )}
                    >
                      {Icon ? (
                        <Icon
                          className={cn(
                            "size-4 shrink-0 lg:size-[1.15rem]",
                            isActive ? "text-white lg:text-brand" : "text-teal-ink",
                          )}
                          strokeWidth={ICON_STROKE}
                          aria-hidden="true"
                        />
                      ) : null}
                      <span className={cn("font-medium", isActive && "lg:font-semibold")}>
                        {department.name}
                      </span>
                      <span
                        className={cn(
                          "tabular ml-auto hidden text-sm lg:inline",
                          isActive ? "text-brand" : "text-muted",
                        )}
                      >
                        {department.consultants}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Detail. Keyed enter-only — the panel is the answer to the click, so
              it must not wait on an outgoing animation before it can render. */}
          <div className="min-w-0 lg:col-span-8">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: reduce ? 0 : motionTokens.distance.sm }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.smooth }}
              className="rounded-2xl bg-ground p-6 sm:p-8"
            >
              <div className="flex items-start gap-4">
                {ActiveIcon ? (
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white text-brand shadow-[var(--shadow-card)]">
                    <ActiveIcon className="size-6" strokeWidth={ICON_STROKE} aria-hidden="true" />
                  </span>
                ) : null}
                <div className="min-w-0">
                  <h3 className="font-display text-title text-ink">{active.name}</h3>
                  <p className="text-sm text-teal-ink">{active.focus}</p>
                </div>
              </div>

              <p className="mt-4 max-w-[58ch] text-muted">{active.summary}</p>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="label-sm text-teal-ink">What we treat here</h4>
                  <ul className="mt-2.5 flex flex-col gap-2">
                    {active.services.map((service) => (
                      <li key={service} className="flex items-start gap-2 text-[0.9375rem] text-ink">
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-teal"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="label-sm text-teal-ink">
                    {consultants.length > 0 ? "Consultants you can book" : "Consultant team"}
                  </h4>
                  {consultants.length > 0 ? (
                    <ul className="mt-2.5 flex flex-col gap-2">
                      {consultants.map((doctor) => (
                        <li key={doctor.id} className="min-w-0">
                          <span className="block truncate text-[0.9375rem] font-medium text-ink">
                            {doctor.name}
                          </span>
                          <span className="tabular block text-sm text-muted">
                            {doctor.experienceYears} years, next available{" "}
                            {doctor.nextAvailable.toLowerCase()}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2.5 text-sm text-muted">
                      {active.consultants} consultants practise here. Book and the team will match
                      you to the right one.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
                <BookButton departmentId={active.id}>Book in {active.name}</BookButton>
                <p className="tabular flex items-center gap-2 text-sm text-muted">
                  <Users className="size-4 text-teal-ink" strokeWidth={ICON_STROKE} aria-hidden="true" />
                  {active.consultants} consultants
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
