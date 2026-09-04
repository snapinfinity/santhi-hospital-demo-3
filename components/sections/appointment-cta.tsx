import Link from "next/link";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { BookButton } from "@/components/appointment/book-button";
import { buttonStyles } from "@/components/ui/button";
import { RibbonArc } from "@/components/ui/ribbon";
import { ICON_STROKE } from "@/lib/icons";

export function AppointmentCta() {
  return (
    <section aria-labelledby="cta-heading" className="on-dark section-y relative overflow-hidden bg-brand">
      <RibbonArc className="absolute -right-[10%] -bottom-20 h-80 w-[80%] opacity-25" />

      <div className="relative mx-auto flex max-w-[88rem] flex-col gap-7 px-5 lg:flex-row lg:items-end lg:justify-between lg:px-10">
        <div>
          <h2 id="cta-heading" className="max-w-[18ch] font-display text-headline text-white">
            Take the next step toward better health.
          </h2>
          <p className="mt-4 max-w-[48ch] text-lede text-white/80">
            Find the right specialist and choose a time that works around your week. It takes less
            than a minute, and we call you to confirm.
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-3">
          <BookButton variant="onDark" size="lg">
            <CalendarCheck className="size-[1.15rem]" strokeWidth={ICON_STROKE} aria-hidden="true" />
            Book an appointment
          </BookButton>
          <Link
            href="#doctors"
            className={buttonStyles(
              "secondary",
              "lg",
              "group border-white/35 bg-transparent text-white hover:border-white hover:bg-white/10",
            )}
          >
            Find a doctor
            <ArrowRight
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
              strokeWidth={ICON_STROKE}
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
