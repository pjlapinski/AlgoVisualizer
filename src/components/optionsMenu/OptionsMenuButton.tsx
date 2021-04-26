import React from 'react';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface OptionsMenuButtonProps {
  onButtonClicked(): void;
}

const OptionsMenuButton = ({ onButtonClicked }: OptionsMenuButtonProps) => {
  return (
    <button onClick={onButtonClicked} id='options-button' className='btn btn-primary'>
      <FontAwesomeIcon icon={faCogs} />
    </button>
  );
};

export default OptionsMenuButton;
