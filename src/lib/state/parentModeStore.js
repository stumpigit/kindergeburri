import { writable } from 'svelte/store';

/** Spielleitung / Eltern: zeigt GM-Hinweise und Quellenlabels */
export const parentMode = writable(false);

/** @param {unknown} value */
export function setParentMode(value) {
	parentMode.set(Boolean(value));
}
