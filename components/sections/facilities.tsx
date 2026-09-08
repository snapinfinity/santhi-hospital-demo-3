import { facilities } from "@/data/facilities";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Facilities as a specification sheet — capacity first, description second —
 * because the numbers are the claim. Rows arrive from the left in sequence and
 * step sideways under the cursor.
 */
export function Facilities() {
  return (
    <section id="facilities" className="section-y bg-ground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            kicker="Facilities"
            title={
              <>
                Built to shorten the distance between{" "}
                <em className="font-semibold text-brand not-italic">question</em> and answer.
              </>
            }
            lede="Eight specifications that decide how fast a diagnosis becomes a plan."
          />
        </Reveal>

        <div className="mt-10 border-t border-brand-line">
          {facilities.map((facility, index) => (
            <Reveal key={facility.id} index={index % 4} direction="right">
              <div className="slide-row group grid items-baseline gap-2 border-b border-brand-line px-4 py-6 hover:bg-brand-wash sm:px-6 lg:grid-cols-[240px_1fr_1.6fr] lg:gap-8">
                <div className="flex items-baseline gap-3 lg:flex-col lg:gap-0.5">
                  <p className="tabular font-display text-[2rem] leading-none font-medium text-brand">
                    {facility.capacity}
                  </p>
                  <p className="label-sm text-muted">{facility.capacityLabel}</p>
                </div>
                <h3 className="font-display text-lg font-medium text-ink">{facility.name}</h3>
                <p className="text-[0.9rem] leading-relaxed text-muted">{facility.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
