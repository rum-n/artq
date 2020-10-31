import React, { Component } from "react";
import PaypalButtons from "./paypal";
import data from "./data";




class Home extends Component {
  state = {
    showPaypal: false
  }; 

  showPaypalButtons = () => {
    this.setState({ showPaypal: true });
  };

  render() {
    const { showPaypal } = this.state;
    if (showPaypal) {
      return <PaypalButtons />;
    } else {
      {/* We should try to input this array in data.js and fetch information from that instead of listing it here */}
      return (
        [
          { 
          
              name: 'Dog1', 
              email: 'https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313__340.jpg',
              cost: "$4000"
          },
      
          {
              name: 'Dog2',
              email:  'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
              cost: "$500"
          }
      ].map((anObjectMapped, index) => {
          return (
            <div>
              <p key={`${anObjectMapped.cost}_{anObjectMapped.email}`}>
              {anObjectMapped.name}  {anObjectMapped.cost} 
                  <button onClick={this.showPaypalButtons}> Pay </button>
              </p>
              <img src={anObjectMapped.email} alt="Logo" />
              <br></br>
              
              </div>

          );
      })
      );
    }
  }
}

export default Home;