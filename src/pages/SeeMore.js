import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import './SeeMore.css';


const SeeMore = () => {
    const { id } = useParams();
    const [art, setArt] = useState(null);
    const [content, setContent] = useState("");

    useEffect(() => {
        function loadArt() {
          return `http://localhost:5000/api/images/${id}`;
        }
        async function onLoad() {
          try {
            const artwork = await loadArt();
            const { content } = artwork;
    
            setContent(content);
            setArt(artwork);
          } catch (err) {
            console.log(err);
          }
        }
        onLoad();
      }, [id]);

    return (
        <div className="paragraphs">
            <h2 src={art.title}></h2>
        </div>
    )
} 
function SeeMore() {
    const [counter, setCounter] = React.useState(60);
  
    // Third Attempts
    React.useEffect(() => {
      const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
    }, [counter]);
  
    return (
      <div className="App">
        <div>Countdown: {counter}</div>
      </div>
    );
  }

export default SeeMore;