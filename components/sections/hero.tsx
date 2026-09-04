"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { BookButton } from "@/components/appointment/book-button";
import { Marquee } from "@/components/ui/marquee";
import { buttonStyles } from "@/components/ui/button";
import { hospital, tickerItems } from "@/data/site";
import { doctors } from "@/data/doctors";

const featured = doctors[0];
/** Shared portraits for the stacked trust row. */
const trustPortraits = doctors.slice(0, 3);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "9%"]);

  const rise = (delay: number) => ({ animationDelay: `${delay}s` });

  return (
    <section ref={sectionRef} id="top" className="relative overflow-hidden bg-ground">
      {/* Ambient washes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] size-[36rem] rounded-full bg-brand/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-24 left-[-8%] size-[26rem] rounded-full bg-teal/20 blur-3xl"
      />

      <div className="mx-auto grid max-w-7xl gap-14 px-4 pt-12 pb-16 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pt-20 lg:pb-24">
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
            Good medicine begins with <em className="text-brand italic">listening</em>.
          </h1>

          <p className="rise mt-6 max-w-[54ch] text-lede text-muted" style={rise(0.24)}>
            120 consultants, 32 departments and 24-hour emergency care under one roof on the
            Malabar coast — so the distance between a worry and an answer is a single visit.
          </p>

          <div className="rise mt-8 flex flex-wrap items-center gap-3" style={rise(0.34)}>
            <BookButton size="lg">
              Book an appointment
              <ArrowRight aria-hidden="true" className="size-4" />
            </BookButton>
            <a href="#doctors" className={buttonStyles("ghost", "lg")}>
              Find a doctor
            </a>
          </div>

          <div className="rise mt-9 flex flex-wrap items-center gap-4" style={rise(0.44)}>
            <span className="flex -space-x-3" aria-hidden="true">
              {trustPortraits.map((doctor) => (
                <span key={doctor.id} className="relative size-11 overflow-hidden rounded-full ring-2 ring-ground">
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

        {/* Arch portrait with floating cards */}
        <div className="relative lg:col-span-5">
          <div className="rise relative" style={rise(0.2)}>
            <div aria-hidden="true" className="arch absolute inset-0 translate-x-4 translate-y-4 border-2 border-teal/45" />
            <motion.div
              style={{ y: imageY }}
              className="arch relative aspect-[4/5] overflow-hidden bg-brand-tint shadow-lift"
            >
              <Image
                src="/images/scenes/hero-consultation.jpg"
                alt="A Santhi Hospital consultant sitting with an elderly patient during a consultation. Demonstration photograph."
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 92vw"
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Next-available card */}
          <div
            className="rise float-soft absolute -bottom-6 left-4 max-w-[17rem] rounded-2xl border border-brand-line bg-white/95 p-4 shadow-lift backdrop-blur sm:left-0"
            style={rise(0.55)}
          >
            <p className="label-sm text-muted">Next available</p>
            <p className="mt-1 text-[0.9375rem] font-semibold text-ink">{featured.name}</p>
            <p className="text-xs text-muted">{featured.role.split("—")[1]?.trim() ?? featured.role}</p>
            <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-teal-tint px-3 py-1 text-xs font-medium text-teal-ink">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-teal" />
              {featured.nextAvailable}
            </p>
          </div>

          {/* Emergency card */}
          <div
            className="rise float-soft absolute top-6 right-4 rounded-2xl bg-ink p-4 text-white shadow-lift sm:right-0"
            style={{ animationDelay: "0.7s" }}
          >
            <p className="label-sm flex items-center gap-2 text-ink-muted">
              <span aria-hidden="true" className="pulse-dot size-2 rounded-full bg-accent" />
              24/7 Emergency
            </p>
            <a
              href={hospital.phone.emergencyHref}
              className="tabular mt-1 block font-display text-lg text-white underline-offset-4 hover:underline"
            >
              {hospital.phone.emergency}
            </a>
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
