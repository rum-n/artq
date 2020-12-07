import React from 'react';
import UserItem from './UserItem';
import Card from './CardModel';
import './UsersList.css';

const UsersList = props => {
  return (
    <ul className="users-list">
      {props.items.map(user => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.image.length}
        />
      ))}
    </ul>
  );
};

export default UsersList;
