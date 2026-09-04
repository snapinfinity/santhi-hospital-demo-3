import Image from "next/image";
import { facilities } from "@/data/facilities";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { facilityIcons, ICON_STROKE } from "@/lib/icons";

/**
 * Facilities read as a specification, not a brochure: each unit leads with the
 * figure that actually tells you something — bed count, theatre count, field
 * strength — rather than a photograph of a corridor.
 */
export function Facilities() {
  return (
    <section id="facilities" aria-labelledby="facilities-heading" className="on-dark section-y relative overflow-hidden bg-ink">
      <div
        aria-hidden="true"
        className="field-grid pointer-events-none absolute inset-0 text-white opacity-[0.05]"
      />

      <div className="relative mx-auto max-w-[88rem] px-5 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <SectionHeading
            id="facilities-heading"
            tone="dark"
            title="Built around the units that carry the weight."
            lede="420 beds across eight clinical units, with imaging, theatres and intensive care on adjacent floors so nobody travels far in an emergency."
            className="lg:col-span-7"
          />

          <Reveal as="figure" className="relative aspect-[16/10] overflow-hidden rounded-2xl lg:col-span-5">
            <Image
              src="/images/scenes/blood-pressure.jpg"
              alt="A doctor taking a patient's blood pressure in a consulting room."
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </Reveal>
        </div>

        <ul className="mt-10 grid gap-x-8 border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {facilities.map((facility) => {
            const Icon = facilityIcons[facility.id];
            return (
              <li key={facility.id} className="flex flex-col gap-1.5 border-b border-white/15 py-5">
                <div className="flex items-baseline gap-2.5">
                  {Icon ? (
                    <Icon className="size-[1.15rem] shrink-0 translate-y-0.5 text-teal" strokeWidth={ICON_STROKE} aria-hidden="true" />
                  ) : null}
                  <p className="tabular font-display text-2xl text-teal">{facility.capacity}</p>
                </div>
                <p className="text-sm text-white/50">{facility.capacityLabel}</p>
                <h3 className="mt-1 font-display text-lg text-white">{facility.name}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">{facility.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
