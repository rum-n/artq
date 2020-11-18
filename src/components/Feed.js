import React, { useState } from "react";
import PaypalButtons from "../pages/paypal";
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import data from "./data";
import './styles.css';

const Feed = () => {
  const [showPaypal, setShowPaypal] = useState(false); 
  const [images] = useState(data);
  const [show, setShow] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleMouseHover = () => setIsHovering(true);

  const showPaypalButtons = () => {
    setShowPaypal(true);
  }

  return (
    <>
      {showPaypal ? <PaypalButtons /> : <CardDeck>
        {images.map(painting => (
          <Col xs={1} md={4}>
            <Card key={painting.title} style={{ width: '25rem', marginBottom: '2rem' }} onClick={handleShow}>
              <Card.Img src={painting.url} />
                <Card.Text>
                <Modal show={show} onHide={handleClose}>
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
                </Card.Text>     
            </Card>
          </Col>))}
        </CardDeck>}
      </>
  )}
  
export default Feed;