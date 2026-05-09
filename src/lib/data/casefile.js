export const caseFile = {
	id: 'akte-zimmerwald',
	title: 'Akte Zimmerwald – Das Foto ohne Namen',
	subtitle: 'Interaktive Vorermittlung zum Krimi-Kindergeburtstag',
	setting: {
		historicPeriod: '1968–1972 (fiktiver Fall mit historischem Bezug)',
		location: 'Zimmerwald / Richtung Kehrsatz',
		now: 'Heute'
	},
	invitation: {
		headline: 'Du bist offiziell Teil des Ermittlerinnen-Teams.',
		message:
			'Vor dem Geburtstag startet die geheime Vorermittlung. Auf dieser Seite entschlüsselst du erste Spuren, lernst die Akte kennen und sammelst Wissen für den grossen Falltag.',
		tagline:
			'Am Geburtstag selbst geht die Untersuchung draussen weiter – beim Schulhaus, am Sportplatz und rund um den Teich.'
	},
	birthdayBriefing: {
		dateLabel: 'Falltag',
		dateValue: 'Kindergeburtstag (Datum durch Familie setzen)',
		meetingPoint: 'Treffpunkt bei euch zu Hause, Schlussrunde draussen beim Schulhaus',
		dresscode: 'Wetterfeste Kleidung, bequeme Schuhe, Ermittlerinnen-Blick',
		bringAlong: ['Neugier', 'Teamgeist', 'Scharfe Augen', 'Optional: Lupe']
	},
	prelude: {
		intro:
			'Die Vorermittlung ist offen. Löse mindestens 2 von 3 Rätseln, um die operative Akte freizuschalten.',
		puzzles: [
			{
				id: 'p1',
				title: 'Rätsel 1 – Der verschwiegene Zielort',
				hint:
					'Im historischen Brief stand, dass die Kinder aus Zimmerwald an einen anderen Schulort gehen sollten.',
				question: 'Welcher Ort war geplant?',
				answers: ['Kehrsatz']
			},
			{
				id: 'p2',
				title: 'Rätsel 2 – Das Foto ohne Namen',
				hint:
					'Eine Person wurde aus der offiziellen Darstellung fast gelöscht. Gesucht ist der Vorname.',
				question: 'Wie heisst die junge Frau, die warnen wollte?',
				answers: ['Clara', 'Clara Wyss']
			},
			{
				id: 'p3',
				title: 'Rätsel 3 – Die richtige Richtung',
				hint: 'Das Finale findet nicht im Schulhausinnern statt, sondern draussen beim Wasser.',
				question: 'Welcher Ort ist im Hinweis zentral?',
				answers: ['Teich', 'Am Teich']
			}
		]
	},
	evidence: [
		{
			id: 'e1',
			name: 'Gruppenfoto mit Randbruch',
			type: 'Foto',
			locationHint: 'Startmappe zu Hause',
			summary:
				'Altes Gruppenbild mit verdächtiger Randretusche. Eine Person scheint nachträglich verdrängt worden zu sein.',
			insight:
				'Das Bild wurde bearbeitet oder neu zugeschnitten. Die ursprüngliche Szene war vollständiger.',
			tags: ['foto', 'retusche', 'clara'],
			requiredBy: ['t2', 't4'],
			archiveText:
				'Notiz auf Rückseite: „Vor der Sitzung aufgenommen. Nicht für den Aushang übernehmen.“'
		},
		{
			id: 'e2',
			name: 'Brieffragment an die Kommission',
			type: 'Brief',
			locationHint: 'Zwischen alten Unterlagen in der Schachtel',
			summary:
				'Unvollständiger Brief mit den Begriffen „Kehrsatz“, „vor den Ferien“ und „nicht öffentlich“.',
			insight:
				'Die Verlegung war konkret geplant und sollte vorerst intern bleiben.',
			tags: ['brief', 'kehrsatz', 'kommission'],
			requiredBy: ['t1', 't3']
		},
		{
			id: 'e3',
			name: 'Gemeindestempel 14/68',
			type: 'Verwaltung',
			locationHint: 'Im Umschlag mit Aktenvermerk',
			summary:
				'Offizieller Vermerk mit Stempel und interner Weiterleitung. Wirkt nach formellem Verwaltungsweg.',
			insight:
				'Der Vorgang war registriert. Mindestens drei Stellen hatten Zugriff auf denselben Inhalt.',
			tags: ['stempel', 'verwaltung', 'zugang'],
			requiredBy: ['t1', 't3']
		},
		{
			id: 'e4',
			name: 'Zeitungsausschnitt Schulwegdebatte',
			type: 'Presse',
			locationHint: 'Im Buch „Dorfchronik“ markiert',
			summary:
				'Lokale Meldung über Schulraum und längere Wege. Kein direkter Name, aber klarer politischer Druck.',
			insight:
				'Die Debatte war nicht nur intern – sie stand knapp vor der öffentlichen Diskussion.',
			tags: ['zeitung', 'druck', 'debatte'],
			requiredBy: ['t3']
		},
		{
			id: 'e5',
			name: 'Skizzenplan Zimmerwald–Kehrsatz',
			type: 'Karte',
			locationHint: 'Gefaltetes Blatt im Fach „Verkehr“',
			summary:
				'Handgezeichnete Wegskizze mit Markierungen für Schulweg, Höhenmeter und Umsteigepunkt.',
			insight:
				'Der geplante Weg war deutlich aufwendiger. Das erklärt den späteren Widerstand im Dorf.',
			tags: ['karte', 'schulweg', 'argument'],
			requiredBy: ['t4']
		},
		{
			id: 'e6',
			name: 'Doppelte Handschriftprobe',
			type: 'Notiz',
			locationHint: 'Zwischen Rezeptkarten versteckt',
			summary:
				'Zwei Notizen mit derselben Handschrift: „Das darf nicht verschwinden.“ und „Treffpunkt beim Teich.“',
			insight:
				'Jemand aus dem Inneren des Falls wollte Beweise retten und einen sicheren Übergabeort nutzen.',
			tags: ['handschrift', 'teich', 'warnung'],
			requiredBy: ['t5']
		},
		{
			id: 'e7',
			name: 'Petition „Schule bleibt“',
			type: 'Unterschriften',
			locationHint: 'Archivhülle im unteren Fach',
			summary:
				'Teilweise lesbare Unterschriftenliste gegen die Verlegung nach Kehrsatz.',
			insight:
				'Die Bevölkerung reagierte organisiert. Das erklärt, warum der Plan gestoppt wurde.',
			tags: ['petition', 'widerstand', 'dorf'],
			requiredBy: ['t6']
		},
		{
			id: 'e8',
			name: 'Versteckhinweis Finale',
			type: 'Hinweis',
			locationHint: 'Wetterfester Zettel nahe Ausgang',
			summary:
				'Kurzer kryptischer Hinweis auf den letzten Fundort unter freiem Himmel.',
			insight:
				'Der finale Beweis wartet draussen. Ohne diesen Schritt bleibt die Akte unvollständig.',
			tags: ['finale', 'draussen', 'teich'],
			requiredBy: ['t7']
		}
	],
	suspects: [
		{
			id: 's1',
			name: 'Emil Gerber',
			role: 'Gemeindeschreiber',
			access: 'Sehr hoch',
			motive:
				'Wollte möglicherweise Konflikte kontrollieren und interne Entscheidungen nicht eskalieren lassen.',
			redFlag: 'Akte, Stempel und interne Verteiler liefen über seinen Tisch.',
			relief:
				'Kein direkter Nachweis, dass er den finalen Brief zerstörte; könnte unter Vorgaben gehandelt haben.'
		},
		{
			id: 's2',
			name: 'Rosa Moser',
			role: 'Posthalterin',
			access: 'Mittel',
			motive: 'Kennt den Weg jedes Schreibens und wirkt damit sofort verdächtig.',
			redFlag: 'Der Brief kam nie offiziell an.',
			relief:
				'Sie könnte den Brief erkannt und indirekt weitergereicht haben, statt ihn zu blockieren.'
		},
		{
			id: 's3',
			name: 'Paul Lauener',
			role: 'Lehrer',
			access: 'Hoch',
			motive:
				'Wollte Unruhe unter Familien verhindern, hatte aber auch Interesse am Erhalt der Schule.',
			redFlag: 'War bei Sitzungen nah genug dran, um Hinweise zu sichern.',
			relief: 'Könnte zu den stillen Unterstützern der Gegenbewegung gehört haben.'
		},
		{
			id: 's4',
			name: 'Berta Kellenberger',
			role: 'Gemeindepräsidentin',
			access: 'Sehr hoch',
			motive: 'Wollte politische Kontrolle über das Timing der Information behalten.',
			redFlag: 'Offizielle Linie: zuerst intern, später öffentlich.',
			relief:
				'Politischer Druck bedeutet nicht automatisch, dass sie selbst Beweise verschwinden liess.'
		},
		{
			id: 's5',
			name: 'Clara Wyss',
			role: 'Hilfslehrerin / Archivhilfe',
			access: 'Mittel',
			motive: 'Wollte die Wahrheit für die Familien sichern.',
			redFlag: 'Ihr Name verschwindet aus Foto und Notizen – warum?',
			relief:
				'Wahrscheinlich keine Täterin, sondern die entscheidende Informantin des Falls.'
		}
	],
	timeline: [
		{
			id: 't1',
			year: 1968,
			label: 'Interner Schliessungsplan entsteht',
			description: 'In Gremien wird die Verlegung der Schule nach Kehrsatz vorbereitet.',
			requiredEvidence: ['e2', 'e3']
		},
		{
			id: 't2',
			year: 1969,
			label: 'Gruppenfoto wird archiviert und verändert',
			description:
				'Ein Foto aus Zimmerwald taucht später in unvollständiger Form auf; eine Person gerät aus dem Bild.',
			requiredEvidence: ['e1']
		},
		{
			id: 't3',
			year: 1969,
			label: 'Der Warnbrief verschwindet im System',
			description:
				'Der Brief wurde verfasst, aber nie als regulärer Eingang bestätigt. Verwaltungs- und Postweg überlagern sich.',
			requiredEvidence: ['e2', 'e3', 'e4']
		},
		{
			id: 't4',
			year: 1970,
			label: 'Folgen für Familien werden sichtbar',
			description: 'Der längere Schulweg wird zum zentralen Gegenargument im Dorf.',
			requiredEvidence: ['e5', 'e4']
		},
		{
			id: 't5',
			year: 1970,
			label: 'Beweise werden gesichert',
			description:
				'Notizen und Hinweise deuten darauf hin, dass jemand bewusst Dokumente rettete und einen Treffpunkt nutzte.',
			requiredEvidence: ['e6']
		},
		{
			id: 't6',
			year: 1971,
			label: 'Öffentlicher Widerstand organisiert sich',
			description: 'Mit Unterschriften und Druck wird die Schliessung politisch riskant.',
			requiredEvidence: ['e7']
		},
		{
			id: 't7',
			year: 1972,
			label: 'Finale Spur führt nach draussen',
			description: 'Die vollständige Auflösung liegt nicht im Archiv, sondern unter freiem Himmel bereit.',
			requiredEvidence: ['e8', 'e7', 'e6']
		}
	],
	codes: {
		missionUnlock: {
			requiredSolvedPuzzles: 2
		},
		finaleUnlock: {
			value: 'zimmerwaldbleibt',
			accepted: ['zimmerwaldbleibt', 'schulebleibtzimmerwald', 'aktevollstaendig']
		}
	},
	finale: {
		headline: 'Finale freigeschaltet',
		fieldInstruction:
			'Geht jetzt als Team zum vereinbarten Ort draussen beim Schulhaus. Prüft zuerst den Bereich beim Teich, danach Sportplatz und Spielplatzrand.',
		gmInstruction:
			'Der Spielleiter übergibt den letzten Umschlag erst, wenn das Team den Fall in 2–3 Sätzen zusammenfassen kann.',
		resolution:
			'Die Schule in Zimmerwald blieb, weil Belege nicht verschwanden, sondern weitergegeben wurden. Der Versuch der Vertuschung scheiterte am gemeinsamen Widerstand.'
	}
};
