import React,{ useState, useCallback,useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Callback from './Callback';
import Home from './pages/homepage';
import About from './pages/About';
import NearMe from './pages/Map/getimagelocations';
import Profile from './pages/profile';
import Settings from './pages/settings';
import Purchases from './pages/purchases';
import Navigation from './components/Nav';
import Sellingcenter from './pages/sellingcenter';
import Saved from "./pages/Saved";
import IntroSignUp from './pages/introSignUp';
import Signup from './pages/signUp';
import Signin from "./pages/signIn";
import Explore from "./pages/Users";
import NewArt from './pages/NewArtForm';
import {AuthContext} from "./context/auth-context";
import MyArt from "./pages/MyArt";
import UpdatePlace from "./pages/UpdatePlace";
import SeeMore from "./pages/SeeMore";
import Cart from "./components/Cart";
import IndividualUserPage from "./pages/IndividualUserPage"

let logoutTimer;
function App() { 
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback((uid,token,expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime()+1000*60*60)
    setTokenExpirationDate(tokenExpirationDate)
    localStorage.setItem('userData',JSON.stringify({userId:uid,token:token,expiration:tokenExpirationDate.toISOString()}))
    
    
   
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null)
    localStorage.removeItem('userData');
  }, []);

  useEffect(()=>{
    if (token && tokenExpirationDate){
      const remaining = tokenExpirationDate.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout,remaining)
    }else{
      clearTimeout(logoutTimer);
    }
  },[token,logout,tokenExpirationDate])


  useEffect(()=>{
    const storedData = JSON.parse(localStorage.getItem('userData'))
    if(storedData && storedData.token && new Date(storedData.expiration)> new Date()){
      login(storedData.userId,storedData.token, new Date(storedData.expiration))
    }
    },[login]);

  return(
    <AuthContext.Provider value={{token:token,isLoggedIn:!!token,userId:userId,login:login,logout:logout}}>
    <Router>
      <Navigation/>
      <Switch>
        <Route exact path='/' component={Home}  />
        <Route path='/saved' component={Saved}  />
        <Route path='/welcome' component={IntroSignUp}  />
        <Route path='/signup' component={Signup}  />
        <Route path='/login' component={Signin}  />
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
         <Route path='/seemore' component={SeeMore} /> 
        <Route path='/cart' component={Cart} />
        <Route path='/individual' component={IndividualUserPage} />
        <Route path="/images/:imageId">
        
        <UpdatePlace />
        </Route>
      </Switch>
    </Router>
    </AuthContext.Provider>
  
  )
  
}

export default App;