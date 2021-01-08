import React from 'react';
import Feed from '../Feed';

const realimageslist = props => {
  return (
    <ul className="users-list">
      {props.items.map(user => (
        <Feed showAddToCartButton={true}
          key={user.id}
          likes={user.likes}
          status = {user.status}
          id={user.id}
          image={user.url}
          description={user.description}
          address={user.address}
          title={user.title}
          author={user.author}
          duration={user.duration}
          dimentions={user.dimentions}
          type={user.type}
          price={user.price}
          medium={user.medium}

        />
      ))}
    </ul>
  );
};

export default realimageslist;
