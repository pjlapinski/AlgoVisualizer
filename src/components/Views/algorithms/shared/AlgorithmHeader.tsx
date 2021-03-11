import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AlgorithmHeaderProps {
  title: string;
  children?: ReactNode;
}

const AlgorithmHeader = ({ title, children }: AlgorithmHeaderProps) => {
  return (
    <header className='navbar text-white navbar-expand navbar-primary bg-primary'>
      <span className='navbar-brand'>{title}</span>
      <div className='border border-right-0 border-top-0 border-bottom-0 mr-auto'>
        <div className='btn'>Wprowadź dane</div>
        {children}
        <div className='btn'>Zresetuj</div>
        <div className='btn font-weight-bold'>Wizualizuj</div>
      </div>
      <Link to='/' className='btn btn-outline-light'>
        Wróć
      </Link>
    </header>
  );
};

export default AlgorithmHeader;
