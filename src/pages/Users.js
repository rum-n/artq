import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Nandita Kathiresan',
      image:
        'https://s3.imgcdn.dev/cSi6a.png',
      places: 3
    },
    {
        id: 'u1',
        name: 'user 2',
        image:
          'https://s3.imgcdn.dev/cSi6a.png',
        places: 3
      },
      {
        id: 'u1',
        name: 'user 3',
        image:
          'https://s3.imgcdn.dev/cSi6a.png',
        places: 3
      }
  ];

  return <UsersList items={USERS} />;
};

export default Users;
