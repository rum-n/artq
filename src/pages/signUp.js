import React, {useState} from 'react';
import './styles.css';
import artist from '../assets/artist_1.png';
import buyer from '../assets/buyer_1.png';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import plus from '../assets/plus.png';
import {VALIDATOR_REQUIRE} from "../pages/util/validators"

//sending http request

// fetch('http://localhost:5000/api/users/signup',{method:"POST",headers:{
//                     "Content-Type":'application/json'},body:JSON.stringify({"name":"naan",
//                     "email":"hiiiiio@gmail.com",
//                     "password":"hiiiii",
//                     "phone": 85098409,
//                     "image": "hii.png"})})
const Signup = () => {
   const [account, setAccount] = useState({
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

  let save = (e) => {
    e.preventDefault();
    console.log(account);
  }
    return (
        <div className='signup-wrapper'>
            <div className='left-wrapper'>
                <div className='white-rectangle'>
                    <img src={artist} alt='Painter'/>
                    <div className='label-wrapper'>
                        <p>Join as an artist</p>
                        <div className='profile-type-selector'></div>
                    </div>
                </div>
                <div className='white-rectangle'>
                    <img src={buyer} alt='Art Collector'/>
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
                <Form.Control type="text" placeholder="First name" onChange={handleChange}/>
                </Col>
                <Col>
                <Form.Control type="text" placeholder="Last name"  onChange={handleChange}/>
                </Col>
            </Form.Row>
            <Form.Row>
                <Col>
                    <Form.Control type="email" placeholder="Email" onChange={handleChange}/>
                    <Form.Control placeholder="Phone" onChange={handleChange}/>
                    <Form.Control type="password" placeholder="Password" onChange={handleChange} />
                    <Form.Control type="password" placeholder="Confirm Password" onChange={handleChange}/>
                </Col>
            </Form.Row>
                <Button type='submit' onSubmit={save}>Next <span>→</span></Button>
            </Form>          
            </div>
        </div>
    )
} 


export default Signup;