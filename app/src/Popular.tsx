import React from 'react';

import Slider from './components/NetflixSlider/Slider';
import Item from './components/NetflixSlider/Item';

import movies from './mock/popular.json';

export const Popular = () => {

    return (
        <div>
            <Slider title="Popular">
                {movies.map(movie => (
                    <Item movie={movie} key={movie.id}></Item>
                ))}
            </Slider>
        </div>
    );
}