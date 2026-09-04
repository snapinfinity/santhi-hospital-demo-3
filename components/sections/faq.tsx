"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { faqs } from "@/data/faqs";
import { SectionHeading } from "@/components/ui/section-heading";
import { ICON_STROKE } from "@/lib/icons";

/**
 * Radix drives the semantics — button roles, aria-expanded, aria-controls and
 * arrow-key navigation — and the appearance is entirely ours.
 *
 * The open/close transition runs in CSS rather than through motion: collapsing
 * the panel means animating height, which the motion system keeps out of
 * `animate`, and a scale fallback would leave closed panels occupying space.
 */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="section-y bg-ground">
      <div className="mx-auto grid max-w-[88rem] gap-8 px-5 lg:grid-cols-12 lg:gap-12 lg:px-10">
        <SectionHeading
          id="faq-heading"
          title="The things people ask before their first visit."
          className="lg:col-span-4"
        />

        <Accordion.Root type="single" collapsible className="lg:col-span-8">
          {faqs.map((faq) => (
            <Accordion.Item key={faq.id} value={faq.id} className="border-b border-brand-line">
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-6 py-4 text-left">
                  <span className="font-display text-lg text-ink transition-colors duration-200 group-hover:text-brand sm:text-xl">
                    {faq.question}
                  </span>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-brand-line text-brand transition-colors duration-200 group-hover:border-brand group-hover:bg-brand-tint">
                    <Plus
                      className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-45 motion-reduce:transition-none"
                      strokeWidth={ICON_STROKE}
                      aria-hidden="true"
                    />
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content
                data-slot="accordion-content"
                className="overflow-hidden data-[state=closed]:animate-[accordion-up_240ms_cubic-bezier(0.22,1,0.36,1)] data-[state=open]:animate-[accordion-down_240ms_cubic-bezier(0.22,1,0.36,1)]"
              >
                <p className="max-w-[64ch] pb-5 text-muted">{faq.answer}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
