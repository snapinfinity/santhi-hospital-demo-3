import {
  Activity,
  Baby,
  Bone,
  Brain,
  CalendarCheck,
  ClipboardList,
  Droplets,
  Ear,
  FlaskConical,
  HeartPulse,
  Home,
  Hospital,
  MapPin,
  Microscope,
  Phone,
  Pill,
  Ribbon,
  Scan,
  ShieldPlus,
  Stethoscope,
  Sun,
  UserRound,
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
  gastroenterology: Activity,
  oncology: Ribbon,
  paediatrics: Baby,
  "obstetrics-gynaecology": Baby,
  pulmonology: Wind,
  nephrology: Droplets,
  dermatology: Sun,
  "general-medicine": Stethoscope,
  ent: Ear,
};

export const serviceIcons: Record<string, LucideIcon> = {
  "preventive-health-checkups": ClipboardList,
  "diagnostic-imaging": Scan,
  "laboratory-services": FlaskConical,
  "emergency-care": ShieldPlus,
  "day-care-procedures": CalendarCheck,
  "physiotherapy-rehabilitation": Activity,
  pharmacy: Pill,
  "home-healthcare": Home,
};

export const facilityIcons: Record<string, LucideIcon> = {
  imaging: Scan,
  theatres: Microscope,
  icu: Activity,
  ccu: HeartPulse,
  nicu: Baby,
  emergency: ShieldPlus,
  rehabilitation: UserRound,
  rooms: Hospital,
};

export const contactIcons = { MapPin, Phone, Stethoscope };
