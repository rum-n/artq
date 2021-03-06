import React, { useState, useContext, useEffect} from "react";
import {Redirect} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { addItem, removeItem } from "./cartHelpers"
import { AuthContext } from "./context/auth-context";
import { useHttpClient } from "../components/hooks/http-hook"
import { Link } from "react-router-dom";
import Heart from "react-animated-heart";

const Feed = (props) => {
  const [isClick, setClick] = useState(false);
  // const showRemoveProductButton = false;
  const { sendRequest } = useHttpClient();
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
  const [activelikes, setActivelikes] = useState(0);
  const [activeduration, setActiveduration] = useState('');
  const [activemedium, setActivemedium] = useState('');
  const [activepeoplewholiked, setActivepeoplewholiked] = useState(0);
  const [base64data, setbase64data] = useState('');
  const [showcartbutton, setshowcartbutton] = useState('');
  
  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setActiveItem(item)
    setActivetitle(item.title)
    setActivedescription(item.description)
    setActiveurl(item.url)
    setActiveaddress(item.address)
    setActiveauthor(item.author)
    setActiveprice(item.price)
    setActivedimentions(item.dimentions)
    setActivetype(item.type)
    setActiveduration(item.duration)
    setActivemedium(item.medium)
    setActivepeoplewholiked(item.peoplewholiked)
    setActivelikes(item.likes)
    setShow(true)
 };

 useEffect(() =>{
   if (isClick === true){
    incrementLikes(props)
   }
 },[isClick])
 const addToCart =() =>{
   console.log(props)
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
    const formData = new FormData()
        formData.append('dimentions',activedimentions)
        formData.append('price',activeprice)
        formData.append('type',activetype)
        formData.append('duration',activeduration)
        formData.append('medium',activemedium)
        formData.append('title',activetitle)
        formData.append('description',activedescription)
        formData.append('address',activeaddress)
        formData.append('url',activeurl)
        formData.append('dimentions',activedimentions)
        formData.append('author',activeauthor)
        formData.append('user1',auth.userId)
        formData.append('likes',activelikes)
        formData.append('peoplewholiked',activepeoplewholiked)
        
   
  await sendRequest('https://localhost:5000/api/saved','POST', formData)
} catch(err){}
};

const showAddToCart = (showAddToCartButton) =>{
  if (props.type === "Sale"){
  return showAddToCartButton && props.type == "Sale" && (
    <Button className="add-to-cart" variant="secondary" onClick={addToCart}>Add to cart</Button>
  )}
  if(props.type === "Auction" && props.status !== "sold"){
    return(
    <text>The item is up for auction!</text>)
  }

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
  const incrementLikes = async (o) => {
  let updatedlikes = 0
  let updatedpeople = o.peoplewholiked
  try{
  if (o.peoplewholiked.indexOf(auth.userId) > -1)
{
  alert("you already liked dawg");
}else{
  updatedlikes = o.likes+1
  updatedpeople = o.peoplewholiked
  updatedpeople = updatedpeople+((auth.userId))
}
  await sendRequest(`https://localhost:5000/api/images/likes/${o.id}/status/`,'PUT',JSON.stringify({
      "id" : o.id,
      "likes":updatedlikes,
      "peoplewholiked":updatedpeople
  }),{
      'Content-Type':'application/json',Authorization: 'Bearer '+auth.token
    })

} catch(err){
  console.log(err)
}
};

  return (

    <div>
          <Col key={props.id} xs={3} md={4} className='art-cards'>
            <Card style={{ width: '18rem', marginBottom: '2rem', border: 'none'}} >
              <Card.Img src={`https://localhost:5000/${props.url}`} /> 
              {shouldRedirect(redirect)}
                <div class='middle-layer'>
                  <p> {props.likes} likes</p>
                  {props.peoplewholiked && !(props.peoplewholiked.indexOf(auth.userId) > -1) &&
                  <Heart isClick={isClick} onClick={() => (setClick(!isClick))} />}
                  <p className='details' onClick={() => handleShow(props)}>Details</p>
                </div>
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
                            <img className="modal-img" src={`https://localhost:5000/${props.url}`} alt={activeItem.name}/>
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
                      {props.status!="sold" &&
                      <Link to={{
                        pathname: `/seemore/${props.id}`,
                        state: { thedata:props , theid: props.id}
                      }} className='see-more'>See more</Link>}
                    </Modal.Footer>
              </Modal>
      </div>
  )}

export default Feed;