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
          const response = await fetch(`https://localhost:5000/api/users/orders/by/user/${userId}`);
          const responseData = await response.json();
          
          if (!response.ok) {
            throw new Error(responseData.message);
          }  
          setHistory(responseData.userWithImages)
         
        } catch (err) {
            console.log(err)
        }
      };

      useEffect(() =>{
        getPurchases()
      }, [userId])
    
      const purchaseHistory = history => {
        return (
            <div className="history-wrapper">
                <h1 className="feed-title">Purchase history</h1>
                <div className="purchases-wrapper">
                    {history.map((h, i) => {
                        return (
                        <div key={i}>
                            {h.products.map((p, i) => {
                                return (
                                <div key={i}>
                                    <div className='purchase-time'>
                                    <h6>
                                        Purchased: {moment(p.createdAt).fromNow()}
                                    </h6><hr/>
                                    </div>
                                    <div className='purchase-row'>
                                        <div className='purchase-img'>
                                        
                                        </div>   
                                        <div className='purchase-info'>
                                            <h5>{h.products[0].name}</h5>
                                            <p>Status: {h.status}</p>
                                        </div>
                                        <div className='product-price'>
                                            <h6>${(p.price).toFixed(2)}</h6>
                                        </div>
                                        <div className='price-total'>
                                            <h4>Total: </h4>
                                        </div>
                                    </div>
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