import Link from "next/link";
import { CtaBand, JsonLd, PageHero, ServiceGrid } from "@/components/Sections";
import { complementaires } from "@/config/site";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Services complémentaires : moteur, sièges, optiques",
  description:
    "Lavage et soufflage moteur, nettoyage du radiateur, sièges et tapis, plastiques et cuirs, rénovation des optiques, brillance des pneus et désodorisation à Hann Maristes, Dakar.",
  path: "/services-complementaires",
});

export default function ComplementairesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services complémentaires"
        title={<>Le détail qui fait <span className="text-lime">la différence.</span></>}
        text="Moteur, habitacle, optiques, pneus : des soins ciblés à ajouter à votre forfait ou à réserver seuls. Certaines prestations sont proposées sur devis, selon l'état du véhicule."
      >
        <Link href="/reservation?service=complementaire" className="btn-primary">Demander une prestation</Link>
      </PageHero>
      <section className="pb-16" aria-label="Liste des services complémentaires">
        <div className="container-site">
          <ServiceGrid services={complementaires} bookingService="complementaire" />
          <p className="mt-8 text-[14px] text-ink-300">
            Les prestations marquées « Sur devis » sont chiffrées après examen du véhicule. Les autres tarifs sont communiqués sur WhatsApp.
          </p>
        </div>
      </section>
      <CtaBand />
      <JsonLd data={breadcrumbJsonLd([{ name: "Services complémentaires", path: "/services-complementaires" }])} />
    </>
  );
}
