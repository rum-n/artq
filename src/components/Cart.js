import React, { useEffect, useState}from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCart } from "./cartHelpers"
import Feed from '../components/Feed'
import Checkout from "./Checkout"
import './Cart.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import paypal from './../assets/paypal.png';

const Cart =() => { 
    const [items, setItems] = useState([])

    useEffect(() => {
        setItems(getCart())
    },[])

    console.log(items);

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

    return(
        <div className='cart-wrapper'>
            <div className='payment-method-wrapper'>
                <h3>Payment method</h3>
                <button className='paypal-btn'><img src={paypal} alt='Paypal Logo'/></button>
                <h3>Shipping address</h3>
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
                </Form> 
                <h3>Review order</h3>
                <p>{items.title}</p>
            </div>
            <div className="order-summary">
                <h3>Order summary</h3>
                <div className="order-summary-details">
                    <div>
                    <br/>
                        {items.length > 0 ? <p>{items.length} {items.length === 1 ? "item" : "items"}</p> : noItemsMessage}
                        <p>Shipping</p>
                        <span>Expected delivery:</span>
                        <p>Tax</p>
                        <br/>
                        <p>Order total</p>
                    </div>
                    <div>
                        <p>{items.price}</p>
                    </div>
                </div>
                <button className='order-btn'>Place order</button>
            </div>
{/* 
            <div>
                <p>Manage your cart items. Add, remove, checkout, or continue shopping</p>
                
            </div>
        <div className="row">
            {items.length > 0 ? showItems(items): noItemsMessage()}
        </div>
        <div className="col-6">
            <h2>You cart summary</h2>
            <hr/>
            <Checkout products={items}/>
        </div> */}
    </div>
    )
}
export default Cart;