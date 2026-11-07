/**
 * ============================================================
 *  CONFIGURATION CENTRALE — DAMEL CAR CARE
 * ============================================================
 *  Toutes les informations commerciales du site sont ici :
 *  contact, horaires, stations, forfaits, prestations,
 *  abonnements, promotions, photos, FAQ.
 *
 *  Modifiez ce fichier puis redéployez : toutes les pages,
 *  les messages WhatsApp, le SEO et les données Schema.org
 *  se mettent à jour automatiquement.
 * ============================================================
 */

export type Station = {
  id: string;
  name: string; // nom affiché
  shortName: string; // utilisé dans les messages WhatsApp
  host: string; // station d'accueil
  district: string;
  city: string;
  country: string;
  countryCode: string;
  /** Laisser vide tant que l'adresse exacte n'est pas validée */
  streetAddress?: string;
  /** Coordonnées GPS validées uniquement (sinon laisser undefined) */
  geo?: { lat: number; lng: number };
  /** Requête Google Maps (embed + itinéraire). Remplacer par le lien de la fiche Google Business vérifiée dès qu'elle existe. */
  mapsQuery: string;
  /** Lien direct de la fiche Google Business Profile (optionnel) */
  mapsPlaceUrl?: string;
  phoneDisplay: string;
  phoneE164: string; // format tel: +221...
  whatsapp: string; // format international sans + ni espaces
  hours: { open: string; close: string; label: string; days: string };
  /** Dernier créneau réservable avant fermeture, en minutes */
  lastSlotBeforeCloseMin: number;
  active: boolean;
};

export const stations: Station[] = [
  {
    id: "hann",
    name: "Station STAR ÉNERGIE Hann Maristes",
    shortName: "STAR ÉNERGIE Hann",
    host: "STAR ÉNERGIE",
    district: "Hann Maristes",
    city: "Dakar",
    country: "Sénégal",
    countryCode: "SN",
    mapsQuery: "Station STAR ENERGIE Hann Maristes Dakar",
    phoneDisplay: "+221 77 628 83 42",
    phoneE164: "+221776288342",
    whatsapp: "221776288342",
    hours: { open: "09:00", close: "21:00", label: "09h00 – 21h00", days: "Tous les jours" },
    lastSlotBeforeCloseMin: 30,
    active: true,
  },
  {
    // Prêt pour l'ouverture : passer active à true et compléter les informations.
    id: "ndiakhirate",
    name: "Station Ndiakhirate",
    shortName: "Ndiakhirate",
    host: "STAR ÉNERGIE",
    district: "Ndiakhirate",
    city: "Dakar",
    country: "Sénégal",
    countryCode: "SN",
    mapsQuery: "Ndiakhirate Sénégal",
    phoneDisplay: "+221 77 628 83 42",
    phoneE164: "+221776288342",
    whatsapp: "221776288342",
    hours: { open: "09:00", close: "21:00", label: "09h00 – 21h00", days: "Tous les jours" },
    lastSlotBeforeCloseMin: 30,
    active: false,
  },
];

export const activeStations = stations.filter((s) => s.active);
export const mainStation = activeStations[0];

export const site = {
  name: "DAMEL CAR CARE",
  signature: "Lavage & Entretien Automobile",
  slogan: "Un véhicule propre fait toujours bonne impression.",
  sloganEntretien: "Un moteur bien entretenu va plus vite.",
  /** Domaine de production : définir NEXT_PUBLIC_SITE_URL au déploiement */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.damelcarcare.com").replace(/\/$/, ""),
  locale: "fr_SN",
  currency: "FCFA",
  defaultWhatsappMessage:
    "Bonjour DAMEL CAR CARE, je souhaite obtenir des renseignements sur vos services.",
  bookingDisclaimer: "Votre rendez-vous sera confirmé par notre équipe sur WhatsApp.",
  /** Logo officiel : déposer le fichier dans /public/brand/ puis renseigner le chemin. */
  logo: {
    src: "" as string, // ex. "/brand/damel-car-care-logo.svg"
    width: 180,
    height: 48,
  },
  hostLogo: {
    src: "" as string, // ex. "/brand/star-energie-logo.svg"
    alt: "STAR ÉNERGIE",
  },
  social: {
    facebook: "",
    instagram: "",
    tiktok: "",
  },
  /** Codes de vérification (Search Console, etc.) */
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || "",
  },
};

