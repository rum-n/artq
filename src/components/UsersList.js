import React from 'react';
import UserItem from './UserItem';
import './UsersList.css';

const UsersList = props => {
 
  return (
    <ul className="users-list">
      {props.items.map(user => (
        <UserItem
          key={user.id}
          id={user.id}
          prof={user.prof}
          image={user.image}
          name={user.name}
          placeCount={user.image.length}
          author = {user._id}
         
        />
      ))}
    </ul>
  );
};

export default UsersList;
