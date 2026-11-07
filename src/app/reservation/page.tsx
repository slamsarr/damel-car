import { Clock, MapPin, Phone } from "lucide-react";
import { BookingForm } from "@/components/BookingForm";
import { JsonLd } from "@/components/Sections";
import { WhatsAppGlyph } from "@/components/Brand";
import { mainStation, site } from "@/config/site";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { defaultWaLink, telLink } from "@/lib/whatsapp";

export const metadata = pageMeta({
  title: "Réserver un lavage ou un entretien",
  description:
    "Réservez votre lavage ou entretien automobile à la station STAR ÉNERGIE Hann Maristes en moins d'une minute, sans compte. Confirmation par notre équipe sur WhatsApp.",
  path: "/reservation",
});

export default async function ReservationPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; forfait?: string; detail?: string }>;
}) {
  const sp = await searchParams;
  const s = mainStation;
  return (
    <>
      <section className="relative isolate">
        <div className="absolute inset-x-0 -top-[var(--header-h)] -z-10 h-[520px] bg-[radial-gradient(60%_80%_at_80%_0%,rgba(75,31,122,.7),transparent_70%)]" aria-hidden="true" />
        <div className="container-site grid gap-10 pb-16 pt-10 sm:pt-14 lg:grid-cols-[1fr_1.6fr] lg:gap-14">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:self-start">
            <p className="eyebrow">Réservation</p>
            <h1 className="h-display mt-4 text-[38px] sm:text-[52px]">
              Réservez en <span className="text-lime">moins d'une minute.</span>
            </h1>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-200">
              Sans compte, sans attente : remplissez le formulaire, WhatsApp s'ouvre avec votre demande. {site.bookingDisclaimer}
            </p>
            <ul className="mt-8 hidden space-y-3 text-[15px] text-ink-200 lg:block">
              <li className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-lime" aria-hidden="true" />{s.name}, {s.city}</li>
              <li className="flex gap-3"><Clock className="h-5 w-5 shrink-0 text-lime" aria-hidden="true" />{s.hours.days}, {s.hours.label}</li>
              <li><a href={telLink()} className="flex gap-3 hover:text-lime"><Phone className="h-5 w-5 shrink-0 text-lime" aria-hidden="true" />{s.phoneDisplay}</a></li>
              <li><a href={defaultWaLink()} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-lime"><WhatsAppGlyph className="h-5 w-5 shrink-0 text-lime" />Une question ? Écrivez-nous</a></li>
            </ul>
          </div>
          <BookingForm initialService={sp.service} initialForfait={sp.forfait} detail={sp.detail} />
        </div>
      </section>
      <JsonLd data={breadcrumbJsonLd([{ name: "Réservation", path: "/reservation" }])} />
    </>
  );
}
