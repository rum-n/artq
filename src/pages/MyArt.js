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
        const responseData = await sendRequest(
          `http://localhost:5000/api/images/user/${auth.userId}`
        );
        setLoadedPlaces(responseData.userWithImages);
        console.log(loadedPlaces)
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
