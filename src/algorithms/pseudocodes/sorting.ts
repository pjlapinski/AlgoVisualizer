interface Pseudocode {
  initialValues: string[];
  lines: string[];
}

const bubbleSort: Pseudocode = {
  initialValues: ['arr := tablica elementów do posortowania', 'n := liczba elementów w arr'],
  lines: [
    'dla i := 0 do n - 1:',
    '\tdla j := 0 do n - i - 1:',
    '\t\tjeżeli arr[j - 1] > a[j]:',
    '\t\t\tzamień arr[j - 1] z arr[j]',
  ],
};

const insertionSort: Pseudocode = {
  initialValues: ['arr := tablica elementów do posortowania', 'n := liczba elementów w arr'],
  lines: [
    'dla każdego elementu n tablicy:',
    '\tdla wszystkich elementów poprzedzających n:',
    '\t\tjeżeli n powinien znajdować się przed aktualnym elementem:',
    '\t\t\twstaw n na odpowiednie miejsce w tablicy',
  ],
};

const parition: Pseudocode = {
  initialValues: [
    'arr :=  tablica elementów do posortowania',
    'l := indeks dolnej granicy elementów do posortowania',
    'h := indeks górnej granicy elementów do posortowania',
  ],
  lines: [
    'procedura Partition(arr, l, h):',
    '\tpi := arr[h]',
    '\ti := l - 1',
    '\tdla j := l do h:',
    '\t\tjeżeli arr[j] < pi:',
    '\t\t\ti = i + 1',
    '\t\t\tzamień arr[i] z arr[j]',
    '\tzamień arr[i + 1] z arr[h]',
    '\tzwróć i + 1',
  ],
};

const quickSort: Pseudocode = {
  initialValues: [],
  lines: [
    'procedura Quicksort(arr, l, h):',
    '\tjeżeli l < h:',
    '\t\tpi := Partition(arr, l, h)',
    '\t\tQuicksort(arr, l, pi - 1)',
    '\t\tQuicksort(arr, pi + 1, h)',
  ],
};

const heapify: Pseudocode = {
  initialValues: [
    'arr := tablica elementów do posortowania',
    'n := liczba elementów znajdujących się w kopcu',
    'root := korzeń kopca',
  ],
  lines: [
    'procedura Heapify(arr, n, root):',
    '\tlg := root',
    '\tl := 2 * root + 1',
    '\tr := 2 * root + 2',
    '\tjeżeli l < n oraz arr[lg] < arr[l]:',
    '\t\tlg = l',
    '\tjeżeli r < n oraz arr[lg] < arr[r]:',
    '\t\tlg = r',
    '\tjeżeli lg != root:',
    '\t\tzamień arr[root] z arr[lg]',
    '\t\tHeapify(arr, n, lg)',
  ],
};

const heapSort: Pseudocode = {
  initialValues: [],
  lines: [
    'dla i := ⌊n / 2⌋ - 1 do -1:',
    '\tHeapify(arr, n, i)',
    'dla j := n - 1 do 0:',
    '\tzamień arr[0] z arr[j]',
    '\tHeapify(arr, j, 0)',
  ],
};

const merge: Pseudocode = {
  initialValues: [
    'arr := tablica elementów do posortowania',
    'l := indeks początku podzielonej tablicy',
    'r := indeks końca podzielonej tablicy',
    'm := indeks środka podzielonej tablicy',
  ],
  lines: [
    'procedura Merge(arr, l, m, r):',
    '\tlenL := m - l + 1',
    '\tlenR = r - m',
    '\trozdziel tablicę arr równo na dwie tablice: left i right, rozdzielając ją na elementy na lewo i na prawo od środka',
    '\ti := 0',
    '\tj := 0',
    '\tk := l',
    '\tdopóki i < lenL oraz j < lenR:',
    '\t\tjeżeli left[i] < right[j]:',
    '\t\t\tarr[k] = left[i]',
    '\t\t\ti = i + 1',
    '\t\tw przeciwnym wypadku:',
    '\t\t\tarr[k] = right[j]',
    '\t\t\tj = j + 1',
    '\t\tk = k + 1',
    '\tdopóki i < lenL:',
    '\t\tarr[k] = left[i]',
    '\t\ti = i + 1',
    '\t\tk = k + 1',
    '\tdopóki j < lenR:',
    '\t\tarr[k] = right[j]',
    '\t\tj = j + 1',
    '\t\tk = k + 1',
  ],
};

const mergeSort: Pseudocode = {
  initialValues: [],
  lines: [
    'procedura MergeSort(arr, l, r):',
    '\tjeżeli l < r:',
    '\t\tm := ⌊(l + r) / 2⌋',
    '\t\tMergeSort(arr, l, m)',
    '\t\tMergeSort(arr, m + 1, r)',
    '\t\tMerge(arr, l, m, r)',
  ],
};

interface Pseudocodes {
  [name: string]: Pseudocode[];
}

const pseudocodes: Pseudocodes = {
  bubble: [bubbleSort],
  insertion: [insertionSort],
  quick: [parition, quickSort],
  heap: [heapify, heapSort],
  merge: [merge, mergeSort],
};

export default pseudocodes;
