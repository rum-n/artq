import React, { useEffect, useState } from 'react';

import Realimageslist from "./realimageslist";


const GetRealImages = () => {

    const [loadedUsers, setLoadedUsers] = useState();
  
    useEffect(() => {
      const sendRequest = async () => {
  
        try {
          const response = await fetch('http://165.227.117.138:5000/api/images');
          
          const responseData = await response.json();
          
  
          if (!response.ok) {
            throw new Error(responseData.message);
          }
          
          setLoadedUsers(responseData.image);
         
        } catch (err) {
         
        }
      
      };
      sendRequest();
    }, []);

    useEffect(() => {
      const sendRequest = async () => {
  
        try {
          const response = await fetch('http://165.227.117.138:5000/api/saved');
          
          const responseData = await response.json();
          
  
          if (!response.ok) {
            throw new Error(responseData.message);
          }
          
          setLoadedUsers(responseData.image);
         
        } catch (err) {
         
        }
      
      };
      sendRequest();
    }, []);
  
  
    return (
      <React.Fragment>
      
      
        {loadedUsers && <Realimageslist items={loadedUsers} />}
      </React.Fragment>
    );
  };
  
  export default GetRealImages;
  