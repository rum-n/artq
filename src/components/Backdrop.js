import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

const Backdrop = props => {
  return (
  <div className="backdrop" onClick={props.onClick}>{ ReactDOM.createPortal(
      
    document.getElementById('backdrop-hook'))}</div>
  )
  
};

export default Backdrop;
