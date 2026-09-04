import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatFigure } from "@/components/ui/stat-figure";
import { stats, principles } from "@/data/site";

/**
 * The about section: an animated stats band, then the hospital's principles as
 * a numbered editorial list beside a single arch photograph.
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
                A hospital built around the <em className="text-brand italic">people</em> in it.
              </>
            }
            lede="Thirty-four years on the Malabar coast, still organised around one belief: medicine works best when the patient is a person, not a case number."
          />
        </Reveal>

        {/* Stats band */}
        <Reveal className="mt-10">
          <dl className="grid grid-cols-2 border-y border-brand-line sm:grid-cols-3 lg:grid-cols-5">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={
                  "flex flex-col gap-1 px-5 py-7 " +
                  (index % 2 === 1 ? "border-l border-brand-line " : "") +
                  (index > 1 ? "border-t border-brand-line sm:border-t-0 " : "") +
                  (index > 0 ? "lg:border-l " : "") +
                  (index === 2 ? "sm:border-l" : "")
                }
              >
                <dd className="font-display text-4xl text-brand">
                  <StatFigure value={stat.value} />
                </dd>
                <dt className="label-sm text-ink">{stat.label}</dt>
                <p className="hidden text-[0.8rem] leading-snug text-muted xl:block">{stat.detail}</p>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Principles + photograph */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <div className="arch-sm relative aspect-[4/5] overflow-hidden bg-brand-tint shadow-card">
                <Image
                  src="/images/scenes/clinic-checkup.jpg"
                  alt="A consultant examining a patient in a bright Santhi Hospital clinic room. Demonstration photograph."
                  fill
                  sizes="(min-width: 1024px) 32vw, 92vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-[0.85rem] text-muted">
                Outpatient block, first floor — clinics run Mon–Sat, 8 AM to 8 PM.
              </p>
            </div>
          </Reveal>

          <ol className="flex flex-col">
            {principles.map((principle, index) => (
              <Reveal key={principle.title} index={index}>
                <li className="group flex gap-6 border-t border-brand-line py-7 first:border-t-0 first:pt-0 sm:gap-10">
                  <span
                    aria-hidden="true"
                    className="font-display text-2xl text-brand/70 italic transition-colors group-hover:text-brand"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex flex-col gap-2">
                    <h3 className="font-display text-xl text-ink">{principle.title}</h3>
                    <p className="max-w-[62ch] text-[0.95rem] leading-relaxed text-muted">
                      {principle.body}
                    </p>
                  </span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
