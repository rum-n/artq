import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SideNav.css';
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/auth-context";
import cartimg from "../assets/cart.png";
import {itemTotal} from "./cartHelpers"

const SideNav = () => {
    const [ hover, setHover ] = useState(false);
    const auth = useContext(AuthContext)
    let linkStyle;

    const mouseOver = () => {
        setHover(true);
        linkStyle = {
            cursor: 'pointer'
        }
    };

    const mouseLeave = () => {
        setHover(false);
    };
    
    return (
        <div className='sidenav'>
            <ul>
                <li><Link to='/'>Followed</Link></li>
                <li><Link to='explore'>Explore</Link></li>
                <li><Link to='currentbids'>Current bids</Link></li>
                <li><Link to='saved'>Saved</Link></li>
                <li><Link to='nearme'>Near me</Link></li>
            </ul>
            <Link to={auth.isLoggedIn ? '/addart' : 'signup'}>
                <button className='add-art'>Add Art <span>+</span></button>
            </Link>
            <Link to={auth.isLoggedIn ? '/cart' : 'signup'}>
                <img className="cart" src={cartimg}/>
                {/* <sup><small className="cart-badge">{itemTotal()}</small></sup> */}
            </Link>
        </div>
    )
}

export default SideNav;