import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, Check } from "lucide-react";
import {
  Avantages,
  Avis,
  CtaBand,
  Faq,
  Forfaits,
  Gallery,
  InfoStrip,
  JsonLd,
  SectionHead,
  StationBlock,
} from "@/components/Sections";
import { HeroCar } from "@/components/Visual";
import { HostBadge } from "@/components/Logo";
import { Icon } from "@/components/Icon";
import { entretien, formatFCFA, packsEntreprises, photos, site } from "@/config/site";
import { faqJsonLd, pageMeta } from "@/lib/seo";

export const metadata = {
  ...pageMeta({
    title: "Lavage auto & entretien à Hann Maristes, Dakar",
    description:
      "DAMEL CAR CARE : lavage premium et entretien automobile à la station STAR ÉNERGIE Hann Maristes, Dakar. Forfaits dès 3 000 FCFA, vidange CEPSA, abonnements flottes. Réservez sur WhatsApp.",
    path: "/",
  }),
  title: { absolute: `${site.name} | Lavage auto & entretien à Hann Maristes, Dakar` },
};

export default function Home() {
  const entretienPreview = entretien.filter((s) => s.available !== false).slice(0, 6);

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative isolate -mt-[var(--header-h)] overflow-hidden pt-[var(--header-h)]">
        {photos.hero.src ? (
          <>
            <Image src={photos.hero.src} alt={photos.hero.alt} fill priority sizes="100vw" className="-z-20 object-cover" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-900 via-ink-900/70 to-ink-900/30" />
          </>
        ) : (
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(60%_70%_at_75%_30%,rgba(124,79,179,.7),transparent_70%),radial-gradient(50%_50%_at_10%_90%,rgba(75,31,122,.55),transparent_70%)]" />
            <div className="absolute inset-0 bg-grain" />
            <div className="absolute bottom-0 h-40 w-full bg-gradient-to-t from-ink-900 to-transparent" />
          </div>
        )}

        <div className="container-site grid items-center gap-10 pb-12 pt-10 sm:pt-16 lg:min-h-[calc(100svh-var(--header-h))] lg:grid-cols-[1.05fr_1fr] lg:pb-16">
          <div>
            <HostBadge className="animate-fade-up" />
            <h1 className="mt-5 animate-fade-up [animation-delay:60ms]">
              <span className="h-display block text-[46px] sm:text-[72px] lg:text-[84px]">
                DAMEL <span className="text-lime">CAR CARE</span>
              </span>
              <span className="mt-4 block text-[20px] font-bold leading-snug text-violet-50 sm:text-[26px]">
                Lavage premium &amp; entretien automobile à Dakar
              </span>
            </h1>
            <p className="mt-5 max-w-xl animate-fade-up text-[16px] leading-relaxed text-ink-200 [animation-delay:140ms] sm:text-[18px]">
              Offrez à votre véhicule un entretien professionnel, un lavage soigné et une expérience de service
              exceptionnelle à la station STAR ÉNERGIE Hann Maristes.
            </p>
            <div className="mt-8 flex animate-fade-up flex-col gap-3 [animation-delay:220ms] sm:flex-row">
              <Link href="/reservation?service=lavage" className="btn-primary">
                Réserver mon lavage <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/lavage" className="btn-ghost">Découvrir nos services</Link>
            </div>
          </div>

          {!photos.hero.src && (
            <div className="relative order-first -mx-4 animate-fade-up sm:mx-0 lg:order-none">
              <div className="animate-drift">
                <HeroCar className="w-full drop-shadow-[0_30px_60px_rgba(75,31,122,.6)]" />
              </div>
              <p className="pointer-events-none absolute -bottom-2 right-4 hidden text-[13px] font-semibold italic text-violet-200/70 sm:block">
                « {site.slogan} »
              </p>
            </div>
          )}

          <div className="lg:col-span-2">
            <InfoStrip />
          </div>
        </div>
      </section>

      {/* ============ FORFAITS ============ */}
      <section className="py-20 sm:py-28" aria-labelledby="forfaits-title">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHead
              id="forfaits-title"
              eyebrow="Lavage automobile"
              title={<>Trois forfaits.<br className="hidden sm:block" /> Un seul niveau d'exigence.</>}
            />
            <Link href="/lavage" className="inline-flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-wider text-lime">
              Comparer les forfaits <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <Forfaits showAll={false} />
        </div>
      </section>

      {/* ============ ENTRETIEN ============ */}
      <section className="relative overflow-hidden border-y border-white/[.06] bg-ink-800 py-20 sm:py-28" aria-labelledby="entretien-title">
        <div className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-violet-500/30 blur-[120px]" aria-hidden="true" />
        <div className="container-site relative">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <SectionHead
                id="entretien-title"
                eyebrow="Entretien automobile"
                title={<>{site.sloganEntretien}</>}
                text="Vidange avec lubrifiants CEPSA, filtres, freins, batterie, pneumatiques et climatisation : l'entretien courant de votre véhicule, au même endroit que votre lavage."
              />
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/reservation?service=entretien" className="btn-primary">Prendre rendez-vous</Link>
                <Link href="/entretien" className="btn-ghost">Voir l'entretien</Link>
              </div>
            </div>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {entretienPreview.map((s) => (
                <li key={s.id}>
                  <Link href="/entretien" className="card card-hover flex h-full flex-col p-5">
                    <Icon name={s.icon} className={`h-6 w-6 ${s.brand === "cepsa" ? "text-cepsa" : "text-lime"}`} />
                    <span className="mt-4 text-[15px] font-bold leading-snug">{s.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============ AVANTAGES ============ */}
      <section className="py-20 sm:py-28" aria-labelledby="avantages-title">
        <div className="container-site">
          <SectionHead id="avantages-title" eyebrow="Pourquoi DAMEL CAR CARE" title="Le soin du détail, la simplicité en plus." />
          <Avantages />
        </div>
      </section>

      {/* ============ ABONNEMENTS ============ */}
      <section className="pb-20 sm:pb-28" aria-labelledby="abos-title">
        <div className="container-site">
          <div className="card relative overflow-hidden p-7 sm:p-12">
            <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-violet-500/40 blur-[100px]" aria-hidden="true" />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
              <div>
                <p className="eyebrow">Abonnements</p>
                <h2 id="abos-title" className="h-display mt-4 text-[32px] sm:text-[42px]">Entreprises, flottes et particuliers.</h2>
                <p className="mt-4 text-[16px] leading-relaxed text-ink-300">
                  Des véhicules toujours présentables, un budget maîtrisé et la priorité au service. Formules sur mesure dès plusieurs véhicules.
                </p>
                <Link href="/abonnements" className="btn-primary mt-8">
                  <Building2 className="h-4 w-4" aria-hidden="true" /> Voir les abonnements
                </Link>
              </div>
              <ul className="grid gap-3 sm:grid-cols-3">
                {packsEntreprises.map((p) => (
                  <li key={p.id} className={`rounded-2xl border p-5 ${p.highlight ? "border-lime/50 bg-lime/[.06]" : "border-white/10 bg-ink-900/50"}`}>
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-violet-200">{p.name}</p>
                    <p className="mt-3 whitespace-nowrap text-[22px] font-extrabold leading-none">
                      {p.pricePerMonth ? formatFCFA(p.pricePerMonth).replace(" FCFA", "") : "Sur devis"}
                      <span className="ml-1 text-[12px] font-bold text-lime">FCFA/mois</span>
                    </p>
                    <ul className="mt-4 space-y-2">
                      {p.items.slice(0, 2).map((i) => (
                        <li key={i} className="flex gap-2 text-[13px] text-ink-200"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lime" aria-hidden="true" />{i}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ GALERIE ============ */}
      <section className="pb-20 sm:pb-28" aria-labelledby="galerie-title">
        <div className="container-site">
          <SectionHead id="galerie-title" eyebrow="Galerie" title="Notre savoir-faire en images." />
          <Gallery />
        </div>
      </section>

      {/* ============ STATION ============ */}
      <section className="border-y border-white/[.06] bg-ink-800 py-20 sm:py-28">
        <div className="container-site"><StationBlock /></div>
      </section>

      <Avis />

      {/* ============ FAQ ============ */}
      <section className="py-20 sm:py-28" aria-labelledby="faq-title">
        <div className="container-site max-w-4xl">
          <SectionHead id="faq-title" eyebrow="Questions fréquentes" title="Tout savoir avant de venir." />
          <Faq />
        </div>
      </section>
      <JsonLd data={faqJsonLd()} />

      <CtaBand />
    </>
  );
}
