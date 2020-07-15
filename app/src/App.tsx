import React from 'react';

import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import './App.css';
import { NowPlaying } from './NowPlaying';
import { Popular } from './Popular';
import { MoviePoster } from './MoviePoster';

const App = () => {

  return (
    <>
      <Router>
        <nav>
          <NavLink className="link" activeClassName="linkActive" to="/nowPlaying">Now Playing</NavLink> | <NavLink className="link" activeClassName="linkActive" to="/popular">Popular</NavLink>
        </nav>

        <Switch>
          <Route exact={true} path="/nowPlaying" component={NowPlaying} />
          <Route exaxt={true} path="/popular" component={Popular} />
          <Route path="/movies/:id" component={MoviePoster} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
