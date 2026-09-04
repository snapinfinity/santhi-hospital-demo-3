/**
 * Site-wide demo content.
 *
 * Everything in this directory is fictional content created for a design demo.
 * The address, phone numbers, email and statistics do not describe a real
 * hospital and must not be presented as if they did.
 */

export type NavItem = { label: string; href: string };

export const navigation: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Departments", href: "#departments" },
  { label: "Doctors", href: "#doctors" },
  { label: "Services", href: "#services" },
  { label: "Facilities", href: "#facilities" },
  { label: "Health Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
];

export const hospital = {
  name: "Santhi Hospital",
  tagline: "Exceptional care, with humanity at the heart of it.",
  address: {
    street: "42 Riverside Medical Avenue",
    locality: "Bengaluru",
    region: "Karnataka",
    postalCode: "560001",
    country: "India",
  },
  phone: {
    general: "+91 80 4567 8900",
    generalHref: "tel:+918045678900",
    emergency: "+91 80 4567 8911",
    emergencyHref: "tel:+918045678911",
  },
  email: "care@santhihospital.example",
  hours: [
    { label: "Emergency & Trauma", value: "Open 24 hours, every day" },
    { label: "Outpatient consulting", value: "Mon–Sat, 8:00 AM – 8:00 PM" },
    { label: "Diagnostics & laboratory", value: "Mon–Sun, 7:00 AM – 9:00 PM" },
    { label: "Pharmacy", value: "Open 24 hours" },
  ],
};

export type Stat = { value: string; label: string; detail: string };

export const stats: Stat[] = [
  { value: "35", label: "Years of care", detail: "Serving Kottayam and the surrounding districts since 1991." },
  { value: "120", label: "Specialists", detail: "Consultants across 32 clinical departments." },
  { value: "32", label: "Departments", detail: "From cardiac sciences to community medicine." },
  { value: "250K", label: "Patients cared for", detail: "Inpatient and outpatient episodes to date." },
  { value: "98", label: "Would recommend us", detail: "From 4,120 discharge surveys in the last year." },
  { value: "24/7", label: "Emergency cover", detail: "Consultant-led trauma and critical care, always staffed." },
];

/** The principles that replace a generic "why choose us" icon grid. */
export const principles = [
  {
    title: "One team around one patient",
    body: "Cardiologists, physiotherapists, dietitians and nursing staff share a single record and a single plan, so nobody has to repeat their story at every door.",
  },
  {
    title: "Consultants who stay with you",
    body: "The specialist who admits you is the specialist who reviews you. Continuity is scheduled into our rosters rather than left to chance.",
  },
  {
    title: "Technology in the background",
    body: "Advanced imaging, a molecular laboratory and modular theatres exist to shorten the distance between a question and an answer — not to be shown off.",
  },
  {
    title: "Costs explained before treatment",
    body: "Estimates are shared in writing before planned admission, with a counsellor who will sit down and go through them line by line.",
  },
];
