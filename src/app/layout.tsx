import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { JsonLd } from "@/components/Sections";
import { businessJsonLd } from "@/lib/seo";
import { site } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Lavage auto & entretien à Hann Maristes, Dakar`,
    template: `%s | ${site.name}`,
  },
  description:
    "Lavage automobile premium et entretien à la station STAR ÉNERGIE Hann Maristes, Dakar. Forfaits dès 3 000 FCFA, vidange CEPSA, abonnements entreprises. Ouvert 7j/7, 9h–21h. Réservation WhatsApp.",
  applicationName: site.name,
  formatDetection: { telephone: true },
  verification: site.verification.google ? { google: site.verification.google } : undefined,
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#0A0B0F",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-SN">
      <body>
        <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:font-bold focus:text-ink-900">
          Aller au contenu
        </a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <FloatingActions />
        <JsonLd data={businessJsonLd()} />
      </body>
    </html>
  );
}
