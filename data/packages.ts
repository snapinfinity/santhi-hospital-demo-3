/** Fictional demo health check packages. All names, inclusions and prices are invented. */

export type Package = {
  id: string;
  name: string;
  price: string;
  for: string;
  duration: string;
  includes: string[];
  popular?: boolean;
};

export const packages: Package[] = [
  {
    id: "essential",
    name: "Santhi Essential",
    price: "₹1,450",
    for: "Adults under 40, once a year",
    duration: "Half a morning",
    includes: [
      "Physician consultation",
      "Complete blood count",
      "Blood sugar & lipid profile",
      "Blood pressure & BMI review",
      "Urine routine",
      "Written report with advice",
    ],
  },
  {
    id: "complete",
    name: "Santhi Complete",
    price: "₹3,900",
    for: "Adults 40 and over, or with a family history",
    duration: "One morning",
    includes: [
      "Everything in Essential",
      "ECG & chest X-ray",
      "Ultrasound abdomen",
      "Liver & kidney profiles",
      "Thyroid profile",
      "Eye & dental screening",
      "Cardiologist review of findings",
    ],
    popular: true,
  },
  {
    id: "signature",
    name: "Santhi Signature",
    price: "₹7,500",
    for: "Anyone who wants the most thorough half-day screen",
    duration: "A full day, breakfast included",
    includes: [
      "Everything in Complete",
      "Cardiac risk assessment",
      "Cancer screening markers",
      "Bone density scan (50+)",
      "Pulmonary function test",
      "Diet & lifestyle consultation",
      "Follow-up call within two weeks",
    ],
  },
];
