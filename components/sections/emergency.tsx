import { Ambulance, Clock, Phone, ShieldPlus } from "lucide-react";
import { hospital } from "@/data/site";
import { ICON_STROKE } from "@/lib/icons";

const readiness = [
  { icon: ShieldPlus, label: "Resuscitation bays", value: "4" },
  { icon: Ambulance, label: "Ambulances on call", value: "6" },
  { icon: Clock, label: "Door-to-triage target", value: "5 min" },
  { icon: Phone, label: "Consultant cover", value: "24/7" },
];

/**
 * Emergency information has to be findable and calm at once. Red is limited to
 * a single indicator and the phone number; everything else stays quiet.
 */
export function Emergency() {
  return (
    <section
      id="emergency"
      aria-labelledby="emergency-heading"
      className="section-y border-y border-brand-line bg-ground"
    >
      <div className="mx-auto grid max-w-[88rem] gap-8 px-5 lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-10">
        <div className="lg:col-span-7">
          <p className="flex items-center gap-2 text-sm font-medium text-accent-ink">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-2 rounded-full bg-accent opacity-70 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            Emergency and trauma
          </p>
          <h2 id="emergency-heading" className="mt-3 max-w-[16ch] font-display text-headline text-ink">
            Here when you need us most.
          </h2>
          <p className="mt-4 max-w-[54ch] text-lede text-muted">
            The Emergency &amp; Trauma Centre never closes and is always consultant-led. It has its
            own ambulance approach and direct lift access to imaging, theatres and intensive care.
            You do not need an appointment — come straight in.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={hospital.phone.emergencyHref}
              className="group inline-flex items-center gap-3 rounded-xl bg-white px-5 py-3.5 shadow-[var(--shadow-card)] transition-shadow duration-200 hover:shadow-[var(--shadow-lift)]"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Phone className="size-[1.15rem]" strokeWidth={ICON_STROKE} aria-hidden="true" />
              </span>
              <span className="tabular font-display text-[clamp(1.35rem,2.4vw,1.8rem)] text-brand group-hover:text-accent-ink">
                {hospital.phone.emergency}
              </span>
            </a>
            <p className="max-w-[24ch] text-sm text-muted">
              Demonstration number. It does not connect to a real hospital.
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-x-6 border-t border-brand-line lg:col-span-5">
          {readiness.map((item) => (
            <div key={item.label} className="flex flex-col gap-1 border-b border-brand-line py-4">
              <dt className="flex items-center gap-2 text-sm text-muted">
                <item.icon className="size-4 shrink-0 text-teal-ink" strokeWidth={ICON_STROKE} aria-hidden="true" />
                {item.label}
              </dt>
              <dd className="tabular font-display text-2xl text-ink">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
