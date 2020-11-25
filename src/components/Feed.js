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

const Feed = props => {
  
  const [showPaypal, setShowPaypal] = useState(false); 
  const [images] = useState(data);
  const [show, setShow] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const [isHovering, setIsHovering] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setActiveItem(item)
    setShow(true)
 };

 
  

  return (
    <React.Fragment>
      
      {showPaypal ? <PaypalButtons /> : <CardDeck>
        {images.map(painting => 
          <Col key={painting.id} xs={1} md={4}>
            <Card style={{ width: '25rem', marginBottom: '2rem' }} onClick={() => handleShow(painting)}>
              <Card.Img src={painting.url} /> 
            </Card>
          </Col>)}
        </CardDeck>}
            <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>{activeItem.author}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Container>
                      <Row>
                        <Col xs={12} md={6}>
                            <img className="modal-img" src={activeItem.url} alt={activeItem.name}/>
                        </Col>
                        <Col xs={12} md={6}>
                          <h3>{activeItem.title}</h3>
                          <p>{activeItem.dimensions}</p>
                          <p><b>Description</b></p>
                          <p>{activeItem.description}</p>              
                          <Button className="add-to-cart" variant="secondary">Add to cart</Button>
                          <Button className="save-for-later" variant="primary" >Save for later</Button>
                        </Col>
                      </Row>
                    </Container>
                  </Modal.Body>
                    <Modal.Footer>
                      <a className='see-more'>See more</a>
                    </Modal.Footer>
                </Modal>
      </React.Fragment>
  )}

  
  
export default Feed;