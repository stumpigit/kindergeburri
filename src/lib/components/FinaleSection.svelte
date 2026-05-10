<script>
	import { caseFile } from '$lib/data/casefile';
	import { progress, unlockFinale } from '$lib/state/progressStore';

	let code = $state('');
	let message = $state('');

	function submit() {
		const ok = unlockFinale(code);
		message = ok ? 'Finale freigeschaltet.' : 'Code nicht korrekt. Prüft eure Notizen.';
	}
</script>

<section class="finale-root">
	<div class="section-head">
		<div>
			<h2 class="h2-sm">Finale</h2>
			<p class="muted small">Abschlusscode nur im Teammodus verwenden.</p>
		</div>
		<span class={$progress.finaleUnlocked ? 'badge ok' : 'badge warn'}>
			{$progress.finaleUnlocked ? 'freigeschaltet' : 'gesperrt'}
		</span>
	</div>

	<div class="panel finale-unlock grain-overlay">
		<label class="stack">
			<span class="label">Finalcode</span>
			<input
				class="input"
				type="text"
				autocomplete="off"
				bind:value={code}
				placeholder="z.B. protokoll-komplett"
				onkeydown={(e) => e.key === 'Enter' && submit()}
			/>
		</label>
		<button type="button" class="btn" onclick={submit}>Code prüfen</button>
		<p class={$progress.finaleUnlocked ? 'feedback feedback--ok' : 'feedback'}>
			{message || `Bisherige Versuche: ${$progress.finalCodeAttempts}`}
		</p>
	</div>

	<article class="paper finale-brief grain-overlay">
		<h3>{caseFile.finale.headline}</h3>
		<p>{caseFile.finale.fieldInstruction}</p>
		<p><strong>Spielleitung:</strong> {caseFile.finale.gmInstruction}</p>
		{#if $progress.finaleUnlocked}
			<p class="resolution">{caseFile.finale.resolution}</p>
		{/if}
	</article>
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

	.finale-brief h3 {
		font-size: 1.15rem;
		margin-bottom: 0.45rem;
	}

	.finale-brief p {
		margin: 0 0 0.55rem;
		color: var(--paper-ink);
	}

	.resolution {
		margin-top: 0.55rem;
		padding-top: 0.65rem;
		border-top: 1px solid rgba(29, 26, 20, 0.22);
		font-weight: 700;
	}
</style>
