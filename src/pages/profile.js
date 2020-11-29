import React,{useContext,useState,useEffect} from "react";
import auth0Client from './../Auth';
import { useAuth0 } from "@auth0/auth0-react";
import {AuthContext} from "../context/auth-context";
import UsersList from '../components/UsersList';


const Profile = () => {
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
        const response = await fetch('http://localhost:5000/api/users/5fc07736e27c0c6e35dbb8d1');
       
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
     <text>Profile Pic: </text>
     <img 
      src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
      alt="new"
      />
     <br></br>
     <button>Add Art</button>
     </div>
    

   )


};


export default Profile;