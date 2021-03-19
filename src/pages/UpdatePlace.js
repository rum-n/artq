import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './UpdatePlace.css';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../pages/util/validators';
import { useForm } from '../components/hooks/form-hook';
import { useHttpClient } from '../components/hooks/http-hook';
import { AuthContext } from '../context/auth-context';
import '../components/PlaceItem.css';

const UpdateImage = () => {
  const auth = useContext(AuthContext);
  const { error, sendRequest } = useHttpClient();
  const [loadedImage, setLoadedImage] = useState();
  const imageId = useParams().imageId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
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
      }
    },
    false
  );

  useEffect(() => {
    const fetchImage = async () => {
      try {
        
        const responseData = await sendRequest(
          `https://artq-pi.vercel.app/api/images/${imageId}`
        );
        setLoadedImage(responseData.image);
        setFormData(
          {
            title: {
              value: responseData.image.title,
              isValid: true
            },
            description: {
              value: responseData.image.description,
              isValid: true
            },
            address: {
                value: responseData.image.address,
                isValid: true
              }
          },
          true
        );

      } catch (err) {
        alert("This didn't even work")
      }
    };
    fetchImage();
  }, [sendRequest, imageId, setFormData]);

  const placeUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      console.log(loadedImage.address)
      await sendRequest(
        `https://artq-pi.vercel.app/api/images/${imageId}`,
        'PATCH',
        JSON.stringify({
          title: loadedImage.title,
          description: formState.inputs.description.value,
          dimentions: formState.inputs.dimentions.value,
          price:loadedImage.price,
          address:loadedImage.address,
          type:loadedImage.type,
          duration:loadedImage.duration,
          medium: formState.inputs.medium.value,
          url:loadedImage.url,
          author: auth.userId
    }),
        {
          'Content-Type': 'application/json',Authorization: 'Bearer '+auth.token
        }
      );
      history.push('/' + auth.userId + '/images');
    } catch (err) {alert("nah bruh it didnt work")}
  };

  if (!loadedImage && !error) {
    return (
      <div className="center">
          <p>Could not find image!</p>
      </div>
    );
  }

  return (
    <div className='update-art-wrapper'>
      <h1 className="feed-title">Update your artwork information</h1>
      {loadedImage && (
        <Form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Form.Group>
          <Form.Label>Descripton</Form.Label>
          <Form.Control
            id="description"
            element="input"
            type="text"
            label="Description"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedImage.title}
            initialValid={true}
          />
          </Form.Group>
          <Form.Group>
          <Form.Label>Dimensions</Form.Label>
          <Form.Control
            id="dimentions"
            element="textarea"
            label="Dimentions"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={loadedImage.description}
            initialValid={true}
          />
          </Form.Group>
          <Form.Group>
          <Form.Label>Medium</Form.Label>
           <Form.Control
              id="medium"
              element="input"
              label="Medium"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid address."
              onInput={inputHandler}
            />
          </Form.Group>
          <Button type="submit" variant='outline-primary' disabled={!formState.isValid}>Save</Button>
        </Form>
      )}
    </div>
  );
};

export default UpdateImage;
