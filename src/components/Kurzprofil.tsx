export function Kurzprofil() {
  return (
    <section id="kurzprofil" aria-labelledby="kurzprofil-heading" style={{ background: "var(--bg-section)", padding: "6rem clamp(1.5rem,6vw,6rem)" }}>
      <div className="max-w-4xl mx-auto" data-reveal>
        <h2 id="kurzprofil-heading" style={{ color: "var(--text-primary)", fontSize: "clamp(1.75rem,4vw,3rem)", fontWeight: 700, marginBottom: "2rem", letterSpacing: "-0.02em" }}>
          Kurzprofil
        </h2>
        <p style={{ color: "var(--text-sec)", fontSize: "clamp(1rem,2vw,1.25rem)", lineHeight: 1.8 }}>
          Furkan Korhan lebt in{" "}
          <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>Hildesheim</span>{" "}
          und arbeitet an einem klaren Einstieg in die Informatik. Sein Fokus liegt auf IT-Systemen, Netzwerken, Fehleranalyse und den Grundlagen der Webentwicklung. Er verbindet praktische Computererfahrung mit kleinen Projekten, GitHub-Repositories und technischen Notizen. Ziel ist eine{" "}
          <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>IT-Ausbildung</span>,{" "}
          in der er vorhandene Neugier, Problemlösung und Lernbereitschaft in klare berufliche Praxis weiterentwickeln kann.
        </p>
      </div>
    </section>
  );
}
