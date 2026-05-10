<script>
	import { caseFile } from '$lib/data/casefile';
	import { progress } from '$lib/state/progressStore';
	import { isTimelineEventUnlocked } from '$lib/state/progress';
</script>

<section class="timeline-root">
	<div class="section-head">
		<div>
			<h2 class="h2-sm">Ermittlungsboard · Zeitstrahl</h2>
			<p class="muted small">Einträge öffnen sich, sobald die passenden Beweise analysiert sind.</p>
		</div>
		<span class="badge warn">
			{caseFile.timeline.filter((e) => isTimelineEventUnlocked($progress, e)).length}/{caseFile.timeline.length}
		</span>
	</div>

	<ol class="timeline">
		{#each caseFile.timeline as event}
			{@const unlocked = isTimelineEventUnlocked($progress, event)}
			<li class="timeline-item" class:timeline-item--open={unlocked}>
				<div class="timeline-year">{event.year}</div>
				<div>
					<h3>{event.label}</h3>
					{#if unlocked}
						<p>{event.description}</p>
					{:else}
						<p class="locked-text">
							Gesperrt – benötigt:
							{event.requiredEvidence
								.map((id) => caseFile.evidence.find((x) => x.id === id)?.name ?? id)
								.join(', ')}
						</p>
					{/if}
				</div>
			</li>
		{/each}
	</ol>
</section>

<style>
	.h2-sm {
		font-size: 1.25rem;
	}

	.small {
		font-size: 0.92rem;
		margin: 0.25rem 0 0;
	}

	.timeline {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 0.65rem;
	}

	.timeline-item {
		display: grid;
		grid-template-columns: 84px 1fr;
		gap: 0.85rem;
		padding: 0.85rem;
		border-radius: 14px;
		border: 1px solid var(--border);
		background: rgba(0, 0, 0, 0.18);
	}

	.timeline-item--open {
		border-color: rgba(110, 207, 156, 0.35);
		background: rgba(110, 207, 156, 0.07);
	}

	.timeline-year {
		font-weight: 800;
		color: #cfe0ff;
		font-family: var(--font-display);
		font-size: 1.05rem;
	}

	.timeline-item h3 {
		font-size: 1rem;
		margin: 0 0 0.35rem;
	}

	.timeline-item p {
		margin: 0;
		color: var(--text-dim);
		font-size: 0.95rem;
	}
</style>
