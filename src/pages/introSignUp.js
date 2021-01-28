import React from 'react';
import './introSignUp.css'; 
import { Link } from "react-router-dom";
import artqlogo from './../assets/artq-logo-big.png';

const IntroSignUp = () => {

    return (
        <div className='intro-wrapper'>
            <img src={artqlogo} alt='Artq Logo' />
            <Link to='/login'><button className='intro-signup-btn'>Sign in</button></Link>
            <Link to='/signup'>Create an account</Link>
            <Link className='guest-link' to='/login'>Continue as guest</Link> 
        </div>
    )
} 

export default IntroSignUp;