"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "motion/react";
import { Check, ChevronLeft, X } from "lucide-react";
import { departments, getDepartment } from "@/data/departments";
import { doctorsForDepartment, getDoctor } from "@/data/doctors";
import { buildAvailability, type DaySlots } from "@/data/availability";
import { Button, buttonStyles } from "@/components/ui/button";
import { motionTokens, springs } from "@/lib/motion-tokens";
import { departmentIcons, ICON_STROKE } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { BookingPrefill } from "./appointment-provider";

type Step = 0 | 1 | 2 | 3 | 4;

const STEP_LABELS = ["Department", "Consultant", "Time", "Details"] as const;

type Errors = { name?: string; phone?: string };

/**
 * The booking flow: department → consultant → time → details → confirmation.
 *
 * Steps animate in on mount rather than through `AnimatePresence mode="wait"` —
 * with `mode="wait"` the next step cannot render until the previous one has
 * finished animating out, so anywhere animation frames are throttled the
 * visitor is stranded mid-booking. Progressing through a form must never depend
 * on an animation completing.
 */
export function AppointmentDialog({
  open,
  onOpenChange,
  prefill,
  session,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prefill: BookingPrefill;
  /** Bumped on every open — remounts the flow with fresh state. */
  session: number;
}) {
  const [step, setStep] = useState<Step>(0);
  const [departmentId, setDepartmentId] = useState<string | null>(null);
  const [doctorId, setDoctorId] = useState<string | null>(null);
  const [day, setDay] = useState<DaySlots | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  // A fresh session every time the dialog opens, applying any preselection.
  useEffect(() => {
    if (!open) return;
    setErrors({});
    const preselectedDoctor = prefill.doctorId ? getDoctor(prefill.doctorId) : undefined;
    if (preselectedDoctor) {
      setDoctorId(preselectedDoctor.id);
      setDepartmentId(preselectedDoctor.departmentId);
      setStep(2);
    } else if (prefill.departmentId) {
      setDoctorId(null);
      setDepartmentId(prefill.departmentId);
      setStep(1);
    } else {
      setDoctorId(null);
      setDepartmentId(null);
      setStep(0);
    }
    // Availability is derived client-side only — "today" must never render on the server.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, open]);

  const department = departmentId ? getDepartment(departmentId) : undefined;
  const doctor = doctorId ? getDoctor(doctorId) : undefined;
  const departmentDoctors = useMemo(
    () => (departmentId ? doctorsForDepartment(departmentId) : []),
    [departmentId],
  );
  const availability = useMemo(() => (open ? buildAvailability() : []), [open]);

  const departmentList = departments;

  function pickDepartment(id: string) {
    setDepartmentId(id);
    setDoctorId(null);
    setDay(null);
    setSlot(null);
    setStep(1);
  }

  function pickDoctor(id: string) {
    setDoctorId(id);
    setDay(null);
    setSlot(null);
    setStep(2);
  }

  function pickDay(next: DaySlots) {
    setDay(next);
    setSlot(null);
  }

  function pickTime(next: string) {
    setSlot(next);
    setStep(3);
  }

  function confirm() {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Please tell us the patient's name.";
    const digits = phone.replace(/\D/g, "").replace(/^(91|0)/, "");
    if (digits.length !== 10) next.phone = "Please enter a 10-digit Indian mobile number.";
    setErrors(next);
    if (next.name) {
      nameRef.current?.focus();
      return;
    }
    if (next.phone) {
      phoneRef.current?.focus();
      return;
    }
    setStep(4);
  }

  const summary = [
    doctor ? { label: "Consultant", value: doctor.name } : null,
    department ? { label: "Department", value: department.name } : null,
    day && slot ? { label: "When", value: `${day.longLabel}, ${slot}` } : null,
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/60" />
        <Dialog.Content
          key={session}
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}
            className="flex max-h-[94dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-paper shadow-lift sm:rounded-3xl"
          >
            <div className="flex items-center justify-between gap-4 border-b border-paper-line px-6 py-4 sm:px-8">
              <div>
                <Dialog.Title className="font-display text-xl text-ink">
                  {step === 4 ? "You are booked in" : "Book an appointment"}
                </Dialog.Title>
                <Dialog.Description className="label-sm mt-0.5 text-muted">
                  Under a minute · no account needed
                </Dialog.Description>
              </div>
              <Dialog.Close
                className="grid size-11 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-brand-tint hover:text-ink"
              >
                <X aria-hidden="true" className="size-5" />
                <span className="sr-only">Close</span>
              </Dialog.Close>
            </div>

            {step < 4 ? (
              <ol className="flex items-center gap-2 border-b border-paper-line px-6 py-3.5 sm:px-8" aria-label="Booking progress">
                {STEP_LABELS.map((label, index) => {
                  const state = index < step ? "done" : index === step ? "active" : "todo";
                  return (
                    <li key={label} className="flex flex-1 items-center gap-2 last:flex-none">
                      <span
                        aria-current={state === "active" ? "step" : undefined}
                        className={cn(
                          "grid size-7 shrink-0 place-items-center rounded-full border text-xs font-semibold tabular transition-colors",
                          state === "done" && "border-brand bg-brand text-white",
                          state === "active" && "border-ink bg-ink text-white",
                          state === "todo" && "border-paper-line bg-white text-muted",
                        )}
                      >
                        {state === "done" ? <Check aria-hidden="true" className="size-3.5" /> : index + 1}
                      </span>
                      <span
                        className={cn(
                          "hidden text-[0.8rem] font-medium sm:block",
                          state === "todo" ? "text-muted" : "text-ink",
                        )}
                      >
                        {label}
                      </span>
                      {index < STEP_LABELS.length - 1 ? (
                        <span aria-hidden="true" className="mx-1 h-px flex-1 bg-paper-line" />
                      ) : null}
                    </li>
                  );
                })}
              </ol>
            ) : null}

            <div className="min-h-[22rem] overflow-y-auto px-6 py-6 sm:px-8">
              {/* Step 0 — department */}
              {step === 0 ? (
                <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}>
                  <h3 className="mb-1 font-display text-lg text-ink">Which department?</h3>
                  <p className="mb-5 text-sm text-muted">
                    Not sure? General Medicine is the right first stop — its physicians refer
                    onwards the same day.
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {departmentList.map((item) => {
                      const Icon = departmentIcons[item.id];
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => pickDepartment(item.id)}
                          className="flex min-h-14 items-center gap-3 rounded-xl border border-paper-line bg-white px-4 py-3 text-left transition-all hover:border-brand hover:shadow-card"
                        >
                          {Icon ? (
                            <Icon aria-hidden="true" strokeWidth={ICON_STROKE} className="size-5 shrink-0 text-brand" />
                          ) : null}
                          <span className="min-w-0">
                            <span className="block truncate text-[0.9375rem] font-medium text-ink">{item.name}</span>
                            <span className="block truncate text-xs text-muted">{item.focus}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : null}

              {/* Step 1 — consultant */}
              {step === 1 && department ? (
                <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}>
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="mb-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-brand-ink"
                  >
                    <ChevronLeft aria-hidden="true" className="size-4" /> All departments
                  </button>
                  <h3 className="mb-1 font-display text-lg text-ink">
                    Who would you like to see in {department.name}?
                  </h3>
                  <p className="mb-5 text-sm text-muted">
                    Featured consultants for this department. You can also request any available
                    colleague when you arrive.
                  </p>
                  <div className="flex flex-col gap-2">
                    {departmentDoctors.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => pickDoctor(item.id)}
                        className="flex min-h-16 items-center gap-4 rounded-xl border border-paper-line bg-white px-4 py-3 text-left transition-all hover:border-brand hover:shadow-card"
                      >
                        <span className="relative size-12 shrink-0 overflow-hidden rounded-full bg-brand-tint">
                          <Image
                            src={item.portrait}
                            alt=""
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[0.9375rem] font-medium text-ink">{item.name}</span>
                          <span className="block truncate text-xs text-muted">
                            {item.qualifications} · {item.experienceYears} yrs
                          </span>
                        </span>
                        <span className="hidden shrink-0 rounded-full bg-teal-tint px-3 py-1 text-xs font-medium text-teal-ink sm:block">
                          {item.nextAvailable}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : null}

              {/* Step 2 — time */}
              {step === 2 && doctor && department ? (
                <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="mb-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-brand-ink"
                  >
                    <ChevronLeft aria-hidden="true" className="size-4" /> All consultants
                  </button>
                  <div className="mb-5 flex items-center gap-4">
                    <span className="relative size-14 shrink-0 overflow-hidden rounded-full bg-brand-tint">
                      <Image src={doctor.portrait} alt="" fill sizes="56px" className="object-cover" />
                    </span>
                    <span>
                      <span className="block font-display text-lg text-ink">{doctor.name}</span>
                      <span className="block text-sm text-muted">{department.name}</span>
                    </span>
                  </div>

                  <h3 className="mb-3 font-display text-lg text-ink">Pick a day</h3>
                  <div className="rail -mx-1 flex gap-2 overflow-x-auto px-1 pb-2" role="group" aria-label="Available days">
                    {availability.map((item) => (
                      <button
                        key={item.iso}
                        type="button"
                        onClick={() => pickDay(item)}
                        disabled={item.slots.length === 0}
                        aria-pressed={day?.iso === item.iso}
                        className={cn(
                          "min-h-11 shrink-0 rounded-full border px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40",
                          day?.iso === item.iso
                            ? "border-ink bg-ink text-white"
                            : "border-paper-line bg-white text-ink hover:border-brand",
                        )}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {day ? (
                    day.slots.length > 0 ? (
                      <>
                        <h3 className="mt-6 mb-3 font-display text-lg text-ink">Pick a time</h3>
                        <div className="flex flex-wrap gap-2">
                          {day.slots.map((time) => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => pickTime(time)}
                              className={cn(
                                buttonStyles("secondary", "md", "tabular min-w-24"),
                              )}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </>
                    ) : (
                      <p className="mt-6 rounded-xl bg-brand-wash px-4 py-3 text-sm text-muted">
                        {day.note ?? "No clinics this day — please pick another."}
                      </p>
                    )
                  ) : (
                    <p className="mt-6 text-sm text-muted">Choose a day above to see open slots.</p>
                  )}
                </motion.div>
              ) : null}

              {/* Step 3 — details */}
              {step === 3 && doctor && day && slot ? (
                <motion.form
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}
                  onSubmit={(event) => {
                    event.preventDefault();
                    confirm();
                  }}
                  noValidate
                >
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="mb-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-brand-ink"
                  >
                    <ChevronLeft aria-hidden="true" className="size-4" /> Change time
                  </button>

                  <dl className="mb-6 rounded-2xl bg-white p-5 shadow-card">
                    {summary.map((row) => (
                      <div key={row.label} className="flex items-baseline justify-between gap-4 py-1.5 first:pt-0 last:pb-0">
                        <dt className="text-sm text-muted">{row.label}</dt>
                        <dd className="text-[0.9375rem] font-medium text-ink">{row.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="booking-name" className="label-sm mb-1.5 block text-ink">
                        Patient name
                      </label>
                      <input
                        id="booking-name"
                        ref={nameRef}
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        aria-invalid={errors.name ? true : undefined}
                        className={cn(
                          "min-h-12 w-full rounded-xl border bg-white px-4 text-[0.9375rem] text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-brand focus:ring-2 focus:ring-brand/25",
                          errors.name ? "border-accent" : "border-paper-line",
                        )}
                        placeholder="Full name"
                      />
                      {errors.name ? (
                        <p role="alert" className="mt-1.5 text-sm text-accent-ink">
                          {errors.name}
                        </p>
                      ) : null}
                    </div>
                    <div>
                      <label htmlFor="booking-phone" className="label-sm mb-1.5 block text-ink">
                        Mobile number
                      </label>
                      <input
                        id="booking-phone"
                        ref={phoneRef}
                        type="tel"
                        autoComplete="tel"
                        inputMode="numeric"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        aria-invalid={errors.phone ? true : undefined}
                        className={cn(
                          "min-h-12 w-full rounded-xl border bg-white px-4 text-[0.9375rem] text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-brand focus:ring-2 focus:ring-brand/25",
                          errors.phone ? "border-accent" : "border-paper-line",
                        )}
                        placeholder="10-digit mobile"
                      />
                      {errors.phone ? (
                        <p role="alert" className="mt-1.5 text-sm text-accent-ink">
                          {errors.phone}
                        </p>
                      ) : null}
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="booking-note" className="label-sm mb-1.5 block text-ink">
                        Anything we should know? <span className="font-normal text-muted">(optional)</span>
                      </label>
                      <textarea
                        id="booking-note"
                        value={note}
                        onChange={(event) => setNote(event.target.value)}
                        rows={3}
                        className="w-full resize-none rounded-xl border border-paper-line bg-white px-4 py-3 text-[0.9375rem] text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-brand focus:ring-2 focus:ring-brand/25"
                        placeholder="Symptoms, reports to bring, accessibility needs…"
                      />
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto">
                    Confirm booking
                  </Button>
                  <p className="mt-3 text-xs text-muted">
                    Demonstration only — no real booking is made and no data leaves this page.
                  </p>
                </motion.form>
              ) : null}

              {/* Step 4 — confirmation */}
              {step === 4 && doctor && day && slot ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth }}
                  className="flex flex-col items-center py-6 text-center"
                  role="status"
                >
                  <motion.span
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ ...springs.bouncy, delay: 0.1 }}
                    className="grid size-16 place-items-center rounded-full bg-brand text-white"
                  >
                    <Check aria-hidden="true" className="size-8" />
                  </motion.span>
                  <h3 className="mt-5 font-display text-2xl text-ink">
                    See you soon, {name.trim().split(/\s+/)[0]}.
                  </h3>
                  <p className="mt-2 max-w-[46ch] text-[0.95rem] text-muted">
                    {doctor.name} — {day.longLabel}, {slot}. Our team will call {phone} to
                    confirm and share directions.
                  </p>
                  <dl className="mt-6 w-full max-w-sm rounded-2xl bg-white p-5 text-left shadow-card">
                    {summary.map((row) => (
                      <div key={row.label} className="flex items-baseline justify-between gap-4 py-1.5 first:pt-0 last:pb-0">
                        <dt className="text-sm text-muted">{row.label}</dt>
                        <dd className="text-[0.9375rem] font-medium text-ink">{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <Dialog.Close asChild>
                      <Button variant="secondary">Done</Button>
                    </Dialog.Close>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setStep(0);
                        setDepartmentId(null);
                        setDoctorId(null);
                        setDay(null);
                        setSlot(null);
                        setName("");
                        setPhone("");
                        setNote("");
                      }}
                    >
                      Book another
                    </Button>
                  </div>
                </motion.div>
              ) : null}
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
