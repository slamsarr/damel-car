# DAMEL CAR CARE — Site officiel

Site vitrine Next.js 15 · TypeScript · Tailwind CSS · Lucide Icons.
Lavage & entretien automobile — Station STAR ÉNERGIE Hann Maristes, Dakar.

## Pages

| URL | Contenu |
|---|---|
| `/` | Accueil : hero, forfaits, entretien, avantages, abonnements, galerie, station, FAQ, appel à réserver |
| `/lavage` | 3 forfaits + tableau comparatif |
| `/entretien` | Vidange CEPSA, filtres, freins, batterie, pneus, équilibrage, clim, préventif |
| `/services-complementaires` | Moteur, radiateur, sièges, optiques… (mention « Sur devis ») |
| `/abonnements` | Onglets Particuliers / Entreprises & flottes, packs Silver/Gold/Premium, devis flotte |
| `/reservation` | Formulaire → message WhatsApp prérempli |
| `/contact` | Coordonnées, carte Google Maps, Appeler / WhatsApp / Itinéraire, formulaire WhatsApp |
| `/mentions-legales`, `/confidentialite` | Pages légales (à compléter : NINEA, RCCM, hébergeur) |
| `/sitemap.xml`, `/robots.txt` | Générés automatiquement |

Liens profonds utiles : `/reservation?service=lavage&forfait=complet`, `/reservation?service=entretien&detail=Vidange%20moteur`, `/abonnements?type=particuliers`.

## Modifier le contenu — un seul fichier

**`src/config/site.ts`** : téléphone, WhatsApp, horaires, stations, forfaits et prix, comparatif, prestations d'entretien et complémentaires, packs d'abonnement, bandeau promotionnel, avis clients, FAQ, photos.

Exemples :
- Changer un prix : `forfaits → priceFrom`.
- Activer le parallélisme : `entretien → parallelisme → available: true`.
- Afficher une promo : `promotion = { active: true, text: "…", href: "/reservation" }`.
- Ouvrir **Ndiakhirate** : dans `stations`, compléter l'entrée `ndiakhirate` et passer `active: true`. Elle apparaît automatiquement dans le formulaire, le pied de page, la page Contact et les données Schema.org.
- Ajouter un avis : uniquement des avis authentiques, dans `avis`.

## Logo et photos (à fournir)

Aucun logo n'a été inventé. Tant que le fichier officiel n'est pas fourni, le nom s'affiche en typographie.

1. Déposer le logo dans `public/brand/` (SVG de préférence), puis renseigner `site.logo.src` (et `width`/`height`).
2. Logo STAR ÉNERGIE (facultatif) : `site.hostLogo.src`.
3. Photos authentiques dans `public/photos/` (JPG/PNG, Next.js les convertit en AVIF/WebP), puis renseigner `photos.hero`, `photos.station`, `photos.gallery`. Hero : 2400×1400 px minimum.
4. Remplacer `public/icon.svg` (favicon provisoire) par une version du logo.

## Fonctionnement WhatsApp

`src/lib/whatsapp.ts` : validation (champs obligatoires, date non passée, heure entre 09h00 et 20h30, fuseau Africa/Dakar), nettoyage des saisies, génération du message et du lien `https://wa.me/221776288342?text=…`. Le client envoie lui-même le message ; le site rappelle que le rendez-vous est confirmé par l'équipe. Aucune donnée n'est stockée.

## Développement

```bash
npm install
npm run dev          # http://localhost:3000
npm test             # tests unitaires (liens, validation, messages)
npm run build && npm start
python3 tests/e2e.py http://localhost:3000   # parcours (Playwright Python + Chrome)
```

## Mise en ligne (Vercel, recommandé)

1. Créer un dépôt GitHub et y pousser le dossier.
2. Sur vercel.com : *Add New → Project*, importer le dépôt (framework détecté automatiquement).
3. Variables d'environnement :
   - `NEXT_PUBLIC_SITE_URL` = `https://www.votre-domaine.sn` (obligatoire : canonical, sitemap, Open Graph)
   - `NEXT_PUBLIC_GSC_VERIFICATION` = code de vérification Google Search Console (facultatif)
4. *Deploy*, puis *Settings → Domains* pour brancher le domaine (enregistrements DNS fournis par Vercel).

Alternative : tout hébergeur Node.js 18+ (`npm run build && npm start`), ou un VPS avec PM2 + Nginx.

## Après la mise en ligne

1. **Google Business Profile** : créer/revendiquer la fiche « DAMEL CAR CARE » (catégorie *Station de lavage auto*, au sein de la station STAR ÉNERGIE Hann Maristes), mêmes nom, téléphone et horaires que le site. Une fois validée, copier son lien dans `stations[0].mapsPlaceUrl` et, si besoin, ajuster `mapsQuery` pour que la carte pointe la fiche exacte. Renseigner `geo` uniquement avec des coordonnées vérifiées.
2. **Google Search Console** : ajouter le domaine, vérifier, soumettre `https://votre-domaine/sitemap.xml`.
3. Tester les données structurées sur https://search.google.com/test/rich-results.
4. Compléter les mentions légales (NINEA, RCCM, directeur de publication, hébergeur).
5. Si un outil d'audience est ajouté, mettre à jour `/confidentialite` et prévoir le consentement.
