import React, {useContext}from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Button,Nav,FormControl,Form,Dropdown } from "react-bootstrap";
import {itemTotal} from "./cartHelpers"
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Nav.css';
import './styles.css'
import logo from "../assets/logo.PNG";
import sidebar from "../assets/sidebar.PNG";
import {AuthContext} from "../context/auth-context"

const Navigation = () => { 

 
const auth = useContext(AuthContext)
   
return(

  <Navbar style = {{backgroundColor: "rgb(36,38,54)", fontFamily: "Roboto, sans-serif"}}  variant="light">
    <Dropdown>
    <Dropdown.Toggle style = {{borderColor: "rgb(36,38,54)", backgroundColor: "rgb(36,38,54)"}}  variant="success" >
    <img style={{height:40, width:40}} src={sidebar} alt="Logo" />
    </Dropdown.Toggle>

    <Dropdown.Menu  style = {{borderColor: "rgb(36,38,54)", backgroundColor: "rgb(36,38,54)"}}>
      <Dropdown.Item>
        <Link className='nav-links' to={auth.isLoggedIn ? '/profile' : '/login'}>My profile</Link>
      </Dropdown.Item>
      <Dropdown.Item>
        <Link className='nav-links' to='/about'>Messages</Link>
      </Dropdown.Item>
      <Dropdown.Item>
        <Link className='nav-links' to='/about'>Notifications</Link>
      </Dropdown.Item>
      <Dropdown.Item>
        <Link className='nav-links' to={auth.isLoggedIn ? '/purchases' : '/login'}>Purchase history</Link>
      </Dropdown.Item>
      <Dropdown.Item>
        <Link className='nav-links' to={auth.isLoggedIn ? '/sellingcenter' : '/login'}>Selling center</Link>
      </Dropdown.Item>
      <Dropdown.Item>
        <Link className='nav-links' to={auth.isLoggedIn ? '/settings' : '/login'}>Settings</Link>
      </Dropdown.Item>
      <Dropdown.Item>
        <Link className='nav-links' to='/about'>About</Link>
      </Dropdown.Item>
      
      <br></br>
      <br></br>
      
      {!auth.isLoggedIn &&
      (<Dropdown.Item>
        <Link className='nav-links' to='/signup'>Sign Up</Link>
      </Dropdown.Item>
      )}
      {!auth.isLoggedIn &&
      (<Dropdown.Item>
        <Link className='nav-links' to='/login'>Sign In</Link>
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
          
    <Link className='nav-links' to={auth.isLoggedIn ? '/' : '/login'}>
      <img style={{height:50, width:50}} src={logo} alt="Logo" />
    </Link>
    <Nav className="mr-auto">
        <Link className='nav-links' to={auth.isLoggedIn ? '/' : '/login'}>My Feed</Link>
        <Link className='nav-links' to={auth.isLoggedIn ? '/explore' : '/login'}>Explore</Link>
        <Link className='nav-links' to={auth.isLoggedIn ? '/currentbid' : '/login'}>Current Bids</Link>
        <Link className='nav-links' to={auth.isLoggedIn ? '/saved' : '/login'}>Saved</Link>
        <Link className='nav-links' to={auth.isLoggedIn ? '/nearme' : '/login'}>Near Me</Link>
        <Link className='nav-links' to={auth.isLoggedIn ? '/addart' : '/login'}>Add Art</Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-light">Search</Button>
    </Form>
    {auth.isLoggedIn && (
      <Link className='nav-links' to='/cart'>Cart <sup><small className="cart-badge">{itemTotal()}</small></sup></Link>
    )}
  </Navbar>
  )
}

export default Navigation;
