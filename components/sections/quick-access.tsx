import Link from "next/link";
import { ArrowUpRight, Building2, CalendarCheck, Search, ShieldPlus } from "lucide-react";
import { BookButton } from "@/components/appointment/book-button";
import { hospital } from "@/data/site";
import { ICON_STROKE } from "@/lib/icons";

const links = [
  { href: "#doctors", icon: Search, label: "Find a doctor", detail: "120 consultants, filterable by department" },
  { href: "#departments", icon: Building2, label: "Departments", detail: "32 specialties and what each one treats" },
  { href: "#services", icon: CalendarCheck, label: "Health checks", detail: "Screening packages reviewed the same day" },
];

/**
 * The four things people arrive wanting to do, as one divided band rather than
 * four matching cards. Booking carries the most weight; emergency is marked
 * rather than shouted.
 */
export function QuickAccess() {
  return (
    <section aria-label="Quick actions" className="border-y border-brand-line bg-white">
      <div className="mx-auto grid max-w-[88rem] divide-y divide-brand-line/70 lg:grid-cols-5 lg:divide-x lg:divide-y-0">
        <div className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center lg:col-span-2 lg:p-8">
          <div>
            <p className="font-display text-title text-ink">Book in under a minute</p>
            <p className="mt-1 max-w-[36ch] text-sm text-muted">
              No account and nothing to download. Choose a time and we call to confirm.
            </p>
          </div>
          <BookButton className="shrink-0">Book now</BookButton>
        </div>

        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex flex-col justify-between gap-4 p-6 transition-colors duration-200 hover:bg-brand-wash lg:p-8"
          >
            <span className="flex items-start justify-between gap-3">
              <link.icon className="size-5 text-teal-ink" strokeWidth={ICON_STROKE} aria-hidden="true" />
              <ArrowUpRight
                className="size-4 text-brand-line transition-all duration-200 group-hover:-translate-y-0.5 group-hover:text-brand motion-reduce:transition-none"
                strokeWidth={ICON_STROKE}
                aria-hidden="true"
              />
            </span>
            <span>
              <span className="block font-medium text-ink group-hover:text-brand">{link.label}</span>
              <span className="mt-0.5 block text-sm text-muted">{link.detail}</span>
            </span>
          </Link>
        ))}

        <a
          href={hospital.phone.emergencyHref}
          className="group flex flex-col justify-between gap-4 p-6 transition-colors duration-200 hover:bg-accent/5 lg:p-8"
        >
          <span className="flex items-start justify-between gap-3">
            <ShieldPlus className="size-5 text-accent" strokeWidth={ICON_STROKE} aria-hidden="true" />
            <span className="relative flex size-2 translate-y-1.5">
              <span className="absolute inline-flex size-2 rounded-full bg-accent opacity-70 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
          </span>
          <span>
            <span className="block font-medium text-ink group-hover:text-accent-ink">Emergency care</span>
            <span className="tabular mt-0.5 block text-sm text-muted">
              Open 24 hours — {hospital.phone.emergency}
            </span>
          </span>
        </a>
      </div>
    </section>
  );
}
