import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/CardModel';
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
      },
      url: {
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
          `http://localhost:5000/api/images/${imageId}`
        );
        setLoadedImage(responseData.image);
        console.log("responsedata"+imageId)
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
              },
              url: {
                value: responseData.image.url,
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
        `http://localhost:5000/api/images/${imageId}`,
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
        <Card>
          <h2>Could not find image!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      
      {loadedImage && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
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
          <Input
            id="dimentions"
            element="textarea"
            label="Dimentions"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={loadedImage.description}
            initialValid={true}
          />
           <Input
        id="medium"
        element="input"
        label="Medium"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
      />
          <Button type="submit" disabled={!formState.isValid}>
            Update artwork
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateImage;
