const bubbleSort = async (
  classes: string[],
  arr: number[],
  delay: number,
  setValues: (values: number[]) => void,
  setClasses: (classes: string[]) => void
) => {
  const n = arr.length;
  const arrCopy = [...arr];
  const classesCopy = [...classes];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i; j++) {
      classesCopy[j] = 'current';
      classesCopy[j - 1] = 'current';
      setClasses(classesCopy);
      await new Promise(r => setTimeout(r, delay));
      if (arrCopy[j - 1] > arrCopy[j]) {
        [arrCopy[j - 1], arrCopy[j]] = [arrCopy[j], arrCopy[j - 1]];
        setValues(arrCopy);
      }
      classesCopy[j - 1] = '';
      classesCopy[j] = j === n - i - 1 ? 'sorted' : '';
      setClasses(classesCopy);
    }
  }
};

const insertionSort = async (
  classes: string[],
  arr: number[],
  delay: number,
  setValues: (values: number[]) => void,
  setClasses: (classes: string[]) => void
) => {
  const n = arr.length;
  const arrCopy = [...arr];
  const classesCopy = [...classes];
  for (let i = 0; i < n; i++) {
    const k = arrCopy[i];
    classesCopy[i] = 'current';
    setClasses(classesCopy);
    await new Promise(r => setTimeout(r, delay));
    let j = i - 1;
    while (j >= 0 && k < arrCopy[j]) {
      arrCopy[j + 1] = arrCopy[j];
      classesCopy[j + 1] = 'current';
      setClasses(classesCopy);
      setValues(arrCopy);
      await new Promise(r => setTimeout(r, delay));
      if (j !== i - 1) {
        classesCopy[j + 1] = '';
        setClasses(classesCopy);
      }
      j--;
    }
    for (let l = 0; l <= i; l++) classesCopy[l] = '';
    setClasses(classesCopy);
    arrCopy[j + 1] = k;
    setValues(arrCopy);
  }
  for (let i = 0; i < n; i++) {
    classesCopy[i] = 'sorted';
    setClasses(classesCopy);
    await new Promise(r => setTimeout(r, delay));
  }
};

const partition = async (
  classes: string[],
  arr: number[],
  l: number,
  h: number,
  delay: number,
  setValues: (values: number[]) => void,
  setClasses: (classes: string[]) => void
) => {
  const pi = arr[h];
  classes[h] = 'pivot';
  setClasses(classes);
  let i = l - 1;
  for (let j = l; j < h; j++) {
    if (arr[j] < pi) {
      i++;
      if (classes[i] !== 'pivot') classes[i] = 'current';
      if (classes[j] !== 'pivot') classes[j] = 'current';
      setClasses(classes);
      await new Promise(r => setTimeout(r, delay));
      [arr[i], arr[j]] = [arr[j], arr[i]];
      setValues(arr);
      if (classes[i] !== 'pivot') classes[i] = '';
      if (classes[j] !== 'pivot') classes[j] = '';
      setClasses(classes);
    }
  }
  classes[i + 1] = 'current';
  classes[h] = 'current';
  setClasses(classes);
  await new Promise(r => setTimeout(r, delay));
  [arr[i + 1], arr[h]] = [arr[h], arr[i + 1]];
  setValues(arr);
  classes[i + 1] = '';
  classes[h] = '';
  setClasses(classes);
  return i + 1;
};

const qs = async (
  classes: string[],
  arr: number[],
  l: number,
  h: number,
  delay: number,
  setValues: (values: number[]) => void,
  setClasses: (classes: string[]) => void
) => {
  if (l < h) {
    const pi = await partition(classes, arr, l, h, delay, setValues, setClasses);
    await new Promise(r => setTimeout(r, delay));
    await qs(classes, arr, l, pi - 1, delay, setValues, setClasses);
    await qs(classes, arr, pi + 1, h, delay, setValues, setClasses);
  }
};

const quickSort = async (
  classes: string[],
  arr: number[],
  delay: number,
  setValues: (values: number[]) => void,
  setClasses: (classes: string[]) => void
) => {
  await qs([...classes], [...arr], 0, arr.length - 1, delay, setValues, setClasses);
};

