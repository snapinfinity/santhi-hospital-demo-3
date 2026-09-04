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
    id: "monsoon-fever",
    title: "Monsoon fevers in Kozhikode: when to wait, and when to walk in",
    category: "General Medicine",
    date: "29 August 2026",
    dateTime: "2026-08-29",
    readingMinutes: 6,
    excerpt:
      "Every June the same question arrives with the rain. A physician explains which fevers settle at home, which need a test on day three, and the signs that should never wait.",
  },
  {
    id: "healthier-heart",
    title: "Five habits that do more for your heart than any supplement",
    category: "Cardiology",
    date: "21 August 2026",
    dateTime: "2026-08-21",
    readingMinutes: 6,
    excerpt:
      "Sleep, salt, movement, smoking and stress. None of them are new advice, which is exactly why they get skipped over — here is what each one actually changes.",
  },
  {
    id: "preventive-checkups",
    title: "What a preventive health check should and should not include",
    category: "Preventive Health",
    date: "14 August 2026",
    dateTime: "2026-08-14",
    readingMinutes: 5,
    excerpt:
      "More tests is not the same as better screening. A guide to reading a package, and the questions worth asking before you book one.",
  },
  {
    id: "knee-pain",
    title: "When knee pain needs a specialist, and when it needs patience",
    category: "Orthopaedics",
    date: "6 August 2026",
    dateTime: "2026-08-06",
    readingMinutes: 7,
    excerpt:
      "Most joint pain settles without surgery. These are the specific signs that mean it is time to stop waiting and get it looked at.",
  },
  {
    id: "child-asthma",
    title: "A parent's guide to childhood asthma during the school year",
    category: "Paediatrics",
    date: "28 July 2026",
    dateTime: "2026-07-28",
    readingMinutes: 5,
    excerpt:
      "The inhaler is the easy part. What actually keeps children out of the emergency room is a written plan their teacher, coach and grandparent can all follow.",
  },
  {
    id: "kidney-diabetes",
    title: "Living with diabetes: the kidney tests that are easy to forget",
    category: "Nephrology",
    date: "19 July 2026",
    dateTime: "2026-07-19",
    readingMinutes: 6,
    excerpt:
      "Kidney disease is quiet until it is not. A nephrologist on the two simple tests that catch it a decade early, and how often they should be repeated.",
  },
];
