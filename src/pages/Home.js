// Your code is commented out below.
// I rewrote it to ue React Hooks (not necessarily because I think it's better, 
// but because that's how I learned it and I'm not really sure how to use class components).
// Anyway, so we need to put the data from data.js in a state variable. And then use that state 
// to map through it in the return part. 
// However, the way data.js is set up, I'm not sure there's anything to map through right now.


//I made a change to the useState, by saying "data.url". It was giving me an undefined map error 
//without the .url

import React, { useState } from "react";
import PaypalButtons from "./paypal";
import data from "./data";
import { render } from "@testing-library/react";


const Home = () => {
  const [showPaypal, setShowPaypal] = useState(false); 
  const [images, setImages] = useState(data.url);

  

  const showPaypalButtons = () => {
    setShowPaypal(true);
  }
 
  return (
   
    //I don't think it is entering this return loop 
    
    
    showPaypal ? <PaypalButtons /> : images.map((anObjectMapped, index) => { //ternary operator - similar to if/else, but shorter. 
    <div>
      
      <p key={`${anObjectMapped.cost}_{anObjectMapped.email}`}>
        {anObjectMapped.name}  {anObjectMapped.cost} 
        <button onClick={showPaypalButtons}> Pay </button>
      </p>
      <img src={anObjectMapped.email} alt="Logo" />
      <br></br>
    </div>})
    );
 
  }


export default Home;


// import React, { Component } from "react";
// import PaypalButtons from "./paypal";
// import data from "./data";


// class Home extends Component {
//   state = {
//     showPaypal: false
//   }; 

//   showPaypalButtons = () => {
//     this.setState({ showPaypal: true });
//   };

//   render() {
//     const { showPaypal } = this.state;
//     if (showPaypal) {
//       return <PaypalButtons />;
//     } else {
//       {/* We should try to input this array in data.js and fetch information from that instead of listing it here */}
//       return (
//         [
//           { 
          
//               name: 'Dog1', 
//               email: 'https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313__340.jpg',
//               cost: "$4000"
//           },
      
//           {
//               name: 'Dog2',
//               email:  'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
//               cost: "$500"
//           }
//       ].map((anObjectMapped, index) => {
//           return (
//             <div>
//               <p key={`${anObjectMapped.cost}_{anObjectMapped.email}`}>
//               {anObjectMapped.name}  {anObjectMapped.cost} 
//                   <button onClick={this.showPaypalButtons}> Pay </button>
//               </p>
//               <img src={anObjectMapped.email} alt="Logo" />
//               <br></br>
              
//               </div>

//           );
//       })
//       );
//     }
//   }
// }

// export default Home;