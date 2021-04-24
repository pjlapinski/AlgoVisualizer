import React, { useState } from 'react';

interface PathfindingInputModalProps {
  onInputDataConfirmed(data: string): void;
}

const PathfindingInputModal = ({ onInputDataConfirmed }: PathfindingInputModalProps) => {
  const [selected, setSelected] = useState<'start' | 'end' | 'wall' | 'cost'>('start');

  return (
    <div className='modal' id='input-pathfinding-data-modal' tabIndex={-1} role='dialog' aria-hidden='true'>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content bg-primary text-white'>
          <div className='modal-header'>
            <h5 className='modal-title' id='exampleModalLabel'>
              Wstaw dane
            </h5>
          </div>
          <div className='modal-body form-group'>
            <p>Wybierz elementy, które chcesz wprowadzić</p>
            <select
              className='custom-select'
              value={selected}
              onChange={e => setSelected(e.target.value as 'start' | 'end' | 'wall' | 'cost')}
            >
              <option value='start'>Start</option>
              <option value='end'>Koniec</option>
              <option value='wall'>Ściana</option>
              <option value='cost'>Zmiana kosztu</option>
            </select>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-light'
              onClick={() => onInputDataConfirmed(selected)}
              data-dismiss='modal'
            >
              Wybierz
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

export default PathfindingInputModal;
