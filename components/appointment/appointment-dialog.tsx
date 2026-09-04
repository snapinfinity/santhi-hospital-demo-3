"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { departments, getDepartment } from "@/data/departments";
import { doctors as allDoctors, doctorsForDepartment, getDoctor } from "@/data/doctors";
import { buildAvailability, type DaySlots } from "@/data/availability";
import { CalendarClock, Check, UserRound, X } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { motionTokens, springs } from "@/lib/motion-tokens";
import { departmentIcons, ICON_STROKE } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { BookingPrefill } from "./appointment-provider";

const STEPS = ["department", "doctor", "schedule", "details"] as const;
type Step = (typeof STEPS)[number] | "confirmed";

const STEP_TITLES: Record<Step, string> = {
  department: "Which department do you need?",
  doctor: "Choose a consultant",
  schedule: "Pick a date and time",
  details: "Your details",
  confirmed: "Appointment request confirmed",
};

const ANY_DOCTOR = "any";

type Errors = Partial<Record<"name" | "phone" | "email", string>>;

function validate(values: { name: string; phone: string; email: string }): Errors {
  const errors: Errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Enter the patient's full name.";
  }

  const digits = values.phone.replace(/[\s-]/g, "").replace(/^\+91/, "");
  if (!/^[6-9]\d{9}$/.test(digits)) {
    errors.phone = "Enter a 10-digit mobile number so we can confirm the appointment.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = "Enter an email address in the format name@example.com.";
  }

  return errors;
}

export function AppointmentDialog({
  open,
  onOpenChange,
  prefill,
  session,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prefill: BookingPrefill;
  session: number;
}) {
  const reduce = useReducedMotion();

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                key="appointment-overlay"
                className="fixed inset-0 z-40 bg-ink/55 backdrop-blur-[2px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: motionTokens.duration.fast }}
              />
            </Dialog.Overlay>

            {/* Full-screen positioner. Radix forces `pointer-events: auto` on
                its content, so the overlay underneath never receives the click
                that would dismiss the dialog — the positioner closes it itself
                when the press lands on the backdrop area rather than the panel. */}
            <Dialog.Content asChild forceMount aria-modal="true">
              <div
                className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
                onPointerDown={(event) => {
                  if (event.target === event.currentTarget) onOpenChange(false);
                }}
              >
                <motion.div
                  key="appointment-panel"
                  className="flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:max-h-[88vh] sm:max-w-2xl sm:rounded-2xl"
                  initial={{ opacity: 0, y: reduce ? 0 : motionTokens.distance.lg, scale: reduce ? 1 : 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: reduce ? 0 : motionTokens.distance.lg, scale: reduce ? 1 : 0.99 }}
                  transition={springs.gentle}
                >
                  <BookingFlow key={session} prefill={prefill} onClose={() => onOpenChange(false)} />
                </motion.div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}

