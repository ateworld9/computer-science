// eslint-disable-next-line no-undef
const { operators, fromEvent } = rxjs;
const { map, filter, take, reduce, debounceTime, throttleTime } = operators;

// Prepare output

const table = document.getElementById('table');
const tr = document.createElement('tr');
tr.innerHTML = '<th>Stream</th><th>Data</th>';
table.appendChild(tr);

const print = (stream, data) => {
  const tr = document.createElement('tr');
  const json = JSON.stringify(data);
  tr.innerHTML = `<td>${stream}</td><td>${json}</td>`;
  table.appendChild(tr);
};

// Keyboard stream

const keyboard = fromEvent(document, 'keydown');

keyboard.subscribe((data) => {
  const { key, keyCode, altKey, metaKey, shiftKey, ctrlKey } = data;
  print('keyboard', { key, keyCode, altKey, metaKey, shiftKey, ctrlKey });
});

// Cursors

const arrows = {
  37: '🡄',
  38: '🡅',
  39: '🡆',
  40: '🡇',
};

const arrowCodes = Object.keys(arrows).map((key) => parseInt(key));

const cursors = keyboard.pipe(
  filter((event) => arrowCodes.includes(event.keyCode)),
  map((event) => event.keyCode),
  map((key) => arrows[key]),
  //throttleTime(1000),
  debounceTime(2000),
);

cursors.subscribe((cursor) => {
  print('cursor', cursor);
});

// Keypress

const keypress = keyboard.pipe(
  map((event) => event.key),
  filter((key) => key.length === 1),
);

keypress.subscribe((key) => {
  print('keypress', key);
});

// Take first 5 chars

const take5 = keypress.pipe(
  take(5),
  reduce((acc, char) => acc + char),
);

take5.subscribe((s) => {
  print('take5', s);
});
