import { mainStation, site } from "@/config/site";
import { pageMeta } from "@/lib/seo";

export const metadata = { ...pageMeta({ title: "Mentions légales", description: `Mentions légales du site ${site.name}.`, path: "/mentions-legales" }), robots: { index: false } };

export default function MentionsLegales() {
  return (
    <article className="container-site max-w-3xl py-16 sm:py-24">
      <h1 className="h-display text-[38px] sm:text-[48px]">Mentions légales</h1>
      <div className="mt-10 space-y-8 text-[16px] leading-relaxed text-ink-200 [&_h2]:mb-3 [&_h2]:text-[20px] [&_h2]:font-extrabold [&_h2]:text-white">
        <section>
          <h2>Éditeur du site</h2>
          <p>
            {site.name} — {site.signature}<br />
            {mainStation.name}, {mainStation.city}, {mainStation.country}<br />
            Téléphone : {mainStation.phoneDisplay}<br />
            {/* À COMPLÉTER : forme juridique, NINEA, RCCM, adresse du siège, directeur de la publication */}
            Forme juridique, NINEA et RCCM : à compléter.<br />
            Directeur de la publication : à compléter.
          </p>
        </section>
        <section>
          <h2>Hébergement</h2>
          <p>À compléter selon l'hébergeur retenu (ex. Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis).</p>
        </section>
        <section>
          <h2>Marques</h2>
          <p>
            {site.name} et son logo sont la propriété de leur titulaire. STAR ÉNERGIE et CEPSA sont des marques de leurs titulaires respectifs,
            citées pour indiquer le lieu d'exercice et les produits utilisés.
          </p>
        </section>
        <section>
          <h2>Tarifs</h2>
          <p>Les prix affichés sont des tarifs de départ, en francs CFA, susceptibles de varier selon le véhicule et son état. Seule la confirmation de notre équipe vaut engagement.</p>
        </section>
      </div>
    </article>
  );
}
