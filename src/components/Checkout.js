import React, {useContext, useEffect, useState}from 'react';
import DropIn from "braintree-web-drop-in-react"
import { Link } from 'react-router-dom';
import ReactDOM from "react-dom";
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

   

 const showDropIn =() =>(
    
         
       
        <div>     
            <div> 
            <DropIn options={{
                authorization:data.clientToken
            }} onInstance={instance => (data.instance = instance)}/>
              
            
            
            </div> 
            <button onClick={buynow} className='order-btn'>Place order</button>
        </div>
     
 )
   
   
return(
  
    
    <React.Fragment>
        
        {showDropIn()}
  
    
    </React.Fragment>
   
)




}


export default Checkout