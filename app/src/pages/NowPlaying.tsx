import React from 'react';

import { Carousel } from '../components/slider/Carousel';
import { MoviePoster } from '../components/slider/MoviePoster';
import { Movie, useNowPlayingQuery } from '../generated/graphql';

export const NowPlaying = () => {
  const { loading, error, data } = useNowPlayingQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Carousel title="Now Playing">
      {data?.nowPlaying?.map((movie: Movie) => (
        <MoviePoster movie={movie} key={movie.id}></MoviePoster>
      ))}
    </Carousel>
  );
};
