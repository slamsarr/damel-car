"use client";

import { useId, useState } from "react";
import { Check, Send } from "lucide-react";
import { abonnementParticuliers, formatFCFA, forfaits, packsEntreprises, site } from "@/config/site";
import {
  buildFleetMessage,
  buildSubscriptionMessage,
  clean,
  validateFleet,
  waLink,
  type FleetInput,
} from "@/lib/whatsapp";
import { WhatsAppGlyph } from "./Brand";

type Tab = "particuliers" | "entreprises";

export function SubscriptionTabs({ initial = "entreprises" as Tab }) {
  const [tab, setTab] = useState<Tab>(initial);
  const tabs: { id: Tab; label: string }[] = [
    { id: "particuliers", label: "Particuliers" },
    { id: "entreprises", label: "Entreprises & flottes" },
  ];
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const next = tab === "particuliers" ? "entreprises" : "particuliers";
      setTab(next);
      document.getElementById(`tab-${next}`)?.focus();
    }
  };

  return (
    <div>
      <div role="tablist" aria-label="Type d'abonnement" className="inline-flex w-full rounded-full border border-white/10 bg-ink-700 p-1.5 sm:w-auto" onKeyDown={onKey}>
        {tabs.map((t) => (
          <button
            key={t.id}
            id={`tab-${t.id}`}
            role="tab"
            type="button"
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            tabIndex={tab === t.id ? 0 : -1}
            onClick={() => setTab(t.id)}
            className={`min-h-[46px] flex-1 rounded-full px-5 text-[13px] font-extrabold uppercase tracking-wider transition sm:flex-none sm:px-8 ${
              tab === t.id ? "bg-lime text-ink-900" : "text-ink-200 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div id="panel-entreprises" role="tabpanel" aria-labelledby="tab-entreprises" hidden={tab !== "entreprises"} className="mt-10">
        <Entreprises />
      </div>
      <div id="panel-particuliers" role="tabpanel" aria-labelledby="tab-particuliers" hidden={tab !== "particuliers"} className="mt-10">
        <Particuliers />
      </div>
    </div>
  );
}

function Entreprises() {
  return (
    <>
      <div className="grid gap-6 lg:grid-cols-3 lg:gap-5">
        {packsEntreprises.map((p) => (
          <article
            key={p.id}
            className={`card relative flex flex-col p-7 sm:p-8 ${p.highlight ? "border-lime/40 bg-gradient-to-b from-violet-500/40 to-white/[.02]" : ""}`}
          >
            {p.highlight && (
              <span className="absolute -top-3 left-7 rounded-full bg-lime px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-ink-900">
                Recommandé
              </span>
            )}
            <h3 className="text-[13px] font-extrabold uppercase tracking-[0.22em] text-violet-200">{p.name}</h3>
            <p className="mt-5 text-[38px] font-extrabold leading-none tracking-tight">
              {p.pricePerMonth ? formatFCFA(p.pricePerMonth).replace(" FCFA", "") : "Sur devis"}
              {p.pricePerMonth && <span className="ml-1.5 text-[15px] font-bold text-lime">FCFA / mois</span>}
            </p>
            <ul className="mt-6 flex-1 space-y-3 border-t border-white/[.08] pt-6">
              {p.items.map((it) => (
                <li key={it} className="flex gap-3 text-[15px] text-ink-200">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime" aria-hidden="true" />
                  {it}
                </li>
              ))}
            </ul>
            {p.notes && (
              <div className="mt-5 space-y-1 text-[12.5px] text-ink-300">
                {p.notes.map((n) => <p key={n}>{n}</p>)}
              </div>
            )}
            <a
              href={waLink(buildSubscriptionMessage(`${p.name}${p.pricePerMonth ? ` — ${formatFCFA(p.pricePerMonth)}/mois` : ""}`, "Entreprise"))}
              target="_blank"
              rel="noopener noreferrer"
              className={`${p.highlight ? "btn-primary" : "btn-ghost"} mt-8`}
            >
              Demander un abonnement
            </a>
          </article>
        ))}
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div>
          <p className="eyebrow">Flottes automobiles</p>
          <h3 className="h-display mt-4 text-[30px] sm:text-[38px]">Une formule sur mesure pour vos véhicules.</h3>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-300">
            Taxis, VTC, véhicules de société, utilitaires : indiquez le nombre de véhicules et vos besoins. Nous vous proposons une offre adaptée, avec la priorité au service.
          </p>
          <ul className="mt-6 space-y-3 text-[15px] text-ink-200">
            {["Tarifs dégressifs selon le volume", "Planning de passage dédié", "Lavage et entretien regroupés", "Un interlocuteur sur WhatsApp"].map((t) => (
              <li key={t} className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-lime" aria-hidden="true" />{t}</li>
            ))}
          </ul>
        </div>
        <FleetForm />
      </div>
    </>
  );
}

function Particuliers() {
  const { options, intro } = abonnementParticuliers;
  const [forfait, setForfait] = useState(options.forfaits[0]);
  const [freq, setFreq] = useState(options.frequences[1]);
  const [entretienOpt, setEntretienOpt] = useState(false);
  const label = `${freq} — forfait ${forfait}${entretienOpt ? " + suivi entretien (vidange, contrôles)" : ""}`;

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
      <div>
        <h3 className="text-[22px] font-extrabold">À la carte</h3>
        <p className="mt-2 text-[15px] text-ink-300">Sans engagement, réglez à chaque passage.</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          {forfaits.map((f) => (
            <li key={f.id} className="card p-5">
              <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-violet-200">{f.name}</p>
              <p className="mt-2 text-[13px] text-ink-300">À partir de</p>
              <p className="text-[22px] font-extrabold">{formatFCFA(f.priceFrom)}</p>
            </li>
          ))}
        </ul>
      </div>

      <form
        className="card p-6 sm:p-8"
        onSubmit={(e) => {
          e.preventDefault();
          window.open(waLink(buildSubscriptionMessage(label, "Particulier")), "_blank", "noopener,noreferrer");
        }}
      >
        <h3 className="text-[22px] font-extrabold">Abonnement mensuel</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-300">{intro}</p>

        <fieldset className="mt-6">
          <legend className="label">Forfait</legend>
          <div className="flex flex-wrap gap-2">
            {options.forfaits.map((o) => (
              <label key={o}>
                <input type="radio" name="forfait" className="peer sr-only" checked={forfait === o} onChange={() => setForfait(o)} />
                <span className="chip">{o}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="mt-5">
          <legend className="label">Fréquence</legend>
          <div className="flex flex-wrap gap-2">
            {options.frequences.map((o) => (
              <label key={o}>
                <input type="radio" name="freq" className="peer sr-only" checked={freq === o} onChange={() => setFreq(o)} />
                <span className="chip">{o}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className="mt-5 flex cursor-pointer items-center gap-3 text-[15px] text-ink-200">
          <input type="checkbox" checked={entretienOpt} onChange={(e) => setEntretienOpt(e.target.checked)} className="h-5 w-5 accent-lime" />
          Ajouter le suivi d'entretien
        </label>
        <p className="mt-6 rounded-2xl bg-ink-900/60 px-4 py-3 text-[14px] text-ink-200">
          Votre formule : <strong className="text-white">{label}</strong>
          <span className="mt-1 block text-ink-300">Tarif proposé par notre équipe sur WhatsApp.</span>
        </p>
        <button type="submit" className="btn-primary mt-6 w-full">
          <WhatsAppGlyph /> Demander un abonnement
        </button>
      </form>
    </div>
  );
}

function FleetForm() {
  const id = useId();
  const [f, setF] = useState<FleetInput>({ company: "", contact: "", phone: "", vehicles: "", needs: "Lavage", comments: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FleetInput, string>>>({});
  const set = (k: keyof FleetInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((s) => ({ ...s, [k]: e.target.value }));

  const field = (k: keyof FleetInput, label: string, props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <div>
      <label htmlFor={`${id}-${k}`} className="label">{label}</label>
      <input
        id={`${id}-${k}`}
        className="field"
        value={f[k] ?? ""}
        onChange={set(k)}
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `${id}-${k}-err` : undefined}
        {...props}
      />
      {errors[k] && <p id={`${id}-${k}-err`} className="err">{errors[k]}</p>}
    </div>
  );

  return (
    <form
      noValidate
      className="card p-6 sm:p-8"
      aria-labelledby={`${id}-title`}
      onSubmit={(e) => {
        e.preventDefault();
        const errs = validateFleet(f);
        setErrors(errs);
        if (Object.keys(errs).length) {
          document.getElementById(`${id}-${Object.keys(errs)[0]}`)?.focus();
          return;
        }
        window.open(waLink(buildFleetMessage(f)), "_blank", "noopener,noreferrer");
      }}
    >
      <h3 id={`${id}-title`} className="text-[22px] font-extrabold">Demande de devis flotte</h3>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {field("company", "Entreprise *", { autoComplete: "organization", maxLength: 100 })}
        {field("contact", "Nom du contact *", { autoComplete: "name", maxLength: 80 })}
        {field("phone", "Téléphone *", { type: "tel", inputMode: "tel", autoComplete: "tel", placeholder: "77 123 45 67", maxLength: 20 })}
        {field("vehicles", "Nombre de véhicules *", { inputMode: "numeric", pattern: "[0-9]*", maxLength: 4 })}
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-needs`} className="label">Besoins</label>
          <select id={`${id}-needs`} className="field" value={f.needs} onChange={set("needs")}>
            <option>Lavage</option>
            <option>Lavage + entretien</option>
            <option>Entretien uniquement</option>
            {packsEntreprises.map((p) => <option key={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-comments`} className="label">Précisions (facultatif)</label>
          <textarea id={`${id}-comments`} rows={3} className="field" value={f.comments} onChange={set("comments")} maxLength={500} placeholder="Types de véhicules, fréquence souhaitée…" />
        </div>
      </div>
      <button type="submit" className="btn-primary mt-6 w-full">
        <Send className="h-4 w-4" aria-hidden="true" /> Envoyer ma demande sur WhatsApp
      </button>
      <p className="mt-3 text-center text-[13px] text-ink-300">
        WhatsApp s'ouvre avec votre demande préremplie : il vous reste à l'envoyer. {clean(site.name)} vous recontacte.
      </p>
    </form>
  );
}
