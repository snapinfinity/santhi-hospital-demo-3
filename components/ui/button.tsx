import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "onDark" | "emergency";
export type ButtonSize = "md" | "lg";

/**
 * Note: `base` sets `inline-flex`, so passing a `hidden` utility through
 * `className` will not hide the button — the two are the same kind of utility
 * and `inline-flex` wins. Put responsive visibility on a wrapper element.
 */
const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-150 " +
  "disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white hover:bg-brand-ink",
  secondary: "border border-brand-line bg-white text-brand hover:border-brand hover:bg-brand-tint",
  ghost: "text-brand hover:bg-brand-tint",
  onDark: "bg-white text-ink hover:bg-ground",
  emergency: "bg-accent text-white hover:bg-accent-ink",
};

const sizes: Record<ButtonSize, string> = {
  // 44px and 52px tall — comfortably above the 44px touch-target minimum.
  md: "min-h-11 px-5 text-[0.9375rem]",
  lg: "min-h-13 px-7 text-base",
};

export function buttonStyles(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  return <button className={buttonStyles(variant, size, className)} {...props} />;
}
