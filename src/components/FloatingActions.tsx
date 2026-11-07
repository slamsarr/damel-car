"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, Phone } from "lucide-react";
import { defaultWaLink, telLink } from "@/lib/whatsapp";
import { WhatsAppGlyph } from "./Brand";

/**
 * - Mobile : barre fixe (Appeler · Réserver) + bouton WhatsApp flottant intégré à droite.
 *   Le body réserve la hauteur de la barre (globals.css), rien n'est masqué.
 * - Ordinateur : bouton WhatsApp flottant en bas à droite.
 */
export function FloatingActions() {
  const pathname = usePathname();
  const onBooking = pathname === "/reservation";

  return (
    <>
      {/* Bouton WhatsApp flottant — ordinateur */}
      <a
        href={defaultWaLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Nous écrire sur WhatsApp"
        className="group fixed bottom-6 right-6 z-40 hidden h-14 items-center gap-3 rounded-full bg-[#25D366] pl-4 pr-5 font-extrabold text-ink-900 shadow-[0_12px_40px_-10px_rgba(37,211,102,.7)] transition hover:-translate-y-0.5 lg:inline-flex"
      >
        <WhatsAppGlyph className="h-6 w-6" />
        <span className="text-[14px]">WhatsApp</span>
      </a>

      {/* Barre d'actions — mobile */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink-900/92 backdrop-blur-xl lg:hidden pb-safe">
        <div className="mx-auto flex h-[var(--mobilebar-h)] max-w-xl items-center gap-2 px-3">
          <a href={telLink()} className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-white/15 text-[13px] font-extrabold uppercase tracking-wider">
            <Phone className="h-4 w-4 text-lime" aria-hidden="true" /> Appeler
          </a>
          {!onBooking && (
            <Link href="/reservation" className="flex h-12 flex-[1.4] items-center justify-center gap-2 rounded-full bg-lime text-[13px] font-extrabold uppercase tracking-wider text-ink-900">
              <CalendarCheck className="h-4 w-4" aria-hidden="true" /> Réserver
            </Link>
          )}
          <a
            href={defaultWaLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Nous écrire sur WhatsApp"
            className={`flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] text-ink-900 ${
              onBooking ? "flex-1 text-[13px] font-extrabold uppercase tracking-wider" : "w-12 shrink-0"
            }`}
          >
            <WhatsAppGlyph className="h-6 w-6" />
            {onBooking && "WhatsApp"}
          </a>
        </div>
      </div>
    </>
  );
}
