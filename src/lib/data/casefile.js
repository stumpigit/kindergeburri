export const caseFile = {
	id: 'akte-zimmerwald',
	title: 'Akte Zimmerwald – Das Foto ohne Namen',
	subtitle:
		'Kinderkrimi mit Vorermittlung (Rätsel) und Einsatzakte (Beweise + Board + Finale am Teich)',
	setting: {
		historicPeriod: 'Juli 1968 (Cold Case)',
		location: 'Zimmerwald (BE)',
		now: 'Heute'
	},
	invitation: {
		headline: 'Willkommen im Ermittler-Team.',
		message: 'Ihr wurdet ausgewählt, um einen Fall aus dem Jahr 1968 zu lösen.',
		tagline:
			'Löst zuerst die drei Vorrätsel, um die Details für den Einsatztag freizuschalten.'
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
		'Einladungskarte mit QR-Code',
		'Dossier-Fragment A1',
		'Detektiv-Ausweis (Platzhalter)',
		'Optional: Kleine Lupe'
	],
	birthdayBriefing: {
		dateLabel: 'Einsatztag',
		dateValue: 'Samstag, 12. Mai 2026, 14:00 Uhr',
		meetingPoint: 'Treffpunkt bei Christoph Suter (Hauptquartier)',
		dresscode: 'Wetterfest, gute Schuhe für die Ermittlung im Freien.',
		bringAlong: ['Gute Augen', 'Logik', 'Teamwork'],
		unlockNote:
			'Diese Informationen werden erst sichtbar, wenn alle drei Vorrätsel korrekt gelöst sind.'
	},
	prelude: {
		intro:
			'Sammelt die Hinweise auf der Webseite und löst die Rätsel, um die Einsatzdaten zu erhalten.',
		puzzles: [
			{
				id: 'p1',
				title: 'Rätsel 1 – Verschlüsselung',
				hint: 'Caesar-Verschiebung um 3 Stellen: A wird zu D, B wird zu E...',
				question: 'Was bedeutet "KDLQ Brx"?',
				answers: ['Hallo du'],
				source: 'Webseite'
			},
			{
				id: 'p2',
				title: 'Rätsel 2 – Die Zahlenfolge',
				hint: '1, 1, 2, 3, 5, 8, ... jede Zahl ist die Summe der beiden vorherigen.',
				question: 'Welche Zahl kommt als Nächstes?',
				answers: ['13'],
				source: 'Webseite'
			},
			{
				id: 'p3',
				title: 'Rätsel 3 – Bilderrätsel',
				hint: 'Schaut euch das Bild genau an. Die Pfeile zeigen auf Buchstaben.',
				question: 'Welches Wort ist gesucht?',
				answers: ['Einladung'],
				source: 'Webseite'
			}
		],
		teasers: [
			{
				id: 'teaser1',
				title: 'Verschlüsselter Hinweis',
				text: 'KDLQ Brx (Verschiebung 3)',
				supportsPuzzleId: 'p1'
			},
			{
				id: 'teaser2',
				title: 'Das Muster',
				text: '1, 1, 2, 3, 5, 8, ?',
				supportsPuzzleId: 'p2'
			},
			{
				id: 'teaser3',
				title: 'Der Bild-Code',
				text: 'Ein Bild mit versteckten Buchstaben (Lösung: Einladung)',
				supportsPuzzleId: 'p3'
			}
		],
		gmNotes: [
			'Stelle sicher, dass die Kinder die Rätsel selbst lösen.',
			'Die Belohnung sind die Einladungsdetails.'
		]
	},

	evidence: [
		{
			id: 'e1',
			name: 'Beweis E1 – Foto ohne Namen',
			type: 'Foto',
			imageUrl: '/images/E1_Fotoohne-Namen.png',
			locationHint: 'Ermittler-Mappe',
			summary:
				'Ein altes Klassenfoto. Eine Person fehlt. In der linken oberen Ecke ist der Buchstabe "I" markiert.',
			archiveText:
				"Tragt den Buchstaben 'I' im Ermittlungsboard unter FOTO ein. Wer könnte auf diesem Foto fehlen?",
			tags: ['foto', 'I']
		},
		{
			id: 'e2',
			name: 'Beweis E2 – Brieffragment',
			type: 'Brief',
			imageUrl: '/images/E2-brieffragment.png',
			locationHint: 'Ermittler-Mappe',
			summary:
				'Ein Brief, der die Pläne für die Schulschliessung erwähnt. Der Buchstabe "T" ist farbig hervorgehoben.',
			archiveText:
				"Tragt den Buchstaben 'T' im Ermittlungsboard unter POST ein. Der Brief gibt auch einen ersten Hinweis auf einen Fundort im Garten.",
			tags: ['brief', 'T']
		},
		{
			id: 'e3',
			name: 'Beweis E3 – Zeitprotokoll',
			type: 'Dokument',
			imageUrl: '/images/E3_Protokoll.png',
			locationHint: 'Ermittler-Mappe',
			summary:
				'In diesem Protokoll ist der Buchstabe "E" markiert. Der Stempel „HM“ (Heinz Müller) findet sich am Rand.',
			archiveText:
				"Tragt den Buchstaben 'E' im Ermittlungsboard unter PROTOKOLL ein. Achtet auf die Unterschriften und Stempel.",
			tags: ['protokoll', 'E', 'HM']
		},
		{
			id: 'e4',
			name: 'Beweis E4 – Lageplan',
			type: 'Karte',
			imageUrl: '/images/E4_Lageplan.png',
			locationHint: 'Ermittler-Mappe',
			summary:
				'Die Route zeigt manipulierte Schulwege. Der Buchstabe "C" ist hier versteckt.',
			archiveText:
				"Tragt den Buchstaben 'C' im Ermittlungsboard unter ROUTE ein. Vergleicht die Wege mit der Realität.",
			tags: ['lageplan', 'C']
		},
		{
			id: 'e5',
			name: 'Beweis E5 – Gartenfund',
			type: 'Objekt',
			imageUrl: '/images/E5_Gartenzettel.png',
			locationHint: 'Im Garten gefunden',
			summary:
				'Ein altes Dokument unter dem Kirschbaum. Es enthält das Acrostic „Bei der Schule“ und liefert den Buchstaben "H".',
			archiveText:
				"Dieser Beweis wurde erst im Garten gefunden. Er liefert das 'H' für GARTEN.",
			tags: ['garten', 'H']
		},
		{
			id: 'e6',
			name: 'Beweis E6 – Das Finale',
			type: 'Tagebuch / Foto',
			imageUrl: '/images/E6_Tagebuch_Clara.png',
			locationHint: 'Beim Teich gefunden',
			summary:
				'Der Tagebucheintrag von Clara Wyss und das fehlende Puzzlestück des Klassenfotos.',
			archiveText:
				"Die endgültige Auflösung. Clara Wyss war diejenige, die alles für euch vorbereitet hat.",
			tags: ['finale', 'clara']
		}
	],

	suspects: [
		{
			id: 's1',
			name: 'Heinz Müller',
			imageUrl: '/images/S1_Herr_H._Mueller.png',
			role: 'Ex-Leiter / Gemeinderat',
			access: 'Hatte vollen Zugriff auf alle Akten und Stempel (HM).',
			motive: 'Rache für seine Kündigung; wollte die Schule durch Manipulation schliessen.',
			redFlag: 'Seine Initialen auf gefälschten Dokumenten.',
			relief: 'Keine.'
		},
		{
			id: 's2',
			name: 'Louise Schmidt',
			imageUrl: '/images/S2_Louise_Schmidt.png',
			role: 'Elternvertreterin',
			access: 'Besorgte Mutter, hat Listen von Schulwegen erstellt.',
			motive: 'Wollte nur das Beste für die Kinder, wurde aber getäuscht.',
			redFlag: 'Ihre Listen wurden für die Manipulation missbraucht.',
			relief: 'Sie wusste nichts von der Fälschung.'
		},
		{
			id: 's3',
			name: 'Max Mustermann',
			imageUrl: '/images/S3_Max_Mustermann.png',
			role: 'Archivhelfer',
			access: 'Hatte Zugang zu den Archivschachteln.',
			motive: 'Wurde verdächtigt, weil er oft im Archiv war.',
			redFlag: 'Seine Handschrift ähnelt einer Notiz.',
			relief: 'E5 beweist sein Alibi.'
		},
		{
			id: 's4',
			name: 'Susanne Friedli',
			imageUrl: '/images/S4_Lehrerin_Susanne_Friedli.png',
			role: 'Lehrerin',
			access: 'War im Schulhaus anwesend.',
			motive: 'Angst um ihre Stelle.',
			redFlag: 'War zur Tatzeit im Gebäude.',
			relief: 'Sie ist unschuldig.'
		},
		{
			id: 's5',
			name: 'Clara Wyss',
			imageUrl: '/images/S5_Clara_Wyss.png',
			role: 'Archiv-Assistentin',
			access: 'Kannte alle Akten in- und auswendig.',
			motive: 'Wahrheitsfindung; wollte die Schulverlegung verhindern.',
			redFlag: 'Sie blieb lange im Hintergrund.',
			relief: 'Sie ist die Heldin der Geschichte.'
		},
		{
			id: 's6',
			name: 'Klaus Studerus',
			imageUrl: '/images/S6_Klaus_Studerus.png',
			role: 'Gemeindepräsident',
			access: 'Höchste Instanz.',
			motive: 'Musste sparen.',
			redFlag: 'Unterschrieb viele Dokumente.',
			relief: 'Wurde durch Protokoll E3 entlastet (war gegen Auflösung).'
		}
	],

	timeline: [
		{
			id: 't1',
			year: 1968,
			label: 'Schritt 1: Initial-Hinweise',
			description:
				'Sammelt die Buchstaben aus E1-E4. Ordnet sie auf dem Board zu. Achtet auf "Reihenfolge unklar".',
			requiredEvidence: ['e1', 'e2', 'e3', 'e4']
		},
		{
			id: 't2',
			year: 1968,
			label: 'Schritt 2: Der Garten-Code',
			description:
				'Nutzt das weisse Blatt mit Löchern aus E2 auf dem Hinweis, um "Kirschbaum Garten" zu finden. Gebt diesen Code im Finale-Tab ein, um E5 freizuschalten.',
			requiredEvidence: ['e2']
		},
		{
			id: 't3',
			year: 1968,
			label: 'Schritt 3: Der Teich-Code',
			description:
				'Mit dem "H" aus E5 vervollständigt ihr das Wort auf dem Board. Gebt das Lösungswort im Finale-Tab ein, um zum Teich geführt zu werden.',
			requiredEvidence: ['e5']
		}
	],

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
			value: 'Teich bei der Schule',
			accepted: ['Teich bei der Schule', 'teichschule', 'teich']
		}
	},

	finale: {
		headline: 'Das Archiv der Wahrheit',
		fieldInstruction:
			'Hier könnt ihr die geheimen Codes eingeben, um die letzten Beweise freizuschalten.',
		gmInstruction:
			'Sobald die Kinder den Fundort im Garten gefunden haben, dürfen sie den Code für E5 eingeben.',
		resolution:
			'Gratulation! Ihr habt alle Beweise gefunden. Heinz Müller wurde entlarvt, und Clara Wyss ist die Heldin.'
	}
};
