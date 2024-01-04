module.exports = function (originalFunction, timeInterval, maxRequests) {
	const requests = {};
	const bannedIps = {};

	return function (ip, timestamp, ...args) {
		if (bannedIps[ip]) {
			// console.log(`IP ${ip} заблокирован`)
			return;
		}

		if (requests[ip])
			requests[ip] = requests[ip].filter(
				(el) => timestamp - timeInterval <= el,
			);

		if (requests[ip]?.length >= maxRequests) {
			bannedIps[ip] = 1;
			// console.log(` слишком много запросов => IP ${ip} заблокирован`)
			return;
		}

		if (requests[ip]) requests[ip].push(timestamp);
		else requests[ip] = [timestamp];

		originalFunction(...args);
	};
};
