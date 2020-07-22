import React, { FunctionComponent, useState, useRef } from "react";
import cx from "classnames"; // TODO: understand this
import { CarouselContext, CarouselContextProps } from "./CarouselContext";
import { CarouselButton } from "./CarouselButton";
import useCarousel from "./useCarousel";
import useSizeElement from "./useSizeElement";
import { MovieDetail } from "./MovieDetail";
import { Movie } from "model/Movie";

import "./Carousel.scss";

type CarouselProps = {
  title: string;
  activeMovie?: any;
};

export const Carousel: FunctionComponent<CarouselProps> = (props) => {
  const [currentMovie, setCurrentMovie] = useState<Movie | undefined>(
    props.activeMovie
  );
  const { width, elementRef } = useSizeElement();
  const {
    handlePrev,
    handleNext,
    carouselProps,
    containerRef,
    hasNext,
    hasPrev,
  } = useCarousel(width, React.Children.count(props.children));

  const titleRef = useRef<HTMLDivElement>(null);

  const handleSelect = (movie: Movie) => {
    setCurrentMovie(movie);
  };

  const handleClose = () => {
    setCurrentMovie(undefined);
    const theRef = titleRef.current;
    console.log("scrolling to", theRef);
    theRef?.scrollIntoView({ behavior: "smooth" });
  };

  const contextValue: CarouselContextProps = {
    onSelectMovie: handleSelect,
    onCloseDetail: handleClose,
    elementRef,
    currentMovie,
  };

  return (
    <CarouselContext.Provider value={contextValue}>
      <h2 className="heading__slider" ref={titleRef}>
        {props.title}
      </h2>
      <div className="slider-wrapper">
        <div className={cx("slider", { "slider--open": currentMovie != null })}>
          <div ref={containerRef} className="slider__container" {...carouselProps}>
            {props.children}
          </div>
        </div>
        {hasPrev && <CarouselButton onClick={handlePrev} type="prev" />}
        {hasNext && <CarouselButton onClick={handleNext} type="next" />}
      </div>
      {currentMovie && <MovieDetail movie={currentMovie} onClose={handleClose} />}
    </CarouselContext.Provider>
  );
};