<script>
	import { caseFile } from '$lib/data/casefile';
	import { progress } from '$lib/state/progressStore';
	import { setSuspicion, updateSuspectNotes } from '$lib/state/progressStore';
	import { suspicionLabel } from '$lib/utils/suspicion';

	/** @type {Record<string, boolean>} */
	let expandedDetails = $state({});

	/** @param {string} id */
	function toggleDetails(id) {
		expandedDetails[id] = !expandedDetails[id];
	}
</script>

<section class="suspects-root">
	<div class="section-head">
		<div>
			<h2 class="h2-sm">Verdachtsprofile</h2>
			<p class="muted small">Jeder Verdächtige hat Name und Beruf. Klickt auf «Details» für vertiefte Infos.</p>
		</div>
	</div>

	<div class="suspect-grid">
		{#each caseFile.suspects as suspect}
			<article class="panel suspect-card grain-overlay">
				<div class="suspect-head">
					<h3>{suspect.name}</h3>
					<span class="badge muted">{suspect.role}</span>
				</div>
				<img src={suspect.imageUrl} alt="{suspect.name}" class="suspect-img" />

				<div class="quick-info">
					<p><strong>Zugang:</strong> {suspect.access}</p>
				</div>

				<!-- Details erst nach Klick sichtbar -->
				{#if expandedDetails[suspect.id]}
					<div class="suspect-details">
						<p><strong>Mögliches Motiv:</strong> {suspect.motive}</p>
						<p><strong>Belastender Punkt:</strong> {suspect.redFlag}</p>
						<p><strong>Entlastender Punkt:</strong> {suspect.relief}</p>

						<!-- Extra-Dokumente z.B. Kündigungen, Gratulationen -->
						{#if suspect.extraInfo && suspect.extraInfo.length > 0}
							<div class="extra-docs">
								<h4>Zusätzliche Dokumente:</h4>
								{#each suspect.extraInfo as doc}
									<div class="extra-doc-item">
										<img src={doc.imageUrl} alt="{doc.label}" class="extra-doc-img" />
										<p class="extra-doc-label">{doc.label}</p>
									</div>
								{/each}
							</div>
						{/if}
					</div>
				{:else}
					<button type="button" class="btn secondary btn-expand" onclick={() => toggleDetails(suspect.id)}>
						🔍 Details anzeigen
					</button>
				{/if}

				<div class="suspicion">
					<span>Verdacht: {suspicionLabel($progress.suspects[suspect.id].suspicion)}</span>
					<input
						type="range"
						min="1"
						max="5"
						value={$progress.suspects[suspect.id].suspicion}
						oninput={(e) => setSuspicion(suspect.id, Number(e.currentTarget.value))}
					/>
				</div>
				<label class="notes">
					<span class="label">Teamnotiz</span>
					<textarea
						class="textarea"
						rows="3"
						placeholder="Warum so bewertet?"
						value={$progress.suspects[suspect.id].notes}
						oninput={(e) => updateSuspectNotes(suspect.id, e.currentTarget.value)}
					></textarea>
				</label>
			</article>
		{/each}
	</div>
</section>

<style>
	.h2-sm {
		font-size: 1.25rem;
	}

	.small {
		font-size: 0.92rem;
		margin: 0.25rem 0 0;
	}

	.suspect-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1rem;
	}

	.suspect-card {
		display: grid;
		gap: 0.55rem;
		font-size: 0.95rem;
	}

	.suspect-head {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 0.6rem;
	}

	.suspect-head h3 {
		font-size: 1.05rem;
		margin: 0;
	}

	.suspect-img {
		width: 100%;
		border-radius: 4px;
		margin-bottom: 0.3rem;
		border: 1px solid var(--border-dim);
	}

	.quick-info p {
		margin: 0;
		font-size: 0.9rem;
	}

	.suspect-details {
		display: grid;
		gap: 0.4rem;
		padding: 0.5rem 0;
		border-top: 1px dashed var(--border);
		margin-top: 0.25rem;
	}

	.extra-docs {
		margin-top: 0.35rem;
	}

	.extra-docs h4 {
		font-size: 0.82rem;
		color: var(--text-dim);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		margin: 0 0 0.5rem;
	}

	.extra-doc-item {
		display: grid;
		place-items: center;
		gap: 0.35rem;
		margin-bottom: 0.5rem;
	}

	.extra-doc-img {
		max-width: 100%;
		border-radius: 4px;
		border: 1px solid var(--border);
	}

	.extra-doc-label {
		font-size: 0.8rem;
		color: var(--text-dim);
		font-style: italic;
	}

	.btn-expand {
		width: 100%;
		font-size: 0.88rem;
	}

	.suspicion {
		display: grid;
		gap: 0.35rem;
	}

	.suspicion input[type='range'] {
		width: 100%;
		accent-color: #d4a43b;
	}

	.notes {
		display: grid;
		gap: 0.35rem;
	}

	.label {
		font-size: 0.82rem;
		font-weight: 800;
		color: var(--text-dim);
	}
</style>
