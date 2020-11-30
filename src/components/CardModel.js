import React from 'react';

import './CardModel.css';

const CardModel = props => {
  return (
    <div className={`cardmodel ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default CardModel;
