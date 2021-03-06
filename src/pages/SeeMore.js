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
import {AuthContext} from "../components/context/auth-context";
import { VALIDATOR_MIN } from './util/validators';

const SeeMore = () => {
  const { sendRequest } = useHttpClient();
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

  const [ bidauth, setbidauth ] = useState("")

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
  // const [ counter, setCounter ] = useState(60);
  const [ state, setState ] = useState({})
  const [ name, setName ] = useState([])
  const [ numberofbids, setnumberofbids ] = useState([])
  // const [ validatebid, setvalidatebid ] = useState(false)
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
    console.log(data)
    const sendRequest = async () => {
      try {
        const response = await fetch(`https://localhost:5000/api/images/${params.imageId}`);
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setState(responseData.image);
        getname(responseData.image)
      } catch (err) {
        console.log(err);
      }
    };
    sendRequest();

    const getnumberofbids = async () => {
      try {
        const response = await fetch(`https://localhost:5000/api/bid/${params.imageId}`);
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setnumberofbids(responseData.userWithImages.length);
        if (responseData.userWithImages.length === []){
          setnumberofbids("0")
        }
      } catch (err) {
        console.log(err);
      }
    };
    getnumberofbids();
  }, []);

  const sendbid = async event => {
    event.preventDefault();
    try {
    await sendRequest('https://localhost:5000/api/bid/','POST',JSON.stringify({
      "title":state.title,
      "artId":state._id,
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
    alert("successfully submitted bid!")
  } catch(err){
    console.log(err)
  }
  try{
    await sendRequest(`https://localhost:5000/api/images/${state._id}`,'PUT',JSON.stringify({
      "id":state._id,
        "price":bidauth     
    }),{
        'Content-Type':'application/json',Authorization: 'Bearer '+auth.token
      }) 
  } catch(err){
    console.log(err)
  }
};

  const getname = async (state) => {
    try {
      const response = await fetch(`https://localhost:5000/api/users/${state.author}`);
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setName(responseData.userWithImages.name);
    } catch (err) {
      
    }
  };

  if(numberofbids.length === 0 && state.type === "Auction"){
    setnumberofbids("be the first bid!")
  }

  return (
    <div className='seemore-wrapper'>
      
        <div className='seemore-img'>
          <img src={`https://localhost:5000/${state.url}`} alt={state.title} />
          {shouldRedirect(redirect)}
        </div>

    <div className="seemore-details">
      <h1>{state.title}</h1>
          <table>
            <tr>
              <td className='left'><p>Artist</p></td>
              <td className='right'><p>{name}</p></td>
            </tr>
            <tr>
              <td className='left'><p>Location</p></td>
              <td className='right'><p>{state.address}</p></td>
            </tr>
            <tr>
              <td className='left'><p>style</p></td>
              <td className='right'><p>{state.style}</p></td>
            </tr>
            <tr>
              <td className='left'><p>Current price ($)</p></td>
              <td className='right'><p>{state.price}</p></td>
            </tr>
            {state.type == "Auction" &&
            <tr>
              <td className='left'><p>Time remaining</p></td>
              <td className='right'><p>{state.duration} hours</p></td>
            </tr>}
            {state.type == "Auction" &&
            <tr>
              <td className='left'><p>Bids</p></td>
              <td className='right'><p>{numberofbids}</p></td>
            </tr>}
            <tr>
              <td className='left'><p>Medium</p></td>
              <td className='right'><p>{state.medium}</p></td>
            </tr>
            <tr>
              <td className='left'><p>Dimensions</p></td>
              <td className='right'><p>{state.dimentions}</p></td>
            </tr>
          </table>

      <div className='seemore-btn-wrapper'>

        {state.type === "Sale" &&
        <button className='seemore-add' onClick={addToCart}>Add to cart</button>}
        {state.type === "Auction" && 
        <button className='seemore-add' onClick={addToCart}>Add to cart</button>}
       
        {state.type === "Auction" && state.status!=="sold" &&
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

        <Button type="submit" onClick={(e) =>sendbid(e) && window.location.reload()} disabled={authenticated(state.price)}>
          Publish
        </Button>
         
        </Form.Group>}
      </div>
      </div>
    </div>
  )
}

export default SeeMore;