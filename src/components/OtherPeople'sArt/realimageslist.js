import React from 'react';
import Feed from '../Feed';

const realimageslist = props => {
  
  return (
    
    <ul className="users-list">
      {props.items.map(user => (
        
        <Feed showAddToCartButton={true}
          key={user.id}
          likes={user.likes}
          peoplewholiked={user.peoplewholiked}
          status = {user.status}
          id={user.id}
          image={user.url}
          description={user.description}
          address={user.address}
          title={user.title}
          url={user.url}
          author={user.author}
          duration={user.duration}
          dimentions={user.dimentions}
          name={user.title}
          type={user.type}
          price={user.price}
          medium={user.medium}

        />
      ))}
    </ul>
  );
};

export default realimageslist;
