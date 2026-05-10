# Akte Zimmerwald Webapp (SvelteKit + Docker)

Interaktive Krimi-Einladung und Ermittlungsplattform für den Kindergeburtstag.

Die Seite ist so gebaut, dass die Kinder **vor dem Geburtstag** bereits rein können:
- Einladung lesen
- Vorermittlungs-Rätsel lösen
- Teamname & Codename setzen
- erste Akteninfos entdecken

Am Geburtstag selbst geht die Story in den Vollmodus:
- Beweise markieren/analysieren
- Verdachtstafel pflegen
- Timeline freischalten
- Finalcode eingeben
- Outdoor-Finale am Schulhaus starten

---

## Technologie

- SvelteKit (adapter-node)
- Svelte 5 (Runes)
- Vitest (Unit-Tests)
- Docker + Docker Compose
- Schriften: Google Fonts (beim ersten Laden eine kurze Internetverbindung nötig; danach Browser-Cache)

---

## Bilder komprimieren

Nach neuen JPG-Lieferungen in `static/images/` die WebP-Ziele neu erzeugen:

```bash
npm run images:optimize
```

Konfiguration der Zuordnung Quelle → Zieldatei: [scripts/optimize-images.mjs](scripts/optimize-images.mjs). Die App nutzt die `.webp`-Dateien aus [src/lib/data/casefile.js](src/lib/data/casefile.js).

---

## Lokaler Start (ohne Docker)

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 4680
```

Dann öffnen:

- http://localhost:4680

---

## Produktion mit Docker Compose

```bash
docker compose up -d --build
```

Dann öffnen:

- http://<server-ip>:4680

Stoppen:

```bash
docker compose down
```

---

## Qualitätschecks

```bash
npm run check
npm run test
npm run build
```

Alle drei sind aktuell grün.

---

## Projektstruktur

```text
webapp/
├── src/
│   ├── app.css
│   ├── routes/
│   │   ├── +layout.svelte
│   │   ├── +page.svelte              # Start · Überblick
│   │   ├── einladung/+page.svelte   # Rätsel + Einladung (eine Seite)
│   │   ├── einsatz/+page.svelte     # Akte · Verdacht · Board
│   │   ├── finale/+page.svelte      # Finalcode (nach Gruppencode)
│   │   ├── vorab/                   # Redirect → /einladung
│   │   └── briefing/                # Redirect → /einladung
│   └── lib/
│       ├── components/               # UI-Bausteine
│       ├── data/casefile.js
│       ├── state/progress.js
│       ├── state/progressStore.js    # UI-Aktionen + Speicher
│       ├── state/progress.spec.js
│       ├── state/storage.js
│       └── state/parentModeStore.js
├── scripts/
│   └── optimize-images.mjs           # JPG → WebP (npm run images:optimize)
├── static/images/                    # Roh-JPG optional; produktive WebPs für die UI
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
└── README.md
```

---

## Inhaltliche Bereiche der App

1. **Einladung** (`/einladung`)
   - drei Vorab-Rätsel, danach Erfolgsmeldung und Geburtstagsbriefing

2. **Akte** (`/einsatz`)
   - Beweisliste
   - Fund-/Analyse-Status
   - Notizen pro Beweis

3. **Verdachtstafel** (Tab in Einsatz)

4. **Zeitstrahl** (Tab in Einsatz)

5. **Finale** (`/finale`, nach Gruppencode)
   - Finalcode, Outdoor-Hinweis, Auflösung für Spielleitung

---

## Anpassung vor dem Versand

### Datum / Treffpunkt anpassen

Datei:

- `src/lib/data/casefile.js`

Bereich:

- `birthdayBriefing.dateValue`
- `birthdayBriefing.meetingPoint`

### Rätselantworten anpassen

Datei:

- `src/lib/data/casefile.js`

Bereich:

- `prelude.puzzles[*].answers`

### Finalcode ändern

Datei:

- `src/lib/data/casefile.js`

Bereich:

- `codes.finaleUnlock`

---

## Hinweise für den Einsatz

- Der Fortschritt wird lokal im Browser gespeichert (`localStorage`).
- Für mehrere Teams auf einem Gerät: vor neuem Durchlauf "Fortschritt zurücksetzen" klicken.
- Für Versand vorab könnt ihr den Link schon schicken mit dem Hinweis:
  - "Löst alle drei Vorermittlungs-Rätsel vor dem Geburtstag."

---

## Optionaler nächster Ausbau

- passwortgeschützter Spielleiter-Modus
- Upload echter Beweisbilder
- Druckansicht für Briefing & GM-Karte
- Teamcode pro Gruppe statt nur lokalem Speicher
