<script>
	import { onMount } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';
	import { caseFile } from '$lib/data/casefile';
	import { hydrateProgressFromStorage } from '$lib/state/progressStore';
	import BottomNav from '$lib/components/BottomNav.svelte';
	import ProgressHeader from '$lib/components/ProgressHeader.svelte';

	let { children } = $props();

	onMount(() => hydrateProgressFromStorage());
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Source+Sans+3:ital,wght@0,400;0,600;0,700&display=swap"
		rel="stylesheet"
	/>
	<link rel="icon" type="image/svg+xml" href={favicon} />
	<link rel="shortcut icon" href={favicon} />
	<link rel="apple-touch-icon" href={favicon} />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta
		name="description"
		content="Akte-17 – interaktive Vorermittlung, Einladung und Einsatzakte für den Kindergeburtstag."
	/>
	<title>{caseFile.title}</title>
</svelte:head>

<div
	class="app-frame"
	style={`--dark-paper-bg:url(${caseFile.visuals.darkPaperBgUrl});--paper-grain:url(${caseFile.visuals.paperGrainUrl})`}
>
	<ProgressHeader />
	{@render children()}
	<BottomNav />
</div>
