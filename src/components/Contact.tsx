"use client";
import { ExternalLink, Mail, Download } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const btnStyle = {
  display: "inline-flex", alignItems: "center", gap: "0.75rem",
  padding: "1rem 1.5rem", borderRadius: "0.75rem",
  fontSize: "0.95rem", fontWeight: 500,
  background: "var(--card-bg)", border: "1px solid var(--card-border)",
  color: "var(--text-primary)", textDecoration: "none",
  transition: "background 0.2s ease, border-color 0.2s ease",
} as const;

const btnDisabledStyle = {
  ...btnStyle,
  color: "var(--text-faint)",
  cursor: "not-allowed",
  opacity: 0.6,
} as const;

export function Contact() {
  return (
    <section id="kontakt" aria-labelledby="kontakt-heading" style={{ background: "var(--bg-section)", padding: "6rem clamp(1.5rem,6vw,6rem)" }}>
      <div style={{ maxWidth: "52rem", margin: "0 auto" }} data-reveal>
        <h2 id="kontakt-heading" style={{ color: "var(--text-primary)", fontSize: "clamp(1.75rem,4vw,3rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>Kontakt</h2>
        <p style={{ color: "var(--text-muted)", fontSize: "1rem", marginBottom: "2.5rem", maxWidth: "28rem" }}>
          Interesse an meiner Arbeit oder Fragen? Ich freue mich über jede Nachricht.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <a href="mailto:mail@furkankorhan.com" style={btnStyle}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--card-hover)")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--card-bg)")}
          >
            <Mail style={{ width: 18, height: 18 }} />
            mail@furkankorhan.com
          </a>
          <a href="https://github.com/furkankorhan" target="_blank" rel="noopener noreferrer" style={btnStyle}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--card-hover)")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--card-bg)")}
          >
            <ExternalLink style={{ width: 18, height: 18 }} />
            github.com/furkankorhan
          </a>
          <span style={btnDisabledStyle} aria-label="Lebenslauf noch nicht verfügbar">
            <Download style={{ width: 18, height: 18 }} />
            Lebenslauf (bald)
          </span>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer style={{ background: "var(--bg-deep)", borderTop: "1px solid var(--card-border)", padding: "2rem clamp(1.5rem,6vw,6rem)" }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
        <p style={{ color: "var(--text-faint)", fontSize: "0.85rem" }}>
          © {new Date().getFullYear()} Furkan Korhan — Hildesheim
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <a href="https://github.com/furkankorhan" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-faint)", fontSize: "0.85rem", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-faint)")}
          >
            GitHub ↗
          </a>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
