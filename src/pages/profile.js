import React,{useContext,useState,useEffect} from "react";
// import auth0Client from './../Auth';
// import { useAuth0 } from "@auth0/auth0-react";
import {AuthContext} from "../context/auth-context";
// import UsersList from '../components/UsersList';
import {useHttpClient} from "../components/hooks/http-hook"
import MyArt from "./MyArt"
import './profile.css';

const Profile = () => {
  const{error,sendRequest,clearError,theresponse} = useHttpClient();
  const [loadedImages, setLoadedImages] = useState();
  const [loadedName, setLoadedName] = useState();
  const [loadedEmail, setLoadedEmail] = useState();
  const [loadedId, setLoadedId] = useState();
  const [loadedPhone, setLoadedPhone] = useState();
  const [loadedImage, setLoadedImage] = useState();
  const auth = useContext(AuthContext);
  console.log("auth.userid "+auth.userId)

  useEffect(() => {
    const sendRequest = async () => {

      try {
        const response = await fetch(`http://localhost:5000/api/users/${auth.userId}`);
        const responseData = await response.json();
        
        if (!response.ok) {
          throw new Error(responseData.message);
        }  
        setLoadedName(responseData.userWithImages.name)
        setLoadedEmail(responseData.userWithImages.email)
        setLoadedPhone(responseData.userWithImages.phone)
        setLoadedId(responseData.userWithImages.id)
        setLoadedImage(responseData.userWithImages.image)
      } catch (err) {
       
      }
    
    };
    sendRequest();
    
  }, []);

  
   return (
    <div className='main'>
      <div className='personal-info'>
        <img className='profile-pic' src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" alt="new"/>
        <div className='flex-c'>
          <div className='personal-info-text'>
            <div className='col-1'>
              <h2>{loadedName}</h2>
              {loadedEmail}
              <p>Painter</p>
            </div>
            <div className='col-2'>
              <div className='follow-stats'>
                <p>101 Followers</p>
                <p>121 Following</p>
              </div>
              <p>Based in San Francisco, CA</p>
            </div>
          </div>
          <div className='personal-bio'>
            <p>Self-thaught painter // Take a look at my work</p>
          </div>
          <div className='profile-btn-wrapper'>
            <button className='edit-profile-btn'>Edit profile</button>
            <button className='add-new-post-btn'>Add new post</button>
          </div>
        </div>
      </div>
     <hr/>
           {<MyArt/>}
     
     </div>
   )
};

export default Profile;