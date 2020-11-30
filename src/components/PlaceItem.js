import React, { useState, useContext } from 'react';

import Card from './Card';
import Button from './Button';
// import Modal from 'react-modal';
import Modal from 'react-bootstrap/Modal';
import { AuthContext } from '../context/auth-context';
import './PlaceItem.css';
import { useHttpClient } from '../components/hooks/http-hook';

const PlaceItem = props => {
  console.log(props.id)
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showActualConfirmModal, setShowActualConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowActualConfirmModal(true)
    return(
      alert("are you sure bruh?"))    
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
    
  }
  const confirmDeleteHandler = async() => {
    setShowConfirmModal(false);
    try {
    await sendRequest(`http://localhost:5000/api/images/${props.id}`,'DELETE');
    props.onDelete(props.id);
    } catch (err) {     
    }
  };

  return (
    <React.Fragment>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
           
            {auth.isLoggedIn && (
              <Button to={`/images/${props.id}`}>EDIT</Button>
            )}

            {auth.isLoggedIn && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
             
            )}
            {auth.isLoggedIn && showActualConfirmModal && (
              <Button danger onClick={confirmDeleteHandler}>
                CONFIRM DELETE
              </Button>
             
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
