import React,{useState,useContext} from "react";
import GoogleMapReact,{infowindow,google} from "google-map-react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { addItem, removeItem } from "../components/cartHelpers"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PlaceItem from '../components/PlaceItem';
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../components/hooks/http-hook"
//import Json Data


const GoogleMaps =  (props,{ latitude, longitude }) => {
  

  const showRemoveProductButton = false;
  const {error,sendRequest,clearError} = useHttpClient();
  const auth = useContext(AuthContext)
  const [loadedUsers, setLoadedUsers] = useState();
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
  const [loadedTitle, setLoadedTitle] = useState();
  const [loadedDescription, setLoadedDescription] = useState();
  const ModelsMap = (map, maps) => {
    //instantiate array that will hold your Json Data
    let dataArrayLat = [];
    let dataArrayLong = [];
    let dataArrayTitle = [];
    let dataArrayDescription = [];
    let dataArrayimage = [];
    let dataArrayid = [];
   
    //push your Json Data in the array
    {
      props.items.map(markerJson => dataArrayTitle.push(markerJson.title));
      props.items.map(markerJson => dataArrayDescription.push(markerJson.description));
      props.items.map(markerJson => dataArrayLat.push(markerJson.location.lat));
      props.items.map(markerJson => dataArrayLong.push(markerJson.location.long));
      props.items.map(markerJson => dataArrayimage.push(markerJson.url));
      props.items.map(markerJson => dataArrayid.push(markerJson.id));
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
    const addToCart =() =>{
      addItem(props,() =>{
        setRedirect(true)
      })
    }
    const showAddToCart = (showAddToCartButton) =>{
       (
        <Button className="add-to-cart" variant="secondary" onClick={addToCart}>Add to cart</Button>
      )
    }
    
    const showRemoveButton = (showRemoveProductButton) =>{
      return showRemoveProductButton && (
        <Button onClick={() => removeItem(props.id)}>Remove</Button>
      )
    }
   

    //Loop through the dataArray to create a marker per data using the coordinates in the json
    for (let i = 0; i < dataArrayLat.length; i++) {
      let marker = new maps.Marker({
        position: { lat: dataArrayLat[i], lng: dataArrayLong[i] },
        map,
        label: dataArrayLat.id,
        infowindow:dataArrayTitle[i]
       
      });
      setLoadedTitle(dataArrayTitle[i])
      setLoadedDescription(dataArrayDescription[i])
      const contentString =
      dataArrayTitle[i]+" "+ dataArrayDescription[i]
      
    let infowindow = new maps.InfoWindow({
      content: `<Modal > <Modal.Header closeButton><Modal.Title></Modal.Title></Modal.Header><Modal.Body><Container><Row><Col xs={12} md={6}><img className='modal-img' src=${dataArrayimage[i]} alt={activeItem.name}/></Col><Col xs={12} md={6}><h3>${dataArrayTitle[i]}</h3><p><b></b></p><p>${dataArrayDescription[i]}</p> <a href="http://localhost:3000/seemore/5ff346f265bdacb8b20812c0">More Details</a> </Modal.Footer></Modal>`,
    });
    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });
    
      
    }
    
  };

  return (
    <div style={{ height: "600px", width: "100%" }}>
      
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyD-7dQ3eattg6KI7O7FQwyHQmkdQy0ML9A" }}
        defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
        defaultZoom={10}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => ModelsMap(map, maps)}
      />
    </div>
  );
};

export default GoogleMaps;
