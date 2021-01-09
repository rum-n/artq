import React, { useState } from "react";
import { Link } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import './nearme.css';

const GoogleMaps = (props) => {
  const [ artistList, setArtistList ] = useState({
    title: '',
    description: '',
    image: ''
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
      setArtistList({
        title: dataArrayTitle,
        description: dataArrayDescription,
        image: dataArrayimage
      })
      
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

  return (
    <div>
      <h1 className='feed-title'>Find an artist near you!</h1>
      <div className='search-wrapper'>
        <input 
          className='nearme-search'
          placeholder='Search by your location'
          />
      </div>
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
          defaultZoom={10}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => ModelsMap(map, maps)}
        />
      </div>
    </div>
  );
};

export default GoogleMaps;
