/**
 * @param {{
 *  urls: [string],
 *  fetcher: (url: string) => Promise,
 *  maximumRetryCount: number
 * }}
 * @returns {Promise<[string]>}
 */

module.exports = function solution({ urls, fetcher, maximumRetryCount }) {
	return new Promise((resolve) => {
		const results = [];

		function makeRequest(index) {
			if (index >= urls.length) {
				resolve(results);
				return;
			}

			const url = urls[index];

			fetcher(url)
				.then(() => {
					results.push(url);
					makeRequest(index + 1);
				})
				.catch(() => {
					if (maximumRetryCount > 0) {
						maximumRetryCount--;
						makeRequest(index);
					} else {
						makeRequest(index + 1);
					}
				});
		}

		makeRequest(0);
	});
};
