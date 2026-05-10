export const caseFile = {
	id: 'akte-17',
	title: 'Akte Zimmerwald – Das Foto ohne Namen',
	subtitle: 'Interaktive Vorermittlung & Einsatzakte · Region Bern',
	setting: {
		historicPeriod: 'Fiktiver Cold Case mit historischem Look',
		location: 'Region Bern',
		now: 'Heute'
	},
	invitation: {
		headline: 'Du bist offiziell im Ermittlerinnen-Team.',
		message:
			'Vor dem Geburtstag startet eine geheime Vorermittlung. Mit der Einladung kommt nur ein Fragment. Alles Weitere wird online entschlüsselt.',
		tagline:
			'Löse drei Code-Rätsel, schalte die Einladung frei und öffne am Geburtstag als Gruppe die Einsatzakte.'
	},
	visuals: {
		/** Dunkles zerknülltes Papier – globaler UI-Hintergrund (WebP) */
		darkPaperBgUrl: '/images/black-paper-bg.webp',
		/** Schreibtisch / Cold-Case – grosses Hero (WebP aus scripts/optimize-images.mjs) */
		heroDeskUrl: '/images/hero-desk.webp',
		/** Helle Papierkörnung – auf Belegkarten (.paper) */
		paperGrainUrl: '/images/paper-grain-light.webp',
		/** Archiv / Katalog – zweites Bild im Hero */
		heroCardUrl: '/images/hero-archive.webp',
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
				'Nahaufnahme eines vergilbten Papiers mit ausgerissenem Rand, Schreibmaschinenfont und handschriftlichen Randmarken, high detail scan style.',
			envatoKeywords: 'old paper torn edge typewriter text vintage document texture scan'
		},
		preludeBanner: {
			title: 'Banner Vorermittlung',
			description:
				'Stylischer Ermittlungsraum mit Pinnwand, roten Fäden, Karte und Poststempel-Details, ohne lesbaren Plottext.',
			envatoKeywords: 'detective board red string map stamps mystery room no people'
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
		meetingPoint: 'Treffpunkt bei Familie Suter zu Hause',
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
				text:
					'Randnotiz: „Schlüsselwort: 19-16-21-18“',
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
	evidence: [
		{
			id: 'e1',
			name: 'Fotofragment mit Randfehler',
			type: 'Foto',
			locationHint: 'Startmappe im Innenbereich',
			summary:
				'Ein älteres Bild mit auffälligem Beschnitt und fehlender Ecke.',
			insight:
				'Das Material wurde nachträglich verändert oder gekürzt.',
			tags: ['foto', 'fragment', 'bearbeitung'],
			requiredBy: ['t2', 't4'],
			archiveText:
				'Randnotiz: „Nicht in der ersten Version veröffentlichen.“'
		},
		{
			id: 'e2',
			name: 'Briefausschnitt mit Schwärzungen',
			type: 'Brief',
			locationHint: 'Mappenfach mit Altakten',
			summary:
				'Ein teilweise unlesbarer Text mit mehreren geschwärzten Passagen.',
			insight:
				'Es gab Informationen, die absichtlich nicht vollständig sichtbar sein sollten.',
			tags: ['brief', 'schwaerzung', 'protokoll'],
			requiredBy: ['t1', 't3']
		},
		{
			id: 'e3',
			name: 'Amtsvermerk 14/17',
			type: 'Verwaltung',
			locationHint: 'Umschlag mit Stempel',
			summary:
				'Ein administrativer Vermerk mit Weiterleitungszeichen.',
			insight:
				'Das Dokument wurde intern durch mehrere Hände geleitet.',
			tags: ['stempel', 'verwaltung', 'ablauf'],
			requiredBy: ['t1', 't3']
		},
		{
			id: 'e4',
			name: 'Zeitungsnotiz ohne Titel',
			type: 'Presse',
			locationHint: 'Ablagefach Presse',
			summary:
				'Kurzer Ausschnitt mit unvollständiger Überschrift.',
			insight:
				'Der Vorgang war zumindest teilweise ausserhalb des Archivs bekannt.',
			tags: ['zeitung', 'ausschnitt', 'oeffentlich'],
			requiredBy: ['t3']
		},
		{
			id: 'e5',
			name: 'Wegskizze mit zwei Routen',
			type: 'Karte',
			locationHint: 'Gefaltetes Blatt im Register „Route“',
			summary:
				'Handskizze mit alternativen Wegen und Zeitmarken.',
			insight:
				'Die Planung enthielt mindestens zwei Varianten.',
			tags: ['karte', 'route', 'vergleich'],
			requiredBy: ['t4']
		},
		{
			id: 'e6',
			name: 'Handschriftvergleich',
			type: 'Notiz',
			locationHint: 'Zwischen losen Karteikarten',
			summary:
				'Zwei kurze Sätze, offenbar von derselben Hand.',
			insight:
				'Eine Person hat mehrere Hinweise im selben Stil hinterlassen.',
			tags: ['handschrift', 'vergleich', 'hinweis'],
			requiredBy: ['t5']
		},
		{
			id: 'e7',
			name: 'Unterschriftenblatt',
			type: 'Liste',
			locationHint: 'Archivhülle unten links',
			summary:
				'Teilweise lesbare Liste mit mehreren Namen.',
			insight:
				'Die Situation hat eine organisierte Reaktion ausgelöst.',
			tags: ['liste', 'reaktion', 'gruppe'],
			requiredBy: ['t6']
		},
		{
			id: 'e8',
			name: 'Finalhinweis Aussenstation',
			type: 'Hinweis',
			locationHint: 'Versiegelter Umschlag für die letzte Station',
			summary:
				'Kurzer Hinweistext für den Abschluss des Spiels.',
			insight:
				'Der letzte Schritt erfolgt ausserhalb des Startortes.',
			tags: ['finale', 'aussen', 'abschluss'],
			requiredBy: ['t7']
		}
	],
	suspects: [
		{
			id: 's1',
			name: 'Emil Gerber',
			role: 'Leitung Verwaltung',
			access: 'Sehr hoch',
			motive:
				'Wollte Abläufe kontrollierbar halten und Spannungen begrenzen.',
			redFlag: 'Mehrere Aktenwege liefen über seine Freigabe.',
			relief:
				'Es fehlt ein direkter Beleg für aktive Manipulation.'
		},
		{
			id: 's2',
			name: 'Rosa Moser',
			role: 'Poststelle',
			access: 'Mittel',
			motive: 'Kennt jede Zustellkette und wirkt deshalb naheliegend verdächtig.',
			redFlag: 'Ein Dokument wurde nie regulär bestätigt.',
			relief:
				'Sie könnte auch nur weitergeleitet haben, statt etwas zurückzuhalten.'
		},
		{
			id: 's3',
			name: 'Paul Lauener',
			role: 'Lehrperson',
			access: 'Hoch',
			motive:
				'Wollte Ruhe sichern, aber gleichzeitig Transparenz fördern.',
			redFlag: 'War in mehreren Besprechungen direkt involviert.',
			relief: 'Keine direkte Spur auf aktive Vertuschung.'
		},
		{
			id: 's4',
			name: 'Berta Kellenberger',
			role: 'Präsidium',
			access: 'Sehr hoch',
			motive: 'Wollte den Informationszeitpunkt kontrollieren.',
			redFlag: 'Kommunikationsfreigaben liefen über ihr Büro.',
			relief:
				'Strategische Kommunikation ist nicht automatisch Täterschaft.'
		},
		{
			id: 's5',
			name: 'Clara Wyss',
			role: 'Archivassistenz',
			access: 'Mittel',
			motive: 'Wollte zentrale Unterlagen sichern.',
			redFlag: 'Taucht in mehreren Randnotizen indirekt auf.',
			relief:
				'Kann ebenso Schlüsselfigur der Aufklärung sein.'
		}
	],
	timeline: [
		{
			id: 't1',
			year: 1968,
			label: 'Interne Planung startet',
			description: 'Erste Dokumente werden intern vorbereitet.',
			requiredEvidence: ['e2', 'e3']
		},
		{
			id: 't2',
			year: 1969,
			label: 'Bildmaterial wird verändert',
			description: 'Mindestens ein Archivbild liegt in späterer Fassung vor.',
			requiredEvidence: ['e1']
		},
		{
			id: 't3',
			year: 1969,
			label: 'Dokumentweg bleibt unklar',
			description:
				'Ein relevanter Schriftweg ist nicht vollständig nachvollziehbar.',
			requiredEvidence: ['e2', 'e3', 'e4']
		},
		{
			id: 't4',
			year: 1970,
			label: 'Folgen der Planung werden sichtbar',
			description: 'Mehrere Hinweise deuten auf praktische Auswirkungen.',
			requiredEvidence: ['e5', 'e4']
		},
		{
			id: 't5',
			year: 1970,
			label: 'Unterlagen werden gesichert',
			description:
				'Notizen sprechen dafür, dass Belege gezielt erhalten wurden.',
			requiredEvidence: ['e6']
		},
		{
			id: 't6',
			year: 1971,
			label: 'Koordinierte Reaktion entsteht',
			description: 'Mehrere Akteure reagieren organisiert.',
			requiredEvidence: ['e7']
		},
		{
			id: 't7',
			year: 1972,
			label: 'Letzte Station ausserhalb',
			description: 'Die Schlussphase liegt ausserhalb des Archivs.',
			requiredEvidence: ['e8', 'e7', 'e6']
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
			'Geht jetzt als Team zur vereinbarten Aussenstation am Schulhausareal und folgt den Anweisungen der Spielleitung.',
		gmInstruction:
			'Die Spielleitung übergibt den letzten Umschlag erst nach einer kurzen Team-Zusammenfassung.',
		resolution:
			'Der Fall ist abgeschlossen, sobald eure Beweiskette konsistent dokumentiert ist.'
	}
};
