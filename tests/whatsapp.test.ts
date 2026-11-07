import { describe, expect, it } from "vitest";
import {
  buildBookingMessage,
  buildFleetMessage,
  clean,
  defaultWaLink,
  nowInDakar,
  telLink,
  timeSlots,
  validateBooking,
  validateFleet,
  waLink,
  type BookingInput,
} from "@/lib/whatsapp";
import { mainStation, site } from "@/config/site";

// 6 novembre 2026, 15h06 à Dakar (UTC+0)
const NOW = new Date("2026-11-06T15:06:00Z");

const valid: BookingInput = {
  name: "Awa Ndiaye",
  phone: "77 123 45 67",
  vehicleType: "SUV / 4x4",
  vehicleModel: "Toyota RAV4",
  service: "Lavage automobile",
  forfait: "SEMI COMPLET — à partir de 7 000 FCFA",
  date: "2026-11-07",
  time: "10:30",
  stationId: "hann",
  comments: "Siège enfant à l'arrière & tapis très sales",
  consent: true,
};

describe("Liens WhatsApp et téléphone", () => {
  it("utilise le numéro international 221776288342", () => {
    expect(waLink("x")).toBe("https://wa.me/221776288342?text=x");
  });
  it("lien par défaut avec le message de renseignement encodé", () => {
    const url = new URL(defaultWaLink());
    expect(url.host).toBe("wa.me");
    expect(url.pathname).toBe("/221776288342");
    expect(url.searchParams.get("text")).toBe(site.defaultWhatsappMessage);
  });
  it("encode accents, retours à la ligne, & et #", () => {
    const msg = "Réservation\nÉté & #1 ?";
    const url = new URL(waLink(msg));
    expect(url.searchParams.get("text")).toBe(msg);
    expect(waLink(msg)).not.toMatch(/\n| /);
  });
  it("lien d'appel", () => {
    expect(telLink()).toBe("tel:+221776288342");
  });
});

describe("Validation de la réservation", () => {
  it("accepte une demande complète", () => {
    expect(validateBooking(valid, NOW)).toEqual({});
  });
  it("signale les champs obligatoires manquants", () => {
    const e = validateBooking(
      { ...valid, name: "", phone: "", vehicleType: "", service: "", consent: false },
      NOW,
    );
    expect(Object.keys(e).sort()).toEqual(["consent", "name", "phone", "service", "vehicleType"]);
  });
  it("refuse une date passée", () => {
    expect(validateBooking({ ...valid, date: "2026-11-05" }, NOW).date).toBeDefined();
  });
  it("refuse un horaire déjà passé aujourd'hui", () => {
    expect(validateBooking({ ...valid, date: "2026-11-06", time: "14:00" }, NOW).time).toBeDefined();
    expect(validateBooking({ ...valid, date: "2026-11-06", time: "16:00" }, NOW)).toEqual({});
  });
  it("refuse les heures hors horaires (09h00–21h00)", () => {
    expect(validateBooking({ ...valid, time: "08:30" }, NOW).time).toBeDefined();
    expect(validateBooking({ ...valid, time: "21:00" }, NOW).time).toBeDefined();
    expect(validateBooking({ ...valid, time: "09:00" }, NOW)).toEqual({});
    expect(validateBooking({ ...valid, time: "20:30" }, NOW)).toEqual({});
  });
  it("refuse une station inactive (Ndiakhirate pas encore ouverte)", () => {
    expect(validateBooking({ ...valid, stationId: "ndiakhirate" }, NOW).stationId).toBeDefined();
  });
  it("refuse un téléphone invalide", () => {
    expect(validateBooking({ ...valid, phone: "abc" }, NOW).phone).toBeDefined();
    expect(validateBooking({ ...valid, phone: "+221 77 123 45 67" }, NOW).phone).toBeUndefined();
  });
});

describe("Message de réservation", () => {
  const msg = buildBookingMessage(valid);
  it("respecte le modèle demandé", () => {
    expect(msg.startsWith("Bonjour DAMEL CAR CARE,\n\nJe souhaite demander une réservation.")).toBe(true);
    expect(msg).toContain("Nom : Awa Ndiaye");
    expect(msg).toContain("Téléphone : 77 123 45 67");
    expect(msg).toContain("Station : STAR ÉNERGIE Hann");
    expect(msg).toContain("Véhicule : SUV / 4x4 — Toyota RAV4");
    expect(msg).toContain("Prestation : Lavage automobile");
    expect(msg).toContain("Forfait : SEMI COMPLET");
    expect(msg).toContain("Date souhaitée : samedi 7 novembre 2026");
    expect(msg).toContain("Heure souhaitée : 10h30");
    expect(msg).toContain("Commentaires : Siège enfant");
    expect(msg.endsWith("Merci de me confirmer la disponibilité.")).toBe(true);
  });
  it("omet forfait et commentaires vides", () => {
    const m = buildBookingMessage({ ...valid, forfait: "", comments: "" });
    expect(m).not.toContain("Forfait :");
    expect(m).not.toContain("Commentaires :");
  });
  it("survit à un aller-retour d'encodage URL", () => {
    expect(new URL(waLink(msg)).searchParams.get("text")).toBe(msg);
  });
});

describe("Sécurité des saisies", () => {
  it("supprime balises et caractères de contrôle, tronque", () => {
    expect(clean("<script>alert(1)</script>")).toBe("scriptalert(1)/script");
    expect(clean("a\u0000b\u0007c")).toBe("abc");
    expect(clean("x".repeat(1000), 50)).toHaveLength(50);
    expect(clean(undefined)).toBe("");
  });
});

describe("Créneaux et fuseau horaire", () => {
  it("génère des créneaux de 09:00 à 20:30", () => {
    const s = timeSlots(mainStation);
    expect(s[0]).toBe("09:00");
    expect(s.at(-1)).toBe("20:30");
    expect(s).toHaveLength(24);
  });
  it("calcule l'heure de Dakar", () => {
    expect(nowInDakar(NOW)).toEqual({ date: "2026-11-06", minutes: 15 * 60 + 6 });
  });
});

describe("Devis flotte", () => {
  it("valide et construit le message", () => {
    const f = { company: "Transports Diop", contact: "M. Diop", phone: "78 000 00 00", vehicles: "12", needs: "Pack Gold", comments: "" };
    expect(validateFleet(f)).toEqual({});
    expect(buildFleetMessage(f)).toContain("Nombre de véhicules : 12");
    expect(validateFleet({ ...f, vehicles: "0" }).vehicles).toBeDefined();
  });
});
