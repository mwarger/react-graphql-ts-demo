import React from 'react';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from 'theme/Theme';

import { MenuAppBar } from 'components/MenuAppBar';
import { NowPlaying } from 'components/NowPlaying';
import { Popular } from 'components/Popular';

import 'App.scss';

export const App = () => {

  return (
    <div className="app">
      <MuiThemeProvider theme={theme}>
        <MenuAppBar />
        <NowPlaying />
        <Popular />
      </MuiThemeProvider>
    </div>
  );
};