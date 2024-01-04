'use strict';

const http = require('node:http');

const routes = {
	'/': (request, callback) => {
		callback({
			apiVersion: '1.0',
			resources: ['person', 'city'],
		});
	},

	'/person': (request, callback) => {
		callback({
			name: 'Dmitriy',
			age: '24',
		});
	},

	'/city': (request, callback) => {
		callback({
			name: 'Omsk',
			country: 'Russia',
		});
	},
};

const server = http.createServer((req, res) => {
	const handler = routes[req.url];

	if (!handler) {
		res.writeHead(404);
		res.end('Not Found');
		return;
	}

	handler(req, (result) => {
		const json = JSON.stringify(result);
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(json);
	});
});

server.listen(3000);
