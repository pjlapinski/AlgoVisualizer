import React from 'react';
import { useStoreActions, useStoreState } from '../../store';

const OptionsMenuModal = () => {
  const simulationDelay = useStoreState(state => state.simulationDelay);
  const setSimulationDelay = useStoreActions(state => state.setSimulationDelay);
  const switchTheme = useStoreActions(state => state.switchTheme);

  return (
    <div className='modal' id='options-menu-modal' tabIndex={-1} role='dialog' aria-hidden='true'>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content bg-primary text-white'>
          <div className='modal-header'>
            <h5 className='modal-title' id='exampleModalLabel'>
              Opcje
            </h5>
          </div>
          <div className='modal-body text-center'>
            <button className='btn btn-light col' onClick={() => switchTheme()}>
              Zmień motyw strony
            </button>
            <div className='form-group mt-4'>
              <h4>Zmień szybkość animacji</h4>
              <input
                type='range'
                className='custom-range'
                onChange={e => setSimulationDelay(parseFloat(e.target.value))}
                value={simulationDelay}
                min={50}
                max={1000}
              />
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
