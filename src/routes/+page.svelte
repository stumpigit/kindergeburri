<script>
	import { onMount } from 'svelte';
	import { caseFile } from '$lib/data/casefile';
	import {
		checkAnswer,
		createDefaultProgress,
		getEvidenceStats,
		getSolvedPreludeCount,
		isTimelineEventUnlocked,
		mergeProgress
	} from '$lib/state/progress';
	import { clearStoredProgress, loadStoredProgress, saveStoredProgress } from '$lib/state/storage';

	const navItems = [
		{ id: 'intro', label: 'Start' },
		{ id: 'prelude', label: 'Code-Rätsel' },
		{ id: 'evidence', label: 'Einsatzakte' },
		{ id: 'suspects', label: 'Profile' },
		{ id: 'timeline', label: 'Board' },
		{ id: 'finale', label: 'Finale' }
	];

	let activeView = $state('intro');
	let selectedEvidenceId = $state(caseFile.evidence[0]?.id ?? '');
	let progress = $state(createDefaultProgress(caseFile));

	let teamNameInput = $state('');
	let codenameInput = $state('');
	let statusMessage = $state('');
	let groupLoginInput = $state('');
	let groupLoginMessage = $state('');
	let finalCodeInput = $state('');
	let finalCodeMessage = $state('');

	let parentMode = $state(false);
	let parentCodeInput = $state('');
	let parentCodeMessage = $state('');

	let puzzleInputs = $state(
		Object.fromEntries(caseFile.prelude.puzzles.map((puzzle) => [puzzle.id, '']))
	);
	let puzzleFeedback = $state(
		Object.fromEntries(caseFile.prelude.puzzles.map((puzzle) => [puzzle.id, '']))
	);

	onMount(() => {
		const stored = loadStoredProgress();
		if (stored) {
			progress = mergeProgress(createDefaultProgress(caseFile), stored);
		}

		teamNameInput = progress.teamName ?? '';
		codenameInput = progress.codename ?? '';

		for (const puzzle of caseFile.prelude.puzzles) {
			puzzleInputs[puzzle.id] = progress.prelude[puzzle.id]?.lastInput ?? '';
		}
	});

	const selectedEvidence = $derived(
		caseFile.evidence.find((item) => item.id === selectedEvidenceId) ?? caseFile.evidence[0]
	);
	const solvedPreludeCount = $derived(getSolvedPreludeCount(progress));
	const invitationUnlocked = $derived(
		solvedPreludeCount >= caseFile.codes.missionUnlock.requiredSolvedPuzzles
	);
	const evidenceStats = $derived(getEvidenceStats(progress));
	const timelineUnlockedCount = $derived(
		caseFile.timeline.filter((event) => isTimelineEventUnlocked(progress, event)).length
	);
	const operationalLocked = $derived(!progress.investigationUnlocked);
	const progressPercent = $derived(
		Math.round(
			((evidenceStats.analyzed + solvedPreludeCount + (progress.finaleUnlocked ? 1 : 0)) /
				(caseFile.evidence.length + caseFile.prelude.puzzles.length + 1)) *
				100
		)
	);

	/** @param {string} viewId */
	function isViewLocked(viewId) {
		return ['evidence', 'suspects', 'timeline', 'finale'].includes(viewId) && operationalLocked;
	}

	function persistProgress(extraMessage = '') {
		progress = {
			...progress,
			lastUpdatedAt: new Date().toISOString()
		};
		saveStoredProgress(progress);
		if (extraMessage) statusMessage = extraMessage;
	}

	function saveTeamIdentity() {
		progress = {
			...progress,
			teamName: teamNameInput.trim(),
			codename: codenameInput.trim()
		};
		persistProgress('Teamprofil gespeichert.');
	}

	function resetAllProgress() {
		progress = createDefaultProgress(caseFile);
		teamNameInput = '';
		codenameInput = '';
		groupLoginInput = '';
		groupLoginMessage = '';
		finalCodeInput = '';
		finalCodeMessage = '';
		statusMessage = 'Fortschritt zurückgesetzt.';

		for (const puzzle of caseFile.prelude.puzzles) {
			puzzleInputs[puzzle.id] = '';
			puzzleFeedback[puzzle.id] = '';
		}

		clearStoredProgress();
		saveStoredProgress(progress);
	}

	/** @param {string} puzzleId */
	function solvePuzzle(puzzleId) {
		const puzzle = caseFile.prelude.puzzles.find((item) => item.id === puzzleId);
		if (!puzzle) return;

		const value = puzzleInputs[puzzleId] ?? '';
		const isCorrect = checkAnswer(value, puzzle.answers);
		const current = progress.prelude[puzzleId];

		progress = {
			...progress,
			prelude: {
				...progress.prelude,
				[puzzleId]: {
					...current,
					solved: isCorrect ? true : current.solved,
					attempts: current.attempts + 1,
					lastInput: value
				}
			}
		};

		puzzleFeedback[puzzleId] = isCorrect
			? 'Code korrekt.'
			: 'Noch nicht korrekt – prüfe den Hinweis und versuche es erneut.';

		if (!progress.missionUnlocked) {
			const solvedCount = Object.values(progress.prelude).filter((item) => item.solved).length;
			if (solvedCount >= caseFile.codes.missionUnlock.requiredSolvedPuzzles) {
				progress = {
					...progress,
					missionUnlocked: true
				};
				statusMessage = 'Einladungsdaten freigeschaltet.';
			}
		}

		persistProgress();
	}

	/** @param {string} evidenceId */
	function toggleEvidenceFound(evidenceId) {
		const current = progress.evidence[evidenceId];
		if (!current) return;
		const nextFound = !current.found;
		progress = {
			...progress,
			evidence: {
				...progress.evidence,
				[evidenceId]: {
					...current,
					found: nextFound,
					analyzed: nextFound ? current.analyzed : false
				}
			}
		};
		persistProgress('Fundstatus aktualisiert.');
	}

	/** @param {string} evidenceId */
	function toggleEvidenceAnalyzed(evidenceId) {
		const current = progress.evidence[evidenceId];
		if (!current || !current.found) return;
		progress = {
			...progress,
			evidence: {
				...progress.evidence,
				[evidenceId]: {
					...current,
					analyzed: !current.analyzed
				}
			}
		};
		persistProgress('Analysemarkierung gespeichert.');
	}

	/** @param {string} evidenceId @param {string} value */
	function updateEvidenceNotes(evidenceId, value) {
		const current = progress.evidence[evidenceId];
		if (!current) return;
		progress = {
			...progress,
			evidence: {
				...progress.evidence,
				[evidenceId]: {
					...current,
					notes: value
				}
			}
		};
		saveStoredProgress(progress);
	}

	/** @param {string} suspectId @param {number} suspicion */
	function setSuspicion(suspectId, suspicion) {
		const current = progress.suspects[suspectId];
		if (!current) return;
		progress = {
			...progress,
			suspects: {
				...progress.suspects,
				[suspectId]: {
					...current,
					suspicion
				}
			}
		};
		persistProgress('Verdachtswert aktualisiert.');
	}

	/** @param {string} suspectId @param {string} notes */
	function updateSuspectNotes(suspectId, notes) {
		const current = progress.suspects[suspectId];
		if (!current) return;
		progress = {
			...progress,
			suspects: {
				...progress.suspects,
				[suspectId]: {
					...current,
					notes
				}
			}
		};
		saveStoredProgress(progress);
	}

	function unlockInvestigation() {
		const valid = checkAnswer(groupLoginInput, caseFile.codes.groupLogin.accepted);
		progress = {
			...progress,
			groupLoginAttempts: progress.groupLoginAttempts + 1,
			investigationUnlocked: valid ? true : progress.investigationUnlocked
		};

		groupLoginMessage = valid
			? 'Gruppenlogin erfolgreich. Die Einsatzakte ist offen.'
			: 'Gruppencode nicht korrekt. Bitte bei der Spielleitung nachfragen.';

		persistProgress();
	}

	function unlockFinale() {
		const valid = checkAnswer(finalCodeInput, caseFile.codes.finaleUnlock.accepted);
		progress = {
			...progress,
			finalCodeAttempts: progress.finalCodeAttempts + 1,
			finaleUnlocked: valid ? true : progress.finaleUnlocked
		};

		finalCodeMessage = valid ? 'Finale freigeschaltet.' : 'Code nicht korrekt. Prüft eure Notizen.';
		persistProgress();
	}

	function unlockParentMode() {
		const valid = checkAnswer(parentCodeInput, caseFile.parentMode.accepted);
		if (valid) {
			parentMode = true;
			parentCodeMessage = 'Elternansicht aktiv.';
		} else {
			parentCodeMessage = 'Code nicht korrekt.';
		}
	}

	function deactivateParentMode() {
		parentMode = false;
		parentCodeInput = '';
		parentCodeMessage = '';
	}

	/** @param {string} viewId */
	function jumpToView(viewId) {
		activeView = viewId;
		statusMessage = '';
	}

	/** @param {number} value */
	function suspicionLabel(value) {
		switch (value) {
			case 1:
				return 'fast entlastet';
			case 2:
				return 'geringer Verdacht';
			case 3:
				return 'offen';
			case 4:
				return 'auffällig';
			case 5:
				return 'stark verdächtig';
			default:
				return 'offen';
		}
	}
