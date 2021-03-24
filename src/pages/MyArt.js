import React, { useEffect, useState,useContext } from 'react';
import {AuthContext} from "../context/auth-context";
import PlaceList from '../components/PlaceList';
import { useHttpClient } from '../components/hooks/http-hook';
import CardDeck from 'react-bootstrap/CardDeck';
import Col from 'react-bootstrap/Col';

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { sendRequest } = useHttpClient();

  const auth = useContext(AuthContext);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://artq-api-rum-n.vercel.app/api/images/user/${auth.userId}`
        );
        const responseData = await response.json();
        setLoadedPlaces(responseData.userWithImages);
      } catch (err) {}
    };
    fetchImages();
  }, [sendRequest, auth.userId]);
  
  const imageDeletedHandler = deletedImageId =>{
      setLoadedPlaces(prevImages => prevImages.filter(image =>image.id !== deletedImageId))
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
