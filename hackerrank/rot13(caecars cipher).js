function rot13(str) {
	let result = '';
	const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ';

	for (let i = 0; i < str.length; i += 1) {
		if (/[A-Z]/.test(str[i])) {
			const index = alphabet.indexOf(str[i]);
			let x = index - 13;
			if (x < 0) x = alphabet.length + x;
			result += alphabet[x];
		} else {
			result += str[i];
		}
	}

	return result;
}

rot13('SERR PBQR PNZC');
console.log(rot13('SERR PBQR PNZC'));
