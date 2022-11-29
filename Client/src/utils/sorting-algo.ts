
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

export function generateArray(NUM:number) {
  const array = []
  for(let i = 0; i< NUM; i++) {
    array.push(randomNumGen(3, 20))
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
  const copy = [...arr];
  const len = copy.length;
  const aux = Array(len);
  const animations:any = [];
  mergeSortHelper(copy, aux, 0, len - 1, animations);
  return {animations, aux};
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
  for (let k = left; k <= right; k++) {
    if (i > mid) {
      animations.push([j]);
      animations.push([k, aux[j]]);
      arr[k] = aux[j++];
    } else if (j > right) {
      animations.push([i]);
      animations.push([k, aux[i]]);
      arr[k] = aux[i++];
    } else if (aux[j] < aux[i]) {
      animations.push([i, j]);
      animations.push([k, aux[j]]);
      arr[k] = aux[j++];
    } else {
      animations.push([i, j]);
      animations.push([k, aux[i]]);
      arr[k] = aux[i++];
    }
  }


}

// console.log(mergeSortAlgo([5,2,1 ,3,6, 4]))
console.log(mergeSortAlgo([5,2,1 ,3,6, 4]))

