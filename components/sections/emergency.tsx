import { Check, Phone } from "lucide-react";
import { hospital } from "@/data/site";
import { Reveal } from "@/components/ui/reveal";

const readiness = [
  "Separate ambulance approach — no queue at the main gate",
  "Four resuscitation bays, consultant-led around the clock",
  "Direct lift access to imaging, theatres and intensive care",
];

/** The one red-accented section. Emergencies get the loudest voice on the page. */
export function Emergency() {
  return (
    <section id="emergency" className="bg-accent text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:py-16">
        <Reveal>
          <h2 className="font-display text-headline">
            In an emergency, <em className="italic">minutes</em> matter.
          </h2>
          <p className="mt-4 max-w-[58ch] text-[1.02rem] leading-relaxed text-white/90">
            No appointment, no formality — walk in, or call and we will meet you at the door. The
            Emergency &amp; Trauma Centre runs on its own corridor, its own lifts and its own team.
          </p>
          <ul className="mt-7 flex flex-col gap-3">
            {readiness.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[0.95rem] text-white/95">
                <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal index={1}>
          <div className="rounded-3xl bg-white p-8 text-ink shadow-lift">
            <p className="label-sm flex items-center gap-2.5 text-muted">
              <span aria-hidden="true" className="pulse-dot size-2.5 rounded-full bg-accent" />
              Emergency &amp; ambulance — open 24 hours
            </p>
            <a
              href={hospital.phone.emergencyHref}
              className="tabular mt-3 block font-display text-[2.6rem] leading-none text-accent-ink underline-offset-4 hover:underline"
            >
              {hospital.phone.emergency}
            </a>
            <p className="mt-4 text-[0.9rem] leading-relaxed text-muted">
              Call ahead and the team tracks your ambulance to the nearest bay. Ambulance dispatch:
              press extension 1.
            </p>
            <a
              href={hospital.phone.emergencyHref}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 font-medium text-white transition-colors hover:bg-accent-ink"
            >
              <Phone aria-hidden="true" className="size-4" />
              Call for an ambulance
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
