import React from "react";
import auth0Client from './../Auth';
import { useAuth0 } from "@auth0/auth0-react";



const Profile = () => {

  
   
  try{ 
    const signOut = () => {
        auth0Client.signOut();
        this.props.history.replace('/');
    }
    
  return (
    <div>
      <div className="row align-items-center profile-header">
     
      
        <br></br>
        <br></br>
          <img
            src={auth0Client.getProfile().picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </div>
        <div>
        <div className="col-md text-center text-md-left">
            <br></br>
            <button className="btn btn-dark" onClick={() => { signOut() }}> Sign Out</button>
          <h2>{auth0Client.getProfile().name}</h2>
          <h4>Painter</h4>
          <h6>Self-taught painter//Take a look at my work!</h6>
          <h2>{auth0Client.getProfile().email}</h2>

          <button className="btn btn-dark">Edit profile</button>
          <text>  </text>
          <button className="btn btn-dark">Add new post</button>

          <p className="lead text-muted">{auth0Client.getProfile().email}</p>
        
      </div>
      <div className="col-md text-center text-md-right">
          
          <h4>101 Followers    121 Following</h4>
          <h6>Based in San Fransico, CA</h6>
          <h2>{auth0Client.getProfile().email}</h2>

          <div className="col-md text-center text-md-left">
              <text> INSERT USERS ARTWORK HEREEEEE</text>

          </div>

        

          

        
      </div>
      
      
    </div>
    </div>
  );
  }
  catch{
    auth0Client.signIn();
    

  }


};


export default Profile;