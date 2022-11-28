export function bubbleSortAlgo(arr: any) {
  const ArrayStates: number[][] = [];
  let animations: number[][] = [];
  let swaps = false;
  let iterations = 0;
  while (swaps === false) {
    swaps = true;
    for (let i = 0; i < arr.length - 1 - iterations; i++) {
      animations.push([i, arr[i]]);
      if (arr[i] > arr[i + 1]) {
        animations.push([i, arr[i], i + 1, arr[i + 1]]);
        swaps = false;
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
      }
    }
    iterations++;
  }
  return { ArrayStates, animations };
}

export function generateArray() {
  const array = []
  for(let i = 0; i< 5; i++) {
    array.push(randomNumGen(3, 20))
  }
  return array;
}

function randomNumGen(min:number, max:number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function insertionSortAlgo(arr: number[]) {
  const ArrayStates: number[][] = [];
  ArrayStates.push([...arr]);
  let animations: number[][] = [];
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      animations.push([j, arr[j]]);
      if (arr[j] < arr[j - 1]) {
        animations.push([j, arr[j], j - 1, arr[j - 1]]);
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
        ArrayStates.push([...arr]);
      } else break;
    }
  }
  return { ArrayStates, animations };
}

export function selectionSortAlgo(arr: number[]) {
  const ArrayStates: number[][] = [];
  ArrayStates.push([...arr]);
  let animations: number[][] = [];

  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      min = arr[j] < arr[min] ? j : min;
      animations.push([i, j])
    }
    if (min !== i) {
      animations.push([min, arr[min], i, arr[i]]);
      [arr[i], arr[min]] = [arr[min], arr[i]];
      ArrayStates.push([...arr]);
    }
  }

  return { ArrayStates, animations };
}

console.log(bubbleSortAlgo([5, 1, 4, 2, 8]));
