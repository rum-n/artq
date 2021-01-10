import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import './nearme.css';

const GoogleMaps = (props) => {
  
  const [userlocationlat, setuserlocationlat] = useState("")
  const [userlocationlong, setuserlocationlong] = useState("")
  const[data,setData] = useState("")
  console.log(data)
  
  const mapCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        setuserlocationlat(position.coords.latitude)
        setuserlocationlong(position.coords.longitude)
      })
    } else {
      setuserlocationlat("40.756795")
      setuserlocationlong("-73.954298")
    };
  }

  useEffect(() => {
    mapCoordinates();
  })

  const [ loadedTitle, setLoadedTitle ] = useState();
  const [ loadedDescription, setLoadedDescription ] = useState();
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
              <img className='map-modal-img' src=${dataArrayimage[i]} alt={activeItem.name}/>
            </Col>
            <Col xs={12} md={6}>
              <h3>${dataArrayTitle[i]}</h3>
              <p><b></b></p>
              <p>${dataArrayDescription[i]}</p> 
              <a href="http://localhost:3000/seemore/${dataArrayid[i]}">More Details</a> 
          </Modal>`,
    });
    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });
    }
  };

  const searchSubmit = () =>{
    console.log(data)
  }

  const handleChange = name => event =>{
    event.preventDefault()
    setData(event.target.value)
  }

  const mapStyle = [
    {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
            {
                color: "#eeeeee",
            },
        ],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#FFBECE",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [
        {
          color: "#000",
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#E5E5E5",
        },
      ],
    },
    {
        featureType: "poi",
        elementType: "labels.text",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#9e9e9e",
            },
        ],
    },
  ];

  return (
    <div>
      <form className="nav-search-form" onSubmit={searchSubmit}>
        <div className="input-group-text">
          <div className="input-group input-group-lg">
            <input type="search" className="form-control" onChange={handleChange((e)=> e)} placeholder="search by location"></input>
          </div>
          <div className="btn input-group-append" style={{border:"none"}}>
            <button style={{color:"blue"}}className="input-group-text">Search</button>
          </div>
        </div>
      </form>
      <h1 className='feed-title'>Find an artist near you!</h1>
      <div className='artist-location'>
        {props.items.map(artists => {
          return (
          <Link to={`/seemore/${artists.id}`}>
          <div key={artists.id} className='artist-location-info'>
            <img className='near-artist-img' src={artists.url} alt={artists.title}/>
            <div>
              <p>{artists.title}</p>
              <p>{artists.description}</p>
            </div>
          </div>
          </Link>)
          })}
      </div>

      <div style={{ float: 'right', height: "520px", width: "75%", marginRight: "2rem", marginBottom: "1rem" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyD-7dQ3eattg6KI7O7FQwyHQmkdQy0ML9A" }}
          defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
          // defaultCenter={{ lat: userlocationlat, lng: userlocationlong }}
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
