import React, { useState, useEffect } from 'react';
import './SeeMore.css';
import { useLocation } from "react-router-dom";

const SeeMore = ({match}) => {
  let data = useLocation();
  let theid = data.state.theid
  console.log(data.state.theid);
  console.log(useLocation())
  const [ counter, setCounter ] = useState(60);
  const [ state, setState ] = useState({})

  useEffect(() => {
    const sendRequest = async () => {

      try {
        const response = await fetch(`http://localhost:5000/api/images/${theid}`);
        console.log(response)
        const responseData = await response.json();
        

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        
        setState(responseData.image);
       console.log(responseData.image)
       
      } catch (err) {
        alert(err)
      }
    
    };
    sendRequest();
  }, []);
  console.log(state)

  return (
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
            <p>{Date.now - state.duration}</p> 
            {/* this should be something like that but I'll figure it out later */}
            <p>11 bids</p>
            {/* we don't have number of bids right now */}
            <p>{state.medium}</p>
            <p>{state.dimentions}</p>
          </div>
        </div>
        <h2></h2>
        {/* <div>Countdown: {counter}</div> */}
      </div>
  )
}

export default SeeMore;