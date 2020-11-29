import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';
import { useHttpClient } from '../components/hooks/http-hook';

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/images/user/5fc15b5be27c0c6e35dbb8e2"
        );
        setLoadedPlaces(responseData.userWithImages);
        console.log(loadedPlaces)
      } catch (err) {}
    };
    fetchImages();
  }, [sendRequest, userId]);

  return (
    <React.Fragment>
  
    
      {loadedPlaces && <PlaceList items={loadedPlaces} />}
    </React.Fragment>
  );
};

export default UserPlaces;
