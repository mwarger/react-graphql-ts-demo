import React from 'react';
import IconArrowDown from '../Icons/IconArrowDown'
import './ShowDetailsButton.scss'

const ShowDetailsButton = ({ onClick }: any) => (
  <button onClick={onClick} className="show-details-button">
    <span>
      <IconArrowDown />
    </span>
  </button>
);

export default ShowDetailsButton;
