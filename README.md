# Meine Website

Unter [furkankorhan.com](https://furkankorhan.com) stelle ich mich und meinen Wunsch nach einer IT-Ausbildung vor. Die Seite richtet sich an Ausbildungsbetriebe für Systemintegration und Anwendungsentwicklung.

Der Einstieg besteht aus einer Animation, die sich beim Scrollen verändert. Darunter stehen Informationen über mich, meine Lernfelder und ein Formular, über das Interessierte meine Bewerbungsunterlagen anfragen können.

## Aufbau

Die Website verwendet Next.js, React und TypeScript. Für das Layout kommen CSS und Tailwind CSS zum Einsatz. Sie wird über Vercel unter meiner eigenen Domain veröffentlicht.

- `src/app/page.tsx` – Hauptseite und Profiltexte
- `src/app/profile.module.css` – Gestaltung des Profil- und Kontaktbereichs
- `src/app/DocumentRequest.tsx` – Formular für Unterlagenanfragen
- `src/components/ScrollyCanvas.tsx` – animierter Einstieg
- `public/sequence/` – Bilder der Animation

Das Formular sendet Anfragen an einen separat auf Hostinger betriebenen PHP-Endpunkt. Dieser Dienst und seine Zugangsdaten sind nicht Bestandteil dieses Repositories. Ein lokaler Start der Website richtet daher keinen eigenen Mailversand ein. Lebenslauf und Zeugnisse werden nicht öffentlich im Repository abgelegt.

## Lokal starten

Voraussetzung: Node.js 20.9 oder neuer und npm.

```bash
npm ci
npm run dev
```

Danach ist die Seite unter `http://localhost:3000` erreichbar.

```bash
npm run lint
npm run build
```

Diese Befehle prüfen den Code und erstellen die Produktionsversion.

## Hintergrund

Die Website ist ein persönliches Projekt, das mit KI-Unterstützung entstanden ist. Mein Schwerpunkt liegt auf der Gestaltung, den Inhalten und der Nutzung als eigene Bewerbungsseite. Die verwendeten Webtechniken gehören zu den Themen, mit denen ich mich weiter beschäftige.
