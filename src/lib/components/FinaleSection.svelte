<script>
	import { caseFile } from '$lib/data/casefile';
	import { progress, unlockFinale } from '$lib/state/progressStore';
    import { normalizeAnswer } from '$lib/state/progress';

	let code = $state('');
	let message = $state('');

	function submit() {
		const normalized = normalizeAnswer(code);
        
        // Check for E5 Unlock
        if (caseFile.codes.e5Unlock.accepted.some(a => normalizeAnswer(a) === normalized)) {
            $progress.evidence['e5'].found = true;
            $progress.evidence['e5'].analyzed = true;
            message = 'Beweis E5 freigeschaltet! Sucht im Garten beim Kirschbaum.';
            code = '';
            return;
        }

        // Check for Finale Unlock
		const ok = unlockFinale(code);
		if (ok) {
            $progress.evidence['e6'].found = true;
            $progress.evidence['e6'].analyzed = true;
            message = 'Finale freigeschaltet! Geht zum Teich bei der Schule.';
        } else {
            message = 'Code nicht korrekt. Prüft eure Notizen.';
        }
	}
</script>

<section class="finale-root">
	<div class="section-head">
		<div>
			<h2 class="h2-sm">Finale & Geheimcodes</h2>
			<p class="muted small">Gebt hier eure gefundenen Lösungswörter ein.</p>
		</div>
		<span class={$progress.finaleUnlocked ? 'badge ok' : 'badge warn'}>
			{$progress.finaleUnlocked ? 'Abgeschlossen' : 'Ermittlung läuft'}
		</span>
	</div>

	<div class="panel finale-unlock grain-overlay">
		<label class="stack">
			<span class="label">Lösungswort eingeben</span>
			<input
				class="input"
				type="text"
				autocomplete="off"
				bind:value={code}
				placeholder="z.B. Kirschbaum Garten"
				onkeydown={(e) => e.key === 'Enter' && submit()}
			/>
		</label>
		<button type="button" class="btn" onclick={submit}>Prüfen</button>
		<p class={$progress.finaleUnlocked ? 'feedback feedback--ok' : 'feedback'}>
			{message}
		</p>
	</div>

    {#if $progress.evidence['e5'].found}
    <article class="paper finale-brief grain-overlay mb-1">
		<h3>Beweis E5: Gartenfund</h3>
		<p>{caseFile.evidence.find(e => e.id === 'e5').summary}</p>
        <p class="archive-note"><em>{caseFile.evidence.find(e => e.id === 'e5').archiveText}</em></p>
	</article>
    {/if}

	<article class="paper finale-brief grain-overlay">
		<h3>{caseFile.finale.headline}</h3>
		<p>{caseFile.finale.fieldInstruction}</p>
		
		{#if $progress.finaleUnlocked}
            <div class="resolution-box">
                <h4>🎉 Der Fall ist gelöst!</h4>
    			<p class="resolution">{caseFile.finale.resolution}</p>
                <hr />
                <h3>Beweis E6: Die Auflösung</h3>
                <p>{caseFile.evidence.find(e => e.id === 'e6').summary}</p>
                <p><em>{caseFile.evidence.find(e => e.id === 'e6').archiveText}</em></p>
            </div>
		{/if}
	</article>
</section>

<style>
	.h2-sm {
		font-size: 1.25rem;
	}

	.small {
		font-size: 0.92rem;
		margin: 0.25rem 0 0;
	}

	.finale-unlock {
		display: grid;
		gap: 0.65rem;
		max-width: 460px;
		margin-bottom: 1rem;
	}

	.stack {
		display: grid;
		gap: 0.35rem;
	}

	.label {
		font-size: 0.82rem;
		font-weight: 800;
		color: var(--text-dim);
	}

	.finale-brief h3 {
		font-size: 1.15rem;
		margin-bottom: 0.45rem;
	}

	.finale-brief p {
		margin: 0 0 0.55rem;
		color: var(--paper-ink);
	}

    .mb-1 { margin-bottom: 1rem; }

    .archive-note {
        font-size: 0.9rem;
        background: rgba(0,0,0,0.05);
        padding: 0.5rem;
        border-radius: 4px;
    }

	.resolution {
		margin-top: 0.55rem;
		font-weight: 700;
	}

    .resolution-box {
        border-top: 2px dashed #1d1a14;
        padding-top: 1rem;
        margin-top: 1rem;
    }
</style>
