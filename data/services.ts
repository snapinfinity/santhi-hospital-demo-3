/** Fictional demo services. */

export type Service = {
  id: string;
  name: string;
  description: string;
  detail: string;
  icon: string;
  lead?: boolean;
};

export const services: Service[] = [
  {
    id: "preventive-health-checkups",
    name: "Preventive Health Checkups",
    description:
      "Structured screening packages for adults, built around age, family history and existing conditions rather than a single fixed list of tests.",
    detail: "Results reviewed with a physician the same day",
    icon: "checkups",
    lead: true,
  },
  {
    id: "diagnostic-imaging",
    name: "Diagnostic Imaging",
    description: "MRI, CT, ultrasound and digital X-ray, reported by in-house radiologists.",
    detail: "Most reports within 4 hours",
    icon: "imaging",
  },
  {
    id: "laboratory-services",
    name: "Laboratory Services",
    description: "Biochemistry, haematology, histopathology and microbiology under one roof.",
    detail: "Home sample collection available",
    icon: "laboratory",
  },
  {
    id: "emergency-care",
    name: "Emergency & Trauma Care",
    description: "Consultant-led resuscitation, triage and observation, staffed continuously.",
    detail: "Open 24 hours",
    icon: "emergency",
  },
  {
    id: "day-care-procedures",
    name: "Day Care Procedures",
    description: "Endoscopy, minor surgery and infusions planned for same-day discharge.",
    detail: "Admission and discharge in one visit",
    icon: "daycare",
  },
  {
    id: "physiotherapy-rehabilitation",
    name: "Physiotherapy & Rehabilitation",
    description: "Post-surgical, neurological and cardiac rehabilitation with a resident therapy team.",
    detail: "Inpatient and outpatient programmes",
    icon: "physio",
  },
  {
    id: "pharmacy",
    name: "Pharmacy",
    description: "Full formulary with a pharmacist available to review every discharge prescription.",
    detail: "Open 24 hours",
    icon: "pharmacy",
  },
  {
    id: "home-healthcare",
    name: "Home Healthcare",
    description: "Nursing visits, physiotherapy and post-discharge reviews at home across the district.",
    detail: "Within 25 km of the hospital",
    icon: "homecare",
  },
];
