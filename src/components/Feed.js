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

  // const PaintingsList = () => images.map(painting => (
  //   <CardDeck>
  //     <Col key={painting.id} xs={1} md={4}>
  //       <Card style={{ width: '25rem', marginBottom: '2rem' }} onClick={handleShow}>
  //         <Card.Img src={painting.url} /> 
  //       </Card>
  //     </Col>
  //   </CardDeck>))

  return (
    <React.Fragment>
      
      {showPaypal ? <PaypalButtons /> : <CardDeck>
        {images.map(painting => 
          <Col key={painting.id} xs={1} md={4}>
            <Card style={{ width: '25rem', marginBottom: '2rem' }} onClick={handleShow}>
              <Card.Img src={painting.url} /> 
            </Card>
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
          </Col>)}
        </CardDeck>}
      </React.Fragment>
  )}
  
export default Feed;

//  const movies = {} 
 
// const MovieList = ({movies}) =>
// movies.map((movie, index) => 
// (<ListGroup.Item key={movie.imdbID}><Row>
//   <Col md={2}>{movie.Year}</Col>
//   <Col md={3}>{movie.imdbID}</Col>
//   </Row>
// </ListGroup.Item>));  
// render (
  // <div>
  //     <p onClick={this.props.onShowModal}>{this.props.movie.Title}{this.props.index}</p>
  //     <Modal show={this.props.modal} onHide={this.props.onHideModal} backdropClassName={'modal-backdrop'}>
  //     <Modal.Header closeButton>
  //       <Modal.Title>{this.props.movie.Title} {this.props.index}</Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body
  //         <ListGroup>{/* <----- put your list const here */}
  //         <MovieList movies={movies} />
  //         </ListGroup>
  //       </Modal.Body>
  //       <Modal.Footer>
  //         <h1>test footer</h1>
  //       </Modal.Footer>
  //     </Modal>             
  // </div>  