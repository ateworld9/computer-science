/* eslint-disable no-param-reassign */
function swap(arr, a, b) {
  const toSwap = arr[a];
  arr[a] = arr[b];
  arr[b] = toSwap;
}

function createHeap() {
  return [];
}

function pushHeap(heapArr, value) {
  heapArr.push(value);
  let position = heapArr.length - 1;

  while (
    position > 0 &&
    heapArr[position] < heapArr[Math.floor((position - 1) / 2)]
  ) {
    swap(heapArr, position, Math.floor((position - 1) / 2));
    position = Math.floor((position - 1) / 2);
  }
}

function popHeap(heapArr) {
  const ans = heapArr[0];
  heapArr[0] = heapArr[heapArr.length - 1];
  let pos = 0;
  while (pos * 2 + 1 < heapArr.length - 1) {
    let minSonIndex = pos * 2 + 1;
    if (heapArr[pos * 2 + 2] < heapArr[minSonIndex]) {
      minSonIndex = pos * 2 + 2;
    }
    if (heapArr[pos] > heapArr[minSonIndex]) {
      swap(heapArr, pos, minSonIndex);
      pos = minSonIndex;
    } else {
      break;
    }
  }
  heapArr.pop();

  return ans;
}

class BinaryHeap {
  constructor() {
    this.arr = [];

    // parent = Math.floor((i - 1) / 2)
    // left child = (2 * i) + 1
    // right child = (2 * i) + 2
  }

  push(value) {
    this.arr.push(value);
    let position = this.arr.length - 1;
    while (
      position > 0 &&
      this.arr[position] < this.arr[Math.floor((position - 1) / 2)]
    ) {
      swap(this.arr, position, Math.floor((position - 1) / 2));
      position = Math.floor((position - 1) / 2);
    }
  }

  pop() {
    const ans = this.arr[0];
    this.arr[0] = this.arr[this.arr.length - 1];
    let pos = 0;
    while (pos * 2 + 1 < this.arr.length - 1) {
      let minSonIndex = pos * 2 + 1;
      if (this.arr[pos * 2 + 2] < this.arr[minSonIndex]) {
        minSonIndex = pos * 2 + 2;
      }
      if (this.arr[pos] > this.arr[minSonIndex]) {
        swap(this.arr, pos, minSonIndex);
        pos = minSonIndex;
      } else {
        break;
      }
    }
    this.arr.pop();

    return ans;
  }
}

const heap = new BinaryHeap();
heap.push(2);
heap.push(5);
heap.push(4);
heap.push(11);
heap.push(6);
heap.push(8);
heap.push(25);
heap.push(12);
heap.push(20);

heap.change(heap.arr[heap.arr.length - 1], 7);

console.log(heap.arr);
