"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MapPin, Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { buttonStyles } from "@/components/ui/button";
import { BookButton } from "@/components/appointment/book-button";
import { navigation, hospital } from "@/data/site";
import { motionTokens, STAGGER } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

/** A hairline that grows out from the left of a nav link on hover. */
const navLink =
  "relative rounded-full px-3.5 py-2.5 text-[0.9375rem] font-medium text-ink-soft transition-colors duration-200 hover:text-brand " +
  "after:absolute after:bottom-1.5 after:left-3.5 after:h-px after:w-[calc(100%-1.75rem)] after:origin-left after:scale-x-0 " +
  "after:bg-brand after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 " +
  "motion-reduce:after:transition-none";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll and release on Escape while the menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      {/* Utility strip — emergency access is reachable before anything else. */}
      <div className="border-b border-brand-line bg-brand-wash text-ink-soft">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between gap-4 px-4 text-[0.8rem] sm:px-6">
          <p className="flex min-w-0 items-center gap-2 text-muted">
            <MapPin aria-hidden="true" className="size-3.5 shrink-0 text-teal-ink" />
            <span className="truncate">
              Eranhipalam, Kozhikode
              <span className="hidden sm:inline"> · OP: Mon–Sat, 8 AM – 8 PM</span>
            </span>
          </p>
          <a
            href={hospital.phone.emergencyHref}
            className="flex min-h-11 shrink-0 items-center gap-2.5 py-2 font-medium whitespace-nowrap text-ink transition-colors duration-200 hover:text-accent-ink"
          >
            <span aria-hidden="true" className="pulse-dot size-2 rounded-full bg-accent" />
            <span className="hidden sm:inline">24/7 Emergency</span>
            <span className="tabular text-accent-ink">{hospital.phone.emergency}</span>
          </a>
        </div>
      </div>

      {/*
        Main navigation — transparent over the hero, frosted after scroll.

        On small screens the bar is a fixed height and goes fully opaque when
        stuck: the desktop shrink and the translucent frost both read as the
        top of the bar being cut off on a phone, where the browser chrome is
        already moving. The compact treatment is reserved for `lg` and up.
      */}
      <header
        className={cn(
          "sticky top-0 z-40 transition-[background-color,border-color,box-shadow] duration-500 ease-out",
          scrolled
            ? "border-b border-brand-line/70 bg-ground shadow-card lg:bg-ground/85 lg:backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div
          className={cn(
            "mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 transition-[height] duration-500 ease-out sm:px-6",
            scrolled ? "lg:h-16" : "lg:h-18",
          )}
        >
          <a href="#top" aria-label="Santhi Hospital, Kozhikode — back to top">
            <Logo compact={scrolled} />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className={navLink}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={hospital.phone.generalHref}
              className="btn-motion hidden min-h-11 items-center gap-2 rounded-full px-3 text-[0.9375rem] font-medium text-brand hover:bg-brand-tint xl:inline-flex"
            >
              <Phone aria-hidden="true" className="size-4" />
              <span className="tabular">{hospital.phone.general}</span>
            </a>
            <BookButton className="hidden sm:inline-flex">Book Appointment</BookButton>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="btn-motion grid size-11 place-items-center rounded-full text-ink hover:bg-brand-tint lg:hidden"
            >
              <Menu aria-hidden="true" className="size-6" />
              <span className="sr-only">Open menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — a full-screen index with links that walk in from the left. */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-50 flex flex-col bg-paper lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? motionTokens.duration.instant : motionTokens.duration.fast }}
          >
            <div className="flex h-18 items-center justify-between border-b border-brand-line px-4 sm:px-6">
              <Logo />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="btn-motion grid size-11 place-items-center rounded-full text-ink hover:bg-brand-tint"
              >
                <X aria-hidden="true" className="size-6" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>

            <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-1 px-6">
              {navigation.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-baseline gap-4 rounded-xl px-2 py-3 font-display text-[1.9rem] font-light text-ink transition-colors duration-200 hover:text-brand"
                  initial={reduce ? false : { opacity: 0, x: -motionTokens.distance.lg }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: reduce ? motionTokens.duration.instant : motionTokens.duration.slow,
                    delay: reduce ? 0 : 0.05 + index * STAGGER,
                    ease: motionTokens.easing.smooth,
                  }}
                >
                  <span aria-hidden="true" className="tabular text-sm text-teal-ink">
                    {`0${index + 1}`}
                  </span>
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              className="flex flex-col gap-3 border-t border-brand-line p-6"
              initial={reduce ? false : { opacity: 0, y: motionTokens.distance.md }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduce ? motionTokens.duration.instant : motionTokens.duration.slow,
                delay: reduce ? 0 : 0.05 + navigation.length * STAGGER,
                ease: motionTokens.easing.smooth,
              }}
            >
              <BookButton size="lg" className="w-full">
                Book Appointment
              </BookButton>
              <a
                href={hospital.phone.emergencyHref}
                className={cn(
                  buttonStyles("secondary", "md", "w-full justify-center border-accent-line text-accent-ink hover:border-accent hover:bg-accent-wash"),
                )}
              >
                <span aria-hidden="true" className="pulse-dot size-2 rounded-full bg-accent" />
                Emergency {hospital.phone.emergency}
              </a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
