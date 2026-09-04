import Image from "next/image";
import { services } from "@/data/services";
import { BookButton } from "@/components/appointment/book-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { ICON_STROKE, serviceIcons } from "@/lib/icons";

/**
 * One service carries the weight of a feature and the rest are an index. Nine
 * equal tiles would flatten a list where one item genuinely matters more.
 */
export function Services() {
  const [lead, ...rest] = services;

  return (
    <section id="services" aria-labelledby="services-heading" className="section-y bg-white">
      <div className="mx-auto max-w-[88rem] px-5 lg:px-10">
        <SectionHeading
          id="services-heading"
          title="Everything a diagnosis needs, in one building."
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <article className="lg:col-span-5">
            <figure className="relative aspect-[3/2] overflow-hidden rounded-2xl">
              <Image
                src="/images/scenes/desk-consult.jpg"
                alt="A doctor going through results with a patient across a desk in an outpatient room."
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </figure>
            <h3 className="mt-5 font-display text-title text-ink">{lead.name}</h3>
            <p className="mt-2 max-w-[46ch] text-muted">{lead.description}</p>
            <p className="mt-3 text-sm font-medium text-teal-ink">{lead.detail}</p>
            <div className="mt-5">
              <BookButton departmentId="general-medicine" variant="secondary">
                Book a health check
              </BookButton>
            </div>
          </article>

          <div className="lg:col-span-7">
            <h3 className="sr-only">Other services</h3>
            <ul className="grid gap-x-8 sm:grid-cols-2">
              {rest.map((service) => {
                const Icon = serviceIcons[service.id];
                return (
                  <li
                    key={service.id}
                    className="group flex gap-3.5 border-b border-brand-line py-4 last:border-b-0 sm:last:border-b"
                  >
                    {Icon ? (
                      <Icon
                        className="mt-0.5 size-5 shrink-0 text-teal-ink transition-colors duration-200 group-hover:text-brand"
                        strokeWidth={ICON_STROKE}
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="min-w-0">
                      <h4 className="font-medium text-ink">{service.name}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{service.description}</p>
                      <p className="mt-1.5 text-sm text-teal-ink">{service.detail}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
