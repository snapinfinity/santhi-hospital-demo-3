import { Ambulance, BusFront, Car, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { hospital } from "@/data/site";
import { miscIcons, ICON_STROKE } from "@/lib/icons";

const gettingHere = [
  { icon: Car, text: "Free parking for patients and visitors, with the covered porch directly off the approach road." },
  { icon: BusFront, text: "The Eranhipalam bus stop is a two-minute walk; city buses from Mavoor Road and bypass stop here." },
  { icon: Ambulance, text: "Ambulances use the separate west approach — follow the red signage; the gate is always attended." },
];

/** Contact and directions, on two cards — everything a first-time visitor needs. */
export function Contact() {
  return (
    <section id="contact" className="section-y bg-ground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            kicker="Contact"
            title={
              <>
                Come see us in <em className="text-brand italic">Kozhikode</em>.
              </>
            }
            lede="Twelve minutes from the railway station, on the Malabar Coast Road approach."
          />
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Address, phones, hours */}
          <Reveal>
            <div className="flex h-full flex-col rounded-3xl border border-brand-line bg-white p-7 shadow-card sm:p-9">
              <h3 className="font-display text-xl text-ink">Santhi Hospital</h3>
              <address className="mt-3 flex items-start gap-3 text-[0.95rem] leading-relaxed text-muted not-italic">
                <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-teal-ink" />
                <span>
                  {hospital.address.street}, {hospital.address.locality}
                  <br />
                  {hospital.address.region} {hospital.address.postalCode}, {hospital.address.country}
                </span>
              </address>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <a
                  href={hospital.phone.generalHref}
                  className="flex min-h-12 items-center gap-3 rounded-xl bg-brand-wash px-4 py-3 transition-colors hover:bg-brand-tint"
                >
                  <Phone aria-hidden="true" className="size-4 shrink-0 text-brand" />
                  <span>
                    <span className="label-sm block text-muted">General &amp; bookings</span>
                    <span className="tabular block text-[0.9375rem] font-medium text-ink">
                      {hospital.phone.general}
                    </span>
                  </span>
                </a>
                <a
                  href={hospital.phone.emergencyHref}
                  className="flex min-h-12 items-center gap-3 rounded-xl bg-brand-wash px-4 py-3 transition-colors hover:bg-brand-tint"
                >
                  <span aria-hidden="true" className="pulse-dot size-2 shrink-0 rounded-full bg-accent" />
                  <span>
                    <span className="label-sm block text-muted">Emergency, 24 hours</span>
                    <span className="tabular block text-[0.9375rem] font-medium text-accent-ink">
                      {hospital.phone.emergency}
                    </span>
                  </span>
                </a>
                <a
                  href={`mailto:${hospital.email}`}
                  className="flex min-h-12 items-center gap-3 rounded-xl bg-brand-wash px-4 py-3 transition-colors hover:bg-brand-tint sm:col-span-2"
                >
                  <Mail aria-hidden="true" className="size-4 shrink-0 text-brand" />
                  <span className="break-all text-[0.9375rem] font-medium text-ink">{hospital.email}</span>
                </a>
              </div>

              <dl className="mt-8 border-t border-paper-line">
                {hospital.hours.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-6 border-b border-paper-line py-3 last:border-b-0"
                  >
                    <dt className="flex items-center gap-2 text-[0.9rem] text-ink-soft">
                      <Clock3 aria-hidden="true" className="size-4 text-teal-ink" />
                      {row.label}
                    </dt>
                    <dd className="text-right text-[0.9rem] font-medium text-ink">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          {/* Getting here */}
          <Reveal index={1}>
            <div className="on-dark relative flex h-full flex-col overflow-hidden rounded-3xl bg-ink p-7 text-white sm:p-9">
              <div
                aria-hidden="true"
                className="field-grid pointer-events-none absolute inset-0 text-white/[0.06]"
              />
              <div className="relative">
                <h3 className="font-display text-xl">Getting here</h3>
                <ul className="mt-6 flex flex-col gap-6">
                  {gettingHere.map((item) => (
                    <li key={item.text} className="flex items-start gap-4">
                      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 text-teal">
                        <item.icon aria-hidden="true" strokeWidth={ICON_STROKE} className="size-5" />
                      </span>
                      <p className="text-[0.95rem] leading-relaxed text-white/85">{item.text}</p>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 rounded-2xl border border-white/15 bg-white/5 p-5">
                  <p className="label-sm flex items-center gap-2 text-teal">
                    <miscIcons.MapPin aria-hidden="true" className="size-4" />
                    Landmark
                  </p>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-white/85">
                    Two hundred metres from the Eranhipalam junction, opposite the Malabar Palace
                    landmark gate. Ask any autorickshaw for Santhi Hospital — everyone knows it.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
