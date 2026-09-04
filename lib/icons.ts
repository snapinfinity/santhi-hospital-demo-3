import {
  Activity,
  Ambulance,
  Baby,
  Bone,
  Brain,
  CalendarCheck,
  CalendarDays,
  ClipboardList,
  ClipboardPlus,
  Dumbbell,
  Droplets,
  Ear,
  Fingerprint,
  FlaskConical,
  Flower2,
  HeartHandshake,
  HeartPulse,
  Home,
  MapPin,
  MessagesSquare,
  Phone,
  Pill,
  Ribbon,
  ScanLine,
  ShieldCheck,
  Siren,
  Stethoscope,
  Sun,
  Timer,
  UtensilsCrossed,
  Wind,
  type LucideIcon,
} from "lucide-react";

/**
 * One icon set (lucide) at one stroke weight across the whole site. Icons are
 * used where they speed up scanning — department lists, service indexes, contact
 * details — and never as decoration beside prose.
 */
export const ICON_STROKE = 1.5;

export const departmentIcons: Record<string, LucideIcon> = {
  cardiology: HeartPulse,
  orthopaedics: Bone,
  neurology: Brain,
  gastroenterology: UtensilsCrossed,
  oncology: Ribbon,
  paediatrics: Baby,
  "obstetrics-gynaecology": Flower2,
  pulmonology: Wind,
  nephrology: Droplets,
  dermatology: Fingerprint,
  "general-medicine": Stethoscope,
  ent: Ear,
};

export const serviceIcons: Record<string, LucideIcon> = {
  checkups: CalendarCheck,
  imaging: ScanLine,
  laboratory: FlaskConical,
  emergency: Siren,
  daycare: Timer,
  physio: Dumbbell,
  pharmacy: Pill,
  homecare: Home,
};

export const journeyIcons: Record<string, LucideIcon> = {
  reach: MapPin,
  meet: MessagesSquare,
  understand: ClipboardList,
  treat: ClipboardPlus,
  heal: HeartHandshake,
};

export const miscIcons = {
  Ambulance,
  Activity,
  CalendarDays,
  MapPin,
  Phone,
  ShieldCheck,
  Sun,
  Siren,
};
