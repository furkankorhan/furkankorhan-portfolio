import type { Metadata } from "next";
import { ArrowUpRight, Mail, FileText, MapPin } from "lucide-react";
import { ScrollyCanvas } from "@/components/ScrollyCanvas";
import { ThemeToggle } from "@/components/ThemeToggle";
import styles from "./profile.module.css";

const description = "Furkan Korhan aus Hildesheim: auf dem Weg in eine IT-Ausbildung in Systemintegration oder Anwendungsentwicklung. Deutsch B1 (DTZ), technische Interessen und Kontakt.";
export const metadata: Metadata = {
  title: "Furkan Korhan | Mein Weg in die IT",
  description,
  openGraph: { title: "Furkan Korhan | Mein Weg in die IT", description, url: "https://furkankorhan.com", type: "website", images: [{ url: "/og-image", width: 1200, height: 630, alt: "Furkan Korhan – Mein Weg in die IT" }] },
  twitter: { card: "summary_large_image", title: "Furkan Korhan | Mein Weg in die IT", description, images: ["/og-image"] },
};

const documentsHref = `mailto:mail@furkankorhan.com?subject=${encodeURIComponent("Anfrage zu Ihren Bewerbungsunterlagen")}&body=${encodeURIComponent("Hallo Furkan,\n\nwir interessieren uns für Ihr Profil. Bitte senden Sie uns Ihren Lebenslauf und Ihre relevanten Nachweise an diese E-Mail-Adresse.\n\nUnternehmen:\nAnsprechperson:\nAusbildungsstelle:\n\nVielen Dank!")}`;
const learning = [
  { number: "01", title: "Systeme & Netzwerke", text: "Ich beschäftige mich mit Betriebssystemen, Linux und den Grundlagen von IP, DNS und DHCP. Mich interessiert, wie die einzelnen Teile eines IT-Systems zusammenarbeiten." },
  { number: "02", title: "Webentwicklung", text: "Mit HTML, CSS und JavaScript lerne ich, wie Webseiten aufgebaut sind. Kleine Webtools helfen mir dabei, Programmierlogik praktisch nachzuvollziehen." },
  { number: "03", title: "Fehlersuche & Dokumentation", text: "Ich möchte Probleme Schritt für Schritt eingrenzen, Lösungen testen und die Ergebnisse verständlich festhalten. Technische Notizen und GitHub gehören zu meinem Lernweg." },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <ScrollyCanvas />
      <div className={styles.content} id="kurzprofil">
        <nav className={styles.navigation} aria-label="Profilnavigation">
          <span className={styles.location}><MapPin size={15} aria-hidden="true" /> Hildesheim</span>
          <div className={styles.navLinks}><a href="#ueber-mich">Über mich</a><a href="#fokus">Lernfelder</a><a href="#kontakt">Kontakt</a></div>
        </nav>

        <section className={styles.intro} id="ueber-mich" aria-labelledby="profile-heading">
          <div>
            <p className={styles.eyebrow}>Mein nächster Schritt · IT-Ausbildung</p>
            <h2 id="profile-heading">Neugier auf Technik.<br /><span>Bereit, weiterzulernen.</span></h2>
            <p className={styles.lead}>Ich bin Furkan, lebe in Hildesheim und möchte mein Interesse an Computern zum Beruf machen.</p>
            <p className={styles.body}>Ich suche eine Ausbildung zum Fachinformatiker – in der Systemintegration oder Anwendungsentwicklung. Beide Fachrichtungen interessieren mich: Ich möchte verstehen, wie IT-Systeme funktionieren und wie Software entsteht.</p>
            <a className={styles.textLink} href="#kontakt">Lernen wir uns kennen <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
          <aside className={styles.facts} aria-labelledby="facts-heading">
            <h3 id="facts-heading">Auf einen Blick</h3>
            <dl>
              <div><dt>Mein Ziel</dt><dd>Ausbildung zum Fachinformatiker</dd><dd className={styles.factDetail}>Systemintegration oder<br />Anwendungsentwicklung</dd></div>
              <div><dt>Standort</dt><dd>Hildesheim, Niedersachsen</dd></div>
              <div><dt>Deutschkenntnisse</dt><dd className={styles.language}>B1 <span>Zertifikat vorhanden</span></dd><dd className={styles.factDetail}>Deutsch-Test für Zuwanderer (DTZ)<br /><time dateTime="2026-09-20">20.09.2026</time></dd></div>
            </dl>
          </aside>
        </section>

        <section className={styles.story} id="warum-informatik" aria-labelledby="why-heading">
          <div><p className={styles.eyebrow}>Was mich antreibt</p><h2 id="why-heading">Verstehen, wie<br /> es funktioniert.</h2></div>
          <div className={styles.storyText}>
            <p>Seit meiner Kindheit interessieren mich Computer: Wie funktioniert ein System? Warum tritt ein Fehler auf? Und wie lässt er sich lösen? Aus dieser Neugier entstanden erste Erfahrungen mit PCs, Linux, Hosting und kleinen Webprojekten.</p>
            <p>In einer Ausbildung möchte ich diese Erfahrungen vertiefen – mit strukturiertem Lernen, echten Aufgaben und der Möglichkeit, Verantwortung zu übernehmen. Ich bringe Interesse und erste Grundlagen mit und möchte darauf Schritt für Schritt aufbauen.</p>
          </div>
        </section>

        <section className={styles.learning} id="fokus" aria-labelledby="learning-heading">
          <div className={styles.sectionHeading}><p className={styles.eyebrow}>Mein Lernweg</p><h2 id="learning-heading">Womit ich mich beschäftige.</h2><p>Die Grundlagen, die ich gerade weiterentwickle.</p></div>
          <div>{learning.map(item => <article className={styles.learningRow} key={item.number}><span className={styles.number} aria-hidden="true">{item.number}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
        </section>

        <section className={styles.contact} id="kontakt" aria-labelledby="contact-heading">
          <div><p className={styles.eyebrow}>Kontakt & Unterlagen</p><h2 id="contact-heading">Passt mein Profil<br />zu Ihrer Ausbildung?</h2><p>Ich freue mich über ein persönliches Gespräch. Meinen Lebenslauf und relevante Nachweise sende ich Ihnen gerne auf Anfrage zu.</p></div>
          <div className={styles.contactActions}>
            <a className={styles.primaryButton} href={documentsHref}><FileText size={18} aria-hidden="true" /><span>Unterlagen anfragen</span><ArrowUpRight size={18} aria-hidden="true" /></a>
            <p className={styles.buttonHint}>Öffnet eine vorbereitete E-Mail. Ich antworte persönlich mit meinen Unterlagen.</p>
            <a className={styles.email} href="mailto:mail@furkankorhan.com"><Mail size={16} aria-hidden="true" /><span>mail@furkankorhan.com</span></a>
          </div>
        </section>

        <footer className={styles.footer}><p>© {new Date().getFullYear()} Furkan Korhan</p><div><a href="https://www.linkedin.com/in/furkankorhan/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><ThemeToggle /></div></footer>
      </div>
    </main>
  );
}
