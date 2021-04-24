import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'bootstrap';
import { useStoreActions, useStoreState } from '../../../../store';
import AlgorithmHeader from '../shared/AlgorithmHeader';
import SortingInputModal from './SortingInputModal';

const SortingHeader = () => {
  const onVisualize = useStoreActions(state => state.sort);
  const onReset = useStoreActions(state => state.resetSortingValues);
  const selectAlgo = useStoreActions(state => state.setSelectedSortingAlgorithm);
  const resetSortingValues = useStoreActions(state => state.resetSortingValues);
  const selected = useStoreState(state => state.selectedSortingAlgorithm);
  const [dataInputModal, setDataInputModal] = useState<Modal | null>(null);

  const onInsertDataClicked = () => dataInputModal?.show();
  const onInputDataConfirmed = () => {
    resetSortingValues();
  };

  useEffect(() => setDataInputModal(new Modal(document.getElementById('input-sorting-data-modal') as HTMLElement)), []);

  return (
    <>
      {ReactDOM.createPortal(<SortingInputModal onInputDataConfirmed={onInputDataConfirmed} />, document.body)}
      <AlgorithmHeader
        title='Algorytmy sortujące'
        onVisualize={onVisualize}
        onReset={onReset}
        onInsertData={onInsertDataClicked}
      >
        <select className='custom-select' value={selected} onChange={e => selectAlgo(e.target.value)}>
          <option value='bubble'>Sortowanie bąbelkowe</option>
          <option value='insertion'>Sortowanie przez wstawianie</option>
          <option value='quick'>Sortowanie szybkie</option>
          <option value='heap'>Sortowanie przez kopcowanie</option>
          <option value='merge'>Sortowanie przez scalanie</option>
        </select>
      </AlgorithmHeader>
    </>
  );
};

export default SortingHeader;
