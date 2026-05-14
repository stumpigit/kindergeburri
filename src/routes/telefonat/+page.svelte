<script>
	import { caseFile } from '$lib/data/casefile';

	const audioPath = '/audio/telefonat_louise_heinz_schriftsprache.mp3';
</script>

<svelte:head>
	<title>Tonspur · {caseFile.title}</title>
</svelte:head>

<main class="page-main stack">
	<header class="page-title-bar">
		<div>
			<p class="eyebrow">Audio-Beweis</p>
			<h1>Tonspur</h1>
			<p class="subtitle">Eine aufgezeichnete Spur zum Anhören.</p>
		</div>
	</header>

	<section class="panel grain-overlay audio-panel">
		<h2>Player</h2>
		<audio controls preload="metadata" src={audioPath} class="audio-player">
			Dein Browser unterstützt den Audio-Player nicht.
		</audio>
	</section>
</main>

<style>
	.audio-panel {
		display: grid;
		gap: 0.65rem;
	}

	.audio-player {
		width: 100%;
		max-width: 720px;
	}
</style>
