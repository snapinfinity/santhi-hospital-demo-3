import { CalendarCheck, ClipboardList, HeartPulse, Stethoscope, Undo2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ICON_STROKE } from "@/lib/icons";

/** Genuinely a sequence, so the steps are numbered — the order carries meaning. */
const steps = [
  { n: "01", icon: CalendarCheck, title: "Book", body: "Choose a department, a consultant and a time. We call to confirm within the hour." },
  { n: "02", icon: Stethoscope, title: "Consult", body: "Meet your specialist. Bring previous reports — original films tell us more than photographs of them." },
  { n: "03", icon: ClipboardList, title: "Diagnose", body: "Imaging and laboratory work happen in this building, most of it reported the same day." },
  { n: "04", icon: HeartPulse, title: "Treat", body: "Your plan is agreed by the whole team caring for you, and costed in writing before it starts." },
  { n: "05", icon: Undo2, title: "Recover", body: "Follow-up, rehabilitation and, where it helps, nursing visits at home across the district." },
];

export function PatientJourney() {
  return (
    <section aria-labelledby="journey-heading" className="section-y bg-ground">
      <div className="mx-auto max-w-[88rem] px-5 lg:px-10">
        <SectionHeading id="journey-heading" title="Five steps, and someone with you at each of them." />

        <ol className="relative mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {/* The ribbon as the thread between steps — structure, not decoration. */}
          <div
            aria-hidden="true"
            className="ribbon-sweep absolute top-6 right-0 left-0 hidden h-0.5 lg:block"
          />

          {steps.map((step) => (
            <li key={step.n} className="relative flex flex-col gap-2.5">
              <span className="flex size-12 items-center justify-center rounded-xl bg-white text-brand shadow-[var(--shadow-card)]">
                <step.icon className="size-[1.35rem]" strokeWidth={ICON_STROKE} aria-hidden="true" />
              </span>
              <p className="tabular label-sm mt-1 text-teal-ink">{step.n}</p>
              <h3 className="font-display text-title text-ink">{step.title}</h3>
              <p className="max-w-[34ch] text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
