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
		{ id: 'intro', label: 'Einladung' },
		{ id: 'prelude', label: 'Vorermittlung' },
		{ id: 'evidence', label: 'Akte' },
		{ id: 'suspects', label: 'Verdachtstafel' },
		{ id: 'timeline', label: 'Zeitstrahl' },
		{ id: 'finale', label: 'Finale' }
	];

	let activeView = $state('intro');
	let selectedEvidenceId = $state(caseFile.evidence[0]?.id ?? '');
	let progress = $state(createDefaultProgress(caseFile));

	let teamNameInput = $state('');
	let codenameInput = $state('');
	let statusMessage = $state('');
	let finalCodeInput = $state('');
	let finalCodeMessage = $state('');

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
	const missionReady = $derived(
		solvedPreludeCount >= caseFile.codes.missionUnlock.requiredSolvedPuzzles
	);
	const evidenceStats = $derived(getEvidenceStats(progress));
	const timelineUnlockedCount = $derived(
		caseFile.timeline.filter((event) => isTimelineEventUnlocked(progress, event)).length
	);

	const progressPercent = $derived(
		Math.round(
			((evidenceStats.analyzed + solvedPreludeCount + (progress.finaleUnlocked ? 1 : 0)) /
				(caseFile.evidence.length + caseFile.prelude.puzzles.length + 1)) *
				100
		)
	);

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

		if (isCorrect) {
			puzzleFeedback[puzzleId] = 'Treffer. Das passt zur Akte.';
		} else {
			puzzleFeedback[puzzleId] = 'Noch nicht. Nutzt den Hinweis und versucht es erneut.';
		}

		if (!progress.missionUnlocked) {
			const solvedCount = Object.values(progress.prelude).filter((item) => item.solved).length;
			if (solvedCount >= caseFile.codes.missionUnlock.requiredSolvedPuzzles) {
				progress = {
					...progress,
					missionUnlocked: true
				};
				statusMessage = 'Vorermittlung erfolgreich: Die operative Akte ist geöffnet.';
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

	function unlockFinale() {
		const valid = checkAnswer(finalCodeInput, caseFile.codes.finaleUnlock.accepted);
		progress = {
			...progress,
			finalCodeAttempts: progress.finalCodeAttempts + 1,
			finaleUnlocked: valid ? true : progress.finaleUnlocked
		};

		if (valid) {
			finalCodeMessage = 'Finale aktiviert. Einsatz draussen freigegeben.';
		} else {
			finalCodeMessage = 'Code nicht korrekt. Prüft eure Timeline und Hinweise.';
		}

		persistProgress();
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
		content="Interaktive Krimi-Einladung für den Kindergeburtstag: Vorermittlung, Beweisakte und Finale draussen beim Schulhaus."
	/>
</svelte:head>

<main>
	<header class="hero panel">
		<div class="hero__top">
			<span class="badge muted">Fallakte #{caseFile.id}</span>
			<span class="badge warn">Fortschritt {progressPercent}%</span>
		</div>
		<h1>{caseFile.title}</h1>
		<p class="subtitle">{caseFile.subtitle}</p>
		<p>
			{caseFile.invitation.message}
		</p>
		<p class="hero__tagline">{caseFile.invitation.tagline}</p>

		<div class="hero__stats">
			<div class="panel stat">
				<p class="label">Rätsel gelöst</p>
				<strong>{solvedPreludeCount} / {caseFile.prelude.puzzles.length}</strong>
			</div>
			<div class="panel stat">
				<p class="label">Beweise analysiert</p>
				<strong>{evidenceStats.analyzed} / {evidenceStats.total}</strong>
			</div>
			<div class="panel stat">
				<p class="label">Timeline</p>
				<strong>{timelineUnlockedCount} / {caseFile.timeline.length} Stationen</strong>
			</div>
		</div>

		<div class="hero__identity panel">
			<div>
				<h2>Teamprofil</h2>
				<p>Gebt eurem Team einen Namen und Codenamen, damit die Akte personalisiert ist.</p>
			</div>
			<div class="hero__identity-fields">
				<label>
					<span>Teamname</span>
					<input bind:value={teamNameInput} maxlength="60" placeholder="z.B. Die Aktenfüchse" />
				</label>
				<label>
					<span>Codename</span>
					<input bind:value={codenameInput} maxlength="40" placeholder="z.B. Nebelstern" />
				</label>
			</div>
			<div class="hero__identity-actions">
				<button onclick={saveTeamIdentity}>Profil speichern</button>
				<button class="secondary" onclick={resetAllProgress}>Fortschritt zurücksetzen</button>
			</div>
			{#if progress.teamName || progress.codename}
				<p class="identity-preview">
					Aktiv: <strong>{progress.teamName || 'Unbenanntes Team'}</strong>
					{#if progress.codename} – Codename <strong>{progress.codename}</strong>{/if}
				</p>
			{/if}
		</div>

		{#if statusMessage}
			<p class="status-message">{statusMessage}</p>
		{/if}
	</header>

	<nav class="nav panel" aria-label="Fallnavigation">
		{#each navItems as item}
			<button
				class={activeView === item.id ? 'nav__btn nav__btn--active' : 'nav__btn'}
				onclick={() => jumpToView(item.id)}
			>
				{item.label}
			</button>
		{/each}
	</nav>

	{#if activeView === 'intro'}
		<section class="grid intro-grid">
			<article class="panel intro-card">
				<h2>{caseFile.invitation.headline}</h2>
				<p>
					Die Vorermittlung ist bereits vor dem Geburtstag offen. Wer schon jetzt Hinweise sammelt,
					hat am Falltag einen echten Vorteil.
				</p>
				<ul>
					<li>Historischer Cold Case mit erfundenen Figuren</li>
					<li>Hauptteil der Ermittlungen bei euch zu Hause</li>
					<li>Finale Einsatzrunde draussen beim Schulhaus</li>
					<li>Mehrere Wendungen, falsche Fährten und echte Teamarbeit</li>
				</ul>
				<div class="callout">
					<strong>Mission:</strong>
					<span>
						Findet heraus, wie die geplante Auflösung der Schule vertuscht wurde – und warum Zimmerwald
						am Ende blieb.
					</span>
				</div>
			</article>

			<article class="paper briefing">
				<h3>Briefing zum Geburtstag</h3>
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
			</article>

			<article class="panel teaser">
				<h3>Mini-Teaser</h3>
				<p>
					"Vor der Sitzung aufgenommen. Nicht für den Aushang übernehmen." – Warum sollte ein harmloses
					Foto so eine Notiz tragen?
				</p>
				<p>
					Im Archiv stimmt etwas nicht. Wenn ihr vor dem Geburtstag schon 2 Rätsel löst, öffnet sich die
					echte Einsatzakte automatisch.
				</p>
				<button onclick={() => jumpToView('prelude')}>Zur Vorermittlung</button>
			</article>
		</section>
	{/if}

	{#if activeView === 'prelude'}
		<section class="panel section">
			<div class="section__head">
				<div>
					<h2>Vorermittlung vor dem Geburtstag</h2>
					<p>{caseFile.prelude.intro}</p>
				</div>
				<span class={missionReady ? 'badge ok' : 'badge warn'}>
					{missionReady ? 'Akte freigeschaltet' : 'Noch gesperrt'}
				</span>
			</div>

			<div class="puzzles">
				{#each caseFile.prelude.puzzles as puzzle}
					<article class="panel puzzle">
						<h3>{puzzle.title}</h3>
						<p class="hint">Hinweis: {puzzle.hint}</p>
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

			{#if missionReady}
				<div class="mission-open paper">
					<h3>Operative Akte freigegeben</h3>
					<p>
						Sehr gut. Ihr könnt jetzt die komplette Beweislage analysieren. Nächster Schritt: "Akte" öffnen
						und Fundstatus pflegen.
					</p>
					<button onclick={() => jumpToView('evidence')}>Zur Akte</button>
				</div>
			{/if}
		</section>
	{/if}

	{#if activeView === 'evidence'}
		<section class="grid evidence-layout">
			<aside class="panel evidence-list">
				<h2>Beweisablage</h2>
				<p>
					{#if missionReady}
						Markiert Funde, ergänzt Notizen und verknüpft die Hinweise.
					{:else}
						Die Akte ist noch gesperrt. Löst zuerst die Vorermittlung.
					{/if}
				</p>
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
					<button disabled={!missionReady} onclick={() => toggleEvidenceFound(selectedEvidence.id)}>
						{progress.evidence[selectedEvidence.id].found ? 'Fund zurücknehmen' : 'Als gefunden markieren'}
					</button>
					<button
						class="secondary"
						disabled={!missionReady || !progress.evidence[selectedEvidence.id].found}
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
						placeholder="Was beweist dieser Hinweis? Welche Frage bleibt offen?"
						value={progress.evidence[selectedEvidence.id].notes}
						oninput={(event) => updateEvidenceNotes(selectedEvidence.id, event.currentTarget.value)}
					></textarea>
				</label>

				<div class="tags">
					{#each selectedEvidence.tags as tag}
						<span class="badge muted">#{tag}</span>
					{/each}
				</div>
			</article>
		</section>
	{/if}

	{#if activeView === 'suspects'}
		<section class="panel section">
			<div class="section__head">
				<div>
					<h2>Verdachtstafel</h2>
					<p>Setzt pro Figur den Verdachtsgrad und notiert Widersprüche oder Entlastungen.</p>
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
								placeholder="Warum hoch / tief eingestuft?"
								value={progress.suspects[suspect.id].notes}
								oninput={(event) => updateSuspectNotes(suspect.id, event.currentTarget.value)}
							></textarea>
						</label>
					</article>
				{/each}
			</div>
		</section>
	{/if}

	{#if activeView === 'timeline'}
		<section class="panel section">
			<div class="section__head">
				<div>
					<h2>Zeitstrahl</h2>
					<p>
						Ordnet die Ereignisse. Gesperrte Einträge werden erst sichtbar, wenn die nötigen Beweise
						analysiert sind.
					</p>
				</div>
				<span class="badge warn">{timelineUnlockedCount}/{caseFile.timeline.length} entsperrt</span>
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

	{#if activeView === 'finale'}
		<section class="panel section finale">
			<div class="section__head">
				<div>
					<h2>Finale-Freischaltung</h2>
					<p>
						Wenn eure Timeline steht, gebt den Finalcode ein. Dann wird der Aussen-Einsatz aktiviert.
					</p>
				</div>
			</div>

			<div class="finale__unlock panel">
				<label>
					<span>Finalcode</span>
					<input
						bind:value={finalCodeInput}
						placeholder="z.B. zimmerwaldbleibt"
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

			{#if progress.finaleUnlocked}
				<article class="paper finale__result">
					<h3>{caseFile.finale.headline}</h3>
					<p>{caseFile.finale.fieldInstruction}</p>
					<p><strong>Spielleitung:</strong> {caseFile.finale.gmInstruction}</p>
					<hr />
					<p><strong>Auflösung:</strong> {caseFile.finale.resolution}</p>
				</article>
			{/if}
		</section>
	{/if}
</main>

<style>
	.hero {
		display: grid;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.hero__top {
		display: flex;
		justify-content: space-between;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.subtitle {
		font-size: 1.06rem;
		color: var(--text-dim);
	}

	.hero__tagline {
		color: #f0d7a4;
		font-weight: 600;
	}

	.hero__stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
		gap: 0.75rem;
	}

	.stat {
		padding: 0.75rem;
	}

	.stat .label {
		color: var(--text-dim);
		font-size: 0.85rem;
	}

	.stat strong {
		font-size: 1.25rem;
	}

	.hero__identity {
		display: grid;
		gap: 0.8rem;
	}

	.hero__identity-fields {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
		gap: 0.75rem;
	}

	label {
		display: grid;
		gap: 0.35rem;
	}

	label span {
		font-size: 0.85rem;
		color: var(--text-dim);
	}

	input,
	textarea {
		border-radius: 10px;
		border: 1px solid var(--border);
		background: rgba(14, 23, 29, 0.75);
		color: var(--text);
		padding: 0.62rem 0.75rem;
	}

	textarea {
		resize: vertical;
	}

	.hero__identity-actions {
		display: flex;
		gap: 0.6rem;
		flex-wrap: wrap;
	}

	.identity-preview {
		font-size: 0.9rem;
		color: #f4d99b;
	}

	.status-message {
		padding: 0.65rem 0.8rem;
		border: 1px solid rgba(78, 157, 122, 0.5);
		background: rgba(78, 157, 122, 0.15);
		border-radius: 8px;
		font-size: 0.9rem;
	}

	.nav {
		display: flex;
		gap: 0.6rem;
		flex-wrap: wrap;
		margin-bottom: 1rem;
	}

	.nav__btn {
		background: transparent;
		border: 1px solid var(--border);
		color: var(--text-dim);
		font-weight: 600;
	}

	.nav__btn--active {
		background: rgba(217, 164, 65, 0.2);
		border-color: var(--accent-soft);
		color: #f8dfad;
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
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
	}

	.intro-card {
		display: grid;
		gap: 0.8rem;
	}

	.intro-card ul,
	.briefing ul {
		margin: 0;
		padding-left: 1.2rem;
		display: grid;
		gap: 0.35rem;
	}

	.callout {
		display: grid;
		gap: 0.3rem;
		padding: 0.75rem;
		border-radius: 10px;
		border: 1px solid rgba(217, 164, 65, 0.5);
		background: rgba(217, 164, 65, 0.13);
	}

	.briefing h3 {
		margin-bottom: 0.75rem;
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

	.teaser {
		display: grid;
		gap: 0.8rem;
	}

	.puzzles {
		display: grid;
		gap: 0.8rem;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
	}

	.puzzle {
		display: grid;
		gap: 0.65rem;
	}

	.puzzle .hint {
		color: var(--text-dim);
		font-size: 0.92rem;
	}

	.puzzle .question {
		font-weight: 600;
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

	.mission-open {
		display: grid;
		gap: 0.7rem;
	}

	.evidence-layout {
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
		align-content: start;
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
		gap: 0.5rem;
		background: rgba(16, 24, 30, 0.55);
		border: 1px solid var(--border);
		color: var(--text);
	}

	.evidence-btn small {
		display: block;
		color: var(--text-dim);
	}

	.evidence-btn--active {
		border-color: var(--accent-soft);
		background: rgba(217, 164, 65, 0.18);
	}

	.evidence-badges {
		display: flex;
		gap: 0.35rem;
		flex-wrap: wrap;
	}

	.evidence-detail {
		display: grid;
		gap: 0.8rem;
	}

	.evidence-meta {
		display: flex;
		gap: 0.45rem;
		flex-wrap: wrap;
	}

	.archive-snippet {
		display: grid;
		gap: 0.5rem;
	}

	.detail-actions {
		display: flex;
		gap: 0.55rem;
		flex-wrap: wrap;
	}

	.notes {
		display: grid;
		gap: 0.35rem;
	}

	.tags {
		display: flex;
		gap: 0.4rem;
		flex-wrap: wrap;
	}

	.suspect-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 0.8rem;
	}

	.suspect-card {
		display: grid;
		gap: 0.55rem;
	}

	.suspect-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.5rem;
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
		border: 1px solid var(--border);
		border-radius: 10px;
		background: rgba(10, 18, 23, 0.45);
	}

	.timeline-item--open {
		border-color: rgba(78, 157, 122, 0.5);
		background: rgba(78, 157, 122, 0.13);
	}

	.timeline-item__year {
		font-weight: 700;
		color: #f1d8a7;
	}

	.locked-text {
		color: var(--muted);
		font-style: italic;
	}

	.finale {
		display: grid;
		gap: 1rem;
	}

	.finale__unlock {
		display: grid;
		gap: 0.6rem;
		max-width: 420px;
	}

	.finale__result {
		display: grid;
		gap: 0.7rem;
	}

	hr {
		border: 0;
		border-top: 1px solid rgba(29, 26, 20, 0.2);
		margin: 0;
	}
</style>
