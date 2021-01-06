import React, { useState, useContext} from 'react';
import { useHistory, Redirect, Link } from 'react-router-dom';
import './styles.css';
import artist from '../assets/artist_1.png';
import buyer from '../assets/buyer_1.png';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useHttpClient} from "../components/hooks/http-hook"
import {AuthContext} from "../context/auth-context"

const SignIn =  () => {
    const auth = useContext(AuthContext);
    const{error,sendRequest,clearError,theresponse} = useHttpClient();
    const history = useHistory();
   
    const[redirect,setRedirect] = useState(false)

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

  let save = async(e) => {
  
    e.preventDefault();
   
    try {
    const responseData = await sendRequest('http://localhost:5000/api/users/login','POST',  JSON.stringify({  
        "email":account.email,
        "password":account.password,   
    }) ,   
       {  
          'Accept': 'application/json',  
          'Content-Type': 'application/json'  
        },
      );
      auth.login(responseData.userId,responseData.token)
     
       responseData = await theresponse.json();
  
    }catch(err){   
    
    }
    setRedirect(true)
    try{
    if (theresponse.ok){
       
      setRedirect(true)
    }
}catch(err){
    setRedirect(false)
    
}
}
    const shouldRedirect = redirect =>{
        if (redirect){
            return <Redirect to = "/"/>
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
                        <p>Sign in as an artist</p>
                        <div className='profile-type-selector'></div>
                    </div>
                </div>
                <div className='white-rectangle'>
                <div className='img-div'>
                    <img src={buyer} alt='Art Collector'/>
                </div>
                    <div className='label-wrapper'>
                        <p>Sign in as a collector</p>
                        <div className='profile-type-selector'></div>
                    </div>
                </div>
            </div>
            <div className='right-wrapper'>
            <Form className='signup-form-wrapper'>       
            <Form.Row>
               
            </Form.Row>
            <Form.Row>
                <Col>
                    <Form.Control type="email" name="email"placeholder="Email" onChange={handleChange}/>
                    <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} />
                </Col>
            </Form.Row>
                <Button onClick= {save}>Login <span>→</span></Button>
                <p>Don't have an account? <Link to='/signup'>Sign up!</Link></p>
            </Form>          
            </div>
        </div>
        </React.Fragment>
    )
} 


export default SignIn;