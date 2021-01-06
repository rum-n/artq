import React, { useState, useEffect, useContext }from 'react';
import './styles.css';
import {AuthContext} from "../context/auth-context";
import moment from "moment"
import {useHttpClient} from "../components/hooks/http-hook"

const CurrentBids = () => {
    const {sendRequest,clearError} = useHttpClient();
    const [history,setHistory] = useState([])
    const auth = useContext(AuthContext)
    const userId = auth.userId

    const getbids = async () => {

        try {
          const response = await fetch(`http://localhost:5000/api/bid/user/${userId}`);
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
      })
    
      const bidHistory = history => {
        return (
            <div className="mb-5">
                <h3 className="card-header">Your Bids</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h, i) => {
                            return (
                                <div>
                                    <hr/>
                                  <div key={i}>
                                  <h6>Status: {h.status}</h6>
                                                
                                                <h6>Art title: {h.title}</h6>
                                                <h6>Art bid: ${h.bid}</h6>
                                                <h6>
                                                    Placed bid:{" "}
                                                    {moment(h.createdAt).fromNow()}
                                                </h6>
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
        <div className="container-fluid">
            <div className="row">
                <div className="col-9">
                    {bidHistory(history)}

                </div>

            </div>

        </div>
    )
} 

export default CurrentBids;