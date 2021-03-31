import React, { useState, useContext } from 'react';
import './introSignUp.css'; 
import { Link, Redirect } from "react-router-dom";
import artqlogo from './../assets/artq-logo-big.png';
import {AuthContext} from "../components/context/auth-context"
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {useHttpClient} from "../components/hooks/http-hook"

const IntroSignUp = () => {
    const auth = useContext(AuthContext);
    const [ wrongLogin, setWrongLogin ] = useState();
    const { sendRequest, theresponse } = useHttpClient();
    const[ redirect, setRedirect ] = useState(false)
    const [show, setShow] = useState(false);
    const [ account, setAccount ] = useState({
        firstname:'',
        lastname:'',
        email:'',
        password:'',
        phone:'',
        image:'default.png'
    })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        account[name] = value;
        setAccount(account);
    }

    let save = async(e) => {
        e.preventDefault();
    
        try {
        let responseData = await sendRequest(
            'https://localhost:5000/api/users/login',
            'POST',  
            JSON.stringify({
                "email": account.email,
                "password": account.password,
            }),
            {  
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'  
            },
        );
        auth.login(responseData.userId, responseData.token)
        responseData = await theresponse.json();
        } catch(err) {
            setWrongLogin(true)
        }
        setRedirect(true)
        try{
            if (theresponse.ok){
                setRedirect(true)
                setWrongLogin(false)
            }
        } catch(err) {
            setRedirect(false)
            setWrongLogin(true)
        }
    }
    const shouldRedirect = redirect =>{
        if (redirect){
            return <Redirect to = "/"/>
        }
    }

    return (
        <div className='intro-wrapper'>
            <img src={artqlogo} alt='Artq Logo' />
            <button className='intro-signup-btn' onClick={handleShow}>Sign in</button>
            <Link to='/signup'>Create an account</Link>
            <Link className='guest-link' to='/login'>Continue as guest</Link> 

            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Log In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <hr/>
                <Form className='login-form'>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" name="email" placeholder="E-MAIL" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" name="password" placeholder="PASSWORD" onChange={handleChange}/>
                        {wrongLogin && <p className='wrong-credentials'>Wrong Email or Password!</p>}
                        <p>Forgot your password?</p>
                        <Link to='/signup'>Sign up</Link>
                    </Form.Group>
                </Form>
                <hr/>
            </Modal.Body>
            <Modal.Footer>
                <button className='intro-signup-btn' onClick={save}>Login</button>
            </Modal.Footer>
            </Modal>
        </div>
    )
} 

export default IntroSignUp;