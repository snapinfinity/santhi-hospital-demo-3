import { Clock, Mail, MapPin, Phone, ShieldPlus } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { RibbonArc } from "@/components/ui/ribbon";
import { hospital } from "@/data/site";
import { ICON_STROKE } from "@/lib/icons";

export function Contact() {
  const { address, phone, email, hours } = hospital;

  return (
    <section id="contact" aria-labelledby="contact-heading" className="section-y bg-white">
      <div className="mx-auto max-w-[88rem] px-5 lg:px-10">
        <SectionHeading id="contact-heading" title="Riverside Avenue, Bengaluru." />

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <div className="flex gap-3.5">
              <MapPin className="mt-0.5 size-5 shrink-0 text-teal-ink" strokeWidth={ICON_STROKE} aria-hidden="true" />
              <div>
                <h3 className="label-sm text-muted">Address</h3>
                <address className="mt-1 leading-relaxed text-ink not-italic">
                  {hospital.name}
                  <br />
                  {address.street}
                  <br />
                  {address.locality}, {address.region} {address.postalCode}
                  <br />
                  {address.country}
                </address>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex gap-3.5">
                <Phone className="mt-0.5 size-5 shrink-0 text-teal-ink" strokeWidth={ICON_STROKE} aria-hidden="true" />
                <div>
                  <h3 className="label-sm text-muted">General enquiries</h3>
                  <a href={phone.generalHref} className="tabular mt-0.5 inline-block py-1 font-medium text-brand hover:underline">
                    {phone.general}
                  </a>
                </div>
              </div>
              <div className="flex gap-3.5">
                <ShieldPlus className="mt-0.5 size-5 shrink-0 text-accent" strokeWidth={ICON_STROKE} aria-hidden="true" />
                <div>
                  <h3 className="label-sm text-muted">Emergency</h3>
                  <a href={phone.emergencyHref} className="tabular mt-0.5 inline-block py-1 font-medium text-brand hover:underline">
                    {phone.emergency}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex gap-3.5">
              <Mail className="mt-0.5 size-5 shrink-0 text-teal-ink" strokeWidth={ICON_STROKE} aria-hidden="true" />
              <div>
                <h3 className="label-sm text-muted">Email</h3>
                <a href={`mailto:${email}`} className="mt-0.5 inline-block py-1 font-medium break-all text-brand hover:underline">
                  {email}
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <h3 className="flex items-center gap-2 label-sm text-muted">
              <Clock className="size-4 text-teal-ink" strokeWidth={ICON_STROKE} aria-hidden="true" />
              Opening hours
            </h3>
            <dl className="mt-2.5 border-t border-brand-line">
              {hours.map((entry) => (
                <div key={entry.label} className="flex flex-col gap-0.5 border-b border-brand-line py-3">
                  <dt className="font-medium text-ink">{entry.label}</dt>
                  <dd className="text-sm text-muted">{entry.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* A brand-drawn locality panel. A real map is deliberately not embedded:
              the address is demonstration data and would not resolve. */}
          <div className="lg:col-span-3">
            <div className="relative flex h-full min-h-48 flex-col justify-end overflow-hidden rounded-2xl bg-ground p-5">
              <RibbonArc className="absolute -top-4 -right-8 h-40 w-[130%] opacity-25" />
              <div
                aria-hidden="true"
                className="field-grid absolute inset-0 text-ink opacity-[0.06]"
              />
              <div className="relative">
                <h3 className="label-sm text-teal-ink">Getting here</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink">
                  Nine minutes from the city bus station. Patient parking is on the north side, with
                  the emergency approach kept clear on Riverside Avenue.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 border-t border-brand-line pt-4 text-sm text-muted">
          The address, telephone numbers and email address on this page are fictional demonstration
          data for a design prototype. They do not reach a real hospital.
        </p>
      </div>
    </section>
  );
}
