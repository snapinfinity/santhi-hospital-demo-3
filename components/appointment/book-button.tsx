"use client";

import type { ReactNode } from "react";
import { buttonStyles, type ButtonSize, type ButtonVariant } from "@/components/ui/button";
import { useAppointment, type BookingPrefill } from "./appointment-provider";

type BookButtonProps = BookingPrefill & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Names the button for screen readers when the visible text is short, e.g. "Book". */
  ariaLabel?: string;
};

/**
 * Every appointment entry point on the page routes through this button.
 *
 * The hover lift and press come from the shared `btn-motion` utility rather
 * than a motion component, so a link styled with `buttonStyles` and a booking
 * button move in exactly the same way.
 */
export function BookButton({
  children,
  departmentId,
  doctorId,
  variant = "primary",
  size = "md",
  className,
  ariaLabel,
}: BookButtonProps) {
  const { openBooking } = useAppointment();

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={() => openBooking({ departmentId, doctorId })}
      className={buttonStyles(variant, size, className)}
    >
      {children}
    </button>
  );
}
