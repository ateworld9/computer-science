'use strict';

fetch('http://google.com')
	.then((data) => {
		console.log(data.statusText);
	})
	.catch((err) => {
		console.error(err);
	});