/* ------------------------------------------------------------
 *  PHOTOS
 *  Déposer les photos authentiques dans /public/photos/ (JPG/PNG,
 *  Next.js les sert automatiquement en AVIF/WebP), puis renseigner
 *  les chemins. Un chemin vide affiche un visuel de remplacement.
 * ---------------------------------------------------------- */
export const photos = {
  hero: { src: "", alt: "Véhicule haut de gamme en cours de lavage chez DAMEL CAR CARE" },
  station: { src: "", alt: "Espace DAMEL CAR CARE à la station STAR ÉNERGIE Hann Maristes" },
  gallery: [
    { src: "", alt: "Lavage carrosserie à la mousse active" },
    { src: "", alt: "Nettoyage intérieur et aspiration de l'habitacle" },
    { src: "", alt: "Finition et brillance des jantes" },
    { src: "", alt: "Vidange moteur avec lubrifiants CEPSA" },
    { src: "", alt: "Nettoyage des sièges et des tapis" },
    { src: "", alt: "Véhicule propre prêt à être restitué" },
  ],
};

/* ------------------------------------------------------------
 *  FORFAITS DE LAVAGE
 * ---------------------------------------------------------- */
export type Forfait = {
  id: string;
  name: string;
  priceFrom: number;
  tagline: string;
  highlight?: boolean;
  items: string[];
  duration?: string; // à renseigner uniquement si validé
};

export const forfaits: Forfait[] = [
  {
    id: "simple",
    name: "SIMPLE",
    priceFrom: 3000,
    tagline: "L'essentiel, extérieur et intérieur, pour rester impeccable au quotidien.",
    items: [
      "Lavage carrosserie",
      "Nettoyage des jantes",
      "Bas de caisse",
      "Séchage",
      "Aspiration intérieure",
      "Nettoyage des plastiques",
      "Contrôle visuel",
    ],
  },
  {
    id: "semi-complet",
    name: "SEMI COMPLET",
    priceFrom: 7000,
    tagline: "Lavage extérieur et intérieur approfondi, sans démontage.",
    highlight: true,
    items: [
      "Lavage extérieur complet",
      "Aspiration approfondie",
      "Nettoyage des sièges sans démontage",
      "Nettoyage du toit intérieur sans démontage",
      "Nettoyage des plastiques",
      "Nettoyage des vitres",
      "Séchage et finition",
    ],
  },
  {
    id: "complet",
    name: "COMPLET",
    priceFrom: 15000,
    tagline: "Le nettoyage général en profondeur, pour un véhicule comme neuf.",
    items: [
      "Lavage extérieur",
      "Nettoyage intérieur complet",
      "Nettoyage des sièges avec démontage selon intervention",
      "Nettoyage du toit",
      "Nettoyage des plastiques",
      "Nettoyage des vitres",
      "Nettoyage et finition des roues selon la prestation",
      "Finitions approfondies",
    ],
  },
];

export const pricingNote =
  "Tarifs de départ, pouvant varier selon le type de véhicule et son état.";

