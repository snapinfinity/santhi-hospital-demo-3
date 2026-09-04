import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Uses the hospital's logo file. The asset sits on a white ground, so on light
 * surfaces it is multiplied into the page (the white disappears); on dark
 * surfaces it sits on a small white plate instead. A compact "Kozhikode"
 * marker keeps the location in the lockup.
 */
export function Logo({
  tone = "light",
  className,
  compact = false,
}: {
  tone?: "light" | "dark";
  className?: string;
  compact?: boolean;
}) {
  const image = (
    <Image
      src="/santhi-hospital-logo.png"
      alt="Santhi Hospital"
      width={374}
      height={242}
      priority
      className={cn(
        "w-auto transition-[height] duration-300",
        tone === "light" && "mix-blend-multiply",
        tone === "light" && (compact ? "h-10 sm:h-11" : "h-12 sm:h-14"),
        tone === "dark" && "h-9",
      )}
    />
  );

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      {tone === "dark" ? (
        <span className="inline-flex items-center rounded-xl bg-white px-2.5 py-2 shadow-card">
          {image}
        </span>
      ) : (
        image
      )}
      <span
        className={cn(
          "label-sm hidden border-l pl-3 tracking-[0.14em] uppercase sm:block",
          compact && "lg:hidden",
          tone === "dark"
            ? "border-white/25 text-teal"
            : "border-brand-line text-teal-ink",
        )}
      >
        Kozhikode
      </span>
    </span>
  );
}
