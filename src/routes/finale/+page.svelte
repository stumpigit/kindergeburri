<script>
	import FinaleSection from '$lib/components/FinaleSection.svelte';
	import { caseFile } from '$lib/data/casefile';
	import { progress } from '$lib/state/progressStore';
</script>

<svelte:head>
	<title>Finale · {caseFile.title}</title>
</svelte:head>

<main class="page-main stack">
	<header class="page-title-bar">
		<div>
			<p class="eyebrow">Abschluss</p>
			<h1>Finale</h1>
			<p class="subtitle">Finalcode und Hinweise für die Aussenstation.</p>
		</div>
		<span class={$progress.finaleUnlocked ? 'badge ok' : 'badge warn'}>
			{$progress.finaleUnlocked ? 'frei' : 'Code offen'}
		</span>
	</header>

	{#if !$progress.investigationUnlocked}
		<section class="panel lock-panel grain-overlay">
			<h2>Noch gesperrt</h2>
			<p class="muted">
				Das Finale ist Teil der Einsatzakte. Öffnet zuerst die Akte mit dem Gruppencode unter
				<a class="inline-link" href="/einsatz">Einsatz</a>, dann könnt ihr hier den Finalcode
				eingeben.
			</p>
			<a class="btn" href="/einsatz">Zur Einsatzakte</a>
		</section>
	{:else}
		<FinaleSection />
	{/if}
</main>

<style>
	.lock-panel {
		display: grid;
		gap: 0.75rem;
		max-width: 520px;
	}

	.lock-panel h2 {
		margin: 0;
		font-size: 1.15rem;
	}

	.inline-link {
		color: #ffd98a;
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.lock-panel .btn {
		align-self: start;
	}
</style>
