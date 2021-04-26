import { Modal } from 'bootstrap';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import OptionsMenuModal from './OptionsMenuModal';
import OptionsMenuButton from './OptionsMenuButton';

const OptionsMenu = () => {
  const [modal, setModal] = useState<Modal | null>(null);

  useEffect(() => setModal(new Modal(document.getElementById('options-menu-modal') as HTMLElement)), []);

  return (
    <>
      {ReactDOM.createPortal(<OptionsMenuModal />, document.body)}
      <OptionsMenuButton onButtonClicked={() => modal?.show()} />
    </>
  );
};

export default OptionsMenu;
