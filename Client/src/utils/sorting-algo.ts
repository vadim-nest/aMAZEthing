export function bubbleSortAlgo(arr: number[]) {
  const ArrayStates: number[][] = [];
  ArrayStates.push([...arr]);
  const visitedIndex: {
    msg?: string;
    i?: number;
    el?: number;
  }[] = []; //We can perhaps use this visited index to animate it more extensively (displaying an arrow on which el of the array we are on)
  let hasChanged = true;
  while (hasChanged) {
    hasChanged = false;
    for (let i = 0; i <= arr.length - 2; i++) {
      visitedIndex.push({ i, el: arr[i] });
      if (arr[i] > arr[i + 1]) {
        visitedIndex.push({
          i,
          msg: `swapped from ${arr[i]} to ${arr[i + 1]}`,
        });
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        ArrayStates.push([...arr]);
        hasChanged = true;
      }
    }
  }
  return ArrayStates;
}

export function insertionSort(arr: number[]) {
  const ArrayStates: number[][] = [];
  ArrayStates.push([...arr]);
  const visitedIndex: {
    j?: number;
    i?: number;
    msg?: string;
    el?: number;
  }[] = [];

  for (let i = 1; i < arr.length; i++) {
    visitedIndex.push({ i, msg: 'outside', el: arr[i] });
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        visitedIndex.push({ j: j - 1 }); // it feels kinda weird repeating the same index if the condition is met, so I just put j index as minus 1 to actually record where the element as been swapped to
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
        ArrayStates.push([...arr]);
      } else break;
    }
  }

  return { ArrayStates, visitedIndex };
}

export function selectionSort(arr: number[]) {
  const ArrayStates: number[][] = [];
  ArrayStates.push([...arr]);

  const visitedIndex: {
    msg?: string | undefined;
    i?: number;
    el?: number;
    j?: number;
  }[] = [];

  for (let i = 0; i < arr.length; i++) {
    visitedIndex.push({ i, el: arr[i] });
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      visitedIndex.push({ j, el: arr[j] });
      min = arr[j] < arr[min] ? j : min;
    }
    if (min !== i) {
      [arr[i], arr[min]] = [arr[min], arr[i]];
      visitedIndex.push({
        msg: `swapped element ${arr[min]} with element ${arr[i]}`,
      });
      ArrayStates.push([...arr]);
    } else {
      visitedIndex.push({ msg: 'found no things to swap this iteration' });
    }
  }

  return { ArrayStates, visitedIndex };
}

