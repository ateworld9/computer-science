function get(obj, path) {
	let keys;
	if (typeof path === 'string') {
		keys = path.split('.');
	} else {
		keys = path;
	}

	const key = keys[0];
	if (keys.length === 1) {
		return obj[key];
	}

	keys.shift();
	return get(obj[key], keys);
}
const obj = {
	a: { b: { c: 'd' }, e: 'f' },
};

console.log(get(obj, 'a.b.c'));
