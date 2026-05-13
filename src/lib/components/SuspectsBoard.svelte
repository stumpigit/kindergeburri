<script>
	import { caseFile } from '$lib/data/casefile';
	import { progress, updateSuspectField, setSuspicion } from '$lib/state/progressStore';

	/** Track whether solutions are revealed per suspect */
	let solutionsRevealed = $state({});

	/** Toggle solution visibility for a suspect */
	function toggleSolution(id) {
		solutionsRevealed[id] = !solutionsRevealed[id];
	}

	/** Reveal all solutions */
	function revealAll() {
		caseFile.suspects.forEach(s => { solutionsRevealed[s.id] = true; });
	}

	/** Hide all solutions */
	function hideAll() {
		caseFile.suspects.forEach(s => { solutionsRevealed[s.id] = false; });
	}
</script>

<section class="suspects-root">
	<div class="section-head">
		<div>
			<h2 class="h2-sm">Verdächtige — Ermittlungsnotizen</h2>
			<p class="muted small">Tragt bei jedem Verdächtigen ein, was ihr herausgefunden habt. Am Schluss könnt ihr die Lösung vergleichen!</p>
		</div>
		<div class="reveal-controls">
			<button type="button" class="btn secondary btn-sm" onclick={revealAll}>🔓 Lösung anzeigen</button>
			<button type="button" class="btn secondary btn-sm" onclick={hideAll}>🔒 Lösung ausblenden</button>
		</div>
	</div>

	<div class="suspect-grid">
		{#each caseFile.suspects as suspect}
			{@const sol = suspect.solution}
			{@const user = $progress.suspects[suspect.id]}
			<article class="panel suspect-card grain-overlay">
				<div class="suspect-image-section">
					<img src={suspect.imageUrl} alt="{suspect.name}" class="suspect-img" />
					<h3 class="suspect-name">{suspect.name}</h3>
				</div>

				<!-- User inputs -->
				<div class="investigation-fields">
					<div class="field-group">
						<label class="field-label">Beruf / Rolle</label>
						<input type="text" class="field-input" placeholder="z.B. Lehrer" bind:value={user.role} onblur={() => updateSuspectField(suspect.id, 'role', user.role || '')} />
					</div>
					<div class="field-group">
						<label class="field-label">Wahrscheinliches Motiv</label>
						<textarea class="field-input" rows="2" placeholder="Warum würde er/sie das tun?" bind:value={user.motive} onblur={() => updateSuspectField(suspect.id, 'motive', user.motive || '')}></textarea>
					</div>
					<div class="field-group">
						<label class="field-label">Verdächtiger Punkt</label>
						<textarea class="field-input" rows="2" placeholder="Was macht ihn/sie verdächtig?" bind:value={user.redFlag} onblur={() => updateSuspectField(suspect.id, 'redFlag', user.redFlag || '')}></textarea>
					</div>
					<div class="field-group">
						<label class="field-label">Entlastender Punkt</label>
						<textarea class="field-input" rows="2" placeholder="Was spricht dagegen?" bind:value={user.relief} onblur={() => updateSuspectField(suspect.id, 'relief', user.relief || '')}></textarea>
					</div>
				</div>

				<!-- Suspicion slider -->
				<div class="suspicion-row">
					<span>Verdacht: {user.suspicion ?? 3}</span>
					<input type="range" min="1" max="5" value={user.suspicion ?? 3}
						oninput={(e) => setSuspicion(suspect.id, Number(e.currentTarget.value))} />
				</div>

				<!-- Lösung anzeigen wenn toggled -->
				{#if solutionsRevealed[suspect.id]}
					<div class="solution-section">
						<h4 class="solution-header">Lösung</h4>
						<div class="solution-row">
							<span class="sol-label">Beruf:</span>
							<span class="sol-value">{sol.role || '—'}</span>
						</div>
						<div class="solution-row">
							<span class="sol-label">Motiv:</span>
							<span class="sol-value">{sol.motive || 'Kein Motiv'}</span>
						</div>
						<div class="solution-row">
							<span class="sol-label">Verdächtig:</span>
							<span class="sol-value">{sol.redFlag || '—'}</span>
						</div>
						<div class="solution-row">
							<span class="sol-label">Entlastet:</span>
							<span class="sol-value">{sol.relief || 'Keine Entlastung'}</span>
						</div>
						{#if sol.extraInfo && sol.extraInfo.length > 0}
							<div class="solution-extra">
								<p class="sol-label">Zusätzliche Dokumente:</p>
								{#each sol.extraInfo as doc}
									<div class="extra-doc">
										<img src={doc.imageUrl} alt="{doc.label}" class="extra-doc-img" />
										<span class="extra-doc-label">{doc.label}</span>
									</div>
								{/each}
							</div>
						{/if}
					</div>
				{/if}
			</article>
		{/each}
	</div>
</section>

<style>
	.h2-sm { font-size: 1.25rem; }
	.small { font-size: 0.92rem; margin: 0.25rem 0 0; }

	.section-head {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 0.75rem;
		flex-wrap: wrap;
		margin-bottom: 1rem;
	}

	.reveal-controls {
		display: flex;
		gap: 0.5rem;
	}

	.btn-sm {
		font-size: 0.85rem;
		padding: 0.4rem 0.7rem;
	}

	.suspect-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 1rem;
	}

	.suspect-card {
		display: grid;
		gap: 0.55rem;
		font-size: 0.95rem;
	}

	.suspect-image-section {
		display: grid;
		place-items: center;
		gap: 0.4rem;
	}

	.suspect-img {
		width: 100%;
		max-width: 180px;
		border-radius: 4px;
		border: 1px solid var(--border-dim);
	}

	.suspect-name {
		font-size: 1.05rem;
		margin: 0;
		text-align: center;
	}

	.investigation-fields {
		display: grid;
		gap: 0.5rem;
	}

	.field-group {
		display: grid;
		gap: 0.2rem;
	}

	.field-label {
		font-size: 0.78rem;
		font-weight: 700;
		color: var(--text-dim);
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.field-input {
		width: 100%;
		padding: 0.4rem 0.5rem;
		border-radius: 6px;
		border: 1px solid var(--border);
		background: rgba(0, 0, 0, 0.22);
		color: var(--text);
		font-family: var(--font-body);
		font-size: 0.88rem;
		resize: vertical;
	}

	.field-input::placeholder {
		color: rgba(255,255,255,0.25);
		font-style: italic;
	}

	.field-input:focus {
		outline: none;
		border-color: #d4a43b;
	}

	.suspicion-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.85rem;
		color: var(--text-dim);
	}

	.suspicion-row input[type='range'] {
		flex: 1;
		accent-color: #d4a43b;
	}

	/* Solution section */
	.solution-section {
		margin-top: 0.35rem;
		padding: 0.65rem;
		border-radius: 8px;
		background: rgba(110, 207, 156, 0.08);
		border: 1px solid rgba(110, 207, 156, 0.3);
		display: grid;
		gap: 0.35rem;
	}

	.solution-header {
		font-size: 0.85rem;
		font-weight: 800;
		color: #6ecf9c;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		margin: 0;
	}

	.solution-row {
		display: grid;
		gap: 0.15rem;
		font-size: 0.88rem;
	}

	.sol-label {
		font-size: 0.75rem;
		font-weight: 700;
		color: var(--text-dim);
		text-transform: uppercase;
	}

	.sol-value {
		font-size: 0.88rem;
	}

	.solution-extra {
		display: grid;
		gap: 0.35rem;
		margin-top: 0.35rem;
		padding-top: 0.35rem;
		border-top: 1px solid rgba(110, 207, 156, 0.2);
	}

	.extra-doc {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.extra-doc-img {
		width: 48px;
		height: 48px;
		object-fit: cover;
		border-radius: 4px;
		border: 1px solid var(--border);
	}

	.extra-doc-label {
		font-size: 0.82rem;
		color: var(--text-dim);
	}
</style>
