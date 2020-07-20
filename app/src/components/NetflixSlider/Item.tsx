import React from "react";
import cx from "classnames";
import SliderContext from "./context";
// import ShowDetailsButton from './ShowDetailsButton'
import Mark from "./Mark";
import "./Item.scss";
import { Movie } from "../../model/Movie";

type ItemProps = {
  key: number;
  movie: Movie;
};

type SliderContextProps = {
  onSelectSlide: (movie: Movie) => void;
  currentSlide: Movie;
  elementRef: any;
};

const Item = (props: ItemProps) => (
  <SliderContext.Consumer>
    {(contextProps: SliderContextProps) => {
      const isActive =
        contextProps.currentSlide &&
        contextProps.currentSlide.id === props.movie.id;

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
            onClick={() => contextProps.onSelectSlide(props.movie)}
          />
          {/* <ShowDetailsButton onClick={() => contextProps.onSelectSlide(props.movie)} /> */}
          {isActive && <Mark />}
        </div>
      );
    }}
  </SliderContext.Consumer>
);

export default Item;
