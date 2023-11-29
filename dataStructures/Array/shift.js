function shift(arr) {
  const res = arr[0];
  for (let i = 0; i < arr.length; i++) arr[i] = arr[i + 1];

  arr.length = arr.length - 1;
  return res;
}

const myFish = ["ангел", "клоун", "мандарин", "хирург"];

const shifted = shift(myFish);
console.log(myFish, shifted);
