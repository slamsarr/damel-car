import Image from "next/image";
import { site } from "@/config/site";

/**
 * Logo DAMEL CAR CARE.
 * Dès que le fichier officiel est déposé dans /public/brand/ et renseigné dans
 * config/site.ts (site.logo.src), il remplace automatiquement ce bloc typographique.
 * Le bloc typographique n'est pas un logo : c'est un affichage provisoire du nom.
 */
export function Logo({ compact = false }: { compact?: boolean }) {
  if (site.logo.src) {
    return (
      <Image
        src={site.logo.src}
        alt={site.name}
        width={site.logo.width}
        height={site.logo.height}
        priority
        className="h-9 w-auto sm:h-10"
      />
    );
  }
  return (
    <span className="flex flex-col leading-none" aria-label={site.name}>
      <span className="text-[17px] font-extrabold tracking-[0.14em] text-white sm:text-[19px]">
        DAMEL<span className="text-lime"> CAR CARE</span>
      </span>
      {!compact && (
        <span className="mt-1 text-[9.5px] font-semibold uppercase tracking-[0.3em] text-violet-200/80">
          {site.signature}
        </span>
      )}
    </span>
  );
}

/** Mention de la station d'accueil (STAR ÉNERGIE), volontairement discrète. */
export function HostBadge({ className = "" }: { className?: string }) {
  if (site.hostLogo.src) {
    return (
      <span className={`inline-flex items-center gap-2 ${className}`}>
        <span className="text-[11px] uppercase tracking-[0.2em] text-ink-300">À la station</span>
        <Image src={site.hostLogo.src} alt={site.hostLogo.alt} width={90} height={24} className="h-5 w-auto opacity-90" />
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ink-300 ${className}`}>
      À la station <strong className="font-extrabold text-ink-200">STAR ÉNERGIE</strong>
    </span>
  );
}
