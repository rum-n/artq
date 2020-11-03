import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Callback from './Callback';
import Home from './pages/Home';
import About from './pages/About';
import paypal from "./pages/paypal";

import Navigation from './components/Nav';

function App() { 

  return (
    <Router>
      <Navigation/>
      <Switch>
        <Route exact path='/' component={Home}  />
        <Route path='/about' component={About} />
        <Route path='/callback' component={Callback} />
      </Switch>
    </Router>
   
      
  
  )
}

export default App;