import Image from "next/image";
import { Clock } from "lucide-react";
import { articles } from "@/data/articles";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ICON_STROKE } from "@/lib/icons";

/**
 * Health writing as an editorial index. Individual article routes are out of
 * scope for the homepage, so entries are headings rather than links that would
 * lead nowhere.
 */
export function Insights() {
  const [lead, ...rest] = articles;

  return (
    <section id="insights" aria-labelledby="insights-heading" className="section-y bg-white">
      <div className="mx-auto max-w-[88rem] px-5 lg:px-10">
        <SectionHeading
          id="insights-heading"
          title="Written by the clinicians who answer these questions all day."
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal as="article" className="lg:col-span-5">
            <figure className="relative aspect-[16/10] overflow-hidden rounded-2xl">
              <Image
                src="/images/scenes/records-review.jpg"
                alt="A doctor talking a patient through their medical records during a consultation."
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </figure>
            <p className="mt-4 text-sm text-teal-ink">{lead.category}</p>
            <h3 className="mt-1 font-display text-title text-ink">{lead.title}</h3>
            <p className="mt-2 max-w-[46ch] text-muted">{lead.excerpt}</p>
            <p className="tabular mt-3 flex items-center gap-2 text-sm text-muted">
              <time dateTime={lead.dateTime}>{lead.date}</time>
              <span aria-hidden="true" className="size-1 rounded-full bg-brand-line" />
              <Clock className="size-3.5" strokeWidth={ICON_STROKE} aria-hidden="true" />
              {lead.readingMinutes} min read
            </p>
          </Reveal>

          <div className="lg:col-span-7">
            <h3 className="sr-only">More articles</h3>
            <ul className="border-t border-brand-line">
              {rest.map((article) => (
                <li
                  key={article.id}
                  className="grid gap-1.5 border-b border-brand-line py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-6"
                >
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm text-teal-ink">{article.category}</p>
                    <p className="tabular text-sm text-muted">
                      <time dateTime={article.dateTime}>{article.date}</time>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-display text-lg leading-snug text-ink">{article.title}</h4>
                    <p className="mt-1.5 max-w-[58ch] text-sm leading-relaxed text-muted">
                      {article.excerpt}
                    </p>
                    <p className="tabular mt-1.5 text-sm text-muted">
                      {article.readingMinutes} min read
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
