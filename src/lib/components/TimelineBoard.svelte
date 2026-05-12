<script>
	import { caseFile } from '$lib/data/casefile';
	import { progress } from '$lib/state/progressStore';
	import { isTimelineEventUnlocked } from '$lib/state/progress';

	// Lokaler State für die Eingaben der Kinder (Svelte 5 Runes)
	let answers = $state({});

	// Funktion zum Aktualisieren der Antworten
	function updateAnswer(eventId, field, value) {
		if (!answers[eventId]) {
			answers[eventId] = {};
		}
		answers[eventId] = {
			...answers[eventId],
			[field]: value
		};
	}
</script>

<section class="timeline-root">
	<div class="section-head">
		<div>
			<h2 class="h2-sm">Ermittlungsboard · Zeitstrahl</h2>
			<p class="muted small">Einträge öffnen sich, sobald die passenden Beweise analysiert sind. Finde die Buchstaben und ordne sie richtig!</p>
		</div>
		<span class="badge warn">
			{caseFile.timeline.filter((e) => isTimelineEventUnlocked($progress, e)).length}/{caseFile.timeline.length}
		</span>
	</div>

	<ol class="timeline">
		{#each caseFile.timeline as event}
			{@const unlocked = isTimelineEventUnlocked($progress, event)}
			<li class="timeline-item" class:timeline-item--open={unlocked}>
				<div class="timeline-year">{event.year}</div>
				<div>
					<h3>{event.label}</h3>
					{#if unlocked}
						<p>{event.description}</p>
						
						<!-- Eingabefelder für Buchstaben -->
						{#if event.word}
							<div class="word-input-section">
								<h4>Buchstaben für das Wort:</h4>
								<p class="word-display">{event.word}</p>
								
								<!-- Eingabefelder für Buchstaben -->
								<div class="letter-inputs">
									{#each Array.from({ length: event.word.length }, (_, i) => i) as index}
										<input 
											type="text" 
											class="letter-input"
											maxlength="1"
											placeholder="?"
											value={answers[event.id]?.letters?.[index] || ''}
											oninput={(e) => updateAnswer(event.id, 'letters', { ...(answers[event.id]?.letters || {}), [index]: e.target.value })}
										/>
									{/each}
								</div>
								
								<!-- Hinweis für die Reihenfolge -->
								<div class="order-hint">
									<p><strong>Hinweis:</strong> Trage die Buchstaben ein und finde die richtige Reihenfolge!</p>
								</div>
								
								<!-- Statusanzeige -->
								<div class="word-status">
									{#if answers[event.id]?.letters && Object.values(answers[event.id].letters).every(letter => letter !== '')}
										<p class="status-success">✅ Alle Buchstaben eingetragen!</p>
									{:else}
										<p class="status-pending">⚠️ Bitte alle Buchstaben eingeben</p>
									{/if}
								</div>
							</div>
						{/if}
						
						<!-- Eingabefeld für zusätzliche Fragen -->
						{#if event.additionalQuestion}
							<div class="question-input-section">
								<h4>Zusätzliche Frage:</h4>
								<p>{event.additionalQuestion}</p>
								<textarea 
									class="question-input"
									placeholder="Deine Antwort..."
									value={answers[event.id]?.answer || ''}
									oninput={(e) => updateAnswer(event.id, 'answer', e.target.value)}
								></textarea>
							</div>
						{/if}
					{:else}
						<p class="locked-text">
							Gesperrt – benötigt:
							{event.requiredEvidence
								.map((id) => caseFile.evidence.find((x) => x.id === id)?.name ?? id)
								.join(', ')}
						</p>
					{/if}
				</div>
			</li>
		{/each}
	</ol>
</section>

<style>
	.h2-sm {
		font-size: 1.25rem;
	}

	.small {
		font-size: 0.92rem;
		margin: 0.25rem 0 0;
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
		grid-template-columns: 84px 1fr;
		gap: 0.85rem;
		padding: 0.85rem;
		border-radius: 14px;
		border: 1px solid var(--border);
		background: rgba(0, 0, 0, 0.18);
	}

	.timeline-item--open {
		border-color: rgba(110, 207, 156, 0.35);
		background: rgba(110, 207, 156, 0.07);
	}

	.timeline-year {
		font-weight: 800;
		color: #cfe0ff;
		font-family: var(--font-display);
		font-size: 1.05rem;
	}

	.timeline-item h3 {
		font-size: 1rem;
		margin: 0 0 0.35rem;
	}

	.timeline-item p {
		margin: 0;
		color: var(--text-dim);
		font-size: 0.95rem;
	}

	/* Eingabebereiche */
	.word-input-section {
		margin-top: 1rem;
	}

	.word-display {
		font-size: 1.2rem;
		font-weight: bold;
		text-align: center;
		margin: 0.5rem 0;
		color: #ffd98a;
	}

	.letter-inputs {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		margin: 1rem 0;
		flex-wrap: wrap;
	}

	.letter-input {
		width: 40px;
		height: 40px;
		text-align: center;
		font-size: 1.2rem;
		font-weight: bold;
		border: 2px solid var(--border);
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.1);
		color: var(--text);
	}

	.letter-input:focus {
		outline: none;
		border-color: var(--accent);
		background: rgba(139, 69, 19, 0.2);
	}

	.order-hint {
		margin: 1rem 0;
		padding: 0.5rem;
		background: rgba(210, 105, 30, 0.1);
		border: 1px solid rgba(210, 105, 30, 0.3);
		border-radius: 8px;
	}

	.question-input-section {
		margin-top: 1rem;
	}

	.question-input {
		width: 100%;
		min-height: 80px;
		padding: 0.75rem;
		border-radius: 8px;
		border: 1px solid var(--border);
		background: rgba(0, 0, 0, 0.28);
		color: var(--text);
		font-family: var(--font-body);
		font-size: 0.95rem;
		resize: vertical;
	}

	.question-input:focus {
		outline: none;
		border-color: var(--accent);
	}

	.word-status {
		margin-top: 1rem;
	}

	.status-success {
		color: #b8f5d4;
		font-weight: bold;
	}

	.status-pending {
		color: #ffe6b0;
		font-style: italic;
	}

	.locked-text {
		color: #ff9999;
		font-style: italic;
	}
</style>
