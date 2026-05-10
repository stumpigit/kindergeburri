<script>
	import { caseFile } from '$lib/data/casefile';
	import { progress } from '$lib/state/progressStore';
	import { getEvidenceStats, getSolvedPreludeCount } from '$lib/state/progress';

	const denom =
		caseFile.evidence.length + caseFile.prelude.puzzles.length + 1;

	function pctFor(p) {
		const solved = getSolvedPreludeCount(p);
		const ev = getEvidenceStats(p);
		const num = ev.analyzed + solved + (p.finaleUnlocked ? 1 : 0);
		return Math.min(100, Math.round((num / denom) * 100));
	}

	function milestones(p) {
		const puzzles = caseFile.prelude.puzzles;
		return {
			m1: puzzles[0] ? !!p.prelude[puzzles[0].id]?.solved : false,
			m2: puzzles[1] ? !!p.prelude[puzzles[1].id]?.solved : false,
			m3: puzzles[2] ? !!p.prelude[puzzles[2].id]?.solved : false,
			m4: p.investigationUnlocked,
			m5: p.finaleUnlocked
		};
	}
</script>

<header class="progress-header" aria-label="Fortschritt und Navigation">
	{#if true}
		{@const p = $progress}
		{@const pct = pctFor(p)}
		{@const ms = milestones(p)}
		<a href="/" class="progress-header__brand" data-sveltekit-preload-data="hover">
			<span class="progress-header__mark" aria-hidden="true"></span>
			<span class="progress-header__title">{caseFile.id}</span>
		</a>

		<div class="progress-header__track-wrap" title="Gesamtfortschritt: {pct}%">
			<div class="progress-header__phases" aria-hidden="true">
				<span class:progress-header__ph--on={ms.m1} title="Rätsel 1"></span>
				<span class:progress-header__ph--on={ms.m2} title="Rätsel 2"></span>
				<span class:progress-header__ph--on={ms.m3} title="Rätsel 3"></span>
				<span class:progress-header__ph--on={ms.m4} title="Einsatz"></span>
				<span class:progress-header__ph--on={ms.m5} title="Finale"></span>
			</div>
			<div
				class="progress-header__track"
				role="progressbar"
				aria-valuenow={pct}
				aria-valuemin="0"
				aria-valuemax="100"
				aria-label="Gesamtfortschritt"
			>
				<div class="progress-header__fill" style={`width:${pct}%`}></div>
			</div>
		</div>

		<span class="progress-header__pct" aria-hidden="true">{pct}%</span>
	{/if}
</header>

<style>
	.progress-header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 45;
		display: flex;
		align-items: center;
		gap: 0.65rem;
		min-height: var(--progress-header-height);
		padding: 0.28rem 0.6rem;
		padding-top: calc(0.28rem + env(safe-area-inset-top, 0px));
		padding-bottom: 0.32rem;
		box-sizing: border-box;
		background: rgba(8, 10, 15, 0.82);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
	}

	.progress-header__brand {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		flex-shrink: 0;
		color: var(--text-dim);
		text-decoration: none;
		font-weight: 800;
		font-size: 0.72rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.progress-header__brand:hover {
		color: var(--text);
	}

	.progress-header__mark {
		width: 6px;
		height: 6px;
		border-radius: 1px;
		background: linear-gradient(135deg, #e8bc4e, #9a6b2e);
		box-shadow: 0 0 10px rgba(212, 164, 59, 0.45);
	}

	.progress-header__title {
		max-width: 7rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.progress-header__track-wrap {
		flex: 1;
		min-width: 0;
		display: grid;
		gap: 0.2rem;
	}

	.progress-header__phases {
		display: flex;
		gap: 3px;
		height: 3px;
		opacity: 0.85;
	}

	.progress-header__phases span {
		flex: 1;
		border-radius: 1px;
		background: rgba(255, 255, 255, 0.1);
		transition: background 0.2s ease;
	}

	.progress-header__phases span.progress-header__ph--on {
		background: rgba(212, 164, 59, 0.55);
	}

	.progress-header__track {
		position: relative;
		height: 5px;
		border-radius: 999px;
		background: rgba(0, 0, 0, 0.35);
		box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.35);
		overflow: hidden;
	}

	.progress-header__fill {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		max-width: 100%;
		border-radius: 999px;
		background: linear-gradient(90deg, #8f6a2a 0%, #e8bc4e 45%, #f0d78c 100%);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25);
		transition: width 0.35s ease;
	}

	.progress-header__pct {
		flex-shrink: 0;
		font-variant-numeric: tabular-nums;
		font-size: 0.7rem;
		font-weight: 800;
		color: rgba(232, 188, 78, 0.95);
		min-width: 2.25rem;
		text-align: right;
		letter-spacing: 0.02em;
	}
</style>
