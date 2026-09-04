/** Fictional demo FAQs. */

export type Faq = { id: string; question: string; answer: string };

export const faqs: Faq[] = [
  {
    id: "booking",
    question: "How do I book an appointment?",
    answer:
      "Use the Book an Appointment button anywhere on this page. Choose a department, pick a consultant, select a time and leave your contact details — it takes under a minute and does not require an account. You can also call the hospital directly during outpatient hours.",
  },
  {
    id: "choose-doctor",
    question: "Can I ask for a specific doctor?",
    answer:
      "Yes. Every consultant listed on this site can be requested by name when you book. If they have no suitable slot within your preferred window, the booking team will offer the next available colleague in the same department and tell you when your first choice is free.",
  },
  {
    id: "what-to-bring",
    question: "What should I bring to my first appointment?",
    answer:
      "A photo ID, any insurance or scheme documents, a list of medicines you currently take including doses, and any previous scans, discharge summaries or laboratory reports. Original films are more useful to us than photographs of them.",
  },
  {
    id: "right-department",
    question: "I am not sure which department I need. What then?",
    answer:
      "Book with General Medicine. A physician will assess you and refer you internally if a specialist is needed, and you will not be charged a second consultation fee for that referral on the same day.",
  },
  {
    id: "emergency",
    question: "Does Santhi Hospital provide emergency care?",
    answer:
      "Yes. The Emergency & Trauma Centre is open 24 hours a day with consultant cover, its own ambulance approach and direct access to imaging, theatres and intensive care. Emergencies never require an appointment — come straight in or call the emergency number.",
  },
  {
    id: "diagnostics",
    question: "Are diagnostic and laboratory services available on site?",
    answer:
      "Imaging, pathology and laboratory services all operate within the hospital. Most laboratory results are available the same day and most imaging is reported within four hours, so a diagnosis rarely needs a second visit.",
  },
  {
    id: "visiting-hours",
    question: "What are the visiting hours?",
    answer:
      "General wards receive visitors from 11 AM to 1 PM and 4 PM to 7 PM. One attendant may stay overnight in a private room. Intensive care has its own schedule set by the unit, and parents of children admitted to paediatrics or the neonatal unit are welcome at any hour.",
  },
  {
    id: "contact-department",
    question: "How do I reach a particular department?",
    answer:
      "Call the general number and ask for the department by name, or use the contact details at the foot of this page. For questions about an existing admission, the ward number printed on your admission slip reaches the nursing station directly.",
  },
];
