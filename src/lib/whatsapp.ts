import { site, stations, type Station } from "@/config/site";

/** Lien WhatsApp avec message prérempli (encodage URL complet). */
export function waLink(message: string, whatsapp: string = stations[0].whatsapp): string {
  const number = whatsapp.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const defaultWaLink = (station?: Station) =>
  waLink(site.defaultWhatsappMessage, station?.whatsapp);

export const telLink = (station: Station = stations[0]) => `tel:${station.phoneE164}`;

/** Nettoie une saisie utilisateur avant insertion dans le message. */
export function clean(input: unknown, max = 300): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "") // caractères de contrôle
    .replace(/[<>]/g, "") // pas de balises
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, max);
}

/* ---------------------------------------------------------------
 *  Dates et heures — fuseau Africa/Dakar (UTC+0, sans heure d'été)
 * ------------------------------------------------------------- */
export const TIMEZONE = "Africa/Dakar";

export function nowInDakar(now: Date = new Date()): { date: string; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "00";
  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export const fromMinutes = (min: number) =>
  `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;

/** Créneaux de 30 min entre ouverture et (fermeture - dernier créneau). */
export function timeSlots(station: Station): string[] {
  const start = toMinutes(station.hours.open);
  const end = toMinutes(station.hours.close) - station.lastSlotBeforeCloseMin;
  const slots: string[] = [];
  for (let m = start; m <= end; m += 30) slots.push(fromMinutes(m));
  return slots;
}

export function formatDateFr(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d, 12));
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/* ---------------------------------------------------------------
 *  Réservation
 * ------------------------------------------------------------- */
export type BookingInput = {
  name: string;
  phone: string;
  vehicleType: string;
  vehicleModel?: string;
  service: string;
  forfait?: string;
  date: string; // AAAA-MM-JJ
  time: string; // HH:MM
  stationId: string;
  comments?: string;
  consent: boolean;
};

export type BookingErrors = Partial<Record<keyof BookingInput, string>>;

const PHONE_RE = /^\+?[0-9 ().-]{8,20}$/;

export function validateBooking(
  input: BookingInput,
  now: Date = new Date(),
): BookingErrors {
  const e: BookingErrors = {};
  const station = stations.find((s) => s.id === input.stationId && s.active);

  if (clean(input.name).length < 2) e.name = "Indiquez votre nom et prénom.";
  const digits = input.phone.replace(/\D/g, "");
  if (!PHONE_RE.test(input.phone.trim()) || digits.length < 9) {
    e.phone = "Indiquez un numéro de téléphone valide (ex. 77 123 45 67).";
  }
  if (!input.vehicleType) e.vehicleType = "Choisissez le type de véhicule.";
  if (!input.service) e.service = "Choisissez la prestation souhaitée.";
  if (!station) e.stationId = "Choisissez une station.";

  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date)) {
    e.date = "Choisissez une date.";
  } else {
    const today = nowInDakar(now);
    if (input.date < today.date) e.date = "Cette date est déjà passée.";
  }

  if (!/^\d{2}:\d{2}$/.test(input.time)) {
    e.time = "Choisissez une heure.";
  } else if (station) {
    const t = toMinutes(input.time);
    const open = toMinutes(station.hours.open);
    const lastSlot = toMinutes(station.hours.close) - station.lastSlotBeforeCloseMin;
    if (t < open || t > lastSlot) {
      e.time = `Nous recevons de ${station.hours.open.replace(":", "h")} à ${fromMinutes(lastSlot).replace(":", "h")} (fermeture ${station.hours.close.replace(":", "h")}).`;
    } else if (!e.date) {
      const today = nowInDakar(now);
      if (input.date === today.date && t <= today.minutes) {
        e.time = "Cet horaire est déjà passé aujourd'hui.";
      }
    }
  }

  if (!input.consent) e.consent = "Votre accord est nécessaire pour ouvrir WhatsApp.";
  return e;
}

export function buildBookingMessage(input: BookingInput): string {
  const station = stations.find((s) => s.id === input.stationId) ?? stations[0];
  const vehicle = [clean(input.vehicleType, 40), clean(input.vehicleModel, 80)]
    .filter(Boolean)
    .join(" — ");
  const lines = [
    `Bonjour ${site.name},`,
    "",
    "Je souhaite demander une réservation.",
    "",
    `Nom : ${clean(input.name, 80)}`,
    `Téléphone : ${clean(input.phone, 25)}`,
    `Station : ${station.shortName}`,
    `Véhicule : ${vehicle}`,
    `Prestation : ${clean(input.service, 80)}`,
  ];
  if (clean(input.forfait)) lines.push(`Forfait : ${clean(input.forfait, 60)}`);
  lines.push(
    `Date souhaitée : ${formatDateFr(input.date)}`,
    `Heure souhaitée : ${input.time.replace(":", "h")}`,
  );
  const comments = clean(input.comments, 500);
  if (comments) lines.push(`Commentaires : ${comments}`);
  lines.push("", "Merci de me confirmer la disponibilité.");
  return lines.join("\n");
}

/* ---------------------------------------------------------------
 *  Abonnements / devis flotte / contact
 * ------------------------------------------------------------- */
export function buildSubscriptionMessage(pack: string, audience: "Entreprise" | "Particulier"): string {
  return [
    `Bonjour ${site.name},`,
    "",
    `Je souhaite souscrire à un abonnement (${audience}) : ${clean(pack, 80)}.`,
    "",
    "Merci de me communiquer les modalités.",
  ].join("\n");
}

export type FleetInput = {
  company: string;
  contact: string;
  phone: string;
  vehicles: string;
  needs: string;
  comments?: string;
};

export function validateFleet(f: FleetInput) {
  const e: Partial<Record<keyof FleetInput, string>> = {};
  if (clean(f.company).length < 2) e.company = "Indiquez le nom de l'entreprise.";
  if (clean(f.contact).length < 2) e.contact = "Indiquez le nom du contact.";
  if (!PHONE_RE.test(f.phone.trim()) || f.phone.replace(/\D/g, "").length < 9)
    e.phone = "Indiquez un numéro valide.";
  if (!/^\d{1,4}$/.test(f.vehicles.trim()) || Number(f.vehicles) < 1)
    e.vehicles = "Indiquez le nombre de véhicules.";
  return e;
}

export function buildFleetMessage(f: FleetInput): string {
  const lines = [
    `Bonjour ${site.name},`,
    "",
    "Je souhaite obtenir un devis pour notre flotte automobile.",
    "",
    `Entreprise : ${clean(f.company, 100)}`,
    `Contact : ${clean(f.contact, 80)}`,
    `Téléphone : ${clean(f.phone, 25)}`,
    `Nombre de véhicules : ${clean(f.vehicles, 4)}`,
  ];
  if (clean(f.needs)) lines.push(`Besoins : ${clean(f.needs, 120)}`);
  if (clean(f.comments)) lines.push(`Commentaires : ${clean(f.comments, 500)}`);
  lines.push("", "Merci de me recontacter.");
  return lines.join("\n");
}

export function buildContactMessage(name: string, subject: string, message: string): string {
  return [
    `Bonjour ${site.name},`,
    "",
    `Nom : ${clean(name, 80)}`,
    `Objet : ${clean(subject, 80)}`,
    "",
    clean(message, 800),
  ].join("\n");
}

export function buildServiceRequest(service: string): string {
  return [
    `Bonjour ${site.name},`,
    "",
    `Je souhaite un rendez-vous ou un devis pour : ${clean(service, 80)}.`,
    "",
    "Merci de me communiquer vos disponibilités.",
  ].join("\n");
}
