import React, { useState, useContext} from "react";
import {Redirect} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { addItem, removeItem } from "./cartHelpers"
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../components/hooks/http-hook"
import { Link } from "react-router-dom";

const Feed = (props, { showAddToCartButton = true }) => {
  console.log(props)
  const showRemoveProductButton = false;
  const {error,sendRequest,clearError} = useHttpClient();
  const auth = useContext(AuthContext)
  const [redirect, setRedirect] = useState(false)
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
  const [showcartbutton, setshowcartbutton] = useState('');
  
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

 const addToCart =() =>{
   addItem(props,() =>{
     setRedirect(true)
   })
 }
 const shouldRedirect = redirect =>{
   if(redirect){
     return <Redirect to="/cart"/>
   }
 }
 
 const placeSubmitHandler = async event => {
   alert("saved!")
  event.preventDefault();
  try{
   
  await sendRequest('http://localhost:5000/api/saved','POST', JSON.stringify({
   
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

const showAddToCart = (showAddToCartButton) =>{
  if (props.type === "Sell"){
  return showAddToCartButton && props.type !== "Auction" && (
    <Button className="add-to-cart" variant="secondary" onClick={addToCart}>Add to cart</Button>
  )}
  if(props.type === "Auction" && props.status !== "sold"){
    return(
    <text>The item is up for auction!</text>)
  }
  console.log(props)

  if(props.type === "Auction" && props.status === "sold"){
    return(
    <text style={{color: "red"}}>Sold!</text>)
  }
 
  if(props.type === "No"){
    return(
    <text>The item is not for sale</text>)
  }
}

const showRemoveButton = (showRemoveProductButton) =>{
  return showRemoveProductButton && (
    <Button 
      style={{marginBottom:'0.5rem'}} 
      variant='outline-dark' 
      block 
      onClick={() => removeItem(props.id) && window.location.reload()}>
        Remove
    </Button>
  )
}


  return (
    <div>
          <Col key={props.id} xs={3} md={4} className='art-cards'>
            <Card style={{ width: '22rem', marginBottom: '2rem'}} onClick={() => handleShow(props)}>
              <Card.Img src={props.image} /> 
              {shouldRedirect(redirect)}
            </Card>
          </Col>
        
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
                          {showAddToCart(props.showAddToCartButton)}  
                          {showRemoveButton(props.showRemoveProductButton)}            
                          
                          <Button className="save-for-later" variant="primary" onClick={placeSubmitHandler}>Save for later</Button>
                        </Col>
                      </Row>
                    </Container>
                  </Modal.Body>
                    <Modal.Footer>
                      <Link to={{
                        pathname: `/seemore/${props.id}`,
                        state: { thedata:props , theid: props.id}
                      }} className='see-more'>See more</Link>
                    </Modal.Footer>
              </Modal>
      </div>
  )}

export default Feed;