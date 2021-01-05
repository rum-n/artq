import React, { useEffect, useState,useContext}from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCart } from "./cartHelpers"
import Feed from '../components/Feed'
import Checkout from "./Checkout"
import './Cart.css';
import {getBrainTreeClientToken,processPayment} from "./payments"
import {AuthContext} from "../context/auth-context";
import DropIn from "braintree-web-drop-in-react"

const Cart =() => {
    const [items, setItems] = useState([])
    const [data,setData] = useState({
        success:false,
        clientToken:null,
        error:'',
        instance:{},
        address:''
    })
    const auth = useContext(AuthContext);
    const userId = auth.userId;
    useEffect(() => {
        getToken(userId)
      }, []);

    const getToken=(userId) =>{
    getBrainTreeClientToken(userId).then(data =>{ 
        if(data.error){
            setData({...data,error:data.error})
        } else{
            setData({clientToken:data.clientToken})
        }
    })  
}
    const getTotal = () =>{
        return items.reduce((currentValue,nextValue) =>{
            return currentValue+nextValue.count*nextValue.price
        },0)
    }
 
    const buynow = () =>{   
        let nonce;
        let getNonce = data.instance.requestPaymentMethod().then(data =>{
            const paymentData = {
                paymentMethodNonce:nonce,
                amount:getTotal(items)
            }
            processPayment(userId,paymentData)
            .then(response => { setData({...data,success:response.success})
        }).then(alert("Thank you for your purchase!"))
            .catch(error => console.log(error))
        }).catch(error =>{
            setData({...data,error:error.message})
        }) 
    }

    const showSuccess = success =>(
        <p
            className="alert alert-info"
            style={{display:success?"":"none"}}>
               Thanks, your payment was successful
        </p>
    )

 function ShowDropIn() {
   return(
       <div> 
           <p> refresh screen to go back</p>  
            <div> 
            <DropIn options={{
                authorization:data.clientToken
            }} onInstance={instance => (data.instance = instance)}/> 
            </div> 
            <button onClick={buynow} className='order-btn'>Place Order</button>  
        </div>
      );
    }

    function tick() {
        ReactDOM.render(     
          <ShowDropIn date={new Date()} />,
          document.getElementById('root')
        );
    }

    useEffect(() => {
        setItems(getCart())    
    },[])

    const showItems = props =>{
        return(
            <ul className="users-list">
            {props.map(user => (
              <Feed showAddToCartButton={false}
              showRemoveProductButton = {true}
              key={user.id}
              id={user.id}
              image={user.image}
              description={user.description}
              address={user.address}
              title={user.title}
              author={user.author}    
              duration={user.duration}
              dimentions={user.dimentions}
              type={user.type}
              price={user.price}
              medium={user.medium}
              />
            ))}
          </ul>
        )
    }
    
    const noItemsMessage =() =>{
        <p>Your cart is empty. <br/> <Link to="/shop">Continue Shopping</Link></p>
    }

    const gotopay =() =>{
        return( 
            setTimeout(tick, 1000))
    }

    return(
        <div className='cart-wrapper'>
            <div className='payment-method-wrapper'>
                {/* <button onClick = {gotopay} className='paypal-btn'><img src={paypal} alt='Paypal Logo'/></button> */}
                {/* <h3>Shipping address</h3>
                <Form className='shipping-form'>                
                    <Form.Row>
                        <Col>
                        <Form.Control type="text" name="country" placeholder="Country or region"/>
                        </Col>
                        <Col>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                    <Col>
                        <Form.Control type="text" name="firstname" placeholder="First name" />
                    </Col>
                    <Col>
                        <Form.Control type="text" name="lastname" placeholder="Last name" />
                    </Col>
                    </Form.Row>
                    <Form.Row>
                    <Col>
                        <Form.Control type="text" name="street" placeholder="Street Address" />
                    </Col>
                    <Col>
                        <Form.Control type="text" name="houseNumber" placeholder="Apt / Suite" />
                    </Col>
                    </Form.Row>
                    <Form.Row>
                    <Col>
                        <Form.Control type="text" name="city" placeholder="City" />
                    </Col>
                    <Col>
                        <Form.Control type="text" name="state" placeholder="State" />
                    </Col>
                    <Col>
                        <Form.Control type="text" name="zipCode" placeholder="Zip Code" />
                    </Col>
                    </Form.Row>
                    <Form.Row>
                    <Col>
                        <Form.Control type="text" name="phone" placeholder="Phone number" />
                    </Col>
                    <Col>
                    </Col>
                    </Form.Row>
                </Form>  */}
                <h3>Review order</h3>
               
                {items.length > 0 ? showItems(items) : noItemsMessage()}
                
                <h3>Payment method</h3>
                <h6>Paypal, Visa, Mastercard...</h6>
                <Checkout products={items}/>
            </div>
           
            <div className="order-summary">
                <h3>Order summary</h3>
                <div className="order-summary-details">
                    <div>
                    <br/>
                        {items.length > 0 ? <p>{items.length} {items.length === 1 ? "item" : "items"}</p> : noItemsMessage()}
                        <p>Shipping</p>
                        <span>Expected delivery:</span>
                        <p>Tax</p>
                        <br/>
                        <p>Order total</p>
                        ${getTotal(items)}
                    </div>
                    <div>
                        <p>{items.price}</p>
                    </div>
                </div>
            </div>
    </div>
    )
}

export default Cart;