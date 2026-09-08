import { Check } from "lucide-react";
import { packages } from "@/data/packages";
import { BookButton } from "@/components/appointment/book-button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

/**
 * Preventive health check packages. One card is deliberately elevated ("most
 * chosen") rather than three identical ones — it sits a little higher on the
 * row and carries the tint, so the choice is meant to be easy.
 */
export function Packages() {
  return (
    <section id="health-checks" className="section-y bg-ground-deep">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            kicker="Health checks"
            title={
              <>
                Screening built around{" "}
                <em className="font-semibold text-brand not-italic">you</em>, not a checklist.
              </>
            }
            lede="Three packages, each reviewed with a physician on the same day. No upselling between the blood draw and the report."
          />
        </Reveal>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-3">
          {packages.map((pkg, index) => (
            <Reveal key={pkg.id} index={index} direction="up">
              <article
                className={cn(
                  "lift-card relative flex h-full flex-col rounded-3xl border p-8",
                  pkg.popular
                    ? "border-brand bg-brand-tint shadow-lift lg:-translate-y-3"
                    : "border-brand-line bg-white shadow-card hover:border-brand-soft",
                )}
              >
                {pkg.popular ? (
                  <span className="absolute -top-3.5 right-6 rounded-full bg-brand px-3.5 py-1.5 text-xs font-semibold text-white shadow-card">
                    Most chosen
                  </span>
                ) : null}

                <h3 className="font-display text-xl font-medium text-ink">{pkg.name}</h3>
                <p className="mt-1 text-sm text-muted">{pkg.for}</p>

                <p className="mt-6 flex items-baseline gap-2">
                  <span
                    className={cn(
                      "font-display text-[2.6rem] leading-none font-medium",
                      pkg.popular ? "text-brand-ink" : "text-brand",
                    )}
                  >
                    {pkg.price}
                  </span>
                  <span className="text-sm text-muted">all inclusive</span>
                </p>
                <p
                  className={cn(
                    "mt-2 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-medium",
                    pkg.popular ? "bg-white/80 text-brand-ink" : "bg-brand-wash text-brand-ink",
                  )}
                >
                  {pkg.duration}
                </p>

                <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[0.9rem]">
                      <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-teal-ink" />
                      <span className="text-ink-soft">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <BookButton
                    departmentId="general-medicine"
                    variant={pkg.popular ? "primary" : "secondary"}
                    className="w-full"
                    ariaLabel={`Book the ${pkg.name} health check`}
                  >
                    Book this check
                  </BookButton>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6">
          <p className="text-center text-[0.85rem] text-muted">
            Prices are demonstration figures. Home sample collection is available for the laboratory
            portions of every package.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
