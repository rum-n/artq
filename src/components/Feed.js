import React, { useState,useEffect,useReducer,useContext} from "react";
import PaypalButtons from "../pages/paypal";
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
// import data from "./data";
import {AuthContext} from "../context/auth-context";
import {useHttpClient} from "../components/hooks/http-hook"
// import { Redirect } from "react-router";
import { Link } from "react-router-dom";

const Feed = (props) => {
  const {error,sendRequest,clearError} = useHttpClient();
  const auth = useContext(AuthContext)
  const [loadedUsers, setLoadedUsers] = useState();
  const [redirect,setRedirect] = useState(false)
  const [showPaypal, setShowPaypal] = useState(false); 
  const [show, setShow] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const [activetitle, setActivetitle] = useState('');
  const [activedescription, setActivedescription] = useState('');
  const [activeurl, setActiveurl] = useState('');
  const [activeaddress, setActiveaddress] = useState('');
  const [activeauthor, setActiveauthor] = useState('');
  const [activeprice, setActiveprice] = useState('');
  const [activedimentions, setActivedimentions] = useState('');
  const [activetype, setActivetype] = useState('');
  const [activeduration, setActiveduration] = useState('');
  const [activemedium, setActivemedium] = useState('');
  
  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setActiveItem(item)
    setActivetitle(item.title)
    setActivedescription(item.description)
    setActiveurl(item.image)
    setActiveaddress(item.address)
    setActiveauthor(item.author)
    setActiveprice(item.price)
    setActivedimentions(item.dimentions)
    setActivetype(item.type)
    setActiveduration(item.duration)
    setActivemedium(item.medium)
    setShow(true)
 };
 
 const placeSubmitHandler = async event => {
   alert("saved!")
  event.preventDefault();
  try{
    console.log(activeItem)
    console.log(activetitle)
    console.log(activedescription)
    console.log(activeurl)
    console.log(activeaddress)
    console.log(activeauthor)
    console.log(activeauthor)
      console.log(activeprice)
      console.log(activedimentions)
      console.log(activetype)
      console.log(activemedium)

   
  await sendRequest('http://localhost:5000/api/saved','POST',JSON.stringify({
   
    dimentions: activedimentions,
    price: activeprice,
    type:activetype,
    duration:activeduration,
    medium:activemedium,
    title:activetitle,
    description:activedescription,
    address:activeaddress,
    url:activeurl,
    author: activeauthor,
    user1:auth.userId

  }),{
    'Content-Type':'application/json'
  })
} catch(err){}
};

  return (
    <div>
      
      {showPaypal ? <PaypalButtons /> : 
           
          <Col key={props.id} xs={3} md={4} className='art-cards'>
            <Card style={{ width: '22rem', marginBottom: '2rem'}} onClick={() => handleShow(props)}>
              <Card.Img src={props.image} /> 
            </Card>
          </Col>
        
        }
            <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>{activeItem.author}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Container>
                      <Row>
                        <Col xs={12} md={6}>
                            <img className="modal-img" src={props.image} alt={activeItem.name}/>
                        </Col>
                        <Col xs={12} md={6}>
                          <h3>{props.title}</h3>
                          <p><b>Dimentions</b></p>
                          <p>{props.description}</p>              
                          <Button className="add-to-cart" variant="secondary" >Add to cart</Button>
                          <Button className="save-for-later" variant="primary" onClick={placeSubmitHandler}>Save for later</Button>
                        </Col>
                      </Row>
                    </Container>
                  </Modal.Body>
                    <Modal.Footer>
                      <Link to='' className='see-more'>See more</Link>
                    </Modal.Footer>
                </Modal>
      </div>
  )}

export default Feed;