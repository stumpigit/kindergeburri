<script>
	import { caseFile } from '$lib/data/casefile';
	import { checkAnswer } from '$lib/state/progress';
	import { parentMode, setParentMode } from '$lib/state/parentModeStore';

	let code = $state('');
	let message = $state('');

	function unlock() {
		const ok = checkAnswer(code, caseFile.parentMode.accepted);
		message = ok ? 'Elternansicht aktiv.' : 'Code nicht korrekt.';
		if (ok) setParentMode(true);
	}

	function close() {
		setParentMode(false);
		code = '';
		message = '';
	}
</script>

<details class="parent-unlock panel">
	<summary>Spielleitung / Eltern</summary>
	<div class="parent-unlock__body">
		{#if $parentMode}
			<p class="feedback feedback--ok">Hinweise zu Quellen und Material sind eingeblendet.</p>
			<button type="button" class="btn secondary" onclick={close}>Elternansicht schliessen</button>
		{:else}
			<p class="muted small">Optional: Zusatzinfos für Vorbereitung – nicht nötig zum Rätseln.</p>
			<div class="row">
				<input class="input" type="password" autocomplete="off" bind:value={code} placeholder="Code" />
				<button type="button" class="btn secondary" onclick={unlock}>Freischalten</button>
			</div>
			{#if message}
				<p class="feedback {message.includes('aktiv') ? 'feedback--ok' : ''}">{message}</p>
			{/if}
		{/if}
	</div>
</details>

<style>
	.parent-unlock {
		margin-bottom: 0.75rem;
	}

	.parent-unlock summary {
		cursor: pointer;
		font-weight: 800;
		letter-spacing: 0.02em;
	}

	.parent-unlock__body {
		margin-top: 0.75rem;
		display: grid;
		gap: 0.65rem;
	}

	.small {
		font-size: 0.88rem;
		margin: 0;
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		align-items: center;
	}

	.row .input {
		flex: 1 1 200px;
		max-width: 320px;
	}
</style>
