const STORAGE_KEY = 'akte-17-progress-v1';

/**
 * @returns {any | null}
 */
export function loadStoredProgress() {
	if (typeof window === 'undefined') return null;

	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		return JSON.parse(raw);
	} catch {
		return null;
	}
}

/**
 * @param {any} progress
 */
export function saveStoredProgress(progress) {
	if (typeof window === 'undefined') return;

	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
	} catch {
		// intentionally ignored in readonly/private browser contexts
	}
}

export function clearStoredProgress() {
	if (typeof window === 'undefined') return;
	window.localStorage.removeItem(STORAGE_KEY);
}
