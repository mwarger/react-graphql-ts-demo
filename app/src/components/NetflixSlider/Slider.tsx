import React, { useState, useRef } from "react";
import cx from "classnames";
import SliderContext from "./context";
import Content from "./Content";
import SlideButton from "./SlideButton";
import SliderWrapper from "./SliderWrapper";
import useSliding from "./useSliding";
import useSizeElement from "./useSizeElement";
import "./Slider.scss";
import { Movie } from "model/Movie"; // TIP baseUrl in tsconfig lets you start at the baseUrl (src)

type SliderProps = {
  children: any;
  activeSlide?: any;
  title: string;
};

const Slider = (props: SliderProps) => {
  const [currentSlide, setCurrentSlide] = useState<Movie | null>(
    props.activeSlide
  );
  const { width, elementRef } = useSizeElement();
  const {
    handlePrev,
    handleNext,
    slideProps,
    containerRef,
    hasNext,
    hasPrev,
  } = useSliding(width, React.Children.count(props.children));

  const titleRef = useRef<HTMLDivElement>(null);

  const handleSelect = (movie: Movie) => {
    setCurrentSlide(movie);
  };

  const handleClose = () => {
    setCurrentSlide(null);
    const theRef = titleRef.current;
    console.log("scrolling to", theRef);
    theRef?.scrollIntoView({ behavior: "smooth" });
  };

  const contextValue = {
    onSelectSlide: handleSelect,
    onCloseSlide: handleClose,
    elementRef,
    currentSlide,
  };

  return (
    <SliderContext.Provider value={contextValue}>
      <h2 className="heading__slider" ref={titleRef}>
        {props.title}
      </h2>
      <SliderWrapper>
        <div className={cx("slider", { "slider--open": currentSlide != null })}>
          <div ref={containerRef} className="slider__container" {...slideProps}>
            {props.children}
          </div>
        </div>
        {hasPrev && <SlideButton onClick={handlePrev} type="prev" />}
        {hasNext && <SlideButton onClick={handleNext} type="next" />}
      </SliderWrapper>
      {currentSlide && <Content movie={currentSlide} onClose={handleClose} />}
    </SliderContext.Provider>
  );
};

export default Slider;
