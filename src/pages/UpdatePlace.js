import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
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
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
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
      await sendRequest(
        `http://localhost:5000/api/images/${imageId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address:formState.inputs.address.value,
          url:formState.inputs.url.value,
          author: auth.userId
    }),
        {
          'Content-Type': 'application/json'
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
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedImage.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={loadedImage.description}
            initialValid={true}
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
            UPDATE PLACE
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateImage;
