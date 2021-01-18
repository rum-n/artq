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

const NewPlace = (props) => {
  
  const [file, setFile] = useState("");
  const [methodofbuying, setmethodofbuying] = useState("")
  const [artstyle, setartstyle] = useState("")
  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext)
  // const[duration,setduration] = useState(0)
  // const[type] = useState("")
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
        value: 0,
        isValid: true
      },
      susa: {
        value: 0,
        isValid: true
      },
      tusa: {
        value: 0,
        isValid: true
      },
      scanada: {
        value: 0,
        isValid: true
      },
      tcanada: {
        value: 0,
        isValid: true
      },
      seurope: {
        value: 0,
        isValid: true
      },
      teurope: {
        value: 0,
        isValid: true
      },
      safrica: {
        value: 0,
        isValid: true
      },
      tafrica: {
        value: 0,
        isValid: true
      },
      saustralia: {
        value: 0,
        isValid: true
      },
      taustralia: {
        value: 0,
        isValid: true
      },
      smexico: {
        value: 0,
        isValid: true
      },
      tmexico: {
        value: 0,
        isValid: true
      },
      schina: {
        value: 0,
        isValid: true
      },
      tchina: {
        value: 0,
        isValid: true
      },
      sindia: {
        value: 0,
        isValid: true
      },
      tindia: {
        value: 0,
        isValid: true
      },
      price: {
        value: 0,
        isValid: true
      },
      sasia: {
        value: 0,
        isValid: true
      },
      tasia: {
        value: 0,
        isValid: true
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

  const handleUpload  = async(event) =>{
    const formData = new FormData();

		formData.append('File', event.target.files[0]);
    console.log(URL.createObjectURL(event.target.files[0]))
  
    console.log(event.target.files[0])
    setFile(event.target.files[0]);

    // Add code here to upload file to server
    // ...
  }
//   const ImageThumb = ({ image }) => {
//     console.log(URL.createObjectURL(file))
//     console.log(URL.createObjectURL(file))
//   return <img src={URL.createObjectURL(file)} alt={image.name} />;
// };
  const placeSubmitHandler = async event => {
    event.preventDefault();
    if (methodofbuying === "Sale" || methodofbuying === "No")
    {try{
     
      const formData = new FormData()
        formData.append('title',formState.inputs.title.value)
        formData.append('status',"Not sold")
        formData.append('description',formState.inputs.description.value)
        formData.append('duration',0)
        formData.append('medium',formState.inputs.medium.value)
        formData.append('price',formState.inputs.price.value)
        formData.append('type',methodofbuying)
        formData.append('address',formState.inputs.address.value)
        formData.append('style',artstyle)
        formData.append('url',file)
        formData.append('dimentions',formState.inputs.dimentions.value)
        formData.append('author',auth.userId)
        formData.append('likes',0)
        formData.append('peoplewholiked',"")
        formData.append('susa',formState.inputs.susa.value)
        formData.append('tusa',formState.inputs.tusa.value)
        formData.append('scanada',formState.inputs.scanada.value)
        formData.append('tcanada',formState.inputs.tcanada.value)
        formData.append('smexico',formState.inputs.smexico.value)
        formData.append('tmexico',formState.inputs.tmexico.value)
        formData.append('seurope',formState.inputs.seurope.value)
        formData.append('teurope',formState.inputs.teurope.value)
        formData.append('safrica',formState.inputs.safrica.value)
        formData.append('tafrica',formState.inputs.tafrica.value)
        formData.append('saustralia',formState.inputs.saustralia.value)
        formData.append('taustralia',formState.inputs.taustralia.value)
        formData.append('schina',formState.inputs.schina.value)
        formData.append('tchina',formState.inputs.tchina.value)
        formData.append('sindia',formState.inputs.sindia.value)
        formData.append('tindia',formState.inputs.tindia.value)
        formData.append('sotherasia',formState.inputs.sasia.value)
        formData.append('totherasia',formState.inputs.tasia.value)
     console.log(file)
    await sendRequest('http://localhost:5000/api/images','POST',formData)
    history.push('/');
  } catch(err){
    console.log(err)
  }}
  if (methodofbuying === "Auction")
  {try{
    const formData = new FormData()
        formData.append('title',formState.inputs.title.value)
        formData.append('status',"Not sold")
        formData.append('description',formState.inputs.description.value)
        formData.append('dimentions',formState.inputs.dimentions.value)
        formData.append('address',"nyc")
        formData.append('price',formState.inputs.price.value)
        formData.append('url',file)
        formData.append('type',methodofbuying)
        formData.append('duration',0)
        formData.append('medium',formState.inputs.medium.value)
        formData.append('style',artstyle)
        formData.append('author',auth.userId)
        formData.append('likes',0)
        formData.append('peoplewholiked',"")
        formData.append('susa',formState.inputs.susa.value)
        formData.append('tusa',formState.inputs.tusa.value)
        formData.append('scanada',formState.inputs.scanada.value)
        formData.append('tcanada',formState.inputs.tcanada.value)
        formData.append('smexico',formState.inputs.smexico.value)
        formData.append('tmexico',formState.inputs.tmexico.value)
        formData.append('seurope',formState.inputs.seurope.value)
        formData.append('teurope',formState.inputs.teurope.value)
        formData.append('safrica',formState.inputs.safrica.value)
        formData.append('tafrica',formState.inputs.tafrica.value)
        formData.append('saustralia',formState.inputs.saustralia.value)
        formData.append('taustralia',formState.inputs.taustralia.value)
        formData.append('schina',formState.inputs.schina.value)
        formData.append('tchina',formState.inputs.tchina.value)
        formData.append('sindia',formState.inputs.sindia.value)
        formData.append('tindia',formState.inputs.tindia.value)
        formData.append('sotherasia',formState.inputs.sasia.value)
        formData.append('totherasia',formState.inputs.tasia.value)
  await sendRequest('http://localhost:5000/api/images','POST',formData)
  history.push('/');
} catch(err){
  console.log(err)
}}
};

// const handlebuy = (method) =>{
//   setmethodofbuying(type)
// }

  return (
    <div className='signup-wrapper'>
      <div className='left-wrapper'>
        <div className='upload-white-rectangle'>
          <p>FIRST NAME: <span>{props.title}</span></p>
          <p>E-MAIL: <span>{props.email}</span></p>
          <p>PHONE: <span>{props.phone}</span></p>
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
        
        {(methodofbuying === "Auction" || methodofbuying === "Sale") &&
        <>
        <Form.Group as={Row} controlId="duration">
        <Form.Label column sm="4">Auction ends in (days):</Form.Label>
          <Col sm="6">
            <Input
              id="duration"
              element="input"
              type="number"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </Col>   
        </Form.Group>
        <p>Fill in Shipping Rates/Time. <strong>Important: </strong>If you do not want to ship to that location: <strong>INPUT -1</strong></p>
        <Form.Group as={Row} controlId="susa">
        <Form.Label column sm="4">Shipping cost to USA:</Form.Label>
          <Col sm="6">
            <Input
              id="susa"
              element="input"
              type="number"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </Col>   
        </Form.Group>
        <Form.Group as={Row} controlId="tusa">
        <Form.Label column sm="4">Shipping Time to USA (weeks):</Form.Label>
          <Col sm="6">
            <Input
              id="tusa"
              element="input"
              type="number"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </Col>   
        </Form.Group>
        <Form.Group as={Row} controlId="scanada">
        <Form.Label column sm="4">Shipping cost to Canada:</Form.Label>
          <Col sm="6">
            <Input
              id="scanada"
              element="input"
              type="number"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </Col>   
        </Form.Group>
        <Form.Group as={Row} controlId="tcanada">
        <Form.Label column sm="4">Shipping Time to Canada (weeks):</Form.Label>
          <Col sm="6">
            <Input
              id="tcanada"
              element="input"
              type="number"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </Col>   
        </Form.Group>
        <Form.Group as={Row} controlId="smexico">
        <Form.Label column sm="4">Shipping cost to Mexico:</Form.Label>
          <Col sm="6">
            <Input
              id="smexico"
              element="input"
              type="number"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </Col>   
        </Form.Group>
        <Form.Group as={Row} controlId="tmexico">
        <Form.Label column sm="4">Shipping Time to Mexico (weeks):</Form.Label>
          <Col sm="6">
            <Input
              id="tmexico"
              element="input"
              type="number"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </Col>   
        </Form.Group>
        <Form.Group as={Row} controlId="seurope">
        <Form.Label column sm="4">Shipping cost to Europe:</Form.Label>
          <Col sm="6">
            <Input
              id="seurope"
              element="input"
              type="number"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </Col>   
        </Form.Group>
        <Form.Group as={Row} controlId="teurope">
        <Form.Label column sm="4">Shipping Time to Europe (weeks):</Form.Label>
          <Col sm="6">
            <Input
              id="teurope"
              element="input"
              type="number"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </Col>   
        </Form.Group>
        <Form.Group as={Row} controlId="safrica">
        <Form.Label column sm="4">Shipping cost to Africa:</Form.Label>
          <Col sm="6">
            <Input
              id="safrica"
              element="input"
              type="number"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </Col>   
        </Form.Group>
        <Form.Group as={Row} controlId="tafrica">
        <Form.Label column sm="4">Shipping Time to Africa (weeks):</Form.Label>
          <Col sm="6">
            <Input
              id="tafrica"
              element="input"
              type="number"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </Col>   
        </Form.Group>
        <Form.Group as={Row} controlId="saustralia">
        <Form.Label column sm="4">Shipping cost to Australia:</Form.Label>
          <Col sm="6">
            <Input
              id="saustralia"
              element="input"
              type="number"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </Col>   
        </Form.Group>
        <Form.Group as={Row} controlId="taustralia">
        <Form.Label column sm="4">Shipping Time to Australia (weeks):</Form.Label>
          <Col sm="6">
            <Input
              id="taustralia"
              element="input"
              type="number"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </Col>   
        </Form.Group>
        <Form.Group as={Row} controlId="sindia">
        <Form.Label column sm="4">Shipping cost to India:</Form.Label>
          <Col sm="6">
            <Input
              id="sindia"
              element="input"
              type="number"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </Col>   
        </Form.Group>
        <Form.Group as={Row} controlId="tindia">
        <Form.Label column sm="4">Shipping Time to India (weeks):</Form.Label>
          <Col sm="6">
            <Input
              id="tindia"
              element="input"
              type="number"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </Col>   
        </Form.Group>
        <Form.Group as={Row} controlId="schina">
        <Form.Label column sm="4">Shipping cost to China:</Form.Label>
          <Col sm="6">
            <Input
              id="schina"
              element="input"
              type="number"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </Col>   
        </Form.Group>
        <Form.Group as={Row} controlId="tchina">
        <Form.Label column sm="4">Shipping Time to China (weeks):</Form.Label>
          <Col sm="6">
            <Input
              id="tchina"
              element="input"
              type="number"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </Col>   
        </Form.Group>
        <Form.Group as={Row} controlId="sasia">
        <Form.Label column sm="4">Shipping cost to Asia (other than China and India):</Form.Label>
          <Col sm="6">
            <Input
              id="sasia"
              element="input"
              type="number"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </Col>   
        </Form.Group>
        <Form.Group as={Row} controlId="tasia">
        <Form.Label column sm="4">Shipping Time to Asia (other than China and India) (weeks):</Form.Label>
          <Col sm="6">
            <Input
              id="tasia"
              element="input"
              type="number"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </Col>   
        </Form.Group>

        </>}

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
