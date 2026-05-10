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
		<div
			class="teaser-img"
			style={`background-image:url(${caseFile.visuals.fragmentsUrl})`}
			role="img"
			aria-label="Collage aus Aktenfragmenten"
		></div>
		<h2>{caseFile.invitation.headline}</h2>
		<p class="muted">
			Herzliche Gratulation! Du wurdest erfolgreich im Ermittlungsteam aufgenommen. Folgende Aufgaben
			stehen an:
		</p>
		<ol class="flow">
			<li>Vor dem Geburtstag: drei kurze Codes lösen</li>
			<li>Einladungsdetails werden automatisch freigeschaltet.</li>
			<li>Am Geburtstag: gemeinsam den Gruppencode eingeben und die Akte öffnen.</li>
		</ol>
	</section>

	{#if $parentMode}
		<details class="organizer-details panel grain-overlay">
			<summary class="organizer-details__summary">
				<span class="organizer-details__label">Für Erwachsene</span>
				<span class="organizer-details__hint">Materialhinweise · Neustart</span>
			</summary>
			<div class="organizer-details__body">
				<section class="organizer-details__section">
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

				<section class="panel danger-zone grain-overlay organizer-details__section">
					<h3 class="h3-title">Neustart</h3>
					<p class="muted small">
						Löscht den gespeicherten Fortschritt in diesem Browser (neues Team auf demselben Gerät).
					</p>
					<button type="button" class="btn secondary" onclick={reset}>Fortschritt zurücksetzen</button>
				</section>
			</div>
		</details>
	{/if}
</main>

<style>
	.flow {
		margin: 0.5rem 0 0;
		padding-left: 1.2rem;
		display: grid;
		gap: 0.35rem;
		color: var(--text-dim);
	}

	.h3-title {
		font-size: 1.05rem;
		margin: 0 0 0.35rem;
	}

	.small {
		font-size: 0.88rem;
		margin: 0 0 0.75rem;
	}

	.organizer-details {
		border-style: dashed;
		border-color: rgba(255, 255, 255, 0.14);
	}

	.organizer-details__summary {
		cursor: pointer;
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.5rem 1rem;
		padding: 0.15rem 0;
		font-weight: 800;
		letter-spacing: 0.02em;
	}

	.organizer-details__summary::-webkit-details-marker {
		display: none;
	}

	.organizer-details__label {
		color: var(--text-dim);
		font-size: 0.82rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.organizer-details__hint {
		color: var(--muted);
		font-size: 0.88rem;
		font-weight: 600;
	}

	.organizer-details__body {
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px solid var(--border);
		display: grid;
		gap: 1.25rem;
	}

	.organizer-details__section.danger-zone {
		margin-bottom: 0;
	}

	.teaser-img {
		min-height: 140px;
		border-radius: 12px;
		background-size: cover;
		background-position: center;
		border: 1px solid var(--border);
		margin-bottom: 0.75rem;
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
