export function bubbleSortAlgo(arr: number[]) {
  const ArrayStates: number[][] = [];
  let animations:number[][] = []
  let hasChanged = true;
  while (hasChanged) {
    hasChanged = false;
    for (let i = 0; i <= arr.length - 2; i++) {
      if (arr[i] > arr[i + 1]) {
        animations.push([i, arr[i], i+1, arr[i+1]]);
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        ArrayStates.push([...arr]);
        hasChanged = true;
      }
    }
  }
  return {ArrayStates, animations};
}

export function insertionSortAlgo(arr: number[]) {
  const ArrayStates: number[][] = [];
  ArrayStates.push([...arr]);
  let animations:number[][] = []
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        animations.push([j, arr[j], j-1, arr[j-1]]); 
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
  let animations:number[][] = []

  for (let i = 0; i < arr.length; i++) {
    // animations.push({ i, el: arr[i] });
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      // animations.push({ j, el: arr[j] });
      min = arr[j] < arr[min] ? j : min;
    }
    if (min !== i) {
      animations.push([min, arr[min], i, arr[i]]);
      [arr[i], arr[min]] = [arr[min], arr[i]];
      ArrayStates.push([...arr]);
    } else {
      // animations.push({ msg: 'found no things to swap this iteration' });
    }
  }

  return { ArrayStates, animations };
}

console.log(bubbleSortAlgo([5, 1, 4, 2, 8]))

