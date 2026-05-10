/** @param {number} value */
export function suspicionLabel(value) {
	switch (value) {
		case 1:
			return 'fast entlastet';
		case 2:
			return 'geringer Verdacht';
		case 3:
			return 'offen';
		case 4:
			return 'auffällig';
		case 5:
			return 'stark verdächtig';
		default:
			return 'offen';
	}
}
