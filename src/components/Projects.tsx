"use client";
import { Code2, ExternalLink } from "lucide-react";

const PROJECTS = [
  {
    title: "Application Tracker",
    description: "Ein kleines Webtool, um Bewerbungen, Status, Links und nächste Schritte übersichtlich zu verfolgen.",
    status: "Web Tool",
    tags: ["HTML", "CSS", "JavaScript"],
    repo: "https://github.com/furkankorhan/application-tracker",
  },
  {
    title: "Task Tracker CLI",
    description: "Ein Python-CLI mit SQLite, um Aufgaben im Terminal zu speichern, aufzulisten, abzuschließen und zu löschen.",
    status: "Python",
    tags: ["Python", "SQLite", "CLI"],
    repo: "https://github.com/furkankorhan/task-tracker-cli",
  },
  {
    title: "Password Generator",
    description: "Ein Browser-Tool für Passwortgenerierung mit DOM-Interaktion, Clipboard API und sichererem Zufall über Web Crypto.",
    status: "Live Demo",
    tags: ["JavaScript", "Web Crypto", "GitHub Pages"],
    repo: "https://github.com/furkankorhan/password-generator",
    demo: "https://furkankorhan.github.io/password-generator/",
  },
  {
    title: "IT Troubleshooting Playbook",
    description: "Ein praktisches Playbook für Netzwerkprobleme: IP, DNS, DHCP, Gateway, Ping und einfache Terminal-Tests.",
    status: "Dokumentation",
    tags: ["Netzwerke", "Troubleshooting", "Terminal"],
    repo: "https://github.com/furkankorhan/it-troubleshooting-playbook",
  },
  {
    title: "Wiki Rabbit Hole",
    description: "Ein Wikipedia-Navigationsspiel mit API-Nutzung, Zustandslogik, Timer, Pfadverfolgung und responsivem Layout.",
    status: "Live Demo",
    tags: ["JavaScript", "API", "UI"],
    repo: "https://github.com/furkankorhan/wiki-rabbit-hole",
    demo: "https://furkankorhan.github.io/wiki-rabbit-hole/",
  },
];

const linkStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.4rem",
  color: "var(--text-primary)",
  fontSize: "0.78rem",
  fontWeight: 650,
  textDecoration: "none",
  padding: "0.45rem 0.7rem",
  borderRadius: "0.55rem",
  border: "1px solid var(--card-border)",
  background: "var(--bg-deep)",
} as const;

export function Projects() {
  const p = "6rem clamp(1.5rem,6vw,6rem)";
  return (
    <section id="projekte" aria-labelledby="projekte-heading" style={{ background: "var(--bg-section)", padding: p }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        <div data-reveal>
          <h2 id="projekte-heading" style={{ color: "var(--text-primary)", fontSize: "clamp(1.75rem,4vw,3rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>Ausgewählte Projekte</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "clamp(0.9rem,1.5vw,1.1rem)", marginBottom: "3.5rem", maxWidth: "40rem" }}>Kleine Projekte, die technische Grundlagen sichtbar machen: verstehen, testen, dokumentieren und als Code veröffentlichen.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.5rem" }}>
          {PROJECTS.map((proj, i) => (
            <article key={i} data-reveal data-delay={String((i % 2) + 1)}
              style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "1rem", padding: "1.75rem 2rem", display: "flex", flexDirection: "column", justifyContent: "space-between", transition: "background 0.25s ease, border-color 0.25s ease" }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--card-hover)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--card-bg)")}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "0.75rem" }}>
                  <h3 style={{ color: "var(--text-primary)", fontSize: "1rem", fontWeight: 600, lineHeight: 1.4 }}>{proj.title}</h3>
                  <Code2 style={{ width: 18, height: 18, color: "var(--text-faint)", flexShrink: 0, marginTop: 2 }} />
                </div>
                <p style={{ color: "var(--text-sec)", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>{proj.description}</p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                <span style={{ padding: "0.2rem 0.75rem", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 600, background: "rgba(245,158,11,0.12)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.25)" }}>{proj.status}</span>
                {proj.tags.map((t, j) => (
                  <span key={j} style={{ padding: "0.2rem 0.75rem", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 500, background: "var(--card-bg)", color: "var(--text-sec)", border: "1px solid var(--card-border)" }}>{t}</span>
                ))}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.55rem", marginTop: "1.35rem" }}>
                <a href={proj.repo} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  <Code2 style={{ width: 15, height: 15 }} />
                  Code
                </a>
                {proj.demo ? (
                  <a href={proj.demo} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                    <ExternalLink style={{ width: 15, height: 15 }} />
                    Live Demo
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
