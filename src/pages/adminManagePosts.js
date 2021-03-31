import React, {useEffect, useState,useContext} from "react";

import { useHttpClient } from '../components/hooks/http-hook';
import { AuthContext } from '../context/auth-context';

import PlaceList from '../components/PlaceList';
import CardDeck from 'react-bootstrap/CardDeck';
import Col from 'react-bootstrap/Col';

const AdminManagePosts = () => {
    const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const auth = useContext(AuthContext);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://localhost:5000/api/images`
        );
        const responseData = await response.json();
        setLoadedPlaces(responseData.image);
        console.log(responseData)
      } catch (err) {}
    };
    fetchImages();
  }, [sendRequest, auth.userId]);
  
  const imageDeletedHandler = deletedImageId =>{
      setLoadedPlaces(prevImages => prevImages.filter(image =>image.id != deletedImageId))
  }

  return (
    <CardDeck>
      <Col  md={4}>
        {loadedPlaces && <PlaceList items={loadedPlaces} onDeleteImage={imageDeletedHandler}/>}
      </Col>
    </CardDeck>
  );
};
  

export default AdminManagePosts;