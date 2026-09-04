/** Fictional demo health articles. */

export type Article = {
  id: string;
  title: string;
  category: string;
  date: string;
  dateTime: string;
  readingMinutes: number;
  excerpt: string;
};

export const articles: Article[] = [
  {
    id: "healthier-heart",
    title: "Five habits that do more for your heart than any supplement",
    category: "Cardiology",
    date: "28 August 2026",
    dateTime: "2026-08-28",
    readingMinutes: 6,
    excerpt:
      "Sleep, salt, movement, smoking and stress. None of them are new advice, which is exactly why they get skipped over — here is what each one actually changes.",
  },
  {
    id: "preventive-checkups",
    title: "What a preventive health check should and should not include",
    category: "Preventive Health",
    date: "19 August 2026",
    dateTime: "2026-08-19",
    readingMinutes: 5,
    excerpt:
      "More tests is not the same as better screening. A guide to reading a package, and the questions worth asking before you book one.",
  },
  {
    id: "orthopaedic-specialist",
    title: "When knee pain needs a specialist, and when it needs patience",
    category: "Orthopaedics",
    date: "11 August 2026",
    dateTime: "2026-08-11",
    readingMinutes: 7,
    excerpt:
      "Most joint pain settles without surgery. These are the specific signs that mean it is time to stop waiting and get it looked at.",
  },
  {
    id: "seasonal-illness",
    title: "Supporting a child through the monsoon illness season",
    category: "Paediatrics",
    date: "2 August 2026",
    dateTime: "2026-08-02",
    readingMinutes: 5,
    excerpt:
      "Fever is a symptom, not a diagnosis. How to judge what can be managed at home, and the thresholds that should bring you in.",
  },
  {
    id: "regular-screening",
    title: "Screening after 40: a decade-by-decade guide",
    category: "General Medicine",
    date: "24 July 2026",
    dateTime: "2026-07-24",
    readingMinutes: 8,
    excerpt:
      "What changes in your forties, fifties and sixties, and which checks are worth repeating annually rather than once and forgetting.",
  },
  {
    id: "better-sleep",
    title: "Simple steps toward better sleep, without a prescription",
    category: "Pulmonology",
    date: "16 July 2026",
    dateTime: "2026-07-16",
    readingMinutes: 6,
    excerpt:
      "Snoring that wakes the household is not just a nuisance. What ordinary poor sleep looks like, and where it crosses into something we should test for.",
  },
];
