import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { RibbonRule } from "@/components/ui/ribbon";

/**
 * Section title block with an editorial hairline rule above it. The rule draws
 * itself in from the left as the block arrives, so the heading has a moving
 * element without the words themselves being animated.
 *
 * There is deliberately no tracked-out all-caps eyebrow above every heading —
 * that is template chrome. `kicker` exists for the rare line that carries real
 * information the heading cannot.
 */
export function SectionHeading({
  title,
  lede,
  kicker,
  id,
  align = "start",
  className,
}: {
  title: ReactNode;
  lede?: ReactNode;
  kicker?: ReactNode;
  id?: string;
  align?: "start" | "center";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-4", align === "center" && "items-center text-center", className)}>
      <RibbonRule className="max-w-16" />
      {kicker ? <p className="label-sm text-teal-ink">{kicker}</p> : null}
      <h2 id={id} className="max-w-[20ch] font-display text-headline text-ink">
        {title}
      </h2>
      {lede ? <p className="max-w-[58ch] text-lede text-muted">{lede}</p> : null}
    </div>
  );
}
