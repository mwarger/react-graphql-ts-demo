import React from 'react';

import { Carousel } from 'components/Carousel';
import { MoviePoster } from 'components/MoviePoster';

import { gql, useQuery } from "@apollo/client";
import { Movie } from 'model/Movie';

// import movies from 'mock/popular.json';

const POPULAR = gql`
  query popular {
    popular {
      id
      title
      overview
      poster_path
      backdrop_path
      cast {
        name
      }
    }
  }
`;

export const Popular = () => {

    const { loading, error, data } = useQuery(POPULAR);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <Carousel title="Popular">
            {data.popular.map((movie: Movie) => (
                <MoviePoster movie={movie} key={movie.id}></MoviePoster>
            ))}
        </Carousel>
    );
}