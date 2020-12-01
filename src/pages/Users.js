import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';


const Users = () => {

  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const sendRequest = async () => {

      try {
        const response = await fetch('http://localhost:5000/api/users');
        
        const responseData = await response.json();
        

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        
        setLoadedUsers(responseData.users);
      } catch (err) {
        alert(err)
      }
    
    };
    sendRequest();
  }, []);


  return (
    <React.Fragment>
    
    
      {loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
