import React,{useContext,useState,useEffect } from "react";
import {AuthContext} from "../context/auth-context";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import MyArt from "./MyArt"
import './profile.css';

const Profile = () => {
  
  const [loadedName, setLoadedName] = useState();
  const [loadedEmail, setLoadedEmail] = useState();
  const [loadedImage, setLoadedImage] = useState();
  const [loadedAbout, setLoadedAbout] = useState();
  const [loadedFollowing, setloadedFollowing] = useState();
  const [loadedFollowers, setloadedFollowers] = useState();
  const [loadedLocation, setLoadedLocation] = useState();
  const auth = useContext(AuthContext);
  const userId = auth.userId
  let myInput = null;
  const copyToClipboard = () => {
    myInput.select();
    document.execCommand("copy");
    alert("copied to clipboard!");}

  useEffect(() => {
    const sendRequest = async () => {

      try {
        const response = await fetch(`http://165.227.117.138:5000/api/users/${userId}`);
        const responseData = await response.json();
        
        if (!response.ok) {
          throw new Error(responseData.message);
        }  
        setLoadedName(responseData.userWithImages.name)
        setLoadedEmail(responseData.userWithImages.email)
        setLoadedImage(responseData.userWithImages.prof)
        setLoadedAbout(responseData.userWithImages.about)
        setLoadedLocation(responseData.userWithImages.location)
        setloadedFollowing(responseData.userWithImages.followingnumber)
        setloadedFollowers(responseData.userWithImages.followersnumber)
      } catch (err) {
        console.log(err)
      }
    };
    sendRequest();
  });
  var link = <a href={('http://165.227.117.138/')}>ArtQ.world</a>;
return (
    <div className='main'>
    <div className='personal-info'>
      <img className='profile-pic' src={`http://165.227.117.138:5000/${loadedImage}`} alt="new"/>
        <div className='personal-info-text'>
          <div className='col-1'>
            <h2>{loadedName}</h2>
            {loadedEmail}
          </div>
          <div className='col-2'>
            <div className='follow-stats'>
              <p>{loadedFollowers} Followers</p>
              <p>{loadedFollowing} Following</p>
            </div>
            {loadedLocation}
          </div>
        </div>
        <div className='personal-bio'>
            {loadedAbout}
        </div>
        <div className='profile-btn-wrapper'>
          <Link to='/settings'><Button variant='outline-dark'>Edit profile</Button></Link>
          <Link to='/addart'><Button variant='outline-secondary'>Add art</Button></Link>
        </div>
      </div>
      <div>
      <input
      
        readOnly
        value={`Checkout my artwork on artq.world! Sign up, and search for ${loadedName}.`}
       
        ref={(ref) => (myInput = ref)}
      />
      <button onClick={copyToClipboard}>
       click to copy and share with your friends!
      </button>
    </div>
      <hr/>

         {<MyArt/>}
      </div>  
   )
};

export default Profile;