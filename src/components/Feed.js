import React, { useState } from "react";
import PaypalButtons from "../pages/paypal";
import data from "./data";
import './styles.css';

const Feed = () => {
  const [showPaypal, setShowPaypal] = useState(false); 
  const [images, setImages] = useState(data);

  const showPaypalButtons = () => {
    setShowPaypal(true);
  }

  return (
    showPaypal ? <PaypalButtons /> : images.map(painting => (
      <div className='outer-artwork'>
        <div key={painting.title} className="artwork-card">
            <img src={painting.url} alt={painting.title}/>
            <p>Title: {painting.title}</p>  
            <p>Author: {painting.author}</p>  
            <p>Cost: {painting.cost}</p>
            <button onClick={showPaypalButtons}> Pay </button>
          <br></br>
        </div>
      </div>))
    );
 
  }

export default Feed;