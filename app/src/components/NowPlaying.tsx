import React from 'react';

import { Carousel } from './Carousel';
import { MoviePoster } from 'components/MoviePoster';

import movies from 'mock/now_playing.json';

export const NowPlaying = () => {
  return (
    <Carousel title="Now Playing">
      {movies.map((movie) => (
        <MoviePoster movie={movie} key={movie.id}></MoviePoster>
      ))}
    </Carousel>
  );
};
