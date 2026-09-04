import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { BookButton } from "@/components/appointment/book-button";
import { hospital, navigation } from "@/data/site";
import { departments } from "@/data/departments";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark relative overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="ribbon-sweep h-1 w-full" />

      <div className="mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-5">
            <Logo tone="dark" />
            <p className="max-w-[38ch] text-[0.95rem] leading-relaxed text-ink-muted">
              {hospital.tagline} A multi-speciality hospital for Kozhikode and the Malabar
              coast, caring since 1992.
            </p>
            <BookButton variant="onDark" className="w-fit">
              Book an appointment
            </BookButton>
          </div>

          <nav aria-label="Footer — departments">
            <h2 className="label-sm mb-4 text-teal">Departments</h2>
            <ul className="flex flex-col gap-2.5">
              {departments.slice(0, 6).map((department) => (
                <li key={department.id}>
                  <a
                    href="#departments"
                    className="text-[0.95rem] text-ink-muted transition-colors hover:text-white"
                  >
                    {department.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer — hospital">
            <h2 className="label-sm mb-4 text-teal">Hospital</h2>
            <ul className="flex flex-col gap-2.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[0.95rem] text-ink-muted transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#emergency" className="text-[0.95rem] text-ink-muted transition-colors hover:text-white">
                  Emergency care
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="label-sm mb-4 text-teal">Visit us</h2>
            <address className="flex flex-col gap-4 text-[0.95rem] not-italic text-ink-muted">
              <p className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-teal" />
                <span>
                  {hospital.address.street}, {hospital.address.locality}
                  <br />
                  {hospital.address.region} {hospital.address.postalCode}
                </span>
              </p>
              <p className="flex items-center gap-3">
                <Phone aria-hidden="true" className="size-4 shrink-0 text-teal" />
                <a href={hospital.phone.generalHref} className="tabular transition-colors hover:text-white">
                  {hospital.phone.general}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Mail aria-hidden="true" className="size-4 shrink-0 text-teal" />
                <a href={`mailto:${hospital.email}`} className="break-all transition-colors hover:text-white">
                  {hospital.email}
                </a>
              </p>
            </address>
            <p className="mt-5 border-t border-white/10 pt-4 text-[0.85rem] text-ink-muted">
              Emergency &amp; ambulance, 24 hours:{" "}
              <a href={hospital.phone.emergencyHref} className="tabular font-medium text-white">
                {hospital.phone.emergency}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-[0.8rem] text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Santhi Hospital, Kozhikode. Demonstration website.</p>
          <p className="max-w-[62ch]">
            Every consultant, statistic, testimonial and price on this page is fictional, invented
            for a design demo.
          </p>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="pointer-events-none relative -mt-4 mb-[-0.16em] w-full overflow-hidden text-center font-display text-mega font-semibold text-white/[0.045] select-none"
      >
        Santhi
      </p>
    </footer>
  );
}
