<script>
	import { caseFile } from '$lib/data/casefile';
	import { progress } from '$lib/state/progressStore';

	/** Das Board hat 8 Felder (wie A2 physisch) */
	const boardFields = [
		{ id: 'foto', label: 'FOTO' },
		{ id: 'post', label: 'POST' },
		{ id: 'protokoll', label: 'PROTOKOLL' },
		{ id: 'route', label: 'ROUTE' },
		{ id: 'garten', label: 'GARTEN' },
		{ id: 'abzug', label: 'ABZUG' },
		{ id: 'glocke', label: 'GLOCKE' },
		{ id: 'kasse', label: 'KASSE' }
	];

	/** Die 4 Beobachtungs-Felder unten auf dem Board (wie A2 physisch) */
	const observationFields = [
		{ id: 'taeter', label: 'Wer ist der Täter?' },
		{ id: 'motiv', label: 'Was war das Motiv?' },
		{ id: 'schuldig', label: 'Wer verdächtig erscheint' },
		{ id: 'verhindert', label: 'Wer hat die Schulauflösung verhindert?' }
	];

	/** Lösungswort aus sortierten Buchstaben */
	const solutionWord = 'TEICH';

	/** Initialen aus Beweis-Buchstaben */
	const evidenceLetters = {
		foto: 'I',
		post: 'T',
		protokoll: 'E',
		route: 'C',
		garten: 'H'
	};

	/** Solved-Briefbuchstaben */
	const sortedFields = ['post', 'protokoll', 'foto', 'route', 'garten'];

	/** Local state for field letters */
	let fieldLetters = $state({
		foto: '',
		post: '',
		protokoll: '',
		route: '',
		garten: '',
		abzug: '',
		glocke: '',
		kasse: ''
	});

	/** Local state for observation fields */
	let observations = $state({
		taeter: '',
		motiv: '',
		schuldig: '',
		verhindert: ''
	});

	/** Message after checking solution */
	let solutionMessage = $state('');
	let solutionClass = $state('');

	/** Check if sorted letters form TEICH */
	function checkSolution() {
		const letters = sortedFields.map(f => fieldLetters[f].toUpperCase()).join('');
		if (letters === solutionWord) {
			solutionMessage = '✅ Richtig! Das Lösungswort ist TEICH. Gebt es im Finale-Tab ein!';
			solutionClass = 'ok';
		} else if (letters.replace(/ /g, '').length < 5) {
			solutionMessage = 'Tragt alle 5 Buchstaben in die Felder FOTO, POST, PROTOKOLL, ROUTE und GARTEN ein.';
			solutionClass = '';
		} else {
			solutionMessage = `Noch nicht ganz: ${letters}. Überprüft die Buchstaben auf den Beweisen!`;
			solutionClass = '';
		}
	}

	/** Reset the board */
	function resetBoard() {
		fieldLetters = { foto: '', post: '', protokoll: '', route: '', garten: '', abzug: '', glocke: '', kasse: '' };
		observations = { taeter: '', motiv: '', schuldig: '', verhindert: '' };
		solutionMessage = '';
		solutionClass = '';
	}

	/** Get the field letter hint */
	function getHint(fieldId) {
		if (evidenceLetters[fieldId]) {
			const ev = caseFile.evidence.find(e => e.tags.includes(evidenceLetters[fieldId].toLowerCase()) || e.tags.includes(evidenceLetters[fieldId].toUpperCase()));
			if (ev) return `Tipp: Der Buchstabe steht auf Beweis ${ev.name}.`;
		}
		return '';
	}

	/** Get field style class based on whether correct letter is entered */
	function getFieldClass(fieldId) {
		const entered = fieldLetters[fieldId].toUpperCase();
		const correct = evidenceLetters[fieldId];
		if (!entered) return '';
		if (correct && entered === correct) return 'correct';
		if (!['abzug', 'glocke', 'kasse'].includes(fieldId)) return 'incorrect';
		return '';
	}
</script>

