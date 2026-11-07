import Link from "next/link";
import { CtaBand, JsonLd, PageHero, SectionHead, ServiceGrid } from "@/components/Sections";
import { entretien, site } from "@/config/site";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Entretien automobile & vidange à Hann Maristes",
  description:
    "Vidange moteur avec lubrifiants CEPSA, filtres à huile, air et carburant, freins, batterie, pneumatiques, équilibrage et climatisation à Hann Maristes, Dakar. Prenez rendez-vous sur WhatsApp.",
  path: "/entretien",
});

export default function EntretienPage() {
  return (
    <>
      <PageHero
        eyebrow="Entretien automobile"
        title={<>{site.sloganEntretien.replace(" va plus vite.", "")} <span className="text-lime">va plus vite.</span></>}
        text="Vidange, filtres, freins, batterie, pneumatiques et climatisation : l'entretien courant de votre véhicule, réalisé pendant votre passage à la station."
      >
        <Link href="/reservation?service=entretien" className="btn-primary">Prendre rendez-vous</Link>
      </PageHero>

      <section className="pb-12" aria-label="Prestations d'entretien">
        <div className="container-site">
          <div className="card flex flex-col gap-4 border-cepsa/30 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-[0.2em] text-cepsa">Lubrifiants CEPSA</p>
              <p className="mt-2 max-w-2xl text-[16px] text-ink-200">
                Nos vidanges sont réalisées avec des lubrifiants CEPSA, sélectionnés selon la motorisation et les préconisations de votre véhicule.
              </p>
            </div>
            <Link href="/reservation?service=entretien&detail=Vidange%20moteur" className="btn-ghost shrink-0">Réserver une vidange</Link>
          </div>
          <ServiceGrid services={entretien} bookingService="entretien" />
          <p className="mt-8 text-[14px] text-ink-300">
            Tarifs communiqués sur demande selon le véhicule, les pièces et les lubrifiants nécessaires.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-site">
          <SectionHead eyebrow="Le bon réflexe" title="Lavage + entretien, en un seul passage." text="Profitez de votre vidange pour faire laver votre véhicule : vous repartez avec un moteur entretenu et une voiture impeccable." />
        </div>
      </section>

      <CtaBand title="Planifiez votre entretien dès maintenant." />
      <JsonLd data={breadcrumbJsonLd([{ name: "Entretien automobile", path: "/entretien" }])} />
    </>
  );
}