</script>

<svelte:head>
	<title>{caseFile.title}</title>
	<meta
		name="description"
		content="Interaktive Krimi-Einladung mit Freischaltung über Vorrätsel und Teammodus am Geburtstag."
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;700;800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main class="scene" style={`--hero-bg:url(${caseFile.visuals.heroBackgroundUrl});`}>
	<header class="hero panel">
		<div class="hero__overlay"></div>
		<div class="hero__topline">
			<span class="badge muted">Fall-ID {caseFile.id}</span>
			<span class="badge warn">Fortschritt {progressPercent}%</span>
		</div>

		<div class="hero__content">
			<div class="hero__copy">
				<h1>{caseFile.title}</h1>
				<p class="subtitle">{caseFile.subtitle}</p>
				<p>{caseFile.invitation.message}</p>
				<p class="hero__tagline">{caseFile.invitation.tagline}</p>

				<div class="hero__actions">
					<button onclick={() => jumpToView('prelude')}>Code-Rätsel starten</button>
					<button class="secondary" onclick={() => jumpToView('intro')}>Ablauf ansehen</button>
				</div>
			</div>

			<aside class="hero__card">
				<div class="hero__card-image" style={`background-image:url(${caseFile.visuals.heroCardUrl});`}></div>
				<div class="hero__card-body">
					<p class="eyebrow">Einladungssystem</p>
					<strong>Zwei Phasen, ein Link</strong>
					<small>Vorab individuell · am Geburtstag als Team</small>
				</div>
			</aside>
		</div>

		<div class="phase-strip">
			<article class="phase-item panel">
				<span>Phase 1</span>
				<strong>Vorrätsel</strong>
				<small>{solvedPreludeCount}/{caseFile.prelude.puzzles.length}</small>
			</article>
			<article class={invitationUnlocked ? 'phase-item panel is-active' : 'phase-item panel'}>
				<span>Phase 2</span>
				<strong>Einladung</strong>
				<small>{invitationUnlocked ? 'freigeschaltet' : 'gesperrt'}</small>
			</article>
			<article class={operationalLocked ? 'phase-item panel' : 'phase-item panel is-active'}>
				<span>Phase 3</span>
				<strong>Einsatzakte</strong>
				<small>{operationalLocked ? 'wartet auf Gruppencode' : 'aktiv'}</small>
			</article>
		</div>

		<div class="hero__stats">
			<div class="panel stat">
				<p class="label">Rätsel</p>
				<strong>{solvedPreludeCount}/{caseFile.prelude.puzzles.length}</strong>
			</div>
			<div class="panel stat">
				<p class="label">Beweise</p>
				<strong>{evidenceStats.analyzed}/{evidenceStats.total}</strong>
			</div>
			<div class="panel stat">
				<p class="label">Board</p>
				<strong>{timelineUnlockedCount}/{caseFile.timeline.length}</strong>
			</div>
		</div>
	</header>

	<nav class="nav panel" aria-label="Fallnavigation">
		{#each navItems as item}
			<button
				class={activeView === item.id ? 'nav__btn nav__btn--active' : 'nav__btn'}
				onclick={() => jumpToView(item.id)}
			>
				<span>{item.label}</span>
				{#if isViewLocked(item.id)}
					<small>🔒</small>
				{/if}
			</button>
		{/each}
	</nav>

	<section class="panel parent-gate">
		<div>
			<h2>Elternansicht</h2>
			<p>Optionaler Bereich für Organisation, Hinweise und Asset-Infos.</p>
		</div>
		{#if !parentMode}
			<div class="parent-gate__controls">
				<input bind:value={parentCodeInput} placeholder="Elterncode" />
				<button class="secondary" onclick={unlockParentMode}>Aktivieren</button>
				{#if parentCodeMessage}
					<p class="locked-text">{parentCodeMessage}</p>
				{/if}
			</div>
		{:else}
			<div class="parent-gate__controls">
				<span class="badge ok">Elternansicht aktiv</span>
				<button class="secondary" onclick={deactivateParentMode}>Schliessen</button>
			</div>
		{/if}
	</section>

	{#if activeView === 'intro'}
		<section class="grid intro-grid">
			<article class="panel intro-card">
				<h2>{caseFile.invitation.headline}</h2>
				<p>Alles läuft über einen einzigen Link:</p>
				<ol class="flow-list">
					<li>Vorab drei Codes knacken</li>
					<li>Einladungsinfos automatisch freischalten</li>
					<li>Am Geburtstag Gruppencode für Einsatzmodus</li>
				</ol>
				<div class="callout">
					<strong>Design-Entscheid:</strong>
					<span>Öffentliche Seite zeigt bewusst keine Plotdetails.</span>
				</div>
			</article>

			<article class="paper briefing">
				<h3>Einladungsdaten</h3>
				{#if invitationUnlocked}
					<dl>
						<div>
							<dt>{caseFile.birthdayBriefing.dateLabel}</dt>
							<dd>{caseFile.birthdayBriefing.dateValue}</dd>
						</div>
						<div>
							<dt>Treffpunkt</dt>
							<dd>{caseFile.birthdayBriefing.meetingPoint}</dd>
						</div>
						<div>
							<dt>Dresscode</dt>
							<dd>{caseFile.birthdayBriefing.dresscode}</dd>
						</div>
					</dl>
					<h4>Mitbringen</h4>
					<ul>
						{#each caseFile.birthdayBriefing.bringAlong as item}
							<li>{item}</li>
						{/each}
					</ul>
				{:else}
					<p>{caseFile.birthdayBriefing.unlockNote}</p>
					<p class="locked-text">Status: {solvedPreludeCount}/{caseFile.prelude.puzzles.length}</p>
				{/if}
			</article>

			<article class="panel teaser">
				<div class="teaser__visual" style={`background-image:url(${caseFile.visuals.fragmentsUrl});`}></div>
				<h3>Einladungspaket</h3>
				<ul>
					{#each caseFile.invitationKit as item}
						<li>{item}</li>
					{/each}
				</ul>
				<button onclick={() => jumpToView('prelude')}>Zu den Rätseln</button>
			</article>
		</section>

		{#if parentMode}
			<section class="panel asset-section">
				<div class="section__head">
					<div>
						<h2>Elternbereich: Bild- und Asset-Briefing</h2>
						<p>Diese Hinweise sind nur in der Elternansicht sichtbar.</p>
					</div>
				</div>
				<div class="asset-grid">
					{#each Object.values(caseFile.imagePlaceholders) as asset}
						<article class="panel asset-card">
							<h3>{asset.title}</h3>
							<p>{asset.description}</p>
							<code>{asset.envatoKeywords}</code>
						</article>
					{/each}
				</div>
			</section>
		{/if}
	{/if}

	{#if activeView === 'prelude'}
		<section class="panel section">
			<div class="section__head">
				<div>
					<h2>Code-Rätsel</h2>
					<p>{caseFile.prelude.intro}</p>
				</div>
				<span class={invitationUnlocked ? 'badge ok' : 'badge warn'}>
					{invitationUnlocked ? 'Einladung freigeschaltet' : 'Noch gesperrt'}
				</span>
			</div>

			<div class="puzzles">
				{#each caseFile.prelude.puzzles as puzzle}
					{@const teaser = caseFile.prelude.teasers.find((entry) => entry.supportsPuzzleId === puzzle.id)}
					<article class="panel puzzle">
						<h3>{puzzle.title}</h3>
						<div class="paper clue-card">
							<strong>{teaser?.title}</strong>
							{#if parentMode}
								<p class="teaser-clue__text">{teaser?.text}</p>
							{:else}
								<p class="locked-text">Dokumentfragment sichtbar · Detailtext verborgen</p>
							{/if}
						</div>
						<p class="hint">Hinweis: {puzzle.hint}</p>
						{#if parentMode}
							<p class="source">Quelle: {puzzle.source}</p>
						{/if}
						<p class="question">{puzzle.question}</p>
						<div class="puzzle__controls">
							<input
								bind:value={puzzleInputs[puzzle.id]}
								placeholder="Antwort eingeben"
								onkeydown={(event) => {
									if (event.key === 'Enter') solvePuzzle(puzzle.id);
								}}
							/>
							<button onclick={() => solvePuzzle(puzzle.id)}>Prüfen</button>
						</div>
						<p class={progress.prelude[puzzle.id].solved ? 'feedback feedback--ok' : 'feedback'}>
							{puzzleFeedback[puzzle.id] || (progress.prelude[puzzle.id].solved
								? 'Bereits gelöst.'
								: `Versuche: ${progress.prelude[puzzle.id].attempts}`)}
						</p>
					</article>
				{/each}
			</div>

			{#if parentMode}
				<details class="panel gm-note">
					<summary>Elternnotizen</summary>
					<ul>
						{#each caseFile.prelude.gmNotes as note}
							<li>{note}</li>
						{/each}
					</ul>
				</details>
			{/if}
		</section>
	{/if}

	{#if activeView === 'evidence'}
		{#if operationalLocked}
			<section class="panel section lockscreen">
				<div class="section__head">
					<div>
						<h2>Gruppenlogin</h2>
						<p>Der Einsatzbereich wird am Geburtstag als Team freigeschaltet.</p>
					</div>
					<span class="badge warn">Gesperrt</span>
				</div>
				<div class="panel finale__unlock">
					<label>
						<span>Gruppencode</span>
						<input
							bind:value={groupLoginInput}
							placeholder="z.B. team-echo-17"
							onkeydown={(event) => {
								if (event.key === 'Enter') unlockInvestigation();
							}}
						/>
					</label>
					<button onclick={unlockInvestigation}>Login öffnen</button>
					<p class={progress.investigationUnlocked ? 'feedback feedback--ok' : 'feedback'}>
						{groupLoginMessage || `Bisherige Versuche: ${progress.groupLoginAttempts}`}
					</p>
				</div>
			</section>
		{:else}
			<section class="grid evidence-layout">
				<aside class="panel evidence-list">
					<h2>Beweisablage</h2>
					<p>Funde markieren, Analyse ergänzen, Notizen erfassen.</p>
					<ul>
						{#each caseFile.evidence as item}
							<li>
								<button
									class={selectedEvidenceId === item.id ? 'evidence-btn evidence-btn--active' : 'evidence-btn'}
									onclick={() => (selectedEvidenceId = item.id)}
								>
									<div>
										<strong>{item.name}</strong>
										<small>{item.type}</small>
									</div>
									<div class="evidence-badges">
										<span class={progress.evidence[item.id].found ? 'badge ok' : 'badge muted'}>
											{progress.evidence[item.id].found ? 'gefunden' : 'offen'}
										</span>
										<span class={progress.evidence[item.id].analyzed ? 'badge ok' : 'badge muted'}>
											{progress.evidence[item.id].analyzed ? 'analysiert' : 'roh'}
										</span>
									</div>
								</button>
							</li>
						{/each}
					</ul>
				</aside>

				<article class="panel evidence-detail">
					<h3>{selectedEvidence.name}</h3>
					<p class="evidence-meta">
						<span class="badge muted">{selectedEvidence.type}</span>
						<span class="badge warn">Fundort: {selectedEvidence.locationHint}</span>
					</p>
					<p>{selectedEvidence.summary}</p>
					<div class="paper archive-snippet">
						<h4>Archivauszug</h4>
						<p>{selectedEvidence.archiveText || selectedEvidence.insight}</p>
					</div>
					<div class="detail-actions">
						<button onclick={() => toggleEvidenceFound(selectedEvidence.id)}>
							{progress.evidence[selectedEvidence.id].found ? 'Fund zurücknehmen' : 'Als gefunden markieren'}
						</button>
						<button
							class="secondary"
							disabled={!progress.evidence[selectedEvidence.id].found}
							onclick={() => toggleEvidenceAnalyzed(selectedEvidence.id)}
						>
							{progress.evidence[selectedEvidence.id].analyzed
								? 'Analyse zurücksetzen'
								: 'Als analysiert markieren'}
						</button>
					</div>
					<label class="notes">
						<span>Notizen zum Beweis</span>
						<textarea
							rows="5"
							placeholder="Beobachtung, Frage, nächste Aktion"
							value={progress.evidence[selectedEvidence.id].notes}
							oninput={(event) => updateEvidenceNotes(selectedEvidence.id, event.currentTarget.value)}
						></textarea>
					</label>
				</article>
			</section>
		{/if}
	{/if}

	{#if activeView === 'suspects'}
		{#if operationalLocked}
			<section class="panel section"><p class="locked-text">Nach Gruppenlogin verfügbar.</p></section>
		{:else}
			<section class="panel section">
				<div class="section__head">
					<div>
						<h2>Verdachtsprofile</h2>
						<p>Verdachtsgrad setzen und Teamnotizen erfassen.</p>
					</div>
				</div>
				<div class="suspect-grid">
					{#each caseFile.suspects as suspect}
						<article class="panel suspect-card">
							<div class="suspect-head">
								<h3>{suspect.name}</h3>
								<span class="badge muted">{suspect.role}</span>
							</div>
							<p><strong>Zugang:</strong> {suspect.access}</p>
							<p><strong>Mögliches Motiv:</strong> {suspect.motive}</p>
							<p><strong>Belastender Punkt:</strong> {suspect.redFlag}</p>
							<p><strong>Entlastender Punkt:</strong> {suspect.relief}</p>
							<div class="suspicion">
								<span>Verdacht: {suspicionLabel(progress.suspects[suspect.id].suspicion)}</span>
								<input
									type="range"
									min="1"
									max="5"
									value={progress.suspects[suspect.id].suspicion}
									oninput={(event) =>
										setSuspicion(suspect.id, Number(event.currentTarget.value))}
								/>
							</div>
							<label class="notes">
								<span>Teamnotiz</span>
								<textarea
									rows="3"
									placeholder="Warum so bewertet?"
									value={progress.suspects[suspect.id].notes}
									oninput={(event) => updateSuspectNotes(suspect.id, event.currentTarget.value)}
								></textarea>
							</label>
						</article>
					{/each}
				</div>
			</section>
		{/if}
	{/if}

	{#if activeView === 'timeline'}
		{#if operationalLocked}
			<section class="panel section"><p class="locked-text">Nach Gruppenlogin verfügbar.</p></section>
		{:else}
			<section class="panel section">
				<div class="section__head">
					<div>
						<h2>Board</h2>
						<p>Ereignisse werden mit analysierten Beweisen freigeschaltet.</p>
					</div>
					<span class="badge warn">{timelineUnlockedCount}/{caseFile.timeline.length}</span>
				</div>
				<ol class="timeline">
					{#each caseFile.timeline as event}
						{@const unlocked = isTimelineEventUnlocked(progress, event)}
						<li class={unlocked ? 'timeline-item timeline-item--open' : 'timeline-item'}>
							<div class="timeline-item__year">{event.year}</div>
							<div>
								<h3>{event.label}</h3>
								{#if unlocked}
									<p>{event.description}</p>
								{:else}
									<p class="locked-text">
										Gesperrt – benötigt: {event.requiredEvidence
											.map((evidenceId) =>
												caseFile.evidence.find((item) => item.id === evidenceId)?.name || evidenceId
											)
											.join(', ')}
									</p>
								{/if}
							</div>
						</li>
					{/each}
				</ol>
			</section>
		{/if}
	{/if}

	{#if activeView === 'finale'}
		<section class="panel section finale">
			<div class="section__head">
				<div>
					<h2>Finale</h2>
					<p>Abschlusscode nur im Teammodus verwenden.</p>
				</div>
				<span class={progress.finaleUnlocked ? 'badge ok' : 'badge warn'}>
					{progress.finaleUnlocked ? 'freigeschaltet' : 'gesperrt'}
				</span>
			</div>
			{#if operationalLocked}
				<p class="locked-text">Finale wird erst nach Gruppenlogin verfügbar.</p>
			{:else}
				<div class="panel finale__unlock">
					<label>
						<span>Finalcode</span>
						<input
							bind:value={finalCodeInput}
							placeholder="z.B. protokoll-komplett"
							onkeydown={(event) => {
								if (event.key === 'Enter') unlockFinale();
							}}
						/>
					</label>
					<button onclick={unlockFinale}>Code prüfen</button>
					<p class={progress.finaleUnlocked ? 'feedback feedback--ok' : 'feedback'}>
						{finalCodeMessage || `Bisherige Versuche: ${progress.finalCodeAttempts}`}
					</p>
				</div>
			{/if}
			<article class="paper finale__brief">
				<h3>{caseFile.finale.headline}</h3>
				<p>{caseFile.finale.fieldInstruction}</p>
				<p><strong>Spielleitung:</strong> {caseFile.finale.gmInstruction}</p>
				{#if progress.finaleUnlocked}
					<p class="resolution">{caseFile.finale.resolution}</p>
				{/if}
			</article>
		</section>
	{/if}
</main>

<style>
	.scene {
		display: grid;
		gap: 1rem;
		position: relative;
	}

	.scene::before {
		content: '';
		position: fixed;
		inset: 0;
		background:
			linear-gradient(180deg, rgba(7, 10, 19, 0.82) 0%, rgba(10, 14, 22, 0.92) 60%, rgba(8, 12, 19, 0.96) 100%),
			var(--hero-bg) center/cover no-repeat;
		z-index: -2;
	}

	.scene::after {
		content: '';
		position: fixed;
		inset: 0;
		z-index: -1;
		background-image:
			radial-gradient(circle at 20% 15%, rgba(138, 158, 255, 0.22), transparent 35%),
			radial-gradient(circle at 80% 10%, rgba(218, 169, 101, 0.12), transparent 32%);
		pointer-events: none;
	}

	.hero {
		overflow: hidden;
		display: grid;
		gap: 0.9rem;
		position: relative;
		background: linear-gradient(155deg, rgba(14, 19, 31, 0.95), rgba(20, 29, 45, 0.82));
	}

	.hero__overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(120deg, rgba(120, 138, 255, 0.16), transparent 45%);
		pointer-events: none;
	}

	.hero__topline,
	.hero__content,
	.phase-strip,
	.hero__stats {
		position: relative;
		z-index: 1;
	}

	.hero__topline {
		display: flex;
		justify-content: space-between;
		gap: 0.6rem;
		flex-wrap: wrap;
	}

	.hero__content {
		display: grid;
		gap: 1rem;
	}

	@media (min-width: 960px) {
		.hero__content {
			grid-template-columns: 1.35fr 1fr;
		}
	}

	.hero__copy {
		display: grid;
		gap: 0.75rem;
	}

	.hero__copy h1 {
		font-family: 'Plus Jakarta Sans', Inter, sans-serif;
		font-size: clamp(2rem, 3.3vw, 3.25rem);
		letter-spacing: -0.03em;
		margin: 0;
	}

	.subtitle {
		color: var(--text-dim);
	}

	.hero__tagline {
		color: #d8ceff;
		font-weight: 600;
	}

	.hero__actions {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.hero__card {
		border-radius: 12px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.14);
		background: rgba(8, 12, 20, 0.58);
	}

	.hero__card-image {
		min-height: 180px;
		background-position: center;
		background-size: cover;
		filter: saturate(0.85) contrast(1.02);
	}

	.hero__card-body {
		padding: 0.75rem;
		display: grid;
		gap: 0.3rem;
	}

	.hero__card-body .eyebrow {
		margin: 0;
		text-transform: uppercase;
		font-size: 0.7rem;
		letter-spacing: 0.1em;
		color: var(--muted);
	}

	.phase-strip {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
		gap: 0.6rem;
	}

	.phase-item {
		display: grid;
		gap: 0.25rem;
	}

	.phase-item span {
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--muted);
	}

	.phase-item small {
		color: var(--text-dim);
	}

	.phase-item.is-active {
		border-color: rgba(118, 214, 168, 0.6);
		background: linear-gradient(160deg, rgba(26, 58, 49, 0.9), rgba(14, 33, 27, 0.8));
	}

	.hero__stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 0.6rem;
	}

	.stat {
		padding: 0.7rem;
	}

	.stat .label {
		margin: 0;
		font-size: 0.8rem;
		color: var(--text-dim);
	}

	.nav {
		display: flex;
		flex-wrap: wrap;
		gap: 0.55rem;
		position: sticky;
		top: 0.65rem;
		z-index: 12;
		backdrop-filter: blur(10px);
	}

	.nav__btn {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.55rem 0.8rem;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: var(--text-dim);
	}

	.nav__btn--active {
		background: rgba(121, 136, 255, 0.22);
		border-color: rgba(177, 188, 255, 0.7);
		color: #eef2ff;
	}

	.parent-gate {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
		align-items: center;
	}

	.parent-gate h2 {
		margin: 0;
	}

	.parent-gate__controls {
		display: flex;
		gap: 0.5rem;
		align-items: center;
		flex-wrap: wrap;
	}

	.section {
		display: grid;
		gap: 1rem;
	}

	.section__head {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		align-items: flex-start;
		flex-wrap: wrap;
	}

	.intro-grid {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
	}

	.intro-card,
	.teaser,
	.asset-card,
	.puzzle,
	.evidence-detail,
	.suspect-card {
		display: grid;
		gap: 0.65rem;
	}

	.flow-list,
	.briefing ul,
	.teaser ul,
	.gm-note ul {
		margin: 0;
		padding-left: 1.2rem;
		display: grid;
		gap: 0.34rem;
	}

	.callout {
		padding: 0.7rem;
		border-radius: 10px;
		border: 1px solid rgba(164, 177, 255, 0.5);
		background: rgba(113, 124, 204, 0.16);
	}

	dl {
		margin: 0;
		display: grid;
		gap: 0.45rem;
	}

	dt {
		font-weight: 700;
	}

	dd {
		margin: 0.1rem 0 0;
	}

	.teaser__visual {
		min-height: 130px;
		border-radius: 10px;
		background-size: cover;
		background-position: center;
		border: 1px solid rgba(255, 255, 255, 0.17);
	}

	.asset-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 0.8rem;
	}

	.asset-card code {
		display: block;
		padding: 0.5rem 0.6rem;
		border-radius: 8px;
		background: rgba(6, 8, 14, 0.5);
		border: 1px solid rgba(255, 255, 255, 0.1);
		font-size: 0.82rem;
		line-height: 1.4;
	}

	.puzzles {
		display: grid;
		gap: 0.8rem;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	}

	.clue-card {
		display: grid;
		gap: 0.4rem;
	}

	.teaser-clue__text {
		white-space: pre-line;
	}

	.puzzle .hint,
	.puzzle .source {
		font-size: 0.9rem;
		color: var(--text-dim);
	}

	.puzzle__controls {
		display: flex;
		gap: 0.45rem;
	}

	.feedback {
		font-size: 0.88rem;
		color: var(--text-dim);
	}

	.feedback--ok {
		color: #9fe0b8;
	}

	.evidence-layout {
		display: grid;
		gap: 1rem;
		grid-template-columns: 1fr;
	}

	@media (min-width: 980px) {
		.evidence-layout {
			grid-template-columns: 320px 1fr;
		}
	}

	.evidence-list {
		display: grid;
		gap: 0.7rem;
	}

	.evidence-list ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 0.45rem;
	}

	.evidence-btn {
		width: 100%;
		text-align: left;
		display: grid;
		gap: 0.45rem;
		background: rgba(16, 24, 30, 0.55);
		border: 1px solid var(--border);
		color: var(--text);
	}

	.evidence-btn small {
		display: block;
		color: var(--text-dim);
	}

	.evidence-btn--active {
		border-color: rgba(176, 188, 255, 0.65);
		background: rgba(113, 112, 255, 0.18);
	}

	.evidence-badges {
		display: flex;
		gap: 0.35rem;
		flex-wrap: wrap;
	}

	.archive-snippet,
	.detail-actions,
	.notes,
	.finale {
		display: grid;
		gap: 0.6rem;
	}

	.suspect-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 0.8rem;
	}

	.suspect-head {
		display: flex;
		justify-content: space-between;
		gap: 0.5rem;
		align-items: center;
	}

	.suspicion {
		display: grid;
		gap: 0.3rem;
	}

	.suspicion input[type='range'] {
		padding: 0;
	}

	.timeline {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 0.65rem;
	}

	.timeline-item {
		display: grid;
		grid-template-columns: 90px 1fr;
		gap: 0.75rem;
		padding: 0.75rem;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 10px;
		background: rgba(10, 18, 23, 0.45);
	}

	.timeline-item--open {
		border-color: rgba(104, 199, 154, 0.5);
		background: rgba(53, 122, 93, 0.16);
	}

	.timeline-item__year {
		font-weight: 700;
		color: #c8d0ff;
	}

	.locked-text {
		color: var(--muted);
		font-style: italic;
	}

	.finale__unlock {
		display: grid;
		gap: 0.6rem;
		max-width: 420px;
	}

	.finale__brief .resolution {
		margin-top: 0.5rem;
		padding-top: 0.5rem;
		border-top: 1px solid rgba(29, 26, 20, 0.2);
	}
</style>
