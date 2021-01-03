import React, {useContext, useEffect, useState}from 'react';
import DropIn from "braintree-web-drop-in-react"
import { useHttpClient } from '../components/hooks/http-hook';
import { Link } from 'react-router-dom';
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {getBrainTreeClientToken, processPayment, createOrder} from "./payments"
import {AuthContext} from "../context/auth-context";
import {emptyCart} from "./cartHelpers"

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
    let deliveryAddress = data.address
    let thename = data.name

    const auth = useContext(AuthContext);
    const userId = auth.userId;

    

      console.log("the dataaaa"+ deliveryAddress)
    
    const getToken = (userId) =>{
        console.log("entered gettoken")
    getBrainTreeClientToken(userId).then(data =>{ 
      
            setData({clientToken:data.clientToken})
     
        console.log(data.clientToken)
    })  
}
useEffect(() => {
    getToken(userId)
  }, []);

const handleAddress = event =>{
    setData(data.address = event.target.value)
}


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
        console.log(clicked)
        if (clicked === true){
            try {
                console.log(thenonce)
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
                         address:deliveryAddress,
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
                     console.log("it worked")
                    
                 })
               
               } catch (err) {}
            console.log("entered clicked")
            setNonce("hi")
            
            setClicked(false)

          
        }
        console.log(thenonce)
    })

    const sendorder = async (createOrderData) => { 
       console.log("entered senorder")
    
       try{
        
        
       await sendRequest(`http://localhost:5000/api/order/useraccount/${userId}`,'POST',JSON.stringify({
        
        body:JSON.stringify({order:createOrderData})
     
       }),{
         'Content-Type':'application/json'
       })
     } catch(err){}
     };

   
    
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
                <div className="gorm-group mb-3">
                    <label className="text-muted">Delivery address: </label>
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