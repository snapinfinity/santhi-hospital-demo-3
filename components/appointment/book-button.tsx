"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { buttonStyles, type ButtonSize, type ButtonVariant } from "@/components/ui/button";
import { motionTokens, springs } from "@/lib/motion-tokens";
import { useAppointment, type BookingPrefill } from "./appointment-provider";

type BookButtonProps = BookingPrefill & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Names the button for screen readers when the visible text is short, e.g. "Book". */
  ariaLabel?: string;
};

/** Every appointment entry point on the page routes through this button. */
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
  const reduce = useReducedMotion();

  return (
    <motion.button
      type="button"
      aria-label={ariaLabel}
      onClick={() => openBooking({ departmentId, doctorId })}
      className={buttonStyles(variant, size, className)}
      whileHover={reduce ? undefined : { scale: motionTokens.scale.pop }}
      whileTap={reduce ? undefined : { scale: motionTokens.scale.press }}
      transition={springs.snappy}
    >
      {children}
    </motion.button>
  );
}
