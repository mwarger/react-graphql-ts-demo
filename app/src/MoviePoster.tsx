import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Movie } from './model/Movie';

import now_playing from './mock/now_playing.json';
import popular from './mock/popular.json';

interface RouteParams {
  id: string
}

export const MoviePoster = (match: string) => {

  const params = useParams<RouteParams>();

  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    const fetchData = () => {
      let mergedMovies: Movie[] = [...popular, ...now_playing];
      let selected: Movie | undefined = mergedMovies.find(movie => movie.id === parseInt(params.id));
      setMovie(selected);
    }
    fetchData();
  }, [params.id]);

  return (
    <aside>
      {movie && <h2>{movie?.title}</h2>}
      {movie && <img src={"http://image.tmdb.org/t/p/w1280" + movie?.backdrop_path} className="" alt="posterURL" />}
      <p>
        {movie && movie.overview}
      </p>
    </aside>
  );
}