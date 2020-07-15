import React from 'react';
import { MovieList } from './MovieList';

import movies from './mock/popular.json';

export const Popular = () => {

    return (
        <div className="App">
            {movies && <MovieList title="Popular" movies={movies} />}
        </div>
    );
}