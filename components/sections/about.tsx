import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { StatFigure } from "@/components/ui/stat-figure";
import { SectionHeading } from "@/components/ui/section-heading";
import { principles, stats } from "@/data/site";

/**
 * The hospital's account of itself, the numbers behind it, and the four
 * principles that stand in for a "why choose us" icon grid — set as prose,
 * because these are arguments rather than features.
 */
export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section-y bg-ground">
      <div className="mx-auto max-w-[88rem] px-5 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <SectionHeading id="about-heading" title="Care that sees the whole person." />
            <div className="mt-5 flex max-w-[58ch] flex-col gap-4 text-lede text-muted">
              <p>
                Santhi Hospital began in 1991 as a twenty-bed nursing home on Riverside Avenue. It
                is now a multi-speciality hospital of 420 beds — but the thing patients tell us they
                value has not changed in thirty-five years. They are treated by people who remember
                them.
              </p>
              <p>
                Our clinicians work in multidisciplinary teams rather than separate silos. A cardiac
                patient is seen by a cardiologist, a physiotherapist and a dietitian who share one
                record and agree one plan, so nobody has to carry their own history from door to
                door.
              </p>
            </div>
          </Reveal>

          <div className="lg:col-span-5">
            <figure className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/scenes/clinic-checkup.jpg"
                alt="A doctor examining a patient with a stethoscope during a clinic appointment."
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </figure>
          </div>
        </div>

        {/* The numbers, as a ledger rather than a row of tiles. */}
        <div className="mt-12">
          <h3 className="sr-only">Santhi Hospital in numbers</h3>
          <dl className="grid gap-x-10 border-t border-brand-line sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1 border-b border-brand-line py-5">
                <dt className="flex items-baseline gap-2">
                  <StatFigure
                    value={stat.value}
                    className="tabular font-display text-3xl text-brand lg:text-4xl"
                  />
                  <span className="font-medium text-ink">{stat.label}</span>
                </dt>
                <dd className="max-w-[38ch] text-sm text-muted">{stat.detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-12 grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {principles.map((principle) => (
            <div key={principle.title}>
              <h3 className="font-display text-title text-ink">{principle.title}</h3>
              <p className="mt-2 max-w-[46ch] text-muted">{principle.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
