import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import './nearme.css';

const GoogleMaps = (props) => {
  const axios = require('axios');
  const API_KEY = 'AIzaSyD-7dQ3eattg6KI7O7FQwyHQmkdQy0ML9A' 
  
  const [userlocationlat, setuserlocationlat] = useState("")
  const [userlocationlong, setuserlocationlong] = useState("")
  const [data,setData] = useState("")
  const [convert,setconvert] = useState("")
  let distances = []
  const [order,setorder] = useState(props.items)
  const [onloaded, setonloaded] = useState(false)
  const [uorder,setuorder] = useState([])
  const updateddistances = []
  const finaldistanceorder = []
  const finalimageorder = []
  
  console.log(data)
  
  const mapCoordinates = () => {
   
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        setuserlocationlat(position.coords.latitude)
        setuserlocationlong(position.coords.longitude)
      })
    };
  }

  useEffect(() =>{
    mapCoordinates()
  },[userlocationlat])

  const [ loadedTitle, setLoadedTitle ] = useState();
  const [ loadedDescription, setLoadedDescription ] = useState();
  const [ artistorder, setartistorder ] = useState([]);
  const ModelsMap = (map, maps) => {
  
    //instantiate array that will hold your Json Data
    let dataArrayLat = [];
    let dataArrayLong = [];
    let dataArrayTitle = [];
    let dataArrayDescription = [];
    let dataArrayimage = [];
    let dataArrayid = [];
   
    //push your Json Data in the array    
    props.items.map(markerJson => dataArrayTitle.push(markerJson.title));
    props.items.map(markerJson => dataArrayDescription.push(markerJson.description));
    props.items.map(markerJson => dataArrayLat.push(markerJson.location.lat));
    props.items.map(markerJson => dataArrayLong.push(markerJson.location.long));
    props.items.map(markerJson => dataArrayimage.push(markerJson.url));
    props.items.map(markerJson => dataArrayid.push(markerJson.id));

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
      
    let infowindow = new maps.InfoWindow({
      content: 
        `<Modal>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <Container>
            <Row>
            <Col xs={12} md={6}>
              <img className='map-modal-img' src=${`https://localhost:5000/${dataArrayimage[i]}`} alt={activeItem.name}/>
            </Col>
            <Col xs={12} md={6}>
              <h3>${dataArrayTitle[i]}</h3>
              <p><b></b></p>
              <p>${dataArrayDescription[i]}</p> 
              <a href="http://165.227.117.138/seemore/${dataArrayid[i]}">More Details</a> 
          </Modal>`,
    });
    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });
    }
  };

  const getCoordsForAddress = async(address) => {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${API_KEY}`
    );

    const data = response.data;

    if (!data || data.status === 'ZERO_RESULTS') {
      alert("no results")
    }
    const coordinates = data.results[0].geometry.location;
    setuserlocationlat(coordinates.lat)
    setuserlocationlong(coordinates.lng)
    console.log(coordinates)
    findDistance(coordinates.lat,coordinates.lng)
  }
const findDistance = (lat,lng) =>{
  setuserlocationlat(lat)
  setuserlocationlong(lng)

  order.map(artists => {
    const R = 6371e3; // metres
    const φ1 = artists.location.lat * Math.PI/180; // φ, λ in radians
    const φ2 = lat * Math.PI/180;
    const Δφ = (lat-artists.location.lat) * Math.PI/180;
    const Δλ = (lng-artists.location.long) * Math.PI/180;
    
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    const d = R * c; // in metres
    console.log(d)
    distances.push(d)
    
    console.log(distances)

    })
    let hi = Array.from(distances)
    let theindex = 0
    const saveprevious = distances
    const sortedarray = ((hi.sort((a, b) => a - b)))

    for (let j = 0; j < distances.length; j++) { 
      theindex = (distances.indexOf(sortedarray[j]))
      uorder.push(props.items[theindex])    
    } 
  }

  Array.min = function( array ){
    return Math.min.apply( Math, array );
  };

  const searchSubmit = (e) =>{
    getCoordsForAddress(data)
    e.preventDefault()
  }

  const handleChange = name => event =>{
    setData(event.target.value)
    event.preventDefault()
  }

  const mapStyle = [
    { elementType: "geometry", stylers: [{ color: "#282A2F" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#aaaaaa" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#aaaaaa" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#aaaaaa" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#aaaaaa" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#aaaaaa" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#F04B72" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ];

  return (
    <div>
      <div className='search-wrapper'>
      <form onSubmit={searchSubmit}>
          <input type="search" className='nearme-search' placeholder='Search by location' onChange={handleChange((e)=> e)}></input>
      </form>
      </div>
      {data && <div className='artist-location'>
        {uorder.map(artists => {
          return (
          <Link to={`/seemore/${artists.id}`}>
          <div key={artists.id} className='artist-location-info'>
            <img className='near-artist-img' src={`https://localhost:5000/${artists.url}`} alt={artists.title}/>
            <div>
              <p>{artists.title}</p>
              <p>{artists.description}</p>
            </div>
          </div>
          </Link>)
          })}
      </div>}
      <div className='art-map'>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyD-7dQ3eattg6KI7O7FQwyHQmkdQy0ML9A" }}
          center={{ lat: userlocationlat, lng: userlocationlong }}
          defaultZoom={10}
          options={{
            styles: mapStyle,
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => ModelsMap(map, maps)}
        />
      </div>
    </div>
  );
};

export default GoogleMaps;
