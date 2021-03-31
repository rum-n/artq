import React, { useEffect, useState, useContext } from "react";
import { useHttpClient } from '../components/hooks/http-hook';
import { AuthContext } from "../components/context/auth-context";
import './styles.css';
import './currentBids.css';
import '../components/Feed';
import GetSavedImages from '../components/UserSavedArt/getSavedImages'

const Saved = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();
  const [likes, setLikes] = useState();
  
  useEffect(() => {
    const sendRequest = async () => {

      try {
        const response = await fetch(`https://localhost:5000/api/saved/user/${auth.userId}`);
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setLoadedUsers(responseData.userWithImages);
      } catch (err) {
        console.log(err);
      }
      try {
        const response1 = await fetch(`https://localhost:5000/api/images/${loadedUsers.id}`);
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
        <GetSavedImages/>
      </React.Fragment>
    )
  }

export default Saved;