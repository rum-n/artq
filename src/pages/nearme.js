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
    } else {
      setuserlocationlat("40.756795")
      setuserlocationlong("-73.954298")
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

const getCoordsForAddress = async(address) => {
  //  return {
  //    lat: 40.7484474,
  //   lng: -73.9871516
  //  };

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
 
  console.log(userlocationlat)
  setuserlocationlat(lat)
  setuserlocationlong(lng)
 
  

  //for loop through all images
  //use userlocation
  //put the images in order from least to greatest
  //update on page (reload)

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
    console.log(distances)
    console.log(saveprevious)
    console.log(hi)
    console.log(props.items)
    for (let j = 0; j < distances.length; j++) { 
      console.log(hi[j])
      theindex = (distances.indexOf(sortedarray[j]))
      uorder.push(props.items[theindex])    
    } 

  //   for (let j = 0; j < distances.length; j++) { 
  //     min = distances[0]
  //     console.log(distances)
 
    
  //   for (let i = 1; i < distances.length; ++i) {
  //     if (distances[i] < min) {
  //       min = distances[i];
       
  //     }
  //     tosplice = i
  //   }
    
  //   console.log(distances.indexOf(min))
  //   tosplice = distances.indexOf(min)
  //   distances = distances.filter(item => item !== min)
  //   console.log(distances)
    

  //   finaldistanceorder.push(min)

  // }
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
      <h1 className='feed-title'>Find an artist near you!</h1>
      <div className='search-wrapper'>
      <form onSubmit={searchSubmit}>
          <input type="search" className='nearme-search' placeholder='Search by location' onChange={handleChange((e)=> e)}></input>
          {/* Not sure if we wanna have that button. I like it better without but if you think we should leave it I'm fine too. */}
          {/* <button style={{color:"blue"}}className="input-group-text">Search</button> */}
      </form>
      </div>
      {data && <div className='artist-location'>
        {uorder.map(artists => {
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
      </div>}

      <div style={{ float: 'right', height: "520px", width: "75%", marginRight: "2rem", marginBottom: "1rem" }}>
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
