"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { faqs } from "@/data/faqs";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * The FAQ accordion animates in CSS (height off the value Radix measures),
 * because collapsing a panel means animating height — which the motion system
 * keeps out of `animate`.
 */
export function Faq() {
  return (
    <section id="faq" className="section-y bg-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                kicker="Questions"
                title={
                  <>
                    Asked every week, <em className="text-brand italic">answered</em> once.
                  </>
                }
                lede="If yours is not here, the front desk will know — or the general line, any day of the week."
              />
            </div>
          </Reveal>

          <Reveal index={1}>
            <Accordion.Root type="single" collapsible className="border-t border-brand-line">
              {faqs.map((faq) => (
                <Accordion.Item key={faq.id} value={faq.id} className="border-b border-brand-line">
                  <Accordion.Header>
                    <Accordion.Trigger className="group flex min-h-14 w-full items-center justify-between gap-4 py-5 text-left">
                      <span className="font-display text-lg text-ink transition-colors group-hover:text-brand group-data-[state=open]:text-brand sm:text-xl">
                        {faq.question}
                      </span>
                      <span className="grid size-9 shrink-0 place-items-center rounded-full border border-brand-line text-ink-soft transition-colors group-hover:border-brand group-hover:text-brand">
                        <Plus
                          aria-hidden="true"
                          className="size-4 transition-transform duration-300 group-data-[state=open]:rotate-45"
                        />
                      </span>
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content
                    data-slot="accordion-content"
                    className="overflow-hidden data-[state=closed]:animate-[accordion-up_0.25s_ease-in] data-[state=open]:animate-[accordion-down_0.3s_ease-out]"
                  >
                    <p className="max-w-[64ch] pb-6 text-[0.95rem] leading-relaxed text-muted">
                      {faq.answer}
                    </p>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
