const solution = require('./source.js');

solution({
	urls: [],
	fetcher: (url) => Promise.resolve(url),
	maximumRetryCount: 0,
}).then((data) => {
	console.log('test1', data);
});

solution({
	urls: ['https://test.com/1', 'https://test.com/2', 'https://test.com/3'],
	fetcher: (url) => Promise.resolve(url),
	maximumRetryCount: 1,
}).then((data) => {
	console.log('test2', data);
});

const fetcher = () => (url) => {
	// Иммитируем недоступность адреса
	return url.includes('2') ? Promise.reject() : Promise.resolve(url);
};

solution({
	urls: ['https://test.com/1', 'https://test.com/2', 'https://test.com/3'],
	fetcher: fetcher(),
	maximumRetryCount: 3,
}).then((data) => {
	console.log('test3', data);
});