/** Tableau comparatif : quelles prestations sont incluses dans quel forfait */
export const comparatif: { label: string; simple: boolean | string; semi: boolean | string; complet: boolean | string }[] = [
  { label: "Lavage carrosserie", simple: true, semi: true, complet: true },
  { label: "Jantes & bas de caisse", simple: true, semi: true, complet: true },
  { label: "Séchage", simple: true, semi: true, complet: true },
  { label: "Aspiration intérieure", simple: true, semi: "Approfondie", complet: "Complète" },
  { label: "Plastiques", simple: true, semi: true, complet: true },
  { label: "Vitres", simple: false, semi: true, complet: true },
  { label: "Sièges", simple: false, semi: "Sans démontage", complet: "Avec démontage*" },
  { label: "Toit intérieur", simple: false, semi: "Sans démontage", complet: true },
  { label: "Finition des roues", simple: false, semi: false, complet: "Selon prestation" },
  { label: "Finitions approfondies", simple: false, semi: false, complet: true },
];

/* ------------------------------------------------------------
 *  ENTRETIEN AUTOMOBILE (aucun prix affiché tant que non validé)
 * ---------------------------------------------------------- */
export type Service = {
  id: string;
  name: string;
  description: string;
  icon: string; // nom d'icône Lucide (voir components/Icon.tsx)
  onQuote?: boolean;
  available?: boolean; // false = masqué du site
  brand?: "cepsa";
  price?: string; // laisser vide tant que non validé
};

export const entretien: Service[] = [
  {
    id: "vidange",
    name: "Vidange moteur",
    description:
      "Remplacement de l'huile moteur selon les préconisations du constructeur, pour protéger le moteur et préserver ses performances.",
    icon: "Droplet",
  },
  {
    id: "cepsa",
    name: "Lubrifiants CEPSA",
    description:
      "Huiles moteur et lubrifiants CEPSA adaptés à votre véhicule, essence ou diesel, citadine ou utilitaire.",
    icon: "FlaskConical",
    brand: "cepsa",
  },
  {
    id: "filtre-huile",
    name: "Filtre à huile",
    description: "Remplacement du filtre à huile, indispensable à chaque vidange pour une huile propre et efficace.",
    icon: "Filter",
  },
  {
    id: "filtre-air",
    name: "Filtre à air",
    description:
      "Un filtre à air propre garantit une bonne combustion et limite la consommation, surtout dans la poussière de Dakar.",
    icon: "Wind",
  },
  {
    id: "filtre-carburant",
    name: "Filtre à carburant",
    description: "Remplacement du filtre à carburant pour protéger l'injection et éviter les pertes de puissance.",
    icon: "Fuel",
  },
  {
    id: "freins",
    name: "Contrôle des freins",
    description: "Vérification des plaquettes, disques et du liquide de frein pour rouler en toute sécurité.",
    icon: "Disc3",
  },
  {
    id: "batterie",
    name: "Batterie",
    description: "Contrôle de l'état de charge et remplacement de la batterie si nécessaire.",
    icon: "BatteryCharging",
  },
  {
    id: "pneus",
    name: "Pneumatiques",
    description: "Contrôle de l'usure et de la pression, remplacement des pneus selon vos besoins.",
    icon: "CircleDot",
  },
  {
    id: "equilibrage",
    name: "Équilibrage",
    description: "Équilibrage des roues pour supprimer les vibrations et préserver la direction et les pneus.",
    icon: "Scale",
  },
  {
    id: "parallelisme",
    name: "Parallélisme",
    description: "Réglage de la géométrie des trains roulants pour une conduite stable et une usure régulière des pneus.",
    icon: "MoveHorizontal",
    available: false, // à activer lorsque le service est effectivement disponible
  },
  {
    id: "climatisation",
    name: "Climatisation automobile",
    description: "Contrôle et entretien du circuit de climatisation pour un habitacle frais toute l'année.",
    icon: "Snowflake",
  },
  {
    id: "preventif",
    name: "Entretien préventif",
    description: "Contrôles réguliers des niveaux et points de sécurité pour anticiper les pannes et les grosses réparations.",
    icon: "ShieldCheck",
  },
];

/* ------------------------------------------------------------
 *  SERVICES COMPLÉMENTAIRES
 * ---------------------------------------------------------- */
