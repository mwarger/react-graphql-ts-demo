import React from 'react';
import { useHistory } from 'react-router-dom';
import { Movie } from './model/Movie';

type MovieTileProps = {
    movie: Movie
}

export const MovieTile = (props: MovieTileProps) => {
    const history = useHistory();

    function onClick() {
      history.push("/movies/" + props.movie.id);
    }

    return (
        <img src={"http://image.tmdb.org/t/p/w300" + props.movie.poster_path} alt="" onClick={ onClick }/>
    )
}
