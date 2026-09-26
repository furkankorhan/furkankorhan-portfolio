"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import styles from "./profile.module.css";

export function DocumentRequest() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const values = new FormData(form);
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("https://a.furkankorhan.com/request-documents.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.get("email"), name: values.get("name"), note: values.get("note"), website: values.get("website") }),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) {
        throw new Error(typeof result.message === "string" ? result.message : "Bitte versuchen Sie es später erneut.");
      }
      setStatus("success");
      setMessage("Vielen Dank! Ihre Anfrage wurde gesendet. Ich melde mich per E-Mail bei Ihnen.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof TypeError ? "Keine Verbindung. Bitte versuchen Sie es erneut oder schreiben Sie an mail@furkankorhan.com." : error instanceof Error ? error.message : "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut.");
    }
  }

  return (
    <form className={styles.requestForm} onSubmit={submit} aria-label="Bewerbungsunterlagen anfragen" aria-busy={status === "sending"}>
      <div><label htmlFor="request-email">Ihre E-Mail-Adresse <span>(erforderlich)</span></label><input id="request-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="name@beispiel.de" disabled={status === "sending"} /></div>
      <div><label htmlFor="request-name">Name / Unternehmen <span>(optional)</span></label><input id="request-name" name="name" type="text" autoComplete="organization" maxLength={120} disabled={status === "sending"} /></div>
      <div><label htmlFor="request-note">Kurze Nachricht <span>(optional)</span></label><textarea id="request-note" name="note" rows={3} maxLength={1000} placeholder="Für welche Stelle interessieren Sie sich?" disabled={status === "sending"} /></div>
      <div className={styles.formTrap} aria-hidden="true"><label htmlFor="request-website">Bitte leer lassen</label><input id="request-website" name="website" type="text" tabIndex={-1} autoComplete="off" /></div>
      <p className={styles.formPrivacy}>Ihre Angaben werden per E-Mail an mich gesendet, damit ich Ihre Anfrage beantworten kann.</p>
      <button className={styles.primaryButton} type="submit" disabled={status === "sending"}>{status === "sending" ? "Wird gesendet…" : "Unterlagen anfragen"}<ArrowUpRight size={18} aria-hidden="true" /></button>
      <div aria-live="polite" aria-atomic="true">{message && <p className={status === "success" ? styles.formSuccess : styles.formError}>{message}</p>}</div>
    </form>
  );
}
