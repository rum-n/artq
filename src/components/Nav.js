import React, {useContext}from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Button,Nav,FormControl,Form,Dropdown } from "react-bootstrap";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Auth0Provider } from "@auth0/auth0-react";
import auth0Client from './../Auth';
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
    {auth.isLoggedIn && (
    <Dropdown.Item ><Link style = {{color: "white"}} className='nav-links' to='/profile'>My profile</Link></Dropdown.Item>
    )}
      {!auth.isLoggedIn && (
    <Dropdown.Item ><Link style = {{color: "white"}} className='nav-links' to='/login'>My profile</Link></Dropdown.Item>
    )}
    <Dropdown.Item ><Link style = {{color: "white"}} className='nav-links' to='/about'>Messages</Link></Dropdown.Item>
    <Dropdown.Item ><Link style = {{color: "white"}} className='nav-links' to='/about'>Notifications</Link></Dropdown.Item>
    {auth.isLoggedIn && (
    <Dropdown.Item><Link style = {{color: "white"}} className='nav-links' to='/purchases'>Purchase history</Link></Dropdown.Item>
    )}
     {!auth.isLoggedIn && (
    <Dropdown.Item><Link style = {{color: "white"}} className='nav-links' to='/login'>Purchase history</Link></Dropdown.Item>
    )}
     {auth.isLoggedIn && (
    <Dropdown.Item ><Link style = {{color: "white"}} className='nav-links' to='/sellingcenter'>Selling center</Link></Dropdown.Item>
     )}
      {!auth.isLoggedIn && (
    <Dropdown.Item ><Link style = {{color: "white"}} className='nav-links' to='/login'>Selling center</Link></Dropdown.Item>
     )}
      {auth.isLoggedIn && (
    <Dropdown.Item><Link style = {{color: "white"}} className='nav-links' to='/settings'>Settings</Link></Dropdown.Item>
      )}
       
       {!auth.isLoggedIn && (
    <Dropdown.Item><Link style = {{color: "white"}} className='nav-links' to='/login'>Settings</Link></Dropdown.Item>
      )}
      
    <Dropdown.Item ><Link style = {{color: "white"}} className='nav-links' to='/about'>About</Link></Dropdown.Item>
    
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    {!auth.isLoggedIn &&(
    <Dropdown.Item ><Link style = {{color: "white"}} className='nav-links' to='/signup'>Sign Up</Link></Dropdown.Item>
    )}
    {!auth.isLoggedIn && (
    <Dropdown.Item ><Link style = {{color: "white"}} className='nav-links' to='/login'>Sign In</Link></Dropdown.Item>
    )}
    {auth.isLoggedIn && (
    <Dropdown.Item ><Link style = {{color: "white"}} className='nav-links' to='/'onClick ={auth.logout}>Sign Out</Link></Dropdown.Item>
    )}
    <br></br>
    <br></br>
    
    <Dropdown.Item > 
         
         
       </Dropdown.Item>
       
    
  </Dropdown.Menu>
</Dropdown>
         
        <Link className='nav-links' to='/explore'> <img style={{height:50, width:50}} src={logo} alt="Logo" /></Link>
        <Nav className="mr-auto">
        {auth.isLoggedIn && (
          <Link style = {{color: "white"}} className='nav-links' to='/'>My Feed</Link>
        )}
         {!auth.isLoggedIn && (
          <Link style = {{color: "white"}} className='nav-links' to='/login'>My Feed</Link>
        )}
          <Link style = {{color: "white"}} className='nav-links' to='/explore'>Explore</Link>
          <Link style = {{color: "white"}} className='nav-links' to='/currentbid'>Current Bids</Link>
          {auth.isLoggedIn && (
          <Link style = {{color: "white"}} className='nav-links' to='/saved'>Saved</Link>
          )}
          {!auth.isLoggedIn && (
          <Link style = {{color: "white"}} className='nav-links' to='/login'>Saved</Link>
          )}
          {auth.isLoggedIn && (
          <Link style = {{color: "white"}} className='nav-links' to='/nearme'>Near Me</Link>
          )}
           {!auth.isLoggedIn && (
          <Link style = {{color: "white"}} className='nav-links' to='/login'>Near Me</Link>
          )}
            {auth.isLoggedIn && (
          <Link style = {{color: "white"}} className='nav-links' to='/addart'>Add Art</Link>
          )}
            {!auth.isLoggedIn && (
          <Link style = {{color: "white"}} className='nav-links' to='/login'>Add Art</Link>
          )}
          
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button style = {{color: "white"}}variant="outline-primary">Search</Button>
          
        </Form>
      </Navbar>
)
  
}

export default Navigation;