export const complementaires: Service[] = [
  { id: "lavage-moteur", name: "Lavage moteur", description: "Dégraissage et nettoyage soigné du compartiment moteur.", icon: "Cog", onQuote: true },
  { id: "soufflage-moteur", name: "Soufflage moteur", description: "Élimination de la poussière et des dépôts secs du compartiment moteur à l'air comprimé.", icon: "Wind" },
  { id: "radiateur", name: "Nettoyage du radiateur", description: "Nettoyage du radiateur pour un refroidissement optimal du moteur.", icon: "Thermometer", onQuote: true },
  { id: "sieges-tapis", name: "Sièges & tapis", description: "Shampoing et nettoyage en profondeur des sièges en tissu et des tapis.", icon: "Armchair", onQuote: true },
  { id: "plastiques-cuirs", name: "Plastiques & cuirs", description: "Nettoyage et soin des plastiques et des cuirs pour un intérieur net et protégé.", icon: "Sparkles" },
  { id: "brillance-pneus", name: "Brillance des pneus", description: "Application d'un produit lustrant pour des pneus d'un noir profond.", icon: "CircleDot" },
  { id: "optiques", name: "Rénovation des optiques", description: "Rénovation des phares jaunis ou ternis pour une meilleure visibilité et une meilleure allure.", icon: "Lightbulb", onQuote: true },
  { id: "desodorisation", name: "Désodorisation intérieure", description: "Traitement des odeurs et parfum d'habitacle pour une sensation de propre durable.", icon: "Flower2" },
  { id: "habitacle", name: "Habitacle en profondeur", description: "Nettoyage minutieux de chaque recoin de l'habitacle, des aérations aux contre-portes.", icon: "Car", onQuote: true },
];

/* ------------------------------------------------------------
 *  ABONNEMENTS
 * ---------------------------------------------------------- */
export type Pack = {
  id: string;
  name: string;
  pricePerMonth: number | null;
  items: string[];
  notes?: string[];
  highlight?: boolean;
};

export const packsEntreprises: Pack[] = [
  {
    id: "silver",
    name: "PACK SILVER",
    pricePerMonth: 20000,
    items: ["3 lavages Simple", "1 lavage Semi complet", "Priorité au service"],
  },
  {
    id: "gold",
    name: "PACK GOLD",
    pricePerMonth: 34000,
    highlight: true,
    items: ["6 lavages Simple", "1 lavage Semi complet", "Priorité au service", "Réduction sur les services supplémentaires"],
    notes: ["Taux de réduction communiqué sur demande."],
  },
  {
    id: "premium",
    name: "PACK PREMIUM",
    pricePerMonth: 80000,
    items: [
      "Lavages Simple illimités*",
      "1 lavage Semi complet",
      "Service prioritaire",
      "1 intervention express à domicile par mois**",
    ],
    notes: [
      "* Selon les conditions contractuelles.",
      "** Selon périmètre et disponibilité, à confirmer.",
    ],
  },
];

/** Abonnements particuliers : tarifs non encore validés -> sur demande. */
export const abonnementParticuliers = {
  intro:
    "Composez votre formule mensuelle selon votre usage : nombre de lavages, type de forfait et services d'entretien. Notre équipe vous propose un tarif adapté sur WhatsApp.",
  options: {
    forfaits: ["Simple", "Semi complet", "Complet"],
    frequences: ["2 lavages / mois", "4 lavages / mois", "8 lavages / mois"],
  },
};

/* ------------------------------------------------------------
 *  PROMOTIONS (bandeau en haut du site). Laisser vide pour masquer.
 * ---------------------------------------------------------- */
export const promotion: { active: boolean; text: string; href?: string } = {
  active: false,
  text: "",
  href: "/reservation",
};

/* ------------------------------------------------------------
 *  AVIS CLIENTS — n'ajouter que des avis authentiques et vérifiables.
 * ---------------------------------------------------------- */
export const avis: { author: string; text: string; source: string }[] = [];

/* ------------------------------------------------------------
 *  AVANTAGES
 * ---------------------------------------------------------- */
