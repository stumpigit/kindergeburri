<script>
	import PreludePuzzleCard from '$lib/components/PreludePuzzleCard.svelte';
	import { caseFile } from '$lib/data/casefile';
	import { parentMode } from '$lib/state/parentModeStore';
	import { progress } from '$lib/state/progressStore';
	import { getSolvedPreludeCount, isTimelineEventUnlocked } from '$lib/state/progress';

	const need = caseFile.codes.missionUnlock.requiredSolvedPuzzles;
</script>

<svelte:head>
	<title>Einladung · {caseFile.title}</title>
</svelte:head>

<main class="page-main stack">
	{#if true}
		{@const solved = getSolvedPreludeCount($progress)}
		{@const unlocked = solved >= need}
		{@const boardOpen = caseFile.timeline.filter((e) => isTimelineEventUnlocked($progress, e)).length}

		<header class="page-title-bar">
			<div>
				<p class="eyebrow">Einladung</p>
				<h1>Einladung</h1>
				{#if unlocked}
					<p class="subtitle">Alle Codes stimmen – hier sind die Einsatzinfos.</p>
				{:else}
					<p class="subtitle">{caseFile.prelude.intro}</p>
				{/if}
			</div>
			<span class={unlocked ? 'badge ok' : 'badge warn'}>
				{unlocked ? 'freigeschaltet' : `${solved}/${need} Codes`}
			</span>
		</header>

		{#if !unlocked}
			<div class="puzzle-stack">
				{#each caseFile.prelude.puzzles as puzzle}
					<PreludePuzzleCard {puzzle} />
				{/each}
			</div>

			{#if $parentMode}
				<details class="panel gm-notes grain-overlay">
					<summary>Elternnotizen</summary>
					<ul>
						{#each caseFile.prelude.gmNotes as note}
							<li>{note}</li>
						{/each}
					</ul>
				</details>
			{/if}
		{:else}
			<section class="panel success-banner grain-overlay">
				<p class="eyebrow success-banner__eyebrow">Geschafft</p>
				<h2 class="success-banner__title">Einladung freigeschaltet</h2>
				<p class="success-banner__text">
					Ihr habt alle drei Vorab-Codes geknackt. Die Einladungsdaten sind ab jetzt dauerhaft hier
					einsehbar.
				</p>
			</section>

			<section class="paper briefing-paper grain-overlay">
				<h2>Einsatzinformationen</h2>
				<dl class="kv">
					<div>
						<dt>{caseFile.birthdayBriefing.dateLabel}</dt>
						<dd>{caseFile.birthdayBriefing.dateValue}</dd>
					</div>
					<div>
						<dt>Treffpunkt</dt>
						<dd>{caseFile.birthdayBriefing.meetingPoint}</dd>
					</div>
					<div>
						<dt>Dresscode</dt>
						<dd>{caseFile.birthdayBriefing.dresscode}</dd>
					</div>
				</dl>
				<h3>Mitbringen</h3>
				<ul class="bring">
					{#each caseFile.birthdayBriefing.bringAlong as item}
						<li>{item}</li>
					{/each}
				</ul>
				<p class="fineprint muted">{caseFile.birthdayBriefing.unlockNote}</p>
			</section>

			<section class="panel hint-panel grain-overlay">
				<p class="eyebrow">Am Geburtstag</p>
				<p>
					Unter <a class="inline-link" href="/einsatz">Einsatz</a> öffnet ihr die Akte mit dem
					Gruppencode. Board-Stand:
					<strong>{boardOpen}/{caseFile.timeline.length}</strong>. Das
					<a class="inline-link" href="/finale">Finale</a> erreicht ihr auch direkt in der
					Navigation, sobald die Akte aktiv ist.
				</p>
			</section>
		{/if}
	{/if}
</main>

<style>
	.puzzle-stack {
		display: grid;
		gap: 1rem;
	}

	.success-banner {
		border-color: rgba(110, 207, 156, 0.4);
		background: linear-gradient(165deg, rgba(110, 207, 156, 0.12), rgba(0, 0, 0, 0.12));
	}

	.success-banner__eyebrow {
		color: #9fe0b8;
		margin-bottom: 0.35rem;
	}

	.success-banner__title {
		font-size: 1.35rem;
		margin: 0 0 0.5rem;
	}

	.success-banner__text {
		margin: 0;
		color: var(--text-dim);
		max-width: 60ch;
	}

	.gm-notes ul {
		margin: 0.65rem 0 0;
		padding-left: 1.1rem;
		color: var(--text-dim);
		display: grid;
		gap: 0.35rem;
	}

	.gm-notes summary {
		cursor: pointer;
		font-weight: 800;
	}

	.briefing-paper h2 {
		margin: 0 0 0.75rem;
		font-size: 1.35rem;
	}

	.briefing-paper h3 {
		margin: 1rem 0 0.45rem;
		font-size: 1rem;
		font-family: var(--font-body);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--paper-ink);
		opacity: 0.65;
	}

	.kv {
		display: grid;
		gap: 0.65rem;
		margin: 0;
	}

	dt {
		font-weight: 800;
		font-size: 0.82rem;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		opacity: 0.65;
	}

	dd {
		margin: 0.15rem 0 0;
		font-size: 1.05rem;
	}

	.bring {
		margin: 0;
		padding-left: 1.1rem;
		display: grid;
		gap: 0.35rem;
	}

	.fineprint {
		margin-top: 1rem;
		font-size: 0.88rem;
	}

	.hint-panel p {
		margin: 0;
		color: var(--text-dim);
	}

	.inline-link {
		color: #ffd98a;
		text-decoration: underline;
		text-underline-offset: 3px;
	}
</style>
