const setSize = 10;
const set = [];
for (let i = 0; i < setSize; i += 1) {
	set[i] = [];
}

function hash(x) {
	if (typeof x !== 'number') {
		throw new Error('only numbers in numbersSet');
	}
	return x % setSize;
}

function add(val) {
	if (typeof val !== 'number') {
		throw new Error('only numbers in numbersSet');
	}
	const h = hash(val);
	if (set[h].find(val) === undefined) {
		set[h].push(val);
	}
}

function has(val) {
	if (typeof val !== 'number') {
		throw new Error('only numbers in numbersSet');
	}
	for (const cur in set[hash(val)]) {
		if (cur === val) {
			return true;
		}
	}

	return false;
}

function del(val) {
	if (typeof val !== 'number') {
		throw new Error('only numbers in numbersSet');
	}
	const valList = set[hash];
	for (let i = 0; i <= valList; i += 1) {
		if (valList[i] === val) {
			valList[i] = valList[valList.length - 1];
			valList.pop();
			return;
		}
	}
}
