import React from 'react';

import 'App.scss';
import { NowPlaying } from 'components/NowPlaying';
import { Popular } from 'components/Popular';

export const App = () => {
  return (
    <div className="app">
      <NowPlaying />
      <Popular />
    </div>
  );
};