function BookingFlow({ prefill, onClose }: { prefill: BookingPrefill; onClose: () => void }) {
  const reduce = useReducedMotion();

  const prefilledDoctor = prefill.doctorId ? getDoctor(prefill.doctorId) : undefined;
  const initialDepartment = prefilledDoctor?.departmentId ?? prefill.departmentId ?? null;

  const [step, setStep] = useState<Step>(
    prefilledDoctor ? "schedule" : initialDepartment ? "doctor" : "department",
  );
  const [departmentId, setDepartmentId] = useState<string | null>(initialDepartment);
  const [doctorId, setDoctorId] = useState<string | null>(prefilledDoctor?.id ?? null);
  const [dayIso, setDayIso] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [values, setValues] = useState({ name: "", phone: "", email: "", reason: "" });
  const [errors, setErrors] = useState<Errors>({});

  /** Generated once when the dialog opens — never during a server render. */
  const [availability] = useState<DaySlots[]>(() => buildAvailability());

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const department = departmentId ? getDepartment(departmentId) : undefined;
  const doctor = doctorId && doctorId !== ANY_DOCTOR ? getDoctor(doctorId) : undefined;
  const departmentDoctors = departmentId ? doctorsForDepartment(departmentId) : allDoctors;
  const selectedDay = availability.find((day) => day.iso === dayIso);

  const stepIndex = step === "confirmed" ? STEPS.length : STEPS.indexOf(step);

  function goTo(next: Step) {
    setStep(next);
  }

  function handleBack() {
    const index = STEPS.indexOf(step as (typeof STEPS)[number]);
    if (index > 0) goTo(STEPS[index - 1]);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      if (found.name) nameRef.current?.focus();
      else if (found.phone) phoneRef.current?.focus();
      else emailRef.current?.focus();
      return;
    }

    goTo("confirmed");
  }

  const canContinueSchedule = Boolean(dayIso && slot);

  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-ground-deep px-5 py-4 sm:px-7 sm:py-5">
        <div className="min-w-0">
          <p className="label-sm text-teal-ink">
            {step === "confirmed" ? "Confirmed" : `Step ${stepIndex + 1} of ${STEPS.length}`}
          </p>
          <Dialog.Title className="mt-1 font-display text-xl leading-tight text-ink sm:text-2xl">
            {STEP_TITLES[step]}
          </Dialog.Title>
        </div>
        <Dialog.Close
          className="-mr-1 -mt-1 shrink-0 rounded-full p-2 text-muted transition-colors hover:bg-ground hover:text-ink"
          aria-label="Close booking"
        >
          <X className="size-5" strokeWidth={ICON_STROKE} aria-hidden="true" />
        </Dialog.Close>
      </div>

      {/* Progress — the ribbon doing quiet structural work */}
      <div className="h-1 w-full bg-ground" aria-hidden="true">
        <motion.div
          className="ribbon-sweep h-full origin-left"
          initial={false}
          animate={{ scaleX: (stepIndex + (step === "confirmed" ? 0 : 1)) / STEPS.length }}
          transition={
            reduce
              ? { duration: motionTokens.duration.instant }
              : { duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }
          }
          style={{ transformOrigin: "left" }}
        />
      </div>

      {/* Body
          Steps animate in on mount rather than through AnimatePresence: with
          `mode="wait"` the next step cannot render until the previous one has
          finished animating out, which strands the visitor mid-booking wherever
          animation frames are throttled — a backgrounded tab, a low-end device.
          Progressing through a form must never depend on an animation
          completing, so the outgoing step is simply replaced. */}
      <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
        <div>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: reduce ? 0 : motionTokens.distance.md }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: motionTokens.duration.fast, ease: motionTokens.easing.smooth }}
          >
            {step === "department" ? (
              <ul className="grid gap-2 sm:grid-cols-2">
                {departments.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setDepartmentId(item.id);
                        setDoctorId(null);
                        goTo("doctor");
                      }}
                      className={cn(
                        "flex w-full flex-col gap-0.5 rounded-xl border p-3.5 text-left transition-colors",
                        departmentId === item.id
                          ? "border-brand bg-brand-tint"
                          : "border-ground-deep hover:border-brand hover:bg-brand-tint/60",
                      )}
                    >
                      <span className="flex items-center gap-2.5">
                        {departmentIcons[item.id]
                          ? (() => {
                              const Icon = departmentIcons[item.id];
                              return <Icon className="size-[1.15rem] shrink-0 text-teal-ink" strokeWidth={ICON_STROKE} aria-hidden="true" />;
                            })()
                          : null}
                        <span className="font-medium text-ink">{item.name}</span>
                      </span>
                      <span className="text-sm text-muted">
                        {item.consultants} consultants, {item.focus.toLowerCase()}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}

            {step === "doctor" ? (
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setDoctorId(ANY_DOCTOR);
                    goTo("schedule");
                  }}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border p-3.5 text-left transition-colors",
                    doctorId === ANY_DOCTOR
                      ? "border-brand bg-brand-tint"
                      : "border-ground-deep hover:border-brand hover:bg-brand-tint/60",
                  )}
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-ground text-teal-ink">
                    <UserRound className="size-5" strokeWidth={ICON_STROKE} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-medium text-ink">First available consultant</span>
                    <span className="block text-sm text-muted">
                      Usually the soonest appointment in {department?.name ?? "this department"}
                    </span>
                  </span>
                </button>

                {departmentDoctors.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setDoctorId(item.id);
                      goTo("schedule");
                    }}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border p-3.5 text-left transition-colors",
                      doctorId === item.id
                        ? "border-brand bg-brand-tint"
                        : "border-ground-deep hover:border-brand hover:bg-brand-tint/60",
                    )}
                  >
                    <span className="relative size-12 shrink-0 overflow-hidden rounded-full bg-ground-deep">
                      <Image
                        src={item.portrait}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover object-top"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-medium text-ink">{item.name}</span>
                      <span className="block truncate text-sm text-muted">
                        {item.qualifications} · {item.experienceYears} years
                      </span>
                      <span className="mt-0.5 flex items-center gap-1.5 text-sm text-teal-ink">
                        <CalendarClock className="size-3.5 shrink-0" strokeWidth={ICON_STROKE} aria-hidden="true" />
                        {item.nextAvailable}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            ) : null}

            {step === "schedule" ? (
              <div className="flex flex-col gap-6">
                <fieldset>
                  <legend className="label-sm mb-2.5 text-teal-ink">Choose a day</legend>
                  <div className="rail -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
                    {availability.map((day) => {
                      const disabled = day.slots.length === 0;
                      return (
                        <label
                          key={day.iso}
                          className={cn(
                            "flex shrink-0 cursor-pointer flex-col items-center rounded-xl border px-4 py-2.5 text-center transition-colors",
                            disabled && "cursor-not-allowed opacity-45",
                            dayIso === day.iso
                              ? "border-brand bg-brand text-white"
                              : "border-ground-deep hover:border-brand",
                          )}
                        >
                          <input
                            type="radio"
                            name="appointment-day"
                            value={day.iso}
                            disabled={disabled}
                            checked={dayIso === day.iso}
                            onChange={() => {
                              setDayIso(day.iso);
                              setSlot(null);
                            }}
                            className="sr-only"
                          />
                          <span className="text-sm font-medium whitespace-nowrap">{day.label}</span>
                          <span
                            className={cn(
                              "tabular text-xs",
                              dayIso === day.iso ? "text-white/80" : "text-muted",
                            )}
                          >
                            {disabled ? "Closed" : `${day.slots.length} slots`}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="label-sm mb-2.5 text-teal-ink">Choose a time</legend>
                  {!selectedDay ? (
                    <p className="text-sm text-muted">Select a day to see available times.</p>
                  ) : selectedDay.slots.length === 0 ? (
                    <p className="text-sm text-muted">{selectedDay.note}</p>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {selectedDay.slots.map((time) => (
                        <label
                          key={time}
                          className={cn(
                            "tabular flex cursor-pointer items-center justify-center rounded-xl border py-3 text-sm font-medium transition-colors",
                            slot === time
                              ? "border-brand bg-brand text-white"
                              : "border-ground-deep hover:border-brand hover:bg-brand-tint/60",
                          )}
                        >
                          <input
                            type="radio"
                            name="appointment-slot"
                            value={time}
                            checked={slot === time}
                            onChange={() => setSlot(time)}
                            className="sr-only"
                          />
                          {time}
                        </label>
                      ))}
                    </div>
                  )}
                </fieldset>
              </div>
            ) : null}

            {step === "details" ? (
              <form id="appointment-details" onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                <Field
                  ref={nameRef}
                  id="patient-name"
                  label="Full name"
                  autoComplete="name"
                  value={values.name}
                  error={errors.name}
                  onChange={(next) => setValues((v) => ({ ...v, name: next }))}
                />
                <Field
                  ref={phoneRef}
                  id="patient-phone"
                  label="Phone number"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="98765 43210"
                  value={values.phone}
                  error={errors.phone}
                  onChange={(next) => setValues((v) => ({ ...v, phone: next }))}
                />
                <Field
                  ref={emailRef}
                  id="patient-email"
                  label="Email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={values.email}
                  error={errors.email}
                  onChange={(next) => setValues((v) => ({ ...v, email: next }))}
                />

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="patient-reason" className="text-sm font-medium text-ink">
                    Reason for visit <span className="font-normal text-muted">(optional)</span>
                  </label>
                  <textarea
                    id="patient-reason"
                    rows={3}
                    value={values.reason}
                    onChange={(event) => setValues((v) => ({ ...v, reason: event.target.value }))}
                    className="resize-y rounded-xl border border-ground-deep px-3.5 py-2.5 text-[0.9375rem] text-ink placeholder:text-muted/70 focus:border-brand focus:outline-none"
                    placeholder="A short note helps the consultant prepare."
                  />
                  <p className="text-xs text-muted">
                    Please do not include detailed medical history here.
                  </p>
                </div>
              </form>
            ) : null}

            {step === "confirmed" ? (
              <div role="status" aria-live="polite" className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-teal-ink text-white">
                    <Check className="size-5" strokeWidth={2.2} aria-hidden="true" />
                  </span>
                  <p className="text-lede text-ink">
                    We have your request. The hospital will call {values.phone.trim()} to confirm.
                  </p>
                </div>

                <dl className="divide-y divide-ground-deep rounded-xl border border-ground-deep">
                  <SummaryRow label="Consultant" value={doctor ? doctor.name : "First available consultant"} />
                  <SummaryRow label="Department" value={department?.name ?? "General Medicine"} />
                  <SummaryRow
                    label="Date"
                    value={selectedDay ? selectedDay.longLabel : "To be confirmed"}
                  />
                  <SummaryRow label="Time" value={slot ?? "To be confirmed"} />
                  <SummaryRow label="Patient" value={values.name.trim()} />
                </dl>

                <p className="rounded-xl bg-paper px-4 py-3 text-sm text-ink-soft">
                  <strong className="font-semibold">This is a demonstration.</strong> No appointment
                  has been submitted to a real hospital system, and no details you entered have left
                  this browser.
                </p>
              </div>
            ) : null}
          </motion.div>
        </div>
      </div>

      {/* Footer actions */}
      <div className="flex items-center justify-between gap-3 border-t border-ground-deep bg-white px-5 py-4 sm:px-7">
        {step === "confirmed" ? (
          <>
            <p className="text-sm text-muted">Reference SH-{new Date().getFullYear()}-4821</p>
            <button type="button" onClick={onClose} className={buttonStyles("primary", "md")}>
              Done
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={handleBack}
              disabled={STEPS.indexOf(step as (typeof STEPS)[number]) === 0}
              className={buttonStyles("ghost", "md", "disabled:opacity-0")}
            >
              Back
            </button>

            {step === "schedule" ? (
              <button
                type="button"
                onClick={() => goTo("details")}
                disabled={!canContinueSchedule}
                className={buttonStyles("primary", "md")}
              >
                Continue
              </button>
            ) : null}

            {step === "details" ? (
              <button type="submit" form="appointment-details" className={buttonStyles("primary", "md")}>
                Confirm appointment
              </button>
            ) : null}

            {step === "department" || step === "doctor" ? (
              <p className="text-sm text-muted">Select one to continue</p>
            ) : null}
          </>
        )}
      </div>
    </>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 px-4 py-3">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="text-right font-medium text-ink">{value}</dd>
    </div>
  );
}

function Field({
  ref,
  id,
  label,
  value,
  error,
  onChange,
  type = "text",
  ...rest
}: {
  ref?: React.Ref<HTMLInputElement>;
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  inputMode?: "tel" | "email" | "text";
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "min-h-11 rounded-xl border px-3.5 text-[0.9375rem] text-ink placeholder:text-muted/70 focus:outline-none",
          error ? "border-accent-ink focus:border-accent-ink" : "border-ground-deep focus:border-brand",
        )}
        {...rest}
      />
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-accent-ink">
          {error}
        </p>
      ) : null}
    </div>
  );
}
