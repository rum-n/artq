import React, { useState, useEffect } from 'react';
import './SeeMore.css';
import {useLocation} from "react-router-dom";

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
  console.log("title"+ state.title)


  useEffect(()=> {

  })

  return (
      <div className="paragraphs">
        <h1>Image title</h1>
        <h2>{state.title}</h2>
        <p>{state.price}</p>
        {/* <div>Countdown: {counter}</div> */}
      </div>
  )
}

export default SeeMore;