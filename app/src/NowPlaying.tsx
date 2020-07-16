import React from 'react';

import Slider from './components/NetflixSlider/Slider';
import Item from './components/NetflixSlider/Item';

import movies from './mock/now_playing.json';
import './App.scss';

export const NowPlaying = () => {

    return (
        <div>
            <h2 className="heading__slider">Now Playing</h2>
            <Slider>
                {movies.map(movie => (
                    <Item movie={movie} key={movie.id}></Item>
                ))}
            </Slider>
        </div>
    );
}