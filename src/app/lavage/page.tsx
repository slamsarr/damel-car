import { Comparatif, CtaBand, Forfaits, JsonLd, PageHero, SectionHead } from "@/components/Sections";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import Link from "next/link";

export const metadata = pageMeta({
  title: "Lavage automobile à Dakar — Forfaits dès 3 000 FCFA",
  description:
    "Lavage auto à Hann Maristes, Dakar : forfaits Simple (dès 3 000 FCFA), Semi complet (dès 7 000 FCFA) et Complet (dès 15 000 FCFA). Intérieur, sièges, vitres. Réservation WhatsApp.",
  path: "/lavage",
});

export default function LavagePage() {
  return (
    <>
      <PageHero
        eyebrow="Lavage automobile"
        title={<>Un véhicule propre fait toujours <span className="text-lime">bonne impression.</span></>}
        text="Trois forfaits pour chaque besoin, de l'entretien régulier au nettoyage général en profondeur. À la station STAR ÉNERGIE Hann Maristes, tous les jours de 9h à 21h."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/reservation?service=lavage" className="btn-primary">Réserver mon lavage</Link>
          <a href="#comparatif" className="btn-ghost">Comparer les forfaits</a>
        </div>
      </PageHero>

      <section className="pb-12" aria-label="Forfaits de lavage">
        <div className="container-site">
          <Forfaits />
        </div>
      </section>

      <section className="py-16 sm:py-24" aria-labelledby="comparatif">
        <div className="container-site">
          <SectionHead id="comparatif" eyebrow="Comparatif" title="Quel forfait pour votre véhicule ?" text="Le forfait Simple pour un entretien régulier, le Semi complet pour un intérieur net sans démontage, le Complet pour une remise à neuf." />
          <Comparatif />
        </div>
      </section>

      <CtaBand title="Votre créneau, votre forfait, en quelques secondes." />
      <JsonLd data={breadcrumbJsonLd([{ name: "Lavage automobile", path: "/lavage" }])} />
    </>
  );
}
