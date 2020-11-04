import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Callback from './Callback';
import Home from './pages/homepage';
import About from './pages/About';
import NearMe from './pages/nearme';
import Profile from './pages/profile';
import Navigation from './components/Nav';

function App() { 

  return (
    <Router>
      <Navigation/>
      <Switch>
      <div className="main">
        <Route exact path='/' component={Home}  />
        <Route path='/about' component={About} />
        <Route path='/profile' component={Profile} />
        <Route path='/nearme' component={NearMe} />
        <Route path='/callback' component={Callback} />
      </div>
      </Switch>
    </Router>
  )
}

export default App;