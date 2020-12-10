import React, { useEffect, useState}from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCart } from "./cartHelpers"
import Feed from '../components/Feed'
import Checkout from "./Checkout"

const Cart =() =>{ 
    const [items,setItems] = useState([])
    useEffect(() =>{
        setItems(getCart())

    },[items])
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
        <div>
        <div>
            <text>Manage your cart items. Add, remove, checkout, or continue shopping</text>
    <h1>You cart has {`${items.length}`} items</h1>
        </div>
    <div className="row">
        {items.length > 0 ? showItems(items): noItemsMessage()}

    </div>
    <div className="col-6">
        <h2>You cart summary</h2>
        <hr/>
        <Checkout products={items}/>

    </div>
    </div>
    )
}
export default Cart;