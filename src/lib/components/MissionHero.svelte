<script>
	import { caseFile } from '$lib/data/casefile';
</script>

<section class="mission-hero" aria-labelledby="mission-title">
	<div class="mission-hero__backdrop">
		<img
			class="mission-hero__photo"
			src={caseFile.visuals.heroDeskUrl}
			alt=""
			fetchpriority="high"
			decoding="async"
		/>
		<div class="mission-hero__veil" aria-hidden="true"></div>
	</div>

	<div class="mission-hero__grid">
		<div class="mission-hero__copy">
			<div class="mission-hero__badges">
				<span class="badge muted">Aktenzeichen {caseFile.shortTitle}</span>
				<span class="badge accent">{caseFile.setting.location}</span>
			</div>
			<h1 id="mission-title">Herzlich willkommen zum Geburtstagskrimi von Flurina</h1>
			<p class="lede">Du bist im Entwicklerteam dabei! Löse nun die drei Rätsel der Einladungskarte, um alle Details der Party zu erfahren.</p>
			<div class="mission-hero__cta">
				<a class="btn" href="/einladung">Zur Einladung</a>
				<a class="btn secondary" href="/einsatz">Einsatzakte</a>
			</div>
		</div>

		<aside class="mission-hero__aside" aria-label="Archiv-Hinweis">
			<div class="mission-hero__aside-photo">
				<img src={caseFile.visuals.heroCardUrl} alt="" loading="lazy" decoding="async" />
			</div>
			<div class="mission-hero__aside-body">
				<p class="eyebrow">Archiv</p>
				<p class="strong">Herzlich willkommen im Archiv der Stadt Bern.</p>
				<p class="tiny muted">Finde hier alles über die Akte-17.</p>
			</div>
		</aside>
	</div>
</section>

