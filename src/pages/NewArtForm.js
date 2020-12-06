import React, { useCallback, useReducer,useContext,useState } from 'react';
import {useHistory} from "react-router-dom"
import {useHttpClient} from "../components/hooks/http-hook"
import Input from '../components/Input';
import Button from '../components/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import {AuthContext} from "../context/auth-context";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from './util/validators';
import './NewArtForm.css';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },
        isValid: formIsValid
      };
    default:
      return state;
  }
};

const NewPlace = () => {
  const {error,sendRequest,clearError} = useHttpClient();
  const auth = useContext(AuthContext)
  const[duration,setduration] = useState(0)
  const[type,settype] = useState("")
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      dimentions: {
        value: '',
        isValid: false
      },
      url: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      },
      price: {
        value: 0,
        isValid: false
      },
      medium: {
        value: '',
        isValid: false
       
      }
    },
    isValid: false
  });
  const history = useHistory();

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id
    });
  }, []);



  const placeSubmitHandler = async event => {
    event.preventDefault();
    try{
    
      console.log(auth.userId)
    await sendRequest('http://localhost:5000/api/images','POST',JSON.stringify({
      title:formState.inputs.title.value,
      
      description:formState.inputs.description.value,
      dimentions:formState.inputs.dimentions.value,
      duration: 3, //change this to use what user clicked
      medium: formState.inputs.medium.value,
      price: formState.inputs.price.value,
      type: "Auction", //change this to use what user clicked
      address:formState.inputs.address.value,
      url:formState.inputs.url.value,
      author: auth.userId
    }),{
      'Content-Type':'application/json',Authorization: 'Bearer '+auth.token
    })
    history.push('/');
  } catch(err){
  
    console.log(err)
  }
};

  return (
    <div className='signup-wrapper'>
      <div className='left-wrapper'>
        <div className='upload-white-rectangle'>
          <p>FIRST NAME: <span>Curtis Bryant</span></p>
          <p>E-MAIL: <span>curtis11@gmail.com</span></p>
          <p>PHONE: <span>415-768-9987</span></p>
        </div>
      </div>
    <div className='right-wrapper'>
      
      <Form className='add-art-form-wrapper' onSubmit={placeSubmitHandler}>
        <Form.Group as={Row} controlId="title">
          <Form.Label column sm="2">Artwork Title</Form.Label>
          <Col sm="6">
            <Input 
              id="title"
              element="input"
              type="text"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid title."
              onInput={inputHandler}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="description">
          <Form.Label column sm="2">Description</Form.Label>
          <Col sm="6">
            <Input
              id="description"
              element="textarea"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid description (at least 5 characters)."
              onInput={inputHandler}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="dimentions">
          <Form.Label column sm="2">Dimentions</Form.Label>
          <Col sm="6">
            <Input
              id="dimentions"
              validators={[VALIDATOR_REQUIRE()]}
              element="text"
              onInput={inputHandler}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="url">
          <Form.Label column sm="2">Url</Form.Label>
          <Col sm="6">
            <Input
              id="url"
              validators={[VALIDATOR_REQUIRE()]}
              element="text"
              onInput={inputHandler}
            />
          </Col>
        </Form.Group>
        

        <Form.Group as={Row} controlId="price">
          <Form.Label column sm="2">Price</Form.Label>
          <Col sm="6">
            <Input
              id="price"
              element="number"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="address">
          <Form.Label column sm="2">Address</Form.Label>
          <Col sm="6">
            <Input
              id="address"
              element="text"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="medium">
          <Form.Label column sm="2">Medium</Form.Label>
          <Col sm="6">
            <Input
              id="medium"
              validators={[VALIDATOR_REQUIRE()]}
              element="text"
              onInput={inputHandler}
            />
          </Col>
        </Form.Group>
        
        

        <Form.Group as={Row} controlId="type">
          <Form.Label column sm="2">Type of sale</Form.Label>
          <Col sm="4">
            <Form.Check 
              custom
              type="checkbox"
              id="auction"
              label="Auction"
            
            />
          </Col>
          <Col sm="4">
            <Form.Check 
              custom
              type="checkbox"
              id="buynow"
              label="Buy Now"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="duration">
          <Form.Label column sm="2">Auction ends in:</Form.Label>
          <Col sm="3">
            <Form.Control as="select" custom>
              <option>1</option>
              <option>2</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Button type="submit" disabled={!formState.isValid}>
          Publish
        </Button>
      </Form>
    </div>
    </div>
  );
};

export default NewPlace;
