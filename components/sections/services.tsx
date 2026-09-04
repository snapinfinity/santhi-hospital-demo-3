import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { serviceIcons, ICON_STROKE } from "@/lib/icons";

/** The clinical support services, as a quiet card grid with functional icons. */
export function Services() {
  return (
    <section id="services" className="section-y bg-ground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            kicker="Services"
            title={
              <>
                Everything <em className="text-brand italic">around</em> the consultation.
              </>
            }
            lede="Diagnostics, pharmacy, rehabilitation and follow-up at home — the parts of care that decide whether a treatment plan actually happens."
          />
        </Reveal>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.icon];
            return (
              <Reveal key={service.id} index={index % 4} as="li">
                <article className="group flex h-full flex-col rounded-2xl border border-brand-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  {Icon ? (
                    <span className="grid size-12 place-items-center rounded-xl bg-brand-tint text-brand">
                      <Icon aria-hidden="true" strokeWidth={ICON_STROKE} className="size-6" />
                    </span>
                  ) : null}
                  <h3 className="mt-5 font-display text-lg text-ink">{service.name}</h3>
                  <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-muted">
                    {service.description}
                  </p>
                  <p className="mt-5 flex items-center gap-2 border-t border-paper-line pt-4 text-[0.85rem] font-medium text-teal-ink">
                    {service.detail}
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform group-hover:translate-x-1"
                    />
                  </p>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
