import React, { useRef, useLayoutEffect, FC } from 'react';
import { FaTimes } from 'react-icons/fa';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { red } from '@material-ui/core/colors';

import './MovieDetail.scss';

import { Movie } from 'model/Movie';
import { Button } from '@material-ui/core';
import { gql, useMutation, useQuery } from '@apollo/client';

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

const MOVIE_BY_ID = gql`
  query movieById($id: ID!) {
    movieById(id: $id) {
      id
      title
      overview
      poster_path
      backdrop_path
      cast {
        name
      }
    }
    user: me {
      id
      favorites {
        id
      }
    }
  }
`;

type MovieDetailProps = {
  id: string;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
};

export const MovieDetail: FC<MovieDetailProps> = (props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { loading, data } = useQuery(MOVIE_BY_ID, {
    variables: { id: props.id },
  });
  const [toggle] = useMutation(TOGGLE_FAVORITE, {
    variables: { movieId: props.id },
  });

  const markFavorite = async () => {
    await toggle();
  };

  const scrollToBottom = () => {
    const theRef = scrollRef.current;
    theRef?.scrollIntoView({ behavior: 'smooth' });
  };

  useLayoutEffect(scrollToBottom, [data?.movieById?.id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  const movie = data.movieById as Movie;

  const favorite = data.user?.favorites
    .map((favorite: Movie) => favorite.id)
    .includes(movie.id);

  const castList = movie.cast?.slice(0, 5).map((cast) => (
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
              'http://image.tmdb.org/t/p/w1280' + movie.backdrop_path
            })`,
          }}
        />
      </div>
      <div className="movie-detail__area">
        <div className="movie-detail__area__container">
          <div className="movie-detail__title">{movie.title}</div>
          <div className="movie-detail__description">{movie.overview}</div>

          <ul>{castList}</ul>
          <Button
            onClick={markFavorite}
            variant="contained"
            startIcon={
              (favorite && <FavoriteIcon style={{ color: red[500] }} />) ||
              (!favorite && <FavoriteIcon />)
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
