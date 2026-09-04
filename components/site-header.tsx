"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CalendarCheck, Menu, Phone, Search, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { buttonStyles } from "@/components/ui/button";
import { BookButton } from "@/components/appointment/book-button";
import { navigation, hospital } from "@/data/site";
import { motionTokens, springs } from "@/lib/motion-tokens";
import { ICON_STROKE } from "@/lib/icons";
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

  return (
    <>
      {/* Utility strip — emergency access is reachable before anything else. */}
      <div className="on-dark bg-ink text-white">
        <div className="mx-auto flex max-w-[88rem] items-center justify-between gap-4 px-5 py-2 text-sm lg:px-10">
          <a
            href={hospital.phone.emergencyHref}
            className="group inline-flex min-h-6 items-center gap-2 py-0.5 font-medium transition-colors hover:text-teal"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-2 rounded-full bg-accent opacity-70 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            24/7 Emergency
            <span className="tabular hidden text-ink-muted group-hover:text-teal sm:inline">
              {hospital.phone.emergency}
            </span>
          </a>
          <p className="hidden text-ink-muted md:block">
            Kottayam. Outpatient clinics Mon–Sat, 8 AM – 8 PM
          </p>
          <a href="#contact" className="inline-flex min-h-6 items-center py-0.5 text-ink-muted transition-colors hover:text-white md:hidden">
            Contact
          </a>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-30 transition-all duration-200",
          scrolled
            ? "border-b border-brand-line/70 bg-ground/85 shadow-[0_1px_20px_-12px_rgb(0_39_38/0.4)] backdrop-blur-md"
            : "bg-ground",
        )}
      >
        <div className="mx-auto flex max-w-[88rem] items-center justify-between gap-6 px-5 py-3 lg:px-10">
          <Link href="#top" aria-label="Santhi Hospital — back to top" className="shrink-0">
            <Logo width={118} priority />
          </Link>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-full px-3 py-2 text-[0.9375rem] whitespace-nowrap text-ink/80 transition-colors duration-150 hover:bg-brand-tint hover:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {/* Responsive visibility sits on this wrapper: `buttonStyles` sets
                `inline-flex`, which would win over a `hidden` utility passed
                through className. */}
            <div className="hidden items-center gap-2 sm:flex">
              <Link href="#doctors" className={buttonStyles("secondary", "md")}>
                <Search className="size-4" strokeWidth={ICON_STROKE} aria-hidden="true" />
                Find a doctor
              </Link>
              <BookButton>
                <CalendarCheck className="size-4" strokeWidth={ICON_STROKE} aria-hidden="true" />
                Book an appointment
              </BookButton>
            </div>

            <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
              <Dialog.Trigger
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-brand-line text-ink transition-colors hover:border-brand hover:text-brand xl:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" strokeWidth={ICON_STROKE} aria-hidden="true" />
              </Dialog.Trigger>

              <AnimatePresence>
                {menuOpen ? (
                  <Dialog.Portal forceMount>
                    <Dialog.Overlay asChild forceMount>
                      <motion.div
                        key="menu-overlay"
                        className="fixed inset-0 z-40 bg-ink/55"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: motionTokens.duration.fast }}
                      />
                    </Dialog.Overlay>
                    <Dialog.Content asChild forceMount aria-modal="true">
                      <motion.div
                        key="menu-panel"
                        className="fixed inset-y-0 right-0 z-50 flex w-[min(21rem,88vw)] flex-col bg-ground shadow-2xl"
                        initial={{ x: reduce ? 0 : "100%", opacity: reduce ? 0 : 1 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: reduce ? 0 : "100%", opacity: reduce ? 0 : 1 }}
                        transition={springs.gentle}
                      >
                        <div className="flex items-center justify-between border-b border-brand-line px-5 py-3.5">
                          <Dialog.Title className="label-sm text-muted">Menu</Dialog.Title>
                          <Dialog.Close
                            aria-label="Close menu"
                            className="inline-flex size-10 items-center justify-center rounded-full text-ink hover:bg-brand-tint"
                          >
                            <X className="size-5" strokeWidth={ICON_STROKE} aria-hidden="true" />
                          </Dialog.Close>
                        </div>

                        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-3">
                          <ul className="flex flex-col">
                            {navigation.map((item) => (
                              <li key={item.href} className="border-b border-brand-line/60 last:border-0">
                                <Dialog.Close asChild>
                                  <Link
                                    href={item.href}
                                    className="block py-3 font-display text-xl text-ink transition-colors hover:text-brand"
                                  >
                                    {item.label}
                                  </Link>
                                </Dialog.Close>
                              </li>
                            ))}
                          </ul>
                        </nav>

                        <div className="flex flex-col gap-2 border-t border-brand-line px-5 py-4">
                          <BookButton size="lg" className="w-full">
                            <CalendarCheck className="size-[1.15rem]" strokeWidth={ICON_STROKE} aria-hidden="true" />
                            Book an appointment
                          </BookButton>
                          <a
                            href={hospital.phone.emergencyHref}
                            className={buttonStyles("secondary", "lg", "w-full")}
                          >
                            <Phone className="size-4" strokeWidth={ICON_STROKE} aria-hidden="true" />
                            Emergency {hospital.phone.emergency}
                          </a>
                        </div>
                      </motion.div>
                    </Dialog.Content>
                  </Dialog.Portal>
                ) : null}
              </AnimatePresence>
            </Dialog.Root>
          </div>
        </div>
      </header>
    </>
  );
}
