import React, { useEffect, useState}from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCart } from "./cartHelpers"
import Feed from '../components/Feed'
import Checkout from "./Checkout"
import './Cart.css';

const Cart =() => { 
    const [items, setItems] = useState([])

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
        <h2>
            Your cart is empty. <br/> <Link to="/shop">Continue Shopping</Link>
        </h2>
    }
    return(
        <div className='cart-wrapper'>
            <div className='payment-method-wrapper'>
                <h3>Payment method</h3>
                <h3>Shipping address</h3>
                <h3>Review order</h3>
            </div>
            <div className="order-summary">
                <h3>Order summary</h3>
                <div className="order-summary-details">
                    <div>
                    <br/>
                        <p>{items.length} {items.length === 1 ? "item" : "items"}</p>
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