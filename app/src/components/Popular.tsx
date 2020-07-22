import React from 'react';

import { Carousel } from 'components/Carousel';
import { MoviePoster } from 'components/MoviePoster';

import movies from 'mock/popular.json';

export const Popular = () => {

    return (
        <Carousel title="Popular">
            {movies.map(movie => (
                <MoviePoster movie={movie} key={movie.id}></MoviePoster>
            ))}
        </Carousel>
    );
}