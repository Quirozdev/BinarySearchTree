export function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const midPoint = Math.floor(arr.length / 2);
  const leftSide = mergeSort(arr.slice(0, midPoint));
  const rightSide = mergeSort(arr.slice(midPoint, arr.length));

  return merge(leftSide, rightSide);
}

function merge(arr1, arr2) {
  let i = 0;
  let j = 0;
  const mergedArr = [];
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      mergedArr.push(arr1[i]);
      i++;
    } else {
      mergedArr.push(arr2[j]);
      j++;
    }
  }
  while (i < arr1.length) {
    mergedArr.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    mergedArr.push(arr2[j]);
    j++;
  }
  return mergedArr;
}

export function removeDuplicates(arr) {
  return [...new Set(arr)];
}

export function createArrayWithRandomNumbers(size, minimumValue, maximumValue) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(
      Math.floor(Math.random() * (maximumValue - minimumValue + 1)) +
        minimumValue
    );
  }
  return arr;
}
