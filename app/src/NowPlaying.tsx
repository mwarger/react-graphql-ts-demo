import React from 'react';

import Slider from './components/NetflixSlider/Slider';
import Item from './components/NetflixSlider/Item';

import movies from './mock/now_playing.json';
import './App.scss';

export const NowPlaying = () => {
  return (
    <div>
      <Slider title="Now Playing">
        {movies.map((movie) => (
          <Item movie={movie} key={movie.id}></Item>
        ))}
      </Slider>
    </div>
  );
};
