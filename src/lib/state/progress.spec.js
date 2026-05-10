import { describe, it, expect } from 'vitest';
import {
	checkAnswer,
	createDefaultProgress,
	normalizeAnswer,
	isTimelineEventUnlocked,
	mergeProgress
} from './progress';

const mockCase = {
	evidence: [{ id: 'e1' }, { id: 'e2' }],
	suspects: [{ id: 's1' }],
	prelude: {
		puzzles: [{ id: 'p1' }, { id: 'p2' }]
	}
};

describe('normalizeAnswer', () => {
	it('normalisiert Eingaben robust', () => {
		expect(normalizeAnswer(' Äkté-17! ')).toBe('akte17');
		expect(normalizeAnswer('')).toBe('');
	});
});

describe('checkAnswer', () => {
	it('akzeptiert alternative Schreibweisen', () => {
		expect(checkAnswer('Post', ['POST', 'Post'])).toBe(true);
		expect(checkAnswer('Po st', ['Post'])).toBe(true);
		expect(checkAnswer('Archiv', ['Post'])).toBe(false);
	});
});

describe('createDefaultProgress', () => {
	it('erstellt progress maps für beweise, verdächtige und prelude', () => {
		const progress = createDefaultProgress(mockCase);
		expect(Object.keys(progress.evidence)).toEqual(['e1', 'e2']);
		expect(Object.keys(progress.suspects)).toEqual(['s1']);
		expect(Object.keys(progress.prelude)).toEqual(['p1', 'p2']);
		expect(progress.evidence.e1.found).toBe(false);
		expect(progress.suspects.s1.suspicion).toBe(2);
	});
});

describe('isTimelineEventUnlocked', () => {
	it('gibt true nur bei analysierten requiredEvidence zurück', () => {
		const progress = createDefaultProgress(mockCase);
		expect(isTimelineEventUnlocked(progress, { requiredEvidence: ['e1'] })).toBe(false);
		progress.evidence.e1.analyzed = true;
		expect(isTimelineEventUnlocked(progress, { requiredEvidence: ['e1'] })).toBe(true);
		expect(isTimelineEventUnlocked(progress, { requiredEvidence: ['e1', 'e2'] })).toBe(false);
	});
});

describe('mergeProgress', () => {
	it('übernimmt bekannte ids und ignoriert unbekannte', () => {
		const base = createDefaultProgress(mockCase);
		const merged = mergeProgress(base, {
			investigationUnlocked: true,
			groupLoginAttempts: 2,
			evidence: {
				e1: { found: true, analyzed: true, notes: 'gefunden' },
				e999: { found: true }
			},
			suspects: {
				s1: { suspicion: 4, notes: 'wirkt nervös' },
				s2: { suspicion: 5 }
			}
		});

		expect(merged.investigationUnlocked).toBe(true);
		expect(merged.groupLoginAttempts).toBe(2);
		expect(merged.evidence.e1.found).toBe(true);
		expect(merged.evidence.e2.found).toBe(false);
		expect(merged.suspects.s1.suspicion).toBe(4);
		expect(merged.suspects.s2).toBeUndefined();
	});
});
