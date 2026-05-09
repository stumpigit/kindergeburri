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
│   │   └── +page.svelte
│   └── lib/
│       ├── data/casefile.js
│       ├── state/progress.js
│       ├── state/progress.spec.js
│       └── state/storage.js
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
└── README.md
```

---

## Inhaltliche Bereiche der App

1. **Einladung**
   - Story-Intro
   - Geburtstagsbriefing
   - Mitbringen-Liste

2. **Vorermittlung**
   - 3 Rätsel
   - Freischaltung der operativen Akte nach 2 gelösten Rätseln

3. **Akte**
   - Beweisliste
   - Fund-/Analyse-Status
   - Notizen pro Beweis

4. **Verdachtstafel**
   - Verdachtsgrad pro Figur (1–5)
   - Teamnotizen

5. **Zeitstrahl**
   - Events werden anhand analysierter Beweise freigeschaltet

6. **Finale**
   - Finalcode-Eingabe
   - Outdoor-Missionsanweisung
   - Auflösung für Spielleitung

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
  - "Löst mindestens zwei Vorermittlungs-Rätsel vor dem Geburtstag."

---

## Optionaler nächster Ausbau

- passwortgeschützter Spielleiter-Modus
- Upload echter Beweisbilder
- Druckansicht für Briefing & GM-Karte
- Teamcode pro Gruppe statt nur lokalem Speicher
