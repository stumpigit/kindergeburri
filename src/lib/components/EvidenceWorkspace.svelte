<script>
	import { caseFile } from '$lib/data/casefile';
	import {
		progress,
		toggleEvidenceAnalyzed,
		toggleEvidenceFound,
		updateEvidenceNotes
	} from '$lib/state/progressStore';

	let selectedEvidenceId = $state(caseFile.evidence[0]?.id ?? '');
	let hintStates = $state({}); // Lokaler State für Hinweise

	function toggleHint(id) {
		hintStates[id] = !hintStates[id];
	}

	const selected = $derived(
		caseFile.evidence.find((item) => item.id === selectedEvidenceId) ?? caseFile.evidence[0]
	);
</script>

<section class="evidence-root">
	<div class="evidence-layout">
		<aside class="panel evidence-list grain-overlay">
			<h2 class="h2-sm">Beweisablage</h2>
			<p class="muted small">Fund markieren, dann analysieren und festhalten.</p>
			<ul>
				{#each caseFile.evidence as item}
					<li>
						<button
							type="button"
							class="evidence-btn"
							class:evidence-btn--active={selectedEvidenceId === item.id}
							onclick={() => (selectedEvidenceId = item.id)}
						>
							<div>
								<strong>{item.name}</strong>
								<small>{item.type}</small>
							</div>
							<div class="evidence-btn__badges">
								<span class={$progress.evidence[item.id].found ? 'badge ok' : 'badge muted'}>
									{$progress.evidence[item.id].found ? 'gefunden' : 'offen'}
								</span>
								<span class={$progress.evidence[item.id].analyzed ? 'badge ok' : 'badge muted'}>
									{$progress.evidence[item.id].analyzed ? 'analysiert' : 'roh'}
								</span>
							</div>
						</button>
					</li>
				{/each}
			</ul>
		</aside>

		{#if selected}
			<article class="panel evidence-detail grain-overlay">
				<h2 class="h2-sm">{selected.name}</h2>
				<p class="meta">
					<span class="badge muted">{selected.type}</span>
					<span class="badge warn">Fundort: {selected.locationHint}</span>
				</p>
				<p class="summary">{selected.summary}</p>
				<div class="paper archive-snippet">
					<h3 class="h3-sm">Archivauszug</h3>
					{#if hintStates[selected.id]}
						<p>{selected.archiveText || selected.insight}</p>
					{:else}
						<button type="button" class="btn secondary" onclick={() => toggleHint(selected.id)}>
							Hinweis aktivieren
						</button>
					{/if}
				</div>
				<div class="detail-actions">
					<button type="button" class="btn secondary" onclick={() => toggleEvidenceFound(selected.id)}>
						{$progress.evidence[selected.id].found ? 'Fund zurücknehmen' : 'Als gefunden markieren'}
					</button>
					<button
						type="button"
						class="btn"
						disabled={!$progress.evidence[selected.id].found}
						onclick={() => toggleEvidenceAnalyzed(selected.id)}
					>
						{$progress.evidence[selected.id].analyzed ? 'Analyse zurücksetzen' : 'Als analysiert markieren'}
					</button>
				</div>
				<label class="notes">
					<span class="label">Notizen zum Beweis</span>
					<textarea
						class="textarea"
						rows="5"
						placeholder="Beobachtung, Frage, nächste Aktion"
						value={$progress.evidence[selected.id].notes}
						oninput={(e) => updateEvidenceNotes(selected.id, e.currentTarget.value)}
					></textarea>
				</label>
			</article>
		{/if}
	</div>
</section>

<style>
	.evidence-root {
		display: grid;
		gap: 1rem;
	}

	.h2-sm {
		font-size: 1.15rem;
	}

	.h3-sm {
		font-size: 0.95rem;
		margin: 0 0 0.35rem;
	}

	.small {
		font-size: 0.88rem;
		margin: 0 0 0.75rem;
	}

	.evidence-layout {
		display: grid;
		gap: 1rem;
		grid-template-columns: 1fr;
	}

	@media (min-width: 960px) {
		.evidence-layout {
			grid-template-columns: minmax(260px, 340px) 1fr;
			align-items: start;
		}
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
		padding: 0.65rem 0.7rem;
		border-radius: 12px;
		background: rgba(0, 0, 0, 0.22);
		border: 1px solid var(--border);
		color: var(--text);
	}

	.evidence-btn small {
		display: block;
		color: var(--text-dim);
		font-weight: 500;
	}

	.evidence-btn--active {
		border-color: rgba(212, 164, 59, 0.45);
		background: rgba(212, 164, 59, 0.1);
	}

	.evidence-btn__badges {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
	}

	.evidence-detail {
		display: grid;
		gap: 0.75rem;
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
	}

	.summary {
		color: var(--text-dim);
	}

	.archive-snippet h3 {
		font-family: var(--font-body);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		font-size: 0.72rem;
		color: var(--paper-ink);
		opacity: 0.65;
	}

	.detail-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.notes {
		display: grid;
		gap: 0.35rem;
	}

	.label {
		font-size: 0.85rem;
		color: var(--text-dim);
		font-weight: 700;
	}
</style>
