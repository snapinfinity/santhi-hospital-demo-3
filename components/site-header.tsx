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
      <div className="bg-ink text-white">
        <div className="on-dark mx-auto flex h-10 max-w-7xl items-center justify-between gap-4 px-4 text-[0.8rem] sm:px-6">
          <p className="flex min-w-0 items-center gap-2 text-ink-muted">
            <MapPin aria-hidden="true" className="size-3.5 shrink-0 text-teal" />
            <span className="truncate">
              Eranhipalam, Kozhikode
              <span className="hidden sm:inline"> · OP: Mon–Sat, 8 AM – 8 PM</span>
            </span>
          </p>
          <a
            href={hospital.phone.emergencyHref}
            className="flex min-h-11 items-center gap-2.5 py-2 font-medium transition-colors hover:text-white"
          >
            <span aria-hidden="true" className="pulse-dot size-2 rounded-full bg-accent" />
            <span className="hidden sm:inline">24/7 Emergency</span>
            <span className="tabular sm:hidden">Emergency</span>
            <span className="tabular text-teal">{hospital.phone.emergency}</span>
          </a>
        </div>
      </div>

      {/* Main navigation — transparent over the hero, frosted after scroll. */}
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-300",
          scrolled
            ? "border-b border-brand-line/70 bg-ground/85 shadow-card backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <a href="#top" aria-label="Santhi Hospital, Kozhikode — back to top">
            <Logo compact={scrolled} />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3.5 py-2.5 text-[0.9375rem] font-medium text-ink-soft transition-colors hover:bg-brand-tint hover:text-brand"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={hospital.phone.generalHref}
              className="hidden min-h-11 items-center gap-2 rounded-full px-3 text-[0.9375rem] font-medium text-brand transition-colors hover:bg-brand-tint xl:inline-flex"
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
              className="grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-brand-tint lg:hidden"
            >
              <Menu aria-hidden="true" className="size-6" />
              <span className="sr-only">Open menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — a full-screen dark index with staggered links. */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            className="on-dark fixed inset-0 z-50 flex flex-col bg-ink lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? motionTokens.duration.instant : motionTokens.duration.fast }}
          >
            <div className="flex h-18 items-center justify-between px-4 sm:px-6">
              <Logo tone="dark" />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="grid size-11 place-items-center rounded-full text-white transition-colors hover:bg-white/10"
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
                  className="flex items-baseline gap-4 rounded-xl px-2 py-3 font-display text-[1.9rem] text-white transition-colors hover:text-teal"
                  initial={reduce ? false : { opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: reduce ? motionTokens.duration.instant : motionTokens.duration.slow,
                    delay: reduce ? 0 : 0.05 + index * STAGGER,
                    ease: motionTokens.easing.smooth,
                  }}
                >
                  <span aria-hidden="true" className="tabular text-sm text-teal">
                    {`0${index + 1}`}
                  </span>
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              className="flex flex-col gap-3 border-t border-white/10 p-6"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduce ? motionTokens.duration.instant : motionTokens.duration.slow,
                delay: reduce ? 0 : 0.05 + navigation.length * STAGGER,
                ease: motionTokens.easing.smooth,
              }}
            >
              <BookButton variant="onDark" size="lg" className="w-full">
                Book Appointment
              </BookButton>
              <a
                href={hospital.phone.emergencyHref}
                className={cn(
                  buttonStyles("ghost", "md", "w-full !text-white hover:!bg-white/10 justify-center"),
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
