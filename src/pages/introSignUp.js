import React from 'react';
import './styles.css';
import introImg from '../assets/ART_WALL_1.png';
import introElipse from '../assets/Ellipse_1.svg';

const IntroSignUp = () => {

    return (
        <div className='intro-wrapper'>
            <div className='intro-text-wrapper'>
                <h1 className='signup-title'>Get<br/> your<br/> artwork<br/> seen!</h1>
                <h2 className='signup-subtitle'>We help artists get more audience.</h2>
                <h2 className='signup-subtitle'>We help you explore more gorgeous art.</h2>
            </div>
            <img className='abstract-art' src={introImg} alt="Abstract Art" /> 
            <img className='pink-elipse' src={introElipse} alt="Pink Elipse" />
            <div className='intro-btn-wrapper'>
                <button className='intro-signup-btn'>Sign Up</button>
                <button className='intro-guest-btn'>As a guest</button>
            </div> 
        </div>
    )
} 

export default IntroSignUp;