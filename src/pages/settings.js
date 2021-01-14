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

const Settings = () => {
  
  const [file, setFile] = React.useState("");
  const [methodofbuying, setmethodofbuying] = useState("")
  const [artstyle, setartstyle] = useState("")
  let [followers, setfollowers] = useState("")
  let [likes, setlikes] = useState("")
  let [bids, setbids] = useState("")
  let [auction, setauction] = useState("")
  let [items, setitems] = useState("")
  const [notifications, setnotifications] = useState([])
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
    
	// 	try{
  //     console.log(file)
  //    await sendRequest('https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5','POST',JSON.stringify( 
  //     event.target.files[0]
       
  //    ),{
  //      'Content-Type':'application/json',Authorization: 'Bearer '+auth.token
  //    }).then((response) => response.json())
  //    .then((result) => {
  //      console.log('Success:', result);
  //    })
  //    .catch((error) => {
  //      console.error('Error:', error);
  //    });
   
  //  } catch(err){
  //    console.log(err)
  //  }
	
	
    console.log(event.target.files[0])
    setFile(event.target.files[0]);

    // Add code here to upload file to server
    // ...
  }
  const ImageThumb = ({ image }) => {
    console.log(URL.createObjectURL(file))
    console.log(URL.createObjectURL(file))
  return <img src={URL.createObjectURL(file)} alt={image.name} />;

};


const placeSubmitHandler = async (e) => {
  e.preventDefault()
  alert("Settings have been updated")
  console.log("entered placesubmit handler" )
  
  try{
  
      const response = await fetch(
        `http://localhost:5000/api/images/notifications/5fff516aa5ddb630731f4430`
      );
      const responseData = await response.json();
      setnotifications(responseData);
      
 
  
    //o.peoplewholiked.indexOf(auth.userId) > -1\
    //
    let updatedfollowers = []
    let updatedlikes = []
    let updatedauction = []
    let updatedbids = []
    let updateditems = []
  console.log(e.target.value)
    if (followers = "No"){
      console.log(responseData.followers)
      updatedfollowers = responseData.followers + (auth.userId)
      console.log(updatedfollowers)
    }
    if (likes = "No"){
      updatedlikes = responseData.likes.push(auth.userId)
    }
    if (bids = "No"){
      updatedbids = responseData.bids.push(auth.userId)
    }
    if (auction = "No"){
      updatedauction = responseData.auction.push(auth.userId)
    }
    if (items = "No"){
      updateditems = responseData.items.push(auth.userId)
    }

  
   
  await sendRequest(`http://localhost:5000/api/images/notifications/5fff516aa5ddb630731f4430`,'PUT',JSON.stringify({
    followers:updatedfollowers,
    likes: updatedlikes,
    auction:updatedauction,
    bids:updatedbids,
    items:updateditems
  }),{
      'Content-Type':'application/json',Authorization: 'Bearer '+auth.token
    })

} catch(err){

  console.log(err)
}


};

const handlebuy = (method) =>{
  setmethodofbuying(type)
}

  return (
    <div className='signup-wrapper'>
      
    <div className='right-wrapper'>
      <h4>Email Notification Settings</h4>
      
      <Form className='add-art-form-wrapper' onSubmit={placeSubmitHandler}>
        <Form.Group as={Row}>
          <Form.Label column sm="4">New Followers</Form.Label>
          <Col sm="6">
            <Form.Control 
              as='select' 
              defaultValue="Choose..." 
              value={followers} 
              onChange={e => setfollowers(e.target.value)}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="4">New Likes</Form.Label>
          <Col sm="6">
            <Form.Control 
              as='select' 
              defaultValue="Choose..." 
              value={likes} 
              onChange={e => setlikes(e.target.value)}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="4">New bids</Form.Label>
          <Col sm="6">
            <Form.Control 
              as='select' 
              defaultValue="Choose..." 
              value={bids} 
              onChange={e => setbids(e.target.value)}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="4">Auction Results</Form.Label>
          <Col sm="6">
            <Form.Control 
              as='select' 
              defaultValue="Choose..." 
              value={auction} 
              onChange={e => setauction(e.target.value)}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="4">Items Sold</Form.Label>
          <Col sm="6">
            <Form.Control 
              as='select' 
              defaultValue="Choose..." 
              value={items} 
              onChange={e => setitems(e.target.value)}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            </Form.Control>
          </Col>
        </Form.Group>
        
       

     

        <Button type="submit">
          Update Settings
        </Button>
      </Form>
    </div>
    </div>
  );
};

export default Settings;
