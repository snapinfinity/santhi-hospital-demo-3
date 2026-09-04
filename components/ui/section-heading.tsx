import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Section title block.
 *
 * There is deliberately no eyebrow label: a tracked-out caption above every
 * heading is template chrome, and the headings here already say what the section
 * is. `kicker` exists for the rare case where a short line carries real
 * information the heading cannot.
 */
export function SectionHeading({
  title,
  lede,
  kicker,
  tone = "light",
  id,
  className,
}: {
  title: ReactNode;
  lede?: ReactNode;
  kicker?: ReactNode;
  tone?: "light" | "dark";
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {kicker ? (
        <p className={cn("label-sm", tone === "dark" ? "text-teal" : "text-teal-ink")}>{kicker}</p>
      ) : null}
      <h2
        id={id}
        className={cn(
          "max-w-[19ch] font-display text-headline",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={cn(
            "max-w-[56ch] text-lede",
            tone === "dark" ? "text-ink-muted" : "text-muted",
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}
