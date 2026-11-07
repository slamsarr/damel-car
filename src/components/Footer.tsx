import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { HostBadge, Logo } from "./Logo";
import { WhatsAppGlyph } from "./Brand";
import { activeStations, nav, site } from "@/config/site";
import { defaultWaLink, telLink } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="relative border-t border-white/[.07] bg-ink-900">
      <div className="container-site grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink-300">{site.slogan}</p>
          <HostBadge className="mt-5" />
        </div>

        <nav aria-label="Pied de page">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-ink-300">Prestations</h2>
          <ul className="mt-4 space-y-3 text-[15px]">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-ink-200 transition hover:text-lime">{n.label}</Link>
              </li>
            ))}
            <li><Link href="/reservation" className="text-ink-200 transition hover:text-lime">Réservation</Link></li>
          </ul>
        </nav>

        {activeStations.map((s) => (
          <address key={s.id} className="not-italic">
            <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-ink-300">Nous trouver</h2>
            <ul className="mt-4 space-y-3 text-[15px] text-ink-200">
              <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lime" aria-hidden="true" />{s.name}, {s.city}</li>
              <li className="flex gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-lime" aria-hidden="true" />{s.hours.days}, {s.hours.label}</li>
              <li><a href={telLink(s)} className="flex gap-3 hover:text-lime"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-lime" aria-hidden="true" />{s.phoneDisplay}</a></li>
              <li><a href={defaultWaLink(s)} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-lime"><WhatsAppGlyph className="mt-0.5 h-4 w-4 shrink-0 text-lime" />WhatsApp {s.phoneDisplay}</a></li>
            </ul>
          </address>
        ))}
      </div>
      <div className="border-t border-white/[.06]">
        <div className="container-site flex flex-col gap-3 py-6 text-[13px] text-ink-300 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. Tous droits réservés.</p>
          <p className="flex gap-5">
            <Link href="/mentions-legales" className="hover:text-white">Mentions légales</Link>
            <Link href="/confidentialite" className="hover:text-white">Confidentialité</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
