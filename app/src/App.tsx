import React from 'react';

import './App.scss';
import { NowPlaying } from './NowPlaying';
import { Popular } from './Popular';

const App = () => {

  return (
    <div className="app">
      <NowPlaying />
      <Popular />
    </div>
  );
}

export default App;
