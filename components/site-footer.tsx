import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { BookButton } from "@/components/appointment/book-button";
import { hospital } from "@/data/site";

const columns = [
  {
    heading: "Hospital",
    links: [
      { label: "About", href: "#about" },
      { label: "Doctors", href: "#doctors" },
      { label: "Departments", href: "#departments" },
      { label: "Facilities", href: "#facilities" },
    ],
  },
  {
    heading: "Patient care",
    links: [
      { label: "Services", href: "#services" },
      { label: "Emergency", href: "#emergency" },
      { label: "Health insights", href: "#insights" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Frequently asked questions", href: "#faq" },
      { label: "Opening hours", href: "#contact" },
      { label: "Visiting hours", href: "#faq" },
      { label: "Back to top", href: "#top" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="on-dark bg-ink pt-14 pb-7 text-white lg:pt-16">
      <div className="mx-auto max-w-[88rem] px-5 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            {/* The supplied mark has an opaque light background, so on a dark
                ground it is given a plate rather than being altered. */}
            <Logo variant="plate" width={140} />
            <p className="mt-5 max-w-[34ch] text-ink-muted">
              A multi-speciality hospital serving Kottayam and the surrounding districts since 1991.
            </p>
            <div className="mt-5">
              <BookButton variant="onDark">Book an Appointment</BookButton>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-5 lg:col-start-6">
            {columns.map((column) => (
              <nav key={column.heading} aria-label={column.heading}>
                <h2 className="label-sm text-white/55">{column.heading}</h2>
                <ul className="mt-3 flex flex-col">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="inline-block py-1.5 text-[0.9375rem] text-ink-muted transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="lg:col-span-3">
            <h2 className="label-sm text-white/55">Reach us</h2>
            <ul className="mt-3 flex flex-col gap-2 text-[0.9375rem]">
              <li>
                <span className="block text-ink-muted">General</span>
                <a href={hospital.phone.generalHref} className="tabular inline-block py-0.5 hover:text-teal">
                  {hospital.phone.general}
                </a>
              </li>
              <li>
                <span className="block text-ink-muted">Emergency, 24 hours</span>
                <a href={hospital.phone.emergencyHref} className="tabular inline-block py-0.5 hover:text-teal">
                  {hospital.phone.emergency}
                </a>
              </li>
              <li>
                <span className="block text-ink-muted">Email</span>
                <a href={`mailto:${hospital.email}`} className="inline-block py-0.5 break-all hover:text-teal">
                  {hospital.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/15 pt-6 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Santhi Hospital. All rights reserved.</p>
          <p className="max-w-[64ch]">
            Design prototype. Every doctor, statistic, testimonial, address and telephone number on
            this site is fictional demonstration content.
          </p>
        </div>
      </div>
    </footer>
  );
}
