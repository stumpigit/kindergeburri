<script>
	import { caseFile } from '$lib/data/casefile';
	import { progress, tryFinaleCode } from '$lib/state/progressStore';
	import { normalizeAnswer } from '$lib/state/progress';

	let code = $state('');
	let message = $state('');
	let messageClass = $state('');
	let showAllEvidence = $state(false);

	function submit() {
		const result = tryFinaleCode(code);
		if (result === 'e5') {
			message = '✅ E5 freigeschaltet! Sucht im Garten beim Kirschbaum.';
			messageClass = 'ok';
		} else if (result === 'e6') {
			message = '✅ Finale freigeschaltet! Geht zum Teich bei der Schule.';
			messageClass = 'ok';
		} else {
			message = 'Code nicht korrekt. Prüft eure Notizen und das Ermittlungsboard.';
			messageClass = '';
		}
		code = '';
	}

	function toggleAllEvidence() {
		showAllEvidence = !showAllEvidence;
	}
</script>

<section class="finale-root">
	<div class="section-head">
		<div>
			<h2 class="h2-sm">Geheimcodes eingeben</h2>
			<p class="muted small">Hier gebt ihr die Lösungswörter ein, um die letzten Beweise freizuschalten.</p>
		</div>
		<span class={$progress.finaleUnlocked ? 'badge ok' : 'badge warn'}>
			{$progress.finaleUnlocked ? 'Fall gelöst' : 'Ermittlung läuft'}
		</span>
	</div>

	<div class="panel finale-unlock grain-overlay">
		<label class="stack">
			<span class="label">Code eingeben</span>
			<input
				class="input"
				type="text"
				autocomplete="off"
				bind:value={code}
				placeholder="z.B. Kirschbaum Garten oder TEICH"
				onkeydown={(e) => e.key === 'Enter' && submit()}
			/>
		</label>
		<button type="button" class="btn" onclick={submit}>Prüfen</button>
		<p class={messageClass === 'ok' ? 'feedback feedback--ok' : 'feedback'}>
			{message || 'Tipp: Die Codes findet ihr auf den physischen Beweisen und im Ermittlungsboard.'}
		</p>
	</div>

	<!-- Status der Codes -->
	<div class="status-grid">
		<div class="status-card">
			<h3>E5 — Gartenfund</h3>
			{#if $progress.evidence['e5'].found}
				<span class="badge ok">Freigeschaltet</span>
			{:else}
				<span class="badge muted">Gesperrt</span>
			{/if}
		</div>
		<div class="status-card">
			<h3>E6 — Finale</h3>
			{#if $progress.evidence['e6'].found}
				<span class="badge ok">Freigeschaltet</span>
			{:else}
				<span class="badge muted">Gesperrt</span>
			{/if}
		</div>
	</div>

	<!-- E5 sichtbar, wenn freigeschaltet -->
	{#if $progress.evidence['e5'].found}
		<article class="paper unlocked-brief grain-overlay">
			<h3>E5 — Gartenfund</h3>
			{#if caseFile.evidence.find(e => e.id === 'e5').imageUrl}
				<img src={caseFile.evidence.find(e => e.id === 'e5').imageUrl} alt="E5" class="evidence-img-inline" />
			{/if}
			<p>{caseFile.evidence.find(e => e.id === 'e5').summary}</p>
			<p class="muted small"><em>{caseFile.evidence.find(e => e.id === 'e5').hintText}</em></p>
		</article>
	{/if}

	<!-- E6 + Finale sichtbar, wenn freigeschaltet -->
	{#if $progress.finaleUnlocked}
		<article class="paper unlocked-brief grain-overlay">
			<h3>E6 — Das Finale</h3>
			{#if caseFile.evidence.find(e => e.id === 'e6')?.imageUrl}
				<img src={caseFile.evidence.find(e => e.id === 'e6').imageUrl} alt="E6" class="evidence-img-inline" />
			{/if}
			<p>{caseFile.evidence.find(e => e.id === 'e6').summary}</p>
			<p class="resolution">{caseFile.finale.resolution}</p>
		</article>

		<div class="final-actions">
			<button type="button" class="btn secondary" onclick={toggleAllEvidence}>
				{showAllEvidence ? 'Alle Beweise ausblenden' : 'Alle Beweise anzeigen (Rückblick)'}
			</button>
		</div>

		{#if showAllEvidence}
			<div class="all-evidence-review">
				<h2 class="h2-sm">Vollständige Fallakte — Übersicht aller Beweise</h2>
				<p class="muted small">Gratulation! Hier sind alle Beweise des Falls zum Nachlesen.</p>
				<div class="review-grid">
					{#each caseFile.evidence as ev}
						<article class="panel review-card grain-overlay">
							<h3>{ev.name}</h3>
							{#if ev.imageUrl}
								<img src={ev.imageUrl} alt="{ev.name}" class="review-img" />
							{/if}
							<p class="summary">{ev.summary}</p>
						</article>
					{/each}
				</div>
				<!-- Auch alle Verdächtigen zeigen -->
				<h2 class="h2-sm">Verdächtige — Auflösung</h2>
				<div class="suspect-summary">
					{#each caseFile.suspects as sus}
						<div class="suspect-summary-card">
							<img src={sus.imageUrl} alt="{sus.name}" class="suspect-thumb" />
							<div>
								<h4>{sus.name} — {sus.role}</h4>
								<p>{sus.motive}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	{/if}
</section>

<style>
	.h2-sm {
		font-size: 1.25rem;
	}

	.small {
		font-size: 0.92rem;
		margin: 0.25rem 0 0;
	}

	.finale-unlock {
		display: grid;
		gap: 0.65rem;
		max-width: 460px;
		margin-bottom: 1rem;
	}

	.stack {
		display: grid;
		gap: 0.35rem;
	}

	.label {
		font-size: 0.82rem;
		font-weight: 800;
		color: var(--text-dim);
	}

	.status-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.85rem;
		margin-bottom: 1.25rem;
	}

	.status-card {
		padding: 0.85rem;
		text-align: center;
		border-radius: 12px;
		background: rgba(0, 0, 0, 0.18);
		border: 1px solid var(--border);
		display: grid;
		gap: 0.4rem;
	}

	.status-card h3 {
		font-size: 0.95rem;
		margin: 0;
	}

	.unlocked-brief {
		padding: 0.85rem;
		margin-bottom: 1rem;
	}

	.unlocked-brief h3 {
		font-size: 1.15rem;
		margin-bottom: 0.45rem;
	}

	.unlocked-brief img.evidence-img-inline {
		max-width: 100%;
		border-radius: 8px;
		margin-bottom: 0.5rem;
	}

	.resolution {
		margin-top: 0.55rem;
		padding-top: 0.65rem;
		border-top: 2px solid rgba(29, 26, 20, 0.35);
		font-weight: 700;
		font-size: 1.05rem;
	}

	.final-actions {
		text-align: center;
		margin: 1rem 0;
	}

	.all-evidence-review {
		margin-top: 1rem;
	}

	.review-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: 0.85rem;
	}

	.review-card {
		display: grid;
		gap: 0.4rem;
	}

	.review-card h3 {
		margin: 0;
		font-size: 0.95rem;
	}

	.review-img {
		width: 100%;
		border-radius: 6px;
	}

	.summary {
		color: var(--text-dim);
		font-size: 0.9rem;
	}

	.suspect-summary {
		display: grid;
		gap: 0.65rem;
	}

	.suspect-summary-card {
		display: grid;
		grid-template-columns: 64px 1fr;
		gap: 0.65rem;
		align-items: center;
		padding: 0.65rem;
		border-radius: 8px;
		background: rgba(0, 0, 0, 0.14);
		border: 1px solid var(--border);
	}

	.suspect-summary-card h4 {
		margin: 0;
		font-size: 0.95rem;
	}

	.suspect-summary-card p {
		margin: 0 0 0;
		font-size: 0.85rem;
		color: var(--text-dim);
	}

	.suspect-thumb {
		width: 64px;
		height: 64px;
		object-fit: cover;
		border-radius: 4px;
	}
</style>
