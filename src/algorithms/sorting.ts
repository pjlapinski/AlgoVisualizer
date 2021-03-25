const bubbleSort = (arr: number[]) => {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i; j++) {
      if (arr[j - 1] > arr[j]) {
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
      }
    }
  }
};

const insertionSort = (arr: number[]) => {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    const k = arr[i];
    let j = i - 1;
    while (j >= 0 && k < arr[j]) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = k;
  }
};

const partition = (arr: number[], l: number, h: number) => {
  const pi = arr[h];
  let i = l - 1;
  for (let j = l; j < h; j++) {
    if (arr[j] < pi) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[h]] = [arr[h], arr[i + 1]];
  return i + 1;
};

const qs = (arr: number[], l: number, h: number) => {
  if (l < h) {
    const pi = partition(arr, l, h);
    qs(arr, l, pi - 1);
    qs(arr, pi + 1, h);
  }
};

const quickSort = (arr: number[]) => {
  qs(arr, 0, arr.length - 1);
};

const heapify = (arr: number[], n: number, i: number) => {
  let lg = i;
  const l = 2 * i + 1;
  const r = 2 * i + 2;
  if (l < n && arr[lg] < arr[l]) lg = l;
  if (r < n && arr[lg] < arr[r]) lg = r;
  if (lg != i) {
    [arr[i], arr[lg]] = [arr[lg], arr[i]];
    heapify(arr, n, lg);
  }
};

const heapSort = (arr: number[]) => {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(arr, n, i);
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
};

const merge = (arr: number[], l: number, m: number, r: number) => {
  const lenL = m - l + 1;
  const lenR = r - m;
  const left = [];
  const right = [];
  for (let i = l; i <= r; i++) {
    if (i < l + lenL) left.push(arr[i]);
    else right.push(arr[i]);
  }
  let i = 0;
  let j = 0;
  let k = l;
  while (i < lenL && j < lenR) {
    if (left[i] < right[j]) {
      arr[k] = left[i];
      i++;
    } else {
      arr[k] = right[j];
      j++;
    }
    k++;
  }
  while (i < lenL) {
    arr[k] = left[i];
    i++;
    k++;
  }
  while (j < lenR) {
    arr[k] = right[j];
    j++;
    k++;
  }
};

const ms = (arr: number[], l: number, r: number) => {
  if (l < r) {
    const m = Math.floor((l + r) / 2);
    ms(arr, l, m);
    ms(arr, m + 1, r);
    merge(arr, l, m, r);
  }
};

const mergeSort = (arr: number[]) => {
  ms(arr, 0, arr.length - 1);
};

export { bubbleSort, insertionSort, quickSort, heapSort, mergeSort };
