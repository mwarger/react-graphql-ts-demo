import React from 'react';
import { MovieList } from './MovieList';

import movies from './mock/now_playing.json';

export const NowPlaying = () => {

    return (
        <div className="App">
            {movies && <MovieList title="Now Playing" movies={movies} />}
        </div>
    );
}