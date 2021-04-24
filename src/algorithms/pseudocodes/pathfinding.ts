interface Pseudocode {
  initialValues: string[];
  lines: string[];
}

const dfs: Pseudocode = {
  initialValues: ['g := przeszukiwany graf', 'r := wierzchołek od którego zaczynamy przeszukiwanie'],
  lines: [
    'Q := pusta kolejka',
    'oznacz r jako element przeszukany',
    'dodaj r do Q',
    'dopóki Q nie jest pusta:',
    '\tv := element zdjęty z Q',
    '\tjeżeli v jest poszukiwanym elementem:',
    '\t\tzwróć ścieżkę przebytą z r do v',
    '\tdla wszystkich sąsiadów w wierzchołka v:',
    '\t\tjeżeli w nie jest oznaczony jako przeszukany:',
    '\t\t\toznacz w jako przeszukany',
    '\t\t\twstaw w do Q',
  ],
};

const bfs: Pseudocode = {
  initialValues: ['g := przeszukiwany graf', 'r := wierzchołek od którego zaczynamy przeszukiwanie'],
  lines: [
    'S := pusty stos',
    'oznacz r jako element przeszukany',
    'dodaj r do S',
    'dopóki Q nie jest pusta:',
    '\tv := element zdjęty z S',
    '\tjeżeli v jest poszukiwanym elementem:',
    '\t\tzwróć ścieżkę przebytą z r do v',
    '\tjeżeli v nie jest oznaczony jako przeszukany:',
    '\t\tdla wszystkich sąsiadów w wierzchołka v:',
    '\t\t\toznacz w jako przeszukany',
    '\t\t\twstaw w do S',
  ],
};

const dijkstra: Pseudocode = {
  initialValues: ['g := przeszukiwany graf', 'r := wierzchołek od którego zaczynamy przeszukiwanie'],
  lines: [
    'dla każdego wierzchołka v w g:',
    '\tzapisz dystans od r do v jako nieskończoność',
    '\tzapisz wierzchołek poprzedzający v jako nieznany',
    'zmień dystans od r do r na 0',
    'Q := zbiór wszystkich wierzchołków grafu',
    'dopóki Q nie jest puste:',
    '\tu := wierzchołek z najmniejszym dystansem do r, usunięty z Q',
    '\tjeżeli u jest poszukiwanym elementem:',
    '\t\tzwróć ścieżkę przebytą z r do u',
    '\toznacz u jako element przeszukany',
    '\tdla każdego sąsiada v wierzchołka u:',
    '\t\talt := dystans z r do u + koszt przejścia z u do v',
    '\t\tjeżeli alt jest mniejszy, niż dystans z r do v:',
    '\t\t\tzmień dystans z r do v na alt',
    '\t\t\tzmień wierzchołek poprzedzający v na u',
  ],
};

const aStar: Pseudocode = {
  initialValues: ['g := przeszukiwany graf', 'r := wierzchołek od którego zaczynamy przeszukiwanie'],
  lines: [
    'ustaw długość najkrótszej znanej trasy z r do r jako 0',
    'dopóki openSet nie jest pusty:',
    '\tx := wierzchołek z najkrótszą przewidywaną trasą',
    '\tjeżeli x jest poszukiwanym elementem:',
    '\t\tzwróć ścieżkę przebytą z r do x',
    '\tusuń x z openSet i dodaj do closedSet',
    '\tdla każdego sąsiada y wierzchołka x, który nie znajduje się w closedSet:',
    '\t\ttScore := długość najkrótszej znanej trasy z r do x + koszt przejścia z x do y',
    '\t\tjeżeli tScore jest mniejszy niż najkrótsza znana trasa z r do y:',
    '\t\t\tustaw x jako wierzchołek poprzedzający y',
    '\t\t\tustaw długość najkrótszej znanej trasy z r do y jako tScore',
    '\t\t\tustaw długość przewidywanej trasy z r do y jako tScore + fizyczna odległość między r a y',
    '\t\t\tjeżeli y nie znajduje się w openSet:',
    '\t\t\t\twstaw y do openSet',
  ],
};

interface Pseudocodes {
  [name: string]: Pseudocode;
}

const pseudocodes: Pseudocodes = {
  dfs,
  bfs,
  dijkstra,
  'a-star': aStar,
};

export default pseudocodes;
