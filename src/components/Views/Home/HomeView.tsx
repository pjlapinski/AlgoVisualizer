import React from 'react';
import { Link } from 'react-router-dom';
import sortingIcon from './images/sortingIcon.png';
import pathfindingIcon from './images/pathfindingIcon.png';

const HomeView = () => {
  return (
    <div className='vh-100 d-flex flex-wrap justify-content-center align-items-center'>
      <Link to='sorting' className='algorithm-select-box'>
        <h2>Algorytmy sortujące</h2>
        <img src={sortingIcon} alt='' className='border border-top-0 border-left-0 border-right-0 border-dark' />
      </Link>
      <Link to='pathfinding' className='algorithm-select-box'>
        <h2>Algorytmy szukania ścieżki</h2>
        <img src={pathfindingIcon} alt='' />
      </Link>
    </div>
  );
};

export default HomeView;
