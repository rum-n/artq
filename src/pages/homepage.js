import React from "react";
import './styles.css';
import '../components/Feed';
import Feed from "../components/Feed";

const Home = () => {

  return (
    <React.Fragment>
        <h1 className='feed-title'>Welcome back! Here's the latest posts from <br/> the artists you currently follow.</h1>
        <div className="artwork-wrapper">
            <Feed/>
        </div>
    </React.Fragment>
    );
 
  }

export default Home;