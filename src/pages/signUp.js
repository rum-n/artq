import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './signUp.css';
import artist from '../assets/artist_1.png';
import buyer from '../assets/buyer_1.png';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import plus from '../assets/plus.png'; 
import { useHttpClient } from "../components/hooks/http-hook"

const Signup =  () => {
    const { sendRequest } = useHttpClient();
    const [ redirect, setRedirect ] = useState(false)
    const [ account, setAccount ] = useState({
        firstname:'',
        lastname:'',
        email:'',
        password:'',
        phone:'',
        image:'default.png'
    })

let handleChange = (e) => {
    
    let name = e.target.name;
    let value = e.target.value;
    account[name] = value;
    setAccount(account);
  }

  let save = async(e) => {

    e.preventDefault();
    try{
    await sendRequest('http://localhost:5000/api/users/signup', 'POST', JSON.stringify({  
        "name":account.firstname,
        "email":account.email,
        "password":account.password,
        "phone": account.phone,
        "image": "hii.png" 
    }),
    {
        'Accept': 'application/json',  
        'Content-Type': 'application/json'
    },
      );
      setRedirect(true)
    } catch(err){
        setRedirect(false)
    }
}
    const shouldRedirect = redirect =>{
        if (redirect){
            return <Redirect to = "/login"/>
        }
    }

    return (
        <React.Fragment>
       {shouldRedirect(redirect)}
        <div className='signup-wrapper'>
            <div className='left-wrapper'>
                <div className='white-rectangle'>
                    <div className='img-div'>
                        <img src={artist} alt='Painter'/>
                    </div>
                    <div className='label-wrapper'>
                        <p>Join as an artist</p>
                        <div className='profile-type-selector'></div>
                    </div>
                </div>
                <div className='white-rectangle'>
                <div className='img-div'>
                    <img src={buyer} alt='Art Collector'/>
                </div>
                    <div className='label-wrapper'>
                        <p>Join as a collector</p>
                        <div className='profile-type-selector'></div>
                    </div>
                </div>
            </div>

            <div className='right-wrapper'>
                
            <Form className='signup-form-wrapper'>
          
                <img className='add-profile-pic' src={plus} alt="Plus in circle" />
            <Form.Row>
                <Col>
                <Form.Control type="text" name="firstname" placeholder="First name" onChange={handleChange}/>
                </Col>
                <Col>
                <Form.Control type="text" placeholder="Last name" />
                </Col>
            </Form.Row>
            <Form.Row>
                <Col>
                    <Form.Control type="email" name="email"placeholder="Email" onChange={handleChange}/>
                    <Form.Control placeholder="Phone" name="phone" onChange={handleChange}/>
                    <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} />
                    <Form.Control type="password" placeholder="Confirm Password" />
                </Col>
            </Form.Row>
                <Button onClick= {save}>Next <span>→</span></Button>
                <p>Already have an account? <Link to='/login'>Sign in!</Link></p>
            </Form>          
            </div>
        </div>
        </React.Fragment>
    )
} 

export default Signup;