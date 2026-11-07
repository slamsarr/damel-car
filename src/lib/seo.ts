import type { Metadata } from "next";
import { activeStations, faq, forfaits, site, type Station } from "@/config/site";

export function pageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: site.locale,
      url,
      siteName: site.name,
      title: `${title} | ${site.name}`,
      description,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name} — ${site.signature}` }],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description },
  };
}

/** Données structurées : AutoWash + AutomotiveBusiness pour chaque station active. */
export function businessJsonLd(station: Station = activeStations[0]) {
  const [oh, om] = station.hours.open.split(":");
  const [ch, cm] = station.hours.close.split(":");
  return {
    "@context": "https://schema.org",
    "@type": ["AutoWash", "AutomotiveBusiness"],
    "@id": `${site.url}/#${station.id}`,
    name: site.name,
    alternateName: `${site.name} — ${station.name}`,
    slogan: site.slogan,
    description: `${site.signature} à ${station.name}, ${station.city}. Lavage simple, semi complet et complet, vidange avec lubrifiants CEPSA, entretien automobile et abonnements entreprises.`,
    url: site.url,
    telephone: station.phoneE164,
    image: `${site.url}/og.png`,
    ...(site.logo.src ? { logo: `${site.url}${site.logo.src}` } : {}),
    priceRange: "À partir de 3 000 FCFA",
    currenciesAccepted: "XOF",
    address: {
      "@type": "PostalAddress",
      ...(station.streetAddress ? { streetAddress: station.streetAddress } : {}),
      addressLocality: `${station.district}, ${station.city}`,
      addressRegion: station.city,
      addressCountry: station.countryCode,
    },
    ...(station.geo
      ? { geo: { "@type": "GeoCoordinates", latitude: station.geo.lat, longitude: station.geo.lng } }
      : {}),
    ...(station.mapsPlaceUrl ? { hasMap: station.mapsPlaceUrl } : {}),
    containedInPlace: { "@type": "GasStation", name: station.name },
    areaServed: { "@type": "City", name: "Dakar" },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: `${oh}:${om}`,
        closes: `${ch}:${cm}`,
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Forfaits de lavage",
      itemListElement: forfaits.map((f) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: `Lavage ${f.name}` },
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: f.priceFrom,
          priceCurrency: "XOF",
        },
      })),
    },
    ...(Object.values(site.social).some(Boolean)
      ? { sameAs: Object.values(site.social).filter(Boolean) }
      : {}),
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Accueil", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}
