import Image from "next/image";
import { ArrowRight, MapPin, Phone, Star } from "lucide-react";
import { BookButton } from "@/components/appointment/book-button";
import { Marquee } from "@/components/ui/marquee";
import { ParallaxFrame } from "@/components/ui/parallax";
import { RibbonArc, RibbonDefs } from "@/components/ui/ribbon";
import { buttonStyles } from "@/components/ui/button";
import { hospital, tickerItems } from "@/data/site";
import { doctors } from "@/data/doctors";

const featured = doctors[0];
/** Shared portraits for the stacked trust row. */
const trustPortraits = doctors.slice(0, 3);

/** Entrance delays for the copy column, in the order the eye reads them. */
const rise = (delay: number) => ({ animationDelay: `${delay}s` });

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ground">
      {/* The ribbon gradient is declared once per document, here. */}
      <RibbonDefs />

      {/* Ambient washes — two drift paths, so they never move in step. */}
      <div
        aria-hidden="true"
        className="drift-a pointer-events-none absolute -top-40 right-[-10%] size-[36rem] rounded-full bg-brand-soft/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="drift-b pointer-events-none absolute bottom-16 left-[-8%] size-[26rem] rounded-full bg-teal/20 blur-3xl"
      />
      <RibbonArc
        className="drift-b absolute top-24 right-0 hidden h-[26rem] w-[42rem] opacity-[0.07] lg:block"
        strokeWidth={34}
      />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 pt-12 pb-16 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pt-20 lg:pb-24">
        {/* Copy */}
        <div className="lg:col-span-7">
          <p
            className="rise inline-flex items-center gap-2 rounded-full border border-brand-line bg-white/80 px-4 py-2 text-[0.85rem] font-medium text-ink-soft"
            style={rise(0.05)}
          >
            <MapPin aria-hidden="true" className="size-4 text-teal-ink" />
            Kozhikode, Kerala
            <span aria-hidden="true" className="text-brand-line">·</span>
            Caring since 1992
          </p>

          <h1 className="rise mt-6 max-w-[13ch] font-display text-display text-ink" style={rise(0.14)}>
            Good medicine begins with{" "}
            <em className="font-semibold text-brand not-italic">listening</em>.
          </h1>

          <p className="rise mt-6 max-w-[54ch] text-lede text-muted" style={rise(0.24)}>
            120 consultants, 32 departments and 24-hour emergency care under one roof on the
            Malabar coast — so the distance between a worry and an answer is a single visit.
          </p>

          <div className="rise mt-8 flex flex-wrap items-center gap-3" style={rise(0.34)}>
            <BookButton size="lg" className="group">
              Book an appointment
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
              />
            </BookButton>
            <a href="#doctors" className={buttonStyles("ghost", "lg")}>
              Find a doctor
            </a>
          </div>

          <div className="rise mt-9 flex flex-wrap items-center gap-4" style={rise(0.44)}>
            <span className="group flex -space-x-3" aria-hidden="true">
              {trustPortraits.map((doctor, index) => (
                <span
                  key={doctor.id}
                  style={{ transitionDelay: `${index * 40}ms` }}
                  className="relative size-11 overflow-hidden rounded-full ring-2 ring-ground transition-transform duration-500 ease-out group-hover:-translate-y-1"
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
                <span className="tabular ml-1 text-sm font-semibold text-ink">4.8</span>
              </span>
              <span className="text-sm text-muted">from 4,900+ patient reviews this year</span>
            </span>
          </div>
        </div>

        {/*
          Photograph with floating cards.

          The scene is a landscape two-shot, so the frame is square rather than a
          tall arch: a square crop of a 16:9 source keeps both people whole with
          their faces in the upper third. The arch motif is carried in one deep
          top-right corner, which also crops the wall notice out of the picture;
          the emergency card covers what remains of it, and the appointment card
          sits over the quiet lower-left corner of the doctor's coat.
        */}
        <div className="relative lg:col-span-5">
          {/* Offset plate — a soft tinted echo of the frame behind the photo. */}
          <div
            aria-hidden="true"
            className="petal absolute inset-0 translate-x-4 translate-y-4 bg-teal-tint sm:translate-x-5 sm:translate-y-5"
          />
          {/* The portrait settles in on load, then pans gently against the scroll. */}
          <ParallaxFrame
            amount={5}
            className="settle petal relative aspect-[4/5] bg-brand-tint shadow-lift sm:aspect-[3/2] lg:aspect-square"
          >
            <Image
              src="/images/scenes/hero-consultation.jpg"
              alt="A Santhi Hospital consultant sitting with an elderly patient during a consultation. Demonstration photograph."
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 92vw"
              className="ken-burns object-cover object-[45%_center]"
            />
          </ParallaxFrame>

          {/* Emergency card — over the top-right corner */}
          <div className="rise absolute -top-4 right-2 sm:-top-5 sm:-right-4" style={rise(0.6)}>
            <a
              href={hospital.phone.emergencyHref}
              className="float-soft group/call flex items-center gap-3 rounded-2xl border border-accent-line bg-white px-4 py-3 shadow-lift sm:p-3 sm:pr-5"
              style={{ animationDelay: "1.4s" }}
            >
              <span className="hidden size-10 shrink-0 place-items-center rounded-full bg-accent-wash text-accent-ink sm:grid">
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

          {/* Next-available card — over the bottom-left corner */}
          <div className="rise absolute -bottom-10 left-2 sm:-bottom-8 sm:-left-6" style={rise(0.5)}>
            <div className="float-soft w-[16rem] rounded-2xl border border-brand-line bg-white/95 p-3.5 shadow-lift backdrop-blur sm:w-[17.5rem] sm:p-4">
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
      <div className="relative border-y border-brand-ink/30 bg-brand py-3.5 text-white">
        <Marquee items={tickerItems} />
      </div>
    </section>
  );
}
