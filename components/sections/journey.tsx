import { Reveal } from "@/components/ui/reveal";
import { RibbonRule } from "@/components/ui/ribbon";
import { SectionHeading } from "@/components/ui/section-heading";
import { journeySteps } from "@/data/site";
import { journeyIcons, ICON_STROKE } from "@/lib/icons";

/**
 * The patient journey as five numbered editorial steps under a single rule that
 * draws itself across the section — the order carries meaning, so the numbers
 * stay visible and the steps arrive left to right, in sequence.
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
                What a visit actually{" "}
                <em className="font-semibold text-brand not-italic">feels</em> like.
              </>
            }
            lede="From the porch to the follow-up call, one continuous path — and a person responsible for every step of it."
          />
        </Reveal>

        <RibbonRule thick className="mt-10" />

        <ol className="grid gap-x-8 gap-y-10 pt-10 sm:grid-cols-2 lg:grid-cols-5">
          {journeySteps.map((step, index) => {
            const Icon = journeyIcons[step.id];
            return (
              <Reveal key={step.id} index={index} as="li" direction="up">
                <div className="group flex flex-col gap-3">
                  <span
                    aria-hidden="true"
                    className="font-display text-[2.6rem] leading-none font-light text-brand/35 transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:text-brand/60"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {Icon ? (
                    <Icon
                      aria-hidden="true"
                      strokeWidth={ICON_STROKE}
                      className="size-6 text-teal-ink transition-transform duration-500 ease-out group-hover:translate-x-1"
                    />
                  ) : null}
                  <h3 className="font-display text-xl font-medium text-ink">{step.title}</h3>
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
