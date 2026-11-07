import Link from "next/link";
import { ArrowRight, Check, Clock, MapPin, Minus, Navigation, Phone, Plus } from "lucide-react";
import {
  avantages,
  avis,
  comparatif,
  faq,
  formatFCFA,
  forfaits,
  mainStation,
  photos,
  pricingNote,
  site,
  type Forfait,
  type Service,
} from "@/config/site";
import { buildServiceRequest, defaultWaLink, telLink, waLink } from "@/lib/whatsapp";
import { Icon } from "./Icon";
import { Photo } from "./Visual";
import { WhatsAppGlyph } from "./Brand";
import { HostBadge } from "./Logo";

/* ---------- JSON-LD ---------- */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/* ---------- En-tête de page intérieure ---------- */
export function PageHero({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate -mt-[var(--header-h)] overflow-hidden pt-[var(--header-h)]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_90%_at_85%_0%,rgba(75,31,122,.75),transparent_60%),radial-gradient(50%_60%_at_0%_100%,rgba(75,31,122,.35),transparent_70%)]" />
      <div className="absolute inset-0 -z-10 bg-grain" />
      <div className="container-site pb-14 pt-14 sm:pb-20 sm:pt-20">
        <p className="eyebrow animate-fade-up">{eyebrow}</p>
        <h1 className="h-display mt-5 max-w-3xl animate-fade-up text-[40px] [animation-delay:80ms] sm:text-[58px]">{title}</h1>
        {text && (
          <p className="mt-5 max-w-2xl animate-fade-up text-[17px] leading-relaxed text-ink-200 [animation-delay:160ms] sm:text-[18px]">
            {text}
          </p>
        )}
        {children && <div className="mt-8 animate-fade-up [animation-delay:240ms]">{children}</div>}
      </div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  text,
  center = false,
  id,
}: {
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
  center?: boolean;
  id?: string;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className={`eyebrow ${center ? "justify-center" : ""}`}>{eyebrow}</p>
      <h2 id={id} className="h-display mt-4 text-[32px] sm:text-[44px]">{title}</h2>
      {text && <p className="mt-4 text-[16px] leading-relaxed text-ink-300 sm:text-[17px]">{text}</p>}
    </div>
  );
}

/* ---------- Forfaits ---------- */
export function forfaitBookingHref(f: Forfait) {
  return `/reservation?service=lavage&forfait=${f.id}`;
}

