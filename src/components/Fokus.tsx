"use client";
import { Network, Globe, SearchCode } from "lucide-react";

const FOCUS_AREAS = [
  { title: "IT-Systeme & Netzwerke", description: "Grundlagen von IP, DNS, DHCP, Betriebssystemen und praktischer Fehlersuche.", Icon: Network },
  { title: "Webentwicklung", description: "HTML, CSS, JavaScript und kleine Tools, um Programmierlogik praktisch zu verstehen.", Icon: Globe },
  { title: "Fehleranalyse & Dokumentation", description: "Probleme Schritt für Schritt eingrenzen, Lösungen testen und nachvollziehbar dokumentieren.", Icon: SearchCode },
];

export function Fokus() {
  const p = "6rem clamp(1.5rem,6vw,6rem)";
  return (
    <section id="fokus" aria-labelledby="fokus-heading" style={{ background: "var(--bg-deep)", padding: p }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        <div data-reveal>
          <h2 id="fokus-heading" style={{ color: "var(--text-primary)", fontSize: "clamp(1.75rem,4vw,3rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>Fokus</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "clamp(0.9rem,1.5vw,1.1rem)", marginBottom: "3.5rem", maxWidth: "32rem" }}>Bereiche, auf die ich meine Energie konzentriere.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1.5rem" }}>
          {FOCUS_AREAS.map((area, i) => (
            <div key={i} data-reveal data-delay={String(i + 1)}
              style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "1rem", padding: "2rem", display: "flex", flexDirection: "column", transition: "background 0.25s ease, border-color 0.25s ease" }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--card-hover)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--card-bg)")}
            >
              <area.Icon style={{ width: 32, height: 32, color: "var(--text-muted)", marginBottom: "1.25rem" }} aria-hidden="true" />
              <h3 style={{ color: "var(--text-primary)", fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.75rem", lineHeight: 1.3 }}>{area.title}</h3>
              <p style={{ color: "var(--text-sec)", fontSize: "0.9rem", lineHeight: 1.7 }}>{area.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
