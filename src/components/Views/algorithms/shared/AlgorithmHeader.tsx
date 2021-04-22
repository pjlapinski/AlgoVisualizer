import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AlgorithmHeaderProps {
  title: string;
  children?: ReactNode;
  onVisualize(): void;
  onReset(): void;
  onInsertData(): void;
}

const AlgorithmHeader = ({ title, children, onVisualize, onReset, onInsertData }: AlgorithmHeaderProps) => {
  return (
    <header className='navbar sticky-top text-white navbar-expand navbar-primary bg-primary form-inline'>
      <span className='navbar-brand'>{title}</span>
      <div className='border border-right-0 border-top-0 border-bottom-0 mr-auto'>
        <div className='btn' onClick={onInsertData}>
          Wprowadź dane
        </div>
        {children}
        <div className='btn' onClick={onReset}>
          Zresetuj
        </div>
        <div className='btn font-weight-bold' onClick={onVisualize}>
          Wizualizuj
        </div>
      </div>
      <Link to='/' className='btn btn-outline-light'>
        Wróć
      </Link>
    </header>
  );
};

export default AlgorithmHeader;
