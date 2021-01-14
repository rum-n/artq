import React, { useState, useEffect,useContext } from 'react';
import { useHttpClient } from '../components/hooks/http-hook';
import Savedimageslist from "../components/UserSavedArt/savedimageslist";
import { AuthContext } from "../context/auth-context";
import './SeeMore.css';
import {useLocation} from "react-router-dom";
// import { disableExpoCliLogging } from 'expo/build/logs/Logs';

const Individual = () => {
  const auth = useContext(AuthContext)

    let data = useLocation();
    let theid = data.state.theid
    console.log(auth.userId)

  
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedUsers, setLoadedUsers] = useState();
    const [loadedperson, setLoadedPerson] = useState();
    const [disableunfollow, setdisableunfollow] = useState(false);
    
  

    useEffect(() => {
      const sendRequest = async () => {
       
        try {
          const response = await fetch(`http://localhost:5000/api/images/user/${theid}`);
          
          const responseData = await response.json();
          
  
          if (!response.ok) {
            throw new Error(responseData.message);
          }
          
          setLoadedUsers(responseData.userWithImages);
          console.log(responseData.userWithImages)
         
        } catch (err) {
         
        }
        
        try {
          const response = await fetch(`http://localhost:5000/api/users/${auth.userId}`);
          
          const responseData = await response.json();
          
  
          if (!response.ok) {
            throw new Error(responseData.message);
          }
          console.log(responseData.userWithImages.following[0])
          
          if (responseData.userWithImages.following[0].includes(loadedUsers[0]._id)){
            setdisablebutton(true)
            setdisableunfollow(false)}else{
              setdisableunfollow(true)
              setdisablebutton(false)
            }
         
        } catch (err) {
         
        }
      
      };
      sendRequest();
    });
    const [disablebutton,setdisablebutton] = useState(false)
    const [remove,setremove] = useState(false)

   
  
    
   const disable = () =>{
   
     incrementFollowing()
     incrementFollowers()
     setdisablebutton(true)
     setdisableunfollow(false)
     
    
   }

   const removefollower = () =>{
    decrementFollowing()
    setdisableunfollow(true)
    setdisablebutton(false)
    decrementFollowers()
  }

   //add decrementfollowing
   const decrementFollowing = async () => {
     alert("user removed")
    try {
      const response = await fetch(`http://localhost:5000/api/users/${auth.userId}`);
    
      const responseData = await response.json();
      console.log(responseData)
      

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      
      setLoadedPerson(responseData.userWithImages);
     

   
   
    let followingnumber = 0
    console.log(responseData.userWithImages)
    let following = responseData.userWithImages.following
 
      
   
    followingnumber = responseData.userWithImages.followingnumber - 1
    following = responseData.userWithImages.following
    //find the existing user id and delete
    console.log(responseData.userWithImages.following)
    following = responseData.userWithImages.following[0].replace(loadedUsers[0]._id,'');
   
  
    console.log(auth.userId)
  
    await sendRequest(`http://localhost:5000/api/users/following/${auth.userId}`,'PUT',JSON.stringify({
        "id" : auth.userId,
        "following":following,
        "followingnumber":followingnumber
    }),{
        'Content-Type':'application/json',Authorization: 'Bearer '+auth.token
      })
  
  } catch(err){
  
    console.log(err)
  }

}

const decrementFollowers = async () => {
  alert("user removed")
 try {
   const response = await fetch(`http://localhost:5000/api/users/${loadedUsers[0].author}`);
 
   const responseData = await response.json();
   console.log(responseData)
   

   if (!response.ok) {
     throw new Error(responseData.message);
   }
 
 let followersnumber = 0
 console.log(responseData.userWithImages)
 let followers = responseData.userWithImages.followers

   

 followersnumber = responseData.userWithImages.followersnumber - 1
 followers = responseData.userWithImages.followers
 //find the existing user id and delete
 console.log(responseData.userWithImages.followers)
 followers = responseData.userWithImages.followers[0].replace(auth.userId,'');


 console.log(auth.userId)

 await sendRequest(`http://localhost:5000/api/users/followers/${loadedUsers[0].author}`,'PUT',JSON.stringify({
     "id" : loadedUsers[0].author,
     "followers":followers,
     "followersnumber":followersnumber
 }),{
     'Content-Type':'application/json',Authorization: 'Bearer '+auth.token
   })

} catch(err){
 alert(err)
 console.log(err)
}

}

  
   const incrementFollowing = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${auth.userId}`);
    
      const responseData = await response.json();
      console.log(responseData)
      

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      
      setLoadedPerson(responseData.userWithImages);
     

   
    alert(`following user!`)
    let followingnumber = 0
    console.log(responseData.userWithImages)
    let following = responseData.userWithImages.following
 
      
   
    followingnumber = responseData.userWithImages.followingnumber+1
    following = responseData.userWithImages.following
    console.log(responseData.userWithImages.following[0])
    following = responseData.userWithImages.following[0]+(loadedUsers[0]._id)
  
    console.log(auth.userId)
  
    await sendRequest(`http://localhost:5000/api/users/following/${auth.userId}`,'PUT',JSON.stringify({
        "id" : auth.userId,
        "following":following,
        "followingnumber":followingnumber
    }),{
        'Content-Type':'application/json',Authorization: 'Bearer '+auth.token
      })
  
  } catch(err){
  
    console.log(err)
  }
  
  
  };

  const incrementFollowers = async () => {
    try {
      alert(loadedUsers[0].author)
      
      const response = await fetch(`http://localhost:5000/api/users/${loadedUsers[0].author}`);
    
      const responseData = await response.json();
      console.log(responseData)
      

      if (!response.ok) {
        throw new Error(responseData.message);
      }
    let followersnumber = 0
    console.log(responseData.userWithImages)
    followersnumber = responseData.userWithImages.followersnumber
 
    
   
    followersnumber = responseData.userWithImages.followersnumber+1
    let followers = responseData.userWithImages.followers
    
    followers = responseData.userWithImages.followers[0]+(auth.userId)
  
    alert(loadedUsers[0].author,followers,followersnumber)
   
  
    await sendRequest(`http://localhost:5000/api/users/followers/${loadedUsers[0].author}`,'PUT',JSON.stringify({
        "id" : loadedUsers[0].author,
        "followers":followers,
        "followersnumber":followersnumber
    }),{
        'Content-Type':'application/json',Authorization: 'Bearer '+auth.token
      })
  
  } catch(err){
    alert(err)
  
    console.log(err)
  }
  
  
  };
    return (
      
      <React.Fragment>
        <button onClick={() => disable()} disabled={disablebutton}>Follow</button>  
        {
          disable &&
        <button onClick={() => removefollower()} disabled={disableunfollow}> Unfollow</button>}
        {console.log(loadedUsers)}
       
        {loadedUsers && <Savedimageslist items={loadedUsers} />}
      </React.Fragment>
    );
  };
  
  export default Individual;
  