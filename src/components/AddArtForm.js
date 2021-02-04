import React, { useState, useContext, useReducer, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SideNav.css';
import { Link, Redirect, useHistory } from 'react-router-dom';
import {AuthContext} from "../context/auth-context";
import cartimg from "../assets/cart.png";
import {itemTotal} from "./cartHelpers"
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {useHttpClient} from "../components/hooks/http-hook"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from './../pages/util/validators';
import Input from '../components/Input';
import Button from '../components/Button';

const AddArtForm = () => {
    const auth = useContext(AuthContext);
    const [artstyle, setartstyle] = useState("");
    const [methodofbuying, setmethodofbuying] = useState("");

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


    
    return (

        <Form className='addart-form'>
            <Form.Group controlId="description">
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
            <Form.Group as={Row}>
            <Form.Label column sm="4">Artwork Category</Form.Label>
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
        </Form>
    )
}

export default AddArtForm;