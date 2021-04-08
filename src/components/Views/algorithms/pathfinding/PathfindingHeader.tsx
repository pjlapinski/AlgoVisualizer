import React from 'react';
import { useStoreActions, useStoreState } from '../../../../store';
import AlgorithmHeader from '../shared/AlgorithmHeader';

const PathfindingHeader = () => {
  const generateGraph = useStoreActions(store => store.generatePathfindingGraph);
  const clearGraph = useStoreActions(store => store.clearPathfindingVisuals);
  const setStart = useStoreActions(store => store.setPathfindingStart);
  const setEnd = useStoreActions(store => store.setPathfindingEnd);
  const resetBoard = useStoreActions(store => store.createEmptyPathfindingBoard);
  const selectAlgo = useStoreActions(store => store.setSelectedPathfindingAlgorithm);
  const visualize = useStoreActions(store => store.findPath);

  // start and end only here so that changing them causes a re-render
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const start = useStoreState(state => state.pathfindingStart);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const end = useStoreState(state => state.pathfindingEnd);
  const selected = useStoreState(state => state.selectedPathfindingAlgorithm);

  return (
    <AlgorithmHeader
      onVisualize={() => {
        clearGraph();
        generateGraph();
        visualize();
      }}
      onReset={() => {
        resetBoard();
      }}
      onInsertData={() => {
        generateGraph();
        setStart({ x: 1, y: 1 });
        setEnd({ x: 5, y: 7 });
      }}
      title='Algorytmy szukania ścieżki'
    >
      <select className='custom-select' value={selected} onChange={e => selectAlgo(e.target.value)}>
        <option value='bfs'>Przeszukiwanie wszerz</option>
        <option value='dfs'>Przeszukiwanie w głąb</option>
        <option value='dijkstra'>Algorytm Dijkstry</option>
        <option value='a-star'>Algorytm A*</option>
      </select>
    </AlgorithmHeader>
  );
};

export default PathfindingHeader;
