function pop(arr) {
  const res = arr[arr.length - 1]
  arr.length = arr.length - 1
  return res
}

const myFish = ['ангел', 'клоун', 'мандарин', 'хирург']

const popped = pop(myFish)

console.log(myFish) // ['ангел', 'клоун', 'мандарин']

console.log(popped) // 'хирург'
