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
  const [file, setFile] = React.useState("");
  const [methodofbuying, setmethodofbuying] = useState("")
  const [artstyle, setartstyle] = useState("")
  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext)
  // const[duration,setduration] = useState(0)
  const[type] = useState("")
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
        isValid: true
      },
      duration: {
        value: '',
        isValid: true
      },
      address: {
        value: '',
        isValid: false
      },
      address: {
        value: 0,
        isValid: true
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

  function handleUpload(event) {
    setFile(event.target.files[0]);

    // Add code here to upload file to server
    // ...
  }
  const ImageThumb = ({ image }) => {
    console.log(URL.createObjectURL(file))
    console.log(URL.createObjectURL(file))
  return <img src={URL.createObjectURL(file)} alt={image.name} />;
};
  const placeSubmitHandler = async event => {
    event.preventDefault();
    if (methodofbuying == "Sale")
    {try{
      console.log(formState.inputs.price.value)
    await sendRequest('http://localhost:5000/api/images','POST',JSON.stringify({
      title:formState.inputs.title.value,
      status:"Not sold",
      description:formState.inputs.description.value,
      dimentions:formState.inputs.dimentions.value,
      duration: 0, //change this to use what user clicked
      medium: formState.inputs.medium.value,
      price: formState.inputs.price.value,
      type: methodofbuying, //change this to use what user clicked
      address:formState.inputs.address.value,
      style:artstyle,
      url:URL.createObjectURL(file),
      author: auth.userId,
      likes:0
      
    }),{
      'Content-Type':'application/json',Authorization: 'Bearer '+auth.token
    })
    history.push('/');
  } catch(err){
    console.log(err)
  }}
  if (methodofbuying == "Auction")
  {try{
  await sendRequest('http://localhost:5000/api/images','POST',JSON.stringify({
    title:formState.inputs.title.value,
    status:"Not sold",
    description:formState.inputs.description.value,
    dimentions:formState.inputs.dimentions.value,
    duration: formState.inputs.duration.value, //change this to use what user clicked
    medium: formState.inputs.medium.value,
    price: formState.inputs.price.value,
    type: methodofbuying, //change this to use what user clicked
    address:formState.inputs.address.value,
    style:artstyle,
    url:URL.createObjectURL(file),
    author: auth.userId,
    
  }),{
    'Content-Type':'application/json',Authorization: 'Bearer '+auth.token
  })
  history.push('/');
} catch(err){
  console.log(err)
}}
};

const handlebuy = (method) =>{
  setmethodofbuying(type)
}

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
          <Form.Label column sm="4">Artwork Title</Form.Label>
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
          <Form.Label column sm="4">Description</Form.Label>
          <Col sm="6">
            <Input
              id="description"
              element="input"
              type="text"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid description (at least 5 characters)."
              onInput={inputHandler}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="dimentions">
          <Form.Label column sm="4">Dimentions</Form.Label>
          <Col sm="6">
            <Input
              id="dimentions"
              validators={[VALIDATOR_REQUIRE()]}
              element="input"
              type="text"
              onInput={inputHandler}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="url">
          <Form.Label column sm="4">Url</Form.Label>
          <Col sm="6">
          <div id="upload-box">
      <input type="file" onChange={handleUpload} />
      {/* <p>Filename: {file.name}</p>
      <p>File type: {file.type}</p>
      <p>File size: {file.size} bytes</p> */}
     
    </div>
          </Col>
        </Form.Group>
        
        
        <Form.Group as={Row} controlId="address">
          <Form.Label column sm="4">Address</Form.Label>
          <Col sm="6">
            <Input
              id="address"
              element="input"
              type="text"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="medium">
          <Form.Label column sm="4">Medium</Form.Label>
          <Col sm="6">
            <Input
              id="medium"
              validators={[VALIDATOR_REQUIRE()]}
              element="input"
              type="text"
              onInput={inputHandler}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="4">Style</Form.Label>
          <Col sm="6">
            <Form.Control 
              as='select' 
              defaultValue="Choose..." 
              value={artstyle} 
              onChange={e => setartstyle(e.target.value)}>
            <option value="All">Pick Category</option>
            <option value="Abstract">Abstract</option>
            <option value="Figurative">Figurative</option>
            <option value="Geometric">Geometric</option>
            <option value="Minimalist">Minimalist</option>
            <option value="Nature">Nature</option>
            <option value="Pop">Pop</option>
            <option value="Portraiture">Portraiture</option>
            <option value="Still Life">Still Life</option>
            <option value="Surrealist">Surrealist</option>
            <option value="Typography">Typography</option>
            <option value="Urban">Urban</option>
            <option value="Others">Others</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="4">Planning to Sell?</Form.Label>
          <Col sm="6">
            <Form.Control 
              as='select' 
              defaultValue="Choose..." 
              value={methodofbuying} 
              onChange={e => setmethodofbuying(e.target.value)}>
            <option value="none"> </option>
            <option value="No">Not for sale</option>
            <option value="Auction" >Auction</option>
            <option value="Sale">Sale</option>   
            </Form.Control>
          </Col>
        </Form.Group>
        
        {methodofbuying === "Auction" &&
        <Form.Group as={Row} controlId="duration">
        <Form.Label column sm="4">Auction ends in (hours):</Form.Label>
          <Col sm="6">
            <Input
              id="duration"
              element="input"
              type="number"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </Col>
        </Form.Group>}

        {methodofbuying === "Auction" &&
       <Form.Group as={Row} controlId="price">
       <Form.Label column sm="4">Starting bid price (USD)</Form.Label>
       <Col sm="6">
         <Input
           id="price"
           element="input"
           type="number"
           validators={[VALIDATOR_REQUIRE()]}
           onInput={inputHandler}
         />
       </Col>
     </Form.Group>}

        {methodofbuying === "Sale" &&
         <Form.Group as={Row} controlId="price">
         <Form.Label column sm="4">Price (USD)</Form.Label>
         <Col sm="6">
           <Input
             id="price"
             element="input"
             type="number"
             validators={[VALIDATOR_REQUIRE()]}
             onInput={inputHandler}
           />
         </Col>
       </Form.Group>}

       {methodofbuying === "No" && formState.isValid === true}

        <Button type="submit" disabled={!formState.isValid  }>
          Publish
        </Button>
      </Form>
    </div>
    </div>
  );
};

export default NewPlace;
