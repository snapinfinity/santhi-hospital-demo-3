/** Minimal class-name joiner — avoids pulling in clsx/tailwind-merge for this scale. */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Turns "Dr. Ananya Menon" into "AM" for the monogram portraits. */
export function initialsFromName(name: string) {
  return name
    .replace(/^Dr\.?\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();
}
