import { Phone } from "lucide-react";
import { BookButton } from "@/components/appointment/book-button";
import { Reveal } from "@/components/ui/reveal";
import { buttonStyles } from "@/components/ui/button";
import { hospital } from "@/data/site";

/** The closing band — the brand sweep, one message, two actions. */
export function Cta() {
  return (
    <section className="bg-ground pt-4 pb-14 lg:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="ribbon-sweep relative overflow-hidden rounded-[2.5rem] px-7 py-12 text-white sm:px-12 lg:px-16 lg:py-16">
            <div
              aria-hidden="true"
              className="field-grid pointer-events-none absolute inset-0 text-white/10"
            />
            <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="max-w-[22ch] font-display text-headline">
                  Good care starts with a <em className="italic">conversation</em>.
                </h2>
                <p className="mt-4 max-w-[54ch] text-[1.02rem] leading-relaxed text-white/85">
                  Book online in under a minute, or call and a person will pick up — Mon–Sat,
                  8 AM to 8 PM.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <BookButton variant="onDark" size="lg">
                  Book an appointment
                </BookButton>
                <a
                  href={hospital.phone.generalHref}
                  className={buttonStyles("ghost", "lg", "!text-white hover:!bg-white/15")}
                >
                  <Phone aria-hidden="true" className="size-4" />
                  <span className="tabular">{hospital.phone.general}</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
