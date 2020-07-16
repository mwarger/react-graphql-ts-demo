import React, { useRef, useLayoutEffect } from 'react';
import IconCross from '../Icons/IconCross';
import './Content.scss';

import { Movie } from '../../model/Movie';

type ContentProps = {
  movie: Movie
  onClose: any
}

const Content = (props: ContentProps) => {

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const theRef = scrollRef.current;
    theRef?.scrollIntoView({ behavior: "smooth" })
  }

  useLayoutEffect(scrollToBottom, [props]);

  const castList = props.movie.cast?.slice(0, 5).map((cast) =>
    <li className="content__li" key={cast.id}>{cast.name}</li>
  );

  return (
    <div className="content" ref={scrollRef}>
      <div className="content__background">
        <div className="content__background__shadow" />
        <div
          className="content__background__image"
          style={{ 'backgroundImage': `url(${"http://image.tmdb.org/t/p/w1280" + props.movie.backdrop_path})` }}
        />
      </div>
      <div className="content__area">
        <div className="content__area__container">
          <div className="content__title">{props.movie.title}</div>
          <div className="content__description">
            {props.movie.overview}
          </div>

          <ul>
            {castList}
          </ul>
          <button className="content__button">+ Add to Favorites</button>
        </div>
        <button className="content__close" onClick={props.onClose}>
          <IconCross />
        </button>
      </div>
    </div>
  );
}

export default Content;
