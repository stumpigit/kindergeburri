export const caseFile = {
	id: 'akte-17',
	shortTitle: 'Akte-17',
	title: 'Akte-17: Das Foto ohne Namen',
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
		message: 'Löst die drei Einladung-Rätsel, um die Einladungskarte freizuschalten.',
		tagline:
			'Die Hinweise sind Teil der Einladung selbst — sie geben den Weg zum Krimi-Geburtstag frei.'
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
		'Einladungskarte mit Link',
		'Beleg A1 als einzelnes Fragment (Start-Papier)',
		'Kleine Detektiv-Lupe (optional)'
	],

	birthdayBriefing: {
		dateLabel: 'Einsatztag',
		dateValue: 'Freitag, 29. Mai, 13:30 Uhr',
		meetingPoint: 'Treffpunkt bei Familie Suter',
		dresscode: 'Wetterfeste Kleidung, Velo',
		bringAlong: ['Neugier', 'Teamgeist','Detektivgespür'],
		unlockNote: 'Wird sichtbar, wenn alle 3 Einladung-Rätsel gelöst sind.'
	},

	/** === Einladung (Vor dem Geburtstag) === */
	prelude: {
		intro: 'Drei Rätsel. Drei Hinweise. Eine Einladung.',
		puzzles: [
			{
				id: 'p1',
				title: 'Rätsel 1: Code-Nr.',
				hint: 'A = 1, B = 2, ...',
				question: 'Was bedeutet 19-16-21-18?',
				answers: ['spur', 'Spur', 'SPUR'],
				source: 'Einladung'
			},
			{
				id: 'p2',
				title: 'Rätsel 2: Hinweise',
				hint: 'Lese nicht von links nach rechts, sondern von oben nach unten.',
				question: 'Welche Botschaft ergibt sich aus den Zeilen?',
				answers: ['ARCHIV', 'Archiv', 'archiv'],
				source: 'Einladung'
			},
			{
				id: 'p3',
				title: 'Rätsel 3: Spiegelnotiz',
				hint: 'Schaue dich im Spiegel an.',
				question: 'Welcher Text verbirgt sich in der Notiz?',
				answers: ['bei der post', 'bei der post', 'beiderpost'],
				source: 'Einladung'
			}
		],
		teasers: [
			{ id: 't1', title: 'Zahlencode', text: '19-16-21-18', supportsPuzzleId: 'p1' },
			{ id: 't2', title: 'Hinweise', text: 'Ankunft im Dämmerlicht.\nRänder des Dokuments fehlen.\nCodewörter wurden markiert.\nHinweise liegen zwischen den Zeilen.\nIn den Ackten steckt mehr.\nVerdächtige Spuren bleiben offen.', supportsPuzzleId: 'p2' },
			{ id: 't3', title: 'Spiegelnotiz', text: 'tsoP red ieb', supportsPuzzleId: 'p3' }
		],
		gmNotes: [
			'Die Einladungsrätsel führen nur zur Einladungskarte.',
			'Kein Tipptext in der Karte selbst.'
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
			imageUrl: '/images/S1_Herr_H._Mueller.png',
			solution: {
				role: 'Lehrer / Gemeinderat',
				motive: 'Rache für Kündigung März 1968. Zugang zu Akten nach Wahl in den Gemeinderat April 1968.',
				redFlag: 'Stempel "HM" auf Dokumenten (E3)',
				relief: null,
				extraInfo: [
					{ label: 'Kündigung', imageUrl: '/images/S1_Kuendigung_Heinz_Mueller.png' },
					{ label: 'Gratulation Gemeinderat', imageUrl: '/images/S1_Gratulation_Gemeinderat.png' }
				]
			}
		},
		{
			id: 's2',
			name: 'Louise Schmidt',
			imageUrl: '/images/S2_Louise_Schmidt.png',
			solution: {
				role: 'Elternvertreterin',
				motive: 'Wollte nur gewissenhaft arbeiten — wurde von Müller manipuliert.',
				redFlag: 'Ihre Liste wurde für die Schulweg-Manipulation verwendet.',
				relief: 'Wusste nichts von der Manipulation.',
				extraInfo: []
			}
		},
		{
			id: 's3',
			name: 'Max Mustermann',
			imageUrl: '/images/S3_Max_Mustermann.png',
			solution: {
				role: 'Schüler / Archivhelfer',
				motive: 'Kein Motiv — nur Falschspur!',
				redFlag: '«Max. 6» auf Dokumenten → Name erscheint verdächtig oft.',
				relief: 'E5 beweist: Am Fototag gar nicht anwesend!',
				extraInfo: []
			}
		},
		{
			id: 's4',
			name: 'Susanne Friedli',
			imageUrl: '/images/S4_Lehrerin_Susanne_Friedli.png',
			solution: {
				role: 'Lehrerin',
				motive: 'Angst um ihren Arbeitsplatz.',
				redFlag: 'War als einzige im Schulhaus am Tag der Entscheidung.',
				relief: 'Das Foto beweist: Die Heldin ist ein Kind, nicht die Lehrerin.',
				extraInfo: []
			}
		},
		{
			id: 's5',
			name: 'Clara Wyss',
			imageUrl: '/images/S5_Clara_Wyss.png',
			solution: {
				role: 'Archiv-Assistentin',
				motive: 'Wahrheit aufdecken, Schule retten.',
				redFlag: 'Bleibt anonym und im Hintergrund.',
				relief: 'E6 enthüllt: 1968 war sie ein SCHULMÄDCHEN! Sie ist die Heldin.',
				extraInfo: []
			}
		},
		{
			id: 's6',
			name: 'Klaus Studerus',
			imageUrl: '/images/S6_Klaus_Studerus.png',
			solution: {
				role: 'Gemeindepräsident',
				motive: 'Musste die Finanzen in Ordnung bringen.',
				redFlag: 'Verantwortlich für den Beschluss.',
				relief: 'Protokoll E3: Er war strikt GEGEN die Schulauflösung.',
				extraInfo: []
			}
		}
	],

	/** Hinweis: Board ist jetzt TimelineBoard.svelte mit 8 Feldern + 4 Beobachtungen */

	/** === Hinweise für die Webseite (getrennt von Beweisen) === */
	hints: [
		{
			id: 'h1',
			title: 'Hinweis zum Aktenblatt',
			text: 'Das Aktenblatt eures Ermittlungsboards hat 8 leere Felder. Tragt die Buchstaben aus den Beweisen ein: FOTO, POST, PROTOKOLL, ROUTE, GARTEN — plus 3 Ablenkungen (ABZUG, GLOCKE, KASSE). Sortiert dann die richtigen 5 Buchstaben!',
			showAfter: null
		},
		{
			id: 'h2',
			title: 'Hinweis zum Gartenfund',
			text: 'Das weisse Blatt mit 3 Löchern auf den Brieffragment legen. Durch die Löcher erscheinen "Hirsch", "Baum" und "Garten". Das Hirsch-Symbol + "H = K" → "Kirschbaum". Sucht den Kirschbaum im Garten!',
			showAfter: 'e2'
		},
		{
			id: 'h3',
			title: 'Hinweis zur Tonspur',
			text: 'Das Gespräch verrät, wie die Schulwege manipuliert wurden.',
			href: '/telefonat',
			linkLabel: 'Tonspur abhören',
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
