import React from 'react';

import { Carousel } from 'components/Carousel';
import { MoviePoster } from 'components/MoviePoster';

import { gql, useQuery } from '@apollo/client';
import { Movie } from 'model/Movie';

// import movies from 'mock/popular.json';

const FAVORITES = gql`
  query favorites {
    user: me {
      id
      favorites {
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
  }
`;

export const Favorites = () => {
  const { loading, error, data } = useQuery(FAVORITES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Carousel title="My Favorites">
      {data.user.favorites.map((movie: Movie) => (
        <MoviePoster
          movie={movie}
          favorite={data.user?.favorites
            .map((favorite: Movie) => favorite.id)
            .includes(movie.id)}
          key={movie.id}
        ></MoviePoster>
      ))}
    </Carousel>
  );
};
