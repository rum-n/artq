import React, { useState, useEffect } from 'react';
import { useHttpClient } from '../components/hooks/http-hook';
import Savedimageslist from "../components/UserSavedArt/savedimageslist";

import './SeeMore.css';
import {useLocation} from "react-router-dom";

 

const Individual = () => {
    let data = useLocation();
    let theid = data.state.theid

  
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedUsers, setLoadedUsers] = useState();
  
    useEffect(() => {
      const sendRequest = async () => {
  
        try {
          const response = await fetch(`http://localhost:5000/api/images/user/${theid}`);
          
          const responseData = await response.json();
          
  
          if (!response.ok) {
            throw new Error(responseData.message);
          }
          
          setLoadedUsers(responseData.userWithImages);
         
        } catch (err) {
         
        }
      
      };
      sendRequest();
    }, [sendRequest, theid]);

  
  
    return (
      <React.Fragment>
      
      
        {loadedUsers && <Savedimageslist items={loadedUsers} />}
      </React.Fragment>
    );
  };
  
  export default Individual;
  