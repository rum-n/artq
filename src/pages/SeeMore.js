import React, { useState, useEffect } from 'react';
import './SeeMore.css';

const SeeMore = ({match}) => {
  const [ counter, setCounter ] = useState(60);
  const [ state, setState ] = useState({})

  const artwork = async () => {
    const res = await fetch(`http://localhost:5000/api/images/${match.params.id}`);
    const item = await res.json();
    setState(item);
    console.log(item);
  };

  const timer = () => {
    counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }

  useEffect(()=> {
    artwork();
    timer();
  })

  return (
      <div className="paragraphs">
        <h1>Image title</h1>
        <h2>{state.title}</h2>
        <p>{state.price}</p>
        <div>Countdown: {counter}</div>
      </div>
  )
}

export default SeeMore;