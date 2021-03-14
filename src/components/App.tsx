import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeView from './views/home/HomeView';
import SortingView from './views/algorithms/sorting/SortingView';
import PathfindingView from './views/algorithms/pathfinding/PathfindingView';

const App = () => {
  return (
    <BrowserRouter>
      <div className='vh-100'>
        <Route path='/' exact component={HomeView} />
        <Route path='/sorting' component={SortingView} />
        <Route path='/pathfinding' component={PathfindingView} />
      </div>
    </BrowserRouter>
  );
};

export default App;
