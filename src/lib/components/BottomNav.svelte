<script>
	import { page } from '$app/stores';
	import { progress } from '$lib/state/progressStore';

	const links = [
		{ href: '/', label: 'Start', icon: '⌂' },
		{ href: '/einladung', label: 'Einladung', icon: '✉' },
		{ href: '/einsatz', label: 'Einsatz', icon: '◎' },
		{ href: '/finale', label: 'Finale', icon: '★' }
	];

	/** @param {string} href */
	function isActive(href) {
		const path = $page.url.pathname;
		if (href === '/') return path === '/';
		return path === href || path.startsWith(`${href}/`);
	}
</script>

<nav class="bottom-nav" aria-label="Hauptnavigation">
	{#each links as item}
		<a
			href={item.href}
			class:is-active={isActive(item.href)}
			data-sveltekit-preload-data="hover"
		>
			<span class="icon" aria-hidden="true">{item.icon}</span>
			{item.label}
		</a>
	{/each}
</nav>
