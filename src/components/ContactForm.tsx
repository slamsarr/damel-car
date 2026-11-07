"use client";

import { useId, useState } from "react";
import { buildContactMessage, clean, waLink } from "@/lib/whatsapp";
import { WhatsAppGlyph } from "./Brand";

const subjects = ["Renseignement", "Tarifs", "Abonnement", "Entreprise / flotte", "Réclamation", "Autre"];

export function ContactForm() {
  const id = useId();
  const [name, setName] = useState("");
  const [subject, setSubject] = useState(subjects[0]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});

  return (
    <form
      noValidate
      className="card p-6 sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        const errs: typeof errors = {};
        if (clean(name).length < 2) errs.name = "Indiquez votre nom.";
        if (clean(message).length < 5) errs.message = "Écrivez votre message.";
        setErrors(errs);
        if (Object.keys(errs).length) {
          document.getElementById(`${id}-${Object.keys(errs)[0]}`)?.focus();
          return;
        }
        window.open(waLink(buildContactMessage(name, subject, message)), "_blank", "noopener,noreferrer");
      }}
    >
      <h2 className="text-[22px] font-extrabold">Écrivez-nous</h2>
      <p className="mt-2 text-[15px] text-ink-300">Votre message s'ouvre dans WhatsApp, prêt à être envoyé.</p>
      <div className="mt-6 grid gap-5">
        <div>
          <label htmlFor={`${id}-name`} className="label">Nom *</label>
          <input id={`${id}-name`} className="field" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" maxLength={80} aria-invalid={!!errors.name} aria-describedby={errors.name ? `${id}-name-err` : undefined} />
          {errors.name && <p id={`${id}-name-err`} className="err">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor={`${id}-subject`} className="label">Objet</label>
          <select id={`${id}-subject`} className="field" value={subject} onChange={(e) => setSubject(e.target.value)}>
            {subjects.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-message`} className="label">Message *</label>
          <textarea id={`${id}-message`} rows={4} className="field" value={message} onChange={(e) => setMessage(e.target.value)} maxLength={800} aria-invalid={!!errors.message} aria-describedby={errors.message ? `${id}-message-err` : undefined} />
          {errors.message && <p id={`${id}-message-err`} className="err">{errors.message}</p>}
        </div>
      </div>
      <button type="submit" className="btn-wa mt-6 w-full"><WhatsAppGlyph /> Envoyer via WhatsApp</button>
    </form>
  );
}
