/**
 * Fictional demo consultants.
 *
 * These are invented people created to demonstrate the interface. The portraits
 * are stock photographs used as placeholders — the person pictured is not the
 * person named, and alt text is written so it never claims otherwise.
 */

export type Doctor = {
  id: string;
  name: string;
  role: string;
  departmentId: string;
  qualifications: string;
  experienceYears: number;
  /** Demonstration portrait. Not a photograph of the fictional person named. */
  portrait: string;
  bio: string;
  languages: string[];
  nextAvailable: string;
};

export const doctors: Doctor[] = [
  {
    id: "kavya-menon",
    name: "Dr. Kavya Menon",
    role: "Senior Consultant — Cardiology",
    departmentId: "cardiology",
    qualifications: "MBBS, MD, DM (Cardiology)",
    experienceYears: 17,
    portrait: "/images/doctors/ananya-menon.jpg",
    bio: "Leads the heart failure programme and the cardiac rehabilitation clinic. Particular interest in women's cardiovascular risk, which is under-recognised and under-treated.",
    languages: ["Malayalam", "English", "Tamil"],
    nextAvailable: "Today, 2:30 PM",
  },
  {
    id: "nikhil-ravindran",
    name: "Dr. Nikhil Ravindran",
    role: "Senior Consultant — Orthopaedics",
    departmentId: "orthopaedics",
    qualifications: "MBBS, MS (Orthopaedics)",
    experienceYears: 15,
    portrait: "/images/doctors/rahul-nair.jpg",
    bio: "Joint replacement and sports injury surgeon. Runs a combined clinic with physiotherapy so surgical and rehabilitation plans are agreed in the same appointment.",
    languages: ["Malayalam", "English", "Hindi"],
    nextAvailable: "Today, 4:00 PM",
  },
  {
    id: "sneha-thomas",
    name: "Dr. Sneha Thomas",
    role: "Consultant — Paediatrics",
    departmentId: "paediatrics",
    qualifications: "MBBS, MD (Paediatrics)",
    experienceYears: 14,
    portrait: "/images/doctors/meera-thomas.jpg",
    bio: "General paediatrics with a special interest in childhood asthma and allergy. Keeps late clinics twice a week so children do not miss a full school day.",
    languages: ["Malayalam", "English"],
    nextAvailable: "Tomorrow, 9:30 AM",
  },
  {
    id: "aravind-nampoothiri",
    name: "Dr. Aravind Nampoothiri",
    role: "Consultant — Neurology",
    departmentId: "neurology",
    qualifications: "MBBS, MD, DM (Neurology)",
    experienceYears: 12,
    portrait: "/images/doctors/arjun-krishnan.jpg",
    bio: "Stroke and epilepsy specialist, and clinical lead for the hospital's thrombolysis pathway. Teaches emergency stroke recognition to primary care teams across the district.",
    languages: ["Malayalam", "English", "Kannada"],
    nextAvailable: "Today, 11:15 AM",
  },
  {
    id: "rhea-fernandes",
    name: "Dr. Rhea Fernandes",
    role: "Consultant — Dermatology",
    departmentId: "dermatology",
    qualifications: "MBBS, MD (Dermatology)",
    experienceYears: 10,
    portrait: "/images/doctors/nisha-varghese.jpg",
    bio: "Medical dermatology with a paediatric eczema clinic on Wednesdays. Works closely with the allergy service where skin and respiratory symptoms overlap.",
    languages: ["Malayalam", "English", "Konkani"],
    nextAvailable: "Tomorrow, 12:00 PM",
  },
  {
    id: "vishnu-prasad",
    name: "Dr. Vishnu Prasad",
    role: "Consultant — Gastroenterology",
    departmentId: "gastroenterology",
    qualifications: "MBBS, MD, DM (Gastroenterology)",
    experienceYears: 13,
    portrait: "/images/doctors/aditya-menon.jpg",
    bio: "Therapeutic endoscopist and liver clinic lead. Runs a shared clinic with the nutrition team for inflammatory bowel disease.",
    languages: ["Malayalam", "English", "Hindi"],
    nextAvailable: "Today, 10:30 AM",
  },
  {
    id: "anjali-krishnan",
    name: "Dr. Anjali Krishnan",
    role: "Senior Consultant — Obstetrics & Gynaecology",
    departmentId: "obstetrics-gynaecology",
    qualifications: "MBBS, MS (Obstetrics & Gynaecology)",
    experienceYears: 16,
    portrait: "/images/doctors/lakshmi-nair.jpg",
    bio: "Obstetrician with a high-risk pregnancy practice, working alongside the neonatal team so mother and baby are planned for together from the first scan.",
    languages: ["Malayalam", "English", "Tamil"],
    nextAvailable: "Tomorrow, 3:15 PM",
  },
  {
    id: "faizal-rahman",
    name: "Dr. Faizal Rahman",
    role: "Consultant — Pulmonology",
    departmentId: "pulmonology",
    qualifications: "MBBS, MD, DM (Pulmonary Medicine)",
    experienceYears: 11,
    portrait: "/images/doctors/sameer-joseph.jpg",
    bio: "Respiratory physician covering asthma, COPD and sleep-disordered breathing. Set up the hospital's pulmonary rehabilitation programme in 2022.",
    languages: ["Malayalam", "English"],
    nextAvailable: "Today, 5:00 PM",
  },
  {
    id: "lakshmi-warrier",
    name: "Dr. Lakshmi Warrier",
    role: "Senior Consultant — General Medicine",
    departmentId: "general-medicine",
    qualifications: "MBBS, MD (General Medicine)",
    experienceYears: 20,
    portrait: "/images/doctors/priya-raghavan.jpg",
    bio: "Internal medicine physician and clinical lead for the preventive health programme. Most patients meet her before any other specialist.",
    languages: ["Malayalam", "English", "Hindi"],
    nextAvailable: "Today, 9:00 AM",
  },
  {
    id: "jithesh-madhavan",
    name: "Dr. Jithesh Madhavan",
    role: "Consultant — Nephrology",
    departmentId: "nephrology",
    qualifications: "MBBS, MD, DM (Nephrology)",
    experienceYears: 12,
    portrait: "/images/doctors/vinod-mathew.jpg",
    bio: "Kidney specialist overseeing the dialysis unit and the transplant workup clinic. Focused on catching kidney disease early in people living with diabetes.",
    languages: ["Malayalam", "English"],
    nextAvailable: "Tomorrow, 10:00 AM",
  },
  {
    id: "salma-yousuf",
    name: "Dr. Salma Yousuf",
    role: "Consultant — Oncology",
    departmentId: "oncology",
    qualifications: "MBBS, MD, DM (Medical Oncology)",
    experienceYears: 13,
    portrait: "/images/doctors/fathima-rashid.jpg",
    bio: "Medical oncologist chairing the weekly tumour board. Believes patients should leave every consultation able to explain their own treatment plan.",
    languages: ["Malayalam", "English", "Urdu"],
    nextAvailable: "Tomorrow, 11:45 AM",
  },
  {
    id: "paul-mathew",
    name: "Dr. Paul Mathew",
    role: "Consultant — ENT",
    departmentId: "ent",
    qualifications: "MBBS, MS (ENT)",
    experienceYears: 18,
    portrait: "/images/doctors/george-kurian.jpg",
    bio: "Ear, nose and throat surgeon with an audiology-led hearing clinic. Performs most sinus and tonsil procedures as day cases.",
    languages: ["Malayalam", "English"],
    nextAvailable: "Today, 3:45 PM",
  },
];

export function doctorsForDepartment(departmentId: string) {
  return doctors.filter((d) => d.departmentId === departmentId);
}

export function getDoctor(id: string) {
  return doctors.find((d) => d.id === id);
}
