<script>
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { caseFile } from '$lib/data/casefile';
	import { progress, submitPuzzleAttempt } from '$lib/state/progressStore';
	import { getSolvedPreludeCount } from '$lib/state/progress';

	const need = caseFile.codes.missionUnlock.requiredSolvedPuzzles;

	let { puzzle } = $props();

	let input = $state('');
	let feedback = $state('');

	onMount(() => {
		input = get(progress).prelude[puzzle.id]?.lastInput ?? '';
	});

	function check() {
		const res = submitPuzzleAttempt(puzzle.id, input);
		feedback = res.feedback;
	}
</script>

<article class="code-entry panel grain-overlay" id={`riddle-${puzzle.id}`}>
	<div class="code-entry__head">
		<h2>{puzzle.title}</h2>
		{#if $progress.prelude[puzzle.id]?.solved}
			<span class="badge ok">Gelöst</span>
		{:else}
			<span class="badge warn">Offen</span>
		{/if}
	</div>

	<p class="hint"><strong>Hinweis:</strong> {puzzle.hint}</p>

	<div class="code-entry__row">
		<input
			class="input"
			type="text"
			autocomplete="off"
			placeholder="Lösungswort eingeben"
			bind:value={input}
			disabled={$progress.prelude[puzzle.id]?.solved}
			onkeydown={(e) => e.key === 'Enter' && check()}
		/>
		<button type="button" class="btn" onclick={check} disabled={$progress.prelude[puzzle.id]?.solved}>
			Prüfen
		</button>
	</div>

	<p
		class={$progress.prelude[puzzle.id]?.solved
			? 'feedback feedback--ok'
			: feedback
				? 'feedback'
				: 'feedback muted'}
	>
		{#if $progress.prelude[puzzle.id]?.solved}
			Code korrekt — Rätsel abgeschlossen.
		{:else if feedback}
			{feedback}
		{:else}
			Versuche: {$progress.prelude[puzzle.id]?.attempts ?? 0}
		{/if}
	</p>
</article>

<style>
	.code-entry {
		display: grid;
		gap: 0.85rem;
	}

	.code-entry__head {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 0.75rem;
	}

	.code-entry__head h2 {
		font-size: 1.15rem;
	}

	.hint {
		font-size: 0.92rem;
		color: var(--text-dim);
		margin: 0;
	}

	.code-entry__row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.code-entry__row .input {
		flex: 1 1 220px;
	}
</style>
