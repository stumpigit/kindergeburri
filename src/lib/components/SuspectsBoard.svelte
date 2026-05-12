<script>
	import { caseFile } from '$lib/data/casefile';
	import { progress } from '$lib/state/progressStore';
	import { setSuspicion, updateSuspectNotes } from '$lib/state/progressStore';
	import { suspicionLabel } from '$lib/utils/suspicion';
</script>

<section class="suspects-root">
	<div class="section-head">
		<div>
			<h2 class="h2-sm">Verdachtsprofile</h2>
			<p class="muted small">Bewerte Verdacht und halte kurze Teamnotizen fest.</p>
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
				<p><strong>Zugang:</strong> {suspect.access}</p>
				<p><strong>Mögliches Motiv:</strong> {suspect.motive}</p>
				<p><strong>Belastender Punkt:</strong> {suspect.redFlag}</p>
				<p><strong>Entlastender Punkt:</strong> {suspect.relief}</p>
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
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 0.85rem;
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
		margin-bottom: 0.5rem;
		border: 1px solid var(--border-dim);
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
