import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-site flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="eyebrow">Erreur 404</p>
      <h1 className="h-display mt-4 text-[40px] sm:text-[56px]">Cette page a pris la mauvaise sortie.</h1>
      <p className="mt-4 text-[17px] text-ink-300">Revenez à l'accueil ou réservez directement votre lavage.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-ghost">Accueil</Link>
        <Link href="/reservation" className="btn-primary">Réserver</Link>
      </div>
    </section>
  );
}
