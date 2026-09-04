"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronRight, Users } from "lucide-react";
import { departments } from "@/data/departments";
import { doctorsForDepartment } from "@/data/doctors";
import { BookButton } from "@/components/appointment/book-button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { departmentIcons, ICON_STROKE } from "@/lib/icons";
import { motionTokens } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

/**
 * A department explorer: an editorial index on the left, a live detail panel on
 * the right. Selecting a department swaps the panel; the panel animates in on
 * mount only, so a slow frame never blocks the interaction.
 */
export function Departments() {
  const [activeId, setActiveId] = useState(departments[0].id);
  const reduce = useReducedMotion();
  const active = departments.find((d) => d.id === activeId) ?? departments[0];
  const panelDoctors = doctorsForDepartment(active.id).slice(0, 4);
  const ActiveIcon = departmentIcons[active.id];

  return (
    <section id="departments" className="section-y bg-brand-wash">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            kicker="Departments"
            title={
              <>
                Thirty-two specialities, <em className="text-brand italic">one</em> record.
              </>
            }
            lede="Whichever door you enter, your history, reports and plan travel with you. Explore a department to see what it treats and who you will meet."
          />
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[380px_1fr] lg:gap-10">
          {/* Index */}
          <Reveal>
            <ul className="flex flex-col gap-1" role="list">
              {departments.map((department, index) => {
                const Icon = departmentIcons[department.id];
                const isActive = department.id === activeId;
                return (
                  <li key={department.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(department.id)}
                      aria-pressed={isActive}
                      className={cn(
                        "flex min-h-14 w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all",
                        isActive
                          ? "bg-white shadow-card ring-1 ring-brand-line"
                          : "hover:bg-white/70",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "tabular w-6 shrink-0 text-right text-xs font-medium",
                          isActive ? "text-brand" : "text-muted",
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {Icon ? (
                        <Icon
                          aria-hidden="true"
                          strokeWidth={ICON_STROKE}
                          className={cn("size-5 shrink-0", isActive ? "text-brand" : "text-ink-soft")}
                        />
                      ) : null}
                      <span className="min-w-0 flex-1">
                        <span
                          className={cn(
                            "block truncate text-[0.9375rem] font-medium",
                            isActive ? "text-ink" : "text-ink-soft",
                          )}
                        >
                          {department.name}
                        </span>
                        <span className="block truncate text-xs text-muted">{department.focus}</span>
                      </span>
                      <ChevronRight
                        aria-hidden="true"
                        className={cn(
                          "size-4 shrink-0 transition-transform",
                          isActive ? "translate-x-0.5 text-brand" : "text-muted/50",
                        )}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          {/* Detail panel */}
          <Reveal>
            <div className="rounded-3xl border border-brand-line bg-white shadow-card">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                  transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}
                  className="flex h-full flex-col p-7 sm:p-9"
                >
                  <div className="flex items-start gap-5">
                    {ActiveIcon ? (
                      <span className="arch-sm grid size-16 shrink-0 place-items-center bg-brand-tint text-brand">
                        <ActiveIcon aria-hidden="true" strokeWidth={ICON_STROKE} className="size-8" />
                      </span>
                    ) : null}
                    <div>
                      <p className="label-sm text-teal-ink">{active.focus}</p>
                      <h3 className="mt-1 font-display text-2xl text-ink">{active.name}</h3>
                    </div>
                  </div>

                  <p className="mt-5 max-w-[62ch] text-[0.9375rem] leading-relaxed text-muted">
                    {active.summary}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${active.name} services`}>
                    {active.services.map((service) => (
                      <li
                        key={service}
                        className="rounded-full bg-brand-tint px-3.5 py-1.5 text-[0.85rem] font-medium text-brand-ink"
                      >
                        {service}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-paper-line pt-6">
                    <p className="flex items-center gap-2 text-sm text-muted">
                      <Users aria-hidden="true" className="size-4 text-teal-ink" />
                      <span className="tabular font-semibold text-ink">{active.consultants}</span>
                      consultants ·{" "}
                      <span className="tabular font-semibold text-ink">{panelDoctors.length}</span>{" "}
                      featured here
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <BookButton departmentId={active.id} variant="secondary" ariaLabel={`Book in ${active.name}`}>
                        Book in {active.name.split(" ")[0]}
                        <ArrowRight aria-hidden="true" className="size-4" />
                      </BookButton>
                      <a
                        href="#doctors"
                        className="inline-flex min-h-11 items-center rounded-full px-4 text-[0.9375rem] font-medium text-brand transition-colors hover:bg-brand-tint"
                      >
                        Meet the consultants
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
