import React, { useState, useContext } from 'react';
import CardModel from './CardModel';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../context/auth-context';
import './PlaceItem.css';
import { useHttpClient } from '../components/hooks/http-hook';

const PlaceItem = props => {
  console.log(props.id)
  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showActualConfirmModal, setShowActualConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowActualConfirmModal(true)
    return(
      alert("Are you sure? It will be permanently deleted"))    
  };

  const confirmDeleteHandler = async() => {
    setShowConfirmModal(false);
    try {
    await sendRequest(`http://localhost:5000/api/images/${props.id}`,'DELETE',null,{Authorization: 'Bearer '+auth.token});
    props.onDelete(props.id);
    } catch (err) {     
    }
  };

  return (
    <React.Fragment>
      <li className="place-item">
        <CardModel className="place-item__content">
          <div className="place-item__image">
            <img src={`http://localhost:5000/${props.image}`} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h4>{props.title}</h4>
            <p><strong>{props.address}</strong></p>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            {auth.isLoggedIn && (
              <Button to={`/images/${props.id}`}>Edit</Button>
            )}
            {auth.isLoggedIn && (
              <Button variant='outline-danger' onClick={showDeleteWarningHandler}>Delete</Button>
            )}
            {auth.isLoggedIn && showActualConfirmModal && (
              <Button variant='outline-secondary' onClick={confirmDeleteHandler}>Confirm delete</Button>
            )}
          </div>
        </CardModel>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
