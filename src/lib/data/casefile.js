export const caseFile = {
	id: 'akte-17',
	title: 'Akte Zimmerwald – Das Foto ohne Namen',
	subtitle: 'Kinderkrimi mit Vorermittlung (Codes) und Einsatzakte (Beweise + Ergebnis auf der Website)',
	setting: {
		historicPeriod: 'Fiktiver Cold Case mit historischem Look',
		location: 'Region Bern',
		now: 'Heute'
	},
	invitation: {
		headline: 'Du bist im Ermittlerinnen-Team!',
		message:
			'Vor dem Geburtstag startet eine geheime Vorermittlung. Mit der Einladung kommt nur ein Fragment. Alles Weitere wird online freigeschaltet.',
		tagline: 'Löse drei Code-Rätsel, schalte die Einladung frei – und sammle am Einsatztag Beweise als Team.'
	},
	visuals: {
		heroBackgroundUrl:
			'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=2200&q=80',
		heroCardUrl:
			'https://images.unsplash.com/photo-1486825586573-7131f7991bdd?auto=format&fit=crop&w=1400&q=80',
		fragmentsUrl:
			'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1400&q=80',
		imagePlaceholders: {
			hero: {
				title: 'Hero-Bild (Start)',
				description:
					'Dunkler Holztisch mit alter Fallmappe, Lupe, Briefsiegel, Taschenlampe und Notizzetteln; kinotaugliches Licht, hochwertiger Editorial-Look, keine Personen.',
				envatoKeywords:
					'detective desk vintage evidence board envelope wax seal magnifying glass cinematic lighting'
			},
			fragmentA1: {
				title: 'Beleg A1 (Fragment)',
				description:
					'Nahaufnahme eines vergilbten Papiers mit ausgerissenem Rand, Schreibmaschinenfont und handschriftlichen Randmarken (nur als Design-Placeholder).',
				envatoKeywords: 'old paper torn edge typewriter text vintage document texture scan'
			},
			preludeBanner: {
				title: 'Banner Vorermittlung',
				description:
					'Stylischer Ermittlungsraum mit Pinnwand, roten Fäden, Karte und Poststempel-Details, ohne lesbaren Plottext.',
				envatoKeywords:
					'detective board red string map stamps mystery room no people'
			}
		}
	},

	// Top-Level, weil die UI (svelte-check) darauf zugreift.
	imagePlaceholders: {
		hero: {
			title: 'Hero-Bild (Start)',
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
				hint: 'Nimm pro Zeile den ersten Buchstaben und lies das Wort.',
				question: 'Welches Wort ergibt sich aus dem Acrostic?',
				answers: ['Archiv'],
				source: 'Beleg A1 (Einladungsfragment)',
				gmExpected: 'Archiv'
			},
			{
				id: 'p2',
				title: 'Rätsel 2 – Zahlencode',
				hint: 'A=1, B=2, C=3 ...',
				question: 'Welches Lösungswort ergibt der Zahlencode?',
				answers: ['Spur'],
				source: 'Notiz A2 (Codezeile)',
				gmExpected: 'Spur'
			},
			{
				id: 'p3',
				title: 'Rätsel 3 – Spiegelnotiz',
				hint: 'Lies die Notiz rückwärts.',
				question: 'Welcher Ort wird genannt?',
				answers: ['Post', 'Bei der Post'],
				source: 'Notiz A3 (gespiegelte Zeile)',
				gmExpected: 'Post'
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
			'Für hochwertige Optik die Belege als „gescannte Aktenfetzen“ gestalten.'
		]
	},

	/**
	 * Einsatzakte (Beweise am Geburtstag)
	 * Hinweis: Die Kinder schreiben „Ergebnisse“ in die Notizen pro Beweis.
	 * Die Spielleitung sieht im Elternmodus zusätzlich Soll-Werte (gmExpected).
	 */
	evidence: [
		{
			id: 'e1',
			name: 'Beweis E1 – Foto ohne Namen',
			type: 'Foto',
			locationHint: 'Startmappe im Innenbereich',
			summary:
				'Rätsel E1 (ohne Website lösen, Hilfe hier wenn nötig):\n1) Lies die 4 Zeilen und nimm jeweils den ersten Buchstaben. Daraus ergibt sich ein Wort.\n2) Dieses Wort sagt dir den richtigen Timeline-Slot.\n3) Ergänze: Am Rand steht „MAX. 6“ → wer aus der Verdächtigenliste passt (Falschspur)?\n\nTragt in die Notizen ein: (a) Slot-Zahl (1–4) (b) Falschspur-Verdacht (S-Id).',
			archiveText:
				'Archiv-Auszug (Foto-Ausschnitt):\n„Eine Person ist nachträglich entfernt worden.\nDer Rand wirkt verändert.“\nRandaufdruck: „MAX. 6“.\n\nWichtig: Das passende Puzzlestück kommt erst am Teich.',
			notesPlaceholder: 'E1: Slot ___ ; Falschspur-Verdacht S___',
			insight:
					'Spielhilfe (optional): Slot 3 (FOTO) und Falschspur = S3 (Max) – wird in E5 entlastet.',
			tags: ['foto', 'fragment', 'bearbeitung']
		},
		{
			id: 'e2',
			name: 'Beweis E2 – Brieffragment an die Gemeinde',
			type: 'Brief',
			locationHint: 'Mappenfach mit Altakten',
			summary:
				'Rätsel E2 (ohne Website lösen, Hilfe hier wenn nötig):\n1) Acrostic aus 4 Zeilen ergibt den Slot.\n2) Garten-Ort E5: Aus dem Brief „Stein & ____“. Das zweite Suchwort ergänzt ihr aus dem Rätselteil.\n\nTragt in die Notizen ein: (a) Slot-Zahl (1–4) (b) Suchwörter für E5 (zwei Wörter).',
			archiveText:
				'Brief-Ausschnitt:\n„Die Sache mit der Schule darf noch nicht öffentlich werden.\nFür die nächste Spur: erste Hilfe unter Stein & Baum.“\nPS: Notiert euch: „max. 6“.',
			notesPlaceholder: 'E2: Slot ___ ; E5-Suchwörter: ___ & ___',
				insight:
					'Spielhilfe (optional): Slot 1 ist der BRIEF. Für E5 braucht ihr genau die Suchwörter: STEIN & BAUM.',
				gmExpected: 'Soll: Slot 1 ; E5-Suchwörter = STEIN & BAUM.',
				tags: ['brief', 'schwaerzung', 'protokoll']
			},
		{
			id: 'e3',
			name: 'Beweis E3 – Amtsvermerk (Stempel HM)',
			type: 'Verwaltung',
			locationHint: 'Umschlag mit Stempel',
			summary:
				'Rätsel E3 (ohne Website lösen, Hilfe hier wenn nötig):\n1) Acrostic aus 4 Zeilen ergibt den Slot.\n2) Auf dem Stempel steht „HM“: Ordne H/M den Verdächtigen zu (Start-Täter/Schuld-Schiene).\n\nTragt in die Notizen ein: (a) Slot-Zahl (1–4) (b) Täter-Verdacht S-Id für Slot 2.',
			archiveText:
				'Protokoll-Auszug (gekürzt):\n„Die Schulauflösung wird vorbereitet.“\nUnterschrift/Stempel: HM',
			notesPlaceholder: 'E3: Slot ___ ; Täter-Verdacht S___',
				insight:
					'Spielhilfe (optional): Auf dem Stempel steht HM → Das passt zu S1 (Herr Müller) und damit Slot 2.',
				gmExpected:
					'Soll: Slot 2 ; HM = S1 (Herr Müller).',
			tags: ['stempel', 'verwaltung', 'ablauf']
		},
		{
			id: 'e4',
			name: 'Beweis E4 – Lageplan/Adresse (Zimmerwald → Kehrsatz)',
			type: 'Karte',
			locationHint: 'Gefaltetes Blatt mit Route/Adresse',
			summary:
				'Rätsel E4 (ohne Website lösen, Hilfe hier wenn nötig):\n1) Acrostic aus 4 Zeilen ergibt den Slot.\n2) Ordne den Verdächtigen zu, der Zugriff auf Adressen/Listen/Routen hat.\n\nTragt in die Notizen ein: (a) Slot-Zahl (1–4) (b) Adress-Zugang S-Id.',
			archiveText:
				'Lageplan-Ausschnitt:\n„Wegbeschreibung: Zimmerwald → Kehrsatz.\nDie Route ist in einer Adresse/Notizliste gespeichert.“',
			notesPlaceholder: 'E4: Slot ___ ; Adress-Zugang S___',
				insight:
					'Spielhilfe (optional): Route/Adresse → das passt zu S2 (Frau Schmidt) und Slot 4.',
				gmExpected: 'Soll: Slot 4 ; Adress-Zugang = S2 (Frau Schmidt).',
			tags: ['karte', 'route', 'adresse']
		},
		{
			id: 'e5',
			name: 'Beweis E5 – Gartenfund (Twist: Alibi für S3) + Teich',
			type: 'Hinweis',
			locationHint: 'Im Garten versteckt (mit Spielleitung vorbereitet)',
			summary:
				'Rätsel E5 (im Garten):\n1) Acrostic (5 Zeilen) ergibt das Wort für euren Outdoor-Ort (Teich).\n2) Twist lesen: Max (S3) konnte am Foto-Tag nicht arbeiten → Falschspur kippt.\n\nTragt in die Notizen ein: (a) Ort-Wort (Teich?) (b) was das für den Verdacht auf S3 bedeutet.',
			archiveText:
				'Garten-Zettel (aus der Akte):\n„Max (S3) konnte am Foto-Tag nicht in der Aktenecke arbeiten.\nDie Veränderung wurde verhindert.\nDas passende nächste Zeichen zeigt euch nur den Ort.“\nAcrostic (Startbuchstaben): T E I C H.',
			notesPlaceholder: 'E5: Ort-Wort ___ ; Hinweis zu S3: entlastet/anders',
				insight:
					'Spielhilfe (optional): E5 sagt „Max (S3) konnte nicht am Foto arbeiten“ → damit wird S3 entlastet. Das Wort im Acrostic ist TEICH.',
				gmExpected:
					'Soll: Ort-Wort = TEICH ; S3 (Max) wird entlastet.',
			tags: ['garten', 'twist', 'teich']
		}
	],

	suspects: [
		{
			id: 's1',
			name: 'Herr Müller',
			role: 'Ex-Schulleiter',
			access: 'Stempel & Aktenablage; Protokolle / Verwaltungsbriefe',
			motive: 'Er wollte die Schule „praktischer“ organisieren (Idee: Umstellung/Verlegung Richtung Kehrsatz).',
			redFlag: 'Er kennt genau die Abläufe, um Dokumente „offiziell“ wirken zu lassen.',
			relief: 'S3 wird später durch E5 entlastet – nicht alles war „Max aus Trotz“.',
			gmExpectedSuspicion: 5,
			gmExpectedNotes: 'Täter-Schiene (Schuld an der Schulauflösungs-Idee) = S1.'
		},
		{
			id: 's2',
			name: 'Frau Schmidt',
			role: 'Elternvertreterin',
			access: 'Adressen/Listen; Notizen zu Wegen & Treffpunkten',
			motive: 'Sie möchte sichere Wege und hofft, dass die Gemeinde die Lage „ruhig“ löst.',
			redFlag: 'Ihre Unterlagen passen zu Kehrsatz – darum wirkt sie manchmal „zu nah dran“.',
			relief: 'Sie hat eher „Informationszugang“, aber nicht die ganze verdeckte Planung allein.',
			gmExpectedSuspicion: 3,
			gmExpectedNotes: 'Adress-Zugang/Route = S2.'
		},
		{
			id: 's3',
			name: 'Max Mustermann',
			role: 'Schüler / Außenseiter',
			access: 'Foto-Ordner/Material (weil er beim Projekt „Ordnen“ geholfen hat)',
			motive: 'Max will beweisen, dass er nützlich ist, und würde das Material gerne „verbessern“.',
			redFlag: 'Sein Name/Platz wirkt am Foto „fehlend“ – darum wird er schnell verdächtigt.',
			relief: 'E5 entlastet: Max konnte am Foto-Tag nicht an den Akten arbeiten.',
			gmExpectedSuspicion: 1,
			gmExpectedNotes: 'Falschspur! Erst durch E5 wird S3 entlastet.'
		},
		{
			id: 's4',
			name: 'Die anonyme Quelle',
			role: 'Externe Reform-Gruppe (Textquelle)',
			access: 'Nur Texte/Ideen (keine direkten Aktenzugänge)',
			motive: '„Veränderung“ soll schnell passieren; sie wollen die Schulauflösung bekannt machen.',
			redFlag: 'Man kann nicht genau sagen, wer dahintersteckt.',
			relief: 'Kein echter direkter Akten/Beweiszugang für die Manipulation.',
			gmExpectedSuspicion: 2,
			gmExpectedNotes: 'Eher Falschspur/Einflusserklärung, nicht der Hauptstopp.'
		},
		{
			id: 's5',
			name: 'Clara Wyss',
			role: 'Organisatorin (Widerstand)',
			access: 'Kennt Tricks, wie Belege sicher bleiben; Zugriff auf vertrauliche Hinweise/Absprachen',
			motive: 'Sie will, dass die Schule in Zimmerwald bleibt – und dass nichts „verschwindet“.',
			redFlag: 'Erst indirekt sichtbar: ihre Rolle wird über den finalen Fototeil klar.',
			relief: 'Heldin: Sie verhindert die Auflösung – Beweis kommt erst am Teich.',
			gmExpectedSuspicion: 1,
			gmExpectedNotes: 'Heldin/Verhinderin (wird am Teich über das Puzzlestück sichtbar = S5).'
		}
	],

	timeline: [
		{
			id: 't1',
			year: 1968,
			label: 'Der Plan startet',
			description: 'Ein Brief und ein Vermerk machen die Richtung klar.',
			requiredEvidence: ['e2', 'e3']
		},
		{
			id: 't2',
			year: 1969,
			label: 'Das Foto wird verändert',
			description: 'Eine Person fehlt im Bild – das schafft eine Falschspur.',
			requiredEvidence: ['e1']
		},
		{
			id: 't3',
			year: 1969,
			label: 'Adresse/Route nach Kehrsatz',
			description: 'Die Idee braucht einen Weg und passende Informationen.',
			requiredEvidence: ['e4']
		},
		{
			id: 't4',
			year: 1970,
			label: 'Gartenfund kippt die Spur',
			description: 'Max (S3) wird entlastet – der nächste Hinweis führt zum Teich.',
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
		headline: 'Finale freigeschaltet',
		fieldInstruction:
			'Geht als Team zur vereinbarten Aussenstation am Schulhausareal und folgt den Anweisungen der Spielleitung.',
		gmInstruction:
			'Die Spielleitung übergibt den letzten Umschlag erst nach einer kurzen Team-Zusammenfassung.',
		resolution:
			'Auflösung: Herr Müller (S1) wollte die Schulauflösung Richtung Kehrsatz vorbereiten. Clara Wyss (S5) verhinderte das Ganze durch kluge Beweissicherung (E5 + Puzzleteil am Teich). Max (S3) war nur die Falschspur – er wurde durch den Gartenfund entlastet.'
	}
};
