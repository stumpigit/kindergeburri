import { writable } from 'svelte/store';
import { caseFile } from '$lib/data/casefile';
import {
	checkAnswer,
	createDefaultProgress,
	mergeProgress
} from './progress';
import { clearStoredProgress, loadStoredProgress, saveStoredProgress } from './storage';

/** @typedef {ReturnType<typeof createDefaultProgress>} Progress */

export const progress = writable(createDefaultProgress(caseFile));

/** Hydrate from localStorage after mount (client-only). */
export function hydrateProgressFromStorage() {
	const stored = loadStoredProgress();
	if (stored) {
		progress.set(mergeProgress(createDefaultProgress(caseFile), stored));
	}
}

/** @param {(p: Progress) => Progress} updater */
function persist(updater) {
	progress.update((p) => {
		const next = updater(p);
		const withTime = { ...next, lastUpdatedAt: new Date().toISOString() };
		saveStoredProgress(withTime);
		return withTime;
	});
}

export function resetAllProgress() {
	clearStoredProgress();
	const fresh = createDefaultProgress(caseFile);
	saveStoredProgress(fresh);
	progress.set(fresh);
}

/**
 * @param {string} teamName
 * @param {string} codename
 */
export function saveTeamIdentity(teamName, codename) {
	persist((p) => ({
		...p,
		teamName: teamName.trim(),
		codename: codename.trim()
	}));
}

/**
 * @param {string} puzzleId
 * @param {string} value
 * @returns {{ ok: boolean; feedback: string; missionJustUnlocked: boolean }}
 */
export function submitPuzzleAttempt(puzzleId, value) {
	const puzzle = caseFile.prelude.puzzles.find((item) => item.id === puzzleId);
	if (!puzzle) return { ok: false, feedback: 'Unbekanntes Rätsel.', missionJustUnlocked: false };

	const isCorrect = checkAnswer(value, puzzle.answers);
	let missionJustUnlocked = false;

	persist((p) => {
		const current = p.prelude[puzzleId];
		let missionUnlocked = p.missionUnlocked;
		const prelude = {
			...p.prelude,
			[puzzleId]: {
				...current,
				solved: isCorrect ? true : current.solved,
				attempts: current.attempts + 1,
				lastInput: value
			}
		};
		const solvedCount = Object.values(prelude).filter((item) => item.solved).length;
		if (!missionUnlocked && solvedCount >= caseFile.codes.missionUnlock.requiredSolvedPuzzles) {
			missionUnlocked = true;
			missionJustUnlocked = true;
		}
		return { ...p, prelude, missionUnlocked };
	});

	const feedback = isCorrect
		? 'Code korrekt.'
		: 'Noch nicht korrekt – prüfe den Hinweis und versuche es erneut.';

	return { ok: isCorrect, feedback, missionJustUnlocked };
}

/** @param {string} evidenceId */
export function toggleEvidenceFound(evidenceId) {
	persist((p) => {
		const current = p.evidence[evidenceId];
		if (!current) return p;
		const nextFound = !current.found;
		return {
			...p,
			evidence: {
				...p.evidence,
				[evidenceId]: {
					...current,
					found: nextFound,
					analyzed: nextFound ? current.analyzed : false
				}
			}
		};
	});
}

/** @param {string} evidenceId */
export function toggleEvidenceAnalyzed(evidenceId) {
	persist((p) => {
		const current = p.evidence[evidenceId];
		if (!current || !current.found) return p;
		return {
			...p,
			evidence: {
				...p.evidence,
				[evidenceId]: {
					...current,
					analyzed: !current.analyzed
				}
			}
		};
	});
}

/**
 * @param {string} evidenceId
 * @param {string} notes
 */
export function updateEvidenceNotes(evidenceId, notes) {
	progress.update((p) => {
		const current = p.evidence[evidenceId];
		if (!current) return p;
		const next = {
			...p,
			evidence: {
				...p.evidence,
				[evidenceId]: {
					...current,
					notes
				}
			},
			lastUpdatedAt: new Date().toISOString()
		};
		saveStoredProgress(next);
		return next;
	});
}

/**
 * @param {string} suspectId
 * @param {number} suspicion
 */
export function setSuspicion(suspectId, suspicion) {
	persist((p) => {
		const current = p.suspects[suspectId];
		if (!current) return p;
		return {
			...p,
			suspects: {
				...p.suspects,
				[suspectId]: {
					...current,
					suspicion
				}
			}
		};
	});
}

/**
 * @param {string} suspectId
 * @param {string} notes
 */
export function updateSuspectNotes(suspectId, notes) {
	progress.update((p) => {
		const current = p.suspects[suspectId];
		if (!current) return p;
		const next = {
			...p,
			suspects: {
				...p.suspects,
				[suspectId]: {
					...current,
					notes
				}
			},
			lastUpdatedAt: new Date().toISOString()
		};
		saveStoredProgress(next);
		return next;
	});
}

/** @param {string} code */
export function unlockInvestigation(code) {
	let valid = false;
	persist((p) => {
		valid = checkAnswer(code, caseFile.codes.groupLogin.accepted);
		return {
			...p,
			groupLoginAttempts: p.groupLoginAttempts + 1,
			investigationUnlocked: valid ? true : p.investigationUnlocked
		};
	});
	return valid;
}

/**
 * @param {string} code
 * @returns {string|null} 'e5', 'e6', or null
 */
export function tryFinaleCode(code) {
	const normalized = checkAnswer.bind(null, code);
	
	// Try E5 unlock
	if (caseFile.codes.e5Unlock.accepted.some(a => checkAnswer(code, [a]))) {
		persist((p) => ({
			...p,
			evidence: {
				...p.evidence,
				e5: { ...p.evidence.e5, found: true, analyzed: true }
			}
		}));
		return 'e5';
	}
	
	// Try Finale unlock
	if (caseFile.codes.finaleUnlock.accepted.some(a => checkAnswer(code, [a]))) {
		persist((p) => ({
			...p,
			evidence: {
				...p.evidence,
				e6: { ...p.evidence.e6, found: true, analyzed: true }
			},
			finaleUnlocked: true
		}));
		return 'e6';
	}
	
	return null;
}

export function unlockFinale(code) {
	const result = tryFinaleCode(code);
	return result !== null;
}
