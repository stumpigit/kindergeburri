export const caseFile = {
	id: 'akte-zimmerwald',
	title: 'Akte Zimmerwald – Das Foto ohne Namen',
	subtitle:
		'Kinderkrimi mit Vorermittlung (3 Codes) und Einsatzakte (Beweise + Board + Finale am Teich)',
	setting: {
		historicPeriod: 'Fiktiver Cold Case mit historischem Look',
		location: 'Region Zimmerwald (bei Bern)',
		now: 'Heute'
	},
	invitation: {
		headline: 'Du bist offiziell im Ermittlerinnen-Team.',
		message: '',
		tagline:
			'Die Akte kann erst vollständig betrachtet werden, wenn ihr die drei Vorrätsel gelöst habt.'
	},
	visuals: {
		/** Dunkles zerknülltes Papier – globaler UI-Hintergrund (WebP) */
		darkPaperBgUrl: '/images/black-paper-bg.webp',
		/** Schreibtisch / Cold-Case – grosses Hero (WebP aus scripts/optimize-images.mjs) */
		heroDeskUrl: '/images/hero-historical.svg',
		/** Helle Papierkörnung – auf Belegkarten (.paper) */
		paperGrainUrl: '/images/paper-grain-light.webp',
		/** Archiv / Katalog – zweites Bild im Hero */
		heroCardUrl: '/images/hero-archive-historical.svg',
		/** Beweise / Tisch – Einladungspaket-Kachel */
		fragmentsUrl: '/images/fragments-evidence.webp'
	},
	imagePlaceholders: {
		hero: {
			title: 'Hero-Bild (Startseite)',
			description:
				'Dunkler Holztisch mit alter Fallmappe, Lupe, Briefsiegel, Taschenlampe und Notizzetteln; kinotaugliches Licht, hochwertiger Editorial-Look, keine Personen.',
			envatoKeywords:
				'detective desk vintage evidence board envelope wax seal magnifying glass cinematic lighting'
		},
		fragmentA1: {
			title: 'Beleg A1 (Fragment)',
			description:
				'Nahaufnahme eines vergilbten Papiers mit ausgerissenem Rand, Schreibmaschinenfont und handschriftlichen Randmarken (nur als Design-Placeholder).',
			envatoKeywords:
				'old paper torn edge typewriter text vintage document texture scan'
		},
		preludeBanner: {
			title: 'Banner Vorermittlung',
			description:
				'Stylischer Ermittlungsraum mit Pinnwand, roten Fäden, Karte und Poststempel-Details, ohne lesbaren Plottext.',
			envatoKeywords:
				'detective board red string map stamps mystery room no people'
		}
	},
	parentMode: {
		accessCode: 'eltern-briefing-17',
		accepted: ['eltern-briefing-17', 'parent17', 'briefing17']
	},
	invitationKit: [
		'Einladungskarte mit Link oder QR-Code',
		'Beleg A1 als einzelnes Fragment (nur 1 Teil)',
		'Mini-Regelkarte: „3 Codes lösen = Einladung freischalten“',
		'Optional: kleines Detektiv-Gadget (Sticker, Büroklammer, Mini-Lupe)'
	],
	birthdayBriefing: {
		dateLabel: 'Einsatztag',
		dateValue: 'Samstag, 17. Mai, 13:30–17:30 (bei Bedarf anpassen)',
		meetingPoint: 'Treffpunkt bei Familie Suter zu Hause (Startmappe)',
		dresscode: 'Wetterfeste Kleidung, bequeme Schuhe, optional dunkle Jacke',
		bringAlong: ['Neugier', 'Teamgeist', 'Scharfe Augen', 'Optional: Notizheft'],
		unlockNote:
			'Diese Informationen werden erst sichtbar, wenn alle drei Vorrätsel korrekt gelöst sind.'
	},
	prelude: {
		intro:
			'Du startest mit einem einzelnen Beleg-Fragment. Löse drei unterschiedliche Code-Rätsel, um die Einladung vollständig freizuschalten.',
		puzzles: [
			{
				id: 'p1',
				title: 'Rätsel 1 – Acrostic',
				hint:
					'Nimm pro Zeile den ersten Buchstaben und lies das Wort.',
				question: 'Welches Wort ergibt sich aus dem Acrostic?',
				answers: ['Archiv'],
				source: 'Beleg A1 (Einladungsfragment)'
			},
			{
				id: 'p2',
				title: 'Rätsel 2 – Zahlencode 19-16-21-18',
				hint:
					'A=1, B=2, C=3 ...',
				question: 'Welches Lösungswort ergibt der Zahlencode?',
				answers: ['Spur'],
				source: 'Notiz A2 (Codezeile)'
			},
			{
				id: 'p3',
				title: 'Rätsel 3 – Spiegelnotiz',
				hint:
					'Lies die Notiz rückwärts.',
				question: 'Welcher Ort wird genannt?',
				answers: ['Post', 'Bei der Post'],
				source: 'Notiz A3 (gespiegelte Zeile)'
			}
		],
		teasers: [
			{
				id: 'teaser1',
				title: 'Beleg A1 – Fragment',
				text:
					'Ankunft im Dämmerlicht.\nRänder des Dokuments fehlen.\nCodewörter wurden markiert.\nHinweise liegen zwischen den Zeilen.\nIn den Akten steckt mehr.\nVerdächtige Spuren bleiben offen.',
				supportsPuzzleId: 'p1'
			},
			{
				id: 'teaser2',
				title: 'Beleg A2 – Codezeile',
				text: 'Randnotiz: „Schlüsselwort: 19-16-21-18“',
				supportsPuzzleId: 'p2'
			},
			{
				id: 'teaser3',
				title: 'Beleg A3 – Spiegelnotiz',
				text: '"tsoP red ieb"',
				supportsPuzzleId: 'p3'
			}
		],
		gmNotes: [
			'Beste Wirkung: A1 als Papierbeilage versenden, A2/A3 nur online zeigen.',
			'Für hochwertige Optik die Belege als „gescannte Aktenfetzen“ gestalten.',
			'Optional: QR-Code erst auf Rückseite oder unter Rubbelsticker platzieren.'
		]
	},

	/**
	 * Einsatzakte – Beweise (E1–E5)
	 */
	evidence: [
		{
			id: 'e1',
			name: 'Beweis E1 – Foto ohne Namen',
			type: 'Foto',
			locationHint: 'Archivmappe Zimmerwald',
			summary:
				'Ein altes Gruppenfoto: Eine Person wurde nachträglich entfernt. Die Rand-Lücke ist rechteckig. Zusätzlich steht am Rand „MAX. 6“.',
			archiveText:
				"RÄTSEL E1 (Teamaufgabe):\n1) Anfangsbuchstaben lesen (D/R/E/I) → Wort = DREI → richtiger Timeline-Slot = Slot 3.\n2) „MAX. 6“: Suche in der Verdächtigenliste die Person, deren Name mit MAX beginnt → trage ihre ID ins Board ein.\n3) Kartenaktion: Lege die Ereigniskarte „FOTO“ in Slot 3.\n\n[HILFE FÜR ERMITTLER]:\n* Hängt das Foto an der Fotowand, sucht den rechteckigen Rahmen.\n* Zählt die Personen im Foto – fehlt jemand? Welche Form hat die Lücke?",
			tags: ['foto', 'lücke', 'falschspur', 'max']
		},
		{
			id: 'e2',
			name: 'Beweis E2 – Brieffragment an die Gemeinde',
			type: 'Brief',
			locationHint: 'Handschriftlicher Brief / Aktenfach',
			summary:
				'Ein Briefausschnitt: Er erklärt, warum die Schul-Sache noch nicht öffentlich werden darf – und enthält eine Spur zum Garten.',
			archiveText:
				"RÄTSEL E2 (Teamaufgabe):\n1) Acrostic lesen → Wort ergibt Slot 1.\n2) Kartenaktion: Lege die Ereigniskarte „BRIEF“ in Slot 1.\n3) Gartenhinweis: „Stein & Baum“ → Zwei Suchwörter. Später im Garten findet ihr Beweis E5.",
			tags: ['brief', 'garten', 'stein', 'baum', 'spur']
		},
		{
			id: 'e3',
			name: 'Beweis E3 – Zeit-/Amtsprotokoll mit Stempel „HM“',
			type: 'Stempel / Protokoll',
			locationHint: 'Vermerk in der Akte',
			summary:
				'In einem Protokoll-Auszug fehlt ein Satzteil. Am Rand ist ein runder Stempel deutlich sichtbar: „HM“.',
			archiveText:
				"RÄTSEL E3 (Teamaufgabe):\n1) Acrostic lesen → Wort ergibt Slot 2.\n2) Kartenaktion: Lege die Ereigniskarte „STEMPEL“ in Slot 2.\n3) HM → Täter-Check: Vorname beginnt mit H und Nachname endet mit M → Täter-ID = S1.\n4) Tragt die Täter-ID in das Board-Feld „Täter (aus Slot 2)“ ein.",
			tags: ['protokoll', 'stempel', 'hm', 'täter']
		},
		{
			id: 'e4',
			name: 'Beweis E4 – Lageplan/Adresse (Zimmerwald → Kehrsatz)',
			type: 'Adresse / Karte',
			locationHint: 'Route/Adressnotiz in der Akte',
			summary:
					'Zwei Wege sind auf der Karte eingezeichnet: eine helle Bleistift-Route (wie Louise es in ihren Listen notierte) und eine dunkle Tinten-Umleitung (nachträglich ergänzt). Daran erkennt ihr, wer den Vergleich manipulierte.',
			archiveText:
					"RÄTSEL E4 (Teamaufgabe):\\n1) Acrostic lesen → Wort ergibt Slot 4.\\n2) Kartenaktion: Lege die Ereigniskarte „ADRESSE“ in Slot 4.\\n3) Twist auf der Karte: Findet den Unterschied zwischen der hellen Bleistift-Route (kurz) und der dunklen Tinten-Umleitung (lang).\\n4) Zählt die zusätzlichen Tinten-Abschnitte im Umweg zwischen „Baum“ und „Route“. (Ergebnis = Zahl → dazu passt der Buchstabe fürs Board-Feld „ROUTE“.)\\n5) Adress-Zugang: In der Verdächtigenliste gehört die Person mit „Adressen/Listen/Wegen-Treffen“ zu ID S2. Trage S2 ein.",
			tags: ['lageplan', 'adresse', 'kehrsatz', 's2'],
		},
		{
			id: 'e5',
			name: 'Beweis E5 – Gartenfund (Teich-Hinweis & Twist)',
			type: 'Gartenfund',
			locationHint: 'Unter Stein (bei altem Baum) im Garten',
			summary:
				'Ein Garten-Zettel: Er zeigt, dass die erste Falschspur nicht stimmt – und er führt zum Teich beim Schulhaus.',
			archiveText:
				"RÄTSEL E5 (Teamaufgabe – im Garten):\n1) Ort-Wort-Acrostic lösen → TEICH.\n2) Twist: Lest/prüft die neue Wahrheit: Max (S3) konnte am Foto-Tag nicht an der Aktenecke arbeiten → Falschspur streichen/entlasten.\n3) Dann zum Teich beim Schulhaus: Setzt das fehlende Foto-Puzzlestück aus E1 ein.\n4) Erst dort erkennt ihr die Heldin/Held (kommt von der Rückseite des Puzzlestücks) → Heldin-ID S5.",
			tags: ['garten', 'teich', 'twist', 's3-entlastet', 's5']
		}
	],

		suspects: [
		{
			id: 's1',
			name: 'H. Müller',
			imageUrl: '/images/S1_Herr_H._Mueller.png',
			role: 'Ex-Schulleiter',
			access:
				'Kennt die Schulorganisation und die Aktenlage; wurde am 11. März 1968 gekündigt.',
			motive:
				'Er hat die Kündigung erhalten, weil er vermutlich als einziger Lehrer nicht mehr benötigt wurde. Er war auf der anderen Seite einer Machtspaltung in der Gemeinde. Seine Wahl in den Gemeinderat am 01.04.1968 kann als Gegenbewegung gegen die Kündigung interpretiert werden. Einige Beweise wie E2 (Brief an die Gemeinde) und E3 (Protokoll) beinhalten Hinweise auf seinen Plan.',
			redFlag:
				'Er kennt die Abläufe, damit Dokumente „offiziell“ wirken.',
			relief: 'Keine.'
		},
		{
			id: 's2',
			name: 'Louise Schmidt',
			imageUrl: '/images/S2_Louise_Schmidt.png',
			role: 'Elternvertreterin',
			access:
				'Kennt die Elternbriefe und Schulversammlungsprotokolle. Hat den Schulweg berechnet und den "kurzen Durchschnitt" erstellt.',
			motive:
				'Sie will sichere Wege und hofft, dass die Gemeinde die Lage „ruhig“ löst.',
			redFlag:
				'Ihre Unterlagen passen zu Kehrsatz – darum wirkt sie manchmal „zu nah dran“.',
			relief: 'Gering.'
		},
		{
			id: 's3',
			name: 'Max Mustermann',
			imageUrl: '/images/S3_Max_Mustermann.png',
			role: 'Schüler-Helfer',
			access:
				'Hat Zugang zum Archiv und kennt die Aktenordnung. Wurde aufgrund seiner handschriftlichen Ähnlichkeit mit einem Zettel verdächtigt.',
			motive:
				'Max will beweisen, dass er nützlich ist, und würde das Material gerne „verbessern“.',
			redFlag:
				'Sein Name/Platz wirkt am Foto „fehlend“ – darum wird er schnell verdächtigt.',
			relief: 'Gering.'
		},
		{
			id: 's4',
			name: 'Susanne Friedli',
			imageUrl: '/images/S4_Lehrerin_Susanne_Friedli.png',
			role: 'Lehrerin',
			access:
				'Lehrerin in Zimmerwald. Blieb als einzige am Tag der Entscheidung im Schulhaus.',
			motive:
				'Sie fürchtet um ihren Arbeitsplatz und möchte eine Lösung, die den Schulbetrieb langfristig sichert.',
			redFlag:
				'Sie war als einzige am Tag der Entscheidungsfindung im Schulhaus.',
			relief: 'Keine.'
		},
		{
			id: 's5',
			name: 'Clara Wyss',
			imageUrl: '/images/S5_Clara_Wyss.png',
			role: 'Organisatorin (Widerstand)',
			access:
				'Jüngere Lehrerin, Archiv-Assistentin. Sie organisiert die Akten und kennt jede Seite.',
			motive:
				'Clara will, dass die Schule in Zimmerwald bleibt – und dass nichts „verschwindet“.',
			redFlag:
				'Sie ist schwer greifbar: Man erkennt ihre Rolle erst später.',
			relief: 'N/A (Der wahre Täter).'
		},
		{
			id: 's6',
			name: 'Klaus Studerus',
			imageUrl: '/images/S6_Klaus_Studerus.png',
			role: 'Gemeindepräsident',
			access:
				'Verantwortlich für Finanzen. Er hat die Kontrolle über den gesamten Prozess.',
			motive:
				'Er muss die Gemeindefinanzen in den Griff bekommen; massive Einsparungen durch Schulauflösung.',
			redFlag:
				'Er hat die Kontrolle über den gesamten Prozess.',
			relief: 'Entlastet durch das Protokoll vom 14.05.1968: Er war strikt gegen die Auslösung.'
		}
	],

	/**
	 * Board (Zeitstrahl / Slots)
	 */
	timeline: [
		{
			id: 't1',
			year: 1968,
			label: 'Slot 1 – Der Brief (Spur in den Garten)',
			description:
				'Wenn E2 analysiert ist: Lege die Ereigniskarte „BRIEF“ in Slot 1. Notiert „STEIN & BAUM“ – dort liegt E5 im Garten.\n\n[HILFE]: Sucht nach Hinweisen auf einen Ort, der nicht im Gebäude ist.',
			requiredEvidence: ['e2']
		},
		{
			id: 't2',
			year: 1969,
			label: 'Slot 2 – Stempel HM (Täter-Check)',
			description:
				'Wenn E3 analysiert ist: Lege „STEMPEL“ in Slot 2. Entschlüsselt HM → Täter-ID = S1.\n\n[HILFE]: Wer von den Verdächtigen hat Zugang zum Stempel?',
			requiredEvidence: ['e3']
		},
		{
			id: 't3',
			year: 1969,
			label: 'Slot 3 – Foto ohne Namen & Falschspur',
			description:
				'Wenn E1 analysiert ist: Lege „FOTO“ in Slot 3.\n\n[HILFE]: Das Foto ist der Dreh- und Angelpunkt. Fehlt da wirklich jemand oder ist das eine Ablenkung?',
			requiredEvidence: ['e1']
		},
		{
			id: 't4',
			year: 1970,
			label: 'Slot 4 – Adresse nach Kehrsatz (Zugang S2)',
			description:
				'Wenn E4 analysiert ist: Lege „ADRESSE“ in Slot 4.\n\n[HILFE]: Vergleicht den Plan mit der Liste der Verdächtigen.',
			requiredEvidence: ['e4']
		},
		{
			id: 't5',
			year: 1971,
			label: 'Teich-Fund – letzte Puzzle-Ecke',
			description:
				'Wenn E5 analysiert ist (und ihr das Foto aus E1 habt): Geht zum Teich beim Schulhaus. Setzt das fehlende Foto-Puzzlestück ein. Erst dort erkennt ihr die Heldin / den Helden.\n\n[HILFE]: Das letzte Teil des Puzzles ist der Schlüssel zum Abschluss.',
			requiredEvidence: ['e5', 'e1']
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
		finaleUnlock: {
			value: 'protokoll-komplett',
			accepted: ['protokoll-komplett', 'protokollkomplett', 'abschluss-17']
		}
	},

	finale: {
		headline: 'Finale am Teich',
		fieldInstruction:
			'Geht als Team zur Teich-Station beim Schulhaus. Dort setzt ihr das fehlende Foto-Puzzlestück aus E1 ein und schaut, wer wirklich geholfen hat (S5). Danach könnt ihr den Finalcode eingeben.',
		gmInstruction:
			'Die Spielleitung übergibt/öffnet den letzten Schritt erst, wenn das Team kurz die Ergebnisse zusammengetragen hat.',
		resolution:
			'Der Fall ist abgeschlossen, wenn die Beweiskette stimmig ist: S3 wurde zunächst falsch verdächtigt, aber E5 zeigt die Wahrheit – und S5 (Clara Wyss) hat die Veränderung verhindert. Danke für euren Teamgeist!'
	}
};
