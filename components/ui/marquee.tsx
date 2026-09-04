import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Endless horizontal ticker. The track holds two copies of its content so the
 * -50% keyframe loops seamlessly; the second copy is hidden from assistive
 * technology. Pauses on hover so the items can actually be read.
 */
export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex w-max shrink-0 items-center"
    >
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-6 text-sm font-medium tracking-[0.02em] whitespace-nowrap">
            {item}
          </span>
          <Plus aria-hidden="true" className="size-3.5 opacity-60" />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn(
        "group overflow-hidden",
        className,
      )}
    >
      <div className="marquee-track group-hover:[animation-play-state:paused] flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
