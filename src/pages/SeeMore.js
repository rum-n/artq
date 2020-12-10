import React, { useState, useEffect } from 'react';
import './SeeMore.css';
import { useLocation } from "react-router-dom";
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'

const SeeMore = ({match}) => {
  let data = useLocation();
  let theid = data.state.theid
  const [ counter, setCounter ] = useState(60);
  const [ state, setState ] = useState({})

  useEffect(() => {
    const sendRequest = async () => {

      try {
        const response = await fetch(`http://localhost:5000/api/images/${theid}`);
        const responseData = await response.json();
        
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setState(responseData.image);

      } catch (err) {
        alert(err)
      }
    };
    sendRequest();
  }, []);

  return (
    <React.Fragment>
      <div className='seemore-img'>
        <img src={state.url} alt={state.title} />
      </div>
      <div className="seemore-details">
        <h1>{state.title}</h1>
        <div className="seemore-details-table">
          <div className="seemore-details-table-left">
            <h2>{state.author}</h2>
            <p>Current price</p>
            <p>Time remaining</p>
            <p>Bids</p>
            <p>Medium</p>
            <p>Dimensions</p>
          </div>
          <div div className="seemore-details-table-right">
            <h2>{state.address}</h2>
            <p>{state.price}</p>
            <p>{counter}</p> 
            <p>11 bids</p>
            {/* we don't have number of bids right now */}
            <p>{state.medium}</p>
            <p>{state.dimentions}</p>
          </div>
        </div>
      </div>
      <div className='seemore-btn-wrapper'>
        <button className='seemore-add'>Add to cart</button>
        <p>Save for later</p>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Place bid"
            aria-label="bid"
            aria-describedby="bid"
          />
          <InputGroup.Append>
            <Button className='seemore-add'>Place bid</Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
    </React.Fragment>
  )
}

export default SeeMore;