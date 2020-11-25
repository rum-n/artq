import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Callback from './Callback';
import Home from './pages/homepage';
import About from './pages/about';
import NearMe from './pages/nearme';
import Profile from './pages/profile';
import Settings from './pages/settings';
import Purchases from './pages/purchases';
import Navigation from './components/Nav';
import Sellingcenter from './pages/sellingcenter';
import Saved from "./pages/saved";
import IntroSignUp from './pages/introSignUp';
import Signup from './pages/signUp';

function App() { 

  return (
    <Router>
      <Navigation/>
      <Switch>
        <Route exact path='/' component={Home}  />
        <Route exact path='/saved' component={Saved}  />
        <Route exact path='/welcome' component={IntroSignUp}  />
        <Route exact path='/signup' component={Signup}  />
        <Route path='/about' component={About} />
        <Route path='/profile' component={Profile} />
        <Route path='/settings' component={Settings} />
        <Route path='/sellingcenter' component={Sellingcenter} />
        <Route path='/nearme' component={NearMe} />
        <Route path='/purchases' component={Purchases} />
        <Route path='/callback' component={Callback} />
      </Switch>
    </Router>
  )
}

export default App;