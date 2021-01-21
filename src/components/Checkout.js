import React, {useContext, useEffect, useState}from 'react';
import DropIn from "braintree-web-drop-in-react"
import { useHttpClient } from '../components/hooks/http-hook';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getBrainTreeClientToken, createOrder} from "./payments"
import {AuthContext} from "../context/auth-context";
import {emptyCart} from "./cartHelpers"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

const Checkout =({ products })=>{
    const [ clicked, setClicked ] = useState(false)
    const [ thenonce, setNonce ] = useState('')
    const [ paycard, setPaycard ] = useState();
    let [location, setlocation] = useState("")
    const [loadedname,setloadedname] = useState("")
    const [loadedemail,setloadedemail] = useState("")
    let finalnonce = ""
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
   
    const [ data, setData ] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    })

    const [address,setaddress] = useState("")

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
        console.log(event.target.value)
        setData(data.address = event.target.value)
        setaddress(event.target.value)
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
                   "amount": getTotal(products)+products[0].susa
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
                let thename = ""
                let theemail = ""
                  await sendRequest(
                   `http://localhost:5000/api/braintree/payment/${userId}`,
                   'POST',
                   JSON.stringify({
                  paymentMethodNonce:nonce,
                   amount: getTotal(products)+products[0].susa
               }),
                   {
                     'Content-Type': 'application/json',Authorization: 'Bearer '+auth.token
                   }
                 ).then(paymentresponse =>{
                     let theloadedname = ""
                     let theloadedemail = ""
                    const getuserinfo = async(paymentresponse) =>{
                 
                        const response = await fetch(`http://localhost:5000/api/users/${auth.userId}`);
                        const responseData = await response.json();
                        
                        if (!response.ok) {
                          throw new Error(responseData.message);
                        }  
                        theloadedname = (responseData.userWithImages.name)
                        theloadedemail = (responseData.userWithImages.email)
                        const createOrderData = {
                            status:"Not Processed",
                            products:products,
                            name: responseData.userWithImages.name,
                            email:responseData.userWithImages.email,
                            transaction_id: paymentresponse.transaction.id,
                            sold: 1,
                            amount: paymentresponse.transaction.amount,
                            address:data.address,
                            user1: auth.userId,
                            artistid: products[0].author,
                           
                        }
                        if (paymentresponse.success === true){
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
                    }
                    getuserinfo(paymentresponse)
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

    useEffect(() =>{
        if ((products.length !== 0)){
        showDropIn()}
    },[location])
   
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
                {/* <Form.Group as={Row}>
          <Form.Label column sm="4">Country/Continent</Form.Label>
          <Col sm="6">
            <Form.Control 
              as='select' 
              defaultValue="Choose..." 
              value={location} 
              onChange={e => setlocation(e.target.value)}>
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
            <option value="Mexico">Mexico</option>
            <option value="China">China</option>
            <option value="India">India</option>
            <option value="Europe">Europe</option>
            <option value="Africa">Africa</option>
            <option value="Australia">Australia</option>
            <option value="Asia">Asia(not India or China)</option>
            </Form.Control>
          </Col>
        </Form.Group> */}
                
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