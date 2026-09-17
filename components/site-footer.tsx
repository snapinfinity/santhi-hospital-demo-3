import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { BookButton } from "@/components/appointment/book-button";
import { Reveal } from "@/components/ui/reveal";
import { hospital, navigation } from "@/data/site";
import { departments } from "@/data/departments";

/** A link that shifts a step to the right as the cursor reaches it. */
const footerLink =
  "inline-block text-[0.95rem] text-muted transition-all duration-300 ease-out hover:translate-x-1 hover:text-brand";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-brand-line bg-brand-wash text-ink">
      <div aria-hidden="true" className="ribbon-sweep h-1 w-full" />

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* The logo stays outside the reveal so the lockup is there on first paint. */}
          <div className="flex flex-col gap-5">
            <Logo />
            <Reveal className="flex flex-col gap-5 items-start" direction="up">
              <p className="max-w-[38ch] text-[0.95rem] leading-relaxed text-muted">
                {hospital.tagline} A multi-speciality hospital for Kozhikode and the Malabar
                coast, caring since 1992.
              </p>
              <BookButton>Book an appointment</BookButton>
            </Reveal>
          </div>

          <Reveal index={1} direction="up">
            <nav aria-label="Footer — departments">
              <h2 className="label-sm mb-4 text-teal-ink">Departments</h2>
              <ul className="flex flex-col gap-2.5">
                {departments.slice(0, 6).map((department) => (
                  <li key={department.id}>
                    <a href="#departments" className={footerLink}>
                      {department.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          <Reveal index={2} direction="up">
            <nav aria-label="Footer — hospital">
              <h2 className="label-sm mb-4 text-teal-ink">Hospital</h2>
              <ul className="flex flex-col gap-2.5">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className={footerLink}>
                      {item.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#emergency" className={footerLink}>
                    Emergency care
                  </a>
                </li>
              </ul>
            </nav>
          </Reveal>

          <Reveal index={3} direction="up">
            <h2 className="label-sm mb-4 text-teal-ink">Visit us</h2>
            <address className="flex flex-col gap-4 text-[0.95rem] text-muted not-italic">
              <p className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-teal-ink" />
                <span>
                  {hospital.address.street}, {hospital.address.locality}
                  <br />
                  {hospital.address.region} {hospital.address.postalCode}
                </span>
              </p>
              <p className="flex items-center gap-3">
                <Phone aria-hidden="true" className="size-4 shrink-0 text-teal-ink" />
                <a href={hospital.phone.generalHref} className="tabular transition-colors duration-200 hover:text-brand">
                  {hospital.phone.general}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Mail aria-hidden="true" className="size-4 shrink-0 text-teal-ink" />
                <a href={`mailto:${hospital.email}`} className="break-all transition-colors duration-200 hover:text-brand">
                  {hospital.email}
                </a>
              </p>
            </address>
            <p className="mt-5 border-t border-brand-line pt-4 text-[0.85rem] text-muted">
              Emergency &amp; ambulance, 24 hours:{" "}
              <a href={hospital.phone.emergencyHref} className="tabular font-medium text-accent-ink">
                {hospital.phone.emergency}
              </a>
            </p>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-brand-line pt-6 text-[0.8rem] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Santhi Hospital, Kozhikode. Demonstration website.</p>
          <p className="max-w-[62ch]">
            Every consultant, statistic, testimonial and price on this page is fictional, invented
            for a design demo.
          </p>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="pointer-events-none relative -mt-4 mb-[-0.16em] w-full overflow-hidden text-center font-display text-mega font-medium text-brand/[0.07] select-none"
      >
        Santhi
      </p>
    </footer>
  );
}
