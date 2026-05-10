<script>
	import { caseFile } from '$lib/data/casefile';
	import { progress } from '$lib/state/progressStore';
	import {
		getEvidenceStats,
		getSolvedPreludeCount,
		isTimelineEventUnlocked
	} from '$lib/state/progress';

	const need = caseFile.codes.missionUnlock.requiredSolvedPuzzles;
</script>

<div class="phase-progress panel grain-overlay">
	{#if true}
		{@const solved = getSolvedPreludeCount($progress)}
		{@const invitationOk = solved >= need}
		{@const ev = getEvidenceStats($progress)}
		{@const board = caseFile.timeline.filter((e) => isTimelineEventUnlocked($progress, e)).length}
		{@const pct = Math.round(
			((ev.analyzed + solved + ($progress.finaleUnlocked ? 1 : 0)) /
				(caseFile.evidence.length + caseFile.prelude.puzzles.length + 1)) *
				100
		)}
		{@const opsLocked = !$progress.investigationUnlocked}
		<div class="phase-progress__top">
		<div class="phase-progress__pct">
			<span class="pct-ring" aria-hidden="true"></span>
			<div>
				<p class="eyebrow">Gesamtfortschritt</p>
				<strong class="pct-value">{pct}<small>%</small></strong>
			</div>
		</div>
		<div class="pill-row pill-row--tracked" aria-label="Vorrätsel">
			{#each caseFile.prelude.puzzles as p}
				<span
					class="puzzle-dot"
					class:puzzle-dot--done={$progress.prelude[p.id]?.solved}
					title={p.title}
				></span>
			{/each}
		</div>
	</div>

	<div class="phase-row">
		<div class="phase-card" class:phase-card--active={solved < need}>
			<span class="phase-card__label">Phase 1 · Vorab</span>
			<strong>{solved}/{caseFile.prelude.puzzles.length}</strong>
			<small>Rätsel</small>
		</div>
		<div class="phase-card" class:phase-card--active={invitationOk}>
			<span class="phase-card__label">Phase 2 · Einladung</span>
			<strong>{invitationOk ? 'frei' : 'offen'}</strong>
			<small>Daten</small>
		</div>
		<div class="phase-card" class:phase-card--active={!opsLocked}>
			<span class="phase-card__label">Phase 3 · Einsatz</span>
			<strong>{opsLocked ? 'wartet' : 'aktiv'}</strong>
			<small>Akte</small>
		</div>
	</div>

		<div class="mini-stats">
			<div>
				<span class="muted">Beweise analysiert</span>
				<strong>{ev.analyzed}/{ev.total}</strong>
			</div>
			<div>
				<span class="muted">Board-Einträge</span>
				<strong>{board}/{caseFile.timeline.length}</strong>
			</div>
		</div>
	{/if}
</div>

<style>
	.phase-progress {
		display: grid;
		gap: 1rem;
	}

	.phase-progress__top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.phase-progress__pct {
		display: flex;
		align-items: center;
		gap: 0.85rem;
	}

	.pct-ring {
		width: 52px;
		height: 52px;
		border-radius: 999px;
		border: 3px solid rgba(255, 255, 255, 0.12);
		border-top-color: rgba(212, 164, 59, 0.95);
		border-right-color: rgba(212, 164, 59, 0.35);
		animation: spin 8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.pct-value {
		font-size: 1.75rem;
		font-family: var(--font-display);
		letter-spacing: 0.04em;
	}

	.pct-value small {
		font-size: 1rem;
		opacity: 0.7;
		margin-left: 0.1em;
	}

	.pill-row {
		display: flex;
		gap: 1.35rem;
		align-items: center;
		justify-content: center;
		padding: 0 0.35rem;
		min-height: 28px;
	}

	.pill-row--tracked {
		position: relative;
	}

	.pill-row--tracked::before {
		content: '';
		position: absolute;
		left: 10%;
		right: 10%;
		top: 50%;
		height: 2px;
		transform: translateY(-50%);
		z-index: 0;
		background: linear-gradient(
			90deg,
			rgba(212, 164, 59, 0.12),
			rgba(255, 255, 255, 0.14),
			rgba(212, 164, 59, 0.12)
		);
		border-radius: 2px;
		opacity: 0.85;
	}

	.puzzle-dot {
		position: relative;
		z-index: 1;
		width: 14px;
		height: 14px;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.12);
		border: 2px solid rgba(255, 255, 255, 0.22);
		box-shadow: 0 0 0 3px rgba(10, 13, 18, 0.85);
	}

	.puzzle-dot--done {
		background: rgba(110, 207, 156, 0.45);
		border-color: rgba(110, 207, 156, 0.75);
		box-shadow: 0 0 12px rgba(110, 207, 156, 0.25);
	}

	.phase-row {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.6rem;
	}

	.phase-card {
		border-radius: 12px;
		border: 1px solid var(--border);
		padding: 0.6rem 0.65rem;
		background: rgba(0, 0, 0, 0.2);
		display: grid;
		gap: 0.2rem;
	}

	.phase-card--active {
		border-color: rgba(212, 164, 59, 0.45);
		background: rgba(212, 164, 59, 0.08);
	}

	.phase-card__label {
		font-size: 0.65rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--muted);
	}

	.phase-card small {
		color: var(--text-dim);
		font-size: 0.75rem;
	}

	.mini-stats {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
		font-size: 0.9rem;
	}

	.mini-stats > div {
		display: grid;
		gap: 0.15rem;
	}
</style>
