import { mainStation, site } from "@/config/site";
import { pageMeta } from "@/lib/seo";

export const metadata = { ...pageMeta({ title: "Politique de confidentialité", description: `Comment ${site.name} traite les données transmises via le site et WhatsApp.`, path: "/confidentialite" }), robots: { index: false } };

export default function Confidentialite() {
  return (
    <article className="container-site max-w-3xl py-16 sm:py-24">
      <h1 className="h-display text-[38px] sm:text-[48px]">Politique de confidentialité</h1>
      <div className="mt-10 space-y-8 text-[16px] leading-relaxed text-ink-200 [&_h2]:mb-3 [&_h2]:text-[20px] [&_h2]:font-extrabold [&_h2]:text-white [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
        <section>
          <h2>Aucune donnée enregistrée par le site</h2>
          <p>
            Le site {site.name} ne crée pas de compte client et n'enregistre pas vos informations dans une base de données.
            Les formulaires (réservation, devis, contact) servent uniquement à préparer un message WhatsApp sur votre appareil.
            Rien n'est transmis tant que vous n'appuyez pas vous-même sur « Envoyer » dans WhatsApp.
          </p>
        </section>
        <section>
          <h2>Données transmises via WhatsApp</h2>
          <p>Lorsque vous envoyez le message, nous recevons les informations que vous avez saisies :</p>
          <ul>
            <li>nom et numéro de téléphone ;</li>
            <li>type et modèle du véhicule ;</li>
            <li>prestation, date et heure souhaitées ;</li>
            <li>vos éventuels commentaires.</li>
          </ul>
          <p className="mt-3">
            Elles sont utilisées uniquement pour traiter votre demande, confirmer le rendez-vous et assurer le suivi de la prestation.
            Elles ne sont ni vendues ni cédées. Les échanges sont soumis aux conditions d'utilisation de WhatsApp (Meta).
          </p>
        </section>
        <section>
          <h2>Vos droits</h2>
          <p>
            Conformément à la loi sénégalaise n° 2008-12 sur la protection des données à caractère personnel, vous pouvez demander
            l'accès, la rectification ou la suppression de vos données en nous contactant au {mainStation.phoneDisplay}.
            Vous pouvez également saisir la Commission de Protection des Données Personnelles (CDP).
          </p>
        </section>
        <section>
          <h2>Cookies et mesure d'audience</h2>
          <p>
            Le site n'utilise aucun cookie publicitaire ni traceur. La carte Google Maps de la page Contact est fournie par Google,
            qui peut déposer ses propres cookies lors de son affichage. Si un outil de mesure d'audience est ajouté, cette page sera mise à jour
            et votre consentement sera demandé lorsque la réglementation l'exige.
          </p>
        </section>
      </div>
    </article>
  );
}
