import React, { useState, useContext} from 'react';
import { useHistory,Redirect } from 'react-router-dom';
import './styles.css';
import artist from '../assets/artist_1.png';
import buyer from '../assets/buyer_1.png';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import plus from '../assets/plus.png'; 
import {useHttpClient} from "../components/hooks/http-hook"
import {VALIDATOR_REQUIRE} from "../pages/util/validators"
import {AuthContext} from "../context/auth-context"

//sending http request
//
//  fetch('http://localhost:5000/api/users/signup',{method:"POST",headers:{
//                    "Content-Type":'application/json'},body:JSON.stringify({"name":"naan",
//                     "email":"hiiiiio@gmail.com",
//                    "password":"hiiiii",
//                     "phone": 85098409,
//                     "image": "hii.png"})})
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
    console.log()
    e.preventDefault();
   
    try{
   
   
        
    const responseData = await sendRequest('http://localhost:5000/api/users/login','POST',  JSON.stringify({  
        "email":account.email,
        "password":account.password,   
    }) ,   
       {  
          'Accept': 'application/json',  
          'Content-Type': 'application/json'  
        },
        
      );
      auth.login(responseData.user.id)
       responseData = await theresponse.json();
      
    
  
    }catch(err){
       
     
    }
    try{
    if (theresponse.ok){
        console.log("its a ok")
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
                    <img src={artist} alt='Painter'/>
                    <div className='label-wrapper'>
                        <p>Sign in as an artist</p>
                        <div className='profile-type-selector'></div>
                    </div>
                </div>
                <div className='white-rectangle'>
                    <img src={buyer} alt='Art Collector'/>
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
                
            </Form>          
            </div>
        </div>
        </React.Fragment>
    )
} 


export default SignIn;