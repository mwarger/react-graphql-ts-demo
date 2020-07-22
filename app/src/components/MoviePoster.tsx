import React from "react";
import cx from "classnames"; // TODO: understand this
import { CarouselContext, CarouselContextProps } from "./CarouselContext";
import { Movie } from "model/Movie";

import "./MoviePoster.scss";

type MoviePosterProps = {
  key: number;
  movie: Movie;
};

export const MoviePoster = (props: MoviePosterProps) => (
  <CarouselContext.Consumer>
    {(contextProps: CarouselContextProps) => {
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
  </CarouselContext.Consumer>
);