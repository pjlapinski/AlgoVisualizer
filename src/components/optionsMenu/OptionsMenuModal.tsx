import React from 'react';
import { useStoreActions, useStoreState } from '../../store';

const OptionsMenuModal = () => {
  const simulationDelay = useStoreState(state => state.simulationDelay);
  const setSimulationDelay = useStoreActions(state => state.setSimulationDelay);

  return (
    <div className='modal' id='options-menu-modal' tabIndex={-1} role='dialog' aria-hidden='true'>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content bg-primary text-white'>
          <div className='modal-header'>
            <h5 className='modal-title' id='exampleModalLabel'>
              Zmień długość przerwy pomiędzy krokami algorytmu
            </h5>
          </div>
          <div className='modal-body text-center'>
            <div className='form-group mt-4'>
              <input
                type='range'
                className='custom-range'
                onChange={e => setSimulationDelay(parseFloat(e.target.value))}
                value={simulationDelay}
                min={50}
                max={1000}
              />
              <h2>{simulationDelay} ms</h2>
            </div>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-danger' data-dismiss='modal'>
              Wróć
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionsMenuModal;
