"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { AppointmentDialog } from "./appointment-dialog";

export type BookingPrefill = {
  departmentId?: string;
  doctorId?: string;
};

type AppointmentContextValue = {
  openBooking: (prefill?: BookingPrefill) => void;
};

const AppointmentContext = createContext<AppointmentContextValue | null>(null);

/**
 * Single source of truth for the booking flow. Every entry point on the page —
 * header, hero, doctor cards, department panel, footer — calls `openBooking`,
 * so there is one flow and one state model rather than several.
 */
export function AppointmentProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState<BookingPrefill>({});
  /** Bumped on each open so the flow remounts with fresh state. */
  const [session, setSession] = useState(0);

  const openBooking = useCallback((next: BookingPrefill = {}) => {
    setPrefill(next);
    setSession((n) => n + 1);
    setOpen(true);
  }, []);

  const value = useMemo(() => ({ openBooking }), [openBooking]);

  return (
    <AppointmentContext.Provider value={value}>
      {children}
      <AppointmentDialog open={open} onOpenChange={setOpen} prefill={prefill} session={session} />
    </AppointmentContext.Provider>
  );
}

export function useAppointment() {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error("useAppointment must be used inside an AppointmentProvider");
  }
  return context;
}
