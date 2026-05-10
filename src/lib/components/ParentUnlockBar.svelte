<script>
	import { caseFile } from '$lib/data/casefile';
	import { checkAnswer } from '$lib/state/progress';
	import { parentMode, setParentMode } from '$lib/state/parentModeStore';

	/** @type {{ variant?: 'footer' | 'header' }} */
	let { variant = 'footer' } = $props();

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

	/** @param {KeyboardEvent} e */
	function onCodeKeydown(e) {
		if (e.key === 'Enter') {
			e.preventDefault();
			unlock();
		}
	}
</script>

<details
	class="parent-unlock"
	class:panel={variant === 'footer'}
	class:parent-unlock--header={variant === 'header'}
	class:parent-unlock--active={$parentMode}
>
	<summary class="parent-unlock__summary">
		{#if variant === 'header'}
			<span class="parent-unlock__summary-short" title="Spielleitung / Eltern">Eltern</span>
		{:else}
			Spielleitung / Eltern
		{/if}
	</summary>
	<div
		class="parent-unlock__body"
		class:parent-unlock__body--dropdown={variant === 'header'}
	>
		{#if $parentMode}
			<p class="feedback feedback--ok">Hinweise zu Quellen und Material sind eingeblendet.</p>
			<button type="button" class="btn secondary" onclick={close}>Elternansicht schliessen</button>
		{:else}
			<p class="muted small">Optional: Zusatzinfos für Vorbereitung – nicht nötig zum Rätseln.</p>
			<div class="row">
				<input
					class="input"
					type="password"
					autocomplete="off"
					bind:value={code}
					placeholder="Code"
					onkeydown={onCodeKeydown}
				/>
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

	.parent-unlock--header {
		position: relative;
		margin-bottom: 0;
	}

	.parent-unlock__summary {
		cursor: pointer;
		font-weight: 800;
		letter-spacing: 0.02em;
		list-style: none;
	}

	.parent-unlock__summary::-webkit-details-marker {
		display: none;
	}

	.parent-unlock--header .parent-unlock__summary {
		display: block;
		margin: 0;
		padding: 0.22rem 0.5rem;
		border-radius: 8px;
		border: 1px solid rgba(255, 255, 255, 0.14);
		background: rgba(0, 0, 0, 0.28);
		font-size: 0.62rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--text-dim);
		line-height: 1.2;
		white-space: nowrap;
	}

	.parent-unlock--header.parent-unlock--active .parent-unlock__summary {
		border-color: rgba(168, 236, 199, 0.4);
		color: #a8ecc7;
	}

	.parent-unlock--header[open] .parent-unlock__summary {
		border-color: rgba(232, 188, 78, 0.45);
		color: rgba(232, 188, 78, 0.95);
	}

	.parent-unlock__summary-short {
		display: inline-block;
	}

	.parent-unlock__body {
		margin-top: 0.75rem;
		display: grid;
		gap: 0.65rem;
	}

	.parent-unlock__body--dropdown {
		position: absolute;
		right: 0;
		top: calc(100% + 6px);
		z-index: 50;
		width: min(18.5rem, calc(100vw - 1rem));
		margin-top: 0;
		padding: 0.85rem 0.95rem;
		border-radius: var(--radius);
		background: rgba(14, 16, 22, 0.97);
		border: 1px solid var(--border);
		box-shadow:
			0 12px 40px rgba(0, 0, 0, 0.45),
			0 0 0 1px rgba(255, 255, 255, 0.04);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
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

	.parent-unlock__body--dropdown .row .input {
		max-width: none;
		min-width: 0;
	}
</style>
