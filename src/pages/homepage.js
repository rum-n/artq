import React from "react";
import './styles.css';
import GetRealImages from "../components/OtherPeople'sArt/getRealImages";

const Home = () => {



  return (
    <React.Fragment>
        <h1 className='feed-title'>Welcome back! Here's the latest posts from <br/> the artists you currently follow.</h1>
        <div className="artwork-wrapper">
          
            <GetRealImages/>
        </div>
    </React.Fragment>
    );
  }

export default Home;