const heapify = async (
  classes: string[],
  arr: number[],
  n: number,
  i: number,
  delay: number,
  setValues: (values: number[]) => void,
  setClasses: (classes: string[]) => void
) => {
  let lg = i;
  const l = 2 * i + 1;
  const r = 2 * i + 2;
  if (l < n && arr[lg] < arr[l]) lg = l;
  if (r < n && arr[lg] < arr[r]) lg = r;
  if (lg != i) {
    classes[i] = 'current';
    classes[lg] = 'current';
    setClasses(classes);
    await new Promise(r => setTimeout(r, delay));
    [arr[i], arr[lg]] = [arr[lg], arr[i]];
    setValues(arr);
    classes[i] = '';
    classes[lg] = '';
    setClasses(classes);
    await heapify(classes, arr, n, lg, delay, setValues, setClasses);
  }
};

const heapSort = async (
  classes: string[],
  arr: number[],
  delay: number,
  setValues: (values: number[]) => void,
  setClasses: (classes: string[]) => void
) => {
  const arrCopy = [...arr];
  const classesCopy = [...classes];
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
    await heapify(classesCopy, arrCopy, n, i, delay, setValues, setClasses);
  for (let i = n - 1; i > 0; i--) {
    classesCopy[0] = 'current';
    classesCopy[i] = 'current';
    setClasses(classesCopy);
    await new Promise(r => setTimeout(r, delay));
    [arrCopy[0], arrCopy[i]] = [arrCopy[i], arrCopy[0]];
    setValues(arrCopy);
    classesCopy[0] = '';
    classesCopy[i] = 'sorted';
    setClasses(classesCopy);
    await heapify(classesCopy, arrCopy, i, 0, delay, setValues, setClasses);
  }
  classesCopy[0] = 'sorted';
  setClasses(classesCopy);
};

const merge = async (
  classes: string[],
  arr: number[],
  l: number,
  m: number,
  r: number,
  delay: number,
  setValues: (values: number[]) => void,
  setClasses: (classes: string[]) => void
) => {
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
      classes[l + i] = 'current';
      classes[k] = 'current';
      setClasses(classes);
      await new Promise(r => setTimeout(r, delay));

      arr[k] = left[i];
      setValues(arr);

      classes[l + i] = '';
      classes[k] = '';
      setClasses(classes);
      i++;
    } else {
      classes[m + j] = 'current';
      classes[k] = 'current';
      setClasses(classes);
      await new Promise(r => setTimeout(r, delay));

      arr[k] = right[j];
      setValues(arr);

      classes[m + j] = '';
      classes[k] = '';
      setClasses(classes);
      j++;
    }
    k++;
  }
  while (i < lenL) {
    arr[k] = left[i];
    setValues(arr);
    classes[k] = '';
    setClasses(classes);
    await new Promise(r => setTimeout(r, delay));
    i++;
    k++;
  }
  while (j < lenR) {
    arr[k] = right[j];
    setValues(arr);
    classes[k] = '';
    setClasses(classes);
    await new Promise(r => setTimeout(r, delay));
    j++;
    k++;
  }
};

const ms = async (
  classes: string[],
  arr: number[],
  l: number,
  r: number,
  delay: number,
  setValues: (values: number[]) => void,
  setClasses: (classes: string[]) => void
) => {
  if (l < r) {
    const m = Math.floor((l + r) / 2);
    classes[l] = 'pivot';
    classes[r] = 'pivot';
    setClasses(classes);
    await new Promise(r => setTimeout(r, delay));
    await ms(classes, arr, l, m, delay, setValues, setClasses);
    await new Promise(r => setTimeout(r, delay));
    await ms(classes, arr, m + 1, r, delay, setValues, setClasses);
    await new Promise(r => setTimeout(r, delay));
    await merge(classes, arr, l, m, r, delay, setValues, setClasses);
  }
};

const mergeSort = async (
  classes: string[],
  arr: number[],
  delay: number,
  setValues: (values: number[]) => void,
  setClasses: (classes: string[]) => void
) => {
  const classesCopy = [...classes];
  const arrCopy = [...arr];
  await ms(classesCopy, arrCopy, 0, arr.length - 1, delay, setValues, setClasses);
  for (let i = 0; i < classesCopy.length; i++) {
    classesCopy[i] = 'sorted';
    setClasses(classesCopy);
    await new Promise(r => setTimeout(r, delay));
  }
};

export { bubbleSort, insertionSort, quickSort, heapSort, mergeSort };
