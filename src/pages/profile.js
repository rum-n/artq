import React,{useContext,useState,useEffect} from "react";
import auth0Client from './../Auth';
import { useAuth0 } from "@auth0/auth0-react";
import {AuthContext} from "../context/auth-context";
import UsersList from '../components/UsersList';
import {useHttpClient} from "../components/hooks/http-hook"
import MyArt from "./MyArt"

const Profile = () => {
  const{error,sendRequest,clearError,theresponse} = useHttpClient();
  const [loadedImages, setLoadedImages] = useState();
  const [loadedName, setLoadedName] = useState();
  const [loadedEmail, setLoadedEmail] = useState();
  const [loadedId, setLoadedId] = useState();
  const [loadedPhone, setLoadedPhone] = useState();
  const [loadedImage, setLoadedImage] = useState();
  const auth = useContext(AuthContext);
  console.log(auth.userId)
  useEffect(() => {
    const sendRequest = async () => {

      try {
        const response = await fetch('http://localhost:5000/api/users/'+auth.userId);
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
        alert(err)
      }
    
    };
    sendRequest();
    
  }, []);

  
   return(
     
     <div>
      
     <text>Name: </text> 
   <text> {loadedName}</text>
     <br></br>
     <text>Email: </text>
   <text>{loadedEmail}</text>
     <br></br>
     <text>Id: </text>
     <text>{auth.userId}</text>
     <br></br>
     <text>Phone: </text>
     <text>{loadedPhone}</text>
     <br></br>
     <text>My Profile Pic: </text>
     <img 
      src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
      alt="new"
      />
     <br></br>
     <text></text>
     <h1>MY ARTWORK IS BELOW</h1>
     <MyArt/>
     <button>Add Art</button>
     </div>
    

   )


};


export default Profile;