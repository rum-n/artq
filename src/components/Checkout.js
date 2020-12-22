import React, {useContext, useEffect, useState}from 'react';
import DropIn from "braintree-web-drop-in-react"
import 'bootstrap/dist/css/bootstrap.min.css';
import {getBrainTreeClientToken} from "./payments"
import {AuthContext} from "../context/auth-context";

const Checkout =({ products })=>{
    const [ data, setData ] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    })

    const auth = useContext(AuthContext);
    const userId = auth.userId;

    useEffect(() => {
        getToken(userId)
      }, []);

      console.log("the dataaaa"+ data)

    const getToken = (userId) =>{
        console.log("entered gettoken")
    getBrainTreeClientToken(userId).then(data =>{ 
        if (data.error){
            setData({...data,error:data.error})
        } else {
            setData({...data,clientToken:data.clientToken})
        }
        console.log(data.clientToken)
    })  
}
    const getTotal = () =>{
        return products.reduce((currentValue, nextValue) =>{
            return currentValue+nextValue.count*nextValue.price
        }, 0)
    }
 
    const buynow = () => {
        let nonce;
        let getNonce = data.instance.requestPaymentMethod().then(data =>{
            nonce = data.nonce
        }).catch (error => {
            setData({...data, error:error.message})
        })
    }

    // const showDropIn = () => (
    // )
   
return (
        <div>
            {/* {showDropIn()} */}
            <DropIn 
                options = {{
                    authorization: data.clientToken
                }} 
                onInstance = { instance => (data.instance = instance)}
            />
            <button onClick={buynow} className='order-btn'>Place order</button>
        </div>
    )
}

export default Checkout