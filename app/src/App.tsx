import React from 'react';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from 'theme/Theme';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { MenuAppBar } from 'components/MenuAppBar';
import { NowPlaying } from 'components/NowPlaying';
import { Popular } from 'components/Popular';

import { ApolloProvider } from "./context/ApolloProvider";

import 'App.scss';

export const App = () => {

  return (
    <div className="app">
      <ApolloProvider>
        <MuiThemeProvider theme={theme}>
          <Router>

            <MenuAppBar />

            <Switch>
              <Route exact={true} path="/nowPlaying" component={NowPlaying} />
              <Route exaxt={true} path="/popular" component={Popular} />
              <Redirect from="/" exact to="/nowPlaying" />
            </Switch>

          </Router>
        </MuiThemeProvider>
      </ApolloProvider>
    </div>
  );
};