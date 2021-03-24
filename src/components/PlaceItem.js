import React, { useState, useContext } from 'react';
import CardModel from './CardModel';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../context/auth-context';
import { Link } from 'react-router-dom';
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
  };

  const hideDeleteWarning = () => {
    setShowActualConfirmModal(false)
  }

  const confirmDeleteHandler = async() => {
    setShowConfirmModal(false);
    try {
    await sendRequest(`https://artq-api-rum-n.vercel.app/api/images/${props.id}`,'DELETE',null,{Authorization: 'Bearer '+auth.token});
    props.onDelete(props.id);
    } catch (err) {     
    }
  };

  return (
    <React.Fragment>
      <li className="place-item">
        <CardModel className="place-item__content">
          <div className="place-item__image">
            <img src={`https://artq-api-rum-n.vercel.app/${props.image}`} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h4>{props.title}</h4>
            <p><strong>{props.address}</strong></p>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            {auth.isLoggedIn && (
              <Link to={`/images/${props.id}`}><Button variant='outline-secondary'>Edit</Button></Link>
            )}
            {auth.isLoggedIn && (
              <Button variant='outline-danger' onClick={showDeleteWarningHandler}>Delete</Button>
            )}
            {auth.isLoggedIn && showActualConfirmModal && (
              <div>
                <p>Are you sure? This will permanently delete your artwork.</p>
                <Button variant='secondary' onClick={hideDeleteWarning}>Cancel</Button>
                <Button variant='danger' onClick={confirmDeleteHandler}>Confirm delete</Button>
              </div>
            )}
          </div>
        </CardModel>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
