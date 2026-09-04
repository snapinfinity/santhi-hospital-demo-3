/** Fictional demo departments. */

export type Department = {
  id: string;
  name: string;
  summary: string;
  focus: string;
  services: string[];
  consultants: number;
};

export const departments: Department[] = [
  {
    id: "cardiology",
    name: "Cardiology",
    summary:
      "A consultant-led cardiac service covering everything from a first blood-pressure reading to complex intervention, with a catheterisation lab staffed around the clock.",
    focus: "Cardiac sciences",
    services: ["Echocardiography", "Angioplasty & stenting", "Pacemaker implantation", "Heart failure clinic"],
    consultants: 11,
  },
  {
    id: "orthopaedics",
    name: "Orthopaedics",
    summary:
      "Joint replacement, sports injury and spine care, paired with an in-house rehabilitation team so recovery begins the day after surgery rather than weeks later.",
    focus: "Musculoskeletal",
    services: ["Knee & hip replacement", "Arthroscopy", "Spine surgery", "Fracture clinic"],
    consultants: 9,
  },
  {
    id: "neurology",
    name: "Neurology",
    summary:
      "A stroke-ready unit with round-the-clock imaging and thrombolysis, alongside outpatient clinics for epilepsy, movement disorders and headache.",
    focus: "Neurosciences",
    services: ["Stroke thrombolysis", "EEG & nerve conduction", "Epilepsy clinic", "Headache clinic"],
    consultants: 7,
  },
  {
    id: "gastroenterology",
    name: "Gastroenterology",
    summary:
      "Diagnostic and therapeutic endoscopy, liver clinics and nutrition support, with same-week appointments for most referrals.",
    focus: "Digestive health",
    services: ["Upper GI endoscopy", "Colonoscopy", "Liver clinic", "Nutrition support"],
    consultants: 6,
  },
  {
    id: "oncology",
    name: "Oncology",
    summary:
      "Medical and radiation oncology run as a single tumour board, so every treatment plan is agreed by the full team before it is offered to a patient.",
    focus: "Cancer care",
    services: ["Day-care chemotherapy", "Radiation therapy", "Tumour board review", "Palliative care"],
    consultants: 8,
  },
  {
    id: "paediatrics",
    name: "Paediatrics",
    summary:
      "General and specialist children's care with a dedicated paediatric emergency entrance, play-prepared procedure rooms and parents welcome overnight.",
    focus: "Children & adolescents",
    services: ["Newborn care", "Childhood asthma clinic", "Immunisation", "Developmental assessment"],
    consultants: 10,
  },
  {
    id: "obstetrics-gynaecology",
    name: "Obstetrics & Gynaecology",
    summary:
      "Antenatal care through to delivery and beyond, with midwife-led rooms, an adjoining neonatal unit and a lactation team available every day.",
    focus: "Women's health",
    services: ["Antenatal clinic", "Birthing suites", "High-risk pregnancy care", "Gynaecological surgery"],
    consultants: 12,
  },
  {
    id: "pulmonology",
    name: "Pulmonology",
    summary:
      "Respiratory medicine covering asthma, COPD, sleep-disordered breathing and interstitial lung disease, with pulmonary rehabilitation on site.",
    focus: "Respiratory",
    services: ["Pulmonary function testing", "Bronchoscopy", "Sleep study", "Pulmonary rehabilitation"],
    consultants: 5,
  },
  {
    id: "nephrology",
    name: "Nephrology",
    summary:
      "Kidney care from early detection through to dialysis, with 24 stations running three shifts a day and a transplant workup clinic.",
    focus: "Renal",
    services: ["Haemodialysis", "Peritoneal dialysis", "Transplant workup", "Hypertension clinic"],
    consultants: 6,
  },
  {
    id: "dermatology",
    name: "Dermatology",
    summary:
      "Medical dermatology for skin, hair and nail conditions, including paediatric eczema clinics and a dedicated procedure suite.",
    focus: "Skin health",
    services: ["Eczema & psoriasis clinic", "Dermatologic surgery", "Phototherapy", "Hair & scalp clinic"],
    consultants: 4,
  },
  {
    id: "general-medicine",
    name: "General Medicine",
    summary:
      "The front door for most patients — assessment, diagnosis and onward referral, with physicians who coordinate care across every other department.",
    focus: "Internal medicine",
    services: ["Diabetes clinic", "Thyroid clinic", "Fever clinic", "Preventive health review"],
    consultants: 14,
  },
  {
    id: "ent",
    name: "ENT",
    summary:
      "Ear, nose and throat care for all ages, including audiology, allergy testing and day-case surgery with same-day discharge for most procedures.",
    focus: "Head & neck",
    services: ["Audiology & hearing aids", "Sinus surgery", "Voice clinic", "Paediatric ENT"],
    consultants: 5,
  },
];

export function getDepartment(id: string) {
  return departments.find((d) => d.id === id);
}
