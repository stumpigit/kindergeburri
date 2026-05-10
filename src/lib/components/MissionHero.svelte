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
				<span class="badge muted">Aktenzeichen {caseFile.id}</span>
				<span class="badge accent">{caseFile.setting.location}</span>
			</div>
			<h1 id="mission-title">{caseFile.title}</h1>
			<p class="subtitle">{caseFile.subtitle}</p>
			<p class="lede">{caseFile.invitation.message}</p>
			<p class="tagline">{caseFile.invitation.tagline}</p>
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
				<p class="strong">Ein Link. Drei Codes. Dann die volle Einsatzakte am Geburtstag.</p>
				<p class="tiny muted">Ohne Vorab-Spoiler – Schritt für Schritt freischalten.</p>
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
		box-shadow: 0 24px 48px rgba(0, 0, 0, 0.35);
	}

	.mission-hero__backdrop {
		position: absolute;
		inset: 0;
	}

	.mission-hero__photo {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 55% 35%;
		transform: scale(1.02);
	}

	.mission-hero__veil {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(to top, rgba(5, 7, 10, 0.94) 0%, rgba(5, 7, 10, 0.45) 42%, transparent 78%),
			linear-gradient(to right, rgba(5, 7, 10, 0.82) 0%, rgba(5, 7, 10, 0.25) 48%, transparent 72%);
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
		align-items: end;
		min-height: min(58vh, 540px);
		box-sizing: border-box;
	}

	@media (min-width: 900px) {
		.mission-hero__grid {
			grid-template-columns: 1fr minmax(260px, 340px);
			align-content: end;
		}
	}

	.mission-hero__badges {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		margin-bottom: 0.75rem;
	}

	.mission-hero h1 {
		font-size: clamp(1.85rem, 4.2vw, 2.85rem);
		line-height: 1.1;
		margin-bottom: 0.45rem;
		text-shadow: 0 2px 24px rgba(0, 0, 0, 0.45);
	}

	.subtitle {
		color: rgba(238, 242, 247, 0.88);
		font-size: 1.05rem;
		text-shadow: 0 1px 12px rgba(0, 0, 0, 0.5);
	}

	.lede {
		color: rgba(238, 242, 247, 0.82);
		max-width: 52ch;
		text-shadow: 0 1px 10px rgba(0, 0, 0, 0.45);
		margin-top: 0.65rem;
	}

	.tagline {
		margin-top: 0.75rem;
		font-weight: 700;
		color: #ffe8bc;
		max-width: 52ch;
		text-shadow: 0 2px 16px rgba(0, 0, 0, 0.55);
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
		max-height: 200px;
		overflow: hidden;
	}

	.mission-hero__aside-photo img {
		width: 100%;
		height: 200px;
		object-fit: cover;
		object-position: center;
		filter: saturate(0.95) contrast(1.03);
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
