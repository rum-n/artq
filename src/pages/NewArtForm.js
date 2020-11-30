import React, { useCallback, useReducer,useContext } from 'react';
import {useHistory} from "react-router-dom"
import {useHttpClient} from "../components/hooks/http-hook"
import Input from '../components/Input';
import Button from '../components/Button';
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
      address: {
        value: '',
        isValid: false
      },
      url: {
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
    await sendRequest('http://localhost:5000/api/images','POST',JSON.stringify({
      title:formState.inputs.title.value,
      description:formState.inputs.description.value,
      address:formState.inputs.address.value,
      url:formState.inputs.url.value,
      author: auth.userId

    }),{
      'Content-Type':'application/json'
    })
    history.push('/');
    
  }catch(err){

  }


  };

  return (
    
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input 
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
  
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />
      <Input
        id="address"
        element="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
      />
       <Input 
        id="url"
        element="input"
        label="Url"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid url."
        onInput={inputHandler}
      />
     
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlace;
