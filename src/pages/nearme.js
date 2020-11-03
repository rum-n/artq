import React, { Component } from 'react';
import { Map,GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import data from "./data"

const mapStyles = {
  width: '100%',
  height: '100%'
  
};


class MapPage extends React.Component {
  
    
  state = {
   
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {},         //Shows the infoWindow to the selected place upon a marker
    userLocation: { lat: 30, lng: 30}, loading: true 
};


componentDidMount(props) {
    console.log("reran") 
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        this.setState({
          userLocation: { lat: latitude, lng: longitude },
          loading: false
        });
      },
      () => {
        this.setState({ loading: false });
    
        
      }
    );
  }
  

  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });

onClose = props => {
  if (this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  }
};


  render() {
      
    console.log(this.state.userLocation.lat)
    console.log(this.state.userLocation.lng)
   //because we are using setstate in componentdidmount, 
   //this runs runs and prints twice (original 30 the first time, the correct value 2nd)

    return (
   
     
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
         lat: this.state.userLocation.lat, //insert user location
         lng: this.state.userLocation.lng
        }}
      >
          
          
 {data.map(item => (    
     
      <Marker
          onClick={this.onMarkerClick}
          name={item.title}
          position={{   
                              
            lat: item.location.lat,                     
            lng: item.location.lng             
         }}
        />
 ))}
      <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
      >
        <div>
            <h4>"Insert Artwork Locations/Details"</h4>
        </div>
      </InfoWindow>
      </Map>
     
        
     
      
    );
        }
  }


export default GoogleApiWrapper({
  apiKey: 'AIzaSyAjMuGKD84BO8gE5DEDRQXlp4_wmaq_swA'
})(MapPage);