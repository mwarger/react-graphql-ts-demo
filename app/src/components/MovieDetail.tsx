import React, { useRef, useLayoutEffect, FC } from 'react';
import { FaTimes } from 'react-icons/fa';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { red } from '@material-ui/core/colors';

import './MovieDetail.scss';

import { Movie } from 'model/Movie';
import { Button } from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';

const TOGGLE_FAVORITE = gql`
  mutation ToggleFavorite($movieId: ID!) {
    toggleFavoriteMovie(movieId: $movieId) {
      id
      favorites {
        id
      }
    }
  }
`;

type MovieDetailProps = {
  movie: Movie;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
};

export const MovieDetail: FC<MovieDetailProps> = (props) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [toggle] = useMutation(TOGGLE_FAVORITE, {
    variables: { movieId: props.movie.id },
  });

  const markFavorite = async () => {
    await toggle();
  };

  const scrollToBottom = () => {
    const theRef = scrollRef.current;
    theRef?.scrollIntoView({ behavior: 'smooth' });
  };

  useLayoutEffect(scrollToBottom, [props]);

  const castList = props.movie.cast?.slice(0, 5).map((cast) => (
    <li className="content__li" key={cast.name}>
      {cast.name}
    </li>
  ));

  return (
    <div className="movie-detail" ref={scrollRef}>
      <div className="movie-detail__background">
        <div className="movie-detail__background__shadow" />
        <div
          className="movie-detail__background__image"
          style={{
            backgroundImage: `url(${
              'http://image.tmdb.org/t/p/w1280' + props.movie.backdrop_path
            })`,
          }}
        />
      </div>
      <div className="movie-detail__area">
        <div className="movie-detail__area__container">
          <div className="movie-detail__title">{props.movie.title}</div>
          <div className="movie-detail__description">
            {props.movie.overview}
          </div>

          <ul>{castList}</ul>
          <Button
            onClick={markFavorite}
            variant="contained"
            startIcon={
              (props.movie.favorite && (
                <FavoriteIcon style={{ color: red[500] }} />
              )) ||
              (!props.movie.favorite && <FavoriteIcon />)
            }
          >
            Toggle Favorite
          </Button>
        </div>
        <button className="movie-detail__close" onClick={props.onClose}>
          <FaTimes size="3em" />
        </button>
      </div>
    </div>
  );
};
