import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd, PageHero } from "@/components/Sections";
import { WhatsAppGlyph } from "@/components/Brand";
import { HostBadge } from "@/components/Logo";
import { activeStations, site } from "@/config/site";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { defaultWaLink, telLink } from "@/lib/whatsapp";

export const metadata = pageMeta({
  title: "Contact & localisation — Station STAR ÉNERGIE Hann Maristes",
  description:
    "Contactez DAMEL CAR CARE : +221 77 628 83 42 (téléphone et WhatsApp). Station STAR ÉNERGIE Hann Maristes, Dakar. Ouvert tous les jours de 09h00 à 21h00.",
  path: "/contact",
});

const embedUrl = (q: string) => `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
const directionsUrl = (q: string, placeUrl?: string) =>
  placeUrl || `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`;

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact & localisation"
        title={<>Retrouvez-nous à <span className="text-lime">Hann Maristes.</span></>}
        text={`${site.name} vous accueille au sein de la station STAR ÉNERGIE Hann Maristes, à Dakar, tous les jours de 09h00 à 21h00.`}
      />
      {activeStations.map((s) => (
        <section key={s.id} className="pb-16" aria-labelledby={`station-${s.id}`}>
          <div className="container-site grid gap-6 lg:grid-cols-[1fr_1.25fr]">
            <div className="space-y-6">
              <address className="card p-6 not-italic sm:p-8">
                <h2 id={`station-${s.id}`} className="text-[24px] font-extrabold">{site.name}</h2>
                <HostBadge className="mt-2" />
                <ul className="mt-6 space-y-4 text-[16px] text-ink-200">
                  <li className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-lime" aria-hidden="true" />{s.name}, {s.city}, {s.country}</li>
                  <li className="flex gap-3"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-lime" aria-hidden="true" /><span>Téléphone : <a href={telLink(s)} className="font-bold text-white hover:text-lime">{s.phoneDisplay}</a></span></li>
                  <li className="flex gap-3"><WhatsAppGlyph className="mt-0.5 h-5 w-5 shrink-0 text-lime" /><span>WhatsApp : <a href={defaultWaLink(s)} target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:text-lime">{s.phoneDisplay}</a></span></li>
                  <li className="flex gap-3"><Clock className="mt-0.5 h-5 w-5 shrink-0 text-lime" aria-hidden="true" />{s.hours.days}, de {s.hours.label.replace("–", "à")}</li>
                </ul>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <a href={telLink(s)} className="btn-ghost !px-4"><Phone className="h-4 w-4" aria-hidden="true" />Appeler</a>
                  <a href={defaultWaLink(s)} target="_blank" rel="noopener noreferrer" className="btn-wa !px-4"><WhatsAppGlyph className="h-4 w-4" />WhatsApp</a>
                  <a href={directionsUrl(s.mapsQuery, s.mapsPlaceUrl)} target="_blank" rel="noopener noreferrer" className="btn-primary !px-4"><Navigation className="h-4 w-4" aria-hidden="true" />Itinéraire</a>
                </div>
              </address>
              <ContactForm />
            </div>
            <div className="card min-h-[360px] overflow-hidden lg:min-h-full">
              <iframe
                title={`Carte : ${s.name}`}
                src={embedUrl(s.mapsQuery)}
                className="h-full min-h-[360px] w-full border-0 grayscale-[.3]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      ))}
      <JsonLd data={breadcrumbJsonLd([{ name: "Contact", path: "/contact" }])} />
    </>
  );
}
