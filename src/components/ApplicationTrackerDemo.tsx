"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ExternalLink, Plus, Trash2 } from "lucide-react";

type Status = "Research" | "Ready" | "Applied" | "Interview" | "Rejected";

type Application = {
  id: number;
  company: string;
  role: string;
  city: string;
  status: Status;
  nextStep: string;
  link: string;
};

const initialApplications: Application[] = [
  {
    id: 1,
    company: "Example IT GmbH",
    role: "Fachinformatiker - Systemintegration",
    city: "Hannover",
    status: "Ready",
    nextStep: "Anschreiben anpassen",
    link: "https://example.com",
  },
  {
    id: 2,
    company: "Digital Solutions AG",
    role: "Fachinformatiker - Anwendungsentwicklung",
    city: "Hildesheim",
    status: "Research",
    nextStep: "Anforderungen prüfen",
    link: "https://example.com",
  },
];

const statuses: Status[] = ["Research", "Ready", "Applied", "Interview", "Rejected"];

const inputStyle = {
  width: "100%",
  minHeight: "2.75rem",
  border: "1px solid var(--card-border)",
  borderRadius: "0.55rem",
  background: "var(--bg-deep)",
  color: "var(--text-primary)",
  padding: "0.75rem 0.85rem",
  fontSize: "0.9rem",
} as const;

