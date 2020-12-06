import React, { useEffect, useState,useContext } from 'react';
import { useParams } from 'react-router-dom';
import {AuthContext} from "../context/auth-context";
import PlaceList from '../components/PlaceList';
import { useHttpClient } from '../components/hooks/http-hook';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Col from 'react-bootstrap/Col';

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const auth = useContext(AuthContext);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/images/user/5fcbeaa8c23a55c20c240d5e`
        );
        const responseData = await response.json();
        setLoadedPlaces(responseData.userWithImages);
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
      <Col xs={1} md={4}>
        {loadedPlaces && <PlaceList items={loadedPlaces} onDeleteImage={imageDeletedHandler}/>}
      </Col>
    </CardDeck>
  );
};

export default UserPlaces;
