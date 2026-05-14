<script>
	import EvidenceWorkspace from '$lib/components/EvidenceWorkspace.svelte';
	import SuspectsBoard from '$lib/components/SuspectsBoard.svelte';
	import TimelineBoard from '$lib/components/TimelineBoard.svelte';
	import { caseFile } from '$lib/data/casefile';
	import { progress } from '$lib/state/progressStore';
	import { unlockInvestigation } from '$lib/state/progressStore';

	let tab = $state(/** @type {'evidence' | 'suspects' | 'timeline'} */ ('evidence'));
	let groupLoginInput = $state('');
	let groupLoginMessage = $state('');
	let hintStates = $state({}); // Track which hints are active

	function toggleHint(id) {
		hintStates[id] = !hintStates[id];
	}

	function tryLogin() {
		const ok = unlockInvestigation(groupLoginInput);
		groupLoginMessage = ok
			? 'Gruppenlogin erfolgreich. Die Einsatzakte ist offen.'
			: 'Gruppencode nicht korrekt. Bitte bei der Spielleitung nachfragen.';
	}
</script>

<svelte:head>
	<title>Einsatzakte · {caseFile.title}</title>
</svelte:head>

<main class="page-main stack">
	<header class="page-title-bar">
		<div>
			<p class="eyebrow">Phase 3</p>
			<h1>Einsatzakte</h1>
			<p class="subtitle">Beweise sichten, Profile gewichten und Board füllen. Das Finale findest du in der Navigation.</p>
		</div>
		<span class={$progress.investigationUnlocked ? 'badge ok' : 'badge warn'}>
			{$progress.investigationUnlocked ? 'Team aktiv' : 'Gruppencode nötig'}
		</span>
	</header>

	{#if !$progress.investigationUnlocked}
		<section class="panel lock-screen grain-overlay">
			<h2>Gruppenlogin</h2>
			<p class="muted">
				Dieser Bereich wird am Geburtstag gemeinsam freigeschaltet – Code von der Spielleitung.
			</p>
			<div class="login-row">
				<label class="stack">
					<span class="label">Gruppencode</span>
					<input
						class="input"
						type="text"
						autocomplete="off"
						bind:value={groupLoginInput}
						placeholder="z.B. einsatz-17"
						onkeydown={(e) => e.key === 'Enter' && tryLogin()}
					/>
				</label>
				<button type="button" class="btn" onclick={tryLogin}>Akte öffnen</button>
			</div>
			<p class={groupLoginMessage.includes('erfolgreich') ? 'feedback feedback--ok' : 'feedback'}>
				{groupLoginMessage || `Bisherige Versuche: ${$progress.groupLoginAttempts}`}
			</p>
		</section>
	{:else}
		<div class="tabs" role="tablist" aria-label="Einsatzbereiche">
			<button
				type="button"
				class="tab-btn"
				class:is-active={tab === 'evidence'}
				onclick={() => (tab = 'evidence')}
			>
				Beweise
			</button>
			<button
				type="button"
				class="tab-btn"
				class:is-active={tab === 'suspects'}
				onclick={() => (tab = 'suspects')}
			>
				Verdacht
			</button>
			<button
				type="button"
				class="tab-btn"
				class:is-active={tab === 'timeline'}
				onclick={() => (tab = 'timeline')}
			>
				Board
			</button>
		</div>

		<section class="panel grain-overlay phone-hint">
			<p class="eyebrow">Hinweise</p>
			<div class="hint-list">
				{#each caseFile.hints as hint}
					<div class="hint-item">
						<p class="hint-title">{hint.title}</p>
						<p>{hint.text}</p>
						{#if hint.href}
							<p><a class="inline-link" href={hint.href}>{hint.linkLabel}</a></p>
						{/if}
					</div>
				{/each}
				<p><a class="inline-link" href="/telefonat">Tonspur abhören</a></p>
			</div>
		</section>

		{#if tab === 'evidence'}
			<EvidenceWorkspace />
		{:else if tab === 'suspects'}
			<SuspectsBoard />
		{:else}
			<TimelineBoard />
		{/if}
	{/if}
</main>

<style>
	.lock-screen {
		display: grid;
		gap: 0.75rem;
		max-width: 520px;
	}

	.lock-screen h2 {
		margin: 0;
		font-size: 1.2rem;
	}

	.login-row {
		display: grid;
		gap: 0.65rem;
	}

	@media (min-width: 560px) {
		.login-row {
			grid-template-columns: 1fr auto;
			align-items: end;
		}
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

.phone-hint {
	display: grid;
	gap: 0.8rem;
}

.hint-list {
	display: grid;
	gap: 0.8rem;
}

.hint-item {
	display: grid;
	gap: 0.25rem;
}

.hint-title {
	margin: 0;
	font-weight: 800;
	color: var(--text);
}

.phone-hint p {
	margin: 0;
	color: var(--text-dim);
}

.inline-link {
	color: #ffd98a;
	text-decoration: underline;
	text-underline-offset: 3px;
}

