import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'bootstrap';
import { useStoreActions, useStoreState } from '../../../../store';
import AlgorithmHeader from '../shared/AlgorithmHeader';
import PathfindingInputModal from './PathfindingInputModal';

const PathfindingHeader = () => {
  const clearGraph = useStoreActions(store => store.clearPathfindingVisuals);
  const resetBoard = useStoreActions(store => store.createEmptyPathfindingBoard);
  const selectAlgo = useStoreActions(store => store.setSelectedPathfindingAlgorithm);
  const visualize = useStoreActions(store => store.findPath);
  const setCurrentPathfindingInput = useStoreActions(state => state.setCurrentPathfindingInput);

  const selected = useStoreState(
    state => state.selectedPathfindingAlgorithm,
    () => false
  );

  const [inputModal, setInputModal] = useState<Modal | null>(null);

  useEffect(() => {
    setCurrentPathfindingInput('start');
    setInputModal(new Modal(document.getElementById('input-pathfinding-data-modal') as HTMLElement));
  }, []);

  return (
    <AlgorithmHeader
      onVisualize={() => {
        clearGraph();
        visualize();
      }}
      onReset={() => {
        location.reload();
        resetBoard();
      }}
      onInsertData={() => {
        inputModal?.show();
      }}
      title='Algorytmy szukania ścieżki'
    >
      {ReactDOM.createPortal(
        <PathfindingInputModal
          onInputDataConfirmed={data => setCurrentPathfindingInput(data as 'start' | 'end' | 'wall' | 'cost')}
        />,
        document.body
      )}
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