<section class="board-root">
	<div class="board-header">
		<h2 class="h2-sm">Ermittlungsboard</h2>
		<p class="muted small">Tragt die Buchstaben aus den Beweisen ein. Achtet: Die Reihenfolge ist nicht klar — sortiert selbst!</p>
		<button type="button" class="btn secondary btn-reset" onclick={resetBoard}>Board zurücksetzen</button>
	</div>

	<!-- 8 Felder (2×4 Grid) -->
	<div class="board-grid">
		{#each boardFields as field}
			{@const letterClass = getFieldClass(field.id)}
			<div class="board-card">
				<h3 class="field-label">{field.label}</h3>
				<div class="letter-box {letterClass}">
					<input
						type="text"
						class="letter-input"
						maxlength="1"
						placeholder="?"
						bind:value={fieldLetters[field.id]}
						aria-label="Buchstabe für {field.label}"
					/>
				</div>
				{#if letterClass === 'correct'}
					<p class="letter-feedback ok">✓</p>
				{:else if letterClass === 'incorrect'}
					<p class="letter-feedback err">✗</p>
				{/if}
				<p class="field-hint muted small">{getHint(field.id)}</p>
			</div>
		{/each}
	</div>

	<!-- Lösungswort-Prüfung -->
	<div class="solution-checker">
		<h3 class="h3-sm">Eure sortierte Lösung</h3>
		<p class="muted small">Die 5 Buchstaben von FOTO, POST, PROTOKOLL, ROUTE und GARTEN ergeben ein Wort. Sortiert und prüft!</p>
		
		<div class="solution-display">
			{#each sortedFields as fid}
				<span class="solution-letter">{fieldLetters[fid].toUpperCase() || '_'}</span>
			{/each}
			<span class="solution-arrow">→</span>
			<span class="solution-result">{fieldLetters.post.toUpperCase()}{fieldLetters.protokoll.toUpperCase()}{fieldLetters.foto.toUpperCase()}{fieldLetters.route.toUpperCase()}{fieldLetters.garten.toUpperCase() || '.....'}</span>
		</div>

		<button type="button" class="btn" onclick={checkSolution}>Prüfen</button>
		<p class={solutionClass === 'ok' ? 'solution-msg ok' : 'solution-msg'}>{solutionMessage}</p>
	</div>

	<!-- 4 Beobachtungs-Felder (unten auf dem Board) -->
	<div class="observations">
		<h3 class="h3-sm">Eure Ermittlungs-Notizen</h3>
		<div class="obs-grid">
			{#each observationFields as obs}
				<div class="obs-card">
					<label for={obs.id} class="obs-label">{obs.label}</label>
					<textarea
						id={obs.id}
						class="obs-input"
						rows="3"
						placeholder="Eure Antwort..."
						bind:value={observations[obs.id]}
					></textarea>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.board-root {
		display: grid;
		gap: 1.5rem;
	}

	.h2-sm {
		font-size: 1.25rem;
		margin: 0;
	}

	.h3-sm {
		font-size: 1rem;
		margin: 0 0 0.5rem;
	}

	.small {
		font-size: 0.88rem;
	}

	.board-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.btn-reset {
		font-size: 0.85rem;
	}

	/* 8 Felder: 2×4 Grid */
	.board-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.75rem;
	}

	@media (min-width: 560px) {
		.board-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.board-card {
		padding: 0.75rem;
		border-radius: 10px;
		background: rgba(0, 0, 0, 0.22);
		border: 1px solid var(--border);
		text-align: center;
		display: grid;
		place-items: center;
		gap: 0.35rem;
		min-height: 110px;
	}

	.field-label {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--text-dim);
		margin: 0;
	}

	.letter-box {
		width: 44px;
		height: 44px;
		display: grid;
		place-items: center;
		border: 2px dashed var(--border);
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.05);
		transition: border-color 0.2s;
	}

	.letter-box.correct {
		border-color: #6ecf9c;
		border-style: solid;
		background: rgba(110, 207, 156, 0.1);
	}

	.letter-box.incorrect {
		border-color: #ff9999;
		border-style: solid;
	}

	.letter-input {
		width: 100%;
		height: 100%;
		text-align: center;
		font-size: 1.3rem;
		font-weight: 800;
		font-family: var(--font-display);
		background: transparent;
		border: none;
		outline: none;
		color: var(--text);
	}

	.letter-input::placeholder {
		color: var(--text-dim);
	}

	.letter-feedback {
		font-size: 1.1rem;
		margin: 0;
	}

	.letter-feedback.ok {
		color: #6ecf9c;
	}

	.letter-feedback.err {
		color: #ff9999;
	}

	.field-hint {
		font-size: 0.72rem;
		font-style: italic;
		margin: 0;
	}

	/* Lösungswort-Prüfung */
	.solution-checker {
		padding: 1rem;
		border-radius: 12px;
		background: rgba(212, 164, 59, 0.06);
		border: 1px solid rgba(212, 164, 59, 0.25);
		display: grid;
		gap: 0.65rem;
		place-items: center;
		text-align: center;
	}

	.solution-display {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.solution-letter {
		width: 36px;
		height: 36px;
		display: grid;
		place-items: center;
	background: rgba(255, 255, 255, 0.08);
		border: 1px solid var(--border);
		border-radius: 6px;
		font-family: var(--font-display);
		font-size: 1.1rem;
		font-weight: 800;
		color: #ffd98a;
	}

	.solution-arrow {
		margin: 0 0.5rem;
		font-size: 1.3rem;
		color: var(--text-dim);
	}

	.solution-result {
		font-family: var(--font-display);
		font-size: 1.4rem;
		font-weight: 800;
		color: #ffd98a;
		letter-spacing: 0.15em;
	}

	.solution-msg {
		font-size: 0.95rem;
		margin: 0;
	}

	.solution-msg.ok {
		color: #6ecf9c;
		font-weight: 700;
	}

	/* Beobachtungs-Felder */
	.observations {
		display: grid;
		gap: 0.75rem;
	}

	.obs-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.75rem;
	}

	@media (min-width: 700px) {
		.obs-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.obs-card {
		display: grid;
		gap: 0.35rem;
	}

	.obs-label {
		font-size: 0.82rem;
		font-weight: 700;
		color: var(--text-dim);
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.obs-input {
		width: 100%;
		padding: 0.55rem;
		border-radius: 8px;
		border: 1px solid var(--border);
		background: rgba(0, 0, 0, 0.22);
		color: var(--text);
		font-family: var(--font-body);
		font-size: 0.9rem;
		resize: vertical;
	}

	.obs-input:focus {
		outline: none;
		border-color: #d4a43b;
	}
</style>
