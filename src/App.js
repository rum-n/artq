import React,{ useState, useCallback} from 'react';
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
import Signin from "./pages/signIn"
import Explore from "./pages/Users"
import NewArt from './pages/NewArtForm'
import {AuthContext} from "./context/auth-context"
import MyArt from "./pages/MyArt"
import UpdatePlace from "./pages/UpdatePlace"

function App() { 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback(uid => {
    setIsLoggedIn(true);
    setUserId(uid);
   
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);
  let routes;

  return(
    <AuthContext.Provider value={{isLoggedIn:isLoggedIn,userId:userId,login:login,logout:logout}}>
    <Router>
      <Navigation/>
      <Switch>
        <Route exact path='/' component={Home}  />
        <Route exact path='/saved' component={Saved}  />
        <Route exact path='/welcome' component={IntroSignUp}  />
        <Route exact path='/signup' component={Signup}  />
        <Route exact path='/login' component={Signin}  />
        <Route path='/about' component={About} />
        <Route path='/profile' component={Profile} />
        <Route path='/settings' component={Settings} />
        <Route path='/sellingcenter' component={Sellingcenter} />
        <Route path='/nearme' component={NearMe} />
        <Route path='/purchases' component={Purchases} />
        <Route path='/callback' component={Callback} />
        <Route path='/explore' component={Explore} />
        <Route path='/addart' component={NewArt} />
        <Route path='/myart' component={MyArt} />
        <Route path='/edit' component={UpdatePlace} />
        <Route path="/images/:imageId">
        <UpdatePlace />
        </Route>
      </Switch>
    </Router>
    </AuthContext.Provider>
  
  )
  
}

export default App;