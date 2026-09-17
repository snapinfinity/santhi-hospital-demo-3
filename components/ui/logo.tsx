import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The hospital's own logo, as served on santhihospital.com — a transparent
 * PNG, so it sits on any ground without blending tricks. A compact "Kozhikode"
 * marker keeps the location in the lockup.
 */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Image
        src="/santhi-hospital-logo.png"
        alt="Santhi Hospital"
        width={500}
        height={337}
        priority
        className={cn(
          // A constant size below `lg`; the compact step only plays on desktop.
          "h-10 w-auto transition-[height] duration-500 ease-out sm:h-11",
          !compact && "lg:h-14",
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
