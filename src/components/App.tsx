import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';
import store from '../store';
import HomeView from './views/home/HomeView';
import SortingView from './views/algorithms/sorting/SortingView';
import PathfindingView from './views/algorithms/pathfinding/PathfindingView';
import OptionsMenu from './optionsMenu/OptionsMenu';

const App = () => {
  return (
    <StoreProvider store={store}>
      <BrowserRouter>
        <div className='vh-100'>
          <OptionsMenu />
          <Route path='/' exact component={HomeView} />
          <Route path='/sorting' component={SortingView} />
          <Route path='/pathfinding' component={PathfindingView} />
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
};

export default App;
