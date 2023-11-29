/* eslint-disable no-shadow */
const fs = require("node:fs");
// Monad

const fp = {};

fp.path = (data) => (path) =>
  fp.maybe(path)((path) =>
    path.split(".").reduce((prev, key) => prev[key] || {}, data || {}),
  );

fp.maybe = (x) => (fn) => fp.maybe(x && fn ? fn(x) : null);

// Usage

const config = {
  server: {
    host: {
      ip: "",
      port: 3000,
    },
    ssl: {
      key: {
        filename: "./7path.js",
        // filename: './7ath.js',
      },
    },
  },
};

// Imperative style
if (
  config &&
  config.server &&
  config.server.ssl &&
  config.server.ssl.key &&
  config.server.ssl.key.filename
) {
  const fileName = config.server.ssl.key.filename;
  // fs.readFile(fileName, 'utf-8', (err, data) => {
  // 	if (data) console.log(`Imperative: \n${data}`)
  // 	if (err) console.log(`Imperative error: \n${err}`)
  // })
}

// Functional
fp.path(config)("server.ssl.key.filename")((file) =>
  fs.readFile(file, "utf8", (err, data) => {
    fp.maybe(data)((data) => `Functional: \n${data}`)(console.log);
    fp.maybe(err)((err) => `Functional error: \n${err}`)(console.log);
  }),
);
