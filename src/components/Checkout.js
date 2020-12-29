import React, {useContext, useEffect, useState}from 'react';
import DropIn from "braintree-web-drop-in-react"
import { useHttpClient } from '../components/hooks/http-hook';
import { Link } from 'react-router-dom';
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {getBrainTreeClientToken, processPayment} from "./payments"
import {AuthContext} from "../context/auth-context";

const Checkout =({ products })=>{
    const [ clicked, setClicked ] = useState(false)
    const [ thenonce, setNonce ] = useState('')
    const [paycard,setpaycard] = useState([]);
    let finalnonce = ""
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
   
    const [ data, setData ] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    })

    const auth = useContext(AuthContext);
    const userId = auth.userId;

    

      console.log("the dataaaa"+ data)
    
    const getToken = (userId) =>{
        console.log("entered gettoken")
    getBrainTreeClientToken(userId).then(data =>{ 
        if (data.error){
            setData({...data,error:data.error})
        } else {
            setData({clientToken:data.clientToken})
        }
        console.log(data.clientToken)
    })  
}
useEffect(() => {
    getToken(userId)
  }, []);

 useEffect(() =>{
    if (clicked === true){
        {getnonce()}
       }
 })
 


    const getTotal = () =>{
        return products.reduce((currentValue, nextValue) =>{
            return currentValue+nextValue.count*nextValue.price
        }, 0)
    }

    const showError = error => (
        <div
            className="alert alert-danger" style={{display:error ? " ":"none"}}>
                {error}
        </div>
    )

    const showSuccess = success => (
        <div
            className="alert alert-info" style={{display:success ? " ":"none"}}>
                Thanks! Your payment was successful
        </div>
    )
    
    useEffect( async() =>{
        if (clicked === true){
            try {
           
            
                console.log(thenonce)
                  await sendRequest(
                   `http://localhost:5000/api/braintree/payment/5fc15b5be27c0c6e35dbb8e2`,
                   'POST',
                   JSON.stringify({
                  "paymentMethodNonce":thenonce,
                   "amount": getTotal(products)
                    
               }),
                   {
                     'Content-Type': 'application/json',Authorization: 'Bearer '+auth.token
                   }
                 ).then(response =>{
                     console.log(response)
                     console.log("it worked")
                    
                 })
               
               } catch (err) {alert("nah bruh it didnt work")}
            console.log("entered clicked")
            setNonce("hi")
            
            setClicked(false)
          
        }
        console.log(thenonce)
        
        
       

    

    })
    
    const getnonce =  () =>{
        
        let nonce = '';
       
        console.log("entered")
      
        
        data.instance.requestPaymentMethod().then(data =>{
            //console.log(data)
            nonce = data.nonce
            
            
            setNonce(nonce)
            console.log(thenonce)
            console.log("send nonce and total to process: ",nonce,getTotal(products))
       
            
           
           
           
        
       
    
        })
      
       
    }

    const buynow = async event => {
       
        setClicked(true)
       
      
    }
   
    const showDropIn =() =>(

       
    
        setpaycard(
       
        <div onBlur={() => setData({...data, error:""})}>     
            <div> 
            <DropIn options={{
                authorization:data.clientToken
            }} onInstance={instance => (data.instance = instance)}/>
              
              
            
            
            </div> 
            <button onClick={buynow} className='order-btn'>Place order</button>
        </div>)

     
 
        )
        
        
       
  
   
return(
  
    
    <React.Fragment>
         <button value="MacBook Pro" onClick={showDropIn}>Click Here to Enter Payment Info</button>
       
        {showSuccess(data.success)}
        {showError(data.error)}
        {paycard}
       
      
  
    
    </React.Fragment>
   
)
        



}


export default Checkout