import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Button,Nav,FormControl,Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import auth0Client from './../Auth';
import './styles.css'

const Navigation = () => { 

    const signinButton = () => {
        auth0Client.signIn();
    }

    const signOut = () => {
        auth0Client.signOut();
        this.props.history.replace('/');
    }
  return (
      <Navbar bg="light" variant="light">
        <Link className='nav-links' to='/'><Navbar.Brand>ArtQ</Navbar.Brand></Link>
        <Nav className="mr-auto">
          <Link className='nav-links' to='/'>My Feed</Link>
          <Link className='nav-links' to='/latest'>Latest and Popular</Link>
          <Link className='nav-links' to='/pricing'>Near Me</Link>
          <Link className='nav-links' to='/about'>About</Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-primary">Search</Button>
          {!auth0Client.isAuthenticated() && <Button className="btn btn-dark" onClick={() => { signinButton() }}>Sign In</Button>}
          {auth0Client.isAuthenticated() && <label className="mr-2 text-white">{auth0Client.getProfile().name}</label>}
          {auth0Client.isAuthenticated() && <Button className="btn btn-dark" onClick={() => { signOut() }}>Sign Out</Button>}
        </Form>
      </Navbar>
  )
}

export default Navigation;
