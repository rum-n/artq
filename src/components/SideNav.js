import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SideNav.css';
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/auth-context"

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
                <li style={linkStyle} onMouseEnter={mouseOver} onMouseLeave={mouseLeave}>Followed</li>
                <li onMouseEnter={mouseOver} onMouseLeave={mouseLeave}>Explore</li>
                <li onMouseEnter={mouseOver} onMouseLeave={mouseLeave}>Current bids</li>
                <li onMouseEnter={mouseOver} onMouseLeave={mouseLeave}>Saved</li>
                <li onMouseEnter={mouseOver} onMouseLeave={mouseLeave}>Near me</li>
            </ul>
            <Link to={auth.isLoggedIn ? '/add-art' : 'signup'}><button className='add-art'>Add Art <span>+</span></button></Link>
            {/* <icon/> */}
        </div>
    )
}

export default SideNav;