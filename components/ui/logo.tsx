import Image from "next/image";
import { cn } from "@/lib/utils";

/** Intrinsic size of the supplied brand asset — preserved so it is never distorted. */
const LOGO_SRC = "/santhi-hospital-logo.png";
const LOGO_WIDTH = 374;
const LOGO_HEIGHT = 242;

type LogoProps = {
  /**
   * `bare` blends the asset's light background into a light surface.
   * `plate` sets it on a white card, which is how the mark is used on dark
   * sections — the supplied asset has an opaque near-white background, so it is
   * given a surface to sit on rather than being recoloured or knocked out.
   */
  variant?: "bare" | "plate";
  width?: number;
  className?: string;
  priority?: boolean;
};

export function Logo({ variant = "bare", width = 132, className, priority = false }: LogoProps) {
  const height = Math.round((LOGO_HEIGHT / LOGO_WIDTH) * width);

  const image = (
    <Image
      src={LOGO_SRC}
      alt="Santhi Hospital"
      width={width}
      height={height}
      priority={priority}
      sizes={`${width}px`}
      className={cn(variant === "bare" && "mix-blend-multiply")}
    />
  );

  if (variant === "plate") {
    return (
      <span className={cn("inline-flex items-center rounded-lg bg-white px-4 py-3", className)}>
        {image}
      </span>
    );
  }

  return <span className={cn("inline-flex items-center", className)}>{image}</span>;
}
