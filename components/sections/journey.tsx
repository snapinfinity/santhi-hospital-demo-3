import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { journeySteps } from "@/data/site";
import { journeyIcons, ICON_STROKE } from "@/lib/icons";

/**
 * The patient journey as five numbered editorial steps under a single animated
 * rule — the order carries meaning, so the numbers stay visible.
 */
export function Journey() {
  return (
    <section className="section-y bg-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            kicker="Your visit"
            title={
              <>
                What a visit actually <em className="text-brand italic">feels</em> like.
              </>
            }
            lede="From the porch to the follow-up call, one continuous path — and a person responsible for every step of it."
          />
        </Reveal>

        <Reveal className="mt-10" >
          <div aria-hidden="true" className="ribbon-sweep h-[3px] w-full origin-left" />
        </Reveal>

        <ol className="grid gap-x-8 gap-y-10 pt-10 sm:grid-cols-2 lg:grid-cols-5">
          {journeySteps.map((step, index) => {
            const Icon = journeyIcons[step.id];
            return (
              <Reveal key={step.id} index={index} as="li">
                <div className="flex flex-col gap-3">
                  <span
                    aria-hidden="true"
                    className="font-display text-[2.6rem] leading-none text-brand/35 italic"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {Icon ? (
                    <Icon aria-hidden="true" strokeWidth={ICON_STROKE} className="size-6 text-teal-ink" />
                  ) : null}
                  <h3 className="font-display text-xl text-ink">{step.title}</h3>
                  <p className="text-[0.9rem] leading-relaxed text-muted">{step.body}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
