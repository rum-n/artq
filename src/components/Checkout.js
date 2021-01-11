import React, {useContext, useEffect, useState}from 'react';
import DropIn from "braintree-web-drop-in-react"
import { useHttpClient } from '../components/hooks/http-hook';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getBrainTreeClientToken, createOrder} from "./payments"
import {AuthContext} from "../context/auth-context";
import {emptyCart} from "./cartHelpers"

const Checkout =({ products })=>{
    const [ clicked, setClicked ] = useState(false)
    const [ thenonce, setNonce ] = useState('')
    const [ paycard, setPaycard ] = useState();
    let finalnonce = ""
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
   
    const [ data, setData ] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    })

    let deliveryAddress = data.address
    let thename = data.name

    const auth = useContext(AuthContext);
    const userId = auth.userId;
    
    const getToken = (userId) => {
        getBrainTreeClientToken(userId).then(data =>{ 
           
            setData({clientToken:data.clientToken})
        })
       
    }

    useEffect(() => {
        getToken(userId);
       
        // showDropIn();
        if (clicked){
            getnonce()
         };
        // sendOrderData();
    },[]);

    const handleAddress = event =>{
        setData(data.address = event.target.value)
    }

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
    
    const sendOrderData = async() =>{
        if (clicked === true){
            try {
                  await sendRequest(
                   `http://localhost:5000/api/braintree/payment/${userId}`,
                   'POST',
                   JSON.stringify({
                  "paymentMethodNonce":thenonce,
                   "amount": getTotal(products)
               }),
                   {
                     'Content-Type': 'application/json',Authorization: 'Bearer '+auth.token
                   }
                 ).then(response =>{
                     
                     const createOrderData = {
                         products:products,
                         name: "thename",
                         transaction_id: response.transaction.id,
                         sold: 1,
                         amount: response.transaction.amount,
                         address:"nyc",
                         user1: auth.userId,
                         artistid: products[0].author 
                     }
                     if (response.success == true){
                        
                        createOrder(userId,createOrderData)
                        
                         emptyCart(() =>{
                             console.log("emptied cart")
                         })
                         setData({
                             success:true
                         })
                     }
                 })
               
               } catch (err) {}
            setNonce("hi")
            setClicked(false)
        }
    }

    const sendtobraintree = async(nonce) =>{
        console.log("enteredbraintree")
        console.log(nonce)
        console.log(getTotal(products))
       
            try {
                  await sendRequest(
                   `http://localhost:5000/api/braintree/payment/${userId}`,
                   'POST',
                   JSON.stringify({
                  paymentMethodNonce:nonce,
                   amount: getTotal(products)
               }),
                   {
                     'Content-Type': 'application/json',Authorization: 'Bearer '+auth.token
                   }
                 ).then(response =>{
                    console.log(auth.userId)
                    console.log(response)
                    console.log(response.transaction.amount)
                    const createOrderData = {
                        status:"Not Processed",
                        products:products,
                        name: "thename",
                        transaction_id: response.transaction.id,
                        sold: 1,
                        amount: response.transaction.amount,
                        address:"nyc",
                        user1: auth.userId,
                        artistid: products[0].author,
                       
                    }
                    if (response.success == true){
                        console.log(auth.userId)
                        
                        createOrder(auth.userId,createOrderData)
                        sendorder(createOrderData)
                       
                        emptyCart(() =>{
                            console.log("emptied cart")
                        })
                        setData({
                            success:true
                        })
                    }
                })
               
               } catch (err) {
                   console.log(err)
               }
            
        
    }

    const changeclick = () =>{
        setClicked(true)
    }

  
    const sendorder = async (createOrderData) => { 
        console.log(createOrderData)
       try {
       await sendRequest(`http://localhost:5000/api/order/create/${userId}`,'POST',JSON.stringify({
        createOrderData
       }),{
         'Content-Type':'application/json'
       })
     } catch(err){
         alert(err)
         console.log(err)
     }
    };
    

    

    const getnonce =  () =>{
        console.log("entered nonce")
        let nonce = '';
        data.instance.requestPaymentMethod().then(data =>{
            nonce = data.nonce
            setNonce(nonce)
            sendtobraintree(nonce)
        })
       
    }
    
    const buynow = () => {
        
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
        .then(data =>{
            console.log(data)
            nonce = data.nonce
            console.log("send nonce and total to process: ",nonce,getTotal(products))
        })
        .catch(error =>{
            console.log(error)
        })
    }
   
    const showDropIn = () =>(

        setPaycard(
        <div onBlur={() => setData({...data, error:""})}>     
            <div> 
                <div className="form-group mb-3">
                    <label style={{marginTop: '0.5rem'}} className="text-muted">Delivery address: </label>
                    <textarea 
                    onChange={handleAddress} 
                    className = "form-control"
                    value = {data.address}
                    placeholder="Type Delivery Address"
                    />
                </div>
                
            <DropIn options={{
                authorization:data.clientToken,
                paypal:{
                    flow:"vault"
                }
            }} onInstance={instance => (data.instance = instance)}/>
            <button onClick={getnonce} className='order-btn'>Place order</button>
            
            </div> 
            
           
        </div>
    ))
   
return(
    <React.Fragment>
        <button onClick={showDropIn}>Click Here to Enter Payment Info</button>
        {showSuccess(data.success)}
        {showError(data.error)}
        {paycard}
    </React.Fragment>
    )
}

export default Checkout;