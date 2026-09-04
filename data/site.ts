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
  { label: "Health Checks", href: "#health-checks" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
];

export const hospital = {
  name: "Santhi Hospital",
  shortName: "Santhi",
  tagline: "Good medicine begins with listening.",
  city: "Kozhikode",
  address: {
    street: "12 Malabar Coast Road",
    locality: "Eranhipalam",
    region: "Kozhikode, Kerala",
    postalCode: "673006",
    country: "India",
  },
  phone: {
    general: "+91 495 272 4400",
    generalHref: "tel:+914952724400",
    emergency: "+91 495 272 4911",
    emergencyHref: "tel:+914952724911",
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
  { value: "34", label: "Years of care", detail: "Caring for Kozhikode and the Malabar coast since 1992." },
  { value: "120+", label: "Specialists", detail: "Consultants across 32 clinical departments." },
  { value: "2,40,000+", label: "Patient visits a year", detail: "Outpatient and inpatient episodes across our clinics." },
  { value: "98%", label: "Would recommend us", detail: "From 5,200 discharge surveys in the last year." },
  { value: "24/7", label: "Emergency cover", detail: "Consultant-led trauma and critical care, always staffed." },
];

/** The principles that replace a generic "why choose us" icon grid. */
export const principles = [
  {
    title: "We listen before we order tests",
    body: "Every first consultation is scheduled for a full twenty minutes, because a careful history catches what a panel of investigations often misses.",
  },
  {
    title: "One team around one patient",
    body: "Your physician, surgeon, physiotherapist and dietitian share a single record and a single plan, so nobody has to repeat their story at every door.",
  },
  {
    title: "Costs explained before treatment",
    body: "Estimates are shared in writing before planned admission, with a counsellor who will sit down and go through them line by line.",
  },
  {
    title: "Care that continues at home",
    body: "Nursing visits, physiotherapy and follow-up reviews are available across Kozhikode district, because recovery does not end at our gate.",
  },
];

/** Steps of the patient journey section. */
export const journeySteps = [
  {
    id: "reach",
    title: "You reach us",
    body: "A dedicated emergency approach, free parking and a help desk that walks with you instead of pointing at a corridor.",
  },
  {
    id: "meet",
    title: "You are heard",
    body: "A full-length consultation with a consultant who reads your history before you walk in, not while you sit there.",
  },
  {
    id: "understand",
    title: "You get answers",
    body: "Imaging and laboratory results the same day wherever clinically possible, explained in the language you are most comfortable with.",
  },
  {
    id: "treat",
    title: "You agree a plan",
    body: "Treatment and a written estimate agreed together, before anything is scheduled — never a surprise at discharge.",
  },
  {
    id: "heal",
    title: "You recover",
    body: "Rehabilitation, follow-up reviews and home nursing support that continues until you no longer need us.",
  },
];

/** Items scrolled in the marquee ticker under the hero. */
export const tickerItems = [
  "24/7 Emergency & Trauma",
  "32 clinical departments",
  "120+ consultants",
  "Pharmacy open 24 hours",
  "Same-day diagnostics",
  "Home sample collection",
  "Cashless insurance desk",
  "In-house physiotherapy",
];
