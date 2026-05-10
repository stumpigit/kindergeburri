<script>
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { caseFile } from '$lib/data/casefile';
	import { parentMode } from '$lib/state/parentModeStore';
	import { progress, submitPuzzleAttempt } from '$lib/state/progressStore';

	let { puzzle } = $props();

	const teaser = caseFile.prelude.teasers.find((t) => t.supportsPuzzleId === puzzle.id);

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

<article class="puzzle-card panel grain-overlay" id={`riddle-${puzzle.id}`}>
	<div class="puzzle-card__head">
		<h2>{puzzle.title}</h2>
		{#if $progress.prelude[puzzle.id]?.solved}
			<span class="badge ok">Gelöst</span>
		{:else}
			<span class="badge warn">Offen</span>
		{/if}
	</div>

	{#if teaser}
		<div class="paper clue-paper">
			<p class="clue-title">{teaser.title}</p>
			<pre class="clue-body">{teaser.text}</pre>
		</div>
	{/if}

	{#if $parentMode}
		<p class="meta-source muted">Quelle: {puzzle.source}</p>
	{/if}

	<p class="hint"><strong>Hinweis:</strong> {puzzle.hint}</p>
	<p class="question">{puzzle.question}</p>

	<div class="puzzle-card__row">
		<input
			class="input"
			type="text"
			autocomplete="off"
			placeholder="Antwort eingeben"
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
	.puzzle-card {
		display: grid;
		gap: 0.85rem;
	}

	.puzzle-card__head {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 0.75rem;
	}

	.puzzle-card__head h2 {
		font-size: 1.15rem;
	}

	.clue-paper {
		display: grid;
		gap: 0.45rem;
		border-left: 3px solid rgba(140, 90, 45, 0.38);
		box-shadow:
			inset 0 0 0 1px rgba(29, 26, 20, 0.07),
			0 4px 18px rgba(0, 0, 0, 0.14);
	}

	.clue-title {
		margin: 0;
		font-weight: 800;
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		opacity: 0.75;
	}

	.clue-body {
		margin: 0;
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		font-size: 0.95rem;
		line-height: 1.45;
		white-space: pre-wrap;
	}

	.meta-source {
		font-size: 0.85rem;
	}

	.hint {
		font-size: 0.92rem;
		color: var(--text-dim);
		margin: 0;
	}

	.question {
		font-weight: 700;
		margin: 0;
	}

	.puzzle-card__row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.puzzle-card__row .input {
		flex: 1 1 220px;
	}
</style>
