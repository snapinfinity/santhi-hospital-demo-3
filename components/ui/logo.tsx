import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Uses the hospital's logo file. The asset sits on a white ground, so it is
 * multiplied into the page and the white disappears — which works because every
 * surface on the site is now light. A compact "Kozhikode" marker keeps the
 * location in the lockup.
 */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Image
        src="/santhi-hospital-logo.png"
        alt="Santhi Hospital"
        width={374}
        height={242}
        priority
        className={cn(
          "w-auto mix-blend-multiply transition-[height] duration-500 ease-out",
          compact ? "h-10 sm:h-11" : "h-12 sm:h-14",
        )}
      />
      <span
        className={cn(
          "label-sm hidden border-l border-brand-line pl-3 tracking-[0.14em] text-teal-ink uppercase sm:block",
          compact && "lg:hidden",
        )}
      >
        Kozhikode
      </span>
    </span>
  );
}
