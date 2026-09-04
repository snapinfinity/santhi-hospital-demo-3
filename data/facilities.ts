/** Fictional demo facilities, written as a specification rather than marketing copy. */

export type Facility = {
  id: string;
  name: string;
  capacity: string;
  capacityLabel: string;
  description: string;
};

export const facilities: Facility[] = [
  {
    id: "imaging",
    name: "Advanced Imaging Centre",
    capacity: "3T",
    capacityLabel: "MRI field strength",
    description:
      "MRI, 128-slice CT, ultrasound and digital radiography in a single suite, so a patient rarely moves between buildings for a diagnosis.",
  },
  {
    id: "theatres",
    name: "Modular Operating Theatres",
    capacity: "8",
    capacityLabel: "Theatres",
    description:
      "Laminar-flow theatres with integrated imaging, including two configured for joint replacement and one hybrid theatre for cardiac work.",
  },
  {
    id: "icu",
    name: "Intensive Care Unit",
    capacity: "42",
    capacityLabel: "Critical care beds",
    description:
      "Intensivist-led critical care with single-patient bays, continuous monitoring and a 1:1 nursing ratio for ventilated patients.",
  },
  {
    id: "ccu",
    name: "Cardiac Care Unit",
    capacity: "16",
    capacityLabel: "Cardiac beds",
    description:
      "Adjacent to the catheterisation laboratory so a patient presenting with chest pain can be assessed and treated without leaving the floor.",
  },
  {
    id: "nicu",
    name: "Neonatal Intensive Care Unit",
    capacity: "Level III",
    capacityLabel: "Neonatal designation",
    description:
      "Care for babies from 26 weeks, with parents welcome at any hour and a kangaroo-care room next to the nursery.",
  },
  {
    id: "emergency",
    name: "Emergency & Trauma Centre",
    capacity: "24/7",
    capacityLabel: "Consultant cover",
    description:
      "Separate ambulance approach, four resuscitation bays and direct lift access to imaging, theatres and the intensive care unit.",
  },
  {
    id: "rehabilitation",
    name: "Rehabilitation Centre",
    capacity: "1,100 m²",
    capacityLabel: "Therapy floor",
    description:
      "Gait laboratory, hydrotherapy pool and occupational therapy kitchen, used by both inpatients and people returning after discharge.",
  },
  {
    id: "rooms",
    name: "Private Patient Rooms",
    capacity: "180",
    capacityLabel: "Inpatient rooms",
    description:
      "Single rooms with an attendant bed, daylight on every ward and quiet hours observed from 9 PM so recovery is not interrupted.",
  },
];
