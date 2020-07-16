import React from 'react';

import Slider from './components/NetflixSlider/Slider';
import Item from './components/NetflixSlider/Item';

import movies from './mock/now_playing.json';

export const NowPlaying = () => {

    return (
        <div>
            <h2>Now Playing</h2>
            <Slider>
                {movies.map(movie => (
                    <Item movie={movie} key={movie.id}></Item>
                ))}
            </Slider>
        </div>
    );
}