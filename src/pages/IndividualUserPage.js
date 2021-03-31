import React, { useState, useEffect,useContext } from 'react';
import { useHttpClient } from '../components/hooks/http-hook';
import { AuthContext } from "../components/context/auth-context";
import './SeeMore.css';
import {useLocation} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import CardModel from './../components/CardModel';
// import { disableExpoCliLogging } from 'expo/build/logs/Logs';

const Individual = () => {
  const [loadedName, setLoadedName] = useState();
  const [loadedEmail, setLoadedEmail] = useState();
  const [loadedImage, setLoadedImage] = useState();
  const [loadedAbout, setLoadedAbout] = useState();
  const [loadedFollowing, setloadedFollowing] = useState();
  const [loadedFollowers, setloadedFollowers] = useState();
  const [loadedLocation, setLoadedLocation] = useState();

  const auth = useContext(AuthContext)
  let data = useLocation();
  let theid = data.state.theid;
  const { sendRequest } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();
  const [loadedPerson, setLoadedPerson] = useState();
  const [disableunfollow, setdisableunfollow] = useState(false);

  // useEffect(() => {
  //   const sendRequest = async () => {

  //     try {
  //       const response = await fetch(`https://localhost:5000/api/users/${auth.userId}`);
  //       const responseData = await response.json();
        
  //       if (!response.ok) {
  //         throw new Error(responseData.message);
  //       }  
  //       setLoadedName(responseData.userWithImages.name)
  //       setLoadedEmail(responseData.userWithImages.email)
  //       setLoadedImage(responseData.userWithImages.prof)
  //       setLoadedAbout(responseData.userWithImages.about)
  //       setLoadedLocation(responseData.userWithImages.location)
  //       setloadedFollowing(responseData.userWithImages.followingnumber)
  //       setloadedFollowers(responseData.userWithImages.followersnumber)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   };
  //   sendRequest();
  // });

  useEffect(() => {
    const sendRequest = async () => {
      
      try {
        const response = await fetch(`https://localhost:5000/api/images/user/${theid}`);
        const responseData = await response.json();
        console.log(responseData);
        setLoadedPerson(responseData.userWithImages);
        console.log(loadedPerson);
    
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        
      } catch (err) {
        console.log(err) 
      }
  
      try {
        const response = await fetch(`https://localhost:5000/api/users/${auth.userId}`);      
        const responseData = await response.json();
  
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        
        if (responseData.userWithImages.following[0].includes(loadedUsers[0]._id)){
          setdisablebutton(true)
          setdisableunfollow(false)}else{
          setdisableunfollow(true)
          setdisablebutton(false)
        }
      } catch (err) {
        console.log(err)
      }
    };
    sendRequest();
  }, []);

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
      const response = await fetch(`https://localhost:5000/api/users/${auth.userId}`);
    
      const responseData = await response.json();
      console.log(responseData)
      

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      
      setLoadedPerson(responseData.userWithImages);

    let followingnumber = 0
    let following = responseData.userWithImages.following

    followingnumber = responseData.userWithImages.followingnumber - 1
    following = responseData.userWithImages.following
    //find the existing user id and delete
    console.log(responseData.userWithImages.following)
    following = responseData.userWithImages.following[0].replace(loadedUsers[0]._id,'');
  
    await sendRequest(`https://localhost:5000/api/users/following/${auth.userId}`,'PUT',JSON.stringify({
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
   const response = await fetch(`https://localhost:5000/api/users/${loadedUsers[0].author}`);
 
   const responseData = await response.json();
   console.log(responseData)
   

   if (!response.ok) {
     throw new Error(responseData.message);
   }
 
 let followersnumber = 0
 let followers = responseData.userWithImages.followers

 followersnumber = responseData.userWithImages.followersnumber - 1
 followers = responseData.userWithImages.followers
 //find the existing user id and delete

 followers = responseData.userWithImages.followers[0].replace(auth.userId,'');


 console.log(auth.userId)

 await sendRequest(`https://localhost:5000/api/users/followers/${loadedUsers[0].author}`,'PUT',JSON.stringify({
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
      const response = await fetch(`https://localhost:5000/api/users/${auth.userId}`);
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setLoadedPerson(responseData.userWithImages);
      let followingnumber = 0
      let following = responseData.userWithImages.following
      followingnumber = responseData.userWithImages.followingnumber+1
      following = responseData.userWithImages.following
      following = responseData.userWithImages.following[0]+(loadedUsers[0]._id)  
      
      await sendRequest(`https://localhost:5000/api/users/following/${auth.userId}`,'PUT',JSON.stringify({
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
      const response = await fetch(`https://localhost:5000/api/users/${loadedUsers[0].author}`);
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      let followersnumber = 0
      followersnumber = responseData.userWithImages.followersnumber
      followersnumber = responseData.userWithImages.followersnumber+1
      let followers = responseData.userWithImages.followers
      followers = responseData.userWithImages.followers[0]+(auth.userId)
      await sendRequest(`https://localhost:5000/api/users/followers/${loadedUsers[0].author}`,'PUT',JSON.stringify({
        "id" : loadedUsers[0].author,
        "followers":followers,
        "followersnumber":followersnumber
      }),{
        'Content-Type':'application/json',Authorization: 'Bearer '+auth.token
      })
    } catch(err){
      console.log(err)
    }
  };
  
  return (
    
        <div className='main'>
          <div className='personal-info'>
            <div className='profile-pic' >
              <img src={`https://localhost:5000/${loadedImage}`} alt="new"/>
            </div>
            <div className='personal-info-text'>
              <div className='col-1'>
                <h2>{loadedName}</h2>
                {loadedEmail}
                <div className='follow-stats'>
                  <p>{loadedFollowers} Followers</p>
                  <p>{loadedFollowing} Following</p>
                </div>
              </div>
            </div>
              {loadedAbout !== "undefined" ? loadedAbout : "No bio yet."} <br/>
              {loadedLocation !== "undefined" ? loadedLocation : "No location added."}
              <div className='profile-btn-wrapper'>
                <Button variant='outline-dark' onClick={() => disable()} disabled={disablebutton}>Follow</Button>
                {disable && <Button variant='outline-secondary'onClick={() => removefollower()} disabled={disableunfollow}>Unfollow</Button>}
              </div>
          </div>
          
          <div>
          </div>
          <hr/>
            {/* {loadedUsers && <Savedimageslist items={loadedUsers} />} */}
            {loadedPerson.map(details => {
              <CardModel className="place-item__content">
              <div className="place-item__image">
                <img src={`https://localhost:5000/${details.url}`} alt={details.title} />
              </div>
              <div className="place-item__info">
                <h4>{details.title}</h4>
                <p><strong>{details.address}</strong></p>
                <p>{details.description}</p>
              </div>
            </CardModel>
            })}
        </div> 
    );
  };
  
  export default Individual;
  