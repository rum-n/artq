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
      return (
        <div className="main">
          <h2> Buy this Artwork </h2>
        
          <h3>
            <b>$2000</b>
            <img alt="Image" src={data.url} /> {/* the data.url is not fetching url from data.js file */}
          </h3>
          <button onClick={this.showPaypalButtons}> Pay </button>
        </div>
      );
    }
  }
}

export default Home;