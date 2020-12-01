import React from 'react';
import CardModel from './CardModel';
import PlaceItem from './PlaceItem';
import Button from './Button';
import './PlaceList.css';

const PlaceList = props => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <CardModel>
          <h2>You have no art. Maybe add one?</h2>
          <Button to="/addart">Add Art</Button>
        </CardModel>
      </div>
    );
  }

  return (
    
    <ul className="place-list">
      
      {props.items.map(image => (
        <PlaceItem
          key={image.id}
          id={image.id}
          image={image.url}
          title={image.title}
          description={image.description}
          address={image.address}
          creatorId={image.author}
          coordinates={image.location}
          onDelete = {props.onDeleteImage}
        />
        
      ))}
    </ul>
  );
};

export default PlaceList;
