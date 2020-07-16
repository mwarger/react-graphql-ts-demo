import React from 'react';

import Slider from './components/NetflixSlider/Slider';
import Item from './components/NetflixSlider/Item';

import movies from './mock/popular.json';

export const Popular = () => {

    return (
        <div>
            <h2 className="heading__slider">Popular</h2>
            <Slider>
                {movies.map(movie => (
                    <Item movie={movie} key={movie.id}></Item>
                ))}
            </Slider>
        </div>
    );
}