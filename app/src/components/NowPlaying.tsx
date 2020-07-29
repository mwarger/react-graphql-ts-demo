import React from 'react';

import { Carousel } from './Carousel';
import { MoviePoster } from 'components/MoviePoster';

// import movies from 'mock/now_playing.json';

import { gql, useQuery } from "@apollo/client";
import { Movie } from 'model/Movie';

const NOW_PLAYING = gql`
  query nowPlaying {
    nowPlaying {
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

export const NowPlaying = () => {

  const { loading, error, data } = useQuery(NOW_PLAYING);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Carousel title="Now Playing">
      {data.nowPlaying.map((movie: Movie) => (
        <MoviePoster movie={movie} key={movie.id}></MoviePoster>
      ))}
    </Carousel>
  );
};
