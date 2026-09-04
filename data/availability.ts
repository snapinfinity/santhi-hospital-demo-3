/**
 * Fictional demo appointment availability.
 *
 * Slots are generated deterministically from a supplied date so the same input
 * always produces the same schedule. This module must only be called from the
 * client (the booking dialog calls it when it opens) — deriving "today" during
 * a server render would risk a hydration mismatch.
 */

export type DaySlots = {
  /** ISO date, e.g. "2026-09-15" — used as a stable key and in the confirmation. */
  iso: string;
  /** "Today", "Tomorrow", or "Thu 17 Sep". */
  label: string;
  /** "Tuesday, 15 September" — used on the confirmation screen. */
  longLabel: string;
  slots: string[];
  note?: string;
};

const WEEKDAY_SLOTS: Record<number, string[]> = {
  0: [], // Sunday — emergency only, no outpatient clinics
  1: ["9:00 AM", "10:30 AM", "11:15 AM", "2:30 PM", "4:00 PM", "5:30 PM"],
  2: ["9:30 AM", "10:30 AM", "12:00 PM", "2:30 PM", "3:15 PM", "5:00 PM"],
  3: ["9:00 AM", "11:15 AM", "12:00 PM", "3:00 PM", "4:30 PM"],
  4: ["9:30 AM", "10:15 AM", "11:45 AM", "2:00 PM", "3:15 PM", "5:00 PM"],
  5: ["9:00 AM", "10:30 AM", "12:15 PM", "2:30 PM", "4:00 PM"],
  6: ["9:30 AM", "11:00 AM", "12:30 PM"], // Saturday — morning clinics only
};

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const SHORT_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const SHORT_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function toIso(date: Date) {
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

/** Minutes past midnight for a slot label like "2:30 PM" — used to hide slots that have passed. */
function slotMinutes(slot: string) {
  const match = /^(\d{1,2}):(\d{2})\s(AM|PM)$/.exec(slot);
  if (!match) return 0;
  let hour = Number(match[1]) % 12;
  if (match[3] === "PM") hour += 12;
  return hour * 60 + Number(match[2]);
}

/**
 * Builds the next `days` days of availability, dropping slots that have already
 * passed today plus a 90-minute booking cutoff.
 */
export function buildAvailability(from: Date = new Date(), days = 7): DaySlots[] {
  const cutoff = from.getHours() * 60 + from.getMinutes() + 90;
  const result: DaySlots[] = [];

  for (let offset = 0; offset < days; offset += 1) {
    const date = new Date(from.getFullYear(), from.getMonth(), from.getDate() + offset);
    const weekday = date.getDay();
    let slots = WEEKDAY_SLOTS[weekday] ?? [];

    if (offset === 0) {
      slots = slots.filter((slot) => slotMinutes(slot) > cutoff);
    }

    const label =
      offset === 0
        ? "Today"
        : offset === 1
          ? "Tomorrow"
          : `${SHORT_DAYS[weekday]} ${date.getDate()} ${SHORT_MONTHS[date.getMonth()]}`;

    result.push({
      iso: toIso(date),
      label,
      longLabel: `${DAY_NAMES[weekday]}, ${date.getDate()} ${MONTHS[date.getMonth()]}`,
      slots,
      note:
        weekday === 0
          ? "Outpatient clinics are closed on Sundays. Emergency care is open."
          : offset === 0 && slots.length === 0
            ? "No remaining slots today."
            : undefined,
    });
  }

  return result;
}
