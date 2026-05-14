<script>
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import MissionHero from '$lib/components/MissionHero.svelte';
	import PhaseProgress from '$lib/components/PhaseProgress.svelte';
	import { caseFile } from '$lib/data/casefile';
	import { progress } from '$lib/state/progressStore';
	import { saveTeamIdentity } from '$lib/state/progressStore';

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
			<li>Vor dem Geburtstag: drei Einladung-Rätsel lösen</li>
			<li>Die Einladungskarte wird freigeschaltet.</li>
			<li>Am Geburtstag: gemeinsam den Gruppencode eingeben und die Akte öffnen.</li>
		</ol>
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

	.teaser-img {
		min-height: 140px;
		border-radius: 12px;
		background-size: cover;
		background-position: center;
		border: 1px solid var(--border);
		margin-bottom: 0.75rem;
	}

</style>
