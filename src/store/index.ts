import { Action, action, createStore, createTypedHooks, persist } from 'easy-peasy';
import { bubbleSort, insertionSort, quickSort, heapSort, mergeSort } from '../algorithms/sorting';
import { dfs, bfs, dijkstra, aStar } from '../algorithms/pathfinding';

interface PathfindingNodeCoordinates {
  x: number;
  y: number;
}

export interface IPathfindingNode extends PathfindingNodeCoordinates {
  neighbors: PathfindingNodeCoordinates[];
  state: string;
  cost: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
}

export interface PathfindingNodeStateSet extends PathfindingNodeCoordinates {
  state: string;
}

interface StoreModel {
  sortingValues: number[];
  selectedSortingAlgorithm: string;
  pathfindingBoard: IPathfindingNode[][];
  pathfindingBoardHeight: number;
  pathfindingBoardWidth: number;
  selectedPathfindingAlgorithm: string;
  pathfindingStart: IPathfindingNode | undefined;
  pathfindingEnd: IPathfindingNode | undefined;
  setSelectedSortingAlgorithm: Action<StoreModel, string>;
  resetSortingValues: Action<StoreModel>;
  sort: Action<StoreModel>;
  createEmptyPathfindingBoard: Action<StoreModel>;
  generatePathfindingGraph: Action<StoreModel>;
  clearPathfindingVisuals: Action<StoreModel>;
  setPathfindingStart: Action<StoreModel, PathfindingNodeCoordinates>;
  setPathfindingEnd: Action<StoreModel, PathfindingNodeCoordinates>;
  setSelectedPathfindingAlgorithm: Action<StoreModel, string>;
  findPath: Action<StoreModel>;
}

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export default createStore<StoreModel>(
  persist(
    {
      sortingValues: [],
      selectedSortingAlgorithm: 'bubble',
      pathfindingBoard: [[]],
      pathfindingBoardHeight: 15,
      pathfindingBoardWidth: 50,
      selectedPathfindingAlgorithm: 'dfs',
      pathfindingStart: undefined,
      pathfindingEnd: undefined,
      setSelectedSortingAlgorithm: action((state, algo) => {
        state.selectedSortingAlgorithm = algo;
      }),
      resetSortingValues: action(state => {
        state.sortingValues = [9, 2, 5, 3, 1];
      }),
      sort: action(state => {
        switch (state.selectedSortingAlgorithm) {
          case 'bubble':
            bubbleSort(state.sortingValues);
            break;
          case 'insertion':
            insertionSort(state.sortingValues);
            break;
          case 'quick':
            quickSort(state.sortingValues);
            break;
          case 'heap':
            heapSort(state.sortingValues);
            break;
          case 'merge':
            mergeSort(state.sortingValues);
            break;
        }
      }),
      createEmptyPathfindingBoard: action(state => {
        state.pathfindingStart = undefined;
        state.pathfindingEnd = undefined;
        state.pathfindingBoard = [];
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
      setPathfindingStart: action((state, node) => {
        state.pathfindingBoard[node.x][node.y].state = 'start';
        state.pathfindingStart = state.pathfindingBoard[node.x][node.y];
      }),
      setPathfindingEnd: action((state, node) => {
        state.pathfindingBoard[node.x][node.y].state = 'end';
        state.pathfindingEnd = state.pathfindingBoard[node.x][node.y];
      }),
      setSelectedPathfindingAlgorithm: action((state, algo) => {
        state.selectedPathfindingAlgorithm = algo;
      }),
      findPath: action(state => {
        if (state.pathfindingStart === undefined || state.pathfindingEnd === undefined) {
          alert('Potrzebne jest wskazanie początku i końca!');
          return;
        }
        switch (state.selectedPathfindingAlgorithm) {
          case 'bfs':
            bfs(state.pathfindingBoard, state.pathfindingStart);
            break;
          case 'dfs':
            dfs(state.pathfindingBoard, state.pathfindingStart);
            break;
          case 'dijkstra':
            dijkstra(state.pathfindingBoard, state.pathfindingStart, state.pathfindingEnd);
            break;
          case 'a-star':
            aStar(state.pathfindingBoard, state.pathfindingStart, state.pathfindingEnd);
            break;
        }
      }),
    },
    {
      storage: 'localStorage',
    }
  )
);
