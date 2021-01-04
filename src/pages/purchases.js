import React, { useState, useEffect, useContext }from 'react';
import './styles.css';
import {AuthContext} from "../context/auth-context";
import moment from "moment"
import {useHttpClient} from "../components/hooks/http-hook"

const Purchases = () => {
    const {sendRequest,clearError} = useHttpClient();
    const [history,setHistory] = useState([])
    const auth = useContext(AuthContext)
    const userId = auth.userId

    const getpurchases = async () => {

        try {
          const response = await fetch(`http://localhost:5000/api/users/orders/by/user/${auth.userId}`);
          const responseData = await response.json();
          
          if (!response.ok) {
            throw new Error(responseData.message);
          }  
          setHistory(responseData)
        } catch (err) {
        }
      };

      useEffect(() =>{
        getpurchases()
      })
    
      const purchaseHistory = history => {
        return (
            <div className="mb-5">
                <h3 className="card-header">Purchase history</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h, i) => {
                            return (
                                <div>
                                    <hr />
                                    {h.products.map((p, i) => {
                                        return (
                                            <div key={i}>
                                                <h6>Status: {h.status}</h6>
                                                <h6>Product name: {h.name}</h6>
                                                <h6>Product price: ${p.price}</h6>
                                                <h6>
                                                    Purchased date:{" "}
                                                    {moment(p.createdAt).fromNow()}
                                                </h6>
                                            </div>
                                        );
                                    })}
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
                    {purchaseHistory(history)}

                </div>

            </div>

        </div>
    )
} 

export default Purchases;