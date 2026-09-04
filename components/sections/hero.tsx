import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck, ShieldPlus } from "lucide-react";
import { BookButton } from "@/components/appointment/book-button";
import { buttonStyles } from "@/components/ui/button";
import { hospital } from "@/data/site";
import { ICON_STROKE } from "@/lib/icons";

const trustPoints = [
  { figure: "35", label: "years in Kottayam" },
  { figure: "120", label: "consultants" },
  { figure: "32", label: "departments" },
];

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative overflow-hidden bg-ground">
      {/* A single soft field of brand colour behind the image column, rather than
          a gradient across the whole hero. */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 hidden h-full w-[46%] bg-brand-wash lg:block"
      />

      <div className="relative mx-auto grid max-w-[88rem] items-center gap-10 px-5 pt-10 pb-12 lg:grid-cols-12 lg:gap-12 lg:px-10 lg:pt-16 lg:pb-20">
        <div className="lg:col-span-6 xl:col-span-5">
          <h1 id="hero-heading" className="rise font-display text-display text-ink">
            Exceptional care, with humanity at the heart of it.
          </h1>

          <p
            className="rise mt-5 max-w-[46ch] text-lede text-muted"
            style={{ animationDelay: "70ms" }}
          >
            Advanced medicine, experienced specialists and compassionate nursing under one roof —
            so the people of Kottayam can be treated close to home, by a team that knows them.
          </p>

          <div className="rise mt-7 flex flex-wrap gap-3" style={{ animationDelay: "140ms" }}>
            <BookButton size="lg">
              <CalendarCheck className="size-[1.15rem]" strokeWidth={ICON_STROKE} aria-hidden="true" />
              Book an appointment
            </BookButton>
            <Link href="#doctors" className={buttonStyles("secondary", "lg", "group")}>
              Find a doctor
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                strokeWidth={ICON_STROKE}
                aria-hidden="true"
              />
            </Link>
          </div>

          <dl
            className="rise mt-9 grid max-w-md grid-cols-3 gap-4 border-t border-brand-line pt-5"
            style={{ animationDelay: "210ms" }}
          >
            {trustPoints.map((point) => (
              <div key={point.label} className="flex flex-col gap-0.5">
                <dt className="tabular font-display text-2xl text-brand">{point.figure}</dt>
                <dd className="text-sm leading-snug text-muted">{point.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          className="rise relative lg:col-span-6 lg:col-start-7 xl:col-span-7"
          style={{ animationDelay: "60ms" }}
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-[16/10]">
            <Image
              src="/images/scenes/hero-consultation.jpg"
              alt="A clinician examining an older patient during an outpatient consultation."
              fill
              priority
              sizes="(min-width: 1280px) 56vw, (min-width: 1024px) 48vw, 100vw"
              className="object-cover"
            />
          </div>

          {/* The one piece of layering in the hero: the emergency line, which is
              the thing a worried visitor needs before anything else. */}
          <a
            href={hospital.phone.emergencyHref}
            className="group absolute -bottom-5 left-4 flex items-center gap-3 rounded-xl bg-white p-3.5 pr-5 shadow-[var(--shadow-lift)] transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none sm:left-6 lg:-left-6"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <ShieldPlus className="size-5" strokeWidth={ICON_STROKE} aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm text-muted">Emergency, open 24 hours</span>
              <span className="tabular block font-medium text-ink group-hover:text-brand">
                {hospital.phone.emergency}
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
