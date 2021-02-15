import React, { useState, useEffect, useContext }from 'react';
import './currentBids.css';
import {AuthContext} from "../context/auth-context";
import moment from "moment"
import { Link } from "react-router-dom";

const CurrentBids = () => {
    const [history,setHistory] = useState([])
    const auth = useContext(AuthContext)
    const userId = auth.userId

    const getbids = async () => {

        try {
          const response = await fetch(`http://165.227.117.138:5000/api/bid/user/${userId}`);
          const responseData = await response.json();
          
          if (!response.ok) {
            throw new Error(responseData.message);
          }  
          setHistory(responseData.userWithImages)
        } catch (err) {
        }
      };

      useEffect(() =>{
        getbids()
        bidHistory(history)
      })

      const bidHistory = history => {
        return (
            <div className='bids-wrapper'>
                <ul className="list-group">
                  <li >
                    {history.map((h, i) => {
                      return (
                      <div className="bid-card" key={i}>
                          <img src={h.url} alt={h.title} />
                          <div className='bid-text'>                                             
                            <h3>{h.title}</h3>
                            <p>{h.medium}</p>
                            <p>{h.dimentions}</p>
                          </div>
                          <div className='bid-details'>
                            <p>Status: {h.status}</p>
                            <p>Art bid: ${h.bid}</p>
                            <p>Placed bid:{" "} {moment(h.createdAt).fromNow()}</p>
                            {h.status === "You won the bid!" && history && 
                            <Link 
                            className="text-danger"
                            to={{ 
                              pathname: `/seemore/${h.artId}`,
                              state: { thedata:h , theid: h.artId}
                            }}>
                              Click to Buy!
                            </Link>}
                          </div>
                      </div>
                    );
                    })}
                  </li>
                </ul>
            </div>
        );
    };

    return(
        <div>  
          {bidHistory(history)}
        </div>
    )
} 

export default CurrentBids;