<style>
	.mission-hero {
		position: relative;
		min-height: min(58vh, 540px);
		margin: 0 0 1.35rem;
		border-radius: 0 0 var(--radius) var(--radius);
		overflow: hidden;
		/* Schatten nach unten weich – keine harte Kante am unteren Rand */
		box-shadow: 0 20px 44px rgba(0, 0, 0, 0.28);
	}

	.mission-hero__backdrop {
		position: absolute;
		inset: 0;
		/* Gleiche Papier-Schicht wie .app-frame::before, damit das Foto unten hineinblendet */
		background:
			linear-gradient(
				180deg,
				rgba(8, 10, 14, 0.5) 0%,
				rgba(6, 8, 12, 0.52) 45%,
				rgba(5, 6, 10, 0.58) 100%
			),
			var(--dark-paper-bg, none) center / cover no-repeat fixed;
	}

	.mission-hero__photo {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 55% 35%;
		transform: scale(1.02);
		/* Unteres Drittel: weiches Ausblenden in den Seitenhintergrund (kein scharfer Bildrand) */
		mask-image: linear-gradient(
			to bottom,
			#000 0%,
			#000 52%,
			rgba(0, 0, 0, 0.72) 66%,
			rgba(0, 0, 0, 0.28) 82%,
			transparent 100%
		);
		-webkit-mask-image: linear-gradient(
			to bottom,
			#000 0%,
			#000 52%,
			rgba(0, 0, 0, 0.72) 66%,
			rgba(0, 0, 0, 0.28) 82%,
			transparent 100%
		);
		mask-size: 100% 100%;
		-webkit-mask-size: 100% 100%;
	}

	.mission-hero__veil {
		position: absolute;
		inset: 0;
		/* Nur noch Lesbarkeit links; vertikaler Verlauf übernimmt Mask + Backdrop */
		background: linear-gradient(
			to right,
			rgba(5, 7, 10, 0.92) 0%,
			rgba(5, 7, 10, 0.55) 38%,
			rgba(5, 7, 10, 0.12) 62%,
			transparent 82%
		);
		pointer-events: none;
	}

	.mission-hero__grid {
		position: relative;
		z-index: 2;
		max-width: 1120px;
		margin: 0 auto;
		padding: clamp(1.5rem, 4vw, 2.75rem) 1rem 2rem;
		display: grid;
		gap: 1.35rem;
		align-items: stretch;
		min-height: min(46vh, 540px);
		box-sizing: border-box;
	}

	@media (min-width: 900px) {
		.mission-hero__grid {
			grid-template-columns: 1fr minmax(260px, 340px);
			align-items: stretch;
		}

		.mission-hero__copy {
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			height: 100%;
			min-height: 0;
			max-width: min(100%, 42rem);
		}

		.mission-hero__aside {
			display: flex;
			flex-direction: column;
			height: 100%;
			min-height: 0;
		}

		.mission-hero__aside-photo {
			flex: 1 1 0;
			min-height: 12rem;
			max-height: none;
			position: relative;
		}

		.mission-hero__aside-photo img {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			min-height: 12rem;
			object-fit: cover;
			object-position: center;
			filter: saturate(0.95) contrast(1.03);
		}

		.mission-hero__aside-body {
			flex-shrink: 0;
		}
	}

	.mission-hero__copy {
		padding: 1.2rem 1.35rem 1.45rem;
		border-radius: var(--radius);
		background: rgba(4, 7, 12, 0.2);
		border: 1px solid rgba(255, 255, 255, 0.14);
		box-shadow:
			0 12px 40px rgba(0, 0, 0, 0.45),
			inset 0 1px 0 rgba(255, 255, 255, 0.06);
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
		max-width: 100%;
	}

	.mission-hero__badges {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		margin-bottom: 0.75rem;
	}

	.mission-hero__badges :global(.badge.muted) {
		background: rgba(0, 0, 0, 0.1);
		color: #eef2f7;
		border: 1px solid rgba(255, 255, 255, 0.22);
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
	}

	.mission-hero__badges :global(.badge.accent) {
		background: rgba(212, 164, 59, 0.28);
		color: #fff2d2;
		border: 1px solid rgba(232, 188, 78, 0.55);
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.65);
	}

	.mission-hero h1 {
		font-size: clamp(1.85rem, 4.2vw, 2.85rem);
		line-height: 1.1;
		margin-bottom: 0.45rem;
		color: #f8fafc;
		text-shadow:
			0 1px 2px rgba(0, 0, 0, 0.85),
			0 2px 16px rgba(0, 0, 0, 0.55);
	}

	.subtitle {
		color: rgba(248, 250, 252, 0.95);
		font-size: 1.05rem;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.75);
	}

	.lede {
		color: rgba(241, 245, 249, 0.92);
		max-width: 52ch;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
		margin-top: 0.65rem;
	}

	.tagline {
		margin-top: 0.75rem;
		font-weight: 700;
		color: #fff0d0;
		max-width: 52ch;
		text-shadow:
			0 1px 2px rgba(0, 0, 0, 0.8),
			0 2px 12px rgba(0, 0, 0, 0.5);
	}

	.mission-hero__cta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.65rem;
		margin-top: 1.15rem;
	}

	.mission-hero__aside {
		border-radius: var(--radius);
		border: 1px solid rgba(212, 164, 59, 0.35);
		overflow: hidden;
		background: rgba(8, 12, 18, 0.72);
		backdrop-filter: blur(12px);
		box-shadow: var(--shadow);
	}

	.mission-hero__aside-photo {
		line-height: 0;
		overflow: hidden;
	}

	.mission-hero__aside-photo img {
		width: 100%;
		object-fit: cover;
		object-position: center;
		filter: saturate(0.95) contrast(1.03);
	}

	@media (max-width: 899px) {
		.mission-hero__aside-photo img {
			height: 200px;
		}
	}

	.mission-hero__aside-body {
		padding: 1rem 1.05rem 1.15rem;
		display: grid;
		gap: 0.45rem;
	}

	.strong {
		font-weight: 700;
		margin: 0;
		font-size: 0.98rem;
		line-height: 1.45;
	}

	.tiny {
		font-size: 0.82rem;
		margin: 0;
	}
</style>
