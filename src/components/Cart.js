import React, { useEffect, useState,useContext}from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCart } from "./cartHelpers"
import Feed from '../components/Feed'
import Checkout from "./Checkout"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import './Cart.css';
import {getBrainTreeClientToken,processPayment} from "./payments"
import {AuthContext} from "../context/auth-context";
import DropIn from "braintree-web-drop-in-react"

const Cart =() => {
    const [items, setItems] = useState([])
    let [location, setlocation] = useState("")
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
            return currentValue+(nextValue.count)*nextValue.price
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
              url={user.url}
              description={user.description}
              address={user.address}
              title={user.title}
              author={user.author}    
              duration={user.duration}
              dimentions={user.dimentions}
              peoplewholiked = {user.peoplewholiked}
              likes = {user.likes}
              type={user.type}
              price={user.price}
              medium={user.medium}
              />
            ))}
          </ul>
        )
    }
    
    const noItemsMessage = () =>{
        <p>Your cart is empty. <br/> <Link to="/feed">Continue Shopping</Link></p>
    }

    const gotopay =() =>{
        return( 
            setTimeout(tick, 1000))
    }
    {console.log(items)}

    return(
        <div className='cart-wrapper'>
            <div className='payment-method-wrapper'>
                <h3>Review order</h3>
                {items.length > 0 ? showItems(items) : <p>Your cart is empty. <br/> <Link to="/">Continue Shopping</Link></p>}
                <h3>Payment & delivery</h3>
               
                <Form.Group as={Row}>
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
        </Form.Group>
     
                <Checkout products={items} shipping={location}/>
                </div>
                
        
            <div className="order-summary">
                <h3>Order summary</h3>
                <div className="order-summary-details">
                    {items[0] &&
                    <div>
                    <br/>
                    {console.log(items)}
                        {items.length > 0 ? <p>{items.length} {items.length === 1 ? "item" : "items"}</p> : <p>0 items</p>}
                        {location == "USA" &&
                        <div>
                        <p>Shipping: ${items[0].susa}</p>
                        <span>Expected delivery: {items[0].tusa} weeks</span>
                        <p>Order total</p>
                        ${getTotal(items)+items[0].susa}
                        </div>}
                        {location == "Canada" &&
                        <div>
                        <p>Shipping: ${items[0].scanada}</p>
                        <span>Expected delivery: {items[0].tcanada} weeks</span>
                        <p>Order total</p>
                        ${getTotal(items)+items[0].scanada}
                        </div>}
                        {location == "Mexico" &&
                        <div>
                        <p>Shipping: ${items[0].smexico}</p>
                        <span>Expected delivery: {items[0].tmexico} weeks</span>
                        <p>Order total</p>
                        ${getTotal(items)+items[0].smexico}
                        </div>}
                        {location == "Africa" &&
                       <div>
                       <p>Shipping: ${items[0].seurope}</p>
                       <span>Expected delivery: {items[0].teurope} weeks</span>
                       <p>Order total</p>
                        ${getTotal(items)+items[0].seurope}
                       </div>}
                        {location == "China" &&
                        <div>
                        <p>Shipping: ${items[0].schina}</p>
                        <span>Expected delivery: {items[0].tchina} weeks</span>
                        <p>Order total</p>
                        ${getTotal(items)+items[0].schina}
                        </div>}
                        {location == "India" &&
                        <div>
                        <p>Shipping: ${items[0].sindia}</p>
                        <span>Expected delivery: {items[0].tindia} weeks</span>
                        <p>Order total</p>
                        ${getTotal(items)+items[0].sindia}
                        </div>}
                        {location == "Asia(not India or China)" &&
                        <div>
                        <p>Shipping: ${items[0].sasia}</p>
                        <span>Expected delivery: {items[0].tasia} weeks</span>
                        <p>Order total</p>
                        ${getTotal(items)+items[0].sasia}
                        </div>}
                        {location == "Australia" &&
                        <div>
                        <p>Shipping: ${items[0].saustralia}</p>
                        <span>Expected delivery: {items[0].taustralia} weeks</span>
                        <p>Order total</p>
                        ${getTotal(items)+items[0].saustralia}
                        </div>}
                        
                        <p>Tax</p>
                        <br/>
                        
                    </div>}
                </div>
            </div>
    </div>
    )
}

export default Cart;