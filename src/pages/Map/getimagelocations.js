import React, { useEffect, useState } from 'react';

import NearMe from '../nearme';


const Users = () => {

  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const sendRequest = async () => {

      try {
        const response = await fetch('https://artq-api-rum-n.vercel.app/api/images');
        
        const responseData = await response.json();
        

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        
        setLoadedUsers(responseData.image);
      
      } catch (err) {
        alert(err)
      }
    
    };
    sendRequest();
  }, []);

console.log(loadedUsers)
  return (
    <React.Fragment>
    
    
      {loadedUsers && <NearMe items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
