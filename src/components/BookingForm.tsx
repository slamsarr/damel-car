"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ArrowUpRight, CalendarDays, CheckCircle2, Info } from "lucide-react";
import {
  activeStations,
  bookingServices,
  formatFCFA,
  forfaits,
  site,
  vehicleTypes,
} from "@/config/site";
import {
  buildBookingMessage,
  nowInDakar,
  timeSlots,
  toMinutes,
  validateBooking,
  waLink,
  type BookingErrors,
  type BookingInput,
} from "@/lib/whatsapp";
import { WhatsAppGlyph } from "./Brand";

type Props = { initialService?: string; initialForfait?: string; detail?: string };

const addDays = (iso: string, n: number) => {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + n));
  return dt.toISOString().slice(0, 10);
};

export function BookingForm({ initialService, initialForfait, detail }: Props) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const validService = bookingServices.find((s) => s.id === initialService);
  const validForfait = forfaits.find((f) => f.id === initialForfait);

  const [serviceId, setServiceId] = useState(validService?.id ?? (validForfait ? "lavage" : ""));
  const [forfaitId, setForfaitId] = useState(validForfait?.id ?? "");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    vehicleType: "",
    vehicleModel: "",
    detail: detail?.slice(0, 80) ?? "",
    date: "",
    time: "",
    stationId: activeStations[0]?.id ?? "",
    comments: "",
    consent: false,
  });
  const [errors, setErrors] = useState<BookingErrors>({});
  const [today, setToday] = useState<{ date: string; minutes: number } | null>(null);
  const [sentLink, setSentLink] = useState<string | null>(null);

  useEffect(() => setToday(nowInDakar()), []);

  const service = bookingServices.find((s) => s.id === serviceId);
  const station = activeStations.find((s) => s.id === form.stationId) ?? activeStations[0];
  const slots = useMemo(() => timeSlots(station), [station]);
  const availableSlots = useMemo(() => {
    if (!today || form.date !== today.date) return slots;
    return slots.filter((s) => toMinutes(s) > today.minutes);
  }, [slots, today, form.date]);

  // Si l'heure choisie n'est plus disponible pour la date choisie, on la réinitialise.
  useEffect(() => {
    if (form.time && !availableSlots.includes(form.time)) setForm((f) => ({ ...f, time: "" }));
  }, [availableSlots, form.time]);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k as keyof BookingErrors]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const forfait = forfaits.find((f) => f.id === forfaitId);
  const toInput = (): BookingInput => ({
    name: form.name,
    phone: form.phone,
    vehicleType: form.vehicleType,
    vehicleModel: form.vehicleModel,
    service: service ? [service.label, form.detail].filter(Boolean).join(" — ") : "",
    forfait: service?.hasForfait && forfait ? `${forfait.name} — à partir de ${formatFCFA(forfait.priceFrom)}` : "",
    date: form.date,
    time: form.time,
    stationId: form.stationId,
    comments: form.comments,
    consent: form.consent,
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = toInput();
    const errs = validateBooking(input);
    setErrors(errs);
    const keys = Object.keys(errs) as (keyof BookingErrors)[];
    if (keys.length) {
      const order: (keyof BookingErrors)[] = ["name", "phone", "vehicleType", "service", "date", "time", "stationId", "consent"];
      const first = order.find((k) => errs[k]) ?? keys[0];
      formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
      return;
    }
    const link = waLink(buildBookingMessage(input), station.whatsapp);
    setSentLink(link);
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const err = (k: keyof BookingErrors) =>
    errors[k] ? <p id={`${id}-${k}-err`} className="err" role="alert">{errors[k]}</p> : null;
  const aria = (k: keyof BookingErrors) => ({
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `${id}-${k}-err` : undefined,
    "data-field": k,
  });

  if (sentLink) {
    return (
      <div className="card p-7 text-center sm:p-10" role="status">
        <CheckCircle2 className="mx-auto h-12 w-12 text-lime" aria-hidden="true" />
        <h2 className="mt-5 text-[26px] font-extrabold">Plus qu'une étape : envoyez le message</h2>
        <p className="mx-auto mt-3 max-w-md text-[16px] leading-relaxed text-ink-200">
          WhatsApp s'est ouvert avec votre demande préremplie. Appuyez sur <strong>Envoyer</strong> dans WhatsApp pour nous la transmettre.
        </p>
        <p className="mx-auto mt-4 max-w-md rounded-2xl border border-lime/30 bg-lime/[.06] px-4 py-3 text-[15px] font-semibold text-lime">
          {site.bookingDisclaimer}
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={sentLink} target="_blank" rel="noopener noreferrer" className="btn-wa">
            <WhatsAppGlyph /> WhatsApp ne s'est pas ouvert ?
          </a>
          <button type="button" onClick={() => setSentLink(null)} className="btn-ghost">Modifier ma demande</button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-8" aria-describedby={`${id}-note`}>
      {/* 1. Prestation */}
      <fieldset className="card p-6 sm:p-8">
        <legend className="sr-only">Prestation</legend>
        <Step n={1} title="Votre prestation" />
        <div className="mt-6 grid gap-5">
          <div>
            <label htmlFor={`${id}-service`} className="label">Service souhaité *</label>
            <select
              id={`${id}-service`}
              className="field"
              value={serviceId}
              onChange={(e) => { setServiceId(e.target.value); setErrors((x) => ({ ...x, service: undefined })); }}
              {...aria("service")}
            >
              <option value="" disabled>Choisir un service</option>
              {bookingServices.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
            {err("service")}
          </div>

          {service?.hasForfait && (
            <fieldset>
              <legend className="label">Forfait souhaité</legend>
              <div className="grid grid-cols-3 gap-2">
                {forfaits.map((f) => (
                  <label key={f.id} className="block">
                    <input type="radio" name="forfait" value={f.id} checked={forfaitId === f.id} onChange={() => setForfaitId(f.id)} className="peer sr-only" />
                    <span className="flex h-full cursor-pointer flex-col rounded-2xl border border-white/12 bg-white/[.03] px-3 py-3 transition sm:px-4 hover:border-white/30 peer-checked:border-lime peer-checked:bg-lime/10 peer-focus-visible:ring-2 peer-focus-visible:ring-lime">
                      <span className="text-[12px] font-extrabold leading-tight tracking-wide sm:text-[13px]">{f.name}</span>
                      <span className="mt-1 text-[12px] text-ink-300 sm:text-[13px]">dès {formatFCFA(f.priceFrom)}</span>
                    </span>
                  </label>
                ))}
              </div>
              <p className="mt-2 text-[13px] text-ink-300">Facultatif : nous pouvons vous conseiller sur place.</p>
            </fieldset>
          )}

          {service && !service.hasForfait && (
            <div>
              <label htmlFor={`${id}-detail`} className="label">Précisez la prestation (facultatif)</label>
              <input id={`${id}-detail`} className="field" value={form.detail} onChange={(e) => set("detail", e.target.value)} maxLength={80} placeholder="Ex. Vidange moteur, Pack Gold, rénovation des optiques…" />
            </div>
          )}
        </div>
      </fieldset>

      {/* 2. Véhicule */}
      <fieldset className="card p-6 sm:p-8">
        <legend className="sr-only">Véhicule</legend>
        <Step n={2} title="Votre véhicule" />
        <div className="mt-6 grid gap-5">
          <fieldset>
            <legend className="label" id={`${id}-vt`}>Type de véhicule *</legend>
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-labelledby={`${id}-vt`} aria-describedby={errors.vehicleType ? `${id}-vehicleType-err` : undefined}>
              {vehicleTypes.map((v, i) => (
                <label key={v}>
                  <input
                    type="radio"
                    name="vehicleType"
                    value={v}
                    checked={form.vehicleType === v}
                    onChange={() => set("vehicleType", v)}
                    className="peer sr-only"
                    {...(i === 0 ? { "data-field": "vehicleType" } : {})}
                  />
                  <span className="chip">{v}</span>
                </label>
              ))}
            </div>
            {err("vehicleType")}
          </fieldset>
          <div>
            <label htmlFor={`${id}-model`} className="label">Marque et modèle (facultatif)</label>
            <input id={`${id}-model`} className="field" value={form.vehicleModel} onChange={(e) => set("vehicleModel", e.target.value)} maxLength={80} placeholder="Ex. Toyota Corolla" autoComplete="off" />
          </div>
        </div>
      </fieldset>

      {/* 3. Créneau */}
      <fieldset className="card p-6 sm:p-8">
        <legend className="sr-only">Date et heure</legend>
        <Step n={3} title="Votre créneau" />
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {activeStations.length > 0 && (
            <div className="sm:col-span-2">
              <label htmlFor={`${id}-station`} className="label">Station *</label>
              <select id={`${id}-station`} className="field" value={form.stationId} onChange={(e) => set("stationId", e.target.value)} {...aria("stationId")}>
                {activeStations.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              {err("stationId")}
            </div>
          )}
          <div>
            <label htmlFor={`${id}-date`} className="label">Date souhaitée *</label>
            <input
              id={`${id}-date`}
              type="date"
              className="field [color-scheme:dark]"
              value={form.date}
              min={today?.date}
              onChange={(e) => set("date", e.target.value)}
              {...aria("date")}
            />
            {today && (
              <div className="mt-2 flex gap-2">
                {[["Aujourd'hui", 0], ["Demain", 1]].map(([l, n]) => {
                  const d = addDays(today.date, n as number);
                  return (
                    <button key={l} type="button" onClick={() => set("date", d)} className={`rounded-full border px-3 py-1.5 text-[13px] font-semibold transition ${form.date === d ? "border-lime text-lime" : "border-white/12 text-ink-200 hover:border-white/30"}`}>
                      {l}
                    </button>
                  );
                })}
              </div>
            )}
            {err("date")}
          </div>
          <div>
            <label htmlFor={`${id}-time`} className="label">Heure souhaitée *</label>
            <select id={`${id}-time`} className="field" value={form.time} onChange={(e) => set("time", e.target.value)} {...aria("time")}>
              <option value="">{availableSlots.length ? "Choisir une heure" : "Plus de créneau aujourd'hui"}</option>
              {availableSlots.map((s) => <option key={s} value={s}>{s.replace(":", "h")}</option>)}
            </select>
            <p className="mt-2 flex items-center gap-1.5 text-[13px] text-ink-300">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" /> {station.hours.days}, {station.hours.label}
            </p>
            {err("time")}
          </div>
        </div>
      </fieldset>

      {/* 4. Coordonnées */}
      <fieldset className="card p-6 sm:p-8">
        <legend className="sr-only">Coordonnées</legend>
        <Step n={4} title="Vos coordonnées" />
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${id}-name`} className="label">Nom et prénom *</label>
            <input id={`${id}-name`} className="field" value={form.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" maxLength={80} {...aria("name")} />
            {err("name")}
          </div>
          <div>
            <label htmlFor={`${id}-phone`} className="label">Téléphone *</label>
            <input id={`${id}-phone`} type="tel" inputMode="tel" className="field" value={form.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" placeholder="77 123 45 67" maxLength={20} {...aria("phone")} />
            {err("phone")}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={`${id}-comments`} className="label">Commentaires ou demandes particulières (facultatif)</label>
            <textarea id={`${id}-comments`} rows={3} className="field" value={form.comments} onChange={(e) => set("comments", e.target.value)} maxLength={500} />
          </div>
          <div className="sm:col-span-2">
            <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-relaxed text-ink-200">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => set("consent", e.target.checked)}
                className="mt-0.5 h-5 w-5 shrink-0 accent-lime"
                {...aria("consent")}
              />
              <span>
                J'accepte que mes informations soient transmises à {site.name} via WhatsApp pour traiter ma demande de réservation.{" "}
                <a href="/confidentialite" className="underline underline-offset-2 hover:text-lime">Confidentialité</a>
              </span>
            </label>
            {err("consent")}
          </div>
        </div>
      </fieldset>

      <div className="space-y-4">
        <p id={`${id}-note`} className="flex items-start gap-3 rounded-2xl border border-lime/25 bg-lime/[.05] px-4 py-3 text-[14px] text-ink-200">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-lime" aria-hidden="true" />
          <span>
            WhatsApp s'ouvrira avec votre demande préremplie : vous l'envoyez vous-même.{" "}
            <strong className="text-white">{site.bookingDisclaimer}</strong>
          </span>
        </p>
        {Object.values(errors).some(Boolean) && (
          <p className="text-[14px] font-semibold text-red-300" role="alert">Merci de compléter les champs signalés.</p>
        )}
        <button type="submit" className="btn-wa w-full !min-h-[58px] text-[14px]">
          <WhatsAppGlyph className="h-5 w-5" /> Confirmer ma demande sur WhatsApp <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}

function Step({ n, title }: { n: number; title: string }) {
  return (
    <p className="flex items-center gap-3 text-[18px] font-extrabold" aria-hidden="true">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-violet-500 text-[13px] text-lime">{n}</span>
      {title}
    </p>
  );
}
