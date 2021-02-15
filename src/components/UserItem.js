import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../components/Avatar';
import Card from './CardModel';
import './UserItem.css';

const UserItem = props => {
  if (props.id!==undefined){
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={{
    pathname: `/individual/${props.id}`,
    state: { theid: props.id }
  }}>
          <div className="user-item__image">
            <Avatar image={`http://165.227.117.138:5000/${props.prof}`} alt={props.name} />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.placeCount} {props.placeCount === 1 ? 'Artwork' : 'Artworks'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );}
  else{
    
    return (
      <li className="user-item">
        <Card className="user-item__content">
          <Link to={{
      pathname: "/individual",
      state: { theid: props.author }
    }}>
            <div className="user-item__image">
              <Avatar image={`http://165.227.117.138:5000/${props.prof}`} alt={props.name} />
            </div>
            <div className="user-item__info">
              <h2>{props.name}</h2>
              <h3>
                {props.placeCount} {props.placeCount === 1 ? 'Artwork' : 'Artworks'}
              </h3>
            </div>
          </Link>
        </Card>
      </li>
    );

  }
};

export default UserItem;
