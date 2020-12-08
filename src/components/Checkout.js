import React, {useContext, useEffect, useState}from 'react';

import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import {getCart,removeItem} from "./cartHelpers"
import Feed from '../components/Feed'

const Checkout =({products})=>{
    const getTotal = () =>{
        return products.reduce((currentValue,nextValue) =>{
            return currentValue+nextValue.count*nextValue.price
        },0)
    }
return <div>
    <h2> Total: ${getTotal()}</h2>
    <button className="btn btn-success"> Checkout</button>
    
    </div>

}
export default Checkout