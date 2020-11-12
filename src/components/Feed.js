import React, { useState } from "react";
import PaypalButtons from "../pages/paypal";
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import data from "./data";
import './styles.css';

const Feed = () => {
  const [showPaypal, setShowPaypal] = useState(false); 
  const [images] = useState(data);
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

        {/* This stupid Modal is acting all weird and I can't figure out why!
        For some reason, it's only showing the last entry in the data file. */}

        <Modal dialogClassName="modal-100w" show={show} onHide={handleClose} backdrop="false">

        <Modal.Header closeButton>
          <Modal.Title>{painting.author}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={12} md={6}>
                  <img className="modal-img" src={painting.url} alt={painting.title}/>
              </Col>
              <Col xs={12} md={6}>
                <h3>{painting.title}</h3>
                <p>{painting.dimensions}</p>
                <p><b>Description</b></p>
                <p>{painting.description}</p>              
                <Button className="add-to-cart" variant="secondary">Add to cart</Button>
                <Button className="save-for-later" variant="primary">Save for later</Button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <a className='see-more'>See more</a>
        </Modal.Footer>
      </Modal>
      </div>))}

      </>
    ); 
  }

export default Feed;