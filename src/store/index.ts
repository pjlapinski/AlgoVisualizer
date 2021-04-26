import { Action, action, createStore, createTypedHooks, persist, thunk, Thunk, computed, Computed } from 'easy-peasy';
import { bubbleSort, insertionSort, quickSort, heapSort, mergeSort } from '../algorithms/sorting';
import { dfs, bfs, dijkstra, aStar } from '../algorithms/pathfinding';

interface PathfindingNodeCoordinates {
  x: number;
  y: number;
}

type PathfindingNodeStates = 'start' | 'end' | 'wall' | 'cost' | 'visited' | 'unvisited' | 'path';

export interface IPathfindingNode extends PathfindingNodeCoordinates {
  neighbors: PathfindingNodeCoordinates[];
  state: string;
  cost: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
}

export interface PathfindingNodeStateSet extends PathfindingNodeCoordinates {
  state: string;
}

export interface LineHighlight {
  procedure: number;
  line: number;
}

export interface setNodeStateInfo {
  x: number;
  y: number;
  state: PathfindingNodeStates;
}

interface StoreModel {
  theme: 'dark' | 'light';
  simulationDelay: number;
  initialSortingValues: number[];
  sortingValues: number[];
  sortingValuesClasses: string[];
  selectedSortingAlgorithm: string;
  pathfindingBoard: IPathfindingNode[][];
  pathfindingBoardHeight: number;
  pathfindingBoardWidth: number;
  selectedPathfindingAlgorithm: string;
  currentPathfindingInput: PathfindingNodeStates;
  pathfindingStart: IPathfindingNode | undefined;
  pathfindingEnd: IPathfindingNode | undefined;
  highlightedSortingPseudocodeLine: LineHighlight;
  highlightedPathfindingPseudocodeLine: LineHighlight;
  maxSortingValue: Computed<StoreModel, number>;
  switchTheme: Action<StoreModel>;
  setSimulationDelay: Action<StoreModel, number>;
  setInitialSortingValues: Action<StoreModel, number[]>;
  setHighlightedSortingPseudocodeLine: Action<StoreModel, LineHighlight>;
  setHighlightedPathfindingPseudocodeLine: Action<StoreModel, LineHighlight>;
  setSelectedSortingAlgorithm: Action<StoreModel, string>;
  resetSortingValues: Action<StoreModel>;
  resetSortingValuesClasses: Action<StoreModel>;
  createEmptyPathfindingBoard: Action<StoreModel>;
  generatePathfindingGraph: Action<StoreModel>;
  clearPathfindingVisuals: Action<StoreModel>;
  setCurrentPathfindingInput: Action<StoreModel, PathfindingNodeStates>;
  setPathfindingStart: Action<StoreModel, PathfindingNodeCoordinates>;
  setPathfindingEnd: Action<StoreModel, PathfindingNodeCoordinates>;
  setPathfindingNodeAsWall: Action<StoreModel, PathfindingNodeCoordinates>;
  setPathfindingNodeState: Action<StoreModel, setNodeStateInfo>;
  incrementPathfindingNodeCost: Action<StoreModel, PathfindingNodeCoordinates>;
  setSelectedPathfindingAlgorithm: Action<StoreModel, string>;
  setSortingValues: Action<StoreModel, number[]>;
  setSortingValuesClasses: Action<StoreModel, string[]>;
  findPath: Thunk<StoreModel>;
  sort: Thunk<StoreModel>;
}

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export default createStore<StoreModel>(
  persist(
    {
      theme: 'light',
      simulationDelay: 200.0,
      initialSortingValues: [],
      sortingValues: [],
      sortingValuesClasses: [],
      selectedSortingAlgorithm: 'bubble',
      pathfindingBoard: [[]],
      pathfindingBoardHeight: 10,
      pathfindingBoardWidth: 50,
      selectedPathfindingAlgorithm: 'dfs',
      currentPathfindingInput: 'start',
      pathfindingStart: undefined,
      pathfindingEnd: undefined,
      highlightedSortingPseudocodeLine: { procedure: -1, line: -1 },
      highlightedPathfindingPseudocodeLine: { procedure: -1, line: -1 },
      maxSortingValue: computed(state => Math.max(...state.sortingValues)),
      switchTheme: action(state => {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
      }),
      setSimulationDelay: action((state, value) => {
        state.simulationDelay = value;
      }),
      setInitialSortingValues: action((state, values) => {
        state.initialSortingValues = values;
      }),
      setHighlightedSortingPseudocodeLine: action((state, highlight) => {
        state.highlightedSortingPseudocodeLine = highlight;
      }),
      setHighlightedPathfindingPseudocodeLine: action((state, highlight) => {
        state.highlightedPathfindingPseudocodeLine = highlight;
      }),
      setSelectedSortingAlgorithm: action((state, algo) => {
        state.highlightedSortingPseudocodeLine = { procedure: -1, line: -1 };
        state.sortingValuesClasses = state.sortingValues.map(() => '');
        state.selectedSortingAlgorithm = algo;
      }),
      resetSortingValues: action(state => {
        state.sortingValues = state.initialSortingValues;
        state.sortingValuesClasses = state.initialSortingValues.map(() => '');
        state.highlightedSortingPseudocodeLine = { procedure: -1, line: -1 };
      }),
      resetSortingValuesClasses: action(state => {
        state.sortingValuesClasses = state.sortingValues.map(() => '');
      }),
      createEmptyPathfindingBoard: action(state => {
        state.pathfindingStart = undefined;
        state.pathfindingEnd = undefined;
        state.pathfindingBoard = [];
        state.highlightedPathfindingPseudocodeLine = { line: -1, procedure: -1 };
        for (let i = 0; i < state.pathfindingBoardHeight; i++) {
          state.pathfindingBoard.push([]);
          for (let j = 0; j < state.pathfindingBoardWidth; j++) {
            const node: IPathfindingNode = {
              x: j,
              y: i,
              cost: 1,
              neighbors: [],
              state: 'unvisited',
            };
            state.pathfindingBoard[i].push(node);
          }
        }
      }),
      generatePathfindingGraph: action(state => {
        for (let i = 0; i < state.pathfindingBoardHeight; i++) {
          for (let j = 0; j < state.pathfindingBoardWidth; j++) {
            if (state.pathfindingBoard[i][j].state === 'wall') continue;
            const neighbors: PathfindingNodeCoordinates[] = [];
            if (i !== 0 && state.pathfindingBoard[i - 1][j].state !== 'wall')
              neighbors.push({ x: state.pathfindingBoard[i - 1][j].x, y: state.pathfindingBoard[i - 1][j].y });
            if (j !== 0 && state.pathfindingBoard[i][j - 1].state !== 'wall')
              neighbors.push({ x: state.pathfindingBoard[i][j - 1].x, y: state.pathfindingBoard[i][j - 1].y });
            if (i !== state.pathfindingBoardHeight - 1 && state.pathfindingBoard[i + 1][j].state !== 'wall')
              neighbors.push({ x: state.pathfindingBoard[i + 1][j].x, y: state.pathfindingBoard[i + 1][j].y });
            if (j !== state.pathfindingBoardWidth - 1 && state.pathfindingBoard[i][j + 1].state !== 'wall')
              neighbors.push({ x: state.pathfindingBoard[i][j + 1].x, y: state.pathfindingBoard[i][j + 1].y });
            state.pathfindingBoard[i][j].neighbors = neighbors;
          }
        }
      }),
      clearPathfindingVisuals: action(state => {
        for (let i = 0; i < state.pathfindingBoardHeight; i++) {
          for (let j = 0; j < state.pathfindingBoardWidth; j++) {
            if (state.pathfindingBoard[i][j].state === 'visited' || state.pathfindingBoard[i][j].state === 'path')
              state.pathfindingBoard[i][j].state = 'unvisited';
          }
        }
      }),
      setCurrentPathfindingInput: action((state, type) => {
        state.currentPathfindingInput = type;
      }),
      setPathfindingStart: action((state, node) => {
        if (node.y === state.pathfindingStart?.y && node.x === state.pathfindingStart?.x) {
          state.pathfindingStart = undefined;
          state.pathfindingBoard[node.y][node.x].state = 'unvisited';
          return;
        }
        state.pathfindingBoard[node.y][node.x].cost = 1;
        if (state.pathfindingStart !== undefined)
          state.pathfindingBoard[state.pathfindingStart.y][state.pathfindingStart.x].state = 'unvisited';
        state.pathfindingBoard[node.y][node.x].state = 'start';
        state.pathfindingStart = state.pathfindingBoard[node.y][node.x];
      }),
      setPathfindingEnd: action((state, node) => {
        if (node.y === state.pathfindingEnd?.y && node.x === state.pathfindingEnd?.x) {
          state.pathfindingEnd = undefined;
          state.pathfindingBoard[node.y][node.x].state = 'unvisited';
          return;
        }
        state.pathfindingBoard[node.y][node.x].cost = 1;
        if (state.pathfindingEnd !== undefined)
          state.pathfindingBoard[state.pathfindingEnd.y][state.pathfindingEnd.x].state = 'unvisited';
        state.pathfindingBoard[node.y][node.x].state = 'end';
        state.pathfindingEnd = state.pathfindingBoard[node.y][node.x];
      }),
      setPathfindingNodeAsWall: action((state, node) => {
        state.pathfindingBoard[node.y][node.x].cost = 1;
        state.pathfindingBoard[node.y][node.x].state =
          state.pathfindingBoard[node.y][node.x].state === 'wall' ? '' : 'wall';
      }),
      setPathfindingNodeState: action((state, info) => {
        state.pathfindingBoard[info.y][info.x].state = info.state;
      }),
      incrementPathfindingNodeCost: action((state, node) => {
        const nodeInBoard = state.pathfindingBoard[node.y][node.x];
        if (nodeInBoard.state === 'wall' || nodeInBoard.state === 'start' || nodeInBoard.state === 'end') return;
        nodeInBoard.cost = nodeInBoard.cost + 1 > 9 ? 1 : ((nodeInBoard.cost + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9);
      }),
      setSelectedPathfindingAlgorithm: action((state, algo) => {
        state.selectedPathfindingAlgorithm = algo;
      }),
      findPath: thunk(async (actions, payload, helper) => {
        const state = helper.getState();
        if (state.pathfindingStart === undefined || state.pathfindingEnd === undefined) {
          alert('Potrzebne jest wskazanie początku i końca!');
          return;
        }
        switch (state.selectedPathfindingAlgorithm) {
          case 'bfs':
            bfs(
              state.pathfindingBoard,
              state.pathfindingStart,
              state.simulationDelay / 2,
              actions.setPathfindingNodeState,
              actions.setHighlightedPathfindingPseudocodeLine
            );
            return;
          case 'dfs':
            dfs(
              state.pathfindingBoard,
              state.pathfindingStart,
              state.simulationDelay / 2,
              actions.setPathfindingNodeState,
              actions.setHighlightedPathfindingPseudocodeLine
            );
            return;
          case 'dijkstra':
            dijkstra(
              state.pathfindingBoard,
              state.pathfindingStart,
              state.pathfindingEnd,
              state.simulationDelay / 2,
              actions.setPathfindingNodeState,
              actions.setHighlightedPathfindingPseudocodeLine
            );
            return;
          case 'a-star':
            aStar(
              state.pathfindingBoard,
              state.pathfindingStart,
              state.pathfindingEnd,
              state.simulationDelay / 2,
              actions.setPathfindingNodeState,
              actions.setHighlightedPathfindingPseudocodeLine
            );
            return;
        }
      }),
      setSortingValues: action((state, payload) => {
        state.sortingValues = payload;
      }),
      setSortingValuesClasses: action((state, payload) => {
        state.sortingValuesClasses = payload;
      }),
      sort: thunk(async (actions, payload, helper) => {
        actions.resetSortingValuesClasses();
        const state = helper.getState();
        switch (state.selectedSortingAlgorithm) {
          case 'bubble':
            bubbleSort(
              state.sortingValuesClasses,
              state.sortingValues,
              state.simulationDelay,
              actions.setSortingValues,
              actions.setSortingValuesClasses,
              actions.setHighlightedSortingPseudocodeLine
            );
            break;
          case 'insertion':
            insertionSort(
              state.sortingValuesClasses,
              state.sortingValues,
              state.simulationDelay,
              actions.setSortingValues,
              actions.setSortingValuesClasses,
              actions.setHighlightedSortingPseudocodeLine
            );
            break;
          case 'quick':
            quickSort(
              state.sortingValuesClasses,
              state.sortingValues,
              state.simulationDelay,
              actions.setSortingValues,
              actions.setSortingValuesClasses,
              actions.setHighlightedSortingPseudocodeLine
            );
            break;
          case 'heap':
            heapSort(
              state.sortingValuesClasses,
              state.sortingValues,
              state.simulationDelay,
              actions.setSortingValues,
              actions.setSortingValuesClasses,
              actions.setHighlightedSortingPseudocodeLine
            );
            break;
          case 'merge':
            mergeSort(
              state.sortingValuesClasses,
              state.sortingValues,
              state.simulationDelay,
              actions.setSortingValues,
              actions.setSortingValuesClasses,
              actions.setHighlightedSortingPseudocodeLine
            );
            break;
        }
      }),
    },
    {
      storage: 'localStorage',
    }
  )
);