export const avantages = [
  { icon: "MapPin", title: "Au cœur de Hann Maristes", text: "Faites laver votre véhicule pendant votre passage à la station STAR ÉNERGIE." },
  { icon: "Clock", title: "Ouvert 7j/7", text: "Tous les jours de 09h00 à 21h00, y compris le week-end." },
  { icon: "Sparkles", title: "Finitions soignées", text: "Une équipe formée, des produits adaptés et un contrôle visuel avant restitution." },
  { icon: "MessageCircle", title: "Réservation en 1 minute", text: "Choisissez votre prestation et confirmez directement sur WhatsApp, sans compte." },
  { icon: "Wrench", title: "Lavage + entretien", text: "Vidange, filtres, freins, batterie : tout au même endroit." },
  { icon: "Building2", title: "Offres flottes", text: "Abonnements mensuels et formules sur mesure pour les entreprises." },
];

/* ------------------------------------------------------------
 *  FAQ
 * ---------------------------------------------------------- */
export const faq = [
  {
    q: "Où se trouve DAMEL CAR CARE ?",
    a: "DAMEL CAR CARE est installé au sein de la station STAR ÉNERGIE de Hann Maristes, à Dakar. Utilisez le bouton « Itinéraire » de la page Contact pour vous y rendre.",
  },
  {
    q: "Quels sont vos horaires ?",
    a: "Nous vous accueillons tous les jours, de 09h00 à 21h00.",
  },
  {
    q: "Comment réserver ?",
    a: "Remplissez le formulaire de réservation : un message WhatsApp prérempli s'ouvre, il vous suffit de l'envoyer. Notre équipe vous confirme ensuite le créneau sur WhatsApp.",
  },
  {
    q: "Ma réservation est-elle confirmée dès l'envoi du message ?",
    a: "Non. L'envoi du message est une demande. Le rendez-vous est confirmé par notre équipe sur WhatsApp, selon les disponibilités.",
  },
  {
    q: "Puis-je venir sans rendez-vous ?",
    a: "Oui, selon l'affluence. La réservation vous permet de limiter l'attente.",
  },
  {
    q: "Les prix varient-ils selon le véhicule ?",
    a: "Les tarifs affichés sont des prix de départ. Ils peuvent varier selon le type de véhicule (citadine, berline, SUV/4x4, utilitaire) et son état.",
  },
  {
    q: "Proposez-vous des offres pour les entreprises ?",
    a: "Oui : les packs Silver, Gold et Premium, ainsi que des formules sur mesure pour les flottes de plusieurs véhicules. Demandez un devis sur la page Abonnements.",
  },
  {
    q: "Quels lubrifiants utilisez-vous pour la vidange ?",
    a: "Nous utilisons les lubrifiants CEPSA, adaptés au type de moteur de votre véhicule.",
  },
];

/* ------------------------------------------------------------
 *  RÉSERVATION — listes du formulaire
 * ---------------------------------------------------------- */
export const vehicleTypes = ["Citadine", "Berline", "SUV / 4x4", "Utilitaire", "Autre"];

export const bookingServices = [
  { id: "lavage", label: "Lavage automobile", hasForfait: true },
  { id: "entretien", label: "Entretien / vidange", hasForfait: false },
  { id: "complementaire", label: "Service complémentaire", hasForfait: false },
  { id: "abonnement", label: "Abonnement", hasForfait: false },
  { id: "autre", label: "Autre demande", hasForfait: false },
];

/* ------------------------------------------------------------
 *  NAVIGATION
 * ---------------------------------------------------------- */
export const nav = [
  { href: "/lavage", label: "Lavage" },
  { href: "/entretien", label: "Entretien" },
  { href: "/services-complementaires", label: "Services" },
  { href: "/abonnements", label: "Abonnements" },
  { href: "/contact", label: "Contact" },
];

export const formatFCFA = (n: number) =>
  `${new Intl.NumberFormat("fr-FR").format(n).replace(/ | /g, " ")} FCFA`;
