const cancelable = (executor) => {
	let canceled = false;

	const promise = new Promise((resolve, reject) => {
		executor((value) => {
			if (canceled) {
				reject(new Error('Canceled'));
				return;
			}
			resolve(value);
		}, reject);
	});

	promise.cancel = () => {
		canceled = true;
	};

	return promise;
};

// Usage

{
	const promise = cancelable((resolve) => {
		setTimeout(() => {
			resolve('first');
		}, 10);
	});

	promise.then(console.log).catch(console.log);
	console.dir({ promise });
}

{
	const promise = cancelable((resolve) => {
		setTimeout(() => {
			resolve('second');
		}, 10);
	});

	promise.cancel();
	promise.then(console.log).catch(console.log);
	console.dir({ promise });
}
