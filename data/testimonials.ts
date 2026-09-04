/**
 * Fictional demo testimonials. These are written examples, not real patient
 * statements, and are deliberately understated — no outcome is promised.
 */

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  context: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "priya-menon",
    quote:
      "From the first consultation to the follow-up, every person in the team explained what was happening and why. I never once had to guess.",
    name: "Priya Menon",
    context: "Cardiology patient",
  },
  {
    id: "thomas-jacob",
    quote:
      "My father is 82 and does not manage stairs or long waits. Someone met us at the entrance both times, and the appointment ran when it said it would.",
    name: "Thomas Jacob",
    context: "Attending with a family member",
  },
  {
    id: "shalini-r",
    quote:
      "The physiotherapist came to see me the morning after my knee replacement. Six weeks later I walked into the review clinic on my own.",
    name: "Shalini Raghunathan",
    context: "Orthopaedics patient",
  },
  {
    id: "abdul-rahman",
    quote:
      "We were in the emergency department at two in the morning. It was busy, but a nurse came back to us three times before the doctor was free, just so we knew where we stood.",
    name: "Abdul Rahman",
    context: "Emergency department",
  },
  {
    id: "anitha-george",
    quote:
      "The estimate we were given before admission was the bill we received at discharge. After the year we had had, that mattered more than I can say.",
    name: "Anitha George",
    context: "Parent, paediatric admission",
  },
];
