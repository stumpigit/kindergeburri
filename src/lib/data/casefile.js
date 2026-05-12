export const caseFile = {
	id: 'akte-zimmerwald',
	title: 'Akte Zimmerwald – Das Foto ohne Namen',
	subtitle:
		'Kinderkrimi mit Vorermittlung (3 Codes) und Einsatzakte (Beweise + Board + Finale)',
	setting: {
		historicPeriod: 'Cold Case 1968 (Kanton Bern)',
		location: 'Zimmerwald bei Bern',
		now: 'Heute'
	},

	/** === VOR dem Geburtstag: Einladung === */
	invitation: {
		headline: 'Willkommen im Ermittler-Team.',
		message: 'Löst die drei Vorrätsel, um die Einladung für den Einsatztag freizuschalten.',
		tagline:
			'Die 3 Rätsel sind unabhängig vom Fall selbst. Sie testen eure Detektiv-Skills.'
	},

	visuals: {
		darkPaperBgUrl: '/images/black-paper-bg.webp',
		heroDeskUrl: '/images/hero-historical.png',
		paperGrainUrl: '/images/paper-grain-light.webp',
		heroCardUrl: '/images/hero-archive.png',
		fragmentsUrl: '/images/fragments-evidence.webp'
	},

	parentMode: {
		accessCode: 'eltern-briefing-17',
		accepted: ['eltern-briefing-17', 'parent17', 'briefing17']
	},

	invitationKit: [
		'Einladungskarte mit Link oder QR-Code',
		'Beleg A1 als einzelnes Fragment (Start-Papier)',
		'Kleine Detektiv-Lupe (optional)'
	],

	birthdayBriefing: {
		dateLabel: 'Einsatztag',
		dateValue: 'Samstag, 17. Mai, 14 Uhr (siehe Einladungs-Link)',
		meetingPoint: 'Treffpunkt bei Familie Suter',
		dresscode: 'Wetterfest, gute Schuhe',
		bringAlong: ['Neugier', 'Teamgeist'],
		unlockNote: 'Wird sichtbar, wenn alle 3 Vorrätsel gelöst sind.'
	},

	/** === Vorrätsel (Einladung) === */
	prelude: {
		intro: 'Drei Rätsel. Drei Codes. Eine Einladung.',
		puzzles: [
			{
				id: 'p1',
				title: 'Rätsel 1 – Caesar-Chiffre',
				hint: 'Alphabet um 3 Stellen verschoben: A → D, B → E, …',
				question: 'Was bedeutet "KDLQ Brx"?',
				answers: ['Hallo Du', 'HALLO DU', 'Hallo du'],
				source: 'Beleg A1'
			},
			{
				id: 'p2',
				title: 'Rätsel 2 – Zahlenfolge',
				hint: 'Jede Zahl ist die Summe der beiden Vorgänger.',
				question: 'Welche Zahl kommt als Nächstes? 1, 1, 2, 3, 5, 8, ?',
				answers: ['13'],
				source: 'Beleg A2'
			},
			{
				id: 'p3',
				title: 'Rätsel 3 — Bildcode',
				hint: 'Das Bild enthält ein verstecktes Wort.',
				question: 'Welches Wort ist gesucht?',
				answers: ['EINLADUNG', 'Einladung', 'einladung'],
				source: 'Beleg A3'
			}
		],
		teasers: [
			{ id: 't1', title: 'Verschlüsselter Gruss', text: 'KDLQ Brx', supportsPuzzleId: 'p1' },
			{ id: 't2', title: 'Zahlenreihe', text: '1, 1, 2, 3, 5, 8, ?', supportsPuzzleId: 'p2' },
			{ id: 't3', title: 'Geheimbotschaft', text: 'Bild mit verstecktem Wort', supportsPuzzleId: 'p3' }
		],
		gmNotes: [
			'Vorrätsel sind warm-up. Lösung: Einladung.',
			'A1 als Papier-Beilage, A2/A3 online.'
		]
	},

	/** === Einsatzakte: Beweise === */
	evidence: [
		{
			id: 'e0',
			name: 'E0 — Zeitungsartikel',
			type: 'Einleitung',
			imageUrl: '/images/E0-zeitung-1968-landscape_final.png',
			locationHint: 'Ermittler-Mappe',
			summary: 'Zeitungsausschnitt Berner Landbote, Juli 1968: "SCHULE ZIMMERWALD UM EIN HAAR AUFGEGEBEN".',
			hintText: 'Lest den Artikel. Die Namen sind geschwärzt, aber ihr erfahrt die Grundsituation: Die Schule sollte aufgelöst werden. Eine unbekannte Person hat das verhindert.',
			locked: false,
			tags: ['intro', '1968']
		},
		{
			id: 'e1',
			name: 'E1 — Foto ohne Namen',
			type: 'Foto',
			imageUrl: '/images/E1_Fotoohne-Namen.png',
			locationHint: 'Ermittler-Mappe',
			summary: 'Klassenfoto vor dem Schulhaus Zimmerwald. Eine Person fehlt!',
			hintText: 'Sucht den Buchstaben im Foto. Tragt ihn ins Aktenblatt unter FOTO ein. Achtet auf die rechteckige Lücke im Bild.',
			locked: false,
			tags: ['foto', 'I']
		},
		{
			id: 'e2',
			name: 'E2 — Brieffragment',
			type: 'Brief',
			imageUrl: '/images/E2-brieffragment.png',
			locationHint: 'Ermittler-Mappe',
			summary: 'Brief an die Gemeinde. Darin: ein weisses Blatt mit 3 Löchern.',
			hintText: 'Findet den markierten Buchstaben T (für POST). Legt das weisse Blatt mit den 3 Löchern auf den Brief → ihr findet "Kirschbaum Garten". Das ist der Code für E5!',
			locked: false,
			tags: ['brief', 'T', 'garten-hinweis']
		},
		{
			id: 'e3',
			name: 'E3 — Protokoll',
			type: 'Dokument',
			imageUrl: '/images/E3_Protokoll.png',
			locationHint: 'Ermittler-Mappe',
			summary: 'Sitzungsprotokoll der Gemeinde. Stempel HM (Heinz Müller).',
			hintText: 'Findet den Buchstaben E (für PROTOKOLL). Achtet auf den Stempel "HM" und die handschriftliche Notiz. Sortiert die Zeilen in die richtige Reihenfolge.',
			locked: false,
			tags: ['protokoll', 'E', 'HM']
		},
		{
			id: 'e4',
			name: 'E4 — Lageplan',
			type: 'Karte',
			imageUrl: '/images/E4_Lageplan.png',
			locationHint: 'Ermittler-Mappe',
			summary: 'Karte mit Schulwegen nach Kehrsatz. Manche Wege fehlen!',
			hintText: 'Findet den Buchstaben C (für ROUTE). Vergleicht die Bleistift-Route mit der Tinten-Korrektur. Wer hat die Karte manipuliert?',
			locked: false,
			tags: ['lageplan', 'C']
		},
		{
			id: 'e5',
			name: 'E5 — Gartenfund',
			type: 'Geheimdokument',
			imageUrl: '/images/E5_Gartenzettel.png',
			locationHint: 'Im Garten — gefunden mit Code "Kirschbaum Garten"',
			summary: 'Unter dem Kirschbaum gefunden. Acrostic "Bei der Schule" + Buchstabe H.',
			hintText: 'Wird erst sichtbar, wenn ihr den Code "Kirschbaum Garten" in der Finale-Sektion eingebt. Lest die Anfangsbuchstaben! → "Bei der Schule". Der letzte Buchstabe = H (für GARTEN).',
			locked: true,
			unlockCode: 'Kirschbaum Garten',
			tags: ['garten', 'H', 'acrostic']
		},
		{
			id: 'e6',
			name: 'E6 — Finale',
			type: 'Tagebuch + Puzzle',
			imageUrl: '/images/E6_Tagebuch_Clara.png',
			locationHint: 'Beim Teich — gefunden mit Code "TEICH"',
			summary: 'Clara Wyss Tagebuch + Puzzlestück des Klassenfotos.',
			hintText: 'Wird erst sichtbar, wenn ihr das Lösungswort "TEICH" im Finale eingebt. Das Puzzlestück zeigt Clara als Schulmädchen!',
			locked: true,
			unlockCode: 'TEICH',
			tags: ['finale', 'clara', 'puzzle']
		}
	],

	/** === Verdächtige === */
	suspects: [
		{
			id: 's1',
			name: 'Heinz Müller',
			role: 'Lehrer / Gemeinderat',
			imageUrl: '/images/S1_Herr_H._Mueller.png',
			// Später freischaltbar:
			motive: 'Rache für Kündigung März 1968. Zugang zu Akten nach Wahl in den Gemeinderat April 1968.',
			redFlag: 'Stempel "HM" auf Dokumenten (E3)',
			relief: null,
			// Erst nach E2 sichtbar:
			unlockEvidence: null,
			// Zusatzdokumente:
			extraInfo: [
				{ label: 'Kündigung', imageUrl: '/images/S1_Kuendigung_Heinz_Mueller.png' },
				{ label: 'Gratulation', imageUrl: '/images/S1_Gratulation_Gemeinderat.png' }
			]
		},
		{
			id: 's2',
			name: 'Louise Schmidt',
			role: 'Elternvertreterin',
			imageUrl: '/images/S2_Louise_Schmidt.png',
			motive: 'Wollte nur gewissenhaft arbeiten — wurde von Müller manipuliert.',
			redFlag: 'Ihre Liste wurde für die Schulweg-Manipulation verwendet.',
			relief: 'Wusste nichts von der Manipulation.',
			extraInfo: []
		},
		{
			id: 's3',
			name: 'Max Mustermann',
			role: 'Schüler / Archivhelfer',
			imageUrl: '/images/S3_Max_Mustermann.png',
			motive: 'Kein Motiv — nur Falschspur!',
			redFlag: '«Max. 6» auf Dokumenten → Name erscheint verdächtig oft.',
			relief: 'E5 beweist: Am Fototag gar nicht anwesend!',
			extraInfo: []
		},
		{
			id: 's4',
			name: 'Susanne Friedli',
			role: 'Lehrerin',
			imageUrl: '/images/S4_Lehrerin_Susanne_Friedli.png',
			motive: 'Angst um ihren Arbeitsplatz.',
			redFlag: 'War als einzige im Schulhaus am Tag der Entscheidung.',
			relief: 'Das Foto beweist: Die Heldin ist ein Kind, nicht die Lehrerin.',
			extraInfo: []
		},
		{
			id: 's5',
			name: 'Clara Wyss',
			role: 'Archiv-Assistentin (Foto zeigt Erwachsene)',
			imageUrl: '/images/S5_Clara_Wyss.png',
			motive: 'Wahrheit aufdecken, Schule retten.',
			redFlag: 'Bleibt anonym und im Hintergrund.',
			relief: 'E6 enthüllt: 1968 war sie ein SCHULMÄDCHEN! Sie ist die Heldin.',
			extraInfo: []
		},
		{
			id: 's6',
			name: 'Klaus Studerus',
			role: 'Gemeindepräsident',
			imageUrl: '/images/S6_Klaus_Studerus.png',
			motive: 'Musste die Finanzen in Ordnung bringen.',
			redFlag: 'Verantwortlich für den Beschluss.',
			relief: 'Protokoll E3: Er war strikt GEGEN die Schulauflösung.',
			extraInfo: []
		}
	],

	/** === Hinweise für die Webseite (getrennt von Beweisen) === */
	hints: [
		{
			id: 'h1',
			title: 'Was ist das Aktenblatt?',
			text: 'Das Aktenblatt eures Ermittlungsboards hat 8 leere Felder. Tragt die Buchstaben aus den Beweisen ein: FOTO, POST, PROTOKOLL, ROUTE, GARTEN — plus 3 Ablenkungen (ABZUG, GLOCKE, KASSE). Sortiert dann die richtigen 5 Buchstaben!',
			showAfter: null
		},
		{
			id: 'h2',
			title: 'Wie findet ihr E5?',
			text: 'Das weisse Blatt mit 3 Löchern aus E2 auf den Brieffragment legen. Durch die Löcher erscheinen "Hirsch", "Baum" und "Garten". Das Hirsch-Symbol + "H = K" → "Kirschbaum". Sucht den Kirschbaum im Garten!',
			showAfter: 'e2'
		},
		{
			id: 'h3',
			title: 'Was macht das Tondokument?',
			text: 'Hört den Telefonanruf. Müller instruiert Louise, nur Kehrsatz-nahe Schüler einzutragen. Das beweist die Manipulation!',
			showAfter: 'e4'
		}
	],

	/** === Codes === */
	codes: {
		missionUnlock: {
			requiredSolvedPuzzles: 3
		},
		groupLogin: {
			value: 'einsatz-17',
			accepted: ['einsatz-17', 'einsatz17', 'freigabe17']
		},
		e5Unlock: {
			value: 'Kirschbaum Garten',
			accepted: ['Kirschbaum Garten', 'Kirschbaumgarten', 'kirschbaum']
		},
		finaleUnlock: {
			value: 'TEICH',
			accepted: ['TEICH', 'teich', 'Teich', 'Teich bei der Schule', 'teich bei der schule']
		}
	},

	/** === Finale === */
	finale: {
		headline: 'Finale — Die Wahrheit aufdecken',
		fieldInstruction: 'Hier gebt ihr die geheimen Codes ein, um die letzten Beweise freizuschalten.',
		gmInstruction: 'Code 1: "Kirschbaum Garten" → E5 sichtbar. Code 2: "TEICH" → E6 sichtbar.',
		resolution: 'Der Fall ist gelöst! Täter: Heinz Müller. Heldin: Clara Wyss. Die Schule bleibt!'
	}
};
