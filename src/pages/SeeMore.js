import React, { useState, useEffect, useCallback, useReducer, useContext } from 'react';
import './SeeMore.css';
import { useLocation, Redirect } from "react-router-dom";
import { useHttpClient } from "../components/hooks/http-hook"
import Button from 'react-bootstrap/Button'
import { addItem } from "./../components/cartHelpers"
import { useParams } from 'react-router-dom';
import Input from '../components/Input';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import {AuthContext} from "../context/auth-context";
import { VALIDATOR_MIN } from './util/validators';

const SeeMore = () => {
  const {error,sendRequest,clearError} = useHttpClient();
  const auth = useContext(AuthContext)
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
      bid: {
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

  const [bidauth,setbidauth] = useState("")

  const authenticated = (price) =>{
   if (bidauth>price){
     return false
   }
   else{
     return true
   }
  }

  const setValue= (value) =>{
    setbidauth(value)
  }

  const inputHandler = useCallback((id, value, isValid) => {
    setValue(value)
    if (value<state.value){
      return(true)
    }
    
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id
    });
  }, []);

  let data = useLocation();
  const params = useParams();
  const [ counter, setCounter ] = useState(60);
  const [ state, setState ] = useState({})
  const [ name, setName ] = useState([])
  const [ validatebid, setvalidatebid ] = useState(false)
  const [redirect,setRedirect] = useState(false)

  const addToCart =() =>{
    console.log(data.state.thedata)
    addItem(data.state.thedata,() =>{
      setRedirect(true)
    })
  }

  const shouldRedirect = redirect =>{
    if(redirect){
      return <Redirect to="/cart"/>
    }
  }

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/images/${params.imageId}`);
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        console.log(responseData.image)
        setState(responseData.image);
        getname(responseData.image)
      } catch (err) {
        alert(err)
      }
    };
    sendRequest();
  }, []);

  const sendbid = async event => {
    console.log("entered sendbid")
    event.preventDefault();
    console.log("state "+state)
    try{
      console.log(state.title,state.description,state.dimentions,state.address,state.url,state.type,state.duration,bidauth,state.medium,state.author,state.user1)
      
    await sendRequest('http://localhost:5000/api/bid/','POST',JSON.stringify({
      
      "title":state.title,
      "description": state.description,
      "dimentions": state.dimentions,
      "url":state.url,
      "address":state.address,
      "location":{
          "lat":state.location.lat,
          "long":state.location.long
      },
      "type":state.type,
      "duration":state.duration,
      "bid":bidauth,
      "medium":state.medium,
      "author":state.author,
      "user1":auth.userId,
    }),{
      'Content-Type': 'application/json', Authorization: 'Bearer '+ auth.token
    })
  } catch(err){
    console.log(err)
  }
};

  const getname = async (state) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${state.author}`);
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setName(responseData.userWithImages.name);
    } catch (err) {
      alert(err)
    }
  };

  return (
    <React.Fragment>
      <div className='seemore-img'>
        <img src={state.url} alt={state.title} />
        {shouldRedirect(redirect)}
      </div>
      <div className="seemore-details">
       
      <h1>{name}</h1>
        <h1>{state.title}</h1>
        <div className="seemore-details-table">
          <div className="seemore-details-table-left">
            <p>Current price ($)</p>
            <p>Time remaining</p>
            <p>Bids</p>
            <p>Medium</p>
            <p>Dimensions</p>
          </div>
          <div div className="seemore-details-table-right">
            <h2>{state.address}</h2>
            <p>{state.price}</p>
            <p>{state.duration} hours</p> 
            <p>{state.bidauth}</p>
            <p>{state.medium}</p>
            <p>{state.dimentions}</p>
          </div>
        </div>
      </div>
      <div className='seemore-btn-wrapper'>

      {state.type == "Sell" &&
        <button className='seemore-add' onClick={addToCart}>Add to cart</button>}
       
        {state.type == "Auction" &&
        <Form.Group as={Row} controlId="description">
          <Form.Label >Place Bid</Form.Label>
        
            <Input
              id="bid"
              element="input"
              type="number"
              validators={[VALIDATOR_MIN(state.price)]}
              errorText="Please enter a valid bid (more than the current bid)."
              onInput={inputHandler}
            />

        <Button type="submit" onClick={(e) =>sendbid(e)} disabled={authenticated(state.price)}>
          Publish
        </Button>
         
        </Form.Group>}
      </div>
    </React.Fragment>
  )
}

export default SeeMore;