import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './App.css';
import Callback from './Callback';
import Home from './Home';
import Navbar from 'react-bootstrap/Navbar';
import {Button,Nav,FormControl,Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

 

function App() { 

  return (
 
    <BrowserRouter>
    
    <div className="App" >
   

  <br />
  <Navbar bg="light" variant="light">
    <Navbar.Brand href="#home">ArtQ</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">My Feed</Nav.Link>
      <Nav.Link href="#features">Latest and Popular</Nav.Link>
      <Nav.Link href="#pricing">Near Me</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button  variant="outline-primary">Search</Button>
     
    </Form>
  </Navbar>
      <Route exact path='/' component={Home} exact />
      <Route exact path='/callback' component={Callback} exact />
    </div>
    </BrowserRouter>
    
  )
}

export default App;
