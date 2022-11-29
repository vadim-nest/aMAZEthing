
export function bubbleSortAlgo(arr: any, ASC_MODE:boolean) {
  const ArrayStates: number[][] = [];
  let animations: number[][] = [];
  let swaps = false;
  let iterations = 0;
  while (swaps === false) {
    swaps = true;
    for (let i = 0; i < arr.length - 1 - iterations; i++) {
      animations.push([i, arr[i]]);
      if(ASC_MODE === false) {
        if (arr[i] > arr[i + 1]) {
          animations.push([i, arr[i], i + 1, arr[i + 1]]);
          swaps = false;
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        }
    } else {
      if (arr[i] < arr[i + 1]) {
        animations.push([i, arr[i], i + 1, arr[i + 1]]);
        swaps = false;
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
      }
    }
  }
    iterations++;
  }
  return animations;
}

export function generateArray(NUM:number, MIN:number, MAX:number) {
  const array = []
  for(let i = 0; i< NUM; i++) {
    array.push(randomNumGen(MIN, MAX))
  }
  return array;
}

function randomNumGen(min:number, max:number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function insertionSortAlgo(arr: number[], ASC_MODE:boolean) {
  const ArrayStates: number[][] = [];
  ArrayStates.push([...arr]);
  let animations: number[][] = [];
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      animations.push([j, arr[j]]);
      if(ASC_MODE) {
        if (arr[j] < arr[j - 1]) {
          animations.push([j, arr[j], j - 1, arr[j - 1]]);
          [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
          ArrayStates.push([...arr]);
        } else break;
      } else  {
        if (arr[j] > arr[j - 1]) {
          animations.push([j, arr[j], j - 1, arr[j - 1]]);
          [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
          ArrayStates.push([...arr]);
        } else break;
      }
    
    }
  }
  return  animations;
}

export function selectionSortAlgo(arr: number[], ASC_MODE:boolean) {
  const ArrayStates: number[][] = [];
  ArrayStates.push([...arr]);
  let animations: number[][] = [];

  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if(ASC_MODE) {
        min = arr[j] < arr[min] ? j : min;

      } else {
        min = arr[j] > arr[min] ? j : min;

      }
      animations.push([i, j])
    }
    if (min !== i) {
      animations.push([min, arr[min], i, arr[i]]);
      [arr[i], arr[min]] = [arr[min], arr[i]];
      ArrayStates.push([...arr]);
    }
  }

  return animations;
}

export function mergeSortAlgo(arr:number[]) {
  const aux = arr.slice();
  const animations:any = [];
  mergeSortHelper(arr, aux, 0, arr.length - 1, animations);
  return animations;
}

function mergeSortHelper(arr:any, aux:any, left:any, right:any, animations:any) {
  if (right <= left) return;
  const mid = left + Math.floor((right - left) / 2);
  mergeSortHelper(arr, aux, left, mid, animations);
  mergeSortHelper(arr, aux, mid + 1, right, animations);
  mergeNow(arr, aux,mid, left, right, animations)
}
 
function mergeNow(arr:any, aux:any, mid:any, left:any, right:any, animations:any) {
  for (let i = left; i <= right; i++) aux[i] = arr[i];
  let i = left;
  let j = mid + 1;
  let k = left
  while (i <= mid && j <= right) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (aux[i] <= aux[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, aux[i]]);
      arr[k++] = aux[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, aux[j]]);
      arr[k++] = aux[j++];
    }
  }
  while (i <= mid) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, aux[i]]);
    arr[k++] = aux[i++];
  }
  while (j <= right) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, aux[j]]);
    arr[k++] = aux[j++];
  }
}

// console.log(mergeSortAlgo([5,2,1 ,3,6, 4]))
console.log(mergeSortAlgo([5,2,1]))

