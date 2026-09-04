import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/section-heading";

/** Warm ground, quiet typography — the quotes carry this section, not the frame. */
export function Testimonials() {
  const [lead, ...rest] = testimonials;

  return (
    <section aria-labelledby="testimonials-heading" className="section-y bg-paper">
      <div className="mx-auto max-w-[88rem] px-5 lg:px-10">
        <SectionHeading id="testimonials-heading" title="What patients tell us afterwards." />

        <div className="mt-8 grid gap-x-12 gap-y-8 lg:grid-cols-12">
          <figure className="flex flex-col gap-4 lg:col-span-6">
            <blockquote className="font-display text-[clamp(1.5rem,2.6vw,2.05rem)] leading-[1.28] text-ink">
              &ldquo;{lead.quote}&rdquo;
            </blockquote>
            <figcaption className="text-sm">
              <span className="font-medium text-ink">{lead.name}</span>
              <span className="text-muted">, {lead.context}</span>
            </figcaption>
          </figure>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-6">
            {rest.map((testimonial) => (
              <figure key={testimonial.id} className="flex flex-col gap-2.5">
                <blockquote className="text-[0.9375rem] leading-relaxed text-ink-soft">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="text-sm">
                  <span className="font-medium text-ink">{testimonial.name}</span>
                  <span className="text-muted">, {testimonial.context}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <p className="mt-8 border-t border-paper-line pt-4 text-sm text-muted">
          Written examples created for this demonstration, not statements from real patients.
        </p>
      </div>
    </section>
  );
}
