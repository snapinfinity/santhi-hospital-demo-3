import Image from "next/image";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { articles } from "@/data/articles";
import { Reveal } from "@/components/ui/reveal";
import { ZoomFrame } from "@/components/ui/parallax";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Health insights: one featured story with photography, the rest as editorial
 * rows. Articles are demonstration content, not medical advice.
 */
export function Insights() {
  const [featured, ...rest] = articles;

  return (
    <section id="insights" className="section-y bg-ground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionHeading
              kicker="Health insights"
              title={
                <>
                  Notes from our{" "}
                  <em className="font-semibold text-brand not-italic">clinicians</em>.
                </>
              }
              lede="Plain-language writing from the people who see these questions every week."
            />
          </Reveal>
          <Reveal index={1} direction="left">
            <a href="#insights" className={buttonStyles("ghost", "md", "group")}>
              All articles
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
          {/* Featured */}
          <Reveal direction="right">
            <article className="lift-card group flex h-full flex-col overflow-hidden rounded-3xl border border-brand-line bg-white shadow-card hover:shadow-lift">
              <ZoomFrame className="aspect-[16/9] bg-brand-tint">
                <Image
                  src="/images/scenes/desk-consult.jpg"
                  alt="A consultant talking a patient through their results at a desk. Demonstration photograph."
                  fill
                  sizes="(min-width: 1024px) 56vw, 92vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </ZoomFrame>
              <div className="relative flex flex-1 flex-col p-7">
                <span className="absolute -top-5 left-7 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-brand shadow-card">
                  {featured.category}
                </span>
                <h3 className="mt-2 font-display text-[1.55rem] leading-snug font-medium text-ink">
                  <a href="#insights" className="transition-colors duration-300 group-hover:text-brand">
                    {featured.title}
                  </a>
                </h3>
                <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">
                  {featured.excerpt}
                </p>
                <p className="mt-5 flex items-center gap-2 text-[0.85rem] text-muted">
                  <Clock3 aria-hidden="true" className="size-4" />
                  <time dateTime={featured.dateTime}>{featured.date}</time>
                  <span aria-hidden="true">·</span>
                  {featured.readingMinutes} min read
                </p>
              </div>
            </article>
          </Reveal>

          {/* Rows */}
          <ul className="flex flex-col">
            {rest.map((article, index) => (
              <Reveal key={article.id} index={index % 4} as="li" direction="left">
                <a
                  href="#insights"
                  className={cn(
                    "slide-row group flex items-start gap-5 py-5",
                    index > 0 ? "border-t border-brand-line" : "lg:border-t lg:pt-5",
                  )}
                >
                  <span className="flex-1">
                    <span className="label-sm text-teal-ink">{article.category}</span>
                    <span className="mt-1 block font-display text-[1.15rem] leading-snug font-medium text-ink transition-colors duration-300 group-hover:text-brand">
                      {article.title}
                    </span>
                    <span className="mt-1.5 flex items-center gap-2 text-[0.8rem] text-muted">
                      <time dateTime={article.dateTime}>{article.date}</time>
                      <span aria-hidden="true">·</span>
                      {article.readingMinutes} min
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="mt-1 size-5 shrink-0 text-muted transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand"
                  />
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
