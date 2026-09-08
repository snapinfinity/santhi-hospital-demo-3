import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { ParallaxFrame } from "@/components/ui/parallax";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatFigure } from "@/components/ui/stat-figure";
import { stats, principles } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * The about section: a stats band that counts itself up one cell at a time,
 * then the hospital's principles as a numbered editorial list beside a single
 * arch photograph that pans against the scroll.
 */
export function About() {
  return (
    <section id="about" className="section-y bg-ground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            kicker="About Santhi"
            title={
              <>
                A hospital built around the{" "}
                <em className="font-semibold text-brand not-italic">people</em> in it.
              </>
            }
            lede="Thirty-four years on the Malabar coast, still organised around one belief: medicine works best when the patient is a person, not a case number."
          />
        </Reveal>

        {/* Stats band — each cell arrives a beat after the one before it. */}
        <dl className="mt-10 grid grid-cols-2 border-y border-brand-line sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              index={index}
              direction="up"
              className={cn(
                "group flex flex-col gap-1 px-5 py-7 transition-colors duration-300 hover:bg-brand-wash",
                index % 2 === 1 && "border-l border-brand-line",
                index > 1 && "border-t border-brand-line sm:border-t-0",
                index > 0 && "lg:border-l",
                index === 2 && "sm:border-l",
              )}
            >
              <dd className="font-display text-4xl font-medium text-brand">
                <StatFigure value={stat.value} />
              </dd>
              <dt className="label-sm text-ink">{stat.label}</dt>
              <p className="hidden text-[0.8rem] leading-snug text-muted xl:block">{stat.detail}</p>
            </Reveal>
          ))}
        </dl>

        {/* Principles + photograph */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
          <Reveal direction="right">
            <div className="lg:sticky lg:top-28">
              <ParallaxFrame
                amount={6}
                className="arch-sm aspect-[4/5] bg-brand-tint shadow-card"
              >
                <Image
                  src="/images/scenes/clinic-checkup.jpg"
                  alt="A consultant examining a patient in a bright Santhi Hospital clinic room. Demonstration photograph."
                  fill
                  sizes="(min-width: 1024px) 32vw, 92vw"
                  className="object-cover"
                />
              </ParallaxFrame>
              <p className="mt-4 text-[0.85rem] text-muted">
                Outpatient block, first floor — clinics run Mon–Sat, 8 AM to 8 PM.
              </p>
            </div>
          </Reveal>

          <ol className="flex flex-col">
            {principles.map((principle, index) => (
              <Reveal key={principle.title} index={index} direction="left" as="li">
                <div
                  className={cn(
                    "group flex gap-6 py-7 sm:gap-10",
                    index > 0 ? "border-t border-brand-line" : "pt-0",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="font-display text-2xl font-light text-brand/60 transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:text-brand"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex flex-col gap-2">
                    <h3 className="font-display text-xl font-medium text-ink">{principle.title}</h3>
                    <p className="max-w-[62ch] text-[0.95rem] leading-relaxed text-muted">
                      {principle.body}
                    </p>
                  </span>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
