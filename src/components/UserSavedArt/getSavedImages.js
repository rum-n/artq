import React, { useEffect, useState,useContext } from 'react';

import Savedimageslist from "./savedimageslist";
import {AuthContext} from "../../context/auth-context";


const GetSavedImages = () => {

  const auth = useContext(AuthContext);

    const [loadedUsers, setLoadedUsers] = useState();
  
    useEffect(() => {
      const sendRequest = async () => {
  
        try {
          const response = await fetch(`http://localhost:5000/api/saved/user/${auth.userId}`);
          
          const responseData = await response.json();
          
  
          if (!response.ok) {
            throw new Error(responseData.message);
          }
          
          setLoadedUsers(responseData.userWithImages);
         
        } catch (err) {
          alert(err)
        }
      
      };
      sendRequest();
    }, []);

  
  
    return (
      <React.Fragment>
      
      
        {loadedUsers && <Savedimageslist items={loadedUsers} />}
      </React.Fragment>
    );
  };
  
  export default GetSavedImages;
  