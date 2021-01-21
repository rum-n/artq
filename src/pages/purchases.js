import React, { useState, useEffect, useContext } from 'react';
import './purchases.css';
import { AuthContext } from "../context/auth-context";
import moment from "moment"

const Purchases = () => {
    const [ history, setHistory ] = useState([])
    const auth = useContext(AuthContext)
    const userId = auth.userId

    const getPurchases = async () => {

        try {
          const response = await fetch(`http://localhost:5000/api/users/orders/by/user/${userId}`);
          const responseData = await response.json();
          
          if (!response.ok) {
            throw new Error(responseData.message);
          }  
          setHistory(responseData.userWithImages)
         
        } catch (err) {
        }
      };

      useEffect(() =>{
        getPurchases()
      })
    
      const purchaseHistory = history => {
        return (
            <div className="history-wrapper">
                <h1 className="feed-title">Purchase history</h1>
                <div className="purchases-wrapper">
                    {history.map((h, i) => {
                        return (
                        <div>
                            <hr/>
                            {h.products.map((p, i) => {
                                return (
                                <div key={i}>   
                                    <h6>Status: {h.status}</h6>
                                    <h6>Product name: {h.name}</h6>
                                    <h6>Product price: ${p.price}</h6>
                                    <h6>
                                        Purchased:{" "}
                                        {moment(p.createdAt).fromNow()}
                                    </h6>
                                </div>
                                );
                            })}
                        </div>);
                    })}
                </div>
            </div>
        );
    };

    return(
        purchaseHistory(history)
    )
} 

export default Purchases;