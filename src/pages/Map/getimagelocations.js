import React, { useEffect, useState } from 'react';

import NearMe from '../nearme';


const Users = () => {

  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const sendRequest = async () => {

      try {
        const response = await fetch('http://localhost:5000/api/images');
        
        const responseData = await response.json();
        

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        
        setLoadedUsers(responseData.image);
        console.log(responseData.image)
      } catch (err) {
        alert(err)
      }
    
    };
    sendRequest();
  }, []);


  return (
    <React.Fragment>
    
    
      {loadedUsers && <NearMe items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
