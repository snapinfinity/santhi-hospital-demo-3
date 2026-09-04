import { Hero } from "@/components/sections/hero";
import { QuickAccess } from "@/components/sections/quick-access";
import { About } from "@/components/sections/about";
import { Departments } from "@/components/sections/departments";
import { Doctors } from "@/components/sections/doctors";
import { PatientJourney } from "@/components/sections/patient-journey";
import { Services } from "@/components/sections/services";
import { Facilities } from "@/components/sections/facilities";
import { Testimonials } from "@/components/sections/testimonials";
import { Emergency } from "@/components/sections/emergency";
import { Insights } from "@/components/sections/insights";
import { AppointmentCta } from "@/components/sections/appointment-cta";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

/**
 * The homepage is a server component. Only the pieces that need browser state —
 * the header's menu, the department index, the booking flow and the reveal
 * wrappers — cross into the client.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickAccess />
      <About />
      <Departments />
      <Doctors />
      <PatientJourney />
      <Services />
      <Facilities />
      <Testimonials />
      <Emergency />
      <Insights />
      <AppointmentCta />
      <Faq />
      <Contact />
    </>
  );
}
