import React from 'react';

import Feed from '../Feed';

const Savedimageslist = props => {
 
  return (
    <ul className="users-list">
        { console.log(props.items)}
     
      {props.items.map(user => (
        <Feed
        showAddToCartButton={true}
        likes={user.likes}
        key={user.id}
        id={user.id}
        image={user.url}
        url={user.url}
        description={user.description}
        address={user.address}
        title={user.title}
        peoplewholiked = {user.peoplewholiked}
        />
      ))}
    </ul>
  );
};

export default Savedimageslist;
