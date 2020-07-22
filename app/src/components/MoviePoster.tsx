import React from "react";
import cx from "classnames";
import SliderContext from "./context";
// import ShowDetailsButton from './ShowDetailsButton'
// import Mark from "./Mark";
import { Movie } from "model/Movie";

import "./MoviePoster.scss";

type MoviePosterProps = {
  key: number;
  movie: Movie;
};

type SliderContextProps = {
  onSelectMovie: (movie: Movie) => void;
  currentMovie: Movie;
  elementRef: any;
};

export const MoviePoster = (props: MoviePosterProps) => (
  <SliderContext.Consumer>
    {(contextProps: SliderContextProps) => {
      const isActive =
        contextProps.currentMovie &&
        contextProps.currentMovie.id === props.movie.id;

      return (
        <div
          ref={contextProps.elementRef}
          className={cx("item", {
            "item--open": isActive,
          })}
        >
          <img
            src={"http://image.tmdb.org/t/p/w342" + props.movie.poster_path}
            alt=""
            onClick={() => contextProps.onSelectMovie(props.movie)}
          />
          {/* <ShowDetailsButton onClick={() => contextProps.onSelectMovie(props.movie)} /> */}
          {/* {isActive && <Mark />} */}
          {isActive && <div className="mark" />}
        </div>
      );
    }}
  </SliderContext.Consumer>
);