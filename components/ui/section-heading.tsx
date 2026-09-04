import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { RibbonRule } from "@/components/ui/ribbon";

/**
 * Section title block with an editorial hairline rule above it.
 *
 * There is deliberately no tracked-out all-caps eyebrow above every heading —
 * that is template chrome. `kicker` exists for the rare line that carries real
 * information the heading cannot.
 */
export function SectionHeading({
  title,
  lede,
  kicker,
  tone = "light",
  id,
  align = "start",
  className,
}: {
  title: ReactNode;
  lede?: ReactNode;
  kicker?: ReactNode;
  tone?: "light" | "dark";
  id?: string;
  align?: "start" | "center";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-4", align === "center" && "items-center text-center", className)}>
      <RibbonRule className={cn("max-w-16", tone === "dark" && "opacity-80")} />
      {kicker ? (
        <p className={cn("label-sm", tone === "dark" ? "text-teal" : "text-teal-ink")}>{kicker}</p>
      ) : null}
      <h2
        id={id}
        className={cn(
          "max-w-[20ch] font-display text-headline",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={cn(
            "max-w-[58ch] text-lede",
            tone === "dark" ? "text-ink-muted" : "text-muted",
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}
