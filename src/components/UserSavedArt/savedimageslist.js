import React from 'react';

import Feed from '../Feed';

const Savedimageslist = props => {
  return (
    <ul className="users-list">
      {props.items.map(user => (
        <Feed
        showAddToCartButton={true}
        key={user.id}
        id={user.id}
        image={user.url}
        description={user.description}
        address={user.address}
        title={user.title}
        />
      ))}
    </ul>
  );
};

export default Savedimageslist;
