import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeView from './views/home/HomeView';
import SortingView from './views/algorithms/sorting/SortingView';
import SearchingView from './views/algorithms/searching/SearchingView';
import PathfindingView from './views/algorithms/pathfinding/PathfindingView';

const App = () => {
  return (
    <BrowserRouter>
      <div className='vh-100'>
        <Route path='/' exact component={HomeView} />
        <Route path='/sorting' component={SortingView} />
        <Route path='/pathfinding' component={PathfindingView} />
        <Route path='/searching' component={SearchingView} />
      </div>
    </BrowserRouter>
  );
};

export default App;
