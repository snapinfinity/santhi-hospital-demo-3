import Image from "next/image";
import { ArrowRight, MapPin, Phone, Star } from "lucide-react";
import { BookButton } from "@/components/appointment/book-button";
import { Marquee } from "@/components/ui/marquee";
import { RibbonDefs } from "@/components/ui/ribbon";
import { buttonStyles } from "@/components/ui/button";
import { hospital, tickerItems } from "@/data/site";
import { doctors } from "@/data/doctors";

const featured = doctors[0];
/** Shared portraits for the stacked trust row. */
const trustPortraits = doctors.slice(0, 3);

/** Entrance delays for the copy column, in the order the eye reads them. */
const rise = (delay: number) => ({ animationDelay: `${delay}s` });

/**
 * A full-bleed photograph of the hospital's own campus — the main gate and
 * the mobile ICU under a Kerala sky — with the copy set directly on it.
 *
 * Legibility comes from two scrims rather than one flat tint: a horizontal
 * sweep that is near-solid navy behind the copy and thins to almost nothing
 * over the building, and a vertical fade along the foot that carries the
 * cards and the ticker. Below `lg` the copy spans the full width, so the
 * horizontal sweep stays heavier all the way across.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-navy-deep text-white"
    >
      {/* The ribbon gradient is declared once per document, here. */}
      <RibbonDefs />

      {/*
        Photograph — settles in on load, then drifts for as long as it is on
        screen. Below `lg` the copy runs longer than the viewport, so the
        picture is a band across the top of the section that dissolves into
        the navy ground rather than a full-height fill that would need to be
        darkened into invisibility; from `lg` it fills the section.
      */}
      <div className="settle absolute inset-x-0 top-0 h-[72svh] max-h-[40rem] overflow-hidden lg:inset-0 lg:h-auto lg:max-h-none">
        <Image
          src="/images/santhi/campus-gate.jpg"
          alt="The Santhi Hospital campus in Kozhikode: the main gate, the mobile ICU ambulance and the hospital building under a Kerala sky."
          fill
          priority
          sizes="100vw"
          className="ken-burns object-cover object-[62%_center] lg:object-[70%_center]"
        />

        {/* Scrim below `lg` — heaviest under the headline, solid by the foot of the band. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-navy-deep/80 via-navy/62 via-45% to-navy-deep lg:hidden"
        />
        {/* Scrims from `lg` — a sweep behind the copy, and a fade along the foot. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-linear-to-r from-navy-deep/90 via-navy/55 via-40% to-navy/5 lg:block"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 hidden h-1/2 bg-linear-to-t from-navy-deep/90 via-navy-deep/30 to-transparent lg:block"
        />
      </div>

      <div className="relative mx-auto flex min-h-[min(88svh,50rem)] max-w-7xl flex-col justify-center px-4 pt-16 pb-14 sm:px-6 lg:min-h-[min(86svh,54rem)] lg:pt-20 lg:pb-32">
        {/* Copy — on the dark ground the focus ring inverts to white. */}
        <div className="max-w-2xl [&_:focus-visible]:outline-white">
          <p
            className="rise inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.85rem] font-medium text-white/90"
            style={rise(0.05)}
          >
            <MapPin aria-hidden="true" className="size-4 text-teal" />
            Kozhikode, Kerala
            <span aria-hidden="true" className="text-white/40">·</span>
            Caring since 1992
          </p>

          <h1
            className="rise mt-6 max-w-[13ch] font-display text-display text-white drop-shadow-[0_2px_18px_rgb(22_40_74/0.45)]"
            style={rise(0.14)}
          >
            Good medicine begins with{" "}
            <em className="font-semibold text-teal not-italic">listening</em>.
          </h1>

          <p
            className="rise mt-6 max-w-[52ch] text-lede text-white/88 [text-shadow:0_1px_14px_rgb(22_40_74/0.6)]"
            style={rise(0.24)}
          >
            120 consultants, 32 departments and 24-hour emergency care under one roof on the
            Malabar coast — so the distance between a worry and an answer is a single visit.
          </p>

          <div className="rise mt-8 flex flex-wrap items-center gap-3" style={rise(0.34)}>
            <BookButton variant="mint" size="lg" className="group">
              Book an appointment
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
              />
            </BookButton>
            <a href="#doctors" className={buttonStyles("glass", "lg")}>
              Find a doctor
            </a>
          </div>

          <div className="rise mt-9 flex flex-wrap items-center gap-4" style={rise(0.44)}>
            <span className="group flex -space-x-3" aria-hidden="true">
              {trustPortraits.map((doctor, index) => (
                <span
                  key={doctor.id}
                  style={{ transitionDelay: `${index * 40}ms` }}
                  className="relative size-11 overflow-hidden rounded-full ring-2 ring-white/40 transition-transform duration-500 ease-out group-hover:-translate-y-1"
                >
                  <Image src={doctor.portrait} alt="" fill sizes="44px" className="object-cover" />
                </span>
              ))}
            </span>
            <span className="flex flex-col">
              <span className="flex items-center gap-1" aria-label="Rated 4.8 out of 5 by patients">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} aria-hidden="true" className="size-4 fill-teal text-teal" />
                ))}
                <span className="tabular ml-1 text-sm font-semibold text-white">4.8</span>
              </span>
              <span className="text-sm text-white/70">from 4,900+ patient reviews this year</span>
            </span>
          </div>
        </div>

        {/*
          Quick cards. Below `lg` they follow the copy as a two-up row; on
          desktop they sit over the quiet stretch of road in the bottom-right
          corner of the photograph, clear of the gate and the ambulance.
        */}
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:absolute lg:right-6 lg:bottom-12 lg:mt-0 lg:w-[21rem] lg:grid-cols-1">
          {/* Emergency card */}
          <div className="rise" style={rise(0.6)}>
            <a
              href={hospital.phone.emergencyHref}
              className="float-soft group/call flex h-full items-center gap-3 rounded-2xl border border-white/60 bg-white p-3 pr-5 shadow-lift"
              style={{ animationDelay: "1.4s" }}
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent-wash text-accent-ink">
                <Phone aria-hidden="true" className="size-4" />
              </span>
              <span>
                <span className="label-sm flex items-center gap-2 text-muted">
                  <span aria-hidden="true" className="pulse-dot size-2 rounded-full bg-accent" />
                  24/7 Emergency
                </span>
                <span className="tabular block font-display text-lg leading-tight font-medium text-accent-ink underline-offset-4 group-hover/call:underline">
                  {hospital.phone.emergency}
                </span>
              </span>
            </a>
          </div>

          {/* Next-available card */}
          <div className="rise" style={rise(0.5)}>
            <div className="float-soft h-full rounded-2xl border border-white/60 bg-white p-3.5 shadow-lift sm:p-4">
              <div className="flex items-center gap-3">
                <span className="relative size-11 shrink-0 overflow-hidden rounded-full bg-brand-tint">
                  <Image src={featured.portrait} alt="" fill sizes="44px" className="object-cover object-top" />
                </span>
                <span className="min-w-0">
                  <span className="label-sm block text-muted">Next available</span>
                  <span className="block truncate text-[0.9375rem] font-semibold text-ink">
                    {featured.name}
                  </span>
                  <span className="block text-xs text-muted">
                    {featured.role.split("—")[1]?.trim() ?? featured.role}
                  </span>
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3 border-t border-paper-line pt-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-teal-tint px-3 py-1 text-xs font-medium whitespace-nowrap text-teal-ink">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-teal" />
                  {featured.nextAvailable}
                </span>
                <BookButton
                  doctorId={featured.id}
                  variant="ghost"
                  className="group/slot min-h-9 shrink-0 px-3 text-sm"
                  ariaLabel={`Book with ${featured.name}`}
                >
                  Book
                  <ArrowRight
                    aria-hidden="true"
                    className="size-3.5 transition-transform duration-300 ease-out group-hover/slot:translate-x-1"
                  />
                </BookButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand ticker */}
      <div className="relative border-y border-brand-ink/40 bg-brand py-3.5 text-white">
        <Marquee items={tickerItems} />
      </div>
    </section>
  );
}
