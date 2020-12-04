import React,{useState} from "react";
import GoogleMapReact,{infowindow,google} from "google-map-react";
//import Json Data


const GoogleMaps =  (props,{ latitude, longitude }) => {
  const [loadedTitle, setLoadedTitle] = useState();
  const [loadedDescription, setLoadedDescription] = useState();
  const ModelsMap = (map, maps) => {
    //instantiate array that will hold your Json Data
    let dataArrayLat = [];
    let dataArrayLong = [];
    let dataArrayTitle = [];
    let dataArrayDescription = [];
   
    //push your Json Data in the array
    {
      props.items.map(markerJson => dataArrayTitle.push(markerJson.title));
      props.items.map(markerJson => dataArrayDescription.push(markerJson.description));
      props.items.map(markerJson => dataArrayLat.push(markerJson.location.lat));
      props.items.map(markerJson => dataArrayLong.push(markerJson.location.long));
    }
    console.log("data array"+dataArrayTitle)

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
      content: contentString,
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
