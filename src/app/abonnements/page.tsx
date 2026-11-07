import { CtaBand, JsonLd, PageHero } from "@/components/Sections";
import { SubscriptionTabs } from "@/components/Subscriptions";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Abonnements lavage entreprises, flottes & particuliers",
  description:
    "Abonnements lavage à Dakar : Pack Silver 20 000 FCFA/mois, Gold 34 000 FCFA/mois, Premium 80 000 FCFA/mois. Formules sur mesure pour flottes automobiles et abonnements particuliers.",
  path: "/abonnements",
});

export default async function AbonnementsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  return (
    <>
      <PageHero
        eyebrow="Abonnements"
        title={<>Des véhicules impeccables, <span className="text-lime">tout le mois.</span></>}
        text="Priorité au service, budget maîtrisé et véhicules toujours présentables : choisissez la formule adaptée à votre entreprise, à votre flotte ou à votre usage personnel."
      />
      <section className="pb-12">
        <div className="container-site">
          <SubscriptionTabs initial={type === "particuliers" ? "particuliers" : "entreprises"} />
        </div>
      </section>
      <CtaBand title="Une question sur nos abonnements ?" text="Écrivez-nous sur WhatsApp : nous vous répondons avec une proposition adaptée." />
      <JsonLd data={breadcrumbJsonLd([{ name: "Abonnements", path: "/abonnements" }])} />
    </>
  );
}
