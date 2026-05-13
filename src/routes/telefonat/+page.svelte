<script>
	import { caseFile } from '$lib/data/casefile';

	const audioPath = '/audio/telefonat_louise_heinz_schriftsprache.mp3';
</script>

<svelte:head>
	<title>Telefonat · {caseFile.title}</title>
</svelte:head>

<main class="page-main stack">
	<header class="page-title-bar">
		<div>
			<p class="eyebrow">Audio-Beweis</p>
			<h1>Telefonat Louise ↔ Heinz</h1>
			<p class="subtitle">Hier kann das Telefonat direkt abgespielt oder als Link geöffnet werden.</p>
		</div>
	</header>

	<section class="panel grain-overlay audio-panel">
		<h2>Player</h2>
		<audio controls preload="metadata" src={audioPath} class="audio-player">
			Dein Browser unterstützt den Audio-Player nicht.
		</audio>
		<p class="muted small">Datei: telefonat_louise_heinz_schriftsprache.mp3</p>
	</section>

	<section class="paper grain-overlay link-panel">
		<h2>Direktlink für QR-Code</h2>
		<p>
			<a class="direct-link" href={audioPath}>{audioPath}</a>
		</p>
		<p class="muted small">
			Für den QR-Code nimm die vollständige URL, z. B.
			<code>https://deine-domain/telefonat</code>
			(Seite mit Player) oder
			<code>https://deine-domain{audioPath}</code>
			(direkte MP3-Datei).
		</p>
	</section>
</main>

<style>
	.audio-panel,
	.link-panel {
		display: grid;
		gap: 0.65rem;
	}

	.audio-player {
		width: 100%;
		max-width: 720px;
	}

	.direct-link {
		color: #8b4513;
		text-decoration: underline;
		text-underline-offset: 3px;
		font-weight: 700;
		word-break: break-all;
	}

	.small {
		font-size: 0.9rem;
	}
</style>