export function ForfaitCard({ f, showAll = true }: { f: Forfait; showAll?: boolean }) {
  const items = showAll ? f.items : f.items.slice(0, 5);
  const msg = `Bonjour ${site.name},\n\nJe souhaite réserver un lavage ${f.name} (à partir de ${formatFCFA(f.priceFrom)}).\n\nMerci de me communiquer vos disponibilités.`;
  return (
    <article
      className={`card card-hover relative flex flex-col p-7 sm:p-8 ${
        f.highlight ? "border-lime/40 bg-gradient-to-b from-violet-500/40 to-white/[.02] lg:-translate-y-3 lg:hover:-translate-y-4" : ""
      }`}
    >
      {f.highlight && (
        <span className="absolute -top-3 left-7 rounded-full bg-lime px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-ink-900">
          Le plus demandé
        </span>
      )}
      <h3 className="text-[13px] font-extrabold uppercase tracking-[0.22em] text-violet-200">Forfait {f.name}</h3>
      <p className="mt-4 flex items-baseline gap-2">
        <span className="text-[13px] font-semibold text-ink-300">À partir de</span>
      </p>
      <p className="text-[40px] font-extrabold leading-none tracking-tight">
        {new Intl.NumberFormat("fr-FR").format(f.priceFrom).replace(/ /g, " ")}
        <span className="ml-1.5 text-[16px] font-bold text-lime">FCFA</span>
      </p>
      <p className="mt-4 text-[15px] leading-relaxed text-ink-300">{f.tagline}</p>
      <ul className="mt-6 flex-1 space-y-3 border-t border-white/[.08] pt-6">
        {items.map((it) => (
          <li key={it} className="flex gap-3 text-[15px] text-ink-200">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime" aria-hidden="true" />
            {it}
          </li>
        ))}
        {!showAll && f.items.length > items.length && (
          <li className="pl-7 text-[14px] text-ink-300">+ {f.items.length - items.length} autres prestations</li>
        )}
      </ul>
      <div className="mt-8 grid gap-3">
        <Link href={forfaitBookingHref(f)} className={f.highlight ? "btn-primary" : "btn-ghost"}>
          Réserver ce forfait
        </Link>
        <a href={waLink(msg)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 text-[13px] font-bold uppercase tracking-wider text-ink-200 hover:text-lime">
          <WhatsAppGlyph className="h-4 w-4" /> Réserver sur WhatsApp
        </a>
      </div>
    </article>
  );
}

export function Forfaits({ showAll = true }: { showAll?: boolean }) {
  return (
    <>
      <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-5">
        {forfaits.map((f) => (
          <ForfaitCard key={f.id} f={f} showAll={showAll} />
        ))}
      </div>
      <p className="mt-6 text-[14px] text-ink-300">{pricingNote}</p>
    </>
  );
}

export function Comparatif() {
  const cell = (v: boolean | string) =>
    v === true ? (
      <Check className="mx-auto h-5 w-5 text-lime" aria-label="Inclus" />
    ) : v === false ? (
      <Minus className="mx-auto h-4 w-4 text-ink-400" aria-label="Non inclus" />
    ) : (
      <span className="text-[13px] font-semibold text-ink-200">{v}</span>
    );
  return (
    <div className="card mt-10 overflow-x-auto">
      <table className="w-full min-w-[560px] text-left">
        <caption className="sr-only">Comparatif des forfaits de lavage</caption>
        <thead>
          <tr className="border-b border-white/[.08] text-[12px] uppercase tracking-[0.18em] text-ink-300">
            <th scope="col" className="px-5 py-5 font-bold">Prestation</th>
            {forfaits.map((f) => (
              <th key={f.id} scope="col" className="px-3 py-5 text-center font-bold">
                <span className={f.highlight ? "text-lime" : "text-white"}>{f.name}</span>
                <span className="mt-1 block text-[11px] normal-case tracking-normal text-ink-300">dès {formatFCFA(f.priceFrom)}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparatif.map((r) => (
            <tr key={r.label} className="border-b border-white/[.05] last:border-0">
              <th scope="row" className="px-5 py-4 text-[15px] font-semibold text-ink-200">{r.label}</th>
              <td className="px-3 py-4 text-center">{cell(r.simple)}</td>
              <td className="px-3 py-4 text-center">{cell(r.semi)}</td>
              <td className="px-3 py-4 text-center">{cell(r.complet)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-white/[.06] px-5 py-4 text-[13px] text-ink-300">* Selon intervention. {pricingNote}</p>
    </div>
  );
}

/* ---------- Services (entretien / complémentaires) ---------- */
export function ServiceGrid({ services, bookingService }: { services: Service[]; bookingService: string }) {
  const list = services.filter((s) => s.available !== false);
  return (
    <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((s) => (
        <li key={s.id} className="card card-hover group flex flex-col p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <span
              className={`grid h-14 w-14 place-items-center rounded-2xl border ${
                s.brand === "cepsa" ? "border-cepsa/40 bg-cepsa/10" : "border-violet-300/25 bg-violet-500/30"
              }`}
            >
              <Icon name={s.icon} className={`h-6 w-6 ${s.brand === "cepsa" ? "text-cepsa" : "text-lime"}`} />
            </span>
            {s.onQuote && (
              <span className="rounded-full border border-white/12 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-300">
                Sur devis
              </span>
            )}
          </div>
          <h3 className="mt-6 text-[20px] font-extrabold">{s.name}</h3>
          <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-300">{s.description}</p>
          {s.price && <p className="mt-4 font-bold text-lime">{s.price}</p>}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link
              href={`/reservation?service=${bookingService}&detail=${encodeURIComponent(s.name)}`}
              className="inline-flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-wider text-lime"
            >
              Demander un rendez-vous <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <a
              href={waLink(buildServiceRequest(s.name))}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Demander ${s.name} sur WhatsApp`}
              className="inline-flex items-center gap-1.5 text-[13px] font-bold text-ink-300 hover:text-white"
            >
              <WhatsAppGlyph className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Avantages ---------- */
export function Avantages() {
  return (
    <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/[.08] bg-white/[.08] sm:grid-cols-2 lg:grid-cols-3">
      {avantages.map((a) => (
        <li key={a.title} className="bg-ink-800 p-7">
          <Icon name={a.icon} className="h-6 w-6 text-lime" />
          <h3 className="mt-5 text-[18px] font-extrabold">{a.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-300">{a.text}</p>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Galerie ---------- */
export function Gallery() {
  const g = photos.gallery;
  return (
    <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
      {g.map((p, i) => (
        <li key={i} className={i === 0 ? "col-span-2 lg:row-span-2" : ""}>
          <Photo
            src={p.src}
            alt={p.alt}
            icon={["Droplet", "Car", "CircleDot", "FlaskConical", "Armchair", "Sparkles"][i % 6]}
            sizes="(max-width: 1024px) 50vw, 33vw"
            className={`rounded-3xl border border-white/[.08] ${i === 0 ? "aspect-[16/10] lg:aspect-auto lg:h-full" : "aspect-square sm:aspect-[4/3]"}`}
          />
        </li>
      ))}
    </ul>
  );
}

/* ---------- Avis (affichés uniquement s'ils existent) ---------- */
export function Avis() {
  if (!avis.length) return null;
  return (
    <section className="py-20 sm:py-28" aria-labelledby="avis-title">
      <div className="container-site">
        <SectionHead eyebrow="Avis clients" title="Ils nous font confiance" id="avis-title" />
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {avis.map((a, i) => (
            <li key={i} className="card p-7">
              <blockquote className="text-[16px] leading-relaxed text-ink-200">« {a.text} »</blockquote>
              <p className="mt-5 text-[14px] font-bold">{a.author} <span className="font-normal text-ink-300">· {a.source}</span></p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
export function Faq() {
  return (
    <div className="mt-10 divide-y divide-white/[.08] rounded-3xl border border-white/[.08]">
      {faq.map((f) => (
        <details key={f.q} className="group px-6 sm:px-8 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[17px] font-bold">
            {f.q}
            <Plus className="h-5 w-5 shrink-0 text-lime transition group-open:rotate-45" aria-hidden="true" />
          </summary>
          <p className="-mt-1 pb-6 text-[15px] leading-relaxed text-ink-300">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/* ---------- Station ---------- */
export function StationBlock() {
  const s = mainStation;
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Photo
        src={photos.station.src}
        alt={photos.station.alt}
        icon="MapPin"
        className="aspect-[4/3] rounded-3xl border border-white/[.08]"
      />
      <div>
        <p className="eyebrow">La station</p>
        <h2 className="h-display mt-4 text-[32px] sm:text-[44px]">
          Au cœur de <span className="text-lime">Hann Maristes</span>
        </h2>
        <p className="mt-5 text-[16px] leading-relaxed text-ink-300 sm:text-[17px]">
          DAMEL CAR CARE vous accueille au sein de la {s.name}. Faites le plein, laissez votre véhicule entre nos mains
          et repartez avec une voiture propre, contrôlée et entretenue.
        </p>
        <HostBadge className="mt-5" />
        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="card p-5">
            <dt className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] text-ink-300"><Clock className="h-4 w-4 text-lime" aria-hidden="true" />Horaires</dt>
            <dd className="mt-2 text-[16px] font-bold">{s.hours.days}<br />{s.hours.label}</dd>
          </div>
          <div className="card p-5">
            <dt className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] text-ink-300"><Phone className="h-4 w-4 text-lime" aria-hidden="true" />Téléphone & WhatsApp</dt>
            <dd className="mt-2 text-[16px] font-bold"><a href={telLink()} className="hover:text-lime">{s.phoneDisplay}</a></dd>
          </div>
        </dl>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/contact" className="btn-ghost"><Navigation className="h-4 w-4" aria-hidden="true" />Itinéraire & contact</Link>
        </div>
      </div>
    </div>
  );
}

/* ---------- Bandeau d'appel à réserver ---------- */
export function CtaBand({ title = "Réservez votre lavage en moins d'une minute.", text }: { title?: string; text?: string }) {
  return (
    <section className="py-16 sm:py-24">
      <div className="container-site">
        <div className="relative isolate overflow-hidden rounded-[32px] border border-lime/25 bg-violet-500 px-6 py-14 sm:px-14 sm:py-16">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_120%_at_100%_0%,rgba(182,240,0,.28),transparent_55%),radial-gradient(70%_90%_at_0%_100%,rgba(21,9,35,.9),transparent_70%)]" />
          <div className="absolute -right-10 top-1/2 -z-10 hidden h-[200%] w-24 -translate-y-1/2 rotate-[20deg] bg-white/10 sm:block" />
          <p className="eyebrow">{site.slogan}</p>
          <h2 className="h-display mt-4 max-w-2xl text-[32px] sm:text-[46px]">{title}</h2>
          <p className="mt-4 max-w-xl text-[16px] text-violet-50/80">
            {text ?? `Choisissez votre prestation, votre créneau, et confirmez sur WhatsApp. ${site.bookingDisclaimer}`}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/reservation" className="btn-primary">Réserver mon lavage <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            <a href={defaultWaLink()} target="_blank" rel="noopener noreferrer" className="btn-ghost"><WhatsAppGlyph /> Écrire sur WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Bandeau infos pratiques ---------- */
export function InfoStrip() {
  const s = mainStation;
  return (
    <ul className="grid gap-3 text-[14px] sm:grid-cols-3">
      <li>
        <a href={defaultWaLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-900/60 px-4 py-3 backdrop-blur transition hover:border-lime/50">
          <WhatsAppGlyph className="h-5 w-5 shrink-0 text-[#25D366]" />
          <span><span className="block text-[11px] uppercase tracking-[0.18em] text-ink-300">WhatsApp</span><strong>{s.phoneDisplay}</strong></span>
        </a>
      </li>
      <li className="flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-900/60 px-4 py-3 backdrop-blur">
        <Clock className="h-5 w-5 shrink-0 text-lime" aria-hidden="true" />
        <span><span className="block text-[11px] uppercase tracking-[0.18em] text-ink-300">{s.hours.days}</span><strong>{s.hours.label}</strong></span>
      </li>
      <li>
        <Link href="/contact" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-900/60 px-4 py-3 backdrop-blur transition hover:border-lime/50">
          <MapPin className="h-5 w-5 shrink-0 text-lime" aria-hidden="true" />
          <span><span className="block text-[11px] uppercase tracking-[0.18em] text-ink-300">Station STAR ÉNERGIE</span><strong>Hann Maristes, Dakar</strong></span>
        </Link>
      </li>
    </ul>
  );
}
