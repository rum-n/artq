import React, { useEffect, useState,useContext } from 'react';
import { useHttpClient } from '../../components/hooks/http-hook';
import Savedimageslist from "./savedimageslist";
import {AuthContext} from "../../context/auth-context";

const GetSavedImages = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedUsers, setLoadedUsers] = useState();
    const [likes, setLikes] = useState();
  
    useEffect(() => {
      const sendRequest = async () => {
  
        try {
          const response = await fetch(`http://165.227.117.138:5000/api/saved/user/${auth.userId}`);
          
          const responseData = await response.json();
          
  
          if (!response.ok) {
            throw new Error(responseData.message);
          }
          setLoadedUsers(responseData.userWithImages);
        } catch (err) {
          console.log(err);
        }
        try {
          const response1 = await fetch(`http://165.227.117.138:5000/api/images/${loadedUsers.id}`);
          const responseData1 = await response1.json();
          if (!response1.ok) {
            throw new Error(responseData1.message);
          }
          setLikes(responseData1.image.likes);
        } catch (err) {
          console.log(err)
        }
      };
      sendRequest();
    }, [sendRequest, auth.userId]);

    return (
      <React.Fragment>
        {loadedUsers && <Savedimageslist items={loadedUsers} likes={likes} />}
      </React.Fragment>
    );
  };
  
  export default GetSavedImages;
  