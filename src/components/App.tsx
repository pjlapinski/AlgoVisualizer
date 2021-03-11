import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeView from './Views/Home/HomeView';

const App = () => {
  return (
    <BrowserRouter>
      <div className='vh-100'>
        <Route path='/' exact component={HomeView} />
      </div>
    </BrowserRouter>
  );
};

export default App;
