"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X, Clock, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { mainStation, nav, promotion } from "@/config/site";
import { defaultWaLink, telLink } from "@/lib/whatsapp";
import { WhatsAppGlyph } from "./Brand";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {promotion.active && promotion.text && (
        <div className="bg-lime px-4 py-2 text-center text-[13px] font-bold text-ink-900">
          {promotion.href ? <Link href={promotion.href}>{promotion.text}</Link> : promotion.text}
        </div>
      )}
      <header
        className={`sticky top-0 z-40 transition-colors duration-300 ${
          scrolled || open ? "border-b border-white/[.07] bg-ink-900/85 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="container-site flex h-[var(--header-h)] items-center justify-between gap-4">
          <Link href="/" className="shrink-0" aria-label="DAMEL CAR CARE — accueil">
            <Logo />
          </Link>

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((n) => {
                const active = pathname === n.href;
                return (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      aria-current={active ? "page" : undefined}
                      className={`rounded-full px-4 py-2 text-[14px] font-semibold transition ${
                        active ? "bg-white/10 text-white" : "text-ink-200 hover:text-white"
                      }`}
                    >
                      {n.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={telLink()}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-[14px] font-bold text-ink-200 transition hover:text-white xl:inline-flex"
            >
              <Phone className="h-4 w-4 text-lime" aria-hidden="true" />
              {mainStation.phoneDisplay}
            </a>
            <Link href="/reservation" className="btn-primary hidden !min-h-[42px] !px-5 sm:inline-flex">
              Réserver
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div
            id="mobile-menu"
            className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 overflow-y-auto bg-ink-900 lg:hidden"
          >
            <nav aria-label="Menu mobile" className="container-site flex flex-col gap-1 py-6">
              <Link href="/" className="rounded-2xl px-4 py-4 text-[20px] font-extrabold" aria-current={pathname === "/" ? "page" : undefined}>
                Accueil
              </Link>
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={pathname === n.href ? "page" : undefined}
                  className={`rounded-2xl px-4 py-4 text-[20px] font-extrabold ${
                    pathname === n.href ? "bg-white/[.06] text-lime" : ""
                  }`}
                >
                  {n.label}
                </Link>
              ))}
              <div className="mt-6 grid gap-3">
                <Link href="/reservation" className="btn-primary w-full">Réserver mon lavage</Link>
                <a href={defaultWaLink()} target="_blank" rel="noopener noreferrer" className="btn-wa w-full">
                  <WhatsAppGlyph /> WhatsApp
                </a>
                <a href={telLink()} className="btn-ghost w-full">
                  <Phone className="h-4 w-4" aria-hidden="true" /> {mainStation.phoneDisplay}
                </a>
              </div>
              <div className="mt-8 space-y-2 px-1 text-[14px] text-ink-300">
                <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-lime" aria-hidden="true" />{mainStation.name}, {mainStation.city}</p>
                <p className="flex items-center gap-2"><Clock className="h-4 w-4 text-lime" aria-hidden="true" />{mainStation.hours.days}, {mainStation.hours.label}</p>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
