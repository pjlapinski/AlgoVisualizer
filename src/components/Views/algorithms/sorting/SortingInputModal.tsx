import React, { useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from '../../../../store';

interface SortingInputModalProps {
  onInputDataConfirmed(): void;
}

const SortingInputModal = ({ onInputDataConfirmed }: SortingInputModalProps) => {
  const storeDataInput = useStoreState(state => state.initialSortingValues);
  const setStoreDataInput = useStoreActions(state => state.setInitialSortingValues);

  const [hadInput, setHadInput] = useState(false);
  const [dataInput, setDataInput] = useState('');

  const setInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.replaceAll(/[^\d -]/g, '');
    const vals = text
      .split(' ')
      .map(val => parseInt(val))
      .filter(val => !isNaN(val));
    if (vals.length > 15) return;
    setDataInput(text);
    setStoreDataInput(vals);
  };

  useEffect(() => {
    if (dataInput === '' && !hadInput) {
      const data = storeDataInput.join(' ');
      setDataInput(data);
      setHadInput(data.length > 0);
    }
  });

  return (
    <div className='modal' id='input-sorting-data-modal' tabIndex={-1} role='dialog' aria-hidden='true'>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content bg-primary text-white'>
          <div className='modal-header'>
            <h5 className='modal-title' id='exampleModalLabel'>
              Wstaw dane
            </h5>
          </div>
          <div className='modal-body form-group'>
            <p>Wpisz liczby oddzielone spacjami, maksymalnie 15 liczb</p>
            <input type='text' className='form-control' placeholder='Dane' value={dataInput} onChange={setInput} />
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-light' onClick={onInputDataConfirmed} data-dismiss='modal'>
              Wstaw
            </button>
            <button type='button' className='btn btn-danger' data-dismiss='modal'>
              Wróć
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingInputModal;
