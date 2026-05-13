/**
 * @param {string | null | undefined} value
 */
export function normalizeAnswer(value) {
	if (!value) return '';

	return value
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '')
		.trim();
}

/**
 * @param {string} userInput
 * @param {string[]} validAnswers
 */
export function checkAnswer(userInput, validAnswers) {
	const normalizedInput = normalizeAnswer(userInput);
	if (!normalizedInput) return false;

	return validAnswers.some((answer) => normalizeAnswer(answer) === normalizedInput);
}

/**
 * @param {{
 *   evidence: Array<{ id: string; locked?: boolean }>;
 *   suspects: Array<{ id: string }>;
 *   prelude?: { puzzles?: Array<{ id: string }> };\n * }} caseFile
 */
export function createDefaultProgress(caseFile) {
	const evidence = Object.fromEntries(
		caseFile.evidence.map((item) => [
			item.id,
			{
				found: !item.locked || false, // E0-E4 unlocked by default
				analyzed: false,
				notes: ''
			}
		])
	);

	const suspects = Object.fromEntries(
		caseFile.suspects.map((item) => [
			item.id,
			{
				suspicion: 2,
				role: '',
				motive: '',
				redFlag: '',
				relief: ''
			}
		])
	);

	const puzzles = caseFile.prelude?.puzzles ?? [];
	const prelude = Object.fromEntries(
		puzzles.map((item) => [
			item.id,
			{
				solved: false,
				attempts: 0,
				lastInput: ''
			}
		])
	);

	return {
		version: 1,
		teamName: '',
		codename: '',
		missionUnlocked: false,
		investigationUnlocked: false,
		groupLoginAttempts: 0,
		finaleUnlocked: false,
		evidence,
		suspects,
		prelude,
		finalCodeAttempts: 0,
		lastUpdatedAt: new Date().toISOString()
	};
}

/**
 * @param {ReturnType<typeof createDefaultProgress>} base
 * @param {any} incoming
 */
export function mergeProgress(base, incoming) {
	const merged = {
		...base,
		evidence: { ...base.evidence },
		suspects: { ...base.suspects },
		prelude: { ...base.prelude }
	};

	if (!incoming || typeof incoming !== 'object') {
		return merged;
	}

	if (typeof incoming.missionUnlocked === 'boolean') {
		merged.missionUnlocked = incoming.missionUnlocked;
	}

	if (typeof incoming.teamName === 'string') {
		merged.teamName = incoming.teamName;
	}

	if (typeof incoming.codename === 'string') {
		merged.codename = incoming.codename;
	}

	if (typeof incoming.investigationUnlocked === 'boolean') {
		merged.investigationUnlocked = incoming.investigationUnlocked;
	}

	if (typeof incoming.groupLoginAttempts === 'number' && Number.isFinite(incoming.groupLoginAttempts)) {
		merged.groupLoginAttempts = incoming.groupLoginAttempts;
	}

	if (typeof incoming.finaleUnlocked === 'boolean') {
		merged.finaleUnlocked = incoming.finaleUnlocked;
	}

	if (typeof incoming.finalCodeAttempts === 'number' && Number.isFinite(incoming.finalCodeAttempts)) {
		merged.finalCodeAttempts = incoming.finalCodeAttempts;
	}

	if (incoming.evidence && typeof incoming.evidence === 'object') {
		for (const [id, state] of Object.entries(incoming.evidence)) {
			if (!merged.evidence[id] || typeof state !== 'object' || !state) continue;
			merged.evidence[id] = {
				...merged.evidence[id],
				found: Boolean(state.found),
				analyzed: Boolean(state.analyzed),
				notes: typeof state.notes === 'string' ? state.notes : merged.evidence[id].notes
			};
		}
	}

	if (incoming.suspects && typeof incoming.suspects === 'object') {
		for (const [id, state] of Object.entries(incoming.suspects)) {
			if (!merged.suspects[id] || typeof state !== 'object' || !state) continue;
			const suspicion = Number(state.suspicion);
			merged.suspects[id] = {
				...merged.suspects[id],
				suspicion:
					Number.isFinite(suspicion) && suspicion >= 1 && suspicion <= 5
						? Math.round(suspicion)
						: merged.suspects[id].suspicion,
				role: typeof state.role === 'string' ? state.role : merged.suspects[id].role,
				motive: typeof state.motive === 'string' ? state.motive : merged.suspects[id].motive,
				redFlag: typeof state.redFlag === 'string' ? state.redFlag : merged.suspects[id].redFlag,
				relief: typeof state.relief === 'string' ? state.relief : merged.suspects[id].relief
			};
		}
	}

	if (incoming.prelude && typeof incoming.prelude === 'object') {
		for (const [id, state] of Object.entries(incoming.prelude)) {
			if (!merged.prelude[id] || typeof state !== 'object' || !state) continue;
			merged.prelude[id] = {
				...merged.prelude[id],
				solved: Boolean(state.solved),
				attempts: Number.isFinite(Number(state.attempts)) ? Number(state.attempts) : 0,
				lastInput: typeof state.lastInput === 'string' ? state.lastInput : ''
			};
		}
	}

	if (typeof incoming.lastUpdatedAt === 'string') {
		merged.lastUpdatedAt = incoming.lastUpdatedAt;
	}

	return merged;
}

/**
 * @param {ReturnType<typeof createDefaultProgress>} progress
 * @param {{ requiredEvidence?: string[] }} event
 */
export function isTimelineEventUnlocked(progress, event) {
	const requiredEvidence = event.requiredEvidence ?? [];
	if (!requiredEvidence.length) return true;

	return requiredEvidence.every((evidenceId) => progress.evidence[evidenceId]?.analyzed === true);
}

/**
 * @param {ReturnType<typeof createDefaultProgress>} progress
 */
export function getSolvedPreludeCount(progress) {
	return Object.values(progress.prelude).filter((item) => item.solved).length;
}

/**
 * @param {ReturnType<typeof createDefaultProgress>} progress
 */
export function getEvidenceStats(progress) {
	const entries = Object.values(progress.evidence);
	return {
		found: entries.filter((item) => item.found).length,
		analyzed: entries.filter((item) => item.analyzed).length,
		total: entries.length
	};
}
