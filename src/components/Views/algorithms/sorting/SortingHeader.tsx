import React from 'react';
import { useStoreActions, useStoreState } from '../../../../store';
import AlgorithmHeader from '../shared/AlgorithmHeader';

const SortingHeader = () => {
  const onVisualize = useStoreActions(state => state.sort);
  const onReset = useStoreActions(state => state.resetSortingValues);
  const selectAlgo = useStoreActions(state => state.setSelectedSortingAlgorithm);
  const selected = useStoreState(state => state.selectedSortingAlgorithm);

  return (
    <AlgorithmHeader title='Algorytmy sortujące' onVisualize={onVisualize} onReset={onReset}>
      <select className='custom-select' value={selected} onChange={e => selectAlgo(e.target.value)}>
        <option value='bubble'>Sortowanie bąbelkowe</option>
        <option value='insertion'>Sortowanie przez wstawianie</option>
        <option value='quick'>Sortowanie szybkie</option>
        <option value='heap'>Sortowanie przez kopcowanie</option>
        <option value='merge'>Sortowanie przez scalanie</option>
      </select>
    </AlgorithmHeader>
  );
};

export default SortingHeader;