export function ApplicationTrackerDemo() {
  const [applications, setApplications] = useState<Application[]>(() => {
    if (typeof window === "undefined") return initialApplications;

    const saved = window.localStorage.getItem("furkan-application-tracker");
    if (!saved) return initialApplications;

    try {
      return JSON.parse(saved) as Application[];
    } catch {
      return initialApplications;
    }
  });
  const [statusFilter, setStatusFilter] = useState<Status | "All">("All");
  const [form, setForm] = useState({
    company: "",
    role: "",
    city: "",
    status: "Research" as Status,
    nextStep: "",
    link: "",
  });

  useEffect(() => {
    window.localStorage.setItem("furkan-application-tracker", JSON.stringify(applications));
  }, [applications]);

  const visibleApplications = useMemo(() => {
    if (statusFilter === "All") return applications;
    return applications.filter((item) => item.status === statusFilter);
  }, [applications, statusFilter]);

  function addApplication() {
    if (!form.company.trim() || !form.role.trim()) return;

    setApplications((current) => [
      {
        id: Date.now(),
        company: form.company.trim(),
        role: form.role.trim(),
        city: form.city.trim() || "-",
        status: form.status,
        nextStep: form.nextStep.trim() || "Nächsten Schritt festlegen",
        link: form.link.trim(),
      },
      ...current,
    ]);

    setForm({
      company: "",
      role: "",
      city: "",
      status: "Research",
      nextStep: "",
      link: "",
    });
  }

  function updateStatus(id: number, status: Status) {
    setApplications((current) =>
      current.map((item) => (item.id === id ? { ...item, status } : item)),
    );
  }

  function removeApplication(id: number) {
    setApplications((current) => current.filter((item) => item.id !== id));
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-section)", color: "var(--text-primary)" }}>
      <section style={{ padding: "4rem clamp(1rem,5vw,5rem) 2rem" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <Link href="/" style={{ color: "var(--text-muted)", fontSize: "0.9rem", textDecoration: "none" }}>
            ← Zurück zum Portfolio
          </Link>
          <div style={{ marginTop: "2rem", maxWidth: "48rem" }}>
            <p style={{ color: "#f59e0b", fontSize: "0.82rem", fontWeight: 700, marginBottom: "0.75rem", textTransform: "uppercase" }}>
              Live Demo
            </p>
            <h1 style={{ fontSize: "clamp(2rem,5vw,4rem)", lineHeight: 1.08, letterSpacing: "-0.02em", marginBottom: "1rem" }}>
              Application Tracker
            </h1>
            <p style={{ color: "var(--text-sec)", fontSize: "clamp(1rem,2vw,1.18rem)", lineHeight: 1.8 }}>
              Ein kleines Browser-Tool, um Bewerbungen, Status, Links und nächste Schritte sichtbar zu halten.
              Die Daten bleiben lokal im Browser gespeichert.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: "1rem clamp(1rem,5vw,5rem) 5rem" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", display: "grid", gap: "1.25rem" }}>
          <div style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "0.75rem", padding: "1.25rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "0.85rem" }}>
              <input style={inputStyle} placeholder="Unternehmen" value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} />
              <input style={inputStyle} placeholder="Ausbildungsrolle" value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} />
              <input style={inputStyle} placeholder="Stadt" value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} />
              <select style={inputStyle} value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as Status })}>
                {statuses.map((status) => <option key={status}>{status}</option>)}
              </select>
              <input style={inputStyle} placeholder="Nächster Schritt" value={form.nextStep} onChange={(event) => setForm({ ...form, nextStep: event.target.value })} />
              <input style={inputStyle} placeholder="Link" value={form.link} onChange={(event) => setForm({ ...form, link: event.target.value })} />
            </div>
            <button
              onClick={addApplication}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                marginTop: "1rem",
                border: 0,
                borderRadius: "0.55rem",
                background: "#f59e0b",
                color: "#111827",
                fontWeight: 800,
                padding: "0.8rem 1rem",
                cursor: "pointer",
              }}
            >
              <Plus style={{ width: 16, height: 16 }} />
              Eintrag hinzufügen
            </button>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {(["All", ...statuses] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                style={{
                  border: "1px solid var(--card-border)",
                  borderRadius: "999px",
                  padding: "0.45rem 0.8rem",
                  color: statusFilter === status ? "#111827" : "var(--text-sec)",
                  background: statusFilter === status ? "#f59e0b" : "var(--card-bg)",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                {status}
              </button>
            ))}
          </div>

          <div style={{ overflowX: "auto", border: "1px solid var(--card-border)", borderRadius: "0.75rem", background: "var(--card-bg)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "760px" }}>
              <thead>
                <tr style={{ color: "var(--text-muted)", textAlign: "left", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  <th style={{ padding: "1rem" }}>Unternehmen</th>
                  <th style={{ padding: "1rem" }}>Rolle</th>
                  <th style={{ padding: "1rem" }}>Stadt</th>
                  <th style={{ padding: "1rem" }}>Status</th>
                  <th style={{ padding: "1rem" }}>Nächster Schritt</th>
                  <th style={{ padding: "1rem" }}>Link</th>
                  <th style={{ padding: "1rem" }} />
                </tr>
              </thead>
              <tbody>
                {visibleApplications.map((item) => (
                  <tr key={item.id} style={{ borderTop: "1px solid var(--card-border)" }}>
                    <td style={{ padding: "1rem", fontWeight: 700 }}>{item.company}</td>
                    <td style={{ padding: "1rem", color: "var(--text-sec)" }}>{item.role}</td>
                    <td style={{ padding: "1rem", color: "var(--text-sec)" }}>{item.city}</td>
                    <td style={{ padding: "1rem" }}>
                      <select style={{ ...inputStyle, minHeight: "2.25rem", padding: "0.45rem 0.55rem" }} value={item.status} onChange={(event) => updateStatus(item.id, event.target.value as Status)}>
                        {statuses.map((status) => <option key={status}>{status}</option>)}
                      </select>
                    </td>
                    <td style={{ padding: "1rem", color: "var(--text-sec)" }}>{item.nextStep}</td>
                    <td style={{ padding: "1rem" }}>
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: "#f59e0b", display: "inline-flex", alignItems: "center", gap: "0.3rem", textDecoration: "none", fontWeight: 700 }}>
                          Öffnen <ExternalLink style={{ width: 14, height: 14 }} />
                        </a>
                      ) : (
                        <span style={{ color: "var(--text-faint)" }}>-</span>
                      )}
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <button onClick={() => removeApplication(item.id)} aria-label={`${item.company} löschen`} style={{ border: 0, background: "transparent", color: "var(--text-faint)", cursor: "pointer" }}>
                        <Trash2 style={{ width: 17, height: 17 }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
