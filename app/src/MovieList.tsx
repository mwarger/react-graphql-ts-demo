import React, { useState, ChangeEvent } from 'react';

import { Movie } from './model/Movie';
import { MovieTile } from './MovieTile';

type MovieListProps = {
  title: string,
  movies: (Movie | null)[] // NowPlayingQuery['nowPlaying']
}

export const MovieList = (props: MovieListProps) => {

  const [filterText, setFilterText] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  }

  const movieFiltered = props.movies.filter(movie => movie?.title.toLowerCase()
    .includes(filterText.toLowerCase()))


  return (
    <div className="movie-container">
      <input
        type="text"
        placeholder="Filter..."
        value={filterText}
        onChange={onChange}
      />
      <ul>
        {movieFiltered.map(movie =>
          movie && <li key={movie.id}><MovieTile movie={movie} /></li>
        )}
      </ul>
    </div>
  )
}



