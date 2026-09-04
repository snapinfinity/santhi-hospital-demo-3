import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Departments } from "@/components/sections/departments";
import { Doctors } from "@/components/sections/doctors";
import { Journey } from "@/components/sections/journey";
import { Services } from "@/components/sections/services";
import { Packages } from "@/components/sections/packages";
import { Facilities } from "@/components/sections/facilities";
import { Testimonials } from "@/components/sections/testimonials";
import { Emergency } from "@/components/sections/emergency";
import { Insights } from "@/components/sections/insights";
import { Cta } from "@/components/sections/cta";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

/**
 * The homepage is a server component. Only the pieces that need browser state —
 * the header's menu and scroll state, the scroll progress bar, the department
 * explorer, the doctor roster, the testimonial carousel, the FAQ accordion and
 * the booking flow — cross into the client.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Departments />
      <Doctors />
      <Journey />
      <Services />
      <Packages />
      <Facilities />
      <Testimonials />
      <Emergency />
      <Insights />
      <Cta />
      <Faq />
      <Contact />
    </>
  );
}
