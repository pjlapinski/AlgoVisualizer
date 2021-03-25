import { Action, action, createStore, createTypedHooks, persist } from 'easy-peasy';
import { bubbleSort, insertionSort, quickSort, heapSort, mergeSort } from '../algorithms/sorting';

interface StoreModel {
  sortingValues: number[];
  selectedSortingAlgorithm: string;
  setSelectedSortingAlgorithm: Action<StoreModel, string>;
  resetSortingValues: Action<StoreModel>;
  sort: Action<StoreModel>;
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
    },
    {
      storage: 'localStorage',
    }
  )
);
