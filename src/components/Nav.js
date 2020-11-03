import React,{Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Button,Nav,FormControl,Form,Dropdown } from "react-bootstrap";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth0Provider } from "@auth0/auth0-react";
import auth0Client from './../Auth';
import './styles.css'
import logo from "./logo.PNG";
import sidebar from "./sidebar.PNG";

const Navigation = () => { 

    const signinButton = () => {
      console.log("entered!")
        auth0Client.signIn();
       
        

    }

    const signOut = () => {
        auth0Client.signOut();
        this.props.history.replace('/');
    }

   

    
  return (
      <Navbar style = {{backgroundColor: "rgb(36,38,54)"}}  variant="light">
  <Dropdown>
  <Dropdown.Toggle style = {{borderColor: "rgb(36,38,54)", backgroundColor: "rgb(36,38,54)"}}  variant="success" >
  <img style={{height:40, width:40}} src={sidebar} alt="Logo" />
  </Dropdown.Toggle>

  <Dropdown.Menu  style = {{borderColor: "rgb(36,38,54)", backgroundColor: "rgb(36,38,54)"}}>
    <Dropdown.Item ><Link style = {{color: "white"}} className='nav-links' to='/about'>My profile</Link></Dropdown.Item>
    <Dropdown.Item ><Link style = {{color: "white"}} className='nav-links' to='/about'>Messages</Link></Dropdown.Item>
    <Dropdown.Item ><Link style = {{color: "white"}} className='nav-links' to='/about'>Notifications</Link></Dropdown.Item>
    <Dropdown.Item><Link style = {{color: "white"}} className='nav-links' to='/about'>Purchase history</Link></Dropdown.Item>
    <Dropdown.Item ><Link style = {{color: "white"}} className='nav-links' to='/about'>Selling center</Link></Dropdown.Item>
    <Dropdown.Item><Link style = {{color: "white"}} className='nav-links' to='/about'>Settings</Link></Dropdown.Item>
    <Dropdown.Item ><Link style = {{color: "white"}} className='nav-links' to='/about'>About</Link></Dropdown.Item>
    
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <Dropdown.Item > 
         
          
          {!auth0Client.isAuthenticated() && <Button className="btn btn-dark" onClick={() => { signinButton() }}>Sign In</Button>}
          {auth0Client.isAuthenticated() && <label className="mr-2 text-white">Welcome {auth0Client.getProfile().name}</label>}
          <br></br>
          {auth0Client.isAuthenticated() && <Button className="btn btn-dark" onClick={() => { signOut() }}>Sign Out</Button>}
       </Dropdown.Item>
       
    
  </Dropdown.Menu>
</Dropdown>
         
        <Link className='nav-links' to='/'> <img style={{height:50, width:50}} src={logo} alt="Logo" /></Link>
        <Nav className="mr-auto">
          <Link style = {{color: "white"}} className='nav-links' to='/'>My Feed</Link>
          <Link style = {{color: "white"}} className='nav-links' to='/explore'>Explore</Link>
          <Link style = {{color: "white"}} className='nav-links' to='/currentbids'>Current Bids</Link>
          <Link style = {{color: "white"}} className='nav-links' to='/saved'>Saved</Link>
          <Link style = {{color: "white"}} className='nav-links' to='/nearme'>Near Me</Link>
          
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button style = {{color: "white"}}variant="outline-primary">Search</Button>
          
        </Form>
      </Navbar>
      
  )
}

export default Navigation;
