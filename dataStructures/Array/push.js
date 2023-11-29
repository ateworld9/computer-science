function push(arr, val) {
  const len = arr.length;
  arr[len] = val;
  return len + 1;
}

const sports = ["футбол", "бейсбол"];
const total = push(sports, "американский футбол");

console.log(sports, total); // ['футбол', 'бейсбол', 'американский футбол']
