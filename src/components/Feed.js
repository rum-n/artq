import React, { useState } from "react";
import PaypalButtons from "../pages/paypal";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import data from "./data";
import './styles.css';

const Feed = () => {
  const [showPaypal, setShowPaypal] = useState(false); 
  const [images, setImages] = useState(data);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const showPaypalButtons = () => {
    setShowPaypal(true);
  }

  return (
    <>
    {showPaypal ? <PaypalButtons /> : images.map(painting => (
      <div className='outer-artwork' onClick={handleShow}>
        <div key={painting.title} className="artwork-card">
            <img src={painting.url} alt={painting.title}/>
            <p>Title: {painting.title}</p>  
            <p>Author: {painting.author}</p>  
            <p>Cost: {painting.cost}</p>
            <button onClick={showPaypalButtons}> Pay </button>
        </div>
        <Modal dialogClassName="modal-100w" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{painting.author}</Modal.Title>
        </Modal.Header>
            <div className='modal-content'>
              <div className='modal-img'>
                <img src={painting.url} alt={painting.title}/>
              </div>
              <div className='modal-info'>
                <h3>{painting.title}</h3>
                <p>{painting.dimensions}</p>
                <p><b>Description</b></p>
                <p>{painting.description}</p>
              
              <Button variant="secondary">
                Add to cart
              </Button>
              <Button variant="primary">
                Save for later
              </Button>
              </div>
            </div>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
      </div>))}

      </>
    ); 
  }

export default Feed;