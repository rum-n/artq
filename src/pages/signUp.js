import React from 'react';
import './styles.css';
import artist from '../assets/artist_1.png';
import buyer from '../assets/buyer_1.png';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Signup = () => {

    return (
        <div className='signup-wrapper'>
            <div className='left-wrapper'>
                <div className='white-rectangle'>
                    <img src={artist} alt='Painter'/>
                    <p>Join as an artist</p>
                </div>
                <div className='white-rectangle'>
                    <img src={buyer} alt='Art Collector'/>
                    <p>Join as a collector</p>
                </div>
            </div>

            <div className='right-wrapper'>
            <Form className='signup-form-wrapper'>
            <Form.Row>
                <Col>
                <Form.Control type="text" placeholder="First name" />
                </Col>
                <Col>
                <Form.Control type="text" placeholder="Last name" />
                </Col>
            </Form.Row>
            <Form.Row>
                <Col>
                    <Form.Control type="email" placeholder="Email" />
                    <Form.Control placeholder="Phone" />
                    <Form.Control type="password" placeholder="Password" />
                    <Form.Control type="password" placeholder="Confirm Password" />
                </Col>
            </Form.Row>
                <Button type='submit'>Next <span>→</span></Button>
            </Form>          
            </div>
        </div>
    )
} 

export default Signup;