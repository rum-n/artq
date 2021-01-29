import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TopNav.css';
import { Link } from 'react-router-dom';
import { Nav, Dropdown } from "react-bootstrap";
import {AuthContext} from "../context/auth-context";
import toplogo from "./../assets/toplogo.png";
import topmenu from "./../assets/topmenu.png";

const TopNav = () => {
    const auth = useContext(AuthContext)
    
    return (
        <div className='topnav'>
            <img src={toplogo} />
            <Dropdown>
            <Dropdown.Toggle>
                <img src={topmenu} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
            <Dropdown.Item>
                <Link className='nav-links' to={auth.isLoggedIn ? '/profile' : '/'}>My profile</Link>
            </Dropdown.Item>
            <Dropdown.Item>
                <Link className='nav-links' to='/about'>Messages</Link>
            </Dropdown.Item>
            <Dropdown.Item>
                <Link className='nav-links' to='/about'>Notifications</Link>
            </Dropdown.Item>
            <Dropdown.Item>
                <Link className='nav-links' to={auth.isLoggedIn ? '/purchases' : '/'}>Purchase history</Link>
            </Dropdown.Item>
            <Dropdown.Item>
                <Link className='nav-links' to={auth.isLoggedIn ? '/sellingcenter' : '/'}>Selling center</Link>
            </Dropdown.Item>
            <Dropdown.Item>
                <Link className='nav-links' to={auth.isLoggedIn ? '/settings' : '/'}>Settings</Link>
            </Dropdown.Item>
            <Dropdown.Item>
                <Link className='nav-links' to='/about'>About</Link>
            </Dropdown.Item>
            
            <br></br>
            
            {!auth.isLoggedIn &&
            (<Dropdown.Item>
                <Link className='nav-links' to='/signup'>Sign Up</Link>
            </Dropdown.Item>
            )}
            
            {auth.isLoggedIn && (
            <Dropdown.Item>
                <Link className='nav-links' to='/' onClick={auth.logout}>Sign Out</Link>
            </Dropdown.Item>
            )}
            <br></br>
            </Dropdown.Menu>
        </Dropdown>
        </div>
    )
}

export default TopNav;