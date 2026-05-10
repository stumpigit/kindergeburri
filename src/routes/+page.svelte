<script>
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import MissionHero from '$lib/components/MissionHero.svelte';
	import PhaseProgress from '$lib/components/PhaseProgress.svelte';
	import { caseFile } from '$lib/data/casefile';
	import { progress } from '$lib/state/progressStore';
	import { parentMode } from '$lib/state/parentModeStore';
	import { resetAllProgress, saveTeamIdentity } from '$lib/state/progressStore';

	let teamNameInput = $state('');
	let codenameInput = $state('');
	let statusMessage = $state('');

	onMount(() => {
		const p = get(progress);
		teamNameInput = p.teamName ?? '';
		codenameInput = p.codename ?? '';
	});

	function saveTeam() {
		saveTeamIdentity(teamNameInput, codenameInput);
		statusMessage = 'Teamprofil gespeichert.';
	}

	function reset() {
		resetAllProgress();
		teamNameInput = '';
		codenameInput = '';
		statusMessage = 'Fortschritt zurückgesetzt.';
	}
</script>

<MissionHero />

<main class="page-main stack">

	<section class="panel grain-overlay">
		<h2>{caseFile.invitation.headline}</h2>
		<p class="muted">So läuft der Link für alle Ermittlerinnen:</p>
		<ol class="flow">
			<li>Vor dem Geburtstag: drei kurze Codes lösen.</li>
			<li>Einladungsdetails werden automatisch freigeschaltet.</li>
			<li>Am Geburtstag: gemeinsam den Gruppencode eingeben und die Akte öffnen.</li>
		</ol>
	</section>

	<section class="grid-two">
		<article class="panel grain-overlay">
			<h3 class="h3-title">Team auf der Akte</h3>
			<p class="muted small">Optional – hilft beim gemeinsamen Spiel auf einem Gerät.</p>
			<label class="field">
				<span>Teamname</span>
				<input class="input" bind:value={teamNameInput} autocomplete="off" />
			</label>
			<label class="field">
				<span>Codename</span>
				<input class="input" bind:value={codenameInput} autocomplete="off" />
			</label>
			<div class="row">
				<button type="button" class="btn secondary" onclick={saveTeam}>Speichern</button>
				{#if statusMessage}
					<span class="feedback feedback--ok">{statusMessage}</span>
				{/if}
			</div>
		</article>

		<article class="panel teaser-card grain-overlay">
			<div
				class="teaser-img"
				style={`background-image:url(${caseFile.visuals.fragmentsUrl})`}
				role="img"
				aria-label="Collage aus Aktenfragmenten"
			></div>
			<h3 class="h3-title">Einladungspaket</h3>
			<ul class="kit">
				{#each caseFile.invitationKit as item}
					<li>{item}</li>
				{/each}
			</ul>
			<a class="btn" href="/einladung">Zur Einladung</a>
		</article>
	</section>

	{#if $parentMode}
		<section class="panel grain-overlay">
			<h3 class="h3-title">Material-Hinweise (nur Eltern)</h3>
			<div class="asset-grid">
				{#each Object.values(caseFile.imagePlaceholders) as asset}
					<article class="paper asset-card">
						<h4>{asset.title}</h4>
						<p>{asset.description}</p>
						<code>{asset.envatoKeywords}</code>
					</article>
				{/each}
			</div>
		</section>
	{/if}

	<section class="panel danger-zone grain-overlay">
		<h3 class="h3-title">Neustart</h3>
		<p class="muted small">
			Löscht den gespeicherten Fortschritt in diesem Browser (neues Team auf demselben Gerät).
		</p>
		<button type="button" class="btn secondary" onclick={reset}>Fortschritt zurücksetzen</button>
	</section>
</main>

<style>
	.flow {
		margin: 0.5rem 0 0;
		padding-left: 1.2rem;
		display: grid;
		gap: 0.35rem;
		color: var(--text-dim);
	}

	.grid-two {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		align-items: start;
	}

	.h3-title {
		font-size: 1.05rem;
		margin: 0 0 0.35rem;
	}

	.small {
		font-size: 0.88rem;
		margin: 0 0 0.75rem;
	}

	.field {
		display: grid;
		gap: 0.35rem;
		margin-bottom: 0.65rem;
		font-size: 0.82rem;
		font-weight: 800;
		color: var(--text-dim);
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
		align-items: center;
		margin-top: 0.35rem;
	}

	.teaser-img {
		min-height: 140px;
		border-radius: 12px;
		background-size: cover;
		background-position: center;
		border: 1px solid var(--border);
		margin-bottom: 0.75rem;
	}

	.kit {
		margin: 0 0 1rem;
		padding-left: 1.1rem;
		color: var(--text-dim);
		display: grid;
		gap: 0.35rem;
	}

	.asset-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 0.75rem;
		margin-top: 0.75rem;
	}

	.asset-card {
		display: grid;
		gap: 0.45rem;
	}

	.asset-card h4 {
		margin: 0;
		font-size: 0.95rem;
	}

	.asset-card code {
		display: block;
		padding: 0.45rem 0.55rem;
		border-radius: 8px;
		background: rgba(6, 8, 14, 0.06);
		border: 1px solid rgba(29, 26, 20, 0.15);
		font-size: 0.78rem;
		line-height: 1.35;
		overflow-wrap: anywhere;
	}

	.danger-zone {
		border-color: rgba(224, 112, 102, 0.35);
		background: linear-gradient(165deg, rgba(224, 112, 102, 0.08), rgba(0, 0, 0, 0.15));
	}
</style>
