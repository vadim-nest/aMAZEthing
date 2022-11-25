export function bubbleSort(arr) {
    const ArrayStates = []
    ArrayStates.push([...arr])
    const visitedIndex = [] //We can perhaps use this visited index to animate it more extensively (displaying an arrow on which el of the array we are on)
    let hasChanged = true;
  while (hasChanged) {
    hasChanged = false;
    for (let i = 0; i <= arr.length - 2; i++) {
      visitedIndex.push({i, el: arr[i]})
      if (arr[i] > arr[i + 1]) {
        visitedIndex.push({i: i+1, msg:`swapped ${arr[i]}`});
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        ArrayStates.push([...arr]);
        hasChanged = true;
      }
    }
  }
  return {ArrayStates, visitedIndex};
}

export function insertionSort(arr) {
  const ArrayStates = []
  ArrayStates.push([...arr])
  const visitedIndex = []

  for (let i = 1; i < arr.length; i++) {
    visitedIndex.push({i, msg:'outside', el: arr[i]})
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        visitedIndex.push(j-1); // it feels kinda weird repeating the same index if the condition is met, so I just put j index as minus 1 to actually record where the element as been swapped to
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
        ArrayStates.push([...arr])
      } else break
    }
  }

  return {ArrayStates, visitedIndex};
}

export function selectionSort (arr) {
  const ArrayStates = []
  ArrayStates.push([...arr])
  const visitedIndex = []
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      min = arr[j] < arr[min] ? j : min;
    }
    if (min !== i) {
      [arr[i], arr[min]] = [arr[min], arr[i]];
      ArrayStates.push([...arr]);
    }
  }

  return ArrayStates;
}

console.log(selectionSort([0, 3, 1, 6, 2, 1